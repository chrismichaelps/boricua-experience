import { $$ } from './utils/dom.js';
import { back, joinPanel, registerServiceWorker, retry } from './features/app.js';
import { filters, loadMore } from './features/listing.js';
import { share } from './features/share.js';
import { suggest } from './features/suggest.js';
import { reactToggle, saveToggle } from './features/toggle.js';
import { resumeIfShared } from './features/live.js';

const FEATURES = {
  suggest,
  filters,
  'load-more': loadMore,
  share,
  toggle: saveToggle,
  react: reactToggle,
  back,
  'join-panel': joinPanel,
  retry,
  explorer: (node) => import('./features/explorer.js').then((module) => module.explorer(node)),
  'mini-map': (node) => import('./features/eventMaps.js').then((module) => module.miniMap(node)),
  participants: (node) => import('./features/eventMaps.js').then((module) => module.participants(node)),
  'pin-picker': (node) => import('./features/eventMaps.js').then((module) => module.pinPicker(node)),
};

for (const node of $$('[data-feature]')) {
  const start = FEATURES[node.dataset.feature];
  if (start) start(node);
}

resumeIfShared();
registerServiceWorker();
