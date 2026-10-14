import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
const classes = () => {
  const values = new Set();
  return { add: value => values.add(value), remove: value => values.delete(value), contains: value => values.has(value), toggle: (value, on) => { (on ?? !values.has(value)) ? values.add(value) : values.delete(value); } };
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
function boot({ path = '/', home = true, decode, font = Promise.resolve() } = {}) {
  const classList = classes(), events = {}, lifecycle = {}, timers = new Map();
  const root = { classList };
  const context = { location: { pathname: path }, document: { documentElement: root, fonts: { ready: font }, querySelector: query => query === '.home' ? (home ? {} : null) : (decode ? { decode } : null), addEventListener: (name, fn) => events[name] = fn }, window: { addEventListener: (name, fn) => lifecycle[name] = fn }, setTimeout: fn => { timers.set(1, fn); return 1; }, clearTimeout: id => timers.delete(id), Promise };
  vm.runInNewContext(bootSource, context);
  return { classList, events, lifecycle, timers };
}
const tick = async () => { for (let i = 0; i < 8; i++) await Promise.resolve(); };
let photoReady, fontReady;
const pending = boot({ decode: () => new Promise(resolve => photoReady = resolve), font: new Promise(resolve => fontReady = resolve) });
assert(pending.classList.contains('home-pending'));
pending.events.DOMContentLoaded(); photoReady(); await tick(); assert(pending.classList.contains('home-pending'), 'font still pending');
fontReady(); await tick(); assert(!pending.classList.contains('home-pending')); assert.equal(pending.timers.size, 0);
const failed = boot({ decode: () => Promise.reject(new Error('image unavailable')) }); failed.events.DOMContentLoaded(); await tick(); assert(!failed.classList.contains('home-pending'));
const errorPage = boot({ home: false }); errorPage.events.DOMContentLoaded(); assert(!errorPage.classList.contains('home-pending'));
const elsewhere = boot({ path: '/map' }); assert(!elsewhere.classList.contains('home-pending')); assert.equal(elsewhere.timers.size, 0);
for (const signal of ['focusin', 'pointerdown']) { const current = boot(); current.events[signal](); assert(!current.classList.contains('home-pending')); }
const timeout = boot(); timeout.timers.get(1)(); assert(!timeout.classList.contains('home-pending'));
const restored = boot(); restored.lifecycle.pageshow({ persisted: true }); assert(!restored.classList.contains('home-pending'));
console.log('PASS: map loading/expansion/Escape/focus/dialog precedence/exit; home resource readiness/failure/timeout/interaction/BFCache');
