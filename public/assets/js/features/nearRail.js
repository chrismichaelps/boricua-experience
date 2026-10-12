import { getJson } from '../net/http.js?v=53';

const hrefOf = (item) => item.querySelector('.card-link')?.getAttribute('href');

// Inserts the rail around the visitor's remembered town. The home page itself is the same for every
// guest so the edge can keep it; this private read depends on the visitor's cookie. Each event stays
// in one rail: the near rail drops cards already shown above it, and the rails below it give up the
// cards it now shows, disappearing when nothing is left in them.
export async function nearRail(slot, fetchJson = getJson) {
  const src = slot.dataset.src;
  if (!src) return;
  let answer;
  try { answer = await fetchJson(src); } catch { return; }
  if (!answer?.html) return;
  const template = document.createElement('template');
  template.innerHTML = answer.html;
  const rail = template.content.querySelector('.rail');
  if (!rail) return;
  const rails = Array.from(document.querySelectorAll('.rail'));
  const above = rails.filter((other) => slot.compareDocumentPosition(other) & Node.DOCUMENT_POSITION_PRECEDING);
  const below = rails.filter((other) => !above.includes(other));
  const shown = new Set(above.flatMap((other) => Array.from(other.querySelectorAll('.rail-item'), hrefOf)));
  for (const item of rail.querySelectorAll('.rail-item')) if (shown.has(hrefOf(item))) item.remove();
  const mine = new Set(Array.from(rail.querySelectorAll('.rail-item'), hrefOf));
  if (!mine.size) return;
  slot.replaceChildren(rail);
  for (const other of below) {
    for (const item of other.querySelectorAll('.rail-item')) if (mine.has(hrefOf(item))) item.remove();
    if (!other.querySelector('.rail-item')) other.remove();
  }
}
