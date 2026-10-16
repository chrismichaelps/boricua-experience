import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
function setup(count = 7, supported = true) {
  const element = () => ({ hidden: false, handlers: {}, addEventListener(name, fn) { this.handlers[name] = fn; }, focus() { this.focused = true; } });
  const image = { removeAttribute(name) { delete this[name]; } }, position = {};
  const previous = element(), next = element(), close = element();
  const dialog = { ...element(), open: false, showModal: supported ? function () { this.open = true; } : null, close() { this.open = false; this.handlers.close(); }, querySelector(selector) { return { '[data-photo="image"]': image, '[data-photo="position"]': position, '[data-photo="previous"]': previous, '[data-photo="next"]': next, '[data-photo="close"]': close }[selector]; } };
  const links = Array.from({ length: count }, (_, index) => ({ ...element(), dataset: { photoIndex: String(index) }, href: `https://example.test/${index}.jpg`, getAttribute() { return `Photo ${index + 1} of ${count}`; } }));
  const root = { ...element(), querySelector() { return dialog; }, querySelectorAll() { return links; }, contains(link) { return links.includes(link); } };
  const document = { documentElement: { style: { overflow: 'clip' } } }, lifecycle = {};
  const scope = { document, window: { addEventListener(name, fn) { lifecycle[name] = fn; } } };
  vm.runInNewContext(readFileSync('public/assets/js/features/placeGallery.js', 'utf8').replace('export function', 'function') + '\nthis.start = placeGallery;', scope);
  scope.start(root);
  function click(index, flags = {}) { const event = { button: 0, target: { closest() { return links[index]; } }, preventDefault() { this.prevented = true; }, ...flags }; root.handlers.click?.(event); return event; }
  function key(key, flags = {}) { const event = { key, preventDefault() { this.prevented = true; }, ...flags }; dialog.handlers.keydown(event); return event; }
  return { dialog, links, image, position, previous, next, close, document, lifecycle, click, key, root };
}
const state = setup();
for (const modifier of ['metaKey', 'ctrlKey', 'altKey', 'shiftKey']) {
  assert(!state.click(0, { [modifier]: true }).prevented, 'modified clicks retain normal links');
}
assert(state.click(6).prevented && state.dialog.open && state.close.focused);
assert.equal(state.image.src, 'https://example.test/6.jpg');
assert.equal(state.document.documentElement.style.overflow, 'hidden');
state.next.handlers.click(); assert.equal(state.image.src, 'https://example.test/0.jpg', 'next wraps');
state.previous.handlers.click(); assert.equal(state.image.src, 'https://example.test/6.jpg', 'previous wraps');
for (const modifier of ['altKey', 'ctrlKey', 'metaKey', 'shiftKey']) assert(!state.key('ArrowLeft', { [modifier]: true }).prevented);
assert(state.key('ArrowLeft').prevented); assert.equal(state.position.textContent, 'Photo 6 of 7');
assert(!state.key('Escape').prevented, 'native dialog owns Escape');
state.close.handlers.click(); assert.equal(state.document.documentElement.style.overflow, 'clip'); assert(state.links[6].focused); assert(!state.image.src);
state.click(2); state.lifecycle.pagehide(); assert(!state.dialog.open); assert.equal(state.document.documentElement.style.overflow, 'clip');
state.click(1); state.dialog.close(); assert(state.links[1].focused, 'external/native close restores focus');
const single = setup(1); assert(single.next.hidden && single.previous.hidden);
assert(!setup(2, false).root.handlers.click, 'unsupported dialog preserves image links');
assert(!setup(0).root.handlers.click, 'empty album remains inert');
console.log('PASS: gallery seven-photo navigation, wrapping, modifier shortcuts, native Escape, focus/scroll restoration, pagehide/reopen, single and unsupported states');
