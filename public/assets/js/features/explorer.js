import { ENDPOINTS, LIVE, MAP } from '../constants/config.js';
import { message } from '../constants/messages.js';
import { getJson } from '../net/http.js';
import { $, $$, create } from '../utils/dom.js';
import { distanceM } from '../utils/geo.js';
import { createMap } from './mapLoader.js';
import { accuracyCircle, meMarker, priceMarker } from './markers.js';
import * as live from './live.js';

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
  let pins = JSON.parse($('#map-pins', page)?.textContent || '[]');
  const { map, maplibregl } = await createMap(canvas);
  let markers = new Map();
  let me = null;
  let lastNearby = null;

  const select = (slug, fromList = false) => {
    for (const [key, entry] of markers) entry.element.classList.toggle('is-active', key === slug);
    for (const item of $$('.sheet-item', list)) item.classList.toggle('is-active', item.dataset.slug === slug);
    const pin = pins.find((candidate) => candidate.slug === slug);
    if (!pin) return;
    if (fromList) map.easeTo({ center: [pin.lng, pin.lat], zoom: Math.max(map.getZoom(), 13) });
    else list.querySelector(`[data-slug="${slug}"]`)?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  };

  const draw = () => {
    for (const entry of markers.values()) entry.marker.remove();
    markers = new Map(pins.map((pin) => {
      const entry = priceMarker(maplibregl, pin, (slug) => select(slug));
      entry.marker.addTo(map);
      return [pin.slug, entry];
    }));
  };

  const fit = () => {
    if (!pins.length) return;
    const bounds = new maplibregl.LngLatBounds();
    for (const pin of pins) bounds.extend([pin.lng, pin.lat]);
    const sheet = page.querySelector('.map-sheet');
    const wide = matchMedia('(min-width: 960px)').matches;
    const covered = sheet ? sheet.getBoundingClientRect() : { height: 0, width: 0 };
    map.fitBounds(bounds, { padding: { top: 80, right: 40, left: wide ? covered.width + 40 : 40, bottom: wide ? 40 : covered.height + 24 }, maxZoom: 15, duration: 0 });
  };

  const refreshNearby = async (reading) => {
    if (lastNearby && distanceM(lastNearby, reading) < LIVE.nearbyRefreshM) return;
    lastNearby = reading;
    try {
      pins = await getJson(`${ENDPOINTS.nearby}?lat=${reading.lat}&lng=${reading.lng}`);
      draw();
      list.replaceChildren(...pins.map(sheetItem));
      count.textContent = count.textContent.replace(/\d+/, String(pins.length));
      bindList();
    } catch { /* keep the current pins */ }
  };

  const showMe = (reading) => {
    me ??= meMarker(maplibregl, message('you')).setLngLat([reading.lng, reading.lat]).addTo(map);
    me.setLngLat([reading.lng, reading.lat]);
    const source = map.getSource('accuracy');
    const circle = accuracyCircle(reading, Math.max(reading.accuracy, 10));
    if (source) source.setData(circle);
    else if (map.isStyleLoaded()) {
      map.addSource('accuracy', { type: 'geojson', data: circle });
      map.addLayer({ id: 'accuracy', type: 'fill', source: 'accuracy', paint: { 'fill-color': '#1a73e8', 'fill-opacity': 0.12 } });
    }
    refreshNearby(reading);
  };

  const bindList = () => {
    for (const item of $$('.sheet-item', list)) item.addEventListener('mouseenter', () => select(item.dataset.slug));
  };

  map.on('load', () => { draw(); fit(); bindList(); });
  map.on('click', () => select(''));

  const locate = $('[data-feature="locate"]', page);
  let following = false;
  locate?.addEventListener('click', () => {
    following = !following;
    locate.setAttribute('aria-pressed', String(following));
    if (!following) return;
    live.startWatching();
    let first = true;
    live.onReading((reading) => {
      showMe(reading);
      if (first) { map.easeTo({ center: [reading.lng, reading.lat], zoom: MAP.focusZoom }); first = false; }
    });
  });

  const share = $('[data-feature="live"]', page);
  share?.addEventListener('click', async () => {
    if (live.isSharing()) {
      await live.stopSharing();
      share.setAttribute('aria-pressed', 'false');
      return;
    }
    live.startSharing();
    share.setAttribute('aria-pressed', 'true');
    live.onReading(showMe);
  });
  if (live.isSharing()) share?.setAttribute('aria-pressed', 'true');

  const sheet = $('.map-sheet', page);
  $('.sheet-handle', page)?.addEventListener('click', () => sheet.classList.toggle('is-expanded'));

  if (page.dataset.near === '1') locate?.click();
}
