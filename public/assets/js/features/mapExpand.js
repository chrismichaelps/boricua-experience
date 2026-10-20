// A route map opens over the whole screen so a visitor can follow every leg, and closes with the
// same button or Escape. The map is resized and framed again whenever its size changes.
export function expandable(map, button, frame = () => {}) {
  const surface = button?.closest('.plan-map-wrap, .trip-stage');
  if (!surface) return;
  const setExpanded = (value) => {
    surface.classList.toggle('is-map-expanded', value);
    document.documentElement.classList.toggle('has-expanded-map', value);
    button.setAttribute('aria-expanded', String(value));
    button.setAttribute('aria-label', value ? button.dataset.closeLabel : button.dataset.expandLabel);
    map.resize();
    frame();
  };
  button.addEventListener('click', () => setExpanded(!surface.classList.contains('is-map-expanded')));
  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape' || event.defaultPrevented || !surface.classList.contains('is-map-expanded') || document.querySelector('dialog[open]')) return;
    event.preventDefault();
    setExpanded(false);
    button.focus({ preventScroll: true });
  });
}
