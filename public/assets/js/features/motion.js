import '../vendor/motion-14.1.0.js';

export function motion() {
  const { animate, inView } = globalThis.Motion;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const active = new Set();
  const observed = new WeakSet();
  const playing = new WeakMap();
  const play = (target, frames, duration = .24, done = () => {}) => {
    if (reduced.matches || document.hidden) { done(); return; }
    playing.get(target)?.();
    const original = target.style ? { transform: target.style.transform, opacity: target.style.opacity } : null;
    let control;
    try { control = animate(target, frames, { duration, ease: [.22, 1, .36, 1] }); }
    catch { done(); return; }
    let settled = false;
    const finish = () => {
      if (settled) return;
      settled = true;
      active.delete(finish);
      control.cancel();
      if (original) {
        if (frames.transform) target.style.transform = original.transform;
        if (frames.opacity) target.style.opacity = original.opacity;
      }
      playing.delete(target);
      done();
    };
    active.add(finish);
    playing.set(target, finish);
    Promise.resolve(control.finished).then(finish, finish);
  };
  const reveal = (target) => {
    if (observed.has(target)) return;
    observed.add(target);
    play(target, { opacity: [0, 1], transform: ['translateY(12px)', 'translateY(0)'] }, .32);
  };
  const page = document.querySelector('.auth-card, .activity, .account, .event-head, [data-feature="publish"], .search-top');
  if (page) reveal(page);
  let stopViewing = inView('.card, .destination-card, .promo, .create-tile', reveal, { margin: '0px 0px -24px 0px' });
  const press = (event) => {
    if (event.button !== 0 || reduced.matches) return;
    const button = event.target.closest('button, .card-link, .destination-card, .chip, .tab, .picker-option');
    if (!button || button.disabled || button.closest('.maplibregl-marker')) return;
    const base = getComputedStyle(button).transform === 'none' ? '' : getComputedStyle(button).transform;
    play(button, { transform: [`${base} scale(.97)`, `${base} scale(1)`] }, .2);
  };
  const open = (event) => {
    const dialog = event.detail.dialog;
    play(dialog, { opacity: [0, 1], transform: [innerWidth < 700 ? 'translateY(28px)' : 'translateY(8px) scale(.98)', 'translateY(0) scale(1)'] }, .26);
  };
  const close = (event) => {
    if (reduced.matches || document.hidden) return;
    event.preventDefault();
    const dialog = event.detail.dialog;
    const complete = event.detail.complete;
    play(dialog, { opacity: [1, 0], transform: ['translateY(0)', innerWidth < 700 ? 'translateY(20px)' : 'translateY(5px)'] }, .14, complete);
  };
  const settle = () => { for (const finish of [...active]) finish(); };
  reduced.addEventListener('change', settle);
  document.addEventListener('pointerdown', press);
  document.addEventListener('change', (event) => {
    if (!event.target.matches('input[type="checkbox"], input[type="radio"]')) return;
    const label = event.target.closest('label');
    if (label) play(label, { opacity: [.7, 1] }, .18);
  });
  document.addEventListener('bx:privacy-open', (event) => {
    for (const row of event.detail.rows) play(row, { opacity: [.4, 1], transform: ['translateY(6px)', 'translateY(0)'] }, .2);
  });
  document.addEventListener('bx:sheet-snap', (event) => {
    play(event.detail.sheet, { transform: [`translateY(${event.detail.delta}px)`, 'translateY(0)'] }, .22);
  });
  document.addEventListener('bx:picker-open', open);
  document.addEventListener('bx:picker-close', close);
  addEventListener('pagehide', () => { settle(); stopViewing(); });
  document.addEventListener('visibilitychange', () => { if (document.hidden) settle(); });
  addEventListener('pageshow', (event) => { if (event.persisted) stopViewing = inView('.card, .destination-card, .promo, .create-tile', reveal, { margin: '0px 0px -24px 0px' }); });
}
