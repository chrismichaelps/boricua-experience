const eye = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/></svg>';
const eyeOff = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m3 3 18 18M10.6 5.1A12 12 0 0 1 12 5c6.5 0 10 7 10 7a17 17 0 0 1-3.1 4.1M6.1 6.1A18 18 0 0 0 2 12s3.5 7 10 7a12 12 0 0 0 5-1.1M10 10a3 3 0 0 0 4 4"/></svg>';

// Length guidance is not an entropy estimate or a provider acceptance guarantee.
export function passwordProgress(value) {
  return Math.min(20, [...value].length);
}

export function passwordControls(root = document) {
  for (const wrapper of root.querySelectorAll('.password-control')) {
    if (wrapper.dataset.ready) continue;
    wrapper.dataset.ready = 'true';
    const input = wrapper.querySelector('input');
    const toggle = wrapper.querySelector('button');
    if (!input || !toggle) continue;
    toggle.hidden = false;
    toggle.innerHTML = eye;
    toggle.addEventListener('click', () => {
      const showing = input.type === 'password';
      input.type = showing ? 'text' : 'password';
      toggle.setAttribute('aria-pressed', String(showing));
      toggle.setAttribute('aria-label', showing ? wrapper.dataset.hide : wrapper.dataset.show);
      toggle.innerHTML = showing ? eyeOff : eye;
    });
    if (input.name === 'confirmation') {
      const original = input.form?.querySelector('input[name="password"]');
      if (original) {
        const validate = () => input.setCustomValidity(input.value && input.value !== original.value ? wrapper.dataset.mismatch : '');
        input.addEventListener('input', validate);
        original.addEventListener('input', validate);
        validate();
      }
    }
    if (input.autocomplete !== 'new-password' || input.name === 'confirmation') continue;
    const guidance = document.createElement('div');
    guidance.className = 'password-guidance';
    const meter = document.createElement('progress');
    meter.max = 20;
    meter.value = passwordProgress(input.value);
    meter.setAttribute('aria-label', wrapper.dataset.guidance);
    const hint = document.createElement('p');
    hint.className = 'field-hint';
    hint.textContent = wrapper.dataset.guidance;
    guidance.append(meter, hint);
    wrapper.after(guidance);
    input.addEventListener('input', () => { meter.value = passwordProgress(input.value); });
  }
}
