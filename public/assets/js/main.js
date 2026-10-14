import { formDates } from './features/formDates.js?v=69';
import { buildCheck } from './features/buildCheck.js?v=69';
import { passwordControls } from './features/passwords.js?v=69';
import { submitFeedback } from './features/submitFeedback.js?v=69';
import { privacyControls } from './features/privacyControls.js?v=69';
import { interactionFeedback } from './features/haptics.js?v=69';
import { sheetGestures } from './features/sheetGestures.js?v=69';
import { searchPickers } from './features/searchPickers.js?v=69';
import { heroCarousel } from './features/carousel.js?v=69';
import { accountMenu } from './features/accountMenu.js?v=69';
import { bell } from './features/bell.js?v=69';
import { localizeMoments } from './features/localTime.js?v=69';
import { $$ } from './utils/dom.js?v=69';
import { back, joinPanel, registerServiceWorker, retry } from './features/app.js?v=69';
import { filters, loadMore } from './features/listing.js?v=69';
import { disclosures, share } from './features/share.js?v=69';
import { suggest } from './features/suggest.js?v=69';
import { reactToggle, saveToggle } from './features/toggle.js?v=69';

formDates();
buildCheck();
passwordControls();
submitFeedback();
interactionFeedback();
localizeMoments();
disclosures();
for (const handle of $$('.sheet-handle')) sheetGestures(handle);

const FEATURES = {
  'account-menu': accountMenu,
  bell,
  assistant: (node) => import('./features/assistant.js?v=69').then(module => module.assistant(node)).catch(() => {}),
  'privacy-controls': privacyControls,
  'hero-carousel': heroCarousel,
  suggest,
  'search-pickers': searchPickers,
  filters: (form) => { searchPickers(form); filters(form); },
  'load-more': loadMore,
  'profile-switch': (node) => import('./features/profileSwitch.js?v=69').then((module) => module.profileSwitch(node)).catch(() => {}),
  'near-rail': (node) => import('./features/nearRail.js?v=69').then((module) => module.nearRail(node)).catch(() => {}),
  share,
  toggle: saveToggle,
  react: reactToggle,
  back,
  'join-panel': joinPanel,
  retry,
  explorer: (node) => import('./features/explorer.js?v=69').then((module) => module.explorer(node)),
  achievements: (node) => import('./features/achievements.js?v=69').then((module) => module.achievements(node)).catch(() => {}),
  'achievement-board': (node) => import('./features/achievements.js?v=69').then((module) => module.achievementBoard(node)).catch(() => {}),
  a11y: (node) => import('./features/a11y.js?v=69').then((module) => module.a11y(node)).catch(() => {}),
  'mini-map': (node) => import('./features/eventMaps.js?v=69').then((module) => module.miniMap(node)),
  participants: (node) => import('./features/eventMaps.js?v=69').then((module) => module.participants(node)),
  'avatar-upload': (node) => import('./features/avatarUpload.js?v=69').then((module) => module.avatarUpload(node)),
  'media-upload': (node) => import('./features/mediaUpload.js?v=69').then((module) => module.mediaUpload(node)),
  interest: (node) => import('./features/interest.js?v=69').then((module) => module.interest(node)).catch(() => {}),
  plan: (node) => import('./features/plan.js?v=69').then((module) => module.plan(node)).catch(() => {}),
  'pin-picker': (node) => import('./features/eventMaps.js?v=69').then((module) => module.pinPicker(node)),
};

for (const node of $$('[data-feature]')) {
  const start = FEATURES[node.dataset.feature];
  if (start) start(node);
}

import('./features/motion.js?v=69').then((module) => module.motion()).catch(() => {});

registerServiceWorker();
