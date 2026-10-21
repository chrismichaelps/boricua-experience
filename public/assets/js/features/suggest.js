import { ENDPOINTS, SUGGEST } from '../constants/config.js?v=80';
import { getJson } from '../net/http.js?v=80';
import { create, debounce } from '../utils/dom.js?v=80';
import { requestLocation } from '../utils/locate.js?v=80';

const RECENT_KEY = 'bx-recent-towns';
const RECENT_MAX = 4;

function readRecent() {
  try { return JSON.parse(localStorage.getItem(RECENT_KEY) || '[]').filter((town) => town?.slug && town?.name); } catch { return []; }
}

// A town guide just opened is remembered in this browser, newest first, for the empty search box.
// Its name comes from the search's own town picker, so the page title never leaks in.
export function rememberTown(prefix, path = location.pathname, nameOf = (slug) => document.querySelector(`#pill-town option[value="${CSS.escape(slug)}"]`)?.textContent?.trim()) {
  if (!prefix || !path.startsWith(prefix)) return;
  const slug = decodeURIComponent(path.slice(prefix.length).split('/')[0]);
  const name = slug && nameOf(slug);
  if (!name) return;
  const towns = [{ slug, name }, ...readRecent().filter((town) => town.slug !== slug)].slice(0, RECENT_MAX);
  try { localStorage.setItem(RECENT_KEY, JSON.stringify(towns)); } catch { /* suggestions still work */ }
}

// A position rounded to about a kilometre: enough to find the town, not the house.
export function rounded(position) {
  const round = (value) => Math.round(value * 100) / 100;
  return { lat: round(position.coords.latitude), lng: round(position.coords.longitude) };
}

export function suggest(input) {
  const list = document.getElementById(input.getAttribute('aria-controls'));
  if (!list) return;
  const data = input.dataset;
  let active = -1;
  rememberTown(data.townPrefix);
  const close = () => { list.hidden = true; list.replaceChildren(); active = -1; input.removeAttribute('aria-activedescendant'); };
  const row = (index, link) => {
    const item = create('li', { role: 'option', id: `suggestion-${index}` });
    item.append(link);
    return item;
  };
  const render = (items) => {
    list.replaceChildren(...items.map((item, index) => {
      const link = create('a', { href: item.href });
      link.append(create('strong', {}, item.title), create('span', {}, item.place));
      return row(index, link);
    }));
    list.hidden = items.length === 0;
  };

  // Before anything is typed: the town around the visitor, then towns seen here or worth a visit.
  const nearby = async (link) => {
    const hint = link.querySelector('span');
    link.setAttribute('aria-busy', 'true');
    hint.textContent = data.nearBusy;
    try {
      const { lat, lng } = rounded(await requestLocation());
      location.href = `${data.nearHref}?lat=${lat}&lng=${lng}`;
    } catch {
      link.removeAttribute('aria-busy');
      hint.textContent = data.nearFailed;
    }
  };
  const starters = () => {
    if (!data.nearHref) return close();
    const near = create('a', { href: data.nearHref, class: 'suggestion-near' });
    near.append(create('strong', {}, data.nearLabel), create('span', {}, data.nearHint));
    near.addEventListener('click', (event) => { event.preventDefault(); nearby(near); });
    const recent = readRecent();
    let popular = [];
    try { popular = JSON.parse(data.popular || '[]'); } catch { popular = []; }
    const towns = recent.length ? recent : popular.filter((town) => town?.slug && town?.name);
    const rows = [row(0, near)];
    if (towns.length) {
      rows.push(create('li', { role: 'presentation', class: 'suggestion-heading' }, recent.length ? data.recentLabel : data.popularLabel));
      towns.forEach((town, index) => {
        const link = create('a', { href: `${data.townPrefix}${encodeURIComponent(town.slug)}`, class: 'suggestion-town' });
        link.append(create('strong', {}, town.name), create('span', {}, town.region || ''));
        rows.push(row(index + 1, link));
      });
    }
    list.replaceChildren(...rows);
    list.hidden = false;
  };

  const ask = debounce(async () => {
    const query = input.value.trim();
    if (query.length < SUGGEST.minLength) return starters();
    try { render(await getJson(`${ENDPOINTS.suggest}?q=${encodeURIComponent(query)}`)); } catch { close(); }
  }, SUGGEST.delayMs);
  input.addEventListener('input', ask);
  input.addEventListener('focus', () => { if (input.value.trim().length < SUGGEST.minLength) starters(); });
  // A tap inside the list keeps it open long enough for the choice to land.
  list.addEventListener('pointerdown', (event) => event.preventDefault());
  input.addEventListener('blur', () => setTimeout(() => { if (!list.querySelector('[aria-busy="true"]')) close(); }, 150));
  input.addEventListener('keydown', (event) => {
    const rows = Array.from(list.querySelectorAll('[role="option"]'));
    if (!rows.length) return;
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      active = (active + (event.key === 'ArrowDown' ? 1 : rows.length - 1)) % rows.length;
      rows.forEach((option, index) => option.setAttribute('aria-selected', String(index === active)));
      input.setAttribute('aria-activedescendant', rows[active].id);
    } else if (event.key === 'Enter' && active >= 0) {
      event.preventDefault();
      rows[active].querySelector('a').click();
    } else if (event.key === 'Escape') {
      close();
    }
  });
}
