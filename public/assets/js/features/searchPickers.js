import { dateCalendar } from './dateCalendar.js?v=73';

const fold = (value) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase();

function node(tag, className, text) {
  const element = document.createElement(tag);
  element.className = className;
  if (text) element.textContent = text;
  return element;
}

export function searchPickers(form) {
  if (typeof HTMLDialogElement === 'undefined' || !HTMLDialogElement.prototype.showModal) return;
  for (const select of form.querySelectorAll('select')) {
    if (select.disabled || select.classList.contains('picker-native')) continue;
    const label = form.querySelector(`label[for="${select.id}"]`);
    if (!label) continue;
    const trigger = node('button', 'picker-trigger');
    trigger.type = 'button';
    trigger.id = `${select.id}-trigger`;
    trigger.setAttribute('aria-haspopup', 'dialog');
    trigger.setAttribute('aria-expanded', 'false');
    const value = node('span', 'picker-value');
    const arrow = node('span', 'picker-arrow', '⌄');
    arrow.setAttribute('aria-hidden', 'true');
    trigger.append(value, arrow);
    const dialog = node('dialog', 'search-picker');
    dialog.id = `${select.id}-panel`;
    dialog.setAttribute('aria-labelledby', `${select.id}-title`);
    trigger.setAttribute('aria-controls', dialog.id);
    const closePicker = () => {
      if (!dialog.open || dialog.dataset.closing) return;
      dialog.dataset.closing = 'true';
      let completed = false;
      let fallback;
      const complete = () => {
        if (completed) return;
        completed = true;
        clearTimeout(fallback);
        delete dialog.dataset.closing;
        dialog.close();
      };
      const event = new CustomEvent('bx:picker-close', { bubbles: true, cancelable: true, detail: { dialog, complete } });
      if (dialog.dispatchEvent(event)) complete();
      else fallback = setTimeout(complete, 300);
    };
    const header = node('div', 'picker-header');
    const title = node('h2', 'picker-title', label.textContent.trim());
    title.id = `${select.id}-title`;
    const close = node('button', 'picker-close', '×');
    close.type = 'button';
    close.setAttribute('aria-label', form.dataset.pickerClose);
    header.append(title, close);
    dialog.append(header);
    let search;
    if (['pueblo', 'cerca', 'municipality', 'town'].includes(select.name)) {
      search = node('input', 'picker-search');
      search.type = 'search';
      search.placeholder = form.dataset.pickerSearch;
      search.setAttribute('aria-label', form.dataset.pickerSearch);
      search.autocomplete = 'off';
      dialog.append(search);
    }
    const choices = node('div', 'picker-options');
    const empty = node('p', 'picker-empty', form.dataset.pickerEmpty);
    empty.setAttribute('role', 'status');
    empty.hidden = true;
    const rows = Array.from(select.options).filter(option => select.name !== 'when' || !option.value.includes('..')).map((option) => {
      const button = node('button', 'picker-option');
      button.type = 'button';
      button.disabled = option.disabled;
      const name = node('span', 'picker-option-name', option.textContent);
      const mark = node('span', 'picker-check', '✓');
      mark.setAttribute('aria-hidden', 'true');
      button.append(name, mark);
      button.dataset.value = option.value;
      button.addEventListener('click', () => {
        select.value = option.value;
        sync();
        closePicker();
        trigger.focus();
        select.dispatchEvent(new Event('change', { bubbles: true }));
      });
      choices.append(button);
      return button;
    });
    dialog.append(choices, empty);
    const sync = () => {
      value.textContent = select.selectedOptions[0]?.textContent || '';
      trigger.setAttribute('aria-label', `${title.textContent}: ${value.textContent}`);
      rows.forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.value === select.value)));
    };
    const commit = chosen => {
      select.value = chosen;
      sync();
      closePicker();
      trigger.focus();
      select.dispatchEvent(new Event('change', { bubbles: true }));
    };
    const calendar = select.name === 'when' && form.dataset.calendar
      ? dateCalendar(dialog, select, choices, JSON.parse(form.dataset.calendar), commit) : null;
    const filter = () => {
      const query = fold(search?.value.trim() || '');
      rows.forEach((button) => { button.hidden = !fold(button.textContent).includes(query); });
      empty.hidden = rows.some((button) => !button.hidden && !button.disabled);
    };
    const position = () => {
      for (const property of ['width', 'top', 'bottom', 'left', 'max-height']) dialog.style.removeProperty(property);
      if (innerWidth < 700) return;
      const rect = trigger.getBoundingClientRect();
      const width = Math.min(calendar ? 720 : 400, innerWidth - 32);
      const cap = calendar ? 720 : 560;
      const below = innerHeight - rect.bottom - 32;
      const above = rect.top - 32;
      dialog.style.width = `${width}px`;
      dialog.style.left = `${Math.max(16, Math.min(rect.left - 20, innerWidth - width - 16))}px`;
      if (calendar || below >= Math.min(cap, 360) || below >= above) {
        const top = calendar ? Math.min(rect.bottom + 16, Math.max(16, innerHeight - 720)) : Math.max(16, Math.min(rect.bottom + 12, innerHeight - 240));
        dialog.style.top = `${top}px`;
        dialog.style.maxHeight = `${Math.min(cap, innerHeight - top - 16)}px`;
      } else {
        dialog.style.top = 'auto';
        dialog.style.bottom = `${innerHeight - rect.top + 12}px`;
        dialog.style.maxHeight = `${Math.min(cap, above)}px`;
      }
    };
    trigger.addEventListener('click', () => {
      if (search) search.value = '';
      filter();
      sync();
      calendar?.open();
      position();
      dialog.showModal();
      dialog.dispatchEvent(new CustomEvent('bx:picker-open', { bubbles: true, detail: { dialog } }));
      document.documentElement.classList.add('picker-open');
      trigger.setAttribute('aria-expanded', 'true');
      if (calendar && !choices.hidden) (rows.find(button => button.dataset.value === select.value && !button.disabled) || close).focus();
      else if (calendar) calendar.focus();
      else if (search) search.focus();
      else (rows.find((button) => button.dataset.value === select.value && !button.disabled) || close).focus();
    });
    close.addEventListener('click', closePicker);
    dialog.addEventListener('close', () => {
      trigger.setAttribute('aria-expanded', 'false');
      document.documentElement.classList.remove('picker-open');
      trigger.focus();
    });
    dialog.addEventListener('click', (event) => {
      if (event.target !== dialog) return;
      const rect = dialog.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) closePicker();
    });
    dialog.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closePicker();
        return;
      }
      if (event.target.dataset.date || choices.hidden) return;
      if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key) || event.target === search) return;
      const visible = rows.filter((button) => !button.hidden && !button.disabled);
      if (!visible.length) return;
      event.preventDefault();
      const index = visible.indexOf(document.activeElement);
      const next = event.key === 'Home' ? 0 : event.key === 'End' ? visible.length - 1 : (index + (event.key === 'ArrowDown' ? 1 : visible.length - 1) + visible.length) % visible.length;
      visible[next].focus();
    });
    search?.addEventListener('input', filter);
    search?.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        rows.find((button) => !button.hidden && !button.disabled)?.click();
      } else if (event.key === 'ArrowDown') {
        event.preventDefault();
        rows.find((button) => !button.hidden && !button.disabled)?.focus();
      }
    });
    select.addEventListener('change', () => { trigger.removeAttribute('aria-invalid'); sync(); });
    select.addEventListener('invalid', event => { event.preventDefault(); trigger.setAttribute('aria-invalid', 'true'); const first = select.form?.querySelector?.(':invalid'); if (!first || first === select) trigger.focus(); });
    if (select.required) trigger.setAttribute('aria-required', 'true');
    if (select.getAttribute('aria-invalid')) trigger.setAttribute('aria-invalid', select.getAttribute('aria-invalid'));
    if (select.getAttribute('aria-describedby')) trigger.setAttribute('aria-describedby', select.getAttribute('aria-describedby'));
    (select.form || form).addEventListener('reset', () => setTimeout(sync, 0));
    window.addEventListener('resize', () => { if (dialog.open) position(); });
    select.after(trigger);
    form.append(dialog);
    select.classList.add('picker-native');
    select.setAttribute('aria-hidden', 'true');
    select.tabIndex = -1;
    label.htmlFor = trigger.id;
    sync();
  }
}
