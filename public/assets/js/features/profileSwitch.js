// The place form shows the facts of one category. Choosing another category reloads the form for
// it, keeping what was already typed in the shared fields; without scripts the next submission
// shows the new category's facts instead.
const KEPT = ['name', 'summary', 'description', 'municipality', 'addressLine', 'lat', 'lng', 'phone', 'website', 'coverTheme'];

export function profileSwitch(holder, navigate = (url) => location.assign(url)) {
  const select = holder.querySelector('select');
  const form = select?.form;
  if (!form || form.dataset.mode !== 'create') return;
  select.addEventListener('change', () => {
    const query = new URLSearchParams({ category: select.value });
    for (const name of KEPT) {
      const value = form.elements[name]?.value?.trim();
      if (value) query.set(name, value);
    }
    navigate(`${form.getAttribute('action')}?${query}`);
  });
}
