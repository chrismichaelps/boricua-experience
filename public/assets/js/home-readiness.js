(() => {
  if (location.pathname !== '/') return;
  const root = document.documentElement;
  root.classList.add('home-pending');
  // The placeholder only appears when the page is genuinely slow: on a fast connection the hero is
  // ready before this delay and the visitor never sees a flash of grey shapes.
  const reveal = setTimeout(() => root.classList.add('home-waiting'), 450);
  const clear = () => { clearTimeout(reveal); root.classList.remove('home-pending', 'home-waiting'); };
  const deadline = setTimeout(clear, 4000);
  const ready = () => {
    if (!document.querySelector('.home')) { clear(); return; }
    const hero = document.querySelector('.hero-slide.is-current');
    // A photograph already in the cache needs no wait at all.
    if (!hero || (hero.complete && hero.naturalWidth > 0)) { clearTimeout(deadline); clear(); return; }
    const photo = hero.decode ? hero.decode().catch(() => {}) : Promise.resolve();
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
