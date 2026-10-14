export function registerServiceWorker() {
  if ('serviceWorker' in navigator && location.protocol === 'https:') {
    addEventListener('load', () => navigator.serviceWorker.register('/sw.js').catch(() => {}));
  }
}

export function back(link) {
  link.addEventListener('click', (event) => {
    if (history.length > 1 && document.referrer.startsWith(location.origin)) {
      event.preventDefault();
      history.back();
    }
  });
}

export function joinPanel(panel) {
  // Panel bounds are screen pixels; footer padding is measured before accessibility zoom.
  if (typeof ResizeObserver === 'function') {
    const root = document.documentElement, footer = document.querySelector('.footer');
    const measure = () => {
      const zoom = parseFloat(footer ? getComputedStyle(footer).zoom : '1') || 1;
      root.style.setProperty('--join-panel', `${Math.ceil(panel.getBoundingClientRect().height / zoom)}px`);
    };
    const observer = new ResizeObserver(measure);
    observer.observe(panel); if (footer) observer.observe(footer);
    addEventListener('resize', measure);
    addEventListener('pagehide', () => observer.disconnect());
    addEventListener('pageshow', () => { observer.observe(panel); if (footer) observer.observe(footer); measure(); });
    measure();
  }
  const form = panel.querySelector('.join-form');
  const textarea = form?.querySelector('textarea');
  if (!form || !textarea) return;
  const button = form.querySelector('button[type="submit"]');
  button.addEventListener('click', (event) => {
    if (!form.classList.contains('is-expanded') && matchMedia('(max-width: 959px)').matches) {
      event.preventDefault();
      form.classList.add('is-expanded');
      textarea.focus();
    }
  });
}

export function retry(link) {
  link.addEventListener('click', (event) => { event.preventDefault(); location.reload(); });
}
