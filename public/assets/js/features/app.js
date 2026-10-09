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
