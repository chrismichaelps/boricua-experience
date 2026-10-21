const COVERS = '.card-media img, .event-cover > img, .place-photo img';

export function coverImages(root = document) {
  const fit = (image) => {
    if (!image?.matches?.(COVERS) || !image.complete || !image.naturalWidth || !image.naturalHeight) return;
    const category = image.getAttribute('src')?.startsWith('/assets/covers/');
    image.classList.toggle('image-contain', !category && (image.naturalWidth < 640 || image.naturalWidth / image.naturalHeight < 1.2));
  };
  root.querySelectorAll(COVERS).forEach(fit);
  const loaded = (event) => fit(event.target);
  root.addEventListener('load', loaded, true);
  return () => root.removeEventListener('load', loaded, true);
}
