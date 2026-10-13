// Accessibility settings applied before the page paints, so a chosen text size or contrast never
// flashes. This is the one model of the settings; the toolbar module reads it from window.bxA11y.
(function () {
  var KEY = 'bx-a11y';
  var STEPS = { scale: [1, 1.1, 1.2, 1.3, 1.45, 1.6], text: [1, 1.1, 1.2, 1.35, 1.5], line: [0, 1.6, 1.9, 2.2], spacing: [0, 0.03, 0.06, 0.1] };
  var SWITCHES = ['titles', 'links', 'still', 'noimg', 'mute', 'guide', 'mask', 'cursor', 'focus'];
  var ALIGNS = ['left', 'center', 'right'];
  // Colors a member may paint text, titles or backgrounds with.
  var PALETTE = ['#1a6ff2', '#7b4bd1', '#d43c3c', '#e07b22', '#2f8fa8', '#3f7f32', '#ffffff', '#000000'];
  var PAINTS = { ink: 'a11y-ink', heading: 'a11y-heading', paper: 'a11y-paper' };
  var COLORS = ['dark', 'light', 'high', 'mono', 'saturate', 'desaturate'];
  var FONTS = ['readable', 'dyslexia'];
  var PROFILES = {
    seizure: { still: true, color: 'desaturate' },
    vision: { scale: 2, color: 'high', titles: true, links: true, focus: true },
    adhd: { mask: true, still: true },
    cognitive: { font: 'readable', guide: true, titles: true, links: true },
    keyboard: { focus: true },
    reader: { focus: true, links: true, still: true },
    older: { scale: 1, text: 2, font: 'readable', cursor: true, focus: true },
    dyslexia: { font: 'dyslexia', spacing: 1, line: 1, align: 'left' }
  };
  function defaults() { return { scale: 0, text: 0, line: 0, spacing: 0, font: '', color: '', align: '', ink: '', heading: '', paper: '' }; }
  function clean(given) {
    var settings = defaults();
    if (!given || typeof given !== 'object') return settings;
    for (var name in STEPS) {
      var value = Number(given[name]);
      if (Number.isInteger(value) && value >= 0 && value < STEPS[name].length) settings[name] = value;
    }
    if (FONTS.indexOf(given.font) >= 0) settings.font = given.font;
    if (COLORS.indexOf(given.color) >= 0) settings.color = given.color;
    // Earlier versions stored alignment as a switch meaning left.
    if (given.align === true) settings.align = 'left';
    else if (ALIGNS.indexOf(given.align) >= 0) settings.align = given.align;
    for (var paint in PAINTS) if (PALETTE.indexOf(given[paint]) >= 0) settings[paint] = given[paint];
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
    if (settings.align) added.push('a11y-align-' + settings.align);
    for (var paint in PAINTS) {
      if (settings[paint]) { added.push(PAINTS[paint]); root.style.setProperty('--' + PAINTS[paint], settings[paint]); } else root.style.removeProperty('--' + PAINTS[paint]);
    }
    if (settings.color) added.push('a11y-color-' + settings.color);
    SWITCHES.forEach(function (name) { if (settings[name]) added.push('a11y-' + name); });
    root.className = kept.concat(added).join(' ');
    scaleText(STEPS.text[settings.text] || 1, root.ownerDocument || document);
  }
  // Font sizing scales each text element from the size the page gave it, so sizes set in pixels
  // grow too; the original size is remembered on the element and restored at the default.
  function scaleText(factor, doc) {
    if (!doc.body) {
      if (factor !== 1 && doc.addEventListener) doc.addEventListener('DOMContentLoaded', function () { scaleText(factor, doc); }, { once: true });
      return;
    }
    var nodes = [].filter.call(doc.body.querySelectorAll('h1, h2, h3, h4, h5, h6, p, li, a, span, label, small, strong, em, b, dt, dd, td, th, blockquote, figcaption, button, input, select, textarea, legend, summary'), function (node) { return !node.closest('.a11y'); });
    if (factor === 1) {
      nodes.forEach(function (node) {
        var original = node.getAttribute('data-a11y-size');
        if (original === null) return;
        node.style.fontSize = original === 'auto' ? '' : original;
        node.removeAttribute('data-a11y-size');
        node.removeAttribute('data-a11y-px');
      });
      return;
    }
    // Every size is measured before any is changed, so nested text never grows twice.
    nodes.forEach(function (node) {
      if (node.hasAttribute('data-a11y-size')) return;
      node.setAttribute('data-a11y-size', node.style.fontSize || 'auto');
      node.setAttribute('data-a11y-px', String(parseFloat(getComputedStyle(node).fontSize) || 16));
    });
    nodes.forEach(function (node) { node.style.fontSize = (Number(node.getAttribute('data-a11y-px')) * factor).toFixed(1) + 'px'; });
  }
  window.bxA11y = { KEY: KEY, STEPS: STEPS, SWITCHES: SWITCHES, COLORS: COLORS, ALIGNS: ALIGNS, PALETTE: PALETTE, PAINTS: PAINTS, PROFILES: PROFILES, scaleText: scaleText, defaults: defaults, clean: clean, read: read, save: save, apply: apply };
  apply(read());
})();
