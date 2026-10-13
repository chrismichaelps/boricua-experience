// Accessibility settings applied before the page paints, so a chosen text size or contrast never
// flashes. This is the one model of the settings; the toolbar module reads it from window.bxA11y.
(function () {
  var KEY = 'bx-a11y';
  var STEPS = { scale: [1, 1.1, 1.2, 1.3, 1.45, 1.6], line: [0, 1.6, 1.9, 2.2], spacing: [0, 0.03, 0.06, 0.1] };
  var SWITCHES = ['titles', 'links', 'align', 'still', 'noimg', 'mute', 'guide', 'mask', 'cursor', 'focus'];
  var COLORS = ['dark', 'light', 'high', 'mono', 'saturate', 'desaturate'];
  var FONTS = ['readable', 'dyslexia'];
  var PROFILES = {
    seizure: { still: true, color: 'desaturate' },
    vision: { scale: 2, color: 'high', titles: true, links: true, focus: true },
    adhd: { mask: true, still: true },
    cognitive: { font: 'readable', guide: true, titles: true, links: true },
    keyboard: { focus: true },
    dyslexia: { font: 'dyslexia', spacing: 1, line: 1, align: true }
  };
  function defaults() { return { scale: 0, line: 0, spacing: 0, font: '', color: '' }; }
  function clean(given) {
    var settings = defaults();
    if (!given || typeof given !== 'object') return settings;
    for (var name in STEPS) {
      var value = Number(given[name]);
      if (Number.isInteger(value) && value >= 0 && value < STEPS[name].length) settings[name] = value;
    }
    if (FONTS.indexOf(given.font) >= 0) settings.font = given.font;
    if (COLORS.indexOf(given.color) >= 0) settings.color = given.color;
    SWITCHES.forEach(function (name) { if (given[name] === true) settings[name] = true; });
    return settings;
  }
  function read() {
    try { return clean(JSON.parse(localStorage.getItem(KEY) || 'null')); } catch (error) { return defaults(); }
  }
  function save(settings) {
    try { localStorage.setItem(KEY, JSON.stringify(clean(settings))); } catch (error) { /* applied for this page only */ }
  }
  function apply(settings, root) {
    root = root || document.documentElement;
    var kept = root.className.split(/\s+/).filter(function (name) { return name && name.indexOf('a11y-') !== 0; });
    var added = [];
    if (settings.scale) { added.push('a11y-scaled'); root.style.setProperty('--a11y-zoom', String(STEPS.scale[settings.scale])); } else root.style.removeProperty('--a11y-zoom');
    if (settings.line) { added.push('a11y-line'); root.style.setProperty('--a11y-line', String(STEPS.line[settings.line])); } else root.style.removeProperty('--a11y-line');
    if (settings.spacing) { added.push('a11y-spacing'); root.style.setProperty('--a11y-spacing', STEPS.spacing[settings.spacing] + 'em'); } else root.style.removeProperty('--a11y-spacing');
    if (settings.font) added.push('a11y-font-' + settings.font);
    if (settings.color) added.push('a11y-color-' + settings.color);
    SWITCHES.forEach(function (name) { if (settings[name]) added.push('a11y-' + name); });
    root.className = kept.concat(added).join(' ');
  }
  window.bxA11y = { KEY: KEY, STEPS: STEPS, SWITCHES: SWITCHES, COLORS: COLORS, PROFILES: PROFILES, defaults: defaults, clean: clean, read: read, save: save, apply: apply };
  apply(read());
})();
