export const REQUESTED_WITH = ['x-requested-with', 'boricua'];
export const ENDPOINTS = {
  suggest: '/api/suggest',
  nearby: '/api/nearby',
  location: '/api/location',
  locationStop: '/api/location/stop',
};
export const MAP = {
  style: '/assets/map/style.json?v=2',
  script: '/assets/vendor/maplibre-gl.js',
  stylesheet: '/assets/vendor/maplibre-gl.css',
  center: [-66.4, 18.22],
  zoom: 8.3,
  focusZoom: 14,
  bounds: [[-67.6, 17.4], [-65.0, 18.8]],
  pinZoom: 15,
};
export const LIVE = {
  minIntervalMs: 15000,
  minDistanceM: 25,
  nearbyRefreshM: 400,
  participantsRefreshMs: 20000,
  watch: { enableHighAccuracy: true, maximumAge: 10000, timeout: 20000 },
};
export const SUGGEST = { minLength: 2, delayMs: 180 };
export const STORAGE = { liveKey: 'bx-live' };
