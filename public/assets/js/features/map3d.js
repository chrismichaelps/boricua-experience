import { MAP, STORAGE } from '../constants/config.js?v=80';

const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

function remembered() {
  try { return localStorage.getItem(STORAGE.map3dKey) === '1'; } catch { return false; }
}

function remember(on) {
  try { localStorage.setItem(STORAGE.map3dKey, on ? '1' : '0'); } catch { /* the view still switches */ }
}

// Free camera control in 3D: right-drag or ctrl-drag turns and tilts, a two-finger twist turns, a
// two-finger slide tilts, and shift with the arrow keys turns from the keyboard. 2D keeps the map
// north-up so a list reader is never disoriented.
export function rotation(map, on) {
  const method = on ? 'enable' : 'disable';
  map.dragRotate?.[method]();
  map.touchPitch?.[method]();
  if (on) { map.touchZoomRotate?.enableRotation(); map.keyboard?.enableRotation?.(); }
  else { map.touchZoomRotate?.disableRotation(); map.keyboard?.disableRotation?.(); }
}

// The camera and layer for a view: 3D tilts the camera and raises buildings from their mapped heights;
// 2D restores the flat, north-up map. Buildings exist only where OpenStreetMap maps them.
export function view3d(map, on, animate = true, zoomIn = true) {
  if (map.getLayer('building-3d')) map.setLayoutProperty('building-3d', 'visibility', on ? 'visible' : 'none');
  rotation(map, on);
  const camera = { pitch: on ? MAP.pitch3d : 0, bearing: on ? map.getBearing() : 0 };
  // Only the visitor's own switch zooms in; restoring a remembered choice keeps the page's framing.
  // A map framing a whole route keeps its framing and only tilts.
  if (on && animate && zoomIn && map.getZoom() < MAP.buildingsZoom) camera.zoom = MAP.buildingsZoom;
  map.easeTo({ ...camera, duration: animate && !reduced() ? 600 : 0 });
}

// Turns the camera by a step around the current center, or back to north with a step of null.
export function turn(map, step) {
  const bearing = step === null ? 0 : map.getBearing() + step;
  map.easeTo({ bearing, duration: reduced() ? 0 : 350 });
}

// A compact discovery compass doubles as a captured drag control; a tap still faces north.
function joystick(map, group, button) {
  let drag = null, suppressClick = false;
  const exploring = () => group.dispatchEvent(new CustomEvent('bx:map-explore', { bubbles: true }));
  button.addEventListener('pointerdown', event => {
    if (event.button !== 0 || event.isPrimary === false || drag) return;
    suppressClick = false;
    drag = { id: event.pointerId, x: event.clientX, bearing: map.getBearing(), moved: false };
    button.setPointerCapture(event.pointerId);
  });
  button.addEventListener('pointermove', event => {
    if (!drag || event.pointerId !== drag.id) return;
    const delta = event.clientX - drag.x;
    if (!drag.moved && Math.abs(delta) < 4) return;
    if (!drag.moved) exploring();
    drag.moved = true;
    map.easeTo({ bearing: drag.bearing + delta * 2, duration: 0 });
  });
  const finish = event => {
    if (!drag || event.pointerId !== drag.id) return;
    suppressClick = event.type === 'pointerup' && drag.moved;
    drag = null;
    if (button.hasPointerCapture(event.pointerId)) button.releasePointerCapture(event.pointerId);
  };
  for (const name of ['pointerup', 'pointercancel', 'lostpointercapture']) button.addEventListener(name, finish);
  button.addEventListener('click', event => {
    if (suppressClick && event.detail !== 0) { suppressClick = false; event.preventDefault(); event.stopImmediatePropagation(); }
    else { suppressClick = false; exploring(); }
  }, true);
  button.addEventListener('keydown', event => {
    if (event.altKey || event.ctrlKey || event.metaKey || !['ArrowLeft', 'ArrowRight', 'Home'].includes(event.key)) return;
    event.preventDefault(); exploring();
    turn(map, event.key === 'Home' ? null : (event.key === 'ArrowLeft' ? -MAP.turnStep : MAP.turnStep));
  });
}

// The turn buttons and compass shown while 3D is on; the compass needle follows the bearing.
function rotationControls(map, group) {
  if (!group) return () => {};
  const compass = group.querySelector('[data-turn="north"]');
  const needle = compass?.querySelector('.map-compass-needle');
  if (compass && group.closest?.('.map-page')) joystick(map, group, compass);
  const paint = () => {
    const bearing = map.getBearing();
    if (needle) needle.style.transform = `rotate(${-bearing}deg)`;
    compass?.setAttribute('aria-pressed', String(Math.abs(bearing) < 0.5));
  };
  for (const button of group.querySelectorAll('[data-turn]')) {
    button.addEventListener('click', () => {
      const value = button.dataset.turn;
      turn(map, value === 'north' ? null : Number(value) * MAP.turnStep);
    });
  }
  map.on('rotate', paint);
  // A turn the visitor made by hand or with the buttons, for features that count map exploration.
  map.on('rotateend', (event) => {
    if (Math.abs(map.getBearing()) >= MAP.turnNoticeDeg) document.dispatchEvent(new CustomEvent('bx:action', { detail: { action: 'map_rotate', user: Boolean(event?.originalEvent) } }));
  });
  paint();
  return (on) => { group.hidden = !on; paint(); };
}

// The 3D switch on the map page; the choice is kept in this browser only. A route map passes
// zoomIn false so turning 3D on tilts the whole route instead of zooming into its middle.
export function buildings3d(map, button, group = null, { zoomIn = true } = {}) {
  let on = remembered();
  const showControls = rotationControls(map, group);
  const apply = (animate) => {
    button.setAttribute('aria-pressed', String(on));
    view3d(map, on, animate, zoomIn);
    showControls(on);
  };
  button.addEventListener('click', () => {
    on = !on; remember(on); apply(true);
    if (on) document.dispatchEvent(new CustomEvent('bx:action', { detail: { action: 'map_3d', user: true } }));
  });
  if (map.isStyleLoaded()) apply(false); else map.once('load', () => apply(false));
}
