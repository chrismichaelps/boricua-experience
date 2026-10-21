import { mapSurface } from './mapSurface.js?v=80';
import { clusterPins } from './mapClusters.js?v=80';
import { ENDPOINTS, LIVE, MAP } from '../constants/config.js?v=80';
import { message } from '../constants/messages.js?v=81';
import { getJson } from '../net/http.js?v=80';
import { $, $$, create } from '../utils/dom.js?v=80';
import { snapArea, visiblePins, viewportBounds } from './mapViewport.js?v=80';
import { toast } from './toast.js?v=80';
import { createMap } from './mapLoader.js?v=80';
import { buildings3d } from './map3d.js?v=96';
import { accuracyCircle, meMarker, priceMarker, clusterMarker } from './markers.js?v=82';
import * as live from './live.js?v=80';
import { localizeMoment } from './localTime.js?v=80';
import { distanceM } from '../utils/geo.js?v=80';

function pinKey(pin) { return pin.kind === 'place' ? `place:${pin.slug}` : pin.slug; }

function sheetItem(pin) {
  const item = create('div', { class: 'sheet-item', 'data-slug': pinKey(pin) });
  const link = create('a', { class: 'card-link', href: `${pin.kind === 'place' ? '/lugar/' : '/e/'}${encodeURIComponent(pin.slug)}` });
  const media = create('div', { class: 'card-media' });
  media.append(create('img', { src: pin.cover, alt: '', loading: 'lazy' }));
  const unknownAdmission = pin.kind !== 'place' && pin.price_cents == null;
  if (!unknownAdmission) media.append(create('span', { class: 'pill pill-light card-price' }, pin.price));
  const body = create('div', { class: 'card-body' });
  const when = pin.kind === 'place' ? create('span', {}, pin.when) : create('time', { datetime: pin.starts, 'data-moment': 'when', 'data-ends': pin.ends ?? '' }, pin.when);
  if (pin.kind !== 'place') localizeMoment(when);
  const date = create('p', { class: 'card-when' });
  date.append(when);
  body.append(date, create('h3', { class: 'card-title' }, pin.title), create('p', { class: 'card-place' }, pin.place));
  if (unknownAdmission) {
    const meta = create('div', { class: 'card-meta' });
    meta.append(create('span', { class: 'meta card-admission' }, pin.price));
    body.append(meta);
  }
  link.append(media, body);
  const card = create('article', { class: 'card' });
  card.append(link);
  item.append(card);
  return item;
}

export async function explorer(page) {
  const canvas = $('#map', page);
  const list = $('#map-list', page);
  const count = $('#map-count', page);
  let limited = page.dataset.limited === '1';
  const limitNotice = $('#map-limit', page);
  let pins = JSON.parse($('#map-pins', page)?.textContent || '[]');
  const surface = mapSurface(page, list);
  surface.busy(true);
  let loaded;
  try { loaded = await createMap(canvas, { rotatable: true, controlsAt: 'top-right' }); }
  catch (error) { surface.busy(false); throw error; }
  const { map, maplibregl } = loaded;
  const toggle3d = $('[data-feature="map-3d"]', page);
  if (toggle3d) buildings3d(map, toggle3d, $('.map-turn', page));
  let markers = new Map();
  let selectedSlug = '';
  let restoringFocus = false;
  let pendingReading = null;
  let me = null;
  const countTemplate = count.textContent;
  let ready = false;
  let queryTimer = null;
  let queryTicket = 0;
  const queryCache = new Map();
  let requestController = null;
  let centerRequested = false;
  const sheet = $('.map-sheet', page);
  // The camera's padding is the part of the canvas the visitor actually sees: on phones the sheet
  // covers the bottom and the buttons line both sides, so a fit asks only a little more than that.
  const framePadding = () => {
    const open = page.dataset.mapExpanded === '1' || matchMedia('(min-width: 960px)').matches;
    const phone = innerWidth < 700;
    return { top: phone ? 16 : 72, right: 64, left: phone ? 64 : 40, bottom: open ? 40 : sheet.getBoundingClientRect().height + 16 };
  };
  const FIT_PAD = 24;
  // Frames the bounds inside the visible part of the map; a group too spread out for the room left
  // still zooms in around its middle instead of silently doing nothing.
  const fitTo = (bounds, maxZoom, duration) => {
    if (map.cameraForBounds(bounds, { padding: FIT_PAD, maxZoom })) map.fitBounds(bounds, { padding: FIT_PAD, maxZoom, duration });
    else map.easeTo({ center: bounds.getCenter(), zoom: Math.min(map.getZoom() + 2, maxZoom), duration });
  };
  const visible = () => {
    const rect = canvas.getBoundingClientRect();
    const covered = (page.dataset.mapExpanded === '1' || matchMedia('(min-width: 960px)').matches) ? 0 : Math.max(0, rect.bottom - sheet.getBoundingClientRect().top);
    return visiblePins(pins, (point) => map.project(point), rect.width, rect.height, covered);
  };

  let quietScrollUntil = 0;
  const select = (slug, fromList = false) => {
    selectedSlug = slug;
    for (const entry of markers.values()) entry.element.classList.toggle('is-active', entry.slugs.includes(slug));
    for (const item of $$('.sheet-item', list)) item.classList.toggle('is-active', item.dataset.slug === slug);
    const pin = pins.find((candidate) => pinKey(candidate) === slug);
    page.classList.toggle('has-map-selection', Boolean(pin));
    if (!pin) return;
    if (fromList && !restoringFocus) {
      detachFollow();
      map.easeTo({ center: [pin.lng, pin.lat], zoom: Math.max(map.getZoom(), 13), duration: matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 350 });
    }
    else {
      quietScrollUntil = performance.now() + 900;
      list.querySelector(`[data-slug="${slug}"]`)?.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'nearest', inline: 'center' });
    }
  };

  const draw = (shown = visible()) => {
    const focused = [...markers.values()].find((entry) => entry.element === document.activeElement)?.slugs ?? [];
    for (const entry of markers.values()) entry.marker.remove();
    const groups = map.getZoom() < MAP.clusterMaxZoom ? clusterPins(shown, (point) => map.project(point), MAP.clusterRadius) : shown.map((pin) => [pin]);
    markers = new Map(groups.map((group) => {
      const pin = group[0];
      const label = group.length === 1 ? `${pin.title}, ${pin.price}` : page.dataset.clusterLabel.replace(':count', String(group.length));
      const expand = () => {
        detachFollow();
        const bounds = new maplibregl.LngLatBounds();
        for (const member of group) bounds.extend([member.lng, member.lat]);
        fitTo(bounds, Math.max(Math.min(map.getZoom() + 2, MAP.clusterMaxZoom), map.getZoom() + 1), matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 350);
      };
      const entry = group.length === 1 ? priceMarker(maplibregl, pin, () => select(pinKey(pin))) : clusterMarker(maplibregl, group, label, expand);
      entry.slugs = group.map((member) => pinKey(member));
      entry.marker.addTo(map);
      entry.element.setAttribute('aria-label', label);
      entry.element.classList.toggle('is-active', entry.slugs.includes(selectedSlug));
      return [pinKey(pin), entry];
    }));
    if (focused.length) {
      const next = [...markers.values()].find((entry) => entry.slugs.some((slug) => focused.includes(slug)));
      next?.element.focus({ preventScroll: true });
    }
  };

  const fit = () => {
    if (!pins.length && page.dataset.fit !== 'island') return;
    const bounds = new maplibregl.LngLatBounds();
    if (page.dataset.fit === 'island') {
      for (const point of MAP.islandBounds) bounds.extend(point);
    } else for (const pin of pins) bounds.extend([pin.lng, pin.lat]);
    map.setPadding(framePadding());
    fitTo(bounds, 15, 0);
  };

  const render = () => {
    if (!ready) return;
    limitNotice?.classList.toggle('is-hidden', !limited);
    const shown = visible();
    const focused = document.activeElement?.closest?.('.sheet-item')?.dataset.slug;
    draw(shown);
    list.replaceChildren(...(shown.length ? shown.map(sheetItem) : [create('p', { class: 'map-empty' }, message('mapEmpty'))]));
    count.textContent = shown.length === 1 && page.dataset.countOne ? page.dataset.countOne : countTemplate.replace(/\d+/, String(shown.length));
    bindList();
    const selected = shown.some(pin => pinKey(pin) === selectedSlug);
    page.classList.toggle('has-map-selection', selected);
    for (const item of $$('.sheet-item', list)) item.classList.toggle('is-active', selected && item.dataset.slug === selectedSlug);
    if (focused) {
      restoringFocus = true;
      list.querySelector(`[data-slug="${focused}"] a`)?.focus({ preventScroll: true });
      restoringFocus = false;
    }
  };

  const refreshViewport = async (ticket) => {
    const query = new URLSearchParams(location.search);
    const rect = canvas.getBoundingClientRect();
    const covered = (page.dataset.mapExpanded === '1' || matchMedia('(min-width: 960px)').matches) ? 0 : Math.max(0, rect.bottom - sheet.getBoundingClientRect().top);
    const area = viewportBounds(map, rect.width, rect.height, covered);
    // Before layout the canvas has no area; the next resize or move reads the camera again.
    if (!area) { if (ticket === queryTicket) surface.busy(false); return; }
    // Grid-aligned areas let moving visitors reuse cached answers instead of reading the database.
    for (const [name, value] of Object.entries(snapArea(area, map.getZoom()))) query.set(name, value);
    // The language is part of the address, so a shared cache never serves one language to another.
    query.set('hl', (document.documentElement.lang || 'es').slice(0, 2));
    query.delete('lat'); query.delete('lng'); query.delete('radius');
    query.delete('after');
    query.delete('near'); query.delete('cerca'); query.delete('radio');
    const key = query.toString();
    const cached = queryCache.get(key);
    if (cached && Date.now() - cached.at < MAP.viewportCacheMs) {
      if (ticket !== queryTicket) return;
      pins = cached.pins;
      limited = cached.limited;
      surface.busy(false);
      render();
      return;
    }
    requestController = new AbortController();
    const controller = requestController;
    surface.busy(true);
    try {
      const found = await getJson(`${ENDPOINTS.map}?${query}`, { signal: controller.signal });
      if (ticket !== queryTicket) return;
      pins = found.items;
      limited = found.limited;
      queryCache.delete(key);
      queryCache.set(key, { pins: found.items, limited: found.limited, at: Date.now() });
      if (queryCache.size > MAP.viewportCacheSize) queryCache.delete(queryCache.keys().next().value);
      render();
    } catch {
      if (ticket === queryTicket) toast(message('mapRefreshFailed'));
    } finally {
      if (ticket === queryTicket) surface.busy(false);
    }
  };

  let staleWhileHidden = false;
  const schedule = () => {
    if (!ready) return;
    render();
    // A hidden tab keeps its position but asks for nothing until it is seen again.
    if (document.hidden) { staleWhileHidden = true; surface.busy(false); return; }
    clearTimeout(queryTimer);
    requestController?.abort();
    const ticket = ++queryTicket;
    queryTimer = setTimeout(() => refreshViewport(ticket), MAP.viewportDelayMs);
  };

  let follow = false;
  let precise = false;
  let followZoom = null;
  let fittingAccuracy = false;
  let fittingNearby = false;
  let warnedCoarse = false;
  let lastMe = null;
  const COARSE_M = 500;
  const motionMs = (ms) => (matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : ms);

  const frameReading = (reading, first) => {
    const accuracy = Math.max(reading.accuracy || 0, 10);
    if (first && accuracy > COARSE_M) {
      fittingAccuracy = true;
      followZoom = null;
      const circle = accuracyCircle(reading, accuracy).geometry.coordinates[0];
      const bounds = circle.reduce((box, point) => box.extend(point), new maplibregl.LngLatBounds(circle[0], circle[0]));
      fitTo(bounds, MAP.selfZoom, motionMs(first ? 450 : 300));
      return;
    }
    if (fittingAccuracy && accuracy > COARSE_M) return;
    fittingAccuracy = false;
    if (fittingNearby) return;
    const refine = !precise && accuracy <= COARSE_M;
    const zoom = refine ? MAP.selfZoom : (followZoom ?? map.getZoom());
    followZoom = zoom;
    if (refine) {
      precise = true;
      frameNearby(reading);
    }
    map.easeTo({ center: [reading.lng, reading.lat], zoom, padding: framePadding(), duration: motionMs(first ? 450 : 300) });
  };

  // The first precise reading then widens the view to the closest activities, so "near me" never
  // leaves the visitor on an empty street; with nothing close the street view stays.
  const frameNearby = async (reading) => {
    let items = [];
    try { items = await getJson(`${ENDPOINTS.nearby}?lat=${reading.lat.toFixed(5)}&lng=${reading.lng.toFixed(5)}`); }
    catch { items = []; }
    if (!follow) return;
    const near = (Array.isArray(items) ? items : []).filter((pin) => distanceM(reading, pin) <= MAP.nearbyFrameM).slice(0, MAP.nearbyFrameCount);
    if (!near.length) return;
    const bounds = near.reduce((box, pin) => box.extend([pin.lng, pin.lat]), new maplibregl.LngLatBounds([reading.lng, reading.lat], [reading.lng, reading.lat]));
    fittingNearby = true;
    fitTo(bounds, MAP.selfZoom, motionMs(450));
  };

  const showMe = (reading) => {
    if (!ready) { pendingReading = reading; return; }
    me ??= meMarker(maplibregl, message('you')).setLngLat([reading.lng, reading.lat]).addTo(map);
    me.setLngLat([reading.lng, reading.lat]);
    lastMe = reading;
    const accuracy = Math.max(reading.accuracy || 0, 10);
    const coarse = accuracy > COARSE_M;
    me.getElement().classList.toggle('is-coarse', coarse);
    const source = map.getSource('accuracy');
    const circle = accuracyCircle(reading, accuracy);
    if (source) source.setData(circle);
    else if (map.isStyleLoaded()) {
      map.addSource('accuracy', { type: 'geojson', data: circle });
      map.addLayer({ id: 'accuracy', type: 'fill', source: 'accuracy', paint: { 'fill-color': '#1a73e8', 'fill-opacity': 0.12 } });
      map.addLayer({ id: 'accuracy-edge', type: 'line', source: 'accuracy', paint: { 'line-color': '#1a73e8', 'line-opacity': 0.35, 'line-width': 1 } });
    }
    me.getElement().setAttribute('aria-label', coarse ? `${message('you')} (±${Math.round(accuracy)} m)` : message('you'));
    if (coarse && !warnedCoarse) {
      warnedCoarse = true;
      toast(message('locationApproximate').replace(':distance', accuracy >= 1000 ? (document.documentElement.lang.startsWith('en') ? `${(accuracy / 1609.344).toFixed(1)} mi` : `${(accuracy / 1000).toFixed(1)} km`) : `${Math.round(accuracy)} m`));
    }
    const first = centerRequested;
    if (centerRequested) {
      centerRequested = false;
      follow = true;
      const [[west, south], [east, north]] = MAP.searchBounds;
      if (reading.lng < west || reading.lng > east || reading.lat < south || reading.lat > north) {
        toast(message('locationOutside'));
        map.setMaxBounds(null);
      }
    }
    if (follow) frameReading(reading, first);
  };

  const detachFollow = () => {
    if (!follow && !centerRequested) return;
    follow = false;
    centerRequested = false;
    fittingAccuracy = false;
    fittingNearby = false;
    followZoom = null;
    $('[data-feature="locate"]', page)?.classList.add('is-detached');
  };
  page.addEventListener?.('bx:map-explore', detachFollow);
  // Only visitor gestures detach; location easing must not cancel its own follow mode.
  for (const type of ['dragstart', 'zoomstart', 'rotatestart']) {
    map.on(type, (event) => { if (event.originalEvent) detachFollow(); });
  }

  const bindList = () => {
    for (const item of $$('.sheet-item', list)) {
      item.addEventListener('mouseenter', () => select(item.dataset.slug));
      item.addEventListener('focusin', () => select(item.dataset.slug, true));
    }
  };

  map.on('error', () => { if (!ready) surface.busy(false); });
  map.on('load', () => { ready = true; fit(); if (pendingReading) { showMe(pendingReading); pendingReading = null; } schedule(); });
  map.on('click', () => select(''));
  const resizeViewport = () => {
    if (!ready) return;
    // A phone sheet raised over the map keeps the list it showed; lowering it re-reads the visible map.
    if (innerWidth < 700 && sheet.classList.contains('is-expanded')) return;
    map.setPadding(framePadding());
    schedule();
  };
  surface.connect(map, resizeViewport);
  map.on('resize', resizeViewport);
  sheet.addEventListener('transitionend', (event) => {
    if (event.target === sheet && ['height', 'max-height'].includes(event.propertyName)) resizeViewport();
  });
  map.on('moveend', () => {
    if (fittingAccuracy || fittingNearby) {
      fittingAccuracy = false;
      fittingNearby = false;
      followZoom = map.getZoom();
    }
    schedule();
  });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden || !staleWhileHidden) return;
    staleWhileHidden = false;
    schedule();
  });

  const locate = $('[data-feature="locate"]', page);
  let following = false;
  let stopLocateReading = null;
  let stopShareReading = null;
  locate?.addEventListener('click', () => {
    if (following && !follow && locate.classList.contains('is-detached')) {
      follow = true;
      precise = false;
      followZoom = null;
      fittingAccuracy = false;
      locate.classList.remove('is-detached');
      if (lastMe) frameReading(lastMe, true);
      return;
    }
    following = !following;
    locate.classList.remove('is-detached');
    locate.setAttribute('aria-pressed', String(following));
    if (!following) {
      follow = false;
      centerRequested = false;
      stopLocateReading?.();
      stopLocateReading = null;
      if (!live.isSharing()) live.stopWatching();
      return;
    }
    centerRequested = true;
    precise = false;
    followZoom = null;
    fittingAccuracy = false;
    warnedCoarse = false;
    stopLocateReading?.();
    stopLocateReading = live.onReading(reading => showMe(reading));
    live.startWatching();
  });

  const share = $('[data-feature="live"]', page);
  share?.addEventListener('click', async () => {
    if (live.isSharing()) {
      const keepLocate = following;
      const stopped = live.stopSharing();
      stopShareReading?.();
      stopShareReading = null;
      if (keepLocate) {
        following = true;
        locate?.setAttribute('aria-pressed', 'true');
        stopLocateReading = live.onReading(reading => showMe(reading));
        live.startWatching();
      }
      share.setAttribute('aria-pressed', 'false');
      await stopped;
      return;
    }
    centerRequested = true;
    share.setAttribute('aria-pressed', 'true');
    stopShareReading?.();
    stopShareReading = live.onReading(reading => showMe(reading));
    live.startSharing();
  });
  if (live.isSharing()) share?.setAttribute('aria-pressed', 'true');

  const handle = $('.sheet-handle', page);
  handle?.addEventListener('click', () => {
    const expanded = sheet.classList.toggle('is-expanded');
    handle.setAttribute('aria-expanded', String(expanded));
    page.classList.toggle('is-sheet-expanded', expanded);
    resizeViewport();
  });
  // Phones: the floating Map pill lowers a raised list, and scrolling the list raises it, like a native sheet.
  const sheetList = $('.sheet-list', page);
  $('[data-sheet-collapse]', page)?.addEventListener('click', () => {
    if (!sheet.classList.contains('is-expanded')) return;
    handle?.click();
    sheetList?.scrollTo({ top: 0, behavior: 'instant' });
  });
  // Only the visitor's own finger or wheel raises the sheet; a card scrolled into view for a pin does not.
  let touchedAt = 0;
  for (const type of ['touchstart', 'touchmove', 'wheel']) sheetList?.addEventListener(type, () => { touchedAt = performance.now(); }, { passive: true });
  sheetList?.addEventListener('scroll', () => {
    const byVisitor = performance.now() - touchedAt < 1200;
    if (innerWidth < 700 && byVisitor && performance.now() > quietScrollUntil && !sheet.classList.contains('is-expanded') && sheetList.scrollTop > 24) handle?.click();
  }, { passive: true });

  const feedback = $('#map-location-status', page);
  const reflectStatus = (state) => {
    if (feedback) feedback.textContent = message(state === 'waiting' ? 'locationLocating' : state === 'ready' ? (live.isSharing() ? 'locationSharing' : 'locationPrivate') : state === 'error' ? 'locationUnavailable' : 'locationStopped');
    locate?.setAttribute('aria-busy', String(following && state === 'waiting'));
    share?.setAttribute('aria-busy', String(live.isSharing() && state === 'waiting'));
    // Sighted visitors need the failure too: the status line is for screen readers.
    if (state === 'error' && following) toast(message('locationUnavailable'));
    if (state === 'error' || state === 'stopped') {
      following = false;
      follow = false;
      centerRequested = false;
      locate?.setAttribute('aria-pressed', 'false');
      stopLocateReading?.();
      stopLocateReading = null;
      share?.setAttribute('aria-pressed', String(live.isSharing()));
    }
  };
  let stopStatus = live.onStatus(reflectStatus);
  if (live.isSharing()) stopShareReading = live.onReading(reading => showMe(reading));
  window.addEventListener('pagehide', () => {
    surface.busy(false);
    clearTimeout(queryTimer);
    queryTicket++;
    requestController?.abort();
    stopLocateReading?.();
    stopShareReading?.();
    stopStatus();
  });
  window.addEventListener('pageshow', (event) => {
    if (!event.persisted) return;
    stopStatus = live.onStatus(reflectStatus);
    if (live.isSharing()) stopShareReading = live.onReading(reading => showMe(reading));
    schedule();
  });
  if (page.dataset.near === '1') locate?.click();
}
