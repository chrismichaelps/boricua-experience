import { createHmac } from 'node:crypto';

const MODEL = 'openrouter/free';
const MAX_BODY = 24000, MAX_ANSWER = 6000, DEADLINE = 90000;
export class ChatFailure extends Error {
  constructor(code = 'assistant_unavailable', status = 503) { super(code); this.code = code; this.status = status; }
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
  for (let round = 0; round < 3; round++) {
    const choice = !searched ? 'required' : round === 2 ? 'none' : 'auto';
    await emit('status', { state: 'thinking' });
    const response = await fetcher('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST', signal,
      headers: { authorization: `Bearer ${key}`, 'content-type': 'application/json' },
      body: JSON.stringify({ model: MODEL, messages, tools: context.tools, tool_choice: choice, stream: true,
        max_tokens: 1800, reasoning: { effort: 'low', exclude: true }, provider: { require_parameters: true, allow_fallbacks: true } }),
    });
    report({ stage: 'provider_http', round, status: response.status });
    if ([502, 503].includes(response.status) && round < 2) continue;
    if (!response.ok) throw new ChatFailure(response.status === 429 ? 'assistant_limit' : 'assistant_unavailable', response.status === 429 ? 429 : 503);
    if (!response.body) throw new ChatFailure();
    const calls = new Map();
    let content = '', finished = false, model, finishReason;
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
        if (searched && calls.size === 0) await emit('delta', { text: delta.content });
      }
    }
    report({ stage: 'provider_finished', round, model, finish: finishReason, characters: content.length, calls: calls.size });
    if (!finished) throw new ChatFailure();
    if (!calls.size) {
      if (!searched && round < 2) continue;
      if (!searched || !content.trim()) throw new ChatFailure();
      await emit('sources', { items: [...sources.values()] });
      await emit('done', {});
      return;
    }
    if (round === 2) throw new ChatFailure();
    messages.push({ role: 'assistant', content: content || null, tool_calls: [...calls.values()] });
    for (const call of calls.values()) {
      if (!['search_activities', 'activity_details', 'my_preferences', 'organizer_details'].includes(call.function.name)) throw new ChatFailure();
      let args;
      try { args = JSON.parse(call.function.arguments); } catch { throw new ChatFailure(); }
      if (!args || Array.isArray(args) || typeof args !== 'object') throw new ChatFailure();
      await emit('status', { state: call.function.name === 'search_activities' ? 'searching' : call.function.name === 'my_preferences' ? 'preferences' : 'reading' });
      const result = await bridge({ name: call.function.name, args, known: [...sources.values()].map(source => source.slug) }, 'tool');
      if (result.result?.searched === true || result.result?.verified === true) searched = true;
      for (const source of result.sources || []) {
        if (sources.size < 12 && typeof source.slug === 'string' && source.href === '/e/' + source.slug) sources.set(source.slug, source);
      }
      await emit('sources', { items: [...sources.values()] });
      const format = new Intl.DateTimeFormat(context.locale === 'en' ? 'en-US' : 'es-PR', { timeZone: 'America/Puerto_Rico', dateStyle: 'full', timeStyle: 'short' });
      const dated = activity => {
        const start = new Date(activity.starts_at), end = new Date(activity.ends_at);
        return Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) ? activity : { ...activity, schedule_pr: format.format(start) + ' – ' + format.format(end) + ' AST' };
      };
      const data = { ...result.result };
      if (Array.isArray(data.activities)) data.activities = data.activities.map(dated);
      if (data.activity) data.activity = dated(data.activity);
      messages.push({ role: 'tool', tool_call_id: call.id, content: JSON.stringify(data) });
    }
  }
  throw new ChatFailure();
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
        const code = ['assistant_limit', 'assistant_not_configured', 'assistant_invalid', 'SignedOut', 'Forbidden'].includes(detail.error) ? detail.error : 'assistant_unavailable';
        throw new ChatFailure(code, response.status);
      }
      return response.json();
    };
    const context = await bridge(input);
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
