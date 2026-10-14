// "Interested" and "Going" marks: a tap updates both buttons and the counts in place; without
// scripts the form posts and the page reloads with the same result.
import { postForm } from '../net/http.js?v=74';
import { haptic } from './haptics.js?v=74';

/** The summary line for counts, in the page's own singular and plural wording. */
export function summary(line, going, interested) {
  const say = (name, count) => (line.dataset[`${name}${count === 1 ? 'One' : 'Other'}`] || ':count').replace(':count', String(count));
  return `${say('going', going)} · ${say('interested', interested)}`;
}

export function interest(form) {
  const group = form.closest('.interest');
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const button = form.querySelector('button');
    if (button.disabled) return;
    button.disabled = true;
    haptic();
    try {
      const answer = await postForm(form);
      for (const other of group.querySelectorAll('form[data-feature="interest"]')) {
        const kind = other.querySelector('button').dataset.kind;
        const on = answer.kind === kind;
        other.querySelector('button').classList.toggle('is-on', on);
        other.querySelector('button').setAttribute('aria-pressed', String(on));
        other.querySelector('input[name="kind"]').value = on ? '' : kind;
      }
      const line = group.querySelector('[data-interest-summary]');
      // Confirmed attendees always count as going beside the members who simply said so.
      if (line) line.textContent = summary(line, answer.going + Number(line.dataset.approved || 0), answer.interested);
    } catch {
      form.submit();
    } finally {
      button.disabled = false;
    }
  });
}
