import { ENDPOINTS, LIVE, STORAGE } from '../constants/config.js?v=29';
import { message } from '../constants/messages.js?v=29';
import { postJson } from '../net/http.js?v=29';
import { distanceM, readingOf } from '../utils/geo.js?v=29';
import { toast } from './toast.js?v=29';

const listeners = new Set();
const statuses = new Set();
const status = (value) => { for (const listener of statuses) listener(value); };
let readingAt = 0;
let watchId = null;
let sharing = false;
let lastSent = null;
let lastReading = null;

function badge(visible) {
  const node = document.getElementById('live-badge');
  if (node) node.hidden = !visible;
}

function remember(value) {
  try { sessionStorage.setItem(STORAGE.liveKey, value ? '1' : '0'); } catch { /* storage unavailable */ }
}

async function maybeSend(reading) {
  if (!sharing) return;
  const now = Date.now();
  const moved = lastSent ? distanceM(lastSent, reading) : Infinity;
  if (lastSent && (now - lastSent.at < LIVE.minIntervalMs || moved < LIVE.minDistanceM)) return;
  lastSent = { ...reading, at: now };
  try { await postJson(ENDPOINTS.location, reading); } catch (error) {
    if (error.status === 401 || error.status === 403) stopSharing();
  }
}

function onPosition(position) {
  lastReading = readingOf(position);
  readingAt = Date.now();
  status('ready');
  for (const listener of listeners) listener(lastReading);
  maybeSend(lastReading);
}

function onError(error) {
  toast(message(error.code === 1 ? 'locationDenied' : 'locationUnavailable'));
  stopWatching();
  status('error');
  if (sharing) stopSharing();
}

export function onReading(listener) {
  listeners.add(listener);
  if (lastReading && Date.now() - readingAt <= LIVE.watch.maximumAge) listener(lastReading);
  return () => listeners.delete(listener);
}

export function onStatus(listener) {
  statuses.add(listener);
  return () => statuses.delete(listener);
}

export function startWatching() {
  if (document.visibilityState === 'hidden' || watchId !== null) return;
  if (!navigator.geolocation) { onError({ code: 2 }); return; }
  status('waiting');
  try { watchId = navigator.geolocation.watchPosition(onPosition, onError, LIVE.watch); }
  catch { onError({ code: 2 }); }
}

export function stopWatching() {
  if (watchId !== null) navigator.geolocation.clearWatch(watchId);
  watchId = null;
  lastReading = null;
  readingAt = 0;
  status('stopped');
}

export function startSharing() {
  sharing = true;
  lastSent = null;
  remember(true);
  badge(true);
  startWatching();
  if (lastReading && Date.now() - readingAt <= LIVE.watch.maximumAge) maybeSend(lastReading);
}

export async function stopSharing() {
  sharing = false;
  stopWatching();
  remember(false);
  badge(false);
  try { await postJson(ENDPOINTS.locationStop, {}); } catch { /* the server expires stale positions */ }
}

export const isSharing = () => sharing;

export function resumeIfShared() {
  try { if (sessionStorage.getItem(STORAGE.liveKey) === '1') startSharing(); } catch { /* storage unavailable */ }
}

document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'hidden') {
    if (sharing) postJson(ENDPOINTS.locationStop, {}, true).catch(() => {});
    stopWatching();
  } else if (document.visibilityState === 'visible' && sharing) {
    startWatching();
  }
});

window.addEventListener('pagehide', stopWatching);
