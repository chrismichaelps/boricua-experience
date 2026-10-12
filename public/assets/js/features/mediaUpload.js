import { postJson, RequestFailed } from '../net/http.js?v=57';

const SIDE = 1600;
const QUALITY = 0.85;
const MAX_BYTES = 3145728;
const PDF = 'application/pdf';

async function decode(file) {
  if ('createImageBitmap' in window) {
    try { return await createImageBitmap(file, { imageOrientation: 'from-image' }); } catch { /* an image element decodes HEIC on Safari */ }
  }
  const url = URL.createObjectURL(file);
  try {
    const image = new Image();
    image.decoding = 'async';
    image.src = url;
    await image.decode();
    return image;
  } finally {
    URL.revokeObjectURL(url);
  }
}

// Redrawing the photo on a canvas keeps only its pixels: camera, time and location metadata are gone.
export function fitted(width, height, side = SIDE) {
  const scale = Math.min(1, side / Math.max(width, height));
  return { width: Math.max(1, Math.round(width * scale)), height: Math.max(1, Math.round(height * scale)) };
}

async function preparePhoto(file) {
  const source = await decode(file);
  const size = fitted(source.width, source.height);
  const canvas = document.createElement('canvas');
  canvas.width = size.width;
  canvas.height = size.height;
  const context = canvas.getContext('2d');
  context.imageSmoothingQuality = 'high';
  context.drawImage(source, 0, 0, size.width, size.height);
  source.close?.();
  return new Promise((resolve, reject) => {
    canvas.toBlob((webp) => {
      if (webp && webp.type === 'image/webp') return resolve(webp);
      canvas.toBlob((jpeg) => (jpeg ? resolve(jpeg) : reject(new Error('encode'))), 'image/jpeg', QUALITY);
    }, 'image/webp', QUALITY);
  });
}

// The message for a refusal: the server's code when it names one, the generic failure otherwise.
export function refusal(form, error) {
  const code = error instanceof RequestFailed ? error.code : error?.message;
  const key = error instanceof RequestFailed ? error.key : '';
  if (code === 'media_too_large' || key === 'media.too_large') return form.dataset.tooLarge;
  if (['media_invalid', 'menu_unsupported', 'media_unsupported'].includes(code) || key === 'media.invalid') return form.dataset.invalid;
  if (code === 'media_limit') return form.dataset.limit;
  return form.dataset.failed;
}

export function mediaUpload(form, send = fetch, reload = () => location.reload()) {
  const input = form.querySelector('input[type="file"]');
  const label = form.querySelector('input[name="label"]');
  const status = form.querySelector('[role="status"]');
  form.querySelector('.media-script-note')?.remove();
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (form.getAttribute('aria-busy') === 'true') return;
    const file = input.files?.[0];
    if (!file) { status.textContent = form.dataset.choose; return; }
    form.setAttribute('aria-busy', 'true');
    status.textContent = form.dataset.working;
    try {
      // Some systems report no type for a PDF; its extension decides, and the server reads the bytes anyway.
      const pdf = file.type === PDF || (!file.type && /\.pdf$/i.test(file.name || ''));
      const body = file.type === PDF ? file : pdf ? new Blob([file], { type: PDF }) : await preparePhoto(file);
      if (body.size > MAX_BYTES) throw new Error('media_too_large');
      const ticket = await postJson(form.action, { kind: form.dataset.kind, mediaType: body.type, bytes: body.size, label: label?.value.trim() ?? '' });
      const stored = await send(ticket.uploadUrl, { method: 'PUT', headers: { 'content-type': body.type, 'x-upsert': 'false', apikey: ticket.apiKey }, body });
      if (!stored.ok) throw new Error('upload');
      await postJson(ticket.finishUrl, {});
      reload();
    } catch (error) {
      status.textContent = refusal(form, error);
    } finally {
      form.setAttribute('aria-busy', 'false');
    }
  });
}
