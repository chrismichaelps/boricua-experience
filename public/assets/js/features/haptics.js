const reduced = matchMedia('(prefers-reduced-motion: reduce)');
let last = -Infinity;

export function haptic(kind = 'selection') {
  if (document.hidden || reduced.matches || typeof navigator.vibrate !== 'function') return;
  const now = performance.now();
  if (now - last < 90) return;
  last = now;
  try { navigator.vibrate(kind === 'success' ? [8, 35, 8] : kind === 'error' ? 18 : 8); } catch {}
}

export function interactionFeedback() {
  document.addEventListener('click', (event) => {
    if (!event.isTrusted) return;
    const action = event.target.closest('button, a[href], [role="button"], [role="tab"]');
    if (action && !action.disabled && action.getAttribute('aria-disabled') !== 'true') haptic();
  });
  document.addEventListener('change', (event) => {
    if (event.isTrusted && event.target.matches('input[type="checkbox"], input[type="radio"], select')) haptic();
  });
  document.addEventListener('invalid', (event) => { if (event.isTrusted) haptic('error'); }, true);
}
