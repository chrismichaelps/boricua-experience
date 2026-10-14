// Draws every achievement badge into public/assets/badges/<name>.svg in the style of the cotorra
// logo: flat vectors in its palette, round caps, and gentle built-in motion. A badge is a rarity
// frame (gradient, ring, sparkles) around one motif and, for tiers, a number ribbon. New badges,
// seasonal ones included, are one entry in BADGES; run `node scripts/badges.mjs` and commit the file.
import { mkdirSync, writeFileSync } from 'node:fs';

const OUT = new URL('../public/assets/badges/', import.meta.url);

// The logo's palette.
const C = {
  leaf: '#2d7a33', green: '#3f9440', fern: '#54a83d', lime: '#6fc055', red: '#d93a31', coral: '#e8573f',
  cream: '#f7f4ea', sand: '#f1e6c8', beak: '#c7b48d', bark: '#8a5a2b', ink: '#26372c', white: '#ffffff',
  sea: '#1878ec', deep: '#0f5cc0', night: '#163a5c', gold: '#f2b630', sun: '#ffd257', violet: '#7b4bd1',
};

// Rarity frames: background, ring and sparkle colors.
const RARITY = {
  common: { bg: ['#f3f9ea', '#cfe8bb'], ring: ['#8fd16f', '#3f9440', '#2d7a33'], spark: '#6fc055', sparks: 1 },
  rare: { bg: ['#eef6ff', '#c4dcf7'], ring: ['#7cbcff', '#1878ec', '#0f5cc0'], spark: '#5aa6f5', sparks: 2 },
  epic: { bg: ['#f6efff', '#dccaf7'], ring: ['#c3a3f5', '#7b4bd1', '#55309f'], spark: '#a77ce8', sparks: 3 },
  legendary: { bg: ['#fff7df', '#f8dc95'], ring: ['#ffe28a', '#e0a100', '#a86c00'], spark: '#f2b630', sparks: 4 },
};

// Motion shared by every badge. The same classes are defined in badges.css for badges drawn inline.
export const STYLE = `.b-float{animation:b-float 4.8s ease-in-out infinite}
.b-sway{animation:b-sway 5.6s ease-in-out infinite;transform-box:fill-box;transform-origin:50% 100%}
.b-pulse{animation:b-pulse 3.6s ease-in-out infinite}
.b-twinkle{animation:b-twinkle 2.8s ease-in-out infinite;transform-box:fill-box;transform-origin:center}
.b-spin{animation:b-spin 28s linear infinite;transform-origin:60px 60px}
.b-blink{animation:b-blink 5.2s 1.2s infinite;transform-box:fill-box;transform-origin:center;transform:scaleY(0)}
@keyframes b-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-2.5px)}}
@keyframes b-sway{0%,100%{transform:rotate(-3deg)}50%{transform:rotate(3deg)}}
@keyframes b-pulse{0%,100%{opacity:.55}50%{opacity:1}}
@keyframes b-twinkle{0%,100%{opacity:.25;transform:scale(.7)}50%{opacity:1;transform:scale(1)}}
@keyframes b-spin{to{transform:rotate(360deg)}}
@keyframes b-blink{0%,92%,100%{transform:scaleY(0)}95%{transform:scaleY(1)}}
@media (prefers-reduced-motion:reduce){.b-float,.b-sway,.b-pulse,.b-twinkle,.b-spin,.b-blink{animation:none}}`;

const sparkle = (x, y, r, color, delay) => `<path class="b-twinkle" style="animation-delay:${delay}s" fill="${color}" d="M${x} ${y - r}Q${x + r * 0.22} ${y - r * 0.22} ${x + r} ${y}Q${x + r * 0.22} ${y + r * 0.22} ${x} ${y + r}Q${x - r * 0.22} ${y + r * 0.22} ${x - r} ${y}Q${x - r * 0.22} ${y - r * 0.22} ${x} ${y - r}Z"/>`;

// The cotorra head from the logo, scaled to sit inside a badge.
const cotorraHead = (id, x = 60, y = 58, s = 0.6) => `<g transform="translate(${x - 50 * s} ${y - 38 * s}) scale(${s})"><path d="M16 62C14 35 29 14 50 14C71 14 86 35 84 62Z" fill="url(#${id}-crown)"/><path d="M44 16C45 10 51 8 55 12C52 12 49 13 47 17Z" fill="${C.leaf}"/><path d="M39 31C43 28.5 57 28.5 61 31L59.5 34.5C55 32.8 45 32.8 40.5 34.5Z" fill="${C.red}"/><circle cx="35" cy="38" r="7.2" fill="${C.cream}"/><circle cx="65" cy="38" r="7.2" fill="${C.cream}"/><circle cx="35.6" cy="38.4" r="4.3" fill="${C.bark}"/><circle cx="64.4" cy="38.4" r="4.3" fill="${C.bark}"/><circle cx="35.8" cy="38.6" r="2.7" fill="#1d140e"/><circle cx="64.2" cy="38.6" r="2.7" fill="#1d140e"/><circle cx="37.1" cy="37.2" r="1.1" fill="#fff"/><circle cx="65.5" cy="37.2" r="1.1" fill="#fff"/><g class="b-blink" fill="${C.green}"><circle cx="35" cy="38" r="7.6"/><circle cx="65" cy="38" r="7.6"/></g><path d="M42.5 37C42.5 33.5 57.5 33.5 57.5 37C57.5 45.5 54.5 52 50 56C45.5 52 42.5 45.5 42.5 37Z" fill="${C.sand}"/><path d="M50 56C48.6 54.6 47.6 53 47 51.4C48.8 52.6 51.2 52.6 53 51.4C52.4 53 51.4 54.6 50 56Z" fill="${C.beak}"/></g>`;
const crownDefs = (id) => `<radialGradient id="${id}-crown" cx=".4" cy=".28" r=".85"><stop offset="0" stop-color="${C.lime}"/><stop offset=".65" stop-color="${C.green}"/><stop offset="1" stop-color="${C.leaf}"/></radialGradient>`;

// Motifs, each drawn around (60, 58) inside roughly 32..88 by 28..84. `id` prefixes any ids.
const MOTIFS = {
  cotorra: (id) => cotorraHead(id),
  'cotorra-crown': (id) => `${cotorraHead(id, 60, 62, 0.56)}<path class="b-float" d="M44 34L48 24L54 31L60 21L66 31L72 24L76 34Z" fill="${C.gold}" stroke="#a86c00" stroke-width="1.5" stroke-linejoin="round"/>`,
  'cotorra-orbit': (id) => `${cotorraHead(id, 60, 60, 0.46)}<g class="b-spin"><path d="M28 60A32 14 0 0 0 92 60" fill="none" stroke="${C.sea}" stroke-width="3.5" stroke-linecap="round"/><path d="M88 52L93 61L83 63" fill="none" stroke="${C.sea}" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/></g>`,
  coqui: () => `<g class="b-float"><ellipse cx="60" cy="74" rx="22" ry="6" fill="${C.fern}" opacity=".45"/><path d="M42 70C40 58 48 46 60 46C72 46 80 58 78 70C72 74 48 74 42 70Z" fill="#b07a3a"/><path d="M47 69C44 72 40 73 37 72M73 69C76 72 80 73 83 72" stroke="#8a5a2b" stroke-width="3" stroke-linecap="round" fill="none"/><circle cx="50" cy="46" r="7" fill="#b07a3a"/><circle cx="70" cy="46" r="7" fill="#b07a3a"/><circle cx="50" cy="45" r="4.4" fill="${C.ink}"/><circle cx="70" cy="45" r="4.4" fill="${C.ink}"/><circle cx="51.3" cy="43.6" r="1.3" fill="#fff"/><circle cx="71.3" cy="43.6" r="1.3" fill="#fff"/><path d="M53 58Q60 62 67 58" stroke="#6b4423" stroke-width="2" stroke-linecap="round" fill="none"/><path d="M48 62Q52 66 56 64M64 64Q68 66 72 62" stroke="#c99a5b" stroke-width="2" stroke-linecap="round" fill="none"/></g><g class="b-pulse"><path d="M82 34Q88 38 82 42M86 30Q95 38 86 46" stroke="${C.sea}" stroke-width="2.5" stroke-linecap="round" fill="none"/></g>`,
  flamboyan: () => `<g class="b-sway"><path d="M60 84V64" stroke="${C.leaf}" stroke-width="3.5" stroke-linecap="round"/><path d="M60 72C52 70 46 72 42 78C50 80 56 78 60 72ZM60 70C68 66 74 68 78 74C70 76 64 75 60 70Z" fill="${C.fern}"/>${[0, 72, 144, 216, 288].map((a) => `<ellipse cx="60" cy="38" rx="9" ry="13" fill="${C.coral}" transform="rotate(${a} 60 50)"/>`).join('')}<ellipse cx="60" cy="38" rx="5" ry="9" fill="#f7d24a" transform="rotate(0 60 50)"/><circle cx="60" cy="50" r="6" fill="${C.red}"/><path d="M60 50L56 40M60 50L64 41M60 50L60 38" stroke="#f7d24a" stroke-width="1.6" stroke-linecap="round"/></g>`,
  'flamboyan-tree': () => `<path d="M60 84V60M60 66L50 58M60 64L71 56" stroke="${C.bark}" stroke-width="4" stroke-linecap="round"/><g class="b-sway"><path d="M30 54C30 40 44 32 60 32C76 32 90 40 90 54C80 60 40 60 30 54Z" fill="${C.coral}"/><path d="M36 50C42 44 52 42 60 42C70 42 80 45 85 51" stroke="${C.red}" stroke-width="3" stroke-linecap="round" fill="none"/>${[[40, 46], [52, 38], [66, 37], [78, 45], [58, 50]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2.4" fill="#f7d24a"/>`).join('')}</g><path d="M28 84H92" stroke="${C.fern}" stroke-width="3" stroke-linecap="round"/>`,
  vejigante: () => `<g class="b-float"><path d="M40 44L30 26L46 36ZM50 36L46 18L58 33ZM70 36L74 18L62 33ZM80 44L90 26L74 36ZM60 34L60 14L66 32Z" fill="${C.gold}" stroke="#a86c00" stroke-width="1.2" stroke-linejoin="round"/><path d="M36 50C36 36 48 30 60 30C72 30 84 36 84 50C84 66 74 80 60 80C46 80 36 66 36 50Z" fill="${C.red}"/><circle cx="49" cy="50" r="6" fill="${C.cream}"/><circle cx="71" cy="50" r="6" fill="${C.cream}"/><circle cx="49" cy="50" r="2.6" fill="${C.ink}"/><circle cx="71" cy="50" r="2.6" fill="${C.ink}"/><path d="M48 66Q60 74 72 66Q60 70 48 66Z" fill="${C.cream}"/><path d="M52 66V69M57 67V71M63 67V71M68 66V69" stroke="${C.ink}" stroke-width="1.4"/>${[[42, 40], [78, 40], [60, 39], [44, 62], [76, 62]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2.2" fill="${C.gold}"/>`).join('')}</g>`,
  garita: () => `<path d="M24 80Q42 74 60 80T96 80V90H24Z" fill="${C.sea}" opacity=".35"/><path d="M34 78H86V84H34Z" fill="#c9b07e"/><g class="b-float"><path d="M44 46H76V78H44Z" fill="${C.sand}"/><path d="M42 46H78L76 50H44Z" fill="#d9c79c"/><path d="M44 46C44 34 52 28 60 28C68 28 76 34 76 46Z" fill="#e3d3a8"/><path d="M60 22V28" stroke="${C.bark}" stroke-width="2" stroke-linecap="round"/><circle cx="60" cy="21" r="2.4" fill="${C.red}"/><path d="M57 56H63V68H57Z" fill="${C.ink}" rx="3"/><path d="M44 72H76" stroke="#c9b07e" stroke-width="2"/></g>`,
  yunque: () => `<path d="M24 82L46 44L58 60L70 36L96 82Z" fill="${C.leaf}"/><path d="M46 44L52 54L58 60L54 52ZM70 36L76 48L82 58L74 50Z" fill="${C.lime}" opacity=".7"/><path d="M30 82L44 66L56 82Z" fill="${C.green}"/><g class="b-float"><path d="M50 34C50 28 56 25 61 28C63 23 72 23 74 30C80 30 82 37 77 40H52C48 40 47 35 50 34Z" fill="#fff"/></g>${[[56, 46, 0], [64, 50, 0.6], [72, 46, 1.2]].map(([x, y, d]) => `<path class="b-twinkle" style="animation-delay:${d}s" d="M${x} ${y}l-1.5 4" stroke="${C.sea}" stroke-width="2.4" stroke-linecap="round"/>`).join('')}`,
  bio: () => `<circle cx="60" cy="60" r="40" fill="${C.night}" opacity=".18"/><path d="M76 30A11 11 0 1 0 86 44A9 9 0 1 1 76 30Z" fill="${C.sun}"/><path d="M24 62Q36 54 48 62T72 62T96 62V86H24Z" fill="${C.night}"/><path d="M24 70Q36 64 48 70T72 70T96 70" stroke="#3ad1e8" stroke-width="2.6" fill="none" class="b-pulse"/>${[[36, 76, 0], [52, 80, 0.5], [66, 75, 1], [80, 79, 1.5], [44, 69, 2], [72, 68, 0.8]].map(([x, y, d]) => `<circle class="b-twinkle" style="animation-delay:${d}s" cx="${x}" cy="${y}" r="2.2" fill="#7ef3ff"/>`).join('')}`,
  piragua: () => `<g class="b-float"><path d="M44 44C44 32 52 26 60 26C68 26 76 32 76 44Z" fill="${C.red}"/><path d="M52 30C56 28 60 28 62 30C58 34 54 40 54 44H44C44 38 47 33 52 30Z" fill="${C.sea}"/><path d="M42 44H78L60 84Z" fill="${C.cream}" stroke="${C.beak}" stroke-width="1.6" stroke-linejoin="round"/><path d="M48 52L72 52M51 60L69 60M54 68L66 68" stroke="${C.beak}" stroke-width="1.4"/><circle cx="66" cy="36" r="2" fill="#fff" opacity=".8"/></g>`,
  coffee: () => `<path d="M22 72L40 46L52 60L66 40L98 72Z" fill="${C.green}"/><path d="M40 46L46 54M66 40L72 50" stroke="${C.lime}" stroke-width="2.5" stroke-linecap="round"/><path d="M40 62H76V70C76 80 68 86 58 86C48 86 40 80 40 70Z" fill="${C.bark}"/><path d="M76 66C84 66 84 76 76 76" stroke="${C.bark}" stroke-width="4" fill="none"/><path d="M40 62H76" stroke="#6b4423" stroke-width="3" stroke-linecap="round"/><g class="b-float">${[[50, 0], [58, 0.7], [66, 1.4]].map(([x, d]) => `<path class="b-pulse" style="animation-delay:${d}s" d="M${x} 56C${x - 4} 50 ${x + 4} 46 ${x} 40" stroke="${C.sand}" stroke-width="2.6" stroke-linecap="round" fill="none"/>`).join('')}</g>`,
  island: () => `<path d="M22 72Q40 67 60 71T98 71" stroke="${C.sea}" stroke-width="2.2" fill="none" opacity=".5" class="b-pulse"/><g class="b-float"><path d="M24.5 51.2L27.6 49.1L34 48.9L41 48.3L48 48.7L55 48.4L62 48.7L69 48.5L76 49.1L82 49.6L87 50.4L90.6 52.1L91.4 54.6L89.2 56.9L88 60.4L84.6 62.4L79 63.1L73 63.4L67.4 64.1L61 64.4L55.6 65.4L50.6 65.1L45.4 64.3L39.6 64.6L33.6 64.4L30.4 63.6L28.6 61.4L26.2 58.6L25.4 54.8Z" fill="${C.fern}" stroke="${C.leaf}" stroke-width="1.6" stroke-linejoin="round"/><path d="M33 58.2C41 55.4 49 57.6 57 55.6C65 53.6 73 56 82 54.8" stroke="${C.leaf}" stroke-width="2" stroke-linecap="round" fill="none" opacity=".75"/><path d="M28.4 50.6L40 49.8L54 49.6" stroke="${C.lime}" stroke-width="1.4" stroke-linecap="round" fill="none" opacity=".9"/><path d="M93.6 60.6C95.4 59.8 99 60 100.2 60.8C99 61.8 95.4 62 93.6 60.6Z" fill="${C.fern}" stroke="${C.leaf}" stroke-width="1"/><path d="M96.2 54.4C97.4 53.8 99.2 54.2 99.6 55C98.6 55.8 96.8 55.6 96.2 54.4Z" fill="${C.fern}" stroke="${C.leaf}" stroke-width="1"/><circle cx="16.6" cy="58" r="1.3" fill="${C.fern}" stroke="${C.leaf}" stroke-width=".8"/></g>`,
  'island-small': () => `<path d="M24 70Q42 64 60 70T96 70V88H24Z" fill="${C.sea}" opacity=".3"/><g class="b-float"><path d="M34 64C36 56 46 54 54 56C60 58 60 64 54 66C46 68 36 68 34 64Z" fill="${C.fern}" stroke="${C.leaf}" stroke-width="2"/><path d="M66 60C68 54 78 52 84 56C88 60 84 64 78 64C72 65 66 64 66 60Z" fill="${C.lime}" stroke="${C.leaf}" stroke-width="2"/><path d="M46 56V44M46 44C42 42 38 44 36 47M46 44C50 41 55 42 57 45M46 44C45 40 47 37 50 36" stroke="${C.leaf}" stroke-width="2.4" stroke-linecap="round" fill="none"/></g>`,
  pin: () => `<ellipse cx="60" cy="82" rx="12" ry="3.5" fill="${C.ink}" opacity=".18"/><g class="b-float"><path d="M60 82C60 82 40 62 40 48C40 36 49 28 60 28C71 28 80 36 80 48C80 62 60 82 60 82Z" fill="${C.red}"/><circle cx="60" cy="48" r="8.5" fill="${C.cream}"/><circle cx="60" cy="48" r="4" fill="${C.green}"/></g>`,
  'home-pin': () => `<ellipse cx="60" cy="82" rx="12" ry="3.5" fill="${C.ink}" opacity=".18"/><g class="b-float"><path d="M60 82C60 82 40 62 40 48C40 36 49 28 60 28C71 28 80 36 80 48C80 62 60 82 60 82Z" fill="${C.green}"/><path d="M51 49L60 41L69 49V57H51Z" fill="${C.cream}"/><path d="M57 57V51H63V57" fill="${C.red}"/></g>`,
  compass: () => `<circle cx="60" cy="58" r="26" fill="${C.cream}" stroke="${C.bark}" stroke-width="3"/><g class="b-spin" style="animation-duration:18s"><path d="M60 36L66 58L60 80L54 58Z" fill="${C.red}"/><path d="M60 58L66 58L60 80L54 58Z" fill="${C.ink}" opacity=".85"/></g><circle cx="60" cy="58" r="3" fill="${C.gold}"/><path d="M60 30V34M60 82V86M32 58H36M84 58H88" stroke="${C.bark}" stroke-width="2.6" stroke-linecap="round"/>`,
  map: () => `<g class="b-float"><path d="M32 38L48 32L64 38L82 32V78L64 84L48 78L32 84Z" fill="${C.sand}" stroke="${C.beak}" stroke-width="2" stroke-linejoin="round"/><path d="M48 32V78M64 38V84" stroke="${C.beak}" stroke-width="2"/><path d="M38 72C44 64 50 66 54 58S66 50 74 44" stroke="${C.red}" stroke-width="2.6" stroke-dasharray="4 4" fill="none" stroke-linecap="round"/><path d="M71 40L77 46M77 40L71 46" stroke="${C.red}" stroke-width="3" stroke-linecap="round"/></g>`,
  radius: () => `<circle class="b-pulse" cx="60" cy="58" r="28" fill="none" stroke="${C.sea}" stroke-width="2.4" stroke-dasharray="5 5"/><circle cx="60" cy="58" r="17" fill="${C.sea}" opacity=".18"/><path d="M60 58L82 46" stroke="${C.deep}" stroke-width="2.4" stroke-linecap="round"/><path d="M60 64C60 64 52 56 52 50C52 45 56 42 60 42C64 42 68 45 68 50C68 56 60 64 60 64Z" fill="${C.red}"/><circle cx="60" cy="50" r="3" fill="${C.cream}"/>`,
  grid3d: () => `<path d="M30 66L60 52L90 66L60 80Z" fill="${C.lime}" opacity=".5"/><g class="b-float"><path d="M42 62V46L52 41V57Z" fill="${C.sand}"/><path d="M52 41L62 46V62L52 57Z" fill="#d9c79c"/><path d="M42 46L52 41L62 46L52 51Z" fill="${C.cream}"/><path d="M60 66V40L72 34V60Z" fill="${C.sea}" opacity=".85"/><path d="M72 34L82 39V65L72 60Z" fill="${C.deep}"/><path d="M60 40L72 34L82 39L70 45Z" fill="#7cbcff"/></g><path d="M38 34C44 30 50 30 56 34" stroke="${C.green}" stroke-width="2.4" fill="none" stroke-linecap="round"/>`,
  binoculars: () => `<g class="b-float"><circle cx="46" cy="64" r="13" fill="${C.ink}"/><circle cx="74" cy="64" r="13" fill="${C.ink}"/><circle cx="46" cy="64" r="8" fill="${C.sea}"/><circle cx="74" cy="64" r="8" fill="${C.sea}"/><path d="M40 50L44 36H52L54 50M80 50L76 36H68L66 50" fill="${C.ink}"/><path d="M54 52H66V60H54Z" fill="${C.ink}"/><circle cx="43" cy="61" r="2.4" fill="#fff" opacity=".8"/><circle cx="71" cy="61" r="2.4" fill="#fff" opacity=".8"/></g>`,
  ticket: () => `<g class="b-sway"><path d="M32 42H88V52A6 6 0 0 0 88 64V74H32V64A6 6 0 0 0 32 52Z" fill="${C.gold}" stroke="#a86c00" stroke-width="2" stroke-linejoin="round"/><path d="M70 44V72" stroke="#a86c00" stroke-width="2" stroke-dasharray="3 3"/><path d="M42 54H62M42 62H56" stroke="${C.bark}" stroke-width="3" stroke-linecap="round"/><path d="M79 54L80.5 57.5L84 58L81.3 60.3L82 64L79 62L76 64L76.7 60.3L74 58L77.5 57.5Z" fill="${C.red}"/></g>`,
  calendar: () => `<g class="b-float"><rect x="36" y="36" width="48" height="44" rx="7" fill="${C.cream}" stroke="${C.beak}" stroke-width="2"/><path d="M36 43A7 7 0 0 1 43 36H77A7 7 0 0 1 84 43V50H36Z" fill="${C.red}"/><path d="M48 32V40M72 32V40" stroke="${C.ink}" stroke-width="3" stroke-linecap="round"/>${[[46, 58], [56, 58], [66, 58], [76, 58], [46, 68], [56, 68]].map(([x, y]) => `<rect x="${x - 3}" y="${y - 3}" width="6" height="6" rx="1.5" fill="${C.beak}"/>`).join('')}<circle cx="70" cy="70" r="5" fill="${C.green}"/></g>`,
  'calendar-check': () => `<g class="b-float"><rect x="36" y="36" width="48" height="44" rx="7" fill="${C.cream}" stroke="${C.beak}" stroke-width="2"/><path d="M36 43A7 7 0 0 1 43 36H77A7 7 0 0 1 84 43V50H36Z" fill="${C.sea}"/><path d="M48 32V40M72 32V40" stroke="${C.ink}" stroke-width="3" stroke-linecap="round"/><path d="M48 64L56 71L72 57" stroke="${C.green}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" fill="none"/></g>`,
  casita: () => `<g class="b-float"><path d="M36 50L60 32L84 50Z" fill="${C.red}"/><path d="M40 50H80V80H40Z" fill="#f7c948"/><path d="M54 62H66V80H54Z" fill="${C.leaf}"/><path d="M44 56H52V64H44ZM68 56H76V64H68Z" fill="${C.sea}"/><path d="M40 50H80" stroke="#a86c00" stroke-width="2"/><path d="M36 80H84" stroke="${C.bark}" stroke-width="3" stroke-linecap="round"/></g><path d="M86 80V60M86 60C82 58 79 60 77 63M86 60C90 57 94 58 96 61" stroke="${C.leaf}" stroke-width="2.4" stroke-linecap="round" fill="none"/>`,
  people: () => `<g class="b-float"><circle cx="44" cy="46" r="8" fill="${C.bark}"/><path d="M30 76C30 64 36 58 44 58C52 58 58 64 58 76Z" fill="${C.sea}"/><circle cx="76" cy="46" r="8" fill="#c99a5b"/><path d="M62 76C62 64 68 58 76 58C84 58 90 64 90 76Z" fill="${C.red}"/><circle cx="60" cy="40" r="9" fill="#a0743c"/><path d="M44 78C44 62 51 54 60 54C69 54 76 62 76 78Z" fill="${C.green}"/></g>`,
  star: () => `<g class="b-float"><path d="M60 28L68.5 46.5L88.5 48.6L73.4 62L77.6 81.8L60 71.6L42.4 81.8L46.6 62L31.5 48.6L51.5 46.5Z" fill="${C.gold}" stroke="#a86c00" stroke-width="2" stroke-linejoin="round"/><path d="M60 38L64 49L52 50Z" fill="#fff" opacity=".5"/></g>`,
  heart: () => `<g class="b-float"><path d="M60 82C60 82 32 64 32 46C32 36 40 30 48 30C54 30 58 34 60 38C62 34 66 30 72 30C80 30 88 36 88 46C88 64 60 82 60 82Z" fill="${C.red}"/></g><path d="M44 42C44 38 47 36 50 36" stroke="#fff" stroke-width="3" stroke-linecap="round" fill="none" opacity=".7"/>`,
  bookmark: () => `<g class="b-float"><path d="M42 30H78V84L60 72L42 84Z" fill="${C.green}" stroke="${C.leaf}" stroke-width="2" stroke-linejoin="round"/><path d="M60 40L63.5 47L71 48L65.5 53L67 60.5L60 57L53 60.5L54.5 53L49 48L56.5 47Z" fill="${C.gold}"/></g>`,
  search: () => `<g class="b-float"><circle cx="54" cy="52" r="18" fill="${C.cream}" stroke="${C.ink}" stroke-width="5"/><path d="M67 65L84 82" stroke="${C.ink}" stroke-width="7" stroke-linecap="round"/><path d="M45 47C46 43 49 41 53 40" stroke="${C.sea}" stroke-width="3" stroke-linecap="round" fill="none"/></g>`,
  megaphone: () => `<g class="b-sway"><path d="M36 52H48L76 36V80L48 64H36Z" fill="${C.red}" stroke="#a52a23" stroke-width="2" stroke-linejoin="round"/><path d="M42 64L46 80H54L50 64" fill="${C.ink}"/><rect x="76" y="50" width="6" height="16" rx="3" fill="${C.ink}"/></g><g class="b-pulse"><path d="M86 46Q92 58 86 70M92 40Q101 58 92 76" stroke="${C.sea}" stroke-width="2.6" stroke-linecap="round" fill="none"/></g>`,
  chat: (id) => `<path d="M30 40C30 34 35 30 41 30H79C85 30 90 34 90 40V64C90 70 85 74 79 74H52L38 86V74C33 73 30 69 30 64Z" fill="${C.cream}" stroke="${C.beak}" stroke-width="2" stroke-linejoin="round"/>${cotorraHead(id, 60, 54, 0.4)}`,
  avatar: () => `<g class="b-float"><circle cx="60" cy="58" r="26" fill="${C.cream}" stroke="${C.green}" stroke-width="3"/><circle cx="60" cy="50" r="9" fill="#a0743c"/><path d="M42 76C44 66 51 62 60 62C69 62 76 66 78 76" fill="${C.sea}"/></g>`,
  'avatar-check': () => `<g class="b-float"><circle cx="56" cy="58" r="24" fill="${C.cream}" stroke="${C.green}" stroke-width="3"/><circle cx="56" cy="51" r="8" fill="#a0743c"/><path d="M40 74C42 65 48 61 56 61C64 61 70 65 72 74" fill="${C.sea}"/><circle cx="80" cy="74" r="11" fill="${C.green}"/><path d="M75 74L79 78L86 70" stroke="#fff" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round" fill="none"/></g>`,
  bell: () => `<g class="b-sway" style="transform-origin:50% 0%"><path d="M60 30C70 30 76 38 76 48V62L82 70H38L44 62V48C44 38 50 30 60 30Z" fill="${C.gold}" stroke="#a86c00" stroke-width="2" stroke-linejoin="round"/><circle cx="60" cy="76" r="5" fill="#a86c00"/><path d="M60 24V30" stroke="#a86c00" stroke-width="3" stroke-linecap="round"/></g>`,
  flame: () => `<g class="b-pulse" style="animation-duration:1.8s"><path d="M60 84C46 84 38 74 38 62C38 50 48 44 50 32C56 38 58 44 58 48C62 42 66 38 66 30C76 40 82 50 82 62C82 74 74 84 60 84Z" fill="${C.coral}"/></g><path d="M60 84C53 84 48 78 48 71C48 64 54 60 56 54C58 58 60 60 61 62C64 60 66 57 66 53C70 58 72 64 72 70C72 78 67 84 60 84Z" fill="${C.sun}"/>`,
  moon: () => `<path d="M68 30A26 26 0 1 0 86 70A22 22 0 1 1 68 30Z" fill="${C.sun}"/><path d="M58 50A4 4 0 1 0 58.1 50ZM50 64A3 3 0 1 0 50.1 64Z" fill="#e8c24a"/>`,
  sun: () => `<g class="b-spin" style="animation-duration:40s">${Array.from({ length: 12 }, (_, i) => `<path d="M60 26V34" stroke="${C.gold}" stroke-width="3.5" stroke-linecap="round" transform="rotate(${i * 30} 60 58)"/>`).join('')}</g><circle cx="60" cy="58" r="17" fill="${C.sun}" stroke="${C.gold}" stroke-width="3"/><path d="M28 80Q44 72 60 80T92 80" stroke="${C.sea}" stroke-width="3" fill="none" stroke-linecap="round"/>`,
  beach: () => `<path d="M24 74Q42 66 60 74T96 74V90H24Z" fill="${C.sea}" opacity=".55"/><path d="M24 82Q42 76 60 82T96 82" stroke="#fff" stroke-width="2.4" fill="none" class="b-pulse"/><g class="b-sway"><path d="M62 74C62 60 60 50 56 40" stroke="${C.bark}" stroke-width="4" stroke-linecap="round" fill="none"/><path d="M56 40C48 36 40 38 34 44C42 42 48 42 56 40ZM56 40C60 32 68 30 76 32C70 34 62 36 56 40ZM56 40C58 30 54 24 48 22C52 28 54 34 56 40ZM56 40C66 38 74 42 78 48C70 46 62 44 56 40Z" fill="${C.fern}"/></g><circle cx="82" cy="34" r="6" fill="${C.sun}"/>`,
  drum: () => `<g class="b-sway"><path d="M42 40H74V78H42Z" fill="${C.bark}"/><ellipse cx="58" cy="40" rx="16" ry="5" fill="${C.sand}" stroke="#6b4423" stroke-width="2"/><path d="M42 50H74M42 68H74" stroke="#6b4423" stroke-width="2.5"/><path d="M46 52L52 66M58 52L64 66M70 52L74 60" stroke="${C.gold}" stroke-width="2"/></g><g class="b-sway" style="animation-delay:-1.4s"><circle cx="82" cy="60" r="11" fill="${C.sand}" stroke="${C.red}" stroke-width="3.4"/>${[0, 72, 144, 216, 288].map((a) => `<circle cx="82" cy="47.5" r="2" fill="${C.gold}" transform="rotate(${a} 82 60)"/>`).join('')}</g>`,
  maracas: () => `<g class="b-sway"><path d="M50 72L44 86" stroke="${C.bark}" stroke-width="5" stroke-linecap="round"/><ellipse cx="54" cy="56" rx="12" ry="16" fill="${C.red}" transform="rotate(20 54 56)"/><path d="M48 48Q54 52 60 50" stroke="${C.gold}" stroke-width="2.4" fill="none"/></g><g class="b-sway" style="animation-delay:-2.8s"><path d="M70 72L76 86" stroke="${C.bark}" stroke-width="5" stroke-linecap="round"/><ellipse cx="66" cy="56" rx="12" ry="16" fill="${C.green}" transform="rotate(-20 66 56)"/><path d="M60 50Q66 52 72 48" stroke="${C.gold}" stroke-width="2.4" fill="none"/></g>`,
  cuatro: () => `<g class="b-sway"><path d="M60 46C52 46 46 52 46 58C42 60 40 64 40 68C40 76 48 82 60 82C72 82 80 76 80 68C80 64 78 60 74 58C74 52 68 46 60 46Z" fill="#b07a3a" stroke="#6b4423" stroke-width="2"/><circle cx="60" cy="66" r="5" fill="#4a2c14"/><path d="M57 22H63V48H57Z" fill="#6b4423"/><path d="M56 20H64V28H56Z" fill="${C.ink}"/><path d="M58.5 28V72M61.5 28V72" stroke="${C.sand}" stroke-width=".9"/></g><circle cx="84" cy="36" r="6" fill="${C.red}"/><path d="M84 30V27" stroke="${C.gold}" stroke-width="2" stroke-linecap="round"/><circle cx="36" cy="40" r="5" fill="${C.gold}"/>`,
  crowns: () => `${[[38, 62, C.gold], [60, 54, C.red], [82, 62, C.sea]].map(([x, y, color], i) => `<g class="b-float" style="animation-delay:${i * 0.6}s"><path d="M${x - 12} ${y + 8}L${x - 12} ${y - 6}L${x - 6} ${y}L${x} ${y - 10}L${x + 6} ${y}L${x + 12} ${y - 6}L${x + 12} ${y + 8}Z" fill="${color}" stroke="#7a4f00" stroke-width="1.6" stroke-linejoin="round"/><circle cx="${x}" cy="${y + 3}" r="2" fill="#fff"/></g>`).join('')}<path d="M60 26L62 31L67 31.5L63 35L64.5 40L60 37.2L55.5 40L57 35L53 31.5L58 31Z" fill="${C.sun}" class="b-twinkle"/>`,
  cabezudo: () => `<g class="b-sway"><circle cx="60" cy="52" r="22" fill="#e8b98a"/><path d="M36 46C36 30 48 24 60 24C72 24 84 30 84 46C76 40 44 40 36 46Z" fill="${C.red}"/><path d="M34 46H86" stroke="${C.gold}" stroke-width="4" stroke-linecap="round"/><circle cx="52" cy="54" r="3" fill="${C.ink}"/><circle cx="68" cy="54" r="3" fill="${C.ink}"/><path d="M50 64Q60 72 70 64" stroke="#a52a23" stroke-width="3" stroke-linecap="round" fill="none"/><circle cx="46" cy="62" r="4" fill="${C.coral}" opacity=".5"/><circle cx="74" cy="62" r="4" fill="${C.coral}" opacity=".5"/><path d="M48 74L44 86H76L72 74Z" fill="${C.sea}"/></g>`,
  parasol: () => `<path d="M24 80H96" stroke="#e3d3a8" stroke-width="8" stroke-linecap="round"/><g class="b-sway"><path d="M60 40V80" stroke="${C.bark}" stroke-width="3" stroke-linecap="round"/><path d="M30 44C30 32 44 24 60 24C76 24 90 32 90 44Z" fill="${C.red}"/><path d="M45 44C45 32 52 24 60 24C68 24 75 32 75 44Z" fill="${C.cream}"/><path d="M55 44C55 32 58 24 60 24C62 24 65 32 65 44Z" fill="${C.red}"/></g><circle cx="84" cy="66" r="5" fill="${C.sun}"/>`,
  pennants: () => `<path d="M26 34Q60 50 94 34" stroke="${C.bark}" stroke-width="2" fill="none"/>${[[34, C.red], [46, C.gold], [58, C.sea], [70, C.green], [82, C.coral]].map(([x, color], i) => `<g class="b-sway" style="animation-delay:${-i * 0.7}s"><path d="M${x - 5} ${36 + (x - 60) ** 2 / -110 + 8}L${x + 5} ${36 + (x - 60) ** 2 / -110 + 8}L${x} ${50 + (x - 60) ** 2 / -110 + 8}Z" fill="${color}"/></g>`).join('')}<path d="M34 80L46 62L58 80ZM62 80L74 60L86 80Z" fill="${C.sand}" stroke="${C.beak}" stroke-width="1.6"/><path d="M46 62V56M74 60V54" stroke="${C.red}" stroke-width="2" stroke-linecap="round"/>`,
  trophy: () => `<g class="b-float"><path d="M44 30H76V46C76 56 69 62 60 62C51 62 44 56 44 46Z" fill="${C.gold}" stroke="#a86c00" stroke-width="2"/><path d="M44 36H36C36 46 40 50 46 50M76 36H84C84 46 80 50 74 50" stroke="#a86c00" stroke-width="3" fill="none"/><path d="M56 62H64V72H56Z" fill="#c98f00"/><path d="M46 72H74V80H46Z" fill="${C.bark}"/><path d="M52 36C52 44 54 50 58 54" stroke="#fff" stroke-width="2.6" stroke-linecap="round" fill="none" opacity=".6"/></g>`,
  car: () => `<path d="M26 84H94" stroke="${C.ink}" stroke-width="3" stroke-linecap="round" opacity=".25"/><g class="b-float"><path d="M34 70V60L42 46C44 42 47 40 52 40H68C73 40 76 42 78 46L86 60V70Z" fill="${C.red}"/><path d="M45 47H75L81 59H39Z" fill="#cfe7ff"/><path d="M60 47V59" stroke="${C.red}" stroke-width="2.6"/><path d="M34 62H40M80 62H86" stroke="${C.sun}" stroke-width="3.4" stroke-linecap="round"/><circle cx="45" cy="72" r="7" fill="${C.ink}"/><circle cx="45" cy="72" r="2.6" fill="${C.cream}"/><circle cx="75" cy="72" r="7" fill="${C.ink}"/><circle cx="75" cy="72" r="2.6" fill="${C.cream}"/></g>`,
  route: () => `<path d="M36 80C36 64 84 70 84 52S48 44 50 34" stroke="${C.sea}" stroke-width="4" fill="none" stroke-linecap="round" stroke-dasharray="1 8"/><g class="b-float"><circle cx="36" cy="80" r="6.5" fill="${C.green}" stroke="${C.cream}" stroke-width="2.4"/><circle cx="84" cy="54" r="6.5" fill="${C.sea}" stroke="${C.cream}" stroke-width="2.4"/><path d="M50 44C50 44 40 34 40 27C40 21 44.5 17 50 17C55.5 17 60 21 60 27C60 34 50 44 50 44Z" fill="${C.red}"/><circle cx="50" cy="27" r="4" fill="${C.cream}"/></g>`,
  finish: () => `<path d="M40 86V30" stroke="${C.bark}" stroke-width="3.6" stroke-linecap="round"/><g class="b-sway"><path d="M42 31H84V61H42Z" fill="${C.cream}" stroke="${C.ink}" stroke-width="1.6"/><path d="M42 31H52.5V41H42ZM63 31H73.5V41H63ZM52.5 41H63V51H52.5ZM73.5 41H84V51H73.5ZM42 51H52.5V61H42ZM63 51H73.5V61H63Z" fill="${C.ink}"/></g><path d="M30 86H52" stroke="${C.fern}" stroke-width="3" stroke-linecap="round"/>`,
  tent: () => `<path d="M26 82H94" stroke="${C.fern}" stroke-width="3" stroke-linecap="round"/><g class="b-float"><path d="M34 48L60 30L86 48Z" fill="${C.red}"/><path d="M34 48Q40 54 47 48Q53 54 60 48Q67 54 73 48Q80 54 86 48" fill="${C.cream}" stroke="${C.red}" stroke-width="2"/><path d="M38 50V80M82 50V80" stroke="${C.bark}" stroke-width="3" stroke-linecap="round"/><path d="M46 66H74V80H46Z" fill="${C.sand}"/><path d="M50 66H70" stroke="${C.beak}" stroke-width="2"/></g>`,
  plaza: () => `<path d="M26 82H94" stroke="#c9b07e" stroke-width="4" stroke-linecap="round"/><g class="b-float"><path d="M36 44L60 28L84 44Z" fill="${C.green}"/><path d="M34 44H86" stroke="${C.leaf}" stroke-width="3" stroke-linecap="round"/><path d="M40 46V78M52 46V78M68 46V78M80 46V78" stroke="${C.cream}" stroke-width="4"/><path d="M36 78H84" stroke="${C.sand}" stroke-width="5" stroke-linecap="round"/><circle cx="60" cy="24" r="3" fill="${C.gold}"/></g>${[[44, 0], [60, 0.8], [76, 1.6]].map(([x, d]) => `<circle class="b-twinkle" style="animation-delay:${d}s" cx="${x}" cy="60" r="3.4" fill="${C.red}"/>`).join('')}`,
  line: () => `${[[40, C.sea, 0], [58, C.red, 0.4], [76, C.green, 0.8]].map(([x, color, d]) => `<g class="b-float" style="animation-delay:${d}s"><circle cx="${x}" cy="48" r="7" fill="#a0743c"/><path d="M${x - 10} 76C${x - 10} 64 ${x - 5} 58 ${x} 58C${x + 5} 58 ${x + 10} 64 ${x + 10} 76Z" fill="${color}"/></g>`).join('')}<path d="M30 80H90" stroke="${C.beak}" stroke-width="3" stroke-dasharray="4 4" stroke-linecap="round"/>`,
  tag: () => `<g class="b-sway" style="transform-origin:30% 30%"><path d="M38 34H62L86 58L62 82L38 58Z" fill="${C.lime}" stroke="${C.leaf}" stroke-width="2.4" stroke-linejoin="round"/><circle cx="50" cy="46" r="5" fill="${C.cream}" stroke="${C.leaf}" stroke-width="2"/></g>`,
  coin: () => `<g class="b-float"><circle cx="60" cy="58" r="24" fill="${C.gold}" stroke="#a86c00" stroke-width="3"/><circle cx="60" cy="58" r="17" fill="none" stroke="#a86c00" stroke-width="1.6" stroke-dasharray="3 3"/><path d="M60 46V70M66 50C64 48 62 48 60 48C56 48 54 50 54 53C54 59 66 57 66 63C66 66 63 68 60 68C57 68 55 67 54 65" stroke="#7a4f00" stroke-width="3" stroke-linecap="round" fill="none"/></g>`,
  clock: () => `<g class="b-float"><circle cx="60" cy="58" r="24" fill="${C.cream}" stroke="${C.ink}" stroke-width="4"/><path d="M60 58V42" stroke="${C.ink}" stroke-width="3.4" stroke-linecap="round"/><g class="b-spin" style="animation-duration:6s;transform-origin:60px 58px"><path d="M60 58L72 64" stroke="${C.red}" stroke-width="3" stroke-linecap="round"/></g><circle cx="60" cy="58" r="3" fill="${C.ink}"/></g><path d="M86 34L80 44H88L82 54" stroke="${C.gold}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`,
  pencil: () => `<path d="M34 80H86" stroke="${C.beak}" stroke-width="2.4" stroke-linecap="round" stroke-dasharray="2 5"/><g class="b-sway"><path d="M42 74L44 64L74 34L82 42L52 72Z" fill="${C.gold}" stroke="#a86c00" stroke-width="2" stroke-linejoin="round"/><path d="M42 74L44 64L52 72Z" fill="${C.sand}"/><path d="M70 38L78 46" stroke="#a86c00" stroke-width="2"/><path d="M74 34L82 42L86 38C88 36 88 34 86 32L84 30C82 28 80 28 78 30Z" fill="${C.red}"/></g>`,
  door: () => `<g class="b-float"><path d="M40 82V46C40 34 49 26 60 26C71 26 80 34 80 46V82Z" fill="${C.sea}"/><path d="M46 82V48C46 39 52 33 60 33C68 33 74 39 74 48V82Z" fill="#7cbcff"/><path d="M60 33V82M46 56H74M46 68H74" stroke="${C.deep}" stroke-width="2"/><circle cx="66" cy="62" r="2" fill="${C.gold}"/><path d="M36 82H84" stroke="${C.bark}" stroke-width="3" stroke-linecap="round"/></g><path d="M84 30C84 26 88 26 88 30C88 34 84 36 84 36C84 36 80 34 80 30C80 26 84 26 84 30Z" fill="${C.coral}" class="b-pulse"/>`,
  leaf: () => `<g class="b-sway"><path d="M60 84C40 70 36 50 46 34C52 44 62 44 70 30C82 48 78 70 60 84Z" fill="${C.fern}"/><path d="M60 84C58 66 60 52 66 40" stroke="${C.leaf}" stroke-width="3" stroke-linecap="round" fill="none"/></g>`,
};

/** One badge entry: file name, rarity, motif, and an optional ribbon label. */
export const BADGES = [
  ['first-town', 'common', 'pin'], ['towns-3', 'common', 'pin', '3'], ['towns-10', 'rare', 'casita', '10'], ['towns-25', 'epic', 'map', '25'],
  ['towns-50', 'epic', 'compass', '50'], ['towns-78', 'legendary', 'island', '78'], ['map-first', 'common', 'map'], ['radius-first', 'common', 'radius'],
  ['camera-turn', 'common', 'cotorra-orbit'], ['sky-view', 'common', 'grid3d'], ['regions-3', 'rare', 'compass', '3'], ['regions-all', 'epic', 'island', '7'],
  ['islands', 'rare', 'island-small'], ['views-10', 'common', 'binoculars', '10'], ['views-50', 'rare', 'binoculars', '50'],
  ['rsvp-1', 'common', 'ticket'], ['rsvp-5', 'common', 'ticket', '5'], ['rsvp-10', 'rare', 'people', '10'], ['rsvp-25', 'epic', 'people', '25'],
  ['rsvp-50', 'legendary', 'trophy', '50'], ['free-3', 'common', 'tag', '3'], ['paid-1', 'common', 'coin'], ['night-3', 'rare', 'moon', '3'],
  ['morning-3', 'rare', 'sun', '3'], ['weekend-5', 'rare', 'calendar', '5'], ['planner-3', 'rare', 'calendar-check', '3'], ['last-minute', 'common', 'clock'],
  ['weeks-3', 'rare', 'flame', '3'], ['weeks-8', 'epic', 'flame', '8'], ['waitlist-1', 'common', 'line'], ['variety-5', 'rare', 'star', '5'],
  ['rsvp-towns-5', 'rare', 'casita', '5'], ['host-1', 'common', 'tent'], ['host-5', 'rare', 'tent', '5'], ['host-15', 'epic', 'tent', '15'],
  ['guests-10', 'common', 'plaza', '10'], ['guests-50', 'rare', 'plaza', '50'], ['guests-200', 'epic', 'plaza', '200'], ['guests-1000', 'legendary', 'plaza', '1K'],
  ['host-waitlist', 'rare', 'line', '+'], ['host-variety', 'rare', 'tent', '3'], ['favorite-1', 'common', 'bookmark'], ['favorite-10', 'rare', 'bookmark', '10'],
  ['favorite-30', 'epic', 'bookmark', '30'], ['search-1', 'common', 'search'], ['search-5', 'rare', 'search', '5'], ['share-1', 'common', 'megaphone'],
  ['share-10', 'rare', 'megaphone', '10'], ['calendar-1', 'common', 'calendar'], ['ai-1', 'common', 'chat'], ['ai-10', 'rare', 'chat', '10'],
  ['like-10', 'common', 'heart', '10'], ['review-1', 'common', 'pencil'], ['avatar', 'common', 'avatar'], ['profile-complete', 'common', 'avatar-check'],
  ['location-prefs', 'common', 'home-pin'], ['notification-prefs', 'common', 'bell'], ['login-3', 'common', 'door', '3'], ['login-7', 'rare', 'door', '7'],
  ['login-30', 'epic', 'door', '30'], ['login-100', 'legendary', 'door', '100'], ['coqui', 'common', 'coqui'], ['vejigante', 'rare', 'vejigante'],
  ['garita', 'common', 'garita'], ['yunque', 'rare', 'yunque'], ['bioluminescent', 'epic', 'bio'], ['mountain-coffee', 'rare', 'coffee'],
  ['bomba-plena', 'rare', 'drum'], ['piragua', 'common', 'piragua'], ['beach', 'common', 'beach'], ['patronales', 'rare', 'pennants'],
  ['flamboyan-trail', 'rare', 'flamboyan-tree'], ['golden-cotorra', 'epic', 'cotorra', '10'], ['boricua-legend', 'legendary', 'cotorra-crown'],
  ['hidden-island', 'epic', 'island-small', '2'], ['navidad', 'rare', 'cuatro'], ['asalto', 'epic', 'maracas', '3'], ['reyes', 'rare', 'crowns'],
  ['sanse', 'epic', 'cabezudo'], ['verano', 'rare', 'parasol', '3'], ['flamboyan', 'common', 'flamboyan'],
  ['plan-first', 'common', 'route'], ['plan-days-10', 'rare', 'route', '10'], ['surprise-first', 'common', 'star'], ['plan-share', 'common', 'route', '+'],
  ['trip-first', 'common', 'car'], ['stop-first', 'common', 'finish'], ['stops-10', 'rare', 'pin', '10'], ['stops-30', 'epic', 'route', '30'],
  ['night-route', 'rare', 'route', '3'], ['trip-complete', 'rare', 'finish'], ['trips-5', 'epic', 'finish', '5'], ['trip-towns-5', 'rare', 'car', '5'],
  ['trip-towns-20', 'legendary', 'island', '20'],
];

const SPARKLE_SPOTS = [[25, 33], [95, 31], [97, 74]];

// Points around the badge's center, for rim studs, dots and the legendary seal's scallops.
const around = (count, radius, draw, offset = 0) => Array.from({ length: count }, (_, i) => {
  const angle = (i / count) * Math.PI * 2 + offset;
  return draw(+(60 + Math.cos(angle) * radius).toFixed(2), +(60 + Math.sin(angle) * radius).toFixed(2), i);
}).join('');

// The rim: a bevel lit from the top left like the logo, and a detail that names the tier in the
// craft itself — plain for common, a dotted keyline for rare, studs for epic, a scalloped seal for
// legendary — so rarity reads even without color.
function rim(rarity, frame, id) {
  const [light, mid, dark] = frame.ring;
  const seal = rarity === 'legendary' ? around(30, 55.2, (x, y) => `<circle cx="${x}" cy="${y}" r="4.4" fill="${dark}"/>`) : '';
  const base = `${seal}<circle cx="60" cy="60" r="56.5" fill="${dark}"/><circle cx="60" cy="59" r="55.2" fill="url(#${id}-ring)"/>`
    + `<path d="M17.5 46A44.5 44.5 0 0 1 102.5 46" fill="none" stroke="${light}" stroke-width="2.2" stroke-linecap="round" opacity=".9"/>`;
  const detail = {
    common: '',
    rare: around(36, 52.6, (x, y) => `<circle cx="${x}" cy="${y}" r=".95" fill="#fff" opacity=".85"/>`),
    epic: around(8, 52.6, (x, y) => `<circle cx="${x}" cy="${y}" r="2.3" fill="${light}" stroke="${dark}" stroke-width=".8"/>`, Math.PI / 8),
    legendary: around(12, 52.6, (x, y) => `<path d="M${x} ${y - 2.6}L${x + 2.6} ${y}L${x} ${y + 2.6}L${x - 2.6} ${y}Z" fill="#fff6d6" stroke="${dark}" stroke-width=".7"/>`, Math.PI / 12)
      + `<circle class="b-spin" cx="60" cy="60" r="50.6" fill="none" stroke="#fff6d6" stroke-width="1" stroke-dasharray="1.5 5" stroke-linecap="round" opacity=".9"/>`,
  }[rarity];
  return base + detail + `<circle cx="60" cy="60" r="49.4" fill="${dark}"/><circle cx="60" cy="60" r="48.2" fill="#fff8e6"/>`;
}

// The field: sky, two island hills and the ground the motif stands on.
function scene(frame, id) {
  const [sky, hill] = frame.bg;
  return `<circle cx="60" cy="60" r="46.4" fill="${sky}"/>`
    + `<path d="M12 80C24 70 36 68 48 72C58 75 66 66 78 66C90 66 100 72 108 78V108H12Z" fill="${hill}"/>`
    + `<path d="M12 88C30 80 46 82 62 86C78 90 92 82 108 84V108H12Z" fill="${frame.ring[0]}" opacity=".38"/>`
    + `<ellipse cx="60" cy="85" rx="22" ry="3.6" fill="#26372c" opacity=".13"/>`;
}

// A banner with folded tails for tiers; the label sits on its face.
function banner(label, frame, id) {
  const half = 9 + label.length * 4.6;
  const left = 60 - half;
  const right = 60 + half;
  const [, mid, dark] = frame.ring;
  return `<g><path d="M${left - 7} 92L${left + 2} 92L${left + 2} 104L${left - 7} 104L${left - 3.5} 98Z" fill="${dark}"/>`
    + `<path d="M${right + 7} 92L${right - 2} 92L${right - 2} 104L${right + 7} 104L${right + 3.5} 98Z" fill="${dark}"/>`
    + `<path d="M${left} 88H${right}V101H${left}Z" fill="url(#${id}-ring)" stroke="${dark}" stroke-width="1.2"/>`
    + `<path d="M${left + 2} 90.4H${right - 2}" stroke="#fff" stroke-width="1" opacity=".45" stroke-linecap="round"/>`
    + `<text x="60" y="98.4" text-anchor="middle" font-family="system-ui,-apple-system,'Segoe UI',Roboto,Arial,sans-serif" font-size="10.5" font-weight="800" letter-spacing=".4" fill="#fff">${label}</text></g>`;
}

/** The SVG of one badge. */
export function badge([name, rarity, motif, label]) {
  const frame = RARITY[rarity];
  const draw = MOTIFS[motif];
  if (!frame || !draw) throw new Error(`badge ${name}: unknown rarity or motif`);
  const id = `bx-${name}`;
  const legendary = rarity === 'legendary';
  const sparkles = { common: 0, rare: 1, epic: 2, legendary: 3 }[rarity];
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" class="bx-badge bx-badge-${rarity}" data-badge="${name}"><style>${STYLE}</style><defs>`
    + `<linearGradient id="${id}-ring" x1=".2" y1="0" x2=".8" y2="1"><stop offset="0" stop-color="${frame.ring[0]}"/><stop offset=".5" stop-color="${frame.ring[1]}"/><stop offset="1" stop-color="${frame.ring[2]}"/></linearGradient>`
    + `<clipPath id="${id}-clip"><circle cx="60" cy="60" r="46.4"/></clipPath>${crownDefs(id)}</defs>`
    + rim(rarity, frame, id)
    + `<g clip-path="url(#${id}-clip)">${scene(frame, id)}`
    + (legendary ? `<g class="b-spin" opacity=".35">${Array.from({ length: 12 }, (_, i) => `<path d="M60 60L57 10H63Z" fill="#fff3c4" transform="rotate(${i * 30} 60 60)"/>`).join('')}</g>` : '')
    + `<g transform="translate(0 2)">${draw(id)}</g></g>`
    + SPARKLE_SPOTS.slice(0, sparkles).map(([x, y], i) => sparkle(x, y, 4.2, i % 2 ? '#fff6d6' : frame.spark, i * 0.9)).join('')
    + (label ? banner(label, frame, id) : '') + `</svg>\n`;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  mkdirSync(OUT, { recursive: true });
  const names = new Set();
  for (const entry of BADGES) {
    if (names.has(entry[0])) throw new Error(`duplicate badge ${entry[0]}`);
    names.add(entry[0]);
    writeFileSync(new URL(`${entry[0]}.svg`, OUT), badge(entry));
  }
  writeFileSync(new URL('../public/assets/css/badges.css', import.meta.url), `/* Badge motion for badges drawn inline; generated with the badges by scripts/badges.mjs. */\n${STYLE}\n`);
  console.log(`${names.size} badges written`);
}
