import assert from 'node:assert/strict';
import { Readable } from 'node:stream';
import { EventEmitter } from 'node:events';
import assistant, {signature} from '../server/assistant.mjs';
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
  for (const allowed of [false,true]) {
    let reservations=0, generations=0;
    const sse = value => new globalThis.Response(`data: ${JSON.stringify(value)}\n\ndata: [DONE]\n\n`);
    globalThis.fetch = async (url,init) => {
      if (url.endsWith('/api/weather')) return new globalThis.Response('{}');
      if (url.endsWith('/api/assistant')) {
        const operation=init.headers['x-assistant-operation'];
        assert.equal(init.headers['x-assistant-signature'],signature('ab'.repeat(32),init.body,operation));
        if (operation==='provider') {reservations++;return new globalThis.Response(JSON.stringify({allowed}));}
        if (operation==='tool') return new globalThis.Response('{"result":{"verified":true},"sources":[]}');
        return new globalThis.Response('{"messages":[],"tools":[]}');
      }
      generations++;
      return generations===1 ? sse({choices:[{delta:{tool_calls:[{index:0,id:'one',function:{name:'browse_catalog',arguments:'{"scope":"categories"}'}}]},finish_reason:'tool_calls'}]}) : sse({choices:[{delta:{content:'Current database results.'},finish_reason:'stop'}]});
    };
    res=new Response(); await assistant(request(),res);
    assert.equal(generations,allowed?2:0,'each provider request needs an atomic permit');
    assert.equal(reservations,allowed?2:1);
    assert.ok(res.output.includes(allowed?'event: done':'assistant_limit'));
  }
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
