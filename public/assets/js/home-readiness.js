(() => {
  if (location.pathname !== '/') return;
  const root = document.documentElement;
  root.classList.add('home-pending');
  const clear = () => root.classList.remove('home-pending');
  const deadline = setTimeout(clear, 4000);
  const ready = () => {
    if (!document.querySelector('.home')) { clear(); return; }
    const hero = document.querySelector('.hero-slide.is-current');
    const photo = hero?.decode ? hero.decode().catch(() => {}) : Promise.resolve();
    Promise.all([photo, document.fonts?.ready || Promise.resolve()]).finally(() => { clearTimeout(deadline); clear(); });
  };
  document.addEventListener('DOMContentLoaded', ready, { once: true });
  document.addEventListener('focusin', clear, { once: true });
  document.addEventListener('pointerdown', clear, { once: true });
  // Any intent to scroll reveals the page at once: the content is already rendered, and scrolling
  // behind a fixed placeholder would land the visitor somewhere they never saw.
  for (const type of ['wheel', 'touchmove', 'scroll', 'keydown']) window.addEventListener(type, clear, { once: true, passive: true });
  window.addEventListener('pagehide', clear);
  window.addEventListener('pageshow', event => { if (event.persisted) clear(); });
})();
