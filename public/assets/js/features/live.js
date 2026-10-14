import { ENDPOINTS, LIVE } from '../constants/config.js?v=68';
import { message } from '../constants/messages.js?v=68';
import { postJson } from '../net/http.js?v=68';
import { distanceM, readingOf } from '../utils/geo.js?v=68';
import { requestLocation } from '../utils/locate.js?v=68';
import { toast } from './toast.js?v=68';

const listeners = new Set(), statuses = new Set();
const status = value => { for (const listener of statuses) listener(value); };
let readingAt = 0, watchId = null, acquisition = null, epoch = 0;
let sharing = false, lastSent = null, lastReading = null;
let writes = Promise.resolve();
const badge = visible => { const node = document.getElementById('live-badge'); if (node) node.hidden = !visible; };

function boundedPost(url, data, keepalive = false) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 10000);
  return postJson(url, data, keepalive, {signal:controller.signal}).finally(() => clearTimeout(timer));
}
function maybeSend(reading) {
  if (!sharing) return;
  const now = Date.now(), ticket = epoch;
  if (lastSent && (now - lastSent.at < LIVE.minIntervalMs || distanceM(lastSent, reading) < LIVE.minDistanceM)) return;
  lastSent = { ...reading, at: now };
  writes = writes.catch(() => {}).then(async () => {
    if (!sharing || ticket !== epoch) return;
    try { await boundedPost(ENDPOINTS.location, reading, true); }
    catch (error) { if (ticket === epoch && [401,403].includes(error.status)) void stopSharing(); }
  });
}

function onPosition(position) {
  const reading = readingOf(position);
  if (![reading.lat, reading.lng, reading.accuracy].every(Number.isFinite) || Math.abs(reading.lat)>90 || Math.abs(reading.lng)>180 || reading.accuracy<0) { onError({code:2}); return; }
  lastReading = reading; readingAt = Date.now();
  badge(sharing); status('ready');
  for (const listener of listeners) listener(reading);
  maybeSend(reading);
}

function onError(error) {
  const wasSharing = sharing;
  sharing = false; badge(false); stopWatching();
  if (wasSharing) queueStop();
  status('error');
  toast(message(error.code === 1 ? 'locationDenied' : 'locationUnavailable'));
}

export function onReading(listener) {
  listeners.add(listener);
  if (lastReading && Date.now() - readingAt <= LIVE.watch.maximumAge) listener(lastReading);
  return () => listeners.delete(listener);
}
export function onStatus(listener) { statuses.add(listener); return () => statuses.delete(listener); }

export function startWatching() {
  if (document.visibilityState === 'hidden' || watchId !== null || acquisition) return;
  const controller = new AbortController(), ticket = ++epoch;
  acquisition = controller; status('waiting');
  requestLocation(controller.signal).then(position => {
    if (ticket !== epoch) return;
    acquisition = null; onPosition(position);
    if (ticket !== epoch) return;
    try {
      const id = navigator.geolocation.watchPosition(
        next => { if (ticket === epoch) onPosition(next); },
        // After a fix, an unavailable or timed-out reading is transient: keep the last position and
        // keep watching; only a denial, or a watch that never produced a reading, stops locating.
        error => { if (ticket === epoch && (error?.code === 1 || !lastReading)) onError(error); },
        {...LIVE.watch, enableHighAccuracy:false});
      if (ticket === epoch) watchId = id; else navigator.geolocation.clearWatch(id);
    } catch { if (ticket === epoch) onError({code:2}); }
  }).catch(error => { if (ticket === epoch && error.name !== 'AbortError') onError(error); });
}

export function stopWatching() {
  ++epoch; acquisition?.abort(); acquisition = null;
  if (watchId !== null) navigator.geolocation.clearWatch(watchId);
  watchId = null; lastReading = null; readingAt = 0; status('stopped');
}

export function startSharing() {
  if (document.visibilityState === 'hidden') return;
  sharing = true; lastSent = null; badge(false); startWatching();
  if (lastReading && Date.now() - readingAt <= LIVE.watch.maximumAge) { badge(true); status('ready'); maybeSend(lastReading); }
}
function queueStop(keepalive = false) {
  const immediate = boundedPost(ENDPOINTS.locationStop, {}, keepalive).catch(() => {});
  const cleanup = writes.catch(() => {}).then(() => boundedPost(ENDPOINTS.locationStop, {}, keepalive)).catch(() => {});
  writes = Promise.all([immediate, cleanup]);
  return writes;
}
export function stopSharing(keepalive = false) {
  const wasSharing = sharing;
  sharing = false; lastSent = null; badge(false); stopWatching();
  return wasSharing ? queueStop(keepalive) : Promise.resolve();
}
export const isSharing = () => sharing;
const leave = () => { void stopSharing(true); };
document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden') leave(); });
window.addEventListener('pagehide', leave);
