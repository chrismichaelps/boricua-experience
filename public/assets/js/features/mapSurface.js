export function mapSurface(page, list) {
  const indicator = page.querySelector('.map-loading');
  const control = page.querySelector('[data-map-expand]');
  const busy = value => {
    list.setAttribute('aria-busy', String(value));
    if (indicator) indicator.hidden = !value;
  };
  if (!control) return { busy, connect() {} };
  let map, resize;
  const setExpanded = value => {
    page.dataset.mapExpanded = value ? '1' : '0';
    page.classList.toggle('is-map-expanded', value);
    control.setAttribute('aria-expanded', String(value));
    control.setAttribute('aria-label', value ? control.dataset.closeLabel : control.dataset.expandLabel);
    map?.resize();
    resize?.();
  };
  control.addEventListener('click', () => setExpanded(page.dataset.mapExpanded !== '1'));
  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape' || event.defaultPrevented || document.querySelector('dialog[open]') || page.dataset.mapExpanded !== '1') return;
    event.preventDefault();
    setExpanded(false);
    control.focus({ preventScroll: true });
  });
  window.addEventListener('pagehide', () => busy(false));
  return { busy, connect(instance, changed) { map = instance; resize = changed; control.hidden = false; } };
}
