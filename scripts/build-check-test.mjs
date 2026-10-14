import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
const source = readFileSync(new URL('../public/assets/js/features/buildCheck.js', import.meta.url), 'utf8').replace(/^export /gm, '');
const current = 'sha256:' + 'a'.repeat(64), newer = 'sha256:' + 'b'.repeat(64);
function setup({ meta = current, live = current, ok = true, fail = false } = {}) {
  const events = {}, appended = [], calls = [];
  let reloaded = false, interval;
  const make = tag => ({ tag, children: [], attrs: {}, handlers: {}, append(...items) { this.children.push(...items); }, setAttribute(k, v) { this.attrs[k] = v; }, addEventListener(n, fn) { this.handlers[n] = fn; } });
  const doc = { visibilityState: 'visible', querySelector: () => meta === null ? null : { content: meta, dataset: { update: 'New version', refresh: 'Refresh' } }, createElement: make, body: { append: item => appended.push(item) }, addEventListener: (n, fn) => events[n] = fn };
  const view = { fetch: async (url, options) => { calls.push([url, options]); if (fail) throw new Error('offline'); return { ok, json: async () => ({ hash: live }) }; }, setInterval: fn => { interval = fn; return 7; }, clearInterval() {}, addEventListener: (n, fn) => events['win:' + n] = fn, location: { reload: () => { reloaded = true; } } };
  const scope = { Date, console };
  vm.runInNewContext(source + '\nthis.buildCheck = buildCheck; this.differs = differs;', scope);
  const api = scope.buildCheck(doc, view);
  return { api, doc, view, events, appended, calls, get reloaded() { return reloaded; }, get interval() { return interval; }, scope };
}
const plain = setup();
assert.equal(plain.scope.differs(current, newer), true);
assert.equal(plain.scope.differs(current, current), false);
assert.equal(plain.scope.differs('development', newer), false, 'development pages never prompt');
assert.equal(plain.scope.differs(current, 'garbage'), false, 'malformed answers never prompt');
assert.equal(setup({ meta: 'development' }).api, null, 'a development build does not poll');
assert.equal(setup({ meta: null }).api, null);
const realNow = Date.now;
let clock = realNow();
Date.now = () => clock;
try {
  const same = setup();
  clock += 6 * 60 * 1000; await same.api.check(); assert.equal(same.calls.length, 1); assert.equal(same.appended.length, 0, 'the same build shows nothing');
  assert.equal(JSON.stringify(same.calls[0]), JSON.stringify(['/build.json', { cache: 'no-store', credentials: 'omit' }]));
  await same.api.check(); assert.equal(same.calls.length, 1, 'checks are spaced out');
  const updated = setup({ live: newer });
  clock += 6 * 60 * 1000; updated.events.visibilitychange(); for (let i = 0; i < 10; i++) await Promise.resolve();
  assert.equal(updated.appended.length, 1, 'a newer live build shows one notice');
  const note = updated.appended[0]; assert.equal(note.attrs.role, 'status'); assert.equal(note.children[0].textContent, 'New version');
  note.children[1].handlers.click(); assert(updated.reloaded, 'refresh reloads');
  clock += 6 * 60 * 1000; await updated.interval(); assert.equal(updated.appended.length, 1, 'only one notice');
  const hidden = setup({ live: newer }); hidden.doc.visibilityState = 'hidden'; clock += 6 * 60 * 1000; await hidden.api.check(); assert.equal(hidden.calls.length, 0, 'hidden tabs do not poll');
  const offline = setup({ fail: true }); clock += 6 * 60 * 1000; await offline.api.check(); assert.equal(offline.appended.length, 0, 'offline stays quiet');
  const missing = setup({ ok: false, live: newer }); clock += 6 * 60 * 1000; await missing.api.check(); assert.equal(missing.appended.length, 0, 'a missing build file stays quiet');
} finally { Date.now = realNow; }
console.log('PASS: fingerprint comparison, development and malformed builds ignored, spaced polling, hidden tabs, one refresh notice, offline and missing file');
