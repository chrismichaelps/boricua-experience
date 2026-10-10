import { privacyControls } from './features/privacyControls.js?v=20';
import { interactionFeedback } from './features/haptics.js?v=19';
import { sheetGestures } from './features/sheetGestures.js?v=19';
import { searchPickers } from './features/searchPickers.js?v=19';
import { heroCarousel } from './features/carousel.js?v=3';
import { $$ } from './utils/dom.js';
import { back, joinPanel, registerServiceWorker, retry } from './features/app.js';
import { filters, loadMore } from './features/listing.js';
import { share } from './features/share.js';
import { suggest } from './features/suggest.js';
import { reactToggle, saveToggle } from './features/toggle.js?v=19';
import { resumeIfShared } from './features/live.js?v=19';

interactionFeedback();
for (const handle of $$('.sheet-handle')) sheetGestures(handle);

const FEATURES = {
  'privacy-controls': privacyControls,
  'hero-carousel': heroCarousel,
  suggest,
  'search-pickers': searchPickers,
  filters: (form) => { searchPickers(form); filters(form); },
  'load-more': loadMore,
  share,
  toggle: saveToggle,
  react: reactToggle,
  back,
  'join-panel': joinPanel,
  retry,
  explorer: (node) => import('./features/explorer.js?v=19').then((module) => module.explorer(node)),
  'mini-map': (node) => import('./features/eventMaps.js?v=19').then((module) => module.miniMap(node)),
  participants: (node) => import('./features/eventMaps.js?v=19').then((module) => module.participants(node)),
  'avatar-upload': (node) => import('./features/avatarUpload.js?v=1').then((module) => module.avatarUpload(node)),
  'pin-picker': (node) => import('./features/eventMaps.js?v=19').then((module) => module.pinPicker(node)),
};

for (const node of $$('[data-feature]')) {
  const start = FEATURES[node.dataset.feature];
  if (start) start(node);
}

import('./features/motion.js?v=20').then((module) => module.motion()).catch(() => {});

resumeIfShared();
registerServiceWorker();
