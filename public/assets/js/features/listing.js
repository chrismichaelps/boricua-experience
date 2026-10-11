import { getJson } from '../net/http.js?v=39';

export function loadMore(link) {
  link.addEventListener('click', async (event) => {
    event.preventDefault();
    link.setAttribute('aria-busy', 'true');
    try {
      const { html, next } = await getJson(link.href);
      const grid = link.closest('.results').querySelector('.card-grid');
      grid.insertAdjacentHTML('beforeend', html);
      if (next) link.href = next; else link.remove();
    } catch {
      location.href = link.href;
    } finally {
      link.removeAttribute('aria-busy');
    }
  });
}

export function filters(form) {
  for (const control of form.querySelectorAll('select, input[type="checkbox"]')) {
    control.addEventListener('change', () => form.requestSubmit());
  }
  form.querySelector('button[type="submit"]')?.setAttribute('hidden', '');
}
