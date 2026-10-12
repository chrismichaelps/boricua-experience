import { passwordControls } from './features/passwords.js?v=56';
import { submitFeedback } from './features/submitFeedback.js?v=56';
import { privacyControls } from './features/privacyControls.js?v=56';
import { interactionFeedback } from './features/haptics.js?v=56';
import { sheetGestures } from './features/sheetGestures.js?v=56';
import { searchPickers } from './features/searchPickers.js?v=56';
import { heroCarousel } from './features/carousel.js?v=56';
import { accountMenu } from './features/accountMenu.js?v=56';
import { bell } from './features/bell.js?v=56';
import { localizeMoments } from './features/localTime.js?v=56';
import { $$ } from './utils/dom.js?v=56';
import { back, joinPanel, registerServiceWorker, retry } from './features/app.js?v=56';
import { filters, loadMore } from './features/listing.js?v=56';
import { share } from './features/share.js?v=56';
import { suggest } from './features/suggest.js?v=56';
import { reactToggle, saveToggle } from './features/toggle.js?v=56';

passwordControls();
submitFeedback();
interactionFeedback();
localizeMoments();
for (const handle of $$('.sheet-handle')) sheetGestures(handle);

const FEATURES = {
  'account-menu': accountMenu,
  bell,
  assistant: (node) => import('./features/assistant.js?v=56').then(module => module.assistant(node)).catch(() => {}),
  'privacy-controls': privacyControls,
  'hero-carousel': heroCarousel,
  suggest,
  'search-pickers': searchPickers,
  filters: (form) => { searchPickers(form); filters(form); },
  'load-more': loadMore,
  'profile-switch': (node) => import('./features/profileSwitch.js?v=56').then((module) => module.profileSwitch(node)).catch(() => {}),
  'near-rail': (node) => import('./features/nearRail.js?v=56').then((module) => module.nearRail(node)).catch(() => {}),
  share,
  toggle: saveToggle,
  react: reactToggle,
  back,
  'join-panel': joinPanel,
  retry,
  explorer: (node) => import('./features/explorer.js?v=56').then((module) => module.explorer(node)),
  'mini-map': (node) => import('./features/eventMaps.js?v=56').then((module) => module.miniMap(node)),
  participants: (node) => import('./features/eventMaps.js?v=56').then((module) => module.participants(node)),
  'avatar-upload': (node) => import('./features/avatarUpload.js?v=56').then((module) => module.avatarUpload(node)),
  'media-upload': (node) => import('./features/mediaUpload.js?v=56').then((module) => module.mediaUpload(node)),
  'pin-picker': (node) => import('./features/eventMaps.js?v=56').then((module) => module.pinPicker(node)),
};

for (const node of $$('[data-feature]')) {
  const start = FEATURES[node.dataset.feature];
  if (start) start(node);
}

import('./features/motion.js?v=56').then((module) => module.motion()).catch(() => {});

registerServiceWorker();
