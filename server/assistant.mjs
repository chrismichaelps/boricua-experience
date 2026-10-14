import { createHmac } from 'node:crypto';

const MODEL = 'openrouter/free';
const TOOL_NAMES = ['search_activities', 'activity_details', 'my_preferences', 'organizer_details', 'browse_catalog', 'search_places', 'build_itinerary', 'route_activities', 'route_towns'];
const CONTROL_TEXT = /<\s*\/?(?:tool_call|tool_response|function(?:\s|=|>)|parameter(?:\s|=|>)|think(?:\s|>)|analysis(?:\s|>))/i;
const MAX_BODY = 24000, MAX_ANSWER = 6000, DEADLINE = 90000;
// Model rounds per question: searching, reading details, a second search, then the answer.
const ROUNDS = 4, LAST = ROUNDS - 1;
// When the free model cannot finish an answer after real results came back, the app still shows them.
const FOUND = { es: 'Esto es lo que encontré con datos actuales; toca una actividad para ver los detalles.', en: 'Here’s what I found with current data; tap an activity for the details.' };
export class ChatFailure extends Error {
  constructor(code = 'assistant_unavailable', status = 503) { super(code); this.code = code; this.status = status; }
}

const SKIES = ['clear', 'cloudy', 'showers', 'thunderstorms', 'haze'];
/** The forecast for an activity's town and start from the island document, in the model's words. */
export function weatherFor(doc, activity) {
  const hours = doc?.towns?.[activity?.town_slug];
  const start = Date.parse(doc?.start || ''), when = Date.parse(activity?.starts_at || '');
  if (!Array.isArray(hours) || !Number.isFinite(start) || !Number.isFinite(when)) return null;
  const hour = hours[Math.floor((when - start) / 3600000)];
  if (!Array.isArray(hour) || hour.length < 4) return null;
  return { sky: SKIES[hour[3]] || 'clear', temp_f: hour[0], feels_like_f: hour[1], rain_chance_pct: hour[2] };
}

export function signature(key, body, operation = 'prepare') {
  if (!/^[a-f\d]{64}$/i.test(key || '')) throw new ChatFailure('assistant_not_configured');
  return createHmac('sha256', Buffer.from(key, 'hex')).update('boricua-assistant:' + operation + ':' + body).digest('hex');
}

export async function* sseData(stream) {
  const reader = stream.getReader(), decoder = new TextDecoder();
  let pending = '';
  try {
    while (true) {
      const { value, done } = await reader.read();
      pending += done ? decoder.decode() : decoder.decode(value, { stream: true });
      if (pending.length > 100000) throw new ChatFailure();
      let end;
      while ((end = pending.search(/\r?\n\r?\n/)) >= 0) {
        const block = pending.slice(0, end);
        pending = pending.slice(end).replace(/^\r?\n\r?\n/, '');
        const data = block.split(/\r?\n/).filter(line => line.startsWith('data:')).map(line => line.slice(5).trimStart()).join('\n');
        if (!data) continue;
        if (data === '[DONE]') return;
        try { yield JSON.parse(data); } catch { throw new ChatFailure(); }
      }
      if (done) break;
    }
    if (pending.trim() && !pending.startsWith(':')) throw new ChatFailure();
  } finally { await reader.cancel().catch(() => {}); reader.releaseLock(); }
}

function normalized(error) {
  return error instanceof ChatFailure ? error : new ChatFailure();
}

export async function runConversation(context, bridge, key, signal, emit, fetcher = fetch, report = () => {}) {
  const messages = [...context.messages], sources = new Map();
  let searched = false;
  // Verified results are never thrown away because the model stumbled on its last round.
  const settle = async () => {
    if (!searched || !sources.size) throw new ChatFailure();
    await emit('delta', { text: context.locale === 'en' ? FOUND.en : FOUND.es });
    await emit('sources', { items: [...sources.values()] });
    await emit('done', {});
  };
  for (let round = 0; round < ROUNDS; round++) {
    const choice = !searched ? 'required' : round === LAST ? 'none' : 'auto';
    await emit('status', { state: 'thinking' });
    const response = await fetcher('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST', signal,
      headers: { authorization: `Bearer ${key}`, 'content-type': 'application/json' },
      body: JSON.stringify({ model: MODEL, messages, tools: context.tools, tool_choice: choice, stream: true,
        max_tokens: 1800, reasoning: { effort: 'low', exclude: true }, provider: { require_parameters: true, allow_fallbacks: true } }),
    });
    report({ stage: 'provider_http', round, status: response.status });
    if ([502, 503].includes(response.status) && round < LAST) continue;
    if (!response.ok) throw new ChatFailure(response.status === 429 ? 'assistant_limit' : 'assistant_unavailable', response.status === 429 ? 429 : 503);
    if (!response.body) throw new ChatFailure();
    const calls = new Map();
    let content = '', emitted = 0, quarantined = false, finished = false, model, finishReason;
    for await (const chunk of sseData(response.body)) {
      if (chunk.error) { report({ stage: 'provider_error', round, code: Number.isSafeInteger(chunk.error.code) ? chunk.error.code : undefined }); throw new ChatFailure(); }
      if (typeof chunk.model === 'string' && /^[a-zA-Z0-9._/-]{1,140}:free$/.test(chunk.model)) model = chunk.model;
      const first = chunk.choices?.[0];
      if (!first) continue;
      if (first.finish_reason) { finished = true; finishReason = ['stop', 'length', 'tool_calls', 'content_filter', 'error'].includes(first.finish_reason) ? first.finish_reason : 'unknown'; }
      const delta = first.delta || {};
      for (const part of delta.tool_calls || []) {
        if (!Number.isInteger(part.index) || part.index < 0 || part.index > 1) throw new ChatFailure();
        const call = calls.get(part.index) || { id: '', type: 'function', function: { name: '', arguments: '' } };
        call.id += part.id || '';
        call.function.name += part.function?.name || '';
        call.function.arguments += part.function?.arguments || '';
        if (call.id.length > 200 || call.function.name.length > 64 || call.function.arguments.length > 1200) throw new ChatFailure();
        calls.set(part.index, call);
      }
      if (typeof delta.content === 'string' && delta.content) {
        content += delta.content;
        if (content.length > MAX_ANSWER) throw new ChatFailure();
        // Do not display an unsupported answer before a real database search succeeds.
        quarantined ||= CONTROL_TEXT.test(content);
        if (searched && calls.size === 0 && !quarantined) {
          const angle = content.lastIndexOf('<');
          const end = Math.min(Math.max(emitted, content.length - 24), angle >= emitted ? angle : content.length);
          if (end > emitted) { await emit('delta', { text: content.slice(emitted, end) }); emitted = end; }
        }
      }
    }
    report({ stage: 'provider_finished', round, model, finish: finishReason, characters: content.length, calls: calls.size });
    if (!finished) throw new ChatFailure();
    if (!calls.size) {
      if (quarantined) {
        if (round === LAST) return settle();
        messages.push({ role: 'system', content: 'The previous completion used invalid textual tool markup. Use only structured tool_calls for tools. Reply to the user with ordinary Markdown, without tool syntax or internal reasoning.' });
        continue;
      }
      if (!searched && round < LAST) continue;
      if (searched && !content.trim()) return settle();
      if (!searched) throw new ChatFailure();
      if (emitted < content.length) await emit('delta', { text: content.slice(emitted) });
      await emit('sources', { items: [...sources.values()] });
      await emit('done', {});
      return;
    }
    if (round === LAST) return settle();
    messages.push({ role: 'assistant', content: content || null, tool_calls: [...calls.values()] });
    for (const call of calls.values()) {
      if (!TOOL_NAMES.includes(call.function.name)) throw new ChatFailure();
      let args;
      try { args = JSON.parse(call.function.arguments); } catch { throw new ChatFailure(); }
      if (!args || Array.isArray(args) || typeof args !== 'object') throw new ChatFailure();
      await emit('status', { state: call.function.name === 'search_activities' ? 'searching' : call.function.name === 'my_preferences' ? 'preferences' : 'reading' });
      const result = await bridge({ name: call.function.name, args, known: [...sources.values()].map(source => source.slug), locale: context.locale === 'en' ? 'en' : 'es' }, 'tool');
      if (result.result?.searched === true || result.result?.verified === true) searched = true;
      for (const source of result.sources || []) {
        if (sources.size < 12 && typeof source.slug === 'string' && (source.href === '/e/' + source.slug || source.href === '/lugar/' + source.slug)) sources.set(source.slug, source);
      }
      await emit('sources', { items: [...sources.values()] });
      if (Array.isArray(result.visuals)) await emit('visuals', { items: result.visuals.slice(0, 3) });
      const format = new Intl.DateTimeFormat(context.locale === 'en' ? 'en-US' : 'es-PR', { timeZone: 'America/Puerto_Rico', dateStyle: 'full', timeStyle: 'short' });
      const dated = activity => {
        const start = new Date(activity.starts_at), end = activity.ends_at ? new Date(activity.ends_at) : null;
        const weather = weatherFor(context.weather, activity);
        if (weather) activity = { ...activity, weather_pr: weather };
        return Number.isNaN(start.getTime()) ? activity : { ...activity, schedule_pr: format.format(start) + (end && !Number.isNaN(end.getTime()) ? ' – ' + format.format(end) : context.locale === 'en' ? ' · End time not provided' : ' · Hora de fin no informada') + ' AST' };
      };
      const data = { ...result.result };
      // The same search on the map is for the app to offer, never for the model to write out.
      if ('explore' in data) {
        if (typeof data.explore === 'string' && /^\/map(\?[A-Za-z0-9%=&._~,-]{0,600})?$/.test(data.explore)) await emit('explore', { href: data.explore });
        delete data.explore;
      }
      if (Array.isArray(data.activities)) data.activities = data.activities.map(dated);
      if (data.activity) data.activity = dated(data.activity);
      messages.push({ role: 'tool', tool_call_id: call.id, content: JSON.stringify(data) });
    }
  }
  return settle();
}

export default async function assistant(req, res) {
  const config = { key: process.env.BORICUA_OPENROUTER_KEY, session: process.env.BORICUA_SESSION_KEY,
    origin: process.env.BORICUA_SITE_URL, bridge: process.env.BORICUA_ASSISTANT_BRIDGE_URL || process.env.BORICUA_SITE_URL };
  res.setHeader('cache-control', 'private, no-store');
  res.setHeader('x-content-type-options', 'nosniff');
  if (req.method !== 'POST' || req.headers.origin !== config.origin) { res.statusCode = 403; res.end('{"error":"Forbidden"}'); return; }
  if (!config.key || !config.session || !config.bridge) { res.statusCode = 503; res.end('{"error":"assistant_not_configured"}'); return; }
  const abort = new AbortController();
  const timer = setTimeout(() => abort.abort(), DEADLINE);
  const disconnected = () => { if (!res.writableEnded) abort.abort(); };
  res.on('close', disconnected);
  const emit = async (event, value) => {
    if (abort.signal.aborted || res.destroyed) throw new ChatFailure();
    if (!res.write(`event: ${event}\ndata: ${JSON.stringify(value)}\n\n`)) {
      await new Promise((resolve, reject) => {
        const finish = () => { res.off('drain', drain); abort.signal.removeEventListener('abort', fail); };
        const drain = () => { finish(); resolve(); };
        const fail = () => { finish(); reject(new ChatFailure()); };
        res.once('drain', drain); abort.signal.addEventListener('abort', fail, { once: true });
      });
    }
  };
  try {
    let size = 0; const chunks = [];
    for await (const part of req) { size += part.length; if (size > MAX_BODY) throw new ChatFailure('assistant_invalid', 400); chunks.push(Buffer.from(part)); }
    const body = Buffer.concat(chunks).toString('utf8');
    let input;
    try { input = JSON.parse(body); } catch { throw new ChatFailure('assistant_invalid', 400); }
    let bridgeCookie = req.headers.cookie || '';
    const bridge = async (payload, operation = 'prepare') => {
      const encoded = JSON.stringify(payload);
      const bridgeOrigin = req.headers['x-vercel-protection-bypass'] && process.env.VERCEL_URL ? 'https://' + process.env.VERCEL_URL : config.bridge;
      const response = await fetch(bridgeOrigin + '/api/assistant', { method: 'POST', signal: abort.signal,
        headers: { 'content-type': 'application/json', accept: 'application/json', 'x-requested-with': 'boricua',
          origin: config.origin, cookie: bridgeCookie, 'x-csrf-token': req.headers['x-csrf-token'] || '',
          ...(req.headers['x-vercel-protection-bypass'] ? { 'x-vercel-protection-bypass': req.headers['x-vercel-protection-bypass'] } : {}),
          'x-assistant-operation': operation, 'x-assistant-signature': signature(config.session, encoded, operation) }, body: encoded });
      const refreshed = response.headers.getSetCookie?.() || [];
      if (refreshed.length) {
        const jar = new Map(bridgeCookie.split(';').map(pair => { const at = pair.indexOf('='); return [pair.slice(0, at).trim(), pair.slice(at + 1).trim()]; }));
        for (const cookie of refreshed) { const pair = cookie.split(';')[0], at = pair.indexOf('='); jar.set(pair.slice(0, at), pair.slice(at + 1)); }
        bridgeCookie = [...jar].filter(([name]) => name).map(([name, value]) => `${name}=${value}`).join('; ');
        if (!res.headersSent) res.setHeader('set-cookie', refreshed);
      }
      if (!response.ok) {
        const detail = await response.json().catch(() => ({}));
        const code = ['assistant_limit', 'assistant_member_limit', 'assistant_busy', 'assistant_slow_down', 'assistant_not_configured', 'assistant_invalid', 'SignedOut', 'Forbidden'].includes(detail.error) ? detail.error : 'assistant_unavailable';
        throw new ChatFailure(code, response.status);
      }
      return response.json();
    };
    // The island forecast, shared from the edge cache; a question never waits on the weather service.
    const weather = fetch(config.bridge + '/api/weather', { signal: abort.signal, headers: { accept: 'application/json' } }).then(r => (r.ok ? r.json() : null)).catch(() => null);
    const context = { ...(await bridge(input)), weather: await weather };
    res.setHeader('content-type', 'text/event-stream; charset=utf-8');
    res.setHeader('x-accel-buffering', 'no');
    res.flushHeaders?.();
    await emit('status', { state: 'searching' });
    await runConversation(context, bridge, config.key, abort.signal, emit, fetch, metadata => console.info('assistant_provider', JSON.stringify(metadata)));
  } catch (error) {
    const failure = normalized(error);
    if (!res.headersSent) { res.statusCode = failure.status; res.setHeader('content-type', 'application/json'); res.end(JSON.stringify({ error: failure.code })); }
    else if (!res.destroyed && !abort.signal.aborted) await emit('error', { error: failure.code }).catch(() => {});
  } finally { clearTimeout(timer); res.off('close', disconnected); abort.abort(); if (!res.writableEnded) res.end(); }
}
