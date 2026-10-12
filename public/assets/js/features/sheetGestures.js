import { haptic } from './haptics.js?v=51';

export function sheetGestures(handle) {
  const sheet = handle.closest('.map-sheet');
  let drag = null;
  let suppressUntil = 0;
  const clear = () => { drag = null; sheet.style.transform = ''; };
  handle.addEventListener('pointerdown', (event) => {
    if (innerWidth >= 960 || !['touch', 'pen'].includes(event.pointerType) || event.button !== 0) return;
    drag = { id: event.pointerId, x: event.clientX, y: event.clientY, delta: 0 };
    handle.setPointerCapture(event.pointerId);
  });
  handle.addEventListener('pointermove', (event) => {
    if (!drag || drag.id !== event.pointerId) return;
    const dy = event.clientY - drag.y;
    if (Math.abs(event.clientX - drag.x) > Math.abs(dy) + 12) { suppressUntil = performance.now() + 500; clear(); return; }
    drag.delta = dy;
    sheet.style.transform = `translateY(${Math.max(-72, Math.min(72, dy * .5))}px)`;
  });
  handle.addEventListener('pointerup', (event) => {
    if (!drag || drag.id !== event.pointerId) return;
    const delta = drag.delta;
    const expanded = handle.getAttribute('aria-expanded') === 'true';
    clear();
    if (Math.abs(delta) < 36) return;
    suppressUntil = performance.now() + 500;
    if ((delta < 0 && !expanded) || (delta > 0 && expanded)) handle.click();
    haptic();
    document.dispatchEvent(new CustomEvent('bx:sheet-snap', { detail: { sheet, delta: Math.max(-72, Math.min(72, delta * .5)) } }));
  });
  handle.addEventListener('click', (event) => {
    if (event.isTrusted && performance.now() < suppressUntil) { event.preventDefault(); event.stopImmediatePropagation(); }
  }, true);
  handle.addEventListener('pointercancel', clear);
  handle.addEventListener('lostpointercapture', clear);
  addEventListener('pagehide', clear);
}
