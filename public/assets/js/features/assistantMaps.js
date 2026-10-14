import { tripHref } from './assistantNext.js?v=75';
import { distanceText } from '../utils/units.js?v=75';
const finite = n => typeof n === 'number' && Number.isFinite(n);
const point = p => Array.isArray(p) && p.length === 2 && finite(p[0]) && finite(p[1]) && p[0] >= -67.6 && p[0] <= -65 && p[1] >= 17.4 && p[1] <= 18.8;
export function checkedVisual(value) {
  if (!value || !['route','itinerary'].includes(value.kind) || !Array.isArray(value.pins) || value.pins.length < 1 || value.pins.length > 4) return null;
  if (!value.pins.every(p => finite(p.lat) && finite(p.lng) && point([p.lng,p.lat]) && typeof p.title === 'string' && p.title.length <= 180)) return null;
  const legs = Array.isArray(value.legs) ? value.legs.filter(l => Number.isInteger(l.order) && l.order >= 1 && l.order < value.pins.length && Array.isArray(l.coordinates) && l.coordinates.length >= 2 && l.coordinates.length <= 4000 && l.coordinates.every(point)) : [];
  const href = typeof value.href === 'string' && /^\/plan\?e=[a-z0-9,-]{3,324}$/.test(value.href) ? value.href : '';
  return {...value, legs, href};
}

export function assistantMaps(section, raw, labels) {
  const value = checkedVisual(raw);
  if (!value) return () => {};
  const el = (tag, className, text) => { const node = document.createElement(tag); if (className) node.className=className; if (text) node.textContent=text; return node; };
  const title = el('h3','', value.kind === 'itinerary' ? labels.itinerary : labels.route);
  const card = el('section','assistant-plan'); card.append(title);
  const names = value.pins.map(p => p.title).join(' → ');
  card.append(el('p','assistant-route-name',names));
  const canvas = el('div','assistant-route-map'); canvas.setAttribute('role','img'); canvas.setAttribute('aria-label',names); card.append(canvas);
  const facts = el('p','assistant-route-note',labels.estimated + ' · ' + (value.location_scope === 'town_centers' ? labels.townCenters : labels.approximate));
  if (finite(value.seconds) && value.seconds >= 0) facts.textContent += ` · ${Math.round(value.seconds/60)} min`;
  if (finite(value.meters) && value.meters >= 0) facts.textContent += ` · ${distanceText(value.meters)}`;
  if (value.legs.length < value.pins.length - 1) facts.textContent += ' · ' + labels.noRoad;
  card.append(facts);
  const stops = el('ol','assistant-plan-stops');
  for (const [index,pin] of value.pins.entries()) {
    const item = el('li');
    const link = /^\/(e|lugar)\/[a-z0-9-]+$/.test(pin.href || '') ? el('a','',pin.title) : el('span','',pin.title);
    if (link.tagName === 'A') link.href=pin.href;
    item.append(link);
    const stop = value.stops?.[index];
    if (stop && typeof stop.arrive === 'string' && typeof stop.leave === 'string') {
      const start = new Date(stop.arrive), end = new Date(stop.leave);
      if (Number.isFinite(start.getTime()) && Number.isFinite(end.getTime())) {
        const format = new Intl.DateTimeFormat(document.documentElement.lang.startsWith('en')?'en-US':'es-PR',{timeZone:'America/Puerto_Rico',dateStyle:'medium',timeStyle:'short'});
        item.append(el('small','',`${format.format(start)} → ${format.format(end)} AST · ${labels.suggested}`));
      }
    }
    stops.append(item);
  }
  card.append(stops);
  const actions = el('div','assistant-plan-actions');
  const trip = tripHref(value.href);
  if (trip && value.pins.length >= 2) { const start=el('a','button button-small',labels.startTrip); start.href=trip; actions.append(start); }
  if (value.href) { const open=el('a','button button-ghost button-small',labels.openPlan); open.href=value.href; actions.append(open); }
  if (value.pins.length >= 2) {
    const first=value.pins[0],last=value.pins.at(-1);
    const nav=el('a','button button-ghost button-small',labels.directions);
    nav.href=`https://www.google.com/maps/dir/?api=1&origin=${first.lat},${first.lng}&destination=${last.lat},${last.lng}&travelmode=driving`;
    nav.target='_blank'; nav.rel='noopener noreferrer'; actions.append(nav);
  }
  card.append(actions); section.append(card);
  let closed=false,map,observer;
  const draw=async()=>{
    try {
      const {createMap}=await import('./mapLoader.js?v=75');
      if(closed)return;
      const built=await createMap(canvas,{cooperative:true,controls:false,center:[value.pins[0].lng,value.pins[0].lat],zoom:11});
      map=built.map;
      if(closed){map.remove();return;}
      const bounds=new built.maplibregl.LngLatBounds();
      for(const [index,pin] of value.pins.entries()) {
        bounds.extend([pin.lng,pin.lat]);
        new built.maplibregl.Marker({element:el('span','assistant-route-pin',String(index+1))}).setLngLat([pin.lng,pin.lat]).addTo(map);
      }
      map.on('load',()=>{
        if(closed)return;
        const lines=value.legs.map(l=>l.coordinates);
        for(const line of lines) for(const coord of line) bounds.extend(coord);
        map.fitBounds(bounds,{padding:32,maxZoom:14,duration:0});
        map.addSource('chat-roads',{type:'geojson',data:{type:'Feature',geometry:{type:'MultiLineString',coordinates:lines},properties:{}}});
        map.addLayer({id:'chat-roads',type:'line',source:'chat-roads',layout:{'line-cap':'round','line-join':'round'},paint:{'line-color':'#1878ec','line-width':4}});
      });
    } catch { if(!closed) canvas.replaceChildren(el('p','assistant-map-fallback',labels.mapUnavailable)); }
  };
  if(typeof IntersectionObserver === 'function') {
    observer=new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting)){observer.disconnect();draw();}},{root:section.closest('.assistant-thread'),rootMargin:'100px'});
    observer.observe(canvas);
  } else draw();
  return ()=>{closed=true;observer?.disconnect();map?.remove();};
}
