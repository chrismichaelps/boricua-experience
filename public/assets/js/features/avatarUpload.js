import { postJson } from '../net/http.js?v=67';

const SIDE = 320;
const QUALITY = 0.86;

async function decode(file) {
  if ('createImageBitmap' in window) {
    try { return await createImageBitmap(file, { imageOrientation: 'from-image' }); } catch { /* fall back to an image element, which decodes HEIC on Safari */ }
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

function squareCrop(source) {
  const width = source.width;
  const height = source.height;
  const side = Math.min(width, height);
  const canvas = document.createElement('canvas');
  canvas.width = SIDE;
  canvas.height = SIDE;
  const context = canvas.getContext('2d');
  context.imageSmoothingQuality = 'high';
  context.drawImage(source, (width - side) / 2, (height - side) / 2, side, side, 0, 0, SIDE, SIDE);
  return canvas;
}

function encode(canvas) {
  return new Promise((resolve) => {
    canvas.toBlob((webp) => {
      if (webp && webp.type === 'image/webp') return resolve(webp);
      canvas.toBlob(resolve, 'image/jpeg', QUALITY);
    }, 'image/webp', QUALITY);
  });
}

function asDataUrl(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

function showPhoto(editor, address) {
  for (const holder of [editor.querySelector('.photo-frame'), document.querySelector('.menu-trigger'), document.querySelector('.menu-member')]) {
    const current = holder?.querySelector('.avatar');
    if (!current) continue;
    const image = document.createElement('img');
    image.className = current.className.replace(/\bavatar-photo\b/, '') + ' avatar-photo';
    image.alt = '';
    image.src = address;
    current.replaceWith(image);
  }
}

export function avatarUpload(editor) {
  const input = editor.querySelector('input[type="file"]');
  const status = editor.querySelector('.photo-status');
  input.addEventListener('change', async () => {
    const file = input.files?.[0];
    if (!file) return;
    editor.classList.add('is-busy');
    status.textContent = editor.dataset.uploading;
    try {
      const blob = await encode(squareCrop(await decode(file)));
      const { avatarUrl } = await postJson(editor.dataset.endpoint, { image: await asDataUrl(blob) });
      showPhoto(editor, avatarUrl);
      editor.querySelector('.photo-remove')?.removeAttribute('hidden');
      status.textContent = editor.dataset.done;
      navigator.vibrate?.(10);
    } catch {
      status.textContent = editor.dataset.error;
    } finally {
      editor.classList.remove('is-busy');
      input.value = '';
    }
  });
}
