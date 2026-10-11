import { MAP } from '../constants/config.js?v=39';

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
    pitchWithRotate: false,
  });
  map.touchZoomRotate.disableRotation();
  if (options.controls !== false) map.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'bottom-right');
  return { map, maplibregl };
}
