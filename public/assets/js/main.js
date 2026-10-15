import { formDates } from './features/formDates.js?v=79';
import { buildCheck } from './features/buildCheck.js?v=79';
import { passwordControls } from './features/passwords.js?v=79';
import { submitFeedback } from './features/submitFeedback.js?v=79';
import { privacyControls } from './features/privacyControls.js?v=79';
import { interactionFeedback } from './features/haptics.js?v=79';
import { sheetGestures } from './features/sheetGestures.js?v=79';
import { searchPickers } from './features/searchPickers.js?v=79';
import { heroCarousel } from './features/carousel.js?v=79';
import { accountMenu } from './features/accountMenu.js?v=79';
import { bell } from './features/bell.js?v=79';
import { localizeMoments } from './features/localTime.js?v=79';
import { $$ } from './utils/dom.js?v=79';
import { back, joinPanel, registerServiceWorker, retry } from './features/app.js?v=79';
import { filters, loadMore, searchArrival } from './features/listing.js?v=79';
import { disclosures, share } from './features/share.js?v=79';
import { suggest } from './features/suggest.js?v=79';
import { reactToggle, saveToggle } from './features/toggle.js?v=79';

formDates();
buildCheck();
passwordControls();
submitFeedback();
searchArrival();
interactionFeedback();
localizeMoments();
disclosures();
for (const handle of $$('.sheet-handle')) sheetGestures(handle);

const FEATURES = {
  'account-menu': accountMenu,
  bell,
  assistant: (node) => import('./features/assistant.js?v=79').then(module => module.assistant(node)).catch(() => {}),
  'privacy-controls': privacyControls,
  'hero-carousel': heroCarousel,
  suggest,
  'search-pickers': searchPickers,
  filters: (form) => { searchPickers(form); filters(form); },
  'load-more': loadMore,
  'profile-switch': (node) => import('./features/profileSwitch.js?v=79').then((module) => module.profileSwitch(node)).catch(() => {}),
  'near-rail': (node) => import('./features/nearRail.js?v=79').then((module) => module.nearRail(node)).catch(() => {}),
  share,
  toggle: saveToggle,
  react: reactToggle,
  back,
  'join-panel': joinPanel,
  retry,
  explorer: (node) => import('./features/explorer.js?v=79').then((module) => module.explorer(node)),
  achievements: (node) => import('./features/achievements.js?v=79').then((module) => module.achievements(node)).catch(() => {}),
  'achievement-board': (node) => import('./features/achievements.js?v=79').then((module) => module.achievementBoard(node)).catch(() => {}),
  a11y: (node) => import('./features/a11y.js?v=79').then((module) => module.a11y(node)).catch(() => {}),
  'mini-map': (node) => import('./features/eventMaps.js?v=79').then((module) => module.miniMap(node)),
  participants: (node) => import('./features/eventMaps.js?v=79').then((module) => module.participants(node)),
  'avatar-upload': (node) => import('./features/avatarUpload.js?v=79').then((module) => module.avatarUpload(node)),
  'media-upload': (node) => import('./features/mediaUpload.js?v=79').then((module) => module.mediaUpload(node)),
  interest: (node) => import('./features/interest.js?v=79').then((module) => module.interest(node)).catch(() => {}),
  plan: (node) => import('./features/plan.js?v=79').then((module) => module.plan(node)).catch(() => {}),
  weather: (node) => import('./features/weather.js?v=79').then((module) => module.weather(node)).catch(() => {}),
  trip: (node) => import('./features/trip.js?v=79').then((module) => module.trip(node)).catch(() => {}),
  'pin-picker': (node) => import('./features/eventMaps.js?v=79').then((module) => module.pinPicker(node)),
};

for (const node of $$('[data-feature]')) {
  const start = FEATURES[node.dataset.feature];
  if (start) start(node);
}

import('./features/motion.js?v=79').then((module) => module.motion()).catch(() => {});

registerServiceWorker();
