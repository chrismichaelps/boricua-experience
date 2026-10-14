// The accessibility toolbar: profiles, stepped text settings, switches, one color mode, a reading
// guide and mask that follow the pointer or keyboard focus, and a map of the page's headings and
// regions. Settings live in this browser through the model the boot script defines.
// Hiding tucks the launcher into a small tab at the screen edge; it never leaves the page, so the
// tools stay one tap or Alt+A away.
const TUCKED_KEY = 'bx-a11y-tucked';

export function a11y(root, view = window) {
  const model = view.bxA11y;
  if (!model) return;
  const doc = view.document;
  const launch = root.querySelector('.a11y-launch');
  const panel = root.querySelector('.a11y-panel');
  let settings = model.read();
  let overlays = null;
  let returnFocus = null;

  const tuck = (on) => {
    root.classList.toggle('is-tucked', on);
    launch.setAttribute('aria-label', on ? root.dataset.show : root.dataset.open);
    try { if (on) view.localStorage.setItem(TUCKED_KEY, '1'); else view.localStorage.removeItem(TUCKED_KEY); } catch { /* tucked for this page */ }
  };
  // A flag from the earlier session-wide hide is dropped: it removed the launcher entirely.
  try { view.sessionStorage.removeItem('bx-a11y-hidden'); } catch { /* nothing kept */ }
  root.hidden = false;
  try { if (view.localStorage.getItem(TUCKED_KEY) === '1') tuck(true); } catch { /* stays out */ }

  const label = (name) => {
    const value = settings[name];
    if (!value) return root.dataset.default;
    if (name === 'scale' || name === 'text') return `${Math.round(model.STEPS[name][value] * 100)}%`;
    return `+${value}`;
  };
  const profileOn = (name) => Object.entries(model.PROFILES[name]).every(([key, value]) => (typeof value === 'number' ? settings[key] >= value : settings[key] === value));
  const paint = () => {
    for (const button of root.querySelectorAll('[data-toggle]')) {
      const [name, value] = button.dataset.toggle.split(':');
      button.setAttribute('aria-pressed', String(value ? settings[name] === value : settings[name] === true));
    }
    for (const button of root.querySelectorAll('[data-color]')) button.setAttribute('aria-pressed', String(settings.color === button.dataset.color));
    for (const button of root.querySelectorAll('[data-paint]')) {
      const [name, value] = button.dataset.paint.split('=');
      button.setAttribute('aria-pressed', String(value ? settings[name] === value : !settings[name]));
    }
    for (const button of root.querySelectorAll('[data-profile]')) button.setAttribute('aria-pressed', String(profileOn(button.dataset.profile)));
    for (const output of root.querySelectorAll('[data-value]:not(.picker-option)')) output.textContent = label(output.dataset.value);
    for (const button of root.querySelectorAll('[data-step]')) {
      const steps = model.STEPS[button.dataset.step];
      const next = settings[button.dataset.step] + Number(button.dataset.by);
      button.disabled = next < 0 || next >= steps.length;
    }
    launch.classList.toggle('is-active', JSON.stringify(settings) !== JSON.stringify(model.defaults()));
  };
  const commit = (next) => {
    settings = model.clean(next);
    model.save(settings);
    model.apply(settings, doc.documentElement);
    followers();
    paint();
    doc.dispatchEvent(new view.CustomEvent('bx:a11y', { detail: { settings } }));
  };

  // The reading guide is a bar at the pointer; the mask darkens all but a band around it.
  const followers = () => {
    const wanted = settings.guide || settings.mask;
    if (!wanted && overlays) { overlays.remove(); overlays = null; return; }
    if (!wanted) return;
    if (!overlays) {
      overlays = doc.createElement('div');
      overlays.className = 'a11y-overlays';
      overlays.setAttribute('aria-hidden', 'true');
      overlays.innerHTML = '<div class="a11y-guide-bar"></div><div class="a11y-mask-top"></div><div class="a11y-mask-bottom"></div>';
      doc.body.append(overlays);
      overlays.style.setProperty('--a11y-y', `${Math.round(view.innerHeight / 3)}px`);
    }
    overlays.classList.toggle('has-guide', Boolean(settings.guide));
    overlays.classList.toggle('has-mask', Boolean(settings.mask));
  };
  const track = (y) => overlays?.style.setProperty('--a11y-y', `${Math.round(y)}px`);
  view.addEventListener('pointermove', (event) => track(event.clientY), { passive: true });
  view.addEventListener('touchmove', (event) => track(event.touches[0]?.clientY ?? 0), { passive: true });
  doc.addEventListener('focusin', (event) => {
    if (!overlays || panel.contains(event.target)) return;
    const box = event.target.getBoundingClientRect?.();
    if (box) track(box.top + box.height / 2);
  });

  root.addEventListener('click', (event) => {
    const button = event.target.closest('button');
    if (!button || !root.contains(button)) return;
    if (button.dataset.toggle) {
      const [name, value] = button.dataset.toggle.split(':');
      if (value) commit({ ...settings, [name]: settings[name] === value ? '' : value });
      else commit({ ...settings, [name]: !settings[name] });
    } else if (button.dataset.paint) {
      const [name, value] = button.dataset.paint.split('=');
      commit({ ...settings, [name]: value || '' });
    } else if (button.dataset.color) {
      commit({ ...settings, color: settings.color === button.dataset.color ? '' : button.dataset.color });
    } else if (button.dataset.step) {
      commit({ ...settings, [button.dataset.step]: settings[button.dataset.step] + Number(button.dataset.by) });
    } else if (button.dataset.profile) {
      const profile = model.PROFILES[button.dataset.profile];
      const next = { ...settings };
      const on = profileOn(button.dataset.profile);
      for (const [key, value] of Object.entries(profile)) next[key] = on ? model.defaults()[key] ?? false : value;
      commit(next);
    } else if (button.dataset.a11y === 'reset') {
      commit(model.defaults());
    } else if (button.dataset.a11y === 'hide') {
      close();
      tuck(true);
      launch.focus({ preventScroll: true });
    } else if (button.dataset.a11y === 'close') {
      close();
    }
  });

  const open = () => {
    returnFocus = doc.activeElement;
    panel.showModal();
    launch.setAttribute('aria-expanded', 'true');
    panel.querySelector('.a11y-onoff')?.focus({ preventScroll: true });
  };
  const close = () => {
    if (panel.open) panel.close();
    launch.setAttribute('aria-expanded', 'false');
    returnFocus?.focus?.({ preventScroll: true });
  };
  launch.addEventListener('click', () => {
    if (root.classList.contains('is-tucked')) { tuck(false); open(); return; }
    if (panel.open) close(); else open();
  });

  // Useful links: a short list of the site's main pages, reached from inside the panel.
  const links = root.querySelector('[data-a11y="links"]');
  links?.addEventListener('change', () => { if (links.value) view.location.assign(links.value); });
  panel.addEventListener('cancel', (event) => { event.preventDefault(); close(); });
  panel.addEventListener('click', (event) => { if (event.target === panel) close(); });

  // The page map: headings and regions of the page, each a link that moves focus there.
  const structure = root.querySelector('[data-a11y="structure"]');
  structure?.addEventListener('toggle', () => {
    if (!structure.open) return;
    const list = structure.querySelector('.a11y-structure-list');
    list.replaceChildren();
    const targets = [...doc.querySelectorAll('main h1, main h2, main h3, main [role="region"][aria-label], main section[aria-label], nav[aria-label], footer')]
      .filter((node) => !root.contains(node) && node.getClientRects().length);
    targets.forEach((node, index) => {
      const item = doc.createElement('li');
      const link = doc.createElement('button');
      link.type = 'button';
      const level = /^H[1-3]$/.test(node.tagName) ? node.tagName.toLowerCase() : 'region';
      item.className = `a11y-map-${level}`;
      link.textContent = level === 'region' ? `${root.dataset.landmark}: ${node.getAttribute('aria-label') || node.tagName.toLowerCase()}` : node.textContent.trim().replace(/\s+/g, ' ');
      link.addEventListener('click', () => {
        if (!node.id) node.id = `a11y-target-${index}`;
        if (!node.hasAttribute('tabindex')) node.setAttribute('tabindex', '-1');
        returnFocus = node;
        close();
        node.scrollIntoView({ block: 'start', behavior: settings.still ? 'instant' : 'smooth' });
      });
      item.append(link);
      list.append(item);
    });
  });

  // Alt+A opens and closes the toolbar from anywhere, without a mouse.
  doc.addEventListener('keydown', (event) => {
    if (event.altKey && !event.ctrlKey && !event.metaKey && (event.key === 'a' || event.key === 'A' || event.code === 'KeyA')) {
      event.preventDefault();
      if (root.classList.contains('is-tucked')) tuck(false);
      if (panel.open) close(); else open();
    }
  });

  launch.setAttribute('aria-expanded', 'false');
  launch.setAttribute('aria-keyshortcuts', 'Alt+A');
  followers();
  paint();
}
