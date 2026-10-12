import { MAP } from '../constants/config.js?v=46';
import { distanceM } from '../utils/geo.js?v=46';

export function visiblePins(pins, project, width, height, covered = 0) {
  return pins.filter((pin) => {
    const point = project([pin.lng, pin.lat]);
    return point.x >= 0 && point.x <= width && point.y >= 0 && point.y <= Math.max(0, height - covered);
  });
}

export function viewportQuery(center, bounds) {
  const [[west, south], [east, north]] = MAP.searchBounds;
  const point = { lng: Math.max(west, Math.min(east, center.lng)), lat: Math.max(south, Math.min(north, center.lat)) };
  const corners = [
    { lng: bounds.getWest(), lat: bounds.getSouth() }, { lng: bounds.getWest(), lat: bounds.getNorth() },
    { lng: bounds.getEast(), lat: bounds.getSouth() }, { lng: bounds.getEast(), lat: bounds.getNorth() },
  ];
  return { ...point, radius: Math.min(MAP.maxRadiusM, Math.ceil(Math.max(...corners.map((corner) => distanceM(point, corner))))) };
}

export function viewportBounds(map, width, height, covered = 0) {
  const topLeft = map.unproject([0, 0]);
  const bottomRight = map.unproject([width, Math.max(0, height - covered)]);
  const round = (value) => Math.round(value * 100000) / 100000;
  return { west: round(Math.max(-180, topLeft.lng)), north: round(Math.min(85, topLeft.lat)), east: round(Math.min(180, bottomRight.lng)), south: round(Math.max(-85, bottomRight.lat)) };
}
