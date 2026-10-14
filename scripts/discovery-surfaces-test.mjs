import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
const classes = () => {
  const values = new Set();
  return { add: value => values.add(value), remove: (...names) => names.forEach(value => values.delete(value)), contains: value => values.has(value), toggle: (value, on) => { (on ?? !values.has(value)) ? values.add(value) : values.delete(value); } };
};
const control = { dataset: { expandLabel: 'Expand', closeLabel: 'Close' }, hidden: true, attrs: {}, handlers: {}, setAttribute(key, value) { this.attrs[key] = value; }, addEventListener(key, fn) { this.handlers[key] = fn; }, focus() { this.focused = true; } };
const indicator = { hidden: true }, list = { attrs: {}, setAttribute(key, value) { this.attrs[key] = value; } };
const page = { dataset: {}, classList: classes(), querySelector: selector => selector === '.map-loading' ? indicator : control };
const docEvents = {}, winEvents = {};
let dialog = null, resizes = 0, updates = 0;
const scope = { document: { querySelector: () => dialog, addEventListener: (name, fn) => docEvents[name] = fn }, window: { addEventListener: (name, fn) => winEvents[name] = fn } };
vm.runInNewContext(readFileSync('public/assets/js/features/mapSurface.js', 'utf8').replace(/^export /gm, '') + '\nthis.start=mapSurface;', scope);
const surface = scope.start(page, list);
surface.busy(true); assert.equal(indicator.hidden, false); assert.equal(list.attrs['aria-busy'], 'true');
surface.busy(false); assert.equal(indicator.hidden, true);
surface.connect({ resize() { resizes++; } }, () => updates++); assert.equal(control.hidden, false);
control.handlers.click(); assert.equal(page.dataset.mapExpanded, '1'); assert.equal(control.attrs['aria-label'], 'Close'); assert.equal(resizes, 1); assert.equal(updates, 1);
dialog = {}; docEvents.keydown({ key: 'Escape' }); assert.equal(page.dataset.mapExpanded, '1', 'open dialog owns Escape');
dialog = null; let prevented = false;
docEvents.keydown({ key: 'Escape', preventDefault() { prevented = true; } });
assert(prevented && control.focused); assert.equal(page.dataset.mapExpanded, '0'); assert.equal(control.attrs['aria-label'], 'Expand');
control.handlers.click(); control.handlers.click(); assert.equal(page.dataset.mapExpanded, '0', 'repeat expansion remains reversible');
surface.busy(true); winEvents.pagehide(); assert.equal(indicator.hidden, true, 'exit clears loading');
const bootSource = readFileSync('public/assets/js/home-readiness.js', 'utf8');
assert(bootSource.includes('disabled'), 'initial skeleton app loading is disabled');
function boot({ path = '/', home = true, decode, cached = false, font = Promise.resolve() } = {}) {
  const classList = classes(), events = {}, lifecycle = {}, timers = new Map();
  const root = { classList };
  const context = { location: { pathname: path }, document: { documentElement: root, fonts: { ready: font }, querySelector: query => query === '.home' ? (home ? {} : null) : (decode ? { decode, complete: cached, naturalWidth: cached ? 1600 : 0 } : null), addEventListener: (name, fn) => events[name] = fn }, window: { addEventListener: (name, fn) => lifecycle[name] = fn }, setTimeout: (fn, ms) => { const id = ms; timers.set(id, fn); return id; }, clearTimeout: id => timers.delete(id), Promise };
  vm.runInNewContext(bootSource, context);
  return { classList, events, lifecycle, timers };
}
// Disabled: running the readiness script never marks the page pending or waiting,
// schedules no timers, and registers no reveal handlers.
for (const args of [{}, { path: '/map' }, { home: false }]) {
  const state = boot(args);
  assert(!state.classList.contains('home-pending'), 'no pending class while disabled');
  assert(!state.classList.contains('home-waiting'), 'no waiting class while disabled');
  assert.equal(state.timers.size, 0, 'no timers while disabled');
  assert.equal(Object.keys(state.events).length, 0, 'no document handlers while disabled');
  assert.equal(Object.keys(state.lifecycle).length, 0, 'no window handlers while disabled');
}
console.log('PASS: map loading/expansion/Escape/focus/dialog precedence/exit; initial skeleton loading disabled');
