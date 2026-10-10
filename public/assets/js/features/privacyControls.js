export function privacyControls(details) {
  details.addEventListener('toggle', () => {
    if (details.open) document.dispatchEvent(new CustomEvent('bx:privacy-open', { detail: { rows: [...details.querySelectorAll('.privacy-switch')] } }));
  });
}
