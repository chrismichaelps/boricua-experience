import { clusterPins } from './mapClusters.js?v=19';
import { ENDPOINTS, LIVE, MAP } from '../constants/config.js?v=19';
import { message } from '../constants/messages.js';
import { getJson } from '../net/http.js?v=19';
import { $, $$, create } from '../utils/dom.js';
import { visiblePins, viewportBounds } from './mapViewport.js?v=19';
import { toast } from './toast.js';
import { createMap } from './mapLoader.js?v=19';
import { accuracyCircle, meMarker, priceMarker, clusterMarker } from './markers.js?v=19';
import * as live from './live.js?v=19';

function sheetItem(pin) {
  const item = create('div', { class: 'sheet-item', 'data-slug': pin.slug });
  const link = create('a', { class: 'card-link', href: `/e/${pin.slug}` });
  const media = create('div', { class: 'card-media' });
  media.append(create('img', { src: pin.cover, alt: '', loading: 'lazy' }), create('span', { class: 'pill pill-light card-price' }, pin.price));
  const body = create('div', { class: 'card-body' });
  body.append(create('p', { class: 'card-when' }, pin.when), create('h3', { class: 'card-title' }, pin.title), create('p', { class: 'card-place' }, pin.place));
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
  const { map, maplibregl } = await createMap(canvas);
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
  const visible = () => {
    const rect = canvas.getBoundingClientRect();
    const covered = matchMedia('(min-width: 960px)').matches ? 0 : Math.max(0, rect.bottom - sheet.getBoundingClientRect().top);
    return visiblePins(pins, (point) => map.project(point), rect.width, rect.height, covered);
  };

  const select = (slug, fromList = false) => {
    selectedSlug = slug;
    for (const entry of markers.values()) entry.element.classList.toggle('is-active', entry.slugs.includes(slug));
    for (const item of $$('.sheet-item', list)) item.classList.toggle('is-active', item.dataset.slug === slug);
    const pin = pins.find((candidate) => candidate.slug === slug);
    if (!pin) return;
    if (fromList && !restoringFocus) map.easeTo({ center: [pin.lng, pin.lat], zoom: Math.max(map.getZoom(), 13), duration: matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 350 });
    else list.querySelector(`[data-slug="${slug}"]`)?.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'nearest', inline: 'center' });
  };

  const draw = (shown = visible()) => {
    const focused = [...markers.values()].find((entry) => entry.element === document.activeElement)?.slugs ?? [];
    for (const entry of markers.values()) entry.marker.remove();
    const groups = map.getZoom() < MAP.clusterMaxZoom ? clusterPins(shown, (point) => map.project(point), MAP.clusterRadius) : shown.map((pin) => [pin]);
    markers = new Map(groups.map((group) => {
      const pin = group[0];
      const label = group.length === 1 ? `${pin.title}, ${pin.price}` : page.dataset.clusterLabel.replace(':count', String(group.length));
      const expand = () => {
        const bounds = new maplibregl.LngLatBounds();
        for (const member of group) bounds.extend([member.lng, member.lat]);
        map.fitBounds(bounds, { padding: 64, maxZoom: Math.min(map.getZoom() + 2, MAP.clusterMaxZoom), duration: matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 350 });
      };
      const entry = group.length === 1 ? priceMarker(maplibregl, pin, (slug) => select(slug)) : clusterMarker(maplibregl, group, label, expand);
      entry.slugs = group.map((member) => member.slug);
      entry.marker.addTo(map);
      entry.element.setAttribute('aria-label', label);
      entry.element.classList.toggle('is-active', entry.slugs.includes(selectedSlug));
      return [pin.slug, entry];
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
      for (const point of MAP.searchBounds) bounds.extend(point);
    } else for (const pin of pins) bounds.extend([pin.lng, pin.lat]);
    const sheet = page.querySelector('.map-sheet');
    const wide = matchMedia('(min-width: 960px)').matches;
    const covered = sheet ? sheet.getBoundingClientRect() : { height: 0, width: 0 };
    map.fitBounds(bounds, { padding: { top: 80, right: 40, left: 40, bottom: wide ? 40 : covered.height + 24 }, maxZoom: 15, duration: 0 });
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
    if (focused) {
      restoringFocus = true;
      list.querySelector(`[data-slug="${focused}"] a`)?.focus({ preventScroll: true });
      restoringFocus = false;
    }
  };

  const refreshViewport = async (ticket) => {
    const query = new URLSearchParams(location.search);
    const rect = canvas.getBoundingClientRect();
    const covered = matchMedia('(min-width: 960px)').matches ? 0 : Math.max(0, rect.bottom - sheet.getBoundingClientRect().top);
    const area = viewportBounds(map, rect.width, rect.height, covered);
    for (const [name, value] of Object.entries(area)) query.set(name, value);
    query.delete('lat'); query.delete('lng'); query.delete('radius');
    query.delete('after');
    query.delete('near');
    const key = query.toString();
    const cached = queryCache.get(key);
    if (cached && Date.now() - cached.at < MAP.viewportCacheMs) {
      if (ticket !== queryTicket) return;
      pins = cached.pins;
      limited = cached.limited;
      list.setAttribute('aria-busy', 'false');
      render();
      return;
    }
    requestController = new AbortController();
    const controller = requestController;
    list.setAttribute('aria-busy', 'true');
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
      if (ticket === queryTicket) list.setAttribute('aria-busy', 'false');
    }
  };

  const schedule = () => {
    if (!ready) return;
    render();
    clearTimeout(queryTimer);
    requestController?.abort();
    const ticket = ++queryTicket;
    queryTimer = setTimeout(() => refreshViewport(ticket), MAP.viewportDelayMs);
  };

  const showMe = (reading) => {
    if (!ready) { pendingReading = reading; return; }
    me ??= meMarker(maplibregl, message('you')).setLngLat([reading.lng, reading.lat]).addTo(map);
    me.setLngLat([reading.lng, reading.lat]);
    const source = map.getSource('accuracy');
    const circle = accuracyCircle(reading, Math.max(reading.accuracy, 10));
    if (source) source.setData(circle);
    else if (map.isStyleLoaded()) {
      map.addSource('accuracy', { type: 'geojson', data: circle });
      map.addLayer({ id: 'accuracy', type: 'fill', source: 'accuracy', paint: { 'fill-color': '#1a73e8', 'fill-opacity': 0.12 } });
    }
    me.getElement().setAttribute('aria-label', message('you'));
    if (centerRequested) {
      centerRequested = false;
      const [[west, south], [east, north]] = MAP.searchBounds;
      if (reading.lng < west || reading.lng > east || reading.lat < south || reading.lat > north) {
        toast(message('locationOutside'));
        map.setMaxBounds(null);
      }
      map.easeTo({ center: [reading.lng, reading.lat], zoom: MAP.focusZoom, padding: { top: 72, bottom: matchMedia('(min-width: 960px)').matches ? 24 : sheet.getBoundingClientRect().height + 24 }, duration: matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 450 });
    }
  };

  const bindList = () => {
    for (const item of $$('.sheet-item', list)) {
      item.addEventListener('mouseenter', () => select(item.dataset.slug));
      item.addEventListener('focusin', () => select(item.dataset.slug, true));
    }
  };

  map.on('load', () => { ready = true; fit(); if (pendingReading) { showMe(pendingReading); pendingReading = null; } schedule(); });
  map.on('click', () => select(''));
  const resizeViewport = () => {
    if (!ready) return;
    map.setPadding({ top: 80, right: 40, left: 40, bottom: matchMedia('(min-width: 960px)').matches ? 40 : sheet.getBoundingClientRect().height + 24 });
    schedule();
  };
  map.on('resize', resizeViewport);
  sheet.addEventListener('transitionend', (event) => {
    if (event.target === sheet && ['height', 'max-height'].includes(event.propertyName)) resizeViewport();
  });
  map.on('moveend', schedule);

  const locate = $('[data-feature="locate"]', page);
  let following = false;
  let stopLocateReading = null;
  let stopShareReading = null;
  locate?.addEventListener('click', () => {
    following = !following;
    locate.setAttribute('aria-pressed', String(following));
    if (!following) {
      stopLocateReading?.();
      stopLocateReading = null;
      if (!live.isSharing()) live.stopWatching();
      return;
    }
    centerRequested = true;
    stopLocateReading?.();
    stopLocateReading = live.onReading(showMe);
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
        stopLocateReading = live.onReading(showMe);
        live.startWatching();
      }
      share.setAttribute('aria-pressed', 'false');
      await stopped;
      return;
    }
    centerRequested = true;
    share.setAttribute('aria-pressed', 'true');
    stopShareReading?.();
    stopShareReading = live.onReading(showMe);
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

  const reflectStatus = (state) => {
    locate?.setAttribute('aria-busy', String(following && state === 'waiting'));
    share?.setAttribute('aria-busy', String(live.isSharing() && state === 'waiting'));
    if (state === 'error' || state === 'stopped') {
      following = false;
      centerRequested = false;
      locate?.setAttribute('aria-pressed', 'false');
      stopLocateReading?.();
      stopLocateReading = null;
      if (state === 'error') share?.setAttribute('aria-pressed', 'false');
    }
  };
  let stopStatus = live.onStatus(reflectStatus);
  if (live.isSharing()) stopShareReading = live.onReading(showMe);
  window.addEventListener('pagehide', () => {
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
    if (live.isSharing()) stopShareReading = live.onReading(showMe);
    schedule();
  });
  if (page.dataset.near === '1') locate?.click();
}
