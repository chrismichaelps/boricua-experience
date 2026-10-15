export const REQUESTED_WITH = ['x-requested-with', 'boricua'];
export const ENDPOINTS = {
  suggest: '/api/suggest',
  nearby: '/api/nearby',
  map: '/api/map',
  location: '/api/location',
  locationStop: '/api/location/stop',
};
export const MAP = { minViewportPx: 8,
  style: '/assets/map/style.json?v=80',
  script: '/assets/vendor/maplibre-gl.js',
  stylesheet: '/assets/vendor/maplibre-gl.css',
  center: [-66.4, 18.22],
  zoom: 8.3,
  focusZoom: 11,
  selfZoom: 15,
  // "Near me" frames the visitor with up to this many activities within this distance.
  nearbyFrameCount: 3,
  nearbyFrameM: 25000,
  bounds: [[-70, 12], [-62, 24]],
  pinZoom: 15,
  viewportDelayMs: 300,
  viewportCacheMs: 30000,
  viewportCacheSize: 8,
  maxRadiusM: 200000,
  searchBounds: [[-67.5, 17.5], [-65.1, 18.7]],
  // The main island with Vieques and Culebra, which the whole-island view frames.
  islandBounds: [[-67.28, 17.9], [-65.22, 18.53]],
  clusterRadius: 56,
  clusterMaxZoom: 13,
  gridMaxZoom: 18,
  gridMinDeg: 0.002,
  // [below metres per second, zoom]: walking, cycling or bus, train or car, highway.
  speedZoom: [[2.5, 15], [9, 14], [22, 13], [Infinity, 12]],
  speedMinSeconds: 3,
  speedMargin: 0.2,
  pitch3d: 50,
  buildingsZoom: 15.5,
  // Degrees one turn button moves the camera, the turn worth reporting, and the steepest tilt.
  turnStep: 30,
  turnNoticeDeg: 15,
  maxPitch: 70,
};
export const LIVE = {
  minIntervalMs: 15000,
  minDistanceM: 25,
  nearbyRefreshM: 400,
  participantsRefreshMs: 20000,
  watch: { enableHighAccuracy: true, maximumAge: 10000, timeout: 20000 },
};
export const SUGGEST = { minLength: 2, delayMs: 180 };
export const STORAGE = { liveKey: 'bx-live', unreadKey: 'bx-unread', map3dKey: 'bx-map-3d' };

export const CAROUSEL = { intervalMs: 6000 };

export const GEO = { precise: {enableHighAccuracy:true, maximumAge:10000, timeout:12000}, balanced: {enableHighAccuracy:false, maximumAge:60000, timeout:10000}, deadlineMs:25000, attempts:4, retryMs:1500, approximateM:100 };
