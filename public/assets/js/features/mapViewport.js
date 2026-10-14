import { MAP } from '../constants/config.js?v=67';
import { distanceM } from '../utils/geo.js?v=67';

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

// The camera rectangle widened outward to a grid that depends only on the zoom level, so nearby
// visitors and small movements ask for byte-identical areas that the browser and the shared edge
// cache answer without a database read. Pins outside the visible camera are filtered on the client.
export function snapArea(area, zoom) {
  const level = Math.max(0, Math.min(MAP.gridMaxZoom, Math.floor(zoom)));
  const step = Math.max(MAP.gridMinDeg, 360 / 2 ** (level + 1));
  const fix = (value) => Math.round(value * 100000) / 100000;
  const down = (value) => fix(Math.floor(value / step) * step);
  const up = (value) => fix(Math.ceil(value / step) * step);
  const snapped = { west: down(area.west), south: down(area.south), east: up(area.east), north: up(area.north) };
  return {
    west: Math.max(-180, snapped.west), south: Math.max(-85, snapped.south),
    east: Math.min(180, snapped.east === snapped.west ? fix(snapped.west + step) : snapped.east),
    north: Math.min(85, snapped.north === snapped.south ? fix(snapped.south + step) : snapped.north),
  };
}

// The street-level zoom for following a moving visitor: closer on foot, wider on a train or in a car,
// so the next activities ahead are on screen before they are reached. Unknown speed keeps the zoom.
export function speedZoom(speedMs, current) {
  if (!Number.isFinite(speedMs)) return current;
  // Hysteresis: while the zoom is one of the bands, the speed must leave that band by a margin before
  // the zoom changes, so stop-and-go traffic near an edge does not flip the camera (and its cache).
  const index = MAP.speedZoom.findIndex(([, zoom]) => zoom === current);
  if (index >= 0) {
    const lower = index === 0 ? 0 : MAP.speedZoom[index - 1][0];
    const upper = MAP.speedZoom[index][0];
    if (speedMs >= lower * (1 - MAP.speedMargin) && speedMs < upper * (1 + MAP.speedMargin)) return current;
  }
  const band = MAP.speedZoom.find(([below]) => speedMs < below);
  return band ? band[1] : MAP.speedZoom.at(-1)[1];
}

// Ground speed in metres per second between two timed readings, or NaN when it cannot be trusted.
export function speedBetween(previous, next) {
  if (!previous || !next) return NaN;
  const seconds = (next.at - previous.at) / 1000;
  if (!(seconds >= MAP.speedMinSeconds)) return NaN;
  const metres = distanceM(previous, next);
  if (metres < Math.max(previous.accuracy || 0, next.accuracy || 0)) return 0;
  return metres / seconds;
}

// The camera rectangle the visitor can see, or null while the canvas has no measurable area. When a
// sheet covers the whole canvas the full canvas is used, so a query is never a single point.
export function viewportBounds(map, width, height, covered = 0) {
  if (!(width >= MAP.minViewportPx && height >= MAP.minViewportPx)) return null;
  const visible = height - covered >= MAP.minViewportPx ? height - covered : height;
  const topLeft = map.unproject([0, 0]);
  const bottomRight = map.unproject([width, visible]);
  const round = (value) => Math.round(value * 100000) / 100000;
  const area = { west: round(Math.max(-180, topLeft.lng)), north: round(Math.min(85, topLeft.lat)), east: round(Math.min(180, bottomRight.lng)), south: round(Math.max(-85, bottomRight.lat)) };
  return area.west < area.east && area.south < area.north ? area : null;
}
