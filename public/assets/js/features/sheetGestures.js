import { haptic } from './haptics.js?v=79';

export function sheetGestures(handle) {
  const sheet = handle.closest('.map-sheet');
  let drag = null;
  let suppressUntil = 0;
  const clear = () => { drag = null; sheet.style.transform = ''; };
  // The handle and the sheet's heading both drag the sheet, as a native sheet's top edge does.
  const zones = [handle, ...sheet.querySelectorAll('[data-sheet-drag]')];
  const start = (zone) => (event) => {
    if (innerWidth >= 960 || !['touch', 'pen'].includes(event.pointerType) || event.button !== 0) return;
    drag = { id: event.pointerId, x: event.clientX, y: event.clientY, delta: 0, zone };
    zone.setPointerCapture(event.pointerId);
  };
  for (const zone of zones) zone.addEventListener('pointerdown', start(zone));
  const move = (event) => {
    if (!drag || drag.id !== event.pointerId) return;
    const dy = event.clientY - drag.y;
    if (Math.abs(event.clientX - drag.x) > Math.abs(dy) + 12) { suppressUntil = performance.now() + 500; clear(); return; }
    drag.delta = dy;
    sheet.style.transform = `translateY(${Math.max(-72, Math.min(72, dy * .5))}px)`;
  };
  const end = (event) => {
    if (!drag || drag.id !== event.pointerId) return;
    const delta = drag.delta;
    const expanded = handle.getAttribute('aria-expanded') === 'true';
    clear();
    if (Math.abs(delta) < 36) return;
    suppressUntil = performance.now() + 500;
    if ((delta < 0 && !expanded) || (delta > 0 && expanded)) handle.click();
    haptic();
    document.dispatchEvent(new CustomEvent('bx:sheet-snap', { detail: { sheet, delta: Math.max(-72, Math.min(72, delta * .5)) } }));
  };
  for (const zone of zones) {
    zone.addEventListener('pointermove', move);
    zone.addEventListener('pointerup', end);
    zone.addEventListener('pointercancel', clear);
    zone.addEventListener('lostpointercapture', clear);
  }
  handle.addEventListener('click', (event) => {
    if (event.isTrusted && performance.now() < suppressUntil) { event.preventDefault(); event.stopImmediatePropagation(); }
  }, true);
  addEventListener('pagehide', clear);
}
