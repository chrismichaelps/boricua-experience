// Plans near the visitor: the location button fills the start and builds the plans, any choice
// rebuilds them at once with a placeholder while the page loads, and each plan's map draws its
// numbered stops and the road route between them (a dashed line where no road route is known).
import { $, $$, create } from '../utils/dom.js?v=80';
import { requestLocation } from '../utils/locate.js?v=80';
import { message } from '../constants/messages.js?v=80';
import { toast } from './toast.js?v=80';
import { createMap } from './mapLoader.js?v=80';
import { getJson } from '../net/http.js?v=80';
import { buildings3d } from './map3d.js?v=93';
import { expandable } from './mapExpand.js?v=93';

const ROUTE_COLOR = '#1878ec';
// Room kept clear for the map tools on the right, so the route is never drawn under them.
const FRAME = { top: 30, right: 64, bottom: 30, left: 30 };

/** Shows a placeholder over the plans while the next page is on its way. */
function waiting(page) {
  page.setAttribute('aria-busy', 'true');
  page.classList.add('is-planning');
}

/** The pins a plan card carries, in order. */
export function pinsOf(node) {
  try { return JSON.parse(node.dataset.pins || '[]').filter((pin) => Number.isFinite(pin.lat) && Number.isFinite(pin.lng)); }
  catch { return []; }
}

/** A line per leg: the road route when one is known, else a straight dashed segment. */
export function legLines(pins, legs) {
  const byOrder = new Map((legs || []).map((leg) => [leg.order, leg.coordinates]));
  const road = [], straight = [];
  for (let index = 0; index < pins.length - 1; index += 1) {
    const coordinates = byOrder.get(index + 1);
    if (Array.isArray(coordinates) && coordinates.length > 1) road.push(coordinates);
    else straight.push([[pins[index].lng, pins[index].lat], [pins[index + 1].lng, pins[index + 1].lat]]);
  }
  const feature = (lines) => ({ type: 'Feature', geometry: { type: 'MultiLineString', coordinates: lines }, properties: {} });
  return { road: feature(road), straight: feature(straight) };
}

async function drawMap(node) {
  const pins = pinsOf(node);
  if (!pins.length) return;
  const { map, maplibregl } = await createMap(node, { cooperative: true, controls: false, rotatable: true, center: [pins[0].lng, pins[0].lat], zoom: 11 });
  // The 3D switch tilts the camera and raises buildings; while it is on, the camera turns with two
  // fingers or the turn buttons.
  const tools = node.parentElement?.querySelector('.plan-map-tools');
  if (tools) buildings3d(map, tools.querySelector('[data-map-3d]'), tools.querySelector('.map-turn'), { zoomIn: false });
  const bounds = pins.reduce((box, pin) => box.extend([pin.lng, pin.lat]), new maplibregl.LngLatBounds([pins[0].lng, pins[0].lat], [pins[0].lng, pins[0].lat]));
  // Opening the map over the screen frames the whole route again at the larger size.
  let framed = bounds;
  expandable(map, tools?.querySelector('[data-map-expand]'), () => map.fitBounds(framed, { padding: FRAME, maxZoom: 14, duration: 0 }));
  for (const pin of pins) {
    const element = create('span', { class: 'plan-pin', 'aria-hidden': 'true' }, String(pin.order));
    new maplibregl.Marker({ element }).setLngLat([pin.lng, pin.lat]).addTo(map);
  }
  map.on('load', async () => {
    map.fitBounds(bounds, { padding: FRAME, maxZoom: 14, duration: 0 });
    let legs = [];
    if (pins.length > 1) {
      try { legs = (await getJson(`/api/plan/route?e=${encodeURIComponent(pins.map((pin) => pin.slug).join(','))}`)).legs; }
      catch { legs = []; }
    }
    const lines = legLines(pins, legs);
    map.addSource('plan-road', { type: 'geojson', data: lines.road });
    map.addSource('plan-straight', { type: 'geojson', data: lines.straight });
    map.addLayer({ id: 'plan-road-casing', type: 'line', source: 'plan-road', layout: { 'line-cap': 'round', 'line-join': 'round' }, paint: { 'line-color': '#ffffff', 'line-width': 7 } });
    map.addLayer({ id: 'plan-road', type: 'line', source: 'plan-road', layout: { 'line-cap': 'round', 'line-join': 'round' }, paint: { 'line-color': ROUTE_COLOR, 'line-width': 4 } });
    map.addLayer({ id: 'plan-straight', type: 'line', source: 'plan-straight', paint: { 'line-color': ROUTE_COLOR, 'line-width': 3, 'line-dasharray': [1.5, 1.5], 'line-opacity': 0.7 } });
    const routed = lines.road.geometry.coordinates.flat();
    if (routed.length) framed = routed.reduce((box, point) => box.extend(point), bounds);
    map.fitBounds(framed, { padding: FRAME, maxZoom: 14, duration: 0 });
  });
}

export function plan(page) {
  const form = $('[data-plan-form]', page);
  if (!form) return;
  const lat = form.elements.lat, lng = form.elements.lng, town = form.elements.town;
  const submit = () => { waiting(page); form.requestSubmit ? form.requestSubmit() : form.submit(); };

  $('[data-plan-locate]', form)?.addEventListener('click', async (event) => {
    const button = event.currentTarget;
    const label = button.querySelector('span');
    const original = label?.textContent;
    button.setAttribute('aria-busy', 'true');
    if (label) label.textContent = button.dataset.busyLabel;
    try {
      const position = await requestLocation();
      lat.value = position.coords.latitude.toFixed(5);
      lng.value = position.coords.longitude.toFixed(5);
      town.value = '';
      submit();
    } catch {
      toast(message('locationUnavailable'));
      button.removeAttribute('aria-busy');
      if (label) label.textContent = original;
    }
  });
  // A town replaces the device position; any other choice rebuilds the plans for the same start.
  town?.addEventListener('change', () => { lat.value = ''; lng.value = ''; if (town.value) submit(); });
  for (const input of $$('input[type="radio"]', form)) input.addEventListener('change', () => { if (lat.value || town.value) submit(); });
  form.addEventListener('submit', () => waiting(page));
  // Sending a plan to someone is an achievement signal.
  page.addEventListener('click', (event) => {
    if (event.target.closest?.('.plan-whatsapp, .plan-actions [data-feature="share"]')) document.dispatchEvent(new CustomEvent('bx:action', { detail: { action: 'plan_share' } }));
  });
  addEventListener('pageshow', () => { page.removeAttribute('aria-busy'); page.classList.remove('is-planning'); });

  // Maps are drawn as they come into view, so a phone loads one map at a time.
  const maps = $$('.plan-map', page);
  if (!('IntersectionObserver' in window)) { for (const node of maps) drawMap(node).catch(() => {}); return; }
  const watcher = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      watcher.unobserve(entry.target);
      drawMap(entry.target).catch(() => {});
    }
  }, { rootMargin: '200px 0px' });
  for (const node of maps) watcher.observe(node);
}
