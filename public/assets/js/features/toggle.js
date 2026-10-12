import { haptic } from './haptics.js?v=49';
import { postForm } from '../net/http.js?v=49';
import { message } from '../constants/messages.js?v=49';
import { toast } from './toast.js?v=49';

export function saveToggle(form) {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const button = form.querySelector('button');
    if (form.getAttribute('aria-busy') === 'true') return;
    form.setAttribute('aria-busy', 'true');
    const controls = [...form.querySelectorAll('button')];
    controls.forEach((control) => { control.disabled = true; });
    try {
      const { saved } = await postForm(form);
      button.classList.toggle('is-on', saved);
      button.setAttribute('aria-pressed', String(saved));
      haptic('success');
    } catch {
      haptic('error');
      toast(message('tryAgain'));
    } finally {
      form.setAttribute('aria-busy', 'false');
      controls.forEach((control) => { control.disabled = false; });
    }
  });
}

export function reactToggle(form) {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const group = form.closest('.reactions');
    if (group.getAttribute('aria-busy') === 'true') return;
    group.setAttribute('aria-busy', 'true');
    const controls = [...group.querySelectorAll('button')];
    controls.forEach((control) => { control.disabled = true; });
    try {
      const { reaction, likeCount } = await postForm(form);
      for (const other of form.closest('.reactions').querySelectorAll('form[data-feature="react"]')) {
        const own = Number(other.dataset.own);
        const on = reaction === own;
        const button = other.querySelector('button');
        other.querySelector('input[name="value"]').value = on ? '0' : String(own);
        button.classList.toggle('is-on', on);
        button.setAttribute('aria-pressed', String(on));
        const count = button.querySelector('.count');
        if (count) count.textContent = String(likeCount);
      }
      haptic('success');
    } catch {
      haptic('error');
      toast(message('tryAgain'));
    } finally {
      group.setAttribute('aria-busy', 'false');
      controls.forEach((control) => { control.disabled = false; });
    }
  });
}
