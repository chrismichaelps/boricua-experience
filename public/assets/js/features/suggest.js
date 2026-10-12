import { ENDPOINTS, SUGGEST } from '../constants/config.js?v=55';
import { getJson } from '../net/http.js?v=55';
import { create, debounce } from '../utils/dom.js?v=55';

export function suggest(input) {
  const list = document.getElementById(input.getAttribute('aria-controls'));
  if (!list) return;
  let active = -1;
  const close = () => { list.hidden = true; list.replaceChildren(); active = -1; };
  const render = (items) => {
    list.replaceChildren(...items.map((item, index) => {
      const link = create('a', { href: item.href });
      link.append(create('strong', {}, item.title), create('span', {}, item.place));
      const row = create('li', { role: 'option', id: `suggestion-${index}` });
      row.append(link);
      return row;
    }));
    list.hidden = items.length === 0;
  };
  const ask = debounce(async () => {
    const query = input.value.trim();
    if (query.length < SUGGEST.minLength) return close();
    try { render(await getJson(`${ENDPOINTS.suggest}?q=${encodeURIComponent(query)}`)); } catch { close(); }
  }, SUGGEST.delayMs);
  input.addEventListener('input', ask);
  input.addEventListener('blur', () => setTimeout(close, 150));
  input.addEventListener('keydown', (event) => {
    const rows = Array.from(list.children);
    if (!rows.length) return;
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      active = (active + (event.key === 'ArrowDown' ? 1 : rows.length - 1)) % rows.length;
      rows.forEach((row, index) => row.setAttribute('aria-selected', String(index === active)));
      input.setAttribute('aria-activedescendant', rows[active].id);
    } else if (event.key === 'Enter' && active >= 0) {
      event.preventDefault();
      location.href = rows[active].querySelector('a').href;
    } else if (event.key === 'Escape') {
      close();
    }
  });
}
