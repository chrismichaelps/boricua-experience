const PHONE = '(max-width: 959px)';

/** Keeps disclosure state and phone scroll locking in sync across dismissal and page restoration. */
export function accountMenu(details) {
  const summary = details.querySelector('summary');
  const phone = matchMedia(PHONE);
  const sync = () => document.documentElement.classList.toggle('menu-open', details.open && phone.matches);
  const close = (restoreFocus = false) => {
    details.open = false;
    sync();
    if (restoreFocus) summary?.focus({ preventScroll: true });
  };
  details.addEventListener('toggle', () => {
    sync();
    if (details.open) details.querySelector('[data-menu="close"], .menu-member, .menu-row, .button')?.focus({ preventScroll: true });
  });
  document.addEventListener('click', (event) => {
    if (details.open && !details.contains(event.target)) close();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape' || !details.open) return;
    event.preventDefault();
    close(true);
  });
  details.querySelector('[data-menu="close"]')?.addEventListener('click', (event) => {
    event.preventDefault();
    close(true);
  });
  phone.addEventListener('change', sync);
  addEventListener('pagehide', () => close());
  addEventListener('pageshow', () => close());
  sync();
}
