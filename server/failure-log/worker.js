// Failure log: the site's server posts each failed response here; it is checked, kept in D1 for thirty
// days, and written to the Worker's logs. Nothing about visitors is accepted: no query strings, no
// addresses, no identifiers.
const LIMITS = { body: 2048, path: 200, reason: 400, release: 40 };
const METHODS = new Set(['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS']);
// A burst guard per isolate: at most this many rows a minute, so a flood cannot exhaust free writes.
const PER_MINUTE = 120;
let windowStart = 0;
let windowCount = 0;

/** The event when every field has the expected shape, or null. */
export function clean(input) {
  if (!input || typeof input !== 'object') return null;
  const { method, path, status, elapsed, reason = '', release = '' } = input;
  if (!METHODS.has(method)) return null;
  if (typeof path !== 'string' || !path.startsWith('/') || path.length > LIMITS.path || /[?#\s]/.test(path)) return null;
  if (!Number.isInteger(status) || status < 500 || status > 599) return null;
  if (typeof reason !== 'string' || typeof release !== 'string') return null;
  return {
    method,
    path,
    status,
    elapsed: Number.isInteger(elapsed) && elapsed >= 0 ? Math.min(elapsed, 600000) : 0,
    reason: reason.replace(/[\u0000-\u001f]/g, ' ').slice(0, LIMITS.reason),
    release: release.replace(/[^0-9A-Za-z._-]/g, '').slice(0, LIMITS.release),
  };
}

function admitted(now) {
  if (now - windowStart > 60000) { windowStart = now; windowCount = 0; }
  windowCount += 1;
  return windowCount <= PER_MINUTE;
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (request.method !== 'POST' || url.pathname !== '/failures') return new Response('Not found', { status: 404 });
    const length = Number(request.headers.get('content-length') || 0);
    if (length > LIMITS.body) return new Response('Too large', { status: 413 });
    const text = await request.text();
    if (text.length > LIMITS.body) return new Response('Too large', { status: 413 });
    let event;
    try { event = clean(JSON.parse(text)); } catch { event = null; }
    if (!event) return new Response('Invalid', { status: 400 });
    if (!admitted(Date.now())) return new Response('Busy', { status: 429 });
    console.log(JSON.stringify({ failure: event }));
    await env.DB.prepare('insert into failures (at, release, method, path, status, elapsed_ms, reason) values (?, ?, ?, ?, ?, ?, ?)')
      .bind(new Date().toISOString(), event.release, event.method, event.path, event.status, event.elapsed, event.reason).run();
    return new Response(null, { status: 204 });
  },
  async scheduled(_controller, env) {
    await env.DB.prepare("delete from failures where at < strftime('%Y-%m-%dT%H:%M:%fZ', 'now', '-30 days')").run();
  },
};
