import { getJson } from '../net/http.js?v=75';

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

export function searchArrival(root = document, lifecycle = window) {
  const key = 'bx_search_arrival';
  const isListing = path => path === '/search' || path.startsWith('/c/') || path.startsWith('/pueblo/');
  const remember = path => {
    try { lifecycle.sessionStorage.setItem(key, JSON.stringify({ path, at: Date.now() })); } catch {}
  };
  root.addEventListener('submit', event => {
    const form = event.target;
    if (event.defaultPrevented || !form.matches('.search-pill, .filter-bar, .near-form') || form.method.toLowerCase() !== 'get') return;
    const target = new URL(form.action, lifecycle.location.href);
    if (target.origin === lifecycle.location.origin && isListing(target.pathname)) queueMicrotask(() => { if (!event.defaultPrevented) remember(target.pathname); });
  });
  root.addEventListener('click', event => {
    const link = event.target.closest('.quick-filters a, .chips a');
    if (!link || link.target || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const target = new URL(link.href, lifecycle.location.href);
    if (target.origin === lifecycle.location.origin && isListing(target.pathname)) queueMicrotask(() => { if (!event.defaultPrevented) remember(target.pathname); });
  });
  let intent;
  try {
    intent = JSON.parse(lifecycle.sessionStorage.getItem(key));
    lifecycle.sessionStorage.removeItem(key);
  } catch { return; }
  const heading = root.getElementById('search-results');
  const restored = lifecycle.performance?.getEntriesByType('navigation')[0]?.type === 'back_forward';
  const age = Date.now() - intent?.at;
  if (!heading || restored || intent?.path !== lifecycle.location.pathname || !Number.isFinite(age) || age < 0 || age > 15000) return;
  lifecycle.requestAnimationFrame(() => heading.scrollIntoView({
    behavior: lifecycle.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
    block: 'start'
  }));
}
