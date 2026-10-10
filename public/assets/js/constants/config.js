export const REQUESTED_WITH = ['x-requested-with', 'boricua'];
export const ENDPOINTS = {
  suggest: '/api/suggest',
  nearby: '/api/nearby',
  map: '/api/map',
  location: '/api/location',
  locationStop: '/api/location/stop',
};
export const MAP = {
  style: '/assets/map/style.json?v=28',
  script: '/assets/vendor/maplibre-gl.js',
  stylesheet: '/assets/vendor/maplibre-gl.css',
  center: [-66.4, 18.22],
  zoom: 8.3,
  focusZoom: 11,
  selfZoom: 15,
  bounds: [[-70, 12], [-62, 24]],
  pinZoom: 15,
  viewportDelayMs: 300,
  viewportCacheMs: 30000,
  viewportCacheSize: 8,
  maxRadiusM: 200000,
  searchBounds: [[-67.5, 17.5], [-65.1, 18.7]],
  clusterRadius: 56,
  clusterMaxZoom: 13,
};
export const LIVE = {
  minIntervalMs: 15000,
  minDistanceM: 25,
  nearbyRefreshM: 400,
  participantsRefreshMs: 20000,
  watch: { enableHighAccuracy: true, maximumAge: 10000, timeout: 20000 },
};
export const SUGGEST = { minLength: 2, delayMs: 180 };
export const STORAGE = { liveKey: 'bx-live', unreadKey: 'bx-unread' };

export const CAROUSEL = { intervalMs: 6000 };
