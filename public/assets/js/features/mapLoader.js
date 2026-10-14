import { MAP } from '../constants/config.js?v=68';

let loading = null;

function loadStylesheet(href) {
  if (document.querySelector(`link[href="${href}"]`)) return;
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = href;
  document.head.append(link);
}

export function mapLibrary() {
  if (window.maplibregl) return Promise.resolve(window.maplibregl);
  loading ??= new Promise((resolve, reject) => {
    loadStylesheet(MAP.stylesheet);
    const script = document.createElement('script');
    script.src = MAP.script;
    script.onload = () => resolve(window.maplibregl);
    script.onerror = reject;
    document.head.append(script);
  });
  return loading;
}

export async function createMap(container, options = {}) {
  const maplibregl = await mapLibrary();
  const map = new maplibregl.Map({
    container,
    style: MAP.style,
    center: options.center ?? MAP.center,
    zoom: options.zoom ?? MAP.zoom,
    maxBounds: MAP.bounds,
    attributionControl: { compact: true },
    cooperativeGestures: options.cooperative ?? false,
    dragRotate: false,
    // A rotatable map tilts while turning once its 3D view enables rotation; others stay flat.
    pitchWithRotate: options.rotatable ?? false,
    maxPitch: MAP.maxPitch,
  });
  map.touchZoomRotate.disableRotation();
  // The map data's licence asks for visible credit, so it stays, folded into its small "i" button
  // from the start instead of a banner across the map; a tap still opens it.
  map.once('load', () => {
    const credit = container.querySelector('.maplibregl-ctrl-attrib.maplibregl-compact-show');
    credit?.querySelector('.maplibregl-ctrl-attrib-button')?.click();
  });
  if (options.controls !== false) map.addControl(new maplibregl.NavigationControl({ showCompass: false }), options.controlsAt ?? 'bottom-right');
  return { map, maplibregl };
}
