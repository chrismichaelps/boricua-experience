import { create } from '../utils/dom.js';

export function priceMarker(maplibregl, pin, onSelect) {
  const element = create('button', { type: 'button', class: 'price-marker', 'aria-label': `${pin.title}, ${pin.price}` }, pin.price);
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
