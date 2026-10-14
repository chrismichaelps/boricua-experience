import { create } from '../utils/dom.js?v=75';

export function priceMarker(maplibregl, pin, onSelect) {
  const element = create('button', { type: 'button', class: 'price-marker', 'data-count': '1', 'aria-label': `${pin.title}, ${pin.price}` }, pin.price);
  element.addEventListener('click', (event) => {
    event.stopPropagation();
    onSelect(pin.slug);
  });
  const marker = new maplibregl.Marker({ element, anchor: 'bottom' }).setLngLat([pin.lng, pin.lat]);
  return { marker, element };
}

export function meMarker(maplibregl, label) {
  const element = create('div', { class: 'me-marker', role: 'img', 'aria-label': label });
  return new maplibregl.Marker({ element });
}

export function personMarker(maplibregl, person) {
  const element = create('div', { class: 'friend-marker' });
  const initials = person.display_name.split(/\s+/).slice(0, 2).map((word) => word[0]?.toUpperCase() ?? '').join('');
  const face = create('span', { class: 'avatar avatar-sm', style: 'background:#1a73e8' }, initials);
  element.append(face, create('span', {}, person.display_name.split(' ')[0]));
  return new maplibregl.Marker({ element }).setLngLat([person.lng, person.lat]);
}

export function accuracyCircle(center, meters, steps = 48) {
  const coordinates = [];
  const latRadius = meters / 111320;
  const lngRadius = meters / (111320 * Math.cos((center.lat * Math.PI) / 180));
  for (let index = 0; index <= steps; index += 1) {
    const angle = (index / steps) * 2 * Math.PI;
    coordinates.push([center.lng + lngRadius * Math.cos(angle), center.lat + latRadius * Math.sin(angle)]);
  }
  return { type: 'Feature', geometry: { type: 'Polygon', coordinates: [coordinates] }, properties: {} };
}

export function clusterMarker(maplibregl, pins, label, onSelect) {
  const element = create('button', { type: 'button', class: 'map-cluster', 'data-count': String(pins.length), 'aria-label': label }, String(pins.length));
  element.addEventListener('click', (event) => { event.stopPropagation(); onSelect(); });
  const center = pins.reduce((sum, pin) => [sum[0] + pin.lng / pins.length, sum[1] + pin.lat / pins.length], [0, 0]);
  const marker = new maplibregl.Marker({ element }).setLngLat(center);
  return { marker, element };
}
