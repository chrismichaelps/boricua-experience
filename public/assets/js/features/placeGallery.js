export function placeGallery(root) {
  const dialog = root.querySelector('dialog');
  if (!dialog?.showModal) return;
  const links = [...root.querySelectorAll('.place-album-grid [data-photo-index]')];
  const image = dialog.querySelector('[data-photo="image"]');
  const position = dialog.querySelector('[data-photo="position"]');
  const previous = dialog.querySelector('[data-photo="previous"]');
  const next = dialog.querySelector('[data-photo="next"]');
  const close = dialog.querySelector('[data-photo="close"]');
  if (!links.length || !image || !position || !previous || !next || !close) return;
  let selected = 0;
  let opener;
  let overflow;
  const show = (index) => {
    selected = (index + links.length) % links.length;
    const link = links[selected];
    image.src = link.href;
    image.alt = link.getAttribute('aria-label') || '';
    position.textContent = image.alt;
  };
  previous.hidden = next.hidden = links.length < 2;
  root.addEventListener('click', (event) => {
    const link = event.target.closest('[data-photo-index]');
    if (!link || !root.contains(link) || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    opener = link;
    show(Number(link.dataset.photoIndex));
    overflow = document.documentElement.style.overflow;
    dialog.showModal();
    document.documentElement.style.overflow = 'hidden';
    close.focus();
  });
  previous.addEventListener('click', () => show(selected - 1));
  next.addEventListener('click', () => show(selected + 1));
  close.addEventListener('click', () => dialog.close());
  dialog.addEventListener('keydown', (event) => {
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    show(selected + (event.key === 'ArrowLeft' ? -1 : 1));
  });
  dialog.addEventListener('click', (event) => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  });
  dialog.addEventListener('close', () => {
    document.documentElement.style.overflow = overflow;
    image.removeAttribute('src');
    opener?.focus({ preventScroll: true });
  });
  window.addEventListener('pagehide', () => { if (dialog.open) dialog.close(); });
}
