const PHONE = '(max-width: 959px)';

/** Closes the account menu on an outside tap, Escape, or its close button; locks page scroll while it covers a phone screen. */
export function accountMenu(details) {
  const summary = details.querySelector('summary');
  const close = () => { details.open = false; };
  details.addEventListener('toggle', () => {
    document.documentElement.classList.toggle('menu-open', details.open && matchMedia(PHONE).matches);
    if (details.open) details.querySelector('.menu-member, .menu-row, .button')?.focus({ preventScroll: true });
  });
  document.addEventListener('click', (event) => {
    if (details.open && !details.contains(event.target)) close();
  });
  details.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape' || !details.open) return;
    close();
    summary.focus();
  });
  details.querySelector('[data-menu="close"]')?.addEventListener('click', () => { close(); summary.focus(); });
  addEventListener('pageshow', close);
}
