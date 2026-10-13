import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const source = readFileSync(new URL('../public/assets/js/features/reveal.js', import.meta.url), 'utf8').replace(/^export /gm, '');
function element(top, id = '') {
  const classes = new Set(['st-reveal']); const attrs = {};
  return { id, dataset: {}, top, classList: { add: (c) => classes.add(c), contains: (c) => classes.has(c), has: (c) => classes.has(c) }, getBoundingClientRect: () => ({ top, bottom: top + 100 }), setAttribute: (k, v) => { attrs[k] = v; }, removeAttribute: (k) => { delete attrs[k]; }, attrs, classes };
}
function world({ reduced = false, observer = true } = {}) {
  const root = { items: [element(100), element(2000), element(900)], links: [], sections: {} };
  root.querySelectorAll = (selector) => selector === '.st-reveal' ? root.items : root.links;
  root.querySelector = (selector) => root.sections[selector.slice(1)];
  const html = new Set(); const observers = [];
  const view = { innerHeight: 800, matchMedia: () => ({ matches: reduced }), document: { documentElement: { clientHeight: 800, classList: { add: (c) => html.add(c) } } } };
  if (observer) view.IntersectionObserver = class { constructor(callback) { this.callback = callback; this.watched = []; observers.push(this); } observe(target) { this.watched.push(target); } unobserve(target) { this.watched = this.watched.filter((t) => t !== target); } };
  return { root, view, html, observers };
}
const scope = { CSS: { escape: (v) => v } };
vm.runInNewContext(source + '\nthis.api={reveal,followContents};', scope);

const visible = world();
scope.api.reveal(visible.root, visible.view);
assert.ok(visible.root.items[0].classes.has('is-in'), 'on-screen content is shown before the page is marked ready');
assert.ok(!visible.root.items[1].classes.has('is-in'), 'below-the-fold content waits');
assert.ok(visible.html.has('reveal-ready'));
const watcher = visible.observers[0];
assert.equal(watcher.watched.length, 2, 'only hidden content is observed');
watcher.callback([{ isIntersecting: true, target: visible.root.items[1] }]);
assert.ok(visible.root.items[1].classes.has('is-in') && watcher.watched.length === 1, 'scrolled-to content is shown once');

for (const options of [{ reduced: true }, { observer: false }]) {
  const quiet = world(options);
  scope.api.reveal(quiet.root, quiet.view);
  assert.ok(quiet.root.items.every((item) => item.classes.has('is-in')) && !quiet.html.has('reveal-ready'), 'reduced motion and old browsers show everything without hiding');
}

const legal = world();
const a = element(0, 's-a'), b = element(0, 's-b');
legal.root.sections = { 's-a': a, 's-b': b };
const linkA = element(0); linkA.dataset.spy = 's-a'; const linkB = element(0); linkB.dataset.spy = 's-b';
legal.root.links = [linkA, linkB];
scope.api.followContents(legal.root, legal.view);
const spy = legal.observers[0];
spy.callback([{ isIntersecting: true, target: a, boundingClientRect: { top: 200 } }, { isIntersecting: true, target: b, boundingClientRect: { top: 500 } }]);
assert.equal(linkA.attrs['aria-current'], 'true'); assert.equal(linkB.attrs['aria-current'], undefined);
spy.callback([{ isIntersecting: false, target: a, boundingClientRect: { top: -50 } }]);
assert.equal(linkB.attrs['aria-current'], 'true', 'the contents follow the section being read'); assert.equal(linkA.attrs['aria-current'], undefined);
console.log('PASS: on-screen reveal before ready, scroll reveal once, reduced motion and no-observer fallback, contents follow the reader');
