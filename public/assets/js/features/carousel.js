import { CAROUSEL } from '../constants/config.js?v=55';

export function heroCarousel(hero) {
  const slides = [...hero.querySelectorAll('.hero-slide')];
  const dots = [...hero.querySelectorAll('[data-slide]')];
  const place = hero.querySelector('[data-carousel="place"]');
  const pause = hero.querySelector('[data-carousel="pause"]');
  if (slides.length < 2 || slides.length !== dots.length || !place || !pause) return;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let active = 0;
  let ticket = 0;
  let timer = null;
  let userPaused = false;
  let hovering = false;
  let focused = false;

  const canRotate = () => !userPaused && !hovering && !focused && !reduced.matches && document.visibilityState !== 'hidden';
  const schedule = () => {
    clearTimeout(timer);
    timer = null;
    if (canRotate()) timer = setTimeout(() => show((active + 1) % slides.length, true).finally(schedule), CAROUSEL.intervalMs);
  };
  const show = async (index, automatic = false) => {
    const selected = ++ticket;
    const image = slides[index];
    image.loading = 'eager';
    try { await image.decode(); } catch { return; }
    if (selected !== ticket || (automatic && !canRotate())) return;
    active = index;
    slides.forEach((slide, i) => slide.classList.toggle('is-current', i === active));
    dots.forEach((dot, i) => dot.setAttribute('aria-pressed', String(i === active)));
    place.textContent = image.dataset.place;
    place.setAttribute('href', image.dataset.href);
  };
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => { clearTimeout(timer); show(index).finally(schedule); });
    dot.addEventListener('keydown', (event) => {
      if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
      event.preventDefault();
      const next = (index + (event.key === 'ArrowRight' ? 1 : dots.length - 1)) % dots.length;
      dots[next].focus();
      dots[next].click();
    });
  });
  pause.addEventListener('click', () => {
    userPaused = !userPaused;
    pause.classList.toggle('is-paused', userPaused);
    pause.setAttribute('aria-label', userPaused ? pause.dataset.playLabel : pause.dataset.pauseLabel);
    schedule();
  });
  hero.addEventListener('pointerenter', () => { hovering = true; schedule(); });
  hero.addEventListener('pointerleave', () => { hovering = false; schedule(); });
  hero.addEventListener('focusin', () => { focused = true; schedule(); });
  hero.addEventListener('focusout', (event) => { focused = hero.contains(event.relatedTarget); schedule(); });
  document.addEventListener('visibilitychange', schedule);
  addEventListener('pagehide', () => { clearTimeout(timer); ++ticket; });
  addEventListener('pageshow', schedule);
  reduced.addEventListener('change', () => { pause.hidden = reduced.matches; schedule(); });
  pause.hidden = reduced.matches;
  schedule();
}
