import { message } from '../constants/messages.js?v=73';
import { toast } from './toast.js?v=73';

export function share(button) {
  button.addEventListener('click', async () => {
    const data = { title: button.dataset.title || document.title, url: button.dataset.url || location.href };
    shared('share');
    if (navigator.share && button.dataset.mode !== 'copy') {
      try { await navigator.share(data); } catch { /* the visitor closed the sheet */ }
      return;
    }
    await navigator.clipboard?.writeText(data.url);
    toast(message('copied'));
    button.closest('details')?.removeAttribute('open');
  });
}

// Sharing and adding to a calendar are achievement signals, named by the activity's address.
function shared(action) {
  const slug = location.pathname.match(/^\/e\/([a-z0-9-]+)/)?.[1];
  if (slug) document.dispatchEvent(new CustomEvent('bx:action', { detail: { action, key: slug } }));
}

// Menus built on <details>: one open at a time, closed by Escape or a click outside.
export function disclosures() {
  document.addEventListener('click', (event) => {
    const link = event.target.closest?.('.disclosure-list a');
    if (!link) return;
    shared(/calendar\.google\.com|outlook\.live\.com|\.ics$/.test(link.href) ? 'calendar_add' : 'share');
  });
  const open = () => [...document.querySelectorAll('details.menu-disclosure[open]')];
  document.addEventListener('toggle', (event) => {
    const opened = event.target;
    if (!(opened instanceof HTMLDetailsElement) || !opened.matches('.menu-disclosure') || !opened.open) return;
    for (const other of open()) if (other !== opened) other.removeAttribute('open');
  }, true);
  document.addEventListener('click', (event) => {
    for (const menu of open()) if (!menu.contains(event.target)) menu.removeAttribute('open');
  });
  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    for (const menu of open()) { menu.removeAttribute('open'); menu.querySelector('summary')?.focus(); }
  });
}
