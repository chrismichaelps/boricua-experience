import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

// A minimal document: a rail is an object with items; position is its index around the slot (0).
const PRECEDING = 2;
const railOf = (hrefs, position) => {
  const rail = { position, removed: false, remove() { this.removed = true; } };
  rail.items = hrefs.map((href) => ({ href, removed: false, querySelector: () => ({ getAttribute: () => href }), remove() { this.removed = true; } }));
  rail.querySelectorAll = () => rail.items.filter((i) => !i.removed);
  rail.querySelector = (s) => (s === '.rail-item' ? rail.items.find((i) => !i.removed) || null : null);
  return rail;
};
let incoming, page;
const document = {
  querySelectorAll: () => page.filter((r) => !r.removed),
  createElement: () => ({ set innerHTML(_) {}, content: { querySelector: () => incoming } }),
};
const source = readFileSync(new URL('../public/assets/js/features/nearRail.js', import.meta.url), 'utf8').replace(/^import .*;$/gm, '').replace(/^export /gm, '');
const scope = { document, Node: { DOCUMENT_POSITION_PRECEDING: PRECEDING } };
vm.runInNewContext(source + '\nthis.nearRail = nearRail;', scope);
const slot = () => ({ dataset: { src: '/api/home/near' }, replaced: null, replaceChildren(node) { this.replaced = node; }, compareDocumentPosition: (other) => (other.position < 0 ? PRECEDING : 4) });
const live = (rail) => rail.items.filter((i) => !i.removed).map((i) => i.href);
const html = async () => ({ html: '<section class="rail"></section>' });

const popular = railOf(['/e/a'], -1), soon = railOf(['/e/b', '/e/c'], 1), free = railOf(['/e/c'], 2);
page = [popular, soon, free];
incoming = railOf(['/e/a', '/e/c', '/e/d']);
let target = slot();
await scope.nearRail(target, html);
assert.equal(target.replaced, incoming, 'the near rail is inserted');
assert.deepEqual(live(incoming), ['/e/c', '/e/d'], 'cards shown above it are dropped');
assert.deepEqual(live(soon), ['/e/b'], 'rails below give up the cards it shows');
assert.equal(free.removed, true, 'a rail left empty disappears');
assert.equal(popular.removed, false, 'rails above are untouched');

page = [railOf(['/e/a', '/e/b'], -1)];
incoming = railOf(['/e/a', '/e/b']);
target = slot();
await scope.nearRail(target, html);
assert.equal(target.replaced, null, 'a rail with only cards shown above is not inserted');

target = slot();
await scope.nearRail(target, async () => ({ html: '' }));
assert.equal(target.replaced, null, 'no remembered town inserts nothing');
target = slot();
await scope.nearRail(target, async () => { throw new Error('offline'); });
assert.equal(target.replaced, null, 'a failed read leaves the tile');
console.log('PASS: remembered-town rail, one rail per event above and below it, empty rails removed, empty and failed reads');
