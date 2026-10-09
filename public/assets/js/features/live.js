import { ENDPOINTS, LIVE, STORAGE } from '../constants/config.js';
import { message } from '../constants/messages.js';
import { postJson } from '../net/http.js';
import { distanceM, readingOf } from '../utils/geo.js';
import { toast } from './toast.js';

const listeners = new Set();
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
  for (const listener of listeners) listener(lastReading);
  maybeSend(lastReading);
}

function onError(error) {
  toast(message(error.code === 1 ? 'locationDenied' : 'locationUnavailable'));
  if (error.code === 1) stopWatching();
}

export function onReading(listener) {
  listeners.add(listener);
  if (lastReading) listener(lastReading);
  return () => listeners.delete(listener);
}

export function startWatching() {
  if (watchId !== null || !navigator.geolocation) return;
  watchId = navigator.geolocation.watchPosition(onPosition, onError, LIVE.watch);
}

export function stopWatching() {
  if (watchId !== null) navigator.geolocation.clearWatch(watchId);
  watchId = null;
}

export function startSharing() {
  sharing = true;
  lastSent = null;
  remember(true);
  badge(true);
  startWatching();
  if (lastReading) maybeSend(lastReading);
}

export async function stopSharing() {
  sharing = false;
  remember(false);
  badge(false);
  try { await postJson(ENDPOINTS.locationStop, {}); } catch { /* the server expires stale positions */ }
}

export const isSharing = () => sharing;

export function resumeIfShared() {
  try { if (sessionStorage.getItem(STORAGE.liveKey) === '1') startSharing(); } catch { /* storage unavailable */ }
}

document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'hidden' && sharing) {
    postJson(ENDPOINTS.locationStop, {}, true).catch(() => {});
    stopWatching();
  } else if (document.visibilityState === 'visible' && sharing) {
    startWatching();
  }
});
