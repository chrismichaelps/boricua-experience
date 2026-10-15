import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

let stored = null, storageFails = false, reduced = false;
const localStorage = { getItem: () => { if (storageFails) throw new Error('blocked'); return stored; }, setItem: (_key, value) => { if (storageFails) throw new Error('blocked'); stored = value; } };
const events = [];
const scope = { MAP: { pitch3d: 50, buildingsZoom: 15.5, turnStep: 30, turnNoticeDeg: 15 }, CustomEvent: class { constructor(type, init) { this.type = type; this.detail = init.detail; } }, document: { dispatchEvent: (event) => events.push(event) }, STORAGE: { map3dKey: 'bx-map-3d' }, localStorage, matchMedia: () => ({ matches: reduced }) };
const source = readFileSync(new URL('../public/assets/js/features/map3d.js', import.meta.url), 'utf8').replace(/^import .*;$/gm, '').replace(/^export /gm, '');
vm.runInNewContext(source + '\nthis.api={view3d,buildings3d,turn,rotation};', scope);

function handler() { return { on: false, enable() { this.on = true; }, disable() { this.on = false; } }; }
function fakeMap(zoom = 11, loaded = true) {
  const map = { zoom, bearing: 30, layer: 'none', eases: [], loadHandler: null,
    getLayer: () => true, setLayoutProperty: (_id, _name, value) => { map.layer = value; },
    getZoom: () => map.zoom, getBearing: () => map.bearing, easeTo: (camera) => map.eases.push(camera),
    isStyleLoaded: () => loaded, once: (_name, handler) => { map.loadHandler = handler; }, on: (name, handler) => { (map.handlers[name] ??= []).push(handler); }, handlers: {},
    dragRotate: handler(), touchPitch: handler(), touchZoomRotate: { rotation: false, enableRotation() { this.rotation = true; }, disableRotation() { this.rotation = false; } }, keyboard: { rotation: false, enableRotation() { this.rotation = true; }, disableRotation() { this.rotation = false; } } };
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

const turning = fakeMap(16); turning.bearing = 0;
scope.api.view3d(turning, true, false);
assert.ok(turning.dragRotate.on && turning.touchPitch.on && turning.touchZoomRotate.rotation && turning.keyboard.rotation, '3D enables drag, twist, tilt and keyboard rotation');
scope.api.turn(turning, 30); assert.equal(turning.eases.at(-1).bearing, 30, 'a turn step adds to the bearing');
turning.bearing = 200; scope.api.turn(turning, null); assert.equal(turning.eases.at(-1).bearing, 0, 'north resets the bearing');
scope.api.view3d(turning, false, false);
assert.ok(!turning.dragRotate.on && !turning.touchPitch.on && !turning.touchZoomRotate.rotation && !turning.keyboard.rotation, '2D locks rotation');
const buttons = [];
const group = { hidden: true, querySelector: () => null, querySelectorAll: () => buttons };
for (const value of ['-1', '1']) { let click; buttons.push({ dataset: { turn: value }, addEventListener: (_n, h) => { click = h; }, click: () => click() }); }
stored = '1'; reduced = false; storageFails = false;
const grouped = fakeMap(16); grouped.bearing = 10; const switch3d = fakeButton();
scope.api.buildings3d(grouped, switch3d, group);
assert.equal(group.hidden, false, 'turn controls show in 3D');
buttons[1].click(); assert.equal(grouped.eases.at(-1).bearing, 40, 'right turn button');
grouped.bearing = 40; grouped.handlers.rotateend[0]({ originalEvent: {} });
assert.equal(events.at(-1).detail.action, 'map_rotate', 'a visible turn is reported');
switch3d.click(); assert.equal(group.hidden, true, 'turn controls hide in 2D');
console.log('PASS: 3D rotation gestures/keyboard enabled only in 3D, turn steps, north reset, turn controls visibility and turn report');
console.log('PASS: 3D off by default, remembered choice keeps framing, explicit switch zooms and restores flat north-up, style wait, blocked storage and reduced motion');

const joystickHandlers={}, captured=new Set(), exploration=[];
const compass={dataset:{turn:'north'},style:{},setAttribute(){},querySelector:()=>({style:{}}),
 addEventListener(name,fn,capture=false){joystickHandlers[name+':'+Boolean(capture)]=fn;},
 setPointerCapture:id=>captured.add(id),hasPointerCapture:id=>captured.has(id),releasePointerCapture:id=>captured.delete(id)};
const joystickGroup={hidden:false,closest:()=>({}),querySelector:()=>compass,querySelectorAll:()=>[compass],dispatchEvent:e=>exploration.push(e)};
stored='1';const joystickMap=fakeMap(16);joystickMap.bearing=10;
scope.api.buildings3d(joystickMap,fakeButton(),joystickGroup);
const send=(name,event={})=>joystickHandlers[name+':false']({type:name,button:0,isPrimary:true,pointerId:1,clientX:100,...event});
const beforeDrag=joystickMap.eases.length;
send('pointerdown',{isPrimary:false});send('pointermove',{clientX:130});assert.equal(joystickMap.eases.length,beforeDrag,'ignore secondary pointer');
send('pointerdown');send('pointermove',{clientX:102});assert.equal(joystickMap.eases.length,beforeDrag,'jitter remains a tap');
send('pointermove',{clientX:120});assert.equal(joystickMap.eases.at(-1).bearing,50);assert.equal(joystickMap.eases.at(-1).duration,0);
assert.equal(exploration.at(-1).type,'bx:map-explore','rotation detaches location follow');
send('pointerup');let suppressed=false;
joystickHandlers['click:true']({detail:1,preventDefault(){},stopImmediatePropagation(){suppressed=true;}});assert(suppressed,'drag click cannot reset north');
assert.equal(captured.size,0);
send('click');assert.equal(joystickMap.eases.at(-1).bearing,0,'a plain tap still faces north');
send('keydown',{key:'ArrowLeft',preventDefault(){}});assert.equal(joystickMap.eases.at(-1).bearing,-20,'keyboard turns left');
send('keydown',{key:'Home',preventDefault(){}});assert.equal(joystickMap.eases.at(-1).bearing,0,'Home faces north');
send('pointerdown');send('pointercancel');const canceledAt=joystickMap.eases.length;send('pointermove',{clientX:180});assert.equal(joystickMap.eases.length,canceledAt);
console.log('PASS: compact joystick pointer capture, threshold, drag/click distinction, keyboard and cancellation');
