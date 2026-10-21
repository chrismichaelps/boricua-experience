import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
function setup(count = 7, supported = true) {
  const element = () => ({ hidden: false, handlers: {}, addEventListener(name, fn) { this.handlers[name] = fn; }, focus() { this.focused = true; }, attrs: {}, setAttribute(k,v) { this.attrs[k]=v; }, removeAttribute(k) { delete this.attrs[k]; }, scrollIntoView() { this.scrolled=true; } });
  const image = { removeAttribute(name) { delete this[name]; } }, position = {};
  const previous = element(), next = element(), close = element(), stage = element(), reviewLink = element();
  const thumbnails = Array.from({ length: count }, (_, index) => ({ ...element(), dataset: { photoSelect: String(index) } }));
  const dialog = { ...element(), querySelectorAll(selector) { return selector==='[data-photo-select]'?thumbnails:[reviewLink]; }, open: false, showModal: supported ? function () { this.open = true; } : null, close() { this.open = false; this.handlers.close(); }, querySelector(selector) { return { '[data-photo="image"]': image, '[data-photo="position"]': position, '[data-photo="previous"]': previous, '[data-photo="next"]': next, '[data-photo="close"]': close, '[data-photo="stage"]': stage }[selector]; } };
  const summary = { ...element(), dataset: {} };
  const links = Array.from({ length: count }, (_, index) => ({ ...element(), dataset: { photoIndex: String(index) }, href: `https://example.test/${index}.jpg`, getAttribute() { return `Photo ${index + 1} of ${count}`; } }));
  const root = { ...element(), querySelector() { return dialog; }, querySelectorAll() { return links; }, contains(link) { return link===summary || links.includes(link); } };
  const document = { documentElement: { style: { overflow: 'clip' } } }, lifecycle = {};
  const scope = { document, window: { addEventListener(name, fn) { lifecycle[name] = fn; } } };
  vm.runInNewContext(readFileSync('public/assets/js/features/placeGallery.js', 'utf8').replace('export function', 'function') + '\nthis.start = placeGallery;', scope);
  scope.start(root);
  function click(index, flags = {}) { const event = { button: 0, target: { closest() { return links[index]; } }, preventDefault() { this.prevented = true; }, ...flags }; root.handlers.click?.(event); return event; }
  function key(key, flags = {}) { const event = { key, preventDefault() { this.prevented = true; }, ...flags }; dialog.handlers.keydown(event); return event; }
  return { summary, stage, reviewLink, thumbnails, dialog, links, image, position, previous, next, close, document, lifecycle, click, key, root };
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

const thumbState = setup(); thumbState.click(2);
assert.equal(thumbState.thumbnails[2].attrs['aria-current'],'true');
thumbState.thumbnails[5].handlers.click();
assert.equal(thumbState.image.src,'https://example.test/5.jpg');
assert.equal(thumbState.thumbnails[5].attrs['aria-current'],'true');
assert.equal(thumbState.thumbnails[2].attrs['aria-current'],undefined);
assert(thumbState.thumbnails[5].scrolled);
const swipe = (dx,dy=0,flags={}) => { thumbState.stage.handlers.pointerdown({isPrimary:true,button:0,pointerId:1,clientX:100,clientY:100,target:{closest:()=>null},...flags});thumbState.stage.handlers.pointerup({isPrimary:true,pointerId:1,clientX:100+dx,clientY:100+dy}); };
swipe(-70);assert.equal(thumbState.image.src,'https://example.test/6.jpg');
swipe(70);assert.equal(thumbState.image.src,'https://example.test/5.jpg');
swipe(12);swipe(70,100);swipe(-70,0,{isPrimary:false});
assert.equal(thumbState.image.src,'https://example.test/5.jpg','taps, vertical scrolling and secondary pointers never switch images');
thumbState.stage.handlers.pointerdown({isPrimary:true,button:0,pointerId:1,clientX:100,clientY:100,target:{closest:()=>null}});
thumbState.stage.handlers.pointercancel();
thumbState.stage.handlers.pointerup({isPrimary:true,pointerId:1,clientX:0,clientY:100});
assert.equal(thumbState.image.src,'https://example.test/5.jpg','cancelled gestures do not navigate');
thumbState.reviewLink.handlers.click({ctrlKey:true});assert(thumbState.dialog.open);
thumbState.reviewLink.handlers.click({});assert(!thumbState.dialog.open);
assert.equal(thumbState.document.documentElement.style.overflow,'clip');
console.log('PASS: current thumbnail, direct selection, horizontal swipe, cancelled/vertical gestures and review-link dismissal');

const albumEntry=setup();
albumEntry.root.handlers.click({button:0,target:{closest:selector=>selector==='.place-album > summary'?albumEntry.summary:null},preventDefault(){this.prevented=true;}});
assert(albumEntry.dialog.open);assert.equal(albumEntry.image.src,'https://example.test/0.jpg');
albumEntry.dialog.close();assert(albumEntry.summary.focused);
console.log('PASS: all-images entry opens the viewer and restores summary focus');
