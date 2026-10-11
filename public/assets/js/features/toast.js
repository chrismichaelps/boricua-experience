import { create } from '../utils/dom.js?v=38';

export function toast(text) {
  document.querySelector('.toast')?.remove();
  const node = create('div', { class: 'toast', role: 'status', 'aria-live': 'polite' }, text);
  document.body.append(node);
  setTimeout(() => node.remove(), 4200);
}
