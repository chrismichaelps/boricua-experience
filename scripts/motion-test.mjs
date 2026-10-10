import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
const root = new URL('../public/assets/js/', import.meta.url);
const vendor = { queueMicrotask };
vm.runInNewContext(readFileSync(new URL('vendor/motion-14.1.0.js', root), 'utf8'), vendor);
assert.equal(typeof vendor.Motion.animate, 'function');
assert.equal(typeof vendor.Motion.inView, 'function');
const source = readFileSync(new URL('features/motion.js', root), 'utf8').replace(/^import .*;$/gm, '').replace(/^export /gm, '');
function setup(initialReduced = false) {
  const documentHandlers = new Map(), windowHandlers = new Map(), controls = [];
  let preferenceChange, observerCallback, released = 0, observers = 0, fail = false;
  const page = {};
  const preference = { matches: initialReduced, addEventListener: (_, callback) => { preferenceChange = callback; } };
  const document = { hidden: false, querySelector: () => page, addEventListener: (name, callback) => documentHandlers.set(name, callback) };
  const scope = { document, innerWidth: 390, matchMedia: () => preference, getComputedStyle: () => ({ transform: 'none' }), addEventListener: (name, callback) => windowHandlers.set(name, callback), Motion: {
    animate: (target, frames, options) => {
      if (fail) throw new Error('unsupported animation');
      let resolve;
      const control = { target, frames, options, cancelled: 0, finished: new Promise((done) => { resolve = done; }), cancel() { this.cancelled++; }, resolve: () => resolve() };
      controls.push(control); return control;
    },
    inView: (_, callback) => { observers++; observerCallback = callback; return () => { released++; }; },
  } };
  vm.runInNewContext(source + '\nmotion();', scope);
  return { controls, document, preference, documentHandlers, windowHandlers, fail: () => { fail = true; }, reduce: () => { preference.matches = true; preferenceChange(); }, reveal: (target) => observerCallback(target), observers: () => observers, released: () => released };
}
const reduced = setup(true);
reduced.reveal({});
assert.equal(reduced.controls.length, 0, 'reduced motion skips page and card entrances');
const app = setup();
assert.equal(app.controls.length, 1);
const card = {style:{transform:'',opacity:''}};
app.reveal(card); app.reveal(card);
assert.equal(app.controls.length, 2, 'cards reveal only once');
card.style.transform='matrix(1,0,0,1,0,0)';card.style.opacity='1';app.controls[1].resolve();
await new Promise(setImmediate);
assert.equal(card.style.transform,'','completed transforms restore fixed-position containment');
assert.equal(card.style.opacity,'');
app.controls[0].resolve();
await new Promise(setImmediate);
assert.equal(app.controls[0].cancelled, 1, 'completion removes transient transforms');
let completed = 0, prevented = 0;
app.documentHandlers.get('bx:picker-close')({ detail: { dialog: {}, complete: () => completed++ }, preventDefault: () => prevented++ });
assert.equal(prevented, 1);
app.reduce();
assert.equal(completed, 1, 'preference change finishes pending dialog close');
assert.equal(app.controls.at(-1).cancelled, 1);
const hidden = setup();
hidden.documentHandlers.get('bx:picker-close')({ detail: { dialog: {}, complete: () => completed++ }, preventDefault() {} });
hidden.document.hidden = true;
hidden.documentHandlers.get('visibilitychange')();
assert.equal(completed, 2, 'backgrounding finishes pending exit');
const count = hidden.controls.length;
hidden.documentHandlers.get('bx:picker-open')({ detail: { dialog: {} } });
assert.equal(hidden.controls.length, count, 'hidden pages skip entrance effects');
hidden.windowHandlers.get('pagehide')();
assert.equal(hidden.released(), 1, 'pagehide releases intersection observation');
hidden.windowHandlers.get('pageshow')({ persisted: true });
assert.equal(hidden.observers(), 2, 'back-forward restoration reconnects observation');
const failed = setup(); failed.fail();
failed.documentHandlers.get('bx:picker-close')({ detail: { dialog: {}, complete: () => completed++ }, preventDefault() {} });
assert.equal(completed, 3, 'unsupported animation never traps an open dialog');
console.log('PASS: official Motion exports, reduced motion, reveal deduplication, completion, hidden-page and restoration cleanup, failed-animation fallback');
