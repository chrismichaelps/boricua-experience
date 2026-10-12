import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

let stored = null, storageFails = false, reduced = false;
const localStorage = { getItem: () => { if (storageFails) throw new Error('blocked'); return stored; }, setItem: (_key, value) => { if (storageFails) throw new Error('blocked'); stored = value; } };
const scope = { MAP: { pitch3d: 50, buildingsZoom: 15.5 }, STORAGE: { map3dKey: 'bx-map-3d' }, localStorage, matchMedia: () => ({ matches: reduced }) };
const source = readFileSync(new URL('../public/assets/js/features/map3d.js', import.meta.url), 'utf8').replace(/^import .*;$/gm, '').replace(/^export /gm, '');
vm.runInNewContext(source + '\nthis.api={view3d,buildings3d};', scope);

function fakeMap(zoom = 11, loaded = true) {
  const map = { zoom, bearing: 30, layer: 'none', eases: [], loadHandler: null,
    getLayer: () => true, setLayoutProperty: (_id, _name, value) => { map.layer = value; },
    getZoom: () => map.zoom, getBearing: () => map.bearing, easeTo: (camera) => map.eases.push(camera),
    isStyleLoaded: () => loaded, once: (_name, handler) => { map.loadHandler = handler; } };
  return map;
}
function fakeButton() { const attrs = {}; let click = null; return { attrs, setAttribute: (k, v) => { attrs[k] = v; }, addEventListener: (_n, h) => { click = h; }, click: () => click() }; }

const plain = fakeMap(); const off = fakeButton();
scope.api.buildings3d(plain, off);
assert.equal(off.attrs['aria-pressed'], 'false'); assert.equal(plain.layer, 'none'); assert.equal(plain.eases.at(-1).pitch, 0, 'default is the flat map');

stored = '1';
const remembered = fakeMap(8.3); const on = fakeButton();
scope.api.buildings3d(remembered, on);
assert.equal(on.attrs['aria-pressed'], 'true'); assert.equal(remembered.layer, 'visible'); assert.equal(remembered.eases.at(-1).pitch, 50);
assert.equal(remembered.eases.at(-1).zoom, undefined, 'restoring a remembered choice keeps the island framing');
assert.equal(remembered.eases.at(-1).duration, 0, 'restoring does not animate');

stored = null;
const chosen = fakeMap(11); const toggle = fakeButton();
scope.api.buildings3d(chosen, toggle); toggle.click();
assert.equal(stored, '1'); assert.equal(chosen.eases.at(-1).zoom, 15.5, 'turning 3D on zooms to where buildings show');
assert.equal(chosen.eases.at(-1).duration, 600);
toggle.click();
assert.equal(stored, '0'); assert.equal(chosen.layer, 'none'); assert.equal(chosen.eases.at(-1).pitch, 0); assert.equal(chosen.eases.at(-1).bearing, 0, 'off restores a flat north-up map');

reduced = true; storageFails = true;
const blocked = fakeMap(16, false); const quiet = fakeButton();
scope.api.buildings3d(blocked, quiet);
assert.equal(blocked.eases.length, 0, 'waits for the style'); blocked.loadHandler();
quiet.click();
assert.equal(blocked.layer, 'visible', 'blocked storage never stops the switch'); assert.equal(blocked.eases.at(-1).duration, 0, 'reduced motion jumps');
console.log('PASS: 3D off by default, remembered choice keeps framing, explicit switch zooms and restores flat north-up, style wait, blocked storage and reduced motion');
