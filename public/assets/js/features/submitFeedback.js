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
  // Capture only guards against a second native submission of a form already navigating.
  root.addEventListener('submit', event => {
    if (event.target.dataset.submitting) event.preventDefault();
  }, true);
  // Bubbling runs after the form's own listeners, so whether a script took over is final here. A
  // microtask from the capture phase is not: browsers drain microtasks between listeners on a real
  // click, before a script feature calls preventDefault.
  root.addEventListener('submit', event => {
    const form = event.target;
    const control = event.submitter || form.querySelector('button[type="submit"]');
    if (event.defaultPrevented) {
      // Script features own completion; mirror their busy owner and release when it clears.
      const owner = form.closest('[aria-busy="true"]');
      if (!owner || !control || form.dataset.submitting) return;
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
    mark(control);
  });
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
