import { preparePhoto, MAX_BYTES } from './mediaUpload.js?v=95';
import { stage, staged, clear } from './coverStage.js?v=95';

// The "your photo" tile of the cover picker. The photograph is resized and re-encoded here (which
// drops camera and location metadata), previewed, and kept in this browser; the form only says a
// photograph is waiting, and the listing's cover page sends it once the listing exists.
export function coverPhoto(tile) {
  const picker = tile.closest('.cover-picker');
  const input = tile.querySelector('input[type="file"]');
  const flag = tile.querySelector('input[name="coverUpload"]');
  const preview = tile.querySelector('.cover-upload-preview');
  const label = tile.querySelector('.cover-upload-label');
  const status = tile.querySelector('[role="status"]');
  const original = label.textContent;
  let shown = null;
  tile.hidden = false;

  const show = (blob) => {
    if (shown) URL.revokeObjectURL(shown);
    shown = blob ? URL.createObjectURL(blob) : null;
    preview.hidden = !blob;
    if (blob) preview.src = shown; else preview.removeAttribute('src');
    flag.value = blob ? '1' : '';
    tile.classList.toggle('is-chosen', Boolean(blob));
    picker?.classList.toggle('has-photo', Boolean(blob));
    label.textContent = blob ? tile.dataset.change : original;
  };

  input.addEventListener('change', async () => {
    const file = input.files?.[0];
    if (!file) return;
    tile.setAttribute('aria-busy', 'true');
    status.textContent = tile.dataset.working;
    try {
      const blob = await preparePhoto(file);
      if (blob.size > MAX_BYTES) throw new Error('media_too_large');
      await stage(blob);
      show(blob);
      status.textContent = tile.dataset.ready;
    } catch (error) {
      status.textContent = error?.message === 'media_too_large' ? tile.dataset.tooLarge : tile.dataset.invalid;
    } finally {
      tile.removeAttribute('aria-busy');
      input.value = '';
    }
  });

  // Choosing a background instead lets the photograph go.
  for (const radio of picker?.querySelectorAll('input[name="coverTheme"]') ?? []) {
    radio.addEventListener('click', () => {
      if (!flag.value) return;
      show(null);
      status.textContent = '';
      clear();
    });
  }

  // A form shown again with corrections keeps the photograph already chosen; a fresh form starts clean.
  if (document.querySelector('.banner-error')) staged().then((blob) => { if (blob) { show(blob); status.textContent = tile.dataset.ready; } });
  else clear();
}
