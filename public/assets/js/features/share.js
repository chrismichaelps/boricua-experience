import { message } from '../constants/messages.js?v=59';
import { toast } from './toast.js?v=59';

export function share(button) {
  button.addEventListener('click', async () => {
    const data = { title: button.dataset.title || document.title, url: location.href };
    if (navigator.share && button.dataset.mode !== 'copy') {
      try { await navigator.share(data); } catch { /* the visitor closed the sheet */ }
      return;
    }
    await navigator.clipboard?.writeText(data.url);
    toast(message('copied'));
    button.closest('details')?.removeAttribute('open');
  });
}

// Menus built on <details>: one open at a time, closed by Escape or a click outside.
export function disclosures() {
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
