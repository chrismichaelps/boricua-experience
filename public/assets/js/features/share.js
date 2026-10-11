import { message } from '../constants/messages.js?v=40';
import { toast } from './toast.js?v=40';

export function share(button) {
  button.addEventListener('click', async () => {
    const data = { title: button.dataset.title || document.title, url: location.href };
    if (navigator.share) {
      try { await navigator.share(data); } catch { /* the visitor closed the sheet */ }
      return;
    }
    await navigator.clipboard?.writeText(data.url);
    toast(message('copied'));
  });
}
