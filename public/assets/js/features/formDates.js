import { dateCalendar } from './dateCalendar.js?v=80';
import { searchPickers } from './searchPickers.js?v=80';

const DAY_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const pad = number => String(number).padStart(2, '0');

export function applyDate(input, date, fallback = '') {
  if (date && !DAY_PATTERN.test(date)) return;
  const clock = input.value.split('T')[1] || fallback || '12:00';
  input.value = date ? date + (input.type === 'datetime-local' ? `T${clock}` : '') : '';
  input.dispatchEvent(new Event('input', { bubbles: true }));
  input.dispatchEvent(new Event('change', { bubbles: true }));
}

export function applyTime(input, time) {
  if (!/^\d{2}:\d{2}$/.test(time)) return;
  const day = input.value.slice(0, 10);
  if (!DAY_PATTERN.test(day)) return;
  input.value = `${day}T${time}`;
  input.dispatchEvent(new Event('input', { bubbles: true }));
  input.dispatchEvent(new Event('change', { bubbles: true }));
}

export function puertoRicoToday(now = new Date()) {
  const parts = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Puerto_Rico', year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(now);
  const part = type => parts.find(item => item.type === type).value;
  return `${part('year')}-${part('month')}-${part('day')}`;
}

export function dateBounds(input, today) {
  let min = (input.min || '').slice(0, 10);
  let max = (input.max || '').slice(0, 10);
  const current = input.value.slice(0, 10);
  if (input.dataset.dateMin === 'today') min = DAY_PATTERN.test(current) && current < today ? current : today;
  const age = Number(input.dataset.dateAge);
  if (Number.isInteger(age) && age > 0) {
    const [year, month, day] = today.split('-').map(Number);
    const last = new Date(Date.UTC(year - age, month - 1, day));
    if (last.getUTCMonth() !== month - 1) last.setUTCDate(0);
    max = last.toISOString().slice(0, 10);
  }
  return { min, max };
}

function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  return node;
}

function hiddenLabel(id, text) {
  const label = element('label', 'sr-only', text);
  label.htmlFor = id;
  return label;
}

function pickerField(input, extra) {
  const wrapper = element('div', 'temporal-part');
  wrapper.dataset.pickerClose = input.dataset.pickerClose;
  wrapper.append(...extra);
  return wrapper;
}

function timeSelect(input, placeholderText, locale, step = 30) {
  const select = element('select', 'temporal-time');
  select.id = `${input.id}-time`;
  const clock = new Intl.DateTimeFormat(locale, { hour: 'numeric', minute: '2-digit', timeZone: 'UTC' });
  const placeholder = element('option', '', placeholderText);
  placeholder.value = '';
  select.append(placeholder);
  const slots = [];
  for (let minutes = 0; minutes < 1440; minutes += step) slots.push(`${pad(Math.floor(minutes / 60))}:${pad(minutes % 60)}`);
  const current = (input.type === 'time' ? input.value : input.value.split('T')[1] || '').slice(0, 5);
  if (/^\d{2}:\d{2}$/.test(current) && !slots.includes(current)) slots.push(current);
  slots.sort();
  for (const slot of slots) {
    const [hour, minute] = slot.split(':').map(Number);
    const option = element('option', '', clock.format(new Date(Date.UTC(2026, 0, 1, hour, minute))));
    option.value = slot;
    select.append(option);
  }
  select.value = current;
  return select;
}

function monthControls(input, labels, locale, today) {
  const month = element('select', 'temporal-month');
  const year = element('select', 'temporal-year');
  month.id = `${input.id}-month`; year.id = `${input.id}-year`;
  const name = new Intl.DateTimeFormat(locale, { month: 'long', timeZone: 'UTC' });
  const blankMonth = element('option', '', labels.month); blankMonth.value = '';
  const blankYear = element('option', '', labels.year); blankYear.value = '';
  month.append(blankMonth); year.append(blankYear);
  for (let index = 0; index < 12; index++) {
    const option = element('option', '', name.format(new Date(Date.UTC(2026, index, 1))));
    option.value = pad(index + 1);
    month.append(option);
  }
  const first = Number((input.min || '2000').slice(0, 4));
  const last = Number((input.max || today).slice(0, 4));
  for (let value = last; value >= first; value--) {
    const option = element('option', '', String(value));
    option.value = String(value);
    year.append(option);
  }
  const [chosenYear, chosenMonth] = input.value.split('-');
  if (/^\d{4}$/.test(chosenYear || '') && ![...year.options].some(option => option.value === chosenYear)) {
    const option = element('option', '', chosenYear);
    option.value = chosenYear;
    year.append(option);
  }
  year.value = chosenYear || ''; month.value = chosenMonth || '';
  const write = () => {
    input.value = month.value && year.value ? `${year.value}-${month.value}` : '';
    input.dispatchEvent(new Event('input', { bubbles: true }));
    input.dispatchEvent(new Event('change', { bubbles: true }));
  };
  month.addEventListener('change', write);
  year.addEventListener('change', write);
  return { month, year };
}

function hideNative(input, trigger) {
  input.classList.add('picker-native');
  input.tabIndex = -1;
  input.setAttribute('aria-hidden', 'true');
  input.addEventListener('invalid', event => {
    event.preventDefault();
    trigger.setAttribute('aria-invalid', 'true');
    const first = input.form?.querySelector?.(':invalid');
    if (!first || first === input) trigger.focus();
  });
  if (input.required) trigger.setAttribute('aria-required', 'true');
  for (const name of ['aria-invalid', 'aria-describedby']) if (input.getAttribute(name)) trigger.setAttribute(name, input.getAttribute(name));
}

function enhanceMonth(input, label, labels, locale, today) {
  const { month, year } = monthControls(input, labels, locale, today);
  const control = element('div', 'temporal-control temporal-split');
  const monthPart = pickerField(input, [hiddenLabel(month.id, `${label.textContent}: ${labels.month}`), month]);
  const yearPart = pickerField(input, [hiddenLabel(year.id, `${label.textContent}: ${labels.year}`), year]);
  input.before(control);
  control.append(input, monthPart, yearPart);
  searchPickers(monthPart); searchPickers(yearPart);
  const trigger = monthPart.querySelector('.picker-trigger');
  if (trigger) { hideNative(input, trigger); label.htmlFor = trigger.id; }
  input.form?.addEventListener('reset', () => setTimeout(() => {
    const [y, m] = input.defaultValue.split('-');
    year.value = y || ''; month.value = m || '';
    year.dispatchEvent(new Event('change')); month.dispatchEvent(new Event('change'));
  }, 0));
}

function enhanceTime(input, locale) {
  const select = timeSelect(input, input.dataset.formTime, locale, 30);
  const part = pickerField(input, [hiddenLabel(select.id, input.getAttribute('aria-label') || input.dataset.formTime), select]);
  input.before(part);
  part.prepend(input);
  select.addEventListener('change', () => {
    input.value = select.value;
    input.dispatchEvent(new Event('input', { bubbles: true }));
    input.dispatchEvent(new Event('change', { bubbles: true }));
  });
  searchPickers(part);
  const trigger = part.querySelector('.picker-trigger');
  if (trigger) hideNative(input, trigger);
  input.dataset.dateEnhanced = '1';
}

export function formDates() {
  if (typeof HTMLDialogElement === 'undefined' || !HTMLDialogElement.prototype.showModal) return;
  const locale = document.documentElement.lang || 'es';
  for (const input of document.querySelectorAll('input[type="time"][data-form-time]')) {
    if (!input.disabled && !input.readOnly && !input.dataset.dateEnhanced) enhanceTime(input, locale);
  }
  const today = puertoRicoToday();
  const dayFormat = new Intl.DateTimeFormat(locale, { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });
  for (const input of document.querySelectorAll('[data-form-date]')) {
    if (input.disabled || input.readOnly || input.dataset.dateEnhanced) continue;
    const label = document.querySelector(`label[for="${input.id}"]`);
    if (!label) continue;
    const labels = JSON.parse(input.dataset.formDate);
    input.dataset.dateEnhanced = '1';
    if (input.type === 'month') { enhanceMonth(input, label, labels, locale, today); continue; }
    const { min, max } = dateBounds(input, today);
    const dialog = element('dialog', 'search-picker calendar-picker form-calendar');
    dialog.id = `${input.id}-calendar`;
    const heading = element('h2', 'picker-title', label.textContent);
    heading.id = `${dialog.id}-title`;
    dialog.setAttribute('aria-labelledby', heading.id);
    const header = element('div', 'picker-header');
    const close = element('button', 'picker-close', '×');
    close.type = 'button';
    close.setAttribute('aria-label', input.dataset.pickerClose);
    header.append(heading, close);
    dialog.append(header);
    const choices = element('div', '');
    dialog.append(choices);
    const proxy = { value: '' };
    const trigger = element('button', 'picker-trigger date-trigger');
    trigger.type = 'button';
    trigger.id = `${input.id}-trigger`;
    trigger.setAttribute('aria-haspopup', 'dialog');
    trigger.setAttribute('aria-controls', dialog.id);
    trigger.setAttribute('aria-expanded', 'false');
    const shown = element('span', 'picker-value');
    const icon = element('span', 'date-icon');
    icon.setAttribute('aria-hidden', 'true');
    trigger.append(shown, icon);
    const time = input.type === 'datetime-local' ? timeSelect(input, labels.add_time, locale) : null;
    const sync = () => {
      const day = input.value.slice(0, 10);
      const known = DAY_PATTERN.test(day);
      shown.textContent = known ? dayFormat.format(new Date(`${day}T00:00:00Z`)) : labels.add_date;
      trigger.classList.toggle('is-empty', !known);
      trigger.setAttribute('aria-label', `${label.textContent}: ${shown.textContent}`);
      const clock = (input.value.split('T')[1] || '').slice(0, 5);
      if (time && known && time.value !== clock) {
        time.value = clock;
        time.dispatchEvent(new Event('change'));
      }
    };
    const calendar = dateCalendar(dialog, proxy, choices, { ...labels, hint: '' }, value => {
      applyDate(input, value, time?.value);
      dialog.close();
    }, { single: true, min, max });
    trigger.addEventListener('click', () => {
      proxy.value = input.value.slice(0, 10);
      calendar.open();
      dialog.showModal();
      document.documentElement.classList.add('picker-open');
      trigger.setAttribute('aria-expanded', 'true');
      dialog.dispatchEvent(new CustomEvent('bx:picker-open', { bubbles: true, detail: { dialog } }));
      calendar.focus();
    });
    close.addEventListener('click', () => dialog.close());
    dialog.addEventListener('close', () => {
      trigger.setAttribute('aria-expanded', 'false');
      document.documentElement.classList.remove('picker-open');
      trigger.focus({ preventScroll: true });
    });
    dialog.addEventListener('click', event => {
      if (event.target !== dialog) return;
      const rect = dialog.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
    });
    window.addEventListener('pagehide', () => { if (dialog.open) dialog.close(); });
    input.addEventListener('change', () => { trigger.removeAttribute('aria-invalid'); sync(); });
    input.form?.addEventListener('reset', () => setTimeout(sync, 0));
    const control = element('div', time ? 'temporal-control temporal-split' : 'temporal-control');
    input.before(control);
    control.append(input, trigger);
    if (time) {
      const part = pickerField(input, [hiddenLabel(time.id, `${label.textContent}: ${labels.time}`), time]);
      control.append(part);
      time.addEventListener('change', () => applyTime(input, time.value));
      searchPickers(part);
    }
    hideNative(input, trigger);
    label.htmlFor = trigger.id;
    document.body.append(dialog);
    sync();
  }
}
