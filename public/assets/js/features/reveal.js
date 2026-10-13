// Scroll reveals for the story and legal pages, and the contents list that follows the reader.
// Content is visible without this script. Elements already on screen are marked shown before the
// document is marked ready, so nothing the reader can see blinks out and back in.
export function reveal(root, view = window) {
  const doc = view.document;
  const reduced = view.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  const targets = [...root.querySelectorAll('.st-reveal')];
  const show = (element) => element.classList.add('is-in');
  if (!reduced && 'IntersectionObserver' in view) {
    const height = view.innerHeight || doc.documentElement.clientHeight;
    for (const element of targets) {
      const box = element.getBoundingClientRect();
      if (box.top < height && box.bottom > 0) show(element);
    }
    const watcher = new view.IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        show(entry.target);
        watcher.unobserve(entry.target);
      }
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    for (const element of targets) if (!element.classList.contains('is-in')) watcher.observe(element);
    doc.documentElement.classList.add('reveal-ready');
  } else {
    targets.forEach(show);
  }
  followContents(root, view);
}

// Marks the contents link of the section being read with aria-current="true".
export function followContents(root, view = window) {
  const links = [...root.querySelectorAll('[data-spy]')];
  if (!links.length || !('IntersectionObserver' in view)) return;
  const byId = new Map(links.map((link) => [link.dataset.spy, link]));
  const visible = new Map();
  const mark = () => {
    let current = null;
    for (const [id, top] of visible) if (current === null || top < visible.get(current)) current = id;
    if (current === null) return;
    for (const [id, link] of byId) {
      if (id === current) link.setAttribute('aria-current', 'true'); else link.removeAttribute('aria-current');
    }
  };
  const watcher = new view.IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) visible.set(entry.target.id, entry.boundingClientRect.top); else visible.delete(entry.target.id);
    }
    mark();
  }, { rootMargin: '-20% 0px -60% 0px' });
  for (const id of byId.keys()) {
    const section = root.querySelector(`#${CSS.escape(id)}`);
    if (section) watcher.observe(section);
  }
}
