import { postForm } from '../net/http.js';
import { message } from '../constants/messages.js';
import { toast } from './toast.js';

export function saveToggle(form) {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const button = form.querySelector('button');
    try {
      const { saved } = await postForm(form);
      button.classList.toggle('is-on', saved);
      button.setAttribute('aria-pressed', String(saved));
      navigator.vibrate?.(10);
    } catch {
      toast(message('tryAgain'));
    }
  });
}

export function reactToggle(form) {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
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
      navigator.vibrate?.(10);
    } catch {
      toast(message('tryAgain'));
    }
  });
}
