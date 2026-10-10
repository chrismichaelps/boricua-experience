import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
let watches = 0;
let positionCallback;
let errorCallback;
const posted = [];
const states = [];
const cleared = [];
const handlers = new Map();
const badge = { hidden: true };
const document = { visibilityState: 'visible', getElementById: () => badge, addEventListener: (name, fn) => handlers.set(name, fn) };
const scope = {
  window: { addEventListener: () => {} }, document, navigator: { geolocation: { watchPosition: (success, error) => { positionCallback = success; errorCallback = error; return ++watches; }, clearWatch: (id) => cleared.push(id) } },
  sessionStorage: { setItem: () => {}, getItem: () => null },
  ENDPOINTS: { location: '/api/location', locationStop: '/api/location/stop' }, LIVE: { watch: {maximumAge: 10000}, minIntervalMs: 15000, minDistanceM: 25 }, STORAGE: { liveKey: 'test' },
  postJson: async (url) => { posted.push(url); return {}; }, distanceM: () => 100, readingOf: (position) => position, message: (name) => name, toast: () => {},
};
const source = readFileSync(new URL('../public/assets/js/features/live.js', import.meta.url), 'utf8').replace(/^import .*;$/gm, '').replace(/^export /gm, '');
vm.runInNewContext(source + '\nthis.api = { startWatching, stopWatching, startSharing, stopSharing, isSharing, onReading, onStatus };', scope);
scope.api.startWatching(); scope.api.startWatching();
assert.equal(watches, 1, 'duplicate start must not create another watch');
document.visibilityState = 'hidden'; handlers.get('visibilitychange')();
assert.deepEqual(cleared, [1], 'guest local watch must stop when hidden');
document.visibilityState = 'visible'; handlers.get('visibilitychange')();
assert.equal(watches, 1, 'guest watch must not restart without a tap');
document.visibilityState = 'hidden';
scope.api.startWatching();
assert.equal(watches, 1, 'a delayed sharing-off callback must not restart a hidden page watch');
document.visibilityState = 'visible';
scope.api.startSharing();
assert.equal(watches, 2); assert.equal(badge.hidden, false);
await scope.api.stopSharing();
assert.deepEqual(cleared, [1, 2]); assert.equal(scope.api.isSharing(), false); assert.equal(badge.hidden, true);
scope.api.startSharing();
document.visibilityState = 'hidden'; handlers.get('visibilitychange')();
assert.deepEqual(cleared, [1, 2, 3]);
document.visibilityState = 'visible'; handlers.get('visibilitychange')();
assert.equal(watches, 4, 'enabled sharing may resume when visible');
await scope.api.stopSharing();
console.log('PASS: duplicate starts, guest hide, explicit sharing off, enabled sharing pause/resume');

scope.api.onStatus(value => states.push(value));
scope.api.startWatching();
let reading = null;
const unsubscribe = scope.api.onReading(value => { reading = value; });
positionCallback({lat:18.4,lng:-66.1,accuracy:12});
assert.equal(reading.lat,18.4);
assert.equal(posted.filter(url=>url==='/api/location').length,0,'local locate never shares a position');
errorCallback({code:1});
assert.equal(states.at(-1),'error');
assert.equal(scope.api.isSharing(),false);
scope.api.startWatching();
assert.equal(states.at(-1),'waiting','denied location can retry');
errorCallback({code:3});
assert.equal(states.at(-1),'error','timeout must reset controls');
unsubscribe();
scope.navigator.geolocation = null;
scope.api.startWatching();
assert.equal(states.at(-1),'error','unsupported API is an actionable failure');
console.log('PASS: fresh readings, no local sharing, denial/retry, timeout and unsupported API states');
