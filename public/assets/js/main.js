import { passwordControls } from './features/passwords.js?v=45';
import { submitFeedback } from './features/submitFeedback.js?v=45';
import { privacyControls } from './features/privacyControls.js?v=45';
import { interactionFeedback } from './features/haptics.js?v=45';
import { sheetGestures } from './features/sheetGestures.js?v=45';
import { searchPickers } from './features/searchPickers.js?v=45';
import { heroCarousel } from './features/carousel.js?v=45';
import { accountMenu } from './features/accountMenu.js?v=45';
import { bell } from './features/bell.js?v=45';
import { localizeMoments } from './features/localTime.js?v=45';
import { $$ } from './utils/dom.js?v=45';
import { back, joinPanel, registerServiceWorker, retry } from './features/app.js?v=45';
import { filters, loadMore } from './features/listing.js?v=45';
import { share } from './features/share.js?v=45';
import { suggest } from './features/suggest.js?v=45';
import { reactToggle, saveToggle } from './features/toggle.js?v=45';

passwordControls();
submitFeedback();
interactionFeedback();
localizeMoments();
for (const handle of $$('.sheet-handle')) sheetGestures(handle);

const FEATURES = {
  'account-menu': accountMenu,
  bell,
  assistant: (node) => import('./features/assistant.js?v=45').then(module => module.assistant(node)).catch(() => {}),
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
  explorer: (node) => import('./features/explorer.js?v=45').then((module) => module.explorer(node)),
  'mini-map': (node) => import('./features/eventMaps.js?v=45').then((module) => module.miniMap(node)),
  participants: (node) => import('./features/eventMaps.js?v=45').then((module) => module.participants(node)),
  'avatar-upload': (node) => import('./features/avatarUpload.js?v=45').then((module) => module.avatarUpload(node)),
  'pin-picker': (node) => import('./features/eventMaps.js?v=45').then((module) => module.pinPicker(node)),
};

for (const node of $$('[data-feature]')) {
  const start = FEATURES[node.dataset.feature];
  if (start) start(node);
}

import('./features/motion.js?v=45').then((module) => module.motion()).catch(() => {});

registerServiceWorker();
