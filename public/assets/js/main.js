import { privacyControls } from './features/privacyControls.js?v=42';
import { interactionFeedback } from './features/haptics.js?v=42';
import { sheetGestures } from './features/sheetGestures.js?v=42';
import { searchPickers } from './features/searchPickers.js?v=42';
import { heroCarousel } from './features/carousel.js?v=42';
import { accountMenu } from './features/accountMenu.js?v=42';
import { bell } from './features/bell.js?v=42';
import { localizeMoments } from './features/localTime.js?v=42';
import { $$ } from './utils/dom.js?v=42';
import { back, joinPanel, registerServiceWorker, retry } from './features/app.js?v=42';
import { filters, loadMore } from './features/listing.js?v=42';
import { share } from './features/share.js?v=42';
import { suggest } from './features/suggest.js?v=42';
import { reactToggle, saveToggle } from './features/toggle.js?v=42';

interactionFeedback();
localizeMoments();
for (const handle of $$('.sheet-handle')) sheetGestures(handle);

const FEATURES = {
  'account-menu': accountMenu,
  bell,
  assistant: (node) => import('./features/assistant.js?v=42').then(module => module.assistant(node)).catch(() => {}),
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
  explorer: (node) => import('./features/explorer.js?v=42').then((module) => module.explorer(node)),
  'mini-map': (node) => import('./features/eventMaps.js?v=42').then((module) => module.miniMap(node)),
  participants: (node) => import('./features/eventMaps.js?v=42').then((module) => module.participants(node)),
  'avatar-upload': (node) => import('./features/avatarUpload.js?v=42').then((module) => module.avatarUpload(node)),
  'pin-picker': (node) => import('./features/eventMaps.js?v=42').then((module) => module.pinPicker(node)),
};

for (const node of $$('[data-feature]')) {
  const start = FEATURES[node.dataset.feature];
  if (start) start(node);
}

import('./features/motion.js?v=42').then((module) => module.motion()).catch(() => {});

registerServiceWorker();
