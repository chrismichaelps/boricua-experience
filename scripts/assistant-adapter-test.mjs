import assert from 'node:assert/strict';
import { Readable } from 'node:stream';
import { EventEmitter } from 'node:events';
import assistant from '../server/assistant.mjs';
const originalFetch = globalThis.fetch, originalTimer = globalThis.setTimeout, originalClear = globalThis.clearTimeout;
const originalEnv = { ...process.env };
Object.assign(process.env, { BORICUA_OPENROUTER_KEY: 'fixture', BORICUA_SESSION_KEY: 'ab'.repeat(32), BORICUA_SITE_URL: 'http://localhost:8080', BORICUA_ASSISTANT_BRIDGE_URL: 'http://localhost:8082' });
class Response extends EventEmitter {
  headers = {}; output = ''; headersSent = false; writableEnded = false; destroyed = false;
  setHeader(k,v) { this.headers[k] = v; }
  flushHeaders() { this.headersSent = true; }
  write(text) { this.headersSent = true; this.output += text; return true; }
  end(text = '') { this.output += text; this.writableEnded = true; }
}
const request = (origin = 'http://localhost:8080', body = '{"message":"Qué hay","history":[]}') => Object.assign(Readable.from([Buffer.from(body)]), { method: 'POST', headers: { origin, cookie: 'bx=old', 'x-csrf-token': 'csrf' } });
try {
  let calls = 0;
  globalThis.fetch = async () => { calls++; throw new Error('should not fetch'); };
  let res = new Response(); await assistant(request('https://evil.test'), res);
  assert.equal(res.statusCode,403); assert.equal(calls,0);
  res = new Response(); await assistant(request(undefined,'x'.repeat(24001)),res);
  assert.equal(res.statusCode,400); assert.equal(calls,0);
  globalThis.fetch = async (url,init) => { assert.equal(init.headers['x-csrf-token'],'csrf'); return new globalThis.Response('{"error":"private dependency detail"}',{status:503}); };
  res = new Response(); await assistant(request(),res);
  assert.equal(res.output,'{"error":"assistant_unavailable"}');
  for (const cancel of ['deadline','disconnect']) {
    let deadline, observedAbort = false;
    globalThis.setTimeout = (fn,ms) => { assert.equal(ms,90000); deadline = fn; return 1; };
    globalThis.clearTimeout = () => {};
    res = new Response();
    globalThis.fetch = async (url,init) => {
      if (url.endsWith('/api/assistant')) return new globalThis.Response(JSON.stringify({messages:[],tools:[]}),{headers:{'set-cookie':'bx=renewed; HttpOnly'}});
      assert.equal(init.signal.aborted,false);
      return new Promise((resolve,reject) => {
        init.signal.addEventListener('abort',() => { observedAbort = true; reject(new DOMException('Aborted','AbortError')); },{once:true});
        if (cancel === 'deadline') deadline(); else res.emit('close');
      });
    };
    await assistant(request(),res);
    assert.ok(observedAbort, cancel + ' aborts upstream'); assert.ok(res.writableEnded);
    assert.deepEqual(res.headers['set-cookie'],['bx=renewed; HttpOnly']);
  }
} finally {
  globalThis.fetch = originalFetch; globalThis.setTimeout = originalTimer; globalThis.clearTimeout = originalClear;
  for (const key of Object.keys(process.env)) if (!(key in originalEnv)) delete process.env[key]; Object.assign(process.env,originalEnv);
}
console.log('PASS: adapter origin/body/error guards, CSRF forwarding, refreshed cookies, real deadline and browser-disconnect cancellation');
