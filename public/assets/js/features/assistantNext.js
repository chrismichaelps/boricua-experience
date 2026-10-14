// What to ask next, worked out from what the last answer found: the activities and places it showed
// and the plans or routes it drew. Nothing here calls the model; a chosen suggestion is sent as the
// member's next question, so the assistant answers it with live data like any other.

const MAX = 4;

/** A title short enough for a chip. */
export function short(title, size = 38) {
  const clean = String(title || '').replace(/\s+/g, ' ').trim();
  return clean.length > size ? clean.slice(0, size - 1).trimEnd() + '…' : clean;
}

/** Fills a message's :name placeholders. */
function fill(template, values) {
  return String(template || '').replace(/:([a-z]+)/g, (whole, name) => (name in values ? values[name] : whole));
}

/** Up to four follow-up questions, most useful first, without repeats, empty messages or the question
 * just asked. */
export function followUps(sources = [], visuals = [], labels = {}, asked = '') {
  const events = sources.filter((item) => /^\/e\/[a-z0-9-]+$/.test(item?.href || ''));
  const places = sources.filter((item) => /^\/lugar\/[a-z0-9-]+$/.test(item?.href || ''));
  const planned = visuals.some((item) => item?.kind === 'itinerary');
  const routed = visuals.some((item) => item?.kind === 'route');
  const asks = [];
  if (planned) asks.push(labels.nextAnother, labels.nextFreeplan);
  if (events.length >= 2 && !planned) {
    const [a, b] = events;
    asks.push(fill(labels.nextPlan, { a: short(a.title), b: short(b.title) }));
    if (!routed) asks.push(fill(labels.nextRoute, { a: short(a.title), b: short(b.title) }));
  }
  if (events.length) asks.push(labels.nextFree, labels.nextFamily);
  if (places.length) asks.push(fill(labels.nextPlace, { place: short(places[0].title) }));
  return [...new Set(asks.filter((ask) => typeof ask === 'string' && ask.trim() && !/:[a-z]+/.test(ask) && ask !== asked.trim()))].slice(0, MAX);
}

/** The start of a trip for a plan the assistant drew, when it names its activities. */
export function tripHref(planHref) {
  const match = /^\/plan\?e=([a-z0-9,-]{3,324})$/.exec(planHref || '');
  return match ? `/plan/viaje?e=${match[1]}` : '';
}
