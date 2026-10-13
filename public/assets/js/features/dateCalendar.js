const DAY = 86400000;
const MAX_DAYS = 366;
const iso = date => date.toISOString().slice(0, 10);
const at = value => new Date(`${value}T00:00:00Z`);
const monthOf = date => new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), 1));
const addDays = (date, count) => new Date(date.getTime() + count * DAY);
const addMonths = (date, count) => new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + count, 1));
const valid = value => /^\d{4}-\d{2}-\d{2}$/.test(value) && Number.isFinite(at(value).getTime()) && iso(at(value)) === value;

export function rangeOf(value) {
  const parts = value.split('..');
  const [first, last] = parts;
  return parts.length === 2 && valid(first || '') && valid(last || '') && last >= first && (at(last) - at(first)) / DAY < MAX_DAYS ? [first, last] : null;
}

export function dateCalendar(dialog, select, choices, labels, commit) {
  const locale = document.documentElement.lang || 'es';
  const todayParts = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Puerto_Rico', year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(new Date());
  const part = type => todayParts.find(p => p.type === type).value;
  const today = `${part('year')}-${part('month')}-${part('day')}`;
  const full = new Intl.DateTimeFormat(locale, { timeZone: 'UTC', dateStyle: 'full' });
  const short = new Intl.DateTimeFormat(locale, { timeZone: 'UTC', day: 'numeric', month: 'short', year: 'numeric' });
  const monthName = new Intl.DateTimeFormat(locale, { timeZone: 'UTC', month: 'long', year: 'numeric' });
  const weekdayName = new Intl.DateTimeFormat(locale, { timeZone: 'UTC', weekday: 'short' });
  const make = (tag, cls, text) => {
    const element = document.createElement(tag);
    element.className = cls;
    if (text) element.textContent = text;
    return element;
  };
  const button = (cls, text) => {
    const element = make('button', cls, text);
    element.type = 'button';
    return element;
  };
  dialog.classList.add('calendar-picker');
  const tabs = make('div', 'calendar-modes');
  const dates = button('calendar-mode', labels.dates);
  const flexible = button('calendar-mode', labels.flexible);
  tabs.append(dates, flexible);
  const panel = make('div', 'calendar-panel');
  const navigation = make('div', 'calendar-nav');
  const prev = button('calendar-arrow', '‹');
  const next = button('calendar-arrow', '›');
  prev.setAttribute('aria-label', labels.prev);
  next.setAttribute('aria-label', labels.next);
  const summary = make('p', 'calendar-summary');
  summary.setAttribute('role', 'status');
  navigation.append(prev, summary, next);
  const months = make('div', 'calendar-months');
  const hint = make('p', 'calendar-hint', labels.hint);
  const actions = make('div', 'calendar-actions');
  const clear = button('calendar-clear', labels.clear);
  const apply = button('button calendar-apply', labels.apply);
  actions.append(clear, apply);
  panel.append(navigation, months, hint, actions);
  dialog.insertBefore(tabs, choices);
  dialog.insertBefore(panel, choices);
  let first = '', last = '', focusDay = today, month = monthOf(at(today));
  let cells = [];
  let exact = true;
  const mode = value => {
    exact = value;
    panel.hidden = !exact;
    choices.hidden = exact;
    dates.setAttribute('aria-pressed', String(exact));
    flexible.setAttribute('aria-pressed', String(!exact));
  };
  const choose = value => {
    if (!first || last || value < first) { first = value; last = ''; }
    else last = value;
    focusDay = value;
    render();
    cells.find(cell => cell.dataset.date === value)?.focus();
  };
  const render = () => {
    cells = [];
    months.replaceChildren();
    const number = matchMedia('(min-width: 700px)').matches ? 2 : 1;
    for (let offset = 0; offset < number; offset++) {
      const current = addMonths(month, offset);
      const section = make('section', 'calendar-month');
      const heading = make('h3', 'calendar-month-title', monthName.format(current));
      heading.setAttribute('aria-live', 'polite');
      const grid = make('div', 'calendar-grid');
      grid.setAttribute('role', 'group');
      grid.setAttribute('aria-label', heading.textContent);
      for (let weekday = 0; weekday < 7; weekday++) {
        const day = make('span', 'calendar-weekday', weekdayName.format(addDays(at('2026-01-04'), weekday)));
        day.setAttribute('aria-hidden', 'true');
        grid.append(day);
      }
      for (let empty = 0; empty < current.getUTCDay(); empty++) grid.append(make('span', 'calendar-blank'));
      const length = new Date(Date.UTC(current.getUTCFullYear(), current.getUTCMonth() + 1, 0)).getUTCDate();
      for (let day = 1; day <= length; day++) {
        const instant = addDays(current, day - 1), value = iso(instant);
        const cell = button('calendar-day', String(day));
        cell.dataset.date = value;
        cell.setAttribute('aria-label', full.format(instant));
        cell.setAttribute('aria-pressed', String(value === first || value === last));
        if (value === today) cell.setAttribute('aria-current', 'date');
        cell.disabled = value < today || (!!first && !last && value >= first && (instant - at(first)) / DAY >= MAX_DAYS);
        cell.tabIndex = value === focusDay && !cell.disabled ? 0 : -1;
        cell.classList.toggle('is-range', !!first && !!last && value > first && value < last);
        cell.classList.toggle('is-endpoint', value === first || value === last);
        cell.addEventListener('click', () => choose(value));
        cell.addEventListener('focus', () => {
          focusDay = value;
          cells.forEach(item => { item.tabIndex = item === cell ? 0 : -1; });
        });
        grid.append(cell); cells.push(cell);
      }
      section.append(heading, grid); months.append(section);
    }
    if (!cells.some(cell => cell.tabIndex === 0)) {
      const available = cells.find(cell => !cell.disabled);
      if (available) { available.tabIndex = 0; focusDay = available.dataset.date; }
    }
    prev.disabled = month <= monthOf(at(today));
    summary.textContent = first ? `${labels.start}: ${short.format(at(first))}${last ? ` · ${labels.end}: ${short.format(at(last))}` : ''}` : labels.dates;
    apply.disabled = !first;
  };
  const moveFocus = date => {
    const value = iso(date);
    if (value < today || (first && !last && value >= first && (date - at(first)) / DAY >= MAX_DAYS)) return;
    focusDay = value;
    if (!cells.some(cell => cell.dataset.date === value)) month = monthOf(date);
    render();
    cells.find(cell => cell.dataset.date === value)?.focus();
  };
  months.addEventListener('keydown', event => {
    const value = event.target.dataset.date;
    if (!value) return;
    const date = at(value);
    const steps = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7, Home: -date.getUTCDay(), End: 6 - date.getUTCDay() };
    let target;
    if (event.key in steps) target = addDays(date, steps[event.key]);
    else if (event.key === 'PageUp' || event.key === 'PageDown') {
      const shifted = addMonths(date, (event.key === 'PageUp' ? -1 : 1) * (event.shiftKey ? 12 : 1));
      const length = new Date(Date.UTC(shifted.getUTCFullYear(), shifted.getUTCMonth() + 1, 0)).getUTCDate();
      target = addDays(shifted, Math.min(date.getUTCDate(), length) - 1);
    }
    if (target) { event.preventDefault(); event.stopPropagation(); moveFocus(target); }
  });
  prev.addEventListener('click', () => { month = addMonths(month, -1); render(); });
  next.addEventListener('click', () => { month = addMonths(month, 1); render(); });
  dates.addEventListener('click', () => mode(true));
  flexible.addEventListener('click', () => mode(false));
  clear.addEventListener('click', () => commit(''));
  apply.addEventListener('click', () => {
    if (!first) return;
    const end = last || first;
    const value = `${first}..${end}`;
    if (!rangeOf(value)) return;
    let option = Array.from(select.options).find(item => item.value === value);
    if (!option) { option = document.createElement('option'); option.value = value; select.append(option); }
    option.textContent = short.format(at(first)) + (end === first ? '' : ` – ${short.format(at(end))}`);
    commit(value);
  });
  const open = () => {
    const range = rangeOf(select.value);
    [first, last] = range || ['', ''];
    focusDay = first && first >= today ? first : today;
    month = monthOf(at(focusDay));
    mode(!!range || !select.value);
    render();
  };
  window.addEventListener('resize', () => {
    if (!dialog.open) return;
    const focused = document.activeElement?.dataset.date;
    if (focused) { focusDay = focused; month = monthOf(at(focused)); }
    render();
    if (focused) cells.find(cell => cell.dataset.date === focused)?.focus();
  });
  return { open, focus: () => exact ? cells.find(cell => cell.tabIndex === 0)?.focus() : null };
}
