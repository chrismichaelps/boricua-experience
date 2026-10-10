export function clusterPins(pins, project, radius) {
  const groups = [];
  for (const pin of pins) {
    const point = project([pin.lng, pin.lat]);
    const group = groups.find((candidate) => Math.hypot(candidate.point.x - point.x, candidate.point.y - point.y) <= radius);
    if (group) group.pins.push(pin);
    else groups.push({ point, pins: [pin] });
  }
  return groups.map((group) => group.pins);
}
