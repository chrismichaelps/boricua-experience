import { LIVE, MAP } from '../constants/config.js?v=25';
import { getJson } from '../net/http.js?v=25';
import { message } from '../constants/messages.js?v=25';
import { createMap } from './mapLoader.js?v=25';
import { accuracyCircle, personMarker } from './markers.js?v=25';
import { toast } from './toast.js?v=25';

function whenVisible(element, action) {
  const observer = new IntersectionObserver((entries) => {
    if (entries.some((entry) => entry.isIntersecting)) { observer.disconnect(); action(); }
  }, { rootMargin: '200px' });
  observer.observe(element);
}

export function miniMap(element) {
  whenVisible(element, async () => {
    const center = { lat: Number(element.dataset.lat), lng: Number(element.dataset.lng) };
    const exact = element.dataset.exact === '1';
    const { map, maplibregl } = await createMap(element, { center: [center.lng, center.lat], zoom: exact ? MAP.pinZoom : 13.5, cooperative: true });
    map.on('load', () => {
      if (exact) {
        new maplibregl.Marker({ color: '#e63950' }).setLngLat([center.lng, center.lat]).addTo(map);
        return;
      }
      map.addSource('area', { type: 'geojson', data: accuracyCircle(center, 600) });
      map.addLayer({ id: 'area-fill', type: 'fill', source: 'area', paint: { 'fill-color': '#1878ec', 'fill-opacity': 0.14 } });
      map.addLayer({ id: 'area-line', type: 'line', source: 'area', paint: { 'line-color': '#1878ec', 'line-width': 2, 'line-dasharray': [2, 2] } });
    });
  });
}

export function participants(element) {
  whenVisible(element, async () => {
    const center = [Number(element.dataset.lng), Number(element.dataset.lat)];
    const { map, maplibregl } = await createMap(element, { center, zoom: 14, cooperative: true });
    new maplibregl.Marker({ color: '#e63950' }).setLngLat(center).addTo(map);
    let markers = [];
    const refresh = async () => {
      try {
        const people = await getJson(element.dataset.src);
        for (const marker of markers) marker.remove();
        markers = people.map((person) => personMarker(maplibregl, person).addTo(map));
      } catch { /* positions are optional */ }
    };
    map.on('load', refresh);
    setInterval(() => { if (document.visibilityState === 'visible') refresh(); }, LIVE.participantsRefreshMs);
  });
}

export async function pinPicker(element) {
  const form = element.closest('form');
  const latInput = form.querySelector('[data-pin="lat"]');
  const lngInput = form.querySelector('[data-pin="lng"]');
  const start = [Number(element.dataset.lng), Number(element.dataset.lat)];
  const chosen = latInput.value !== '' && lngInput.value !== '';
  const { map, maplibregl } = await createMap(element, { center: start, zoom: chosen ? MAP.pinZoom : MAP.zoom });
  const marker = new maplibregl.Marker({ color: '#e63950', draggable: true });
  const place = (lng, lat) => {
    marker.setLngLat([lng, lat]).addTo(map);
    latInput.value = lat.toFixed(6);
    lngInput.value = lng.toFixed(6);
  };
  if (chosen) place(start[0], start[1]);
  map.on('click', (event) => place(event.lngLat.lng, event.lngLat.lat));
  marker.on('dragend', () => { const { lng, lat } = marker.getLngLat(); place(lng, lat); });
  const sync = () => {
    const lat = Number(latInput.value);
    const lng = Number(lngInput.value);
    if (Number.isFinite(lat) && Number.isFinite(lng) && latInput.value && lngInput.value) { marker.setLngLat([lng, lat]).addTo(map); map.easeTo({ center: [lng, lat] }); }
  };
  latInput.addEventListener('change', sync);
  lngInput.addEventListener('change', sync);
  form.querySelector('[data-feature="pin-here"]')?.addEventListener('click', () => {
    navigator.geolocation?.getCurrentPosition((position) => {
      place(position.coords.longitude, position.coords.latitude);
      map.easeTo({ center: [position.coords.longitude, position.coords.latitude], zoom: MAP.pinZoom });
    }, () => toast(message('locationUnavailable')), LIVE.watch);
  });
}
