import { GEO, LIVE, MAP } from '../constants/config.js?v=49';
import { getJson } from '../net/http.js?v=49';
import { message } from '../constants/messages.js?v=49';
import { createMap } from './mapLoader.js?v=49';
import { accuracyCircle, personMarker } from './markers.js?v=49';
import { requestLocation } from '../utils/locate.js?v=49';

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
  const button = form.querySelector('[data-feature="pin-here"]');
  const notice = document.createElement('p'); notice.className = 'field-hint'; notice.setAttribute('role','status'); notice.hidden = true; button?.after(notice);
  let lookup, map, marker, point;
  const cancel = () => { lookup?.abort(); lookup = null; if(button) {button.disabled=false;button.removeAttribute('aria-busy');} };
  const place = (lng, lat) => {
    point = [lng,lat]; latInput.value = lat.toFixed(6); lngInput.value = lng.toFixed(6);
    marker?.setLngLat(point).addTo(map);
  };
  button?.addEventListener('click', async () => {
    if (lookup) return;
    const controller = new AbortController(); lookup = controller; button.disabled = true; button.setAttribute('aria-busy','true');
    notice.hidden = false; notice.textContent = message('locationLocating');
    try {
      const position = await requestLocation(controller.signal);
      const {latitude:lat,longitude:lng,accuracy} = position.coords;
      const [[west,south],[east,north]] = MAP.searchBounds;
      if(lat<south || lat>north || lng<west || lng>east) { notice.textContent=message('locationOutside'); return; }
      place(lng,lat); map?.easeTo({center:point,zoom:MAP.pinZoom});
      notice.textContent = accuracy>GEO.approximateM ? message('locationPinApproximate').replace(':distance', String(Math.round(accuracy))) : message('locationPinReady');
    } catch(error) {
      if(error.name !== 'AbortError') notice.textContent = message(error.code===1?'locationPinDenied':error.code===0?'locationUnsupported':error.code===3?'locationTimedOut':'locationPinUnavailable');
    } finally { if(lookup===controller) cancel(); }
  });
  window.addEventListener('pagehide', cancel);
  const start = [Number(element.dataset.lng), Number(element.dataset.lat)];
  if(latInput.value !== '' && lngInput.value !== '') point=start;
  const sync = () => {
    cancel(); notice.hidden=true; const lat=Number(latInput.value), lng=Number(lngInput.value);
    if(Number.isFinite(lat)&&Number.isFinite(lng)&&latInput.value&&lngInput.value) { place(lng,lat);map?.easeTo({center:point}); }
  };
  latInput.addEventListener('change',sync); lngInput.addEventListener('change',sync);
  try {
    const loaded=await createMap(element,{center:point||start,zoom:point?MAP.pinZoom:MAP.zoom}); map=loaded.map;
    marker=new loaded.maplibregl.Marker({color:'#e63950',draggable:true});
    if(point) marker.setLngLat(point).addTo(map);
    map.on('click',event=>{cancel();notice.hidden=true;place(event.lngLat.lng,event.lngLat.lat);});
    marker.on('dragstart',()=>{cancel();notice.hidden=true;}); marker.on('dragend',()=>{const {lng,lat}=marker.getLngLat();place(lng,lat);});
  } catch { notice.hidden=false;notice.textContent=message('locationMapUnavailable'); }
}
