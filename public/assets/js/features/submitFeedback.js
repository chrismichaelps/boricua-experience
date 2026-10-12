export function submitFeedback(root = document, lifecycle = window) {
  const busy = new Map();
  const observers = new Set();
  function mark(control) {
    if (!control || busy.has(control)) return;
    busy.set(control, { hidden: control.hidden });
    control.hidden = false;
    control.setAttribute('aria-busy', 'true');
    control.setAttribute('aria-disabled', 'true');
    control.classList.add('is-submitting');
  }
  function reset() {
    for (const [control, state] of busy) {
      control.hidden = state.hidden;
      control.removeAttribute('aria-busy');
      control.removeAttribute('aria-disabled');
      control.classList.remove('is-submitting');
    }
    for (const form of root.querySelectorAll('form[data-submitting]')) {
      delete form.dataset.submitting;
      form.removeAttribute('aria-busy');
    }
    busy.clear();
    for (const observer of observers) observer.disconnect();
    observers.clear();
  }
  root.addEventListener('submit', event => {
    const form = event.target;
    if (form.dataset.submitting) { event.preventDefault(); return; }
    // AJAX features own completion; wait until bubbling decides whether navigation is accepted.
    queueMicrotask(() => {
      if (event.defaultPrevented) {
        const owner = form.closest('[aria-busy="true"]');
        const control = event.submitter || form.querySelector('button[type="submit"]');
        if (!owner || !control) return;
        mark(control);
        const observer = new MutationObserver(() => {
          if (owner.getAttribute('aria-busy') === 'true') return;
          const state = busy.get(control);
          if (state) {
            control.hidden = state.hidden;
            control.removeAttribute('aria-busy');
            control.removeAttribute('aria-disabled');
            control.classList.remove('is-submitting');
            busy.delete(control);
          }
          observer.disconnect();
          observers.delete(observer);
        });
        observer.observe(owner, { attributes: true, attributeFilter: ['aria-busy'] });
        observers.add(observer);
        return;
      }
      form.dataset.submitting = 'true';
      form.setAttribute('aria-busy', 'true');
      mark(event.submitter || form.querySelector('button[type="submit"]'));
    });
  }, true);
  root.addEventListener('click', event => {
    const link = event.target.closest('a.button, a.pill-submit');
    if (!link || link.target || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const url = new URL(link.href, location.href);
    if (url.origin !== location.origin || url.pathname === location.pathname && url.hash) return;
    if (busy.has(link)) { event.preventDefault(); return; }
    queueMicrotask(() => { if (!event.defaultPrevented) mark(link); });
  }, true);
  lifecycle.addEventListener('pageshow', reset);
  return reset;
}
