// A plan followed live. The map draws the plan's road route and the visitor's position, follows them
// as they move (turning with their heading in 3D), says how far the next stop is, and notices when they
// reach a stop. The position stays in this browser: only when a signed-in member reaches a stop is it
// sent, once, so the server can confirm the arrival; the server compares it and keeps nothing.
import { create } from '../utils/dom.js?v=80';
import { createMap } from './mapLoader.js?v=80';
import { buildings3d } from './map3d.js?v=93';
import { expandable } from './mapExpand.js?v=93';
import { getJson, postJson } from '../net/http.js?v=80';
import { legLines, pinsOf } from './plan.js?v=93';
import { haptic } from './haptics.js?v=80';
import { toast } from './toast.js?v=80';
import { refreshSlot } from './weather.js?v=80';
import { distanceText } from '../utils/units.js?v=80';

// Public activity points are snapped to a grid of about 550 m, so a stop counts as reached within
// ARRIVE_M of its public point; the server then checks the exact place.
export const ARRIVE_M = 450;
const NEAR_M = 1200;
const OFF_ROUTE_M = 700;
const CONFIRM_RETRY_MS = 30000;
const CONFIRM_FOR_MS = 15 * 60 * 1000;
// Seconds per metre when a stop has no measured leg: about 40 km/h with the island's road detour.
const PACE = 0.09;
const DETOUR = 1.35;
const STORE_PREFIX = 'bx-trip:';
// Room kept clear for the map tools on the left, so the route and the visitor are never under them.
const FRAME = { top: 40, right: 40, bottom: 40, left: 72 };
const ARRIVE_URL = '/api/plan/arrive';

/** Metres between two points, by the haversine formula. */
export function distance(a, b) {
  const rad = Math.PI / 180, earth = 6371008.8;
  const dLat = (b.lat - a.lat) * rad, dLng = (b.lng - a.lng) * rad;
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(a.lat * rad) * Math.cos(b.lat * rad) * Math.sin(dLng / 2) ** 2;
  return 2 * earth * Math.asin(Math.min(1, Math.sqrt(h)));
}

/** Metres from a point to the nearest segment of some lines ([lng, lat] pairs), on a local flat projection. */
export function distanceToLines(point, lines) {
  const rad = Math.PI / 180, metresPerDeg = 111320, cos = Math.cos(point.lat * rad);
  const xy = ([lng, lat]) => [(lng - point.lng) * metresPerDeg * cos, (lat - point.lat) * metresPerDeg];
  let best = Infinity;
  for (const line of lines) {
    for (let i = 0; i < line.length - 1; i += 1) {
      const [ax, ay] = xy(line[i]), [bx, by] = xy(line[i + 1]);
      const dx = bx - ax, dy = by - ay, length = dx * dx + dy * dy;
      const t = length ? Math.max(0, Math.min(1, -(ax * dx + ay * dy) / length)) : 0;
      best = Math.min(best, Math.hypot(ax + t * dx, ay + t * dy));
    }
  }
  return best;
}

/** Directions to a stop in the phone's own maps app, by car or on foot: Apple Maps on Apple devices,
 * else Google Maps. Neither takes a route shape, so a chosen road route is shown on our map only. */
export function directionsUrl(stop, apple = /iPhone|iPad|Macintosh/.test(navigator.userAgent), walk = false) {
  const place = `${stop.place}, Puerto Rico`;
  return apple
    ? `https://maps.apple.com/?daddr=${encodeURIComponent(place)}&dirflg=${walk ? 'w' : 'd'}`
    : `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(place)}&travelmode=${walk ? 'walking' : 'driving'}`;
}

/** Where a point stands against a route line ([lng, lat] pairs): metres left along the road from the
 * nearest point on it to its end, and how far the point is from the line. Each fix is snapped to the
 * route the way a navigation app does, on a flat local projection that is exact enough on the island. */
export function along(point, line) {
  const rad = Math.PI / 180, metresPerDeg = 111320, cos = Math.cos(point.lat * rad);
  const xy = ([lng, lat]) => [(lng - point.lng) * metresPerDeg * cos, (lat - point.lat) * metresPerDeg];
  const lengths = [];
  let offset = Infinity, at = 0, part = 0;
  for (let i = 0; i < line.length - 1; i += 1) {
    const [ax, ay] = xy(line[i]), [bx, by] = xy(line[i + 1]);
    const dx = bx - ax, dy = by - ay, squared = dx * dx + dy * dy, length = Math.sqrt(squared);
    const t = squared ? Math.max(0, Math.min(1, -(ax * dx + ay * dy) / squared)) : 0;
    const gap = Math.hypot(ax + t * dx, ay + t * dy);
    lengths.push(length);
    if (gap < offset) { offset = gap; at = i; part = t; }
  }
  if (!lengths.length) return { remaining: 0, offset: Infinity };
  let remaining = lengths[at] * (1 - part);
  for (let i = at + 1; i < lengths.length; i += 1) remaining += lengths[i];
  return { remaining, offset };
}

/** An option's figures from where the visitor is now: metres to rejoin the route (with the island's road
 * detour) plus metres left along it, and the time at the route's pace, or a pace blended with the
 * visitor's own measured speed when there is one. */
export function liveFigures(option, point, measuredPace = 0) {
  const { remaining, offset } = along(point, option.coordinates || []);
  if (!Number.isFinite(offset)) return { meters: option.meters, seconds: option.seconds };
  const routePace = option.meters > 0 ? option.seconds / option.meters : PACE;
  const pace = measuredPace > 0 && option.kind !== 'walk' ? Math.min(routePace * 2.5, Math.max(routePace * 0.5, 0.6 * routePace + 0.4 * measuredPace)) : routePace;
  const rejoin = offset > 60 ? offset * DETOUR : 0;
  return { meters: rejoin + remaining, seconds: rejoin * routePace + remaining * pace };
}

/** The option a leg uses: the one chosen for it, else the fastest. */
export function chosenOption(options, kind) {
  return (options || []).find((option) => option.kind === kind) || (options || [])[0] || null;
}

/** The legs to draw as the route, from the chosen options, and the other options as one feature each. */
export function routeLayers(legOptions, routes) {
  const chosen = [], others = [];
  for (const [order, options] of legOptions) {
    const pick = chosenOption(options, routes[order]);
    if (pick) chosen.push({ order, coordinates: pick.coordinates });
    for (const option of options) {
      if (option !== pick && option.kind !== 'walk' && Array.isArray(option.coordinates) && option.coordinates.length > 1) {
        others.push({ type: 'Feature', geometry: { type: 'LineString', coordinates: option.coordinates }, properties: { order, kind: option.kind } });
      }
    }
  }
  return { chosen, others: { type: 'FeatureCollection', features: others } };
}

/** A rough drive time in minutes for a straight-line distance, at the leg's own pace when it has one. */
export function minutesFor(metres, stop) {
  const pace = stop.legSeconds > 0 && stop.legMeters > 0 ? stop.legSeconds / stop.legMeters : PACE;
  return Math.max(1, Math.round((metres * DETOUR * pace) / 60));
}

/** Fills a message's :name placeholders. */
export function say(template, values = {}) {
  return String(template || '').replace(/:([a-z]+)/g, (whole, name) => (name in values ? values[name] : whole));
}

/** Today's date in Puerto Rico, so a trip's progress lasts for its own day only. */
function today() {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Puerto_Rico' }).format(new Date());
}

/** The progress saved for a plan today: stops reached and stops skipped. */
export function loadProgress(plan, store = localStorage) {
  try {
    const saved = JSON.parse(store.getItem(STORE_PREFIX + plan) || 'null');
    if (saved && saved.day === today()) return { done: saved.done || [], skipped: saved.skipped || [], routes: saved.routes || {} };
  } catch { /* a blocked or broken store starts the trip fresh */ }
  return { done: [], skipped: [], routes: {} };
}

function saveProgress(plan, progress, store = localStorage) {
  try { store.setItem(STORE_PREFIX + plan, JSON.stringify({ day: today(), ...progress })); } catch { /* progress lives in memory */ }
}

/** The stops a trip page lists, in order. */
export function stopsOf(page) {
  return [...page.querySelectorAll('[data-stop]')].map((node, index) => ({
    node, order: index + 1, slug: node.dataset.stop, title: node.dataset.title, place: node.dataset.place,
    lat: Number(node.dataset.lat), lng: Number(node.dataset.lng),
    legSeconds: Number(node.dataset.legSeconds) || 0, legMeters: Number(node.dataset.legMeters) || 0,
    ferry: node.dataset.ferry === '1', town: node.dataset.town || '', townName: node.dataset.townName || '', arrive: node.dataset.arrive || '', outdoor: node.dataset.outdoor === '1',
  })).filter((stop) => Number.isFinite(stop.lat) && Number.isFinite(stop.lng));
}

export function trip(page) {
  const mapNode = page.querySelector('.trip-map');
  const stops = stopsOf(page);
  if (!mapNode || !stops.length) return;
  const plan = page.dataset.plan;
  const signedIn = page.dataset.signedIn === '1';
  const text = (key) => page.dataset['say' + key.replace(/(^|-)([a-z])/g, (_, __, c) => c.toUpperCase())] || '';
  const status = page.querySelector('[data-trip-status]');
  const nextTitle = page.querySelector('[data-trip-next]');
  const progressLabel = page.querySelector('[data-trip-progress]');
  const begin = page.querySelector('[data-trip-begin]');
  const directions = page.querySelector('[data-trip-directions]');
  const mark = page.querySelector('[data-trip-mark]');
  const skip = page.querySelector('[data-trip-skip]');
  const follow = page.querySelector('[data-trip-follow]');
  const restart = page.querySelector('[data-trip-restart]');
  const routeBox = page.querySelector('[data-trip-routes]');
  const weatherCard = page.querySelector('.trip-panel [data-weather-card]');
  // The forecast card follows the next stop: its town at the time the plan reaches it.
  const showWeather = (stop) => {
    if (!weatherCard) return;
    if (!stop) { weatherCard.hidden = true; return; }
    if (weatherCard.dataset.weatherTown === stop.town && weatherCard.dataset.weatherAt === stop.arrive) return;
    Object.assign(weatherCard.dataset, { weatherTown: stop.town, weatherName: stop.townName, weatherAt: stop.arrive, weatherOutdoor: stop.outdoor ? '1' : '0' });
    refreshSlot(weatherCard);
  };
  document.addEventListener('bx:weather-ready', () => { if (weatherCard) { weatherCard.dataset.weatherTown = ''; showWeather(next()); } });
  const routeChoices = page.querySelector('[data-trip-route-options]');
  // Each leg's ways to get there by its order (the leg from stop n to stop n + 1 has order n).
  let legOptions = new Map();
  let progress = loadProgress(plan);
  let map, maplibregl, you, watch = null, lock = null, here = null, following = true, routeLines = [], retry = 0;
  let lastStatus = '';
  // The visitor's own driving pace on the route (seconds per metre), smoothed: free live traffic.
  let measuredPace = 0, paceSamples = 0, lastFix = null;
  const details = new Map();
  const confirming = new Map();

  const settled = (stop) => progress.done.includes(stop.slug) || progress.skipped.includes(stop.slug);
  const next = () => stops.find((stop) => !settled(stop));
  // The ways to a stop: from where the visitor is when they are known (the approach), else from the
  // previous stop; and the key their choice is remembered by.
  let approach = { slug: '', options: [], at: 0, busy: false };
  const waysFor = (stop) => {
    if (!stop) return [];
    if (approach.slug === stop.slug && approach.options.length) return approach.options;
    return stop.order > 1 ? legOptions.get(stop.order - 1) || [] : [];
  };
  const routeKey = (stop) => (approach.slug === stop.slug && approach.options.length ? 'a:' + stop.slug : String(stop.order - 1));
  // The way chosen to reach a stop, when it has options.
  const wayTo = (stop) => (stop ? chosenOption(waysFor(stop), progress.routes[routeKey(stop)]) : null);

  // The choices for the leg to the next stop, when there is more than one way.
  const paintRoutes = () => {
    const upcoming = next();
    const options = waysFor(upcoming);
    routeBox.hidden = options.length < 2;
    if (options.length < 2) { routeChoices.replaceChildren(); return; }
    const picked = wayTo(upcoming);
    routeChoices.replaceChildren(...options.map((option) => {
      const label = create('label', { class: 'trip-route' });
      const input = create('input', { type: 'radio', name: 'trip-route', value: option.kind });
      input.checked = option === picked;
      input.addEventListener('change', () => choose(routeKey(upcoming), option.kind));
      const detail = create('span', { class: 'trip-route-detail' }, figuresText(option));
      details.set(option, detail);
      label.append(input, create('span', { class: 'trip-route-name' }, text('option-' + option.kind.replace('_', '-'))), detail);
      if (option.highways) label.append(create('span', { class: 'trip-route-toll' }, text('toll')));
      return label;
    }));
    refreshFigures();
  };

  // Minutes and kilometres for an option, from where the visitor is once the trip has a position.
  const figuresOf = (option) => (here ? liveFigures(option, here, paceSamples >= 6 ? measuredPace : 0) : option);
  const figuresText = (option) => {
    const figures = figuresOf(option);
    return say(text('option-detail'), { minutes: String(Math.max(1, Math.round(figures.seconds / 60))), distance: distanceText(figures.meters) });
  };
  const refreshFigures = () => {
    for (const [option, node] of details) {
      if (!node.isConnected) { details.delete(option); continue; }
      const written = figuresText(option);
      if (node.textContent !== written) node.textContent = written;
    }
  };

  // The chosen ways drawn as the route, the others in grey; tapping a grey one chooses it.
  const drawRoutes = () => {
    if (!map?.getSource('trip-road')) return;
    const layers = routeLayers(legOptions, progress.routes);
    const lines = legLines(pinsOf(page), layers.chosen);
    // The way from where the visitor is to the next stop is drawn like the others.
    const upcoming = next();
    if (upcoming && approach.slug === upcoming.slug && approach.options.length) {
      const key = 'a:' + upcoming.slug, pick = chosenOption(approach.options, progress.routes[key]);
      if (pick?.coordinates?.length > 1) lines.road.geometry.coordinates.push(pick.coordinates);
      for (const option of approach.options) {
        if (option !== pick && option.kind !== 'walk' && option.coordinates?.length > 1) layers.others.features.push({ type: 'Feature', geometry: { type: 'LineString', coordinates: option.coordinates }, properties: { order: key, kind: option.kind } });
      }
    }
    routeLines = [...lines.road.geometry.coordinates, ...lines.straight.geometry.coordinates];
    map.getSource('trip-road').setData(lines.road);
    map.getSource('trip-straight').setData(lines.straight);
    map.getSource('trip-alts').setData(layers.others);
  };

  function choose(order, kind) {
    measuredPace = 0; paceSamples = 0;
    progress = { ...progress, routes: { ...progress.routes, [order]: kind } };
    saveProgress(plan, progress);
    drawRoutes(); paintRoutes(); paint(); guide();
  }

  const setStatus = (message) => {
    if (message === lastStatus) return;
    lastStatus = message;
    status.textContent = message;
  };

  // Each stop's state in the list, the next stop's title, the directions link, and the count reached.
  const paint = () => {
    const upcoming = next();
    for (const stop of stops) {
      const state = progress.done.includes(stop.slug) ? 'done' : progress.skipped.includes(stop.slug) ? 'skipped' : stop === upcoming ? 'next' : '';
      stop.node.dataset.state = state;
      stop.node.querySelector('[data-trip-state]').textContent = state ? text('status-' + state) : '';
      stop.marker?.getElement().classList.toggle('is-done', state === 'done' || state === 'skipped');
      stop.marker?.getElement().classList.toggle('is-next', state === 'next');
    }
    if (progressLabel) progressLabel.textContent = `${progress.done.length}/${stops.length}`;
    page.classList.toggle('is-done', !upcoming);
    paintRoutes();
    showWeather(upcoming);
    if (upcoming) {
      nextTitle.textContent = upcoming.title;
      directions.href = directionsUrl(upcoming, undefined, wayTo(upcoming)?.kind === 'walk');
      directions.hidden = false; mark.hidden = false; skip.hidden = false; restart.hidden = true;
    } else {
      nextTitle.textContent = text('done-title');
      setStatus(text('done-body'));
      directions.hidden = true; mark.hidden = true; skip.hidden = true; restart.hidden = false;
      halt();
    }
  };

  const save = () => { saveProgress(plan, progress); paint(); };

  // The server confirms a stop for a signed-in member; what it unlocks is announced like any unlock.
  const confirm = async (stop, position) => {
    if (!signedIn || !position) return;
    const pending = confirming.get(stop.slug);
    if (pending && (pending.busy || Date.now() - pending.last < CONFIRM_RETRY_MS || Date.now() > pending.until)) return;
    const entry = pending || { until: Date.now() + CONFIRM_FOR_MS, last: 0 };
    entry.busy = true; entry.last = Date.now(); confirming.set(stop.slug, entry);
    try {
      const answer = await postJson(ARRIVE_URL, { slug: stop.slug, lat: +position.lat.toFixed(5), lng: +position.lng.toFixed(5), plan: stops.map((item) => item.slug) });
      if (answer?.arrived) confirming.set(stop.slug, { ...entry, until: 0 });
      if (Array.isArray(answer?.unlocked) && answer.unlocked.length) document.dispatchEvent(new CustomEvent('bx:unlocked', { detail: { items: answer.unlocked } }));
    } catch { /* tried again on a later position */ }
    finally { entry.busy = false; }
  };

  const arrive = (stop, position) => {
    if (!progress.done.includes(stop.slug)) {
      progress = { ...progress, done: [...progress.done, stop.slug], skipped: progress.skipped.filter((slug) => slug !== stop.slug) };
      haptic('success');
      toast(say(text('arrived'), { title: stop.title }));
      save();
    }
    confirm(stop, position);
  };

  const guide = () => {
    const upcoming = next();
    if (!upcoming || !here) return;
    refreshFigures();
    // To or from Vieques and Culebra the way is a ferry from Ceiba, never a drive estimate.
    if (upcoming.ferry) { setStatus(text('ferry')); return; }
    const metres = distance(here, upcoming);
    if (metres <= NEAR_M) { setStatus(text('near')); return; }
    // Along the chosen road route when there is one, else from the straight line at the island's pace.
    const way = wayTo(upcoming);
    const live = way ? figuresOf(way) : { meters: metres * DETOUR, seconds: minutesFor(metres, upcoming) * 60 };
    const minutes = Math.max(1, Math.round(live.seconds / 60));
    const arrival = new Intl.DateTimeFormat(document.documentElement.lang.startsWith('en') ? 'en-US' : 'es-PR', { timeZone: 'America/Puerto_Rico', hour: 'numeric', minute: '2-digit' }).format(new Date(Date.now() + live.seconds * 1000));
    let message = say(text('distance'), { distance: distanceText(way ? live.meters : metres), minutes: String(minutes) }) + ' · ' + say(text('eta'), { time: arrival }) + (way?.highways ? ' · ' + text('tolls') : '');
    // The route starts at the first stop, so being away from it only matters once the trip is under way.
    const underway = progress.done.length + progress.skipped.length > 0 || (approach.slug === upcoming.slug && approach.options.length > 0);
    if (underway && routeLines.length && distanceToLines(here, routeLines) > OFF_ROUTE_M) message += ' ' + text('off-route');
    setStatus(message);
  };

  // Asks for the ways from here to the next stop: when the trip starts, when the next stop changes, and
  // again only after two minutes away from the chosen way. The position is rounded to about 110 m and
  // the answer is shared at the edge by that rounded position; a busy answer keeps the straight estimate.
  const APPROACH_EVERY_MS = 120000;
  let asking = false;
  const askApproach = async () => {
    const upcoming = next();
    if (!upcoming || !here || asking || upcoming.ferry) return;
    const way = wayTo(upcoming);
    const fresh = approach.slug === upcoming.slug && Date.now() - approach.at < APPROACH_EVERY_MS;
    const onWay = approach.slug === upcoming.slug && approach.options.length > 0 && along(here, way?.coordinates || []).offset < OFF_ROUTE_M;
    if (onWay || fresh) return;
    asking = true;
    try {
      const found = await getJson(`/api/plan/approach?lat=${here.lat.toFixed(3)}&lng=${here.lng.toFixed(3)}&e=${encodeURIComponent(upcoming.slug)}`);
      approach = { slug: upcoming.slug, options: Array.isArray(found?.options) ? found.options : [], at: Date.now(), busy: Boolean(found?.busy) };
      measuredPace = 0; paceSamples = 0;
      drawRoutes(); paintRoutes(); paint(); guide();
    } catch {
      approach = { ...approach, slug: upcoming.slug, at: Date.now() };
    } finally { asking = false; }
  };

  const moved = (position) => {
    const { latitude: lat, longitude: lng, heading, speed } = position.coords;
    here = { lat, lng };
    // The pace actually driven on the chosen route, from consecutive fixes while moving.
    const now = position.timestamp || Date.now();
    if (lastFix && now - lastFix.at >= 4000) {
      const travelled = distance(lastFix, here), seconds = (now - lastFix.at) / 1000;
      const upcoming = next(), way = upcoming && wayTo(upcoming);
      if (way && way.kind !== 'walk' && travelled / seconds > 2 && along(here, way.coordinates).offset < 120) {
        const pace = seconds / travelled;
        measuredPace = paceSamples ? 0.8 * measuredPace + 0.2 * pace : pace;
        paceSamples += 1;
      }
      lastFix = { lat, lng, at: now };
    } else if (!lastFix) lastFix = { lat, lng, at: now };
    if (!you) {
      const element = create('span', { class: 'trip-you', role: 'img', 'aria-label': text('you') });
      element.append(create('span', { class: 'trip-you-heading', 'aria-hidden': 'true' }));
      you = new maplibregl.Marker({ element, rotationAlignment: 'map', pitchAlignment: 'viewport' }).setLngLat([lng, lat]).addTo(map);
    } else you.setLngLat([lng, lat]);
    const moving = Number.isFinite(heading) && (speed ?? 0) > 1;
    you.getElement().classList.toggle('has-heading', moving);
    if (moving) you.setRotation(heading);
    if (following) {
      const camera = { center: [lng, lat], padding: FRAME, duration: matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 800 };
      // In 3D the camera turns with the direction of travel, so the road ahead points up.
      if (moving && map.getPitch() > 10) camera.bearing = heading;
      if (map.getZoom() < 14) camera.zoom = 15;
      map.easeTo(camera);
    }
    for (const stop of stops) {
      if (!settled(stop) && distance(here, stop) <= ARRIVE_M) arrive(stop, here);
      else if (progress.done.includes(stop.slug) && distance(here, stop) <= ARRIVE_M * 1.5) confirm(stop, here);
    }
    guide();
    askApproach();
  };

  const lost = (error) => {
    // Only a refusal ends the watch; a missing fix or a timeout is waited out.
    if (error?.code === 1) { setStatus(text('location-off')); halt(); }
  };

  const wake = async () => {
    try { if ('wakeLock' in navigator && document.visibilityState === 'visible' && watch !== null) lock = await navigator.wakeLock.request('screen'); }
    catch { lock = null; }
  };

  function halt() {
    if (watch !== null) navigator.geolocation?.clearWatch(watch);
    watch = null;
    clearInterval(retry);
    lock?.release?.().catch(() => {});
    lock = null;
  }

  const setFollowing = (on) => {
    following = on;
    follow.setAttribute('aria-pressed', String(on));
    follow.classList.toggle('is-active', on);
    if (on && here) map.easeTo({ center: [here.lng, here.lat], zoom: Math.max(map.getZoom(), 15) });
  };

  begin.addEventListener('click', () => {
    if (!navigator.geolocation) { setStatus(text('location-off')); return; }
    begin.hidden = true;
    follow.hidden = false;
    setFollowing(true);
    setStatus(text('locating'));
    document.dispatchEvent(new CustomEvent('bx:action', { detail: { action: 'trip_start' } }));
    watch = navigator.geolocation.watchPosition(moved, lost, { enableHighAccuracy: true, maximumAge: 5000, timeout: 30000 });
    // A visitor standing at a stop sends no new positions, so a confirmation the server has not given
    // yet is asked again from the last position.
    retry = setInterval(() => {
      if (here) for (const stop of stops) if (progress.done.includes(stop.slug) && distance(here, stop) <= ARRIVE_M * 1.5) confirm(stop, here);
    }, CONFIRM_RETRY_MS);
    wake();
  });
  follow.addEventListener('click', () => setFollowing(!following));
  mark.addEventListener('click', () => { const upcoming = next(); if (upcoming) arrive(upcoming, here); });
  skip.addEventListener('click', () => {
    const upcoming = next();
    if (!upcoming) return;
    progress = { ...progress, skipped: [...progress.skipped, upcoming.slug] };
    save(); guide();
  });
  restart.addEventListener('click', () => {
    progress = { done: [], skipped: [], routes: {} };
    save(); drawRoutes();
    begin.hidden = false; follow.hidden = true;
    setStatus('');
  });
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') wake(); });
  addEventListener('pagehide', halt);

  paint();
  createMap(mapNode, { cooperative: false, controls: false, rotatable: true, center: [stops[0].lng, stops[0].lat], zoom: 12 }).then((made) => {
    ({ map, maplibregl } = made);
    const pins = pinsOf(page);
    const bounds = stops.reduce((box, stop) => box.extend([stop.lng, stop.lat]), new maplibregl.LngLatBounds([stops[0].lng, stops[0].lat], [stops[0].lng, stops[0].lat]));
    for (const stop of stops) {
      const element = create('span', { class: 'plan-pin', 'aria-hidden': 'true' }, String(stop.order));
      stop.marker = new maplibregl.Marker({ element }).setLngLat([stop.lng, stop.lat]).addTo(map);
    }
    paint();
    const tools = page.querySelector('.trip-map-tools');
    buildings3d(map, tools.querySelector('[data-map-3d]'), tools.querySelector('.map-turn'), { zoomIn: false });
    // The full-screen map keeps following the visitor; otherwise it frames every stop again.
    expandable(map, tools.querySelector('[data-map-expand]'), () => {
      if (watch !== null && following) return;
      const routed = routeLines.flat();
      map.fitBounds(routed.reduce((box, point) => box.extend(point), bounds), { padding: FRAME, maxZoom: 14, duration: 0 });
    });
    // Moving the map by hand stops following until the visitor asks again.
    map.on('dragstart', (event) => { if (event.originalEvent && watch !== null) setFollowing(false); });
    map.on('load', async () => {
      map.fitBounds(bounds, { padding: FRAME, maxZoom: 14, duration: 0 });
      if (pins.length > 1) {
        try {
          const found = await getJson(`/api/plan/routes?e=${encodeURIComponent(plan)}`);
          legOptions = new Map((found.legs || []).filter((leg) => Array.isArray(leg.options) && leg.options.length).map((leg) => [leg.order, leg.options]));
        } catch { legOptions = new Map(); }
      }
      const empty = { type: 'FeatureCollection', features: [] };
      map.addSource('trip-alts', { type: 'geojson', data: empty });
      map.addSource('trip-road', { type: 'geojson', data: empty });
      map.addSource('trip-straight', { type: 'geojson', data: empty });
      map.addLayer({ id: 'trip-alts', type: 'line', source: 'trip-alts', layout: { 'line-cap': 'round', 'line-join': 'round' }, paint: { 'line-color': '#8a97a3', 'line-width': 5, 'line-opacity': 0.75 } });
      map.addLayer({ id: 'trip-road-casing', type: 'line', source: 'trip-road', layout: { 'line-cap': 'round', 'line-join': 'round' }, paint: { 'line-color': '#ffffff', 'line-width': 9 } });
      map.addLayer({ id: 'trip-road', type: 'line', source: 'trip-road', layout: { 'line-cap': 'round', 'line-join': 'round' }, paint: { 'line-color': '#1878ec', 'line-width': 5 } });
      map.addLayer({ id: 'trip-straight', type: 'line', source: 'trip-straight', paint: { 'line-color': '#1878ec', 'line-width': 3, 'line-dasharray': [1.5, 1.5], 'line-opacity': 0.7 } });
      map.on('click', 'trip-alts', (event) => {
        const picked = event.features?.[0]?.properties;
        if (picked) choose(String(picked.order), picked.kind);
      });
      map.on('mouseenter', 'trip-alts', () => { map.getCanvas().style.cursor = 'pointer'; });
      map.on('mouseleave', 'trip-alts', () => { map.getCanvas().style.cursor = ''; });
      drawRoutes();
      paint();
      const routed = routeLines.flat();
      if (routed.length) map.fitBounds(routed.reduce((box, point) => box.extend(point), bounds), { padding: FRAME, maxZoom: 14, duration: 0 });
      if (here) guide();
    });
  }).catch(() => {});
}
