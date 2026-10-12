import { MAP, STORAGE } from '../constants/config.js?v=56';

const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

function remembered() {
  try { return localStorage.getItem(STORAGE.map3dKey) === '1'; } catch { return false; }
}

function remember(on) {
  try { localStorage.setItem(STORAGE.map3dKey, on ? '1' : '0'); } catch { /* the view still switches */ }
}

// The camera and layer for a view: 3D tilts the camera and raises buildings from their mapped heights;
// 2D restores the flat, north-up map. Buildings exist only where OpenStreetMap maps them.
export function view3d(map, on, animate = true) {
  if (map.getLayer('building-3d')) map.setLayoutProperty('building-3d', 'visibility', on ? 'visible' : 'none');
  const camera = { pitch: on ? MAP.pitch3d : 0, bearing: on ? map.getBearing() : 0 };
  if (on && map.getZoom() < MAP.buildingsZoom) camera.zoom = MAP.buildingsZoom;
  map.easeTo({ ...camera, duration: animate && !reduced() ? 600 : 0 });
}

// The 3D switch on the map page; the choice is kept in this browser only.
export function buildings3d(map, button) {
  let on = remembered();
  const apply = (animate) => {
    button.setAttribute('aria-pressed', String(on));
    view3d(map, on, animate);
  };
  button.addEventListener('click', () => { on = !on; remember(on); apply(true); });
  if (map.isStyleLoaded()) apply(false); else map.once('load', () => apply(false));
}
