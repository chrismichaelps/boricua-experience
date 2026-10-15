---
type: handoff
tags: [handoff, discovery, production]
---
# Production discovery corrections
Issue #124. Architect → Implementer → independent reviewer. Own discovery service/API/views, map interaction hit areas and selected preview, shared card dimensions, social raster and focused tests. Preserve existing auth, itinerary, live location and user records.

## Root causes and corrections
1. Places were limited to a ten-card rail and their cursor discarded. Place Results now retain a separate24-item continuation in SSR and JSON; activity paging remains independent. Database keysets replace capped integer offsets with deterministic score/count/name/id order bound to normalized filters/sort. Explicit Soon survives query/origin inference; place continuations are noindex. Read failures are reported.
2. McDonald spelling variants were absent from indexed terms. Shared private normalization accepts Macdonald/McDonald/possessive/partial forms for map and search. No municipality restriction is invented.
3. Expanded pins activated a hidden sheet. They now expose the selected existing card in a bottom panel while retaining expansion; canvas click clears selection, redraw retains only a visible selected item.
4. Wide transparent controls intercepted phone map gestures. Their hit area now ends at actual controls; marker touch starts belong to the map handler. MapLibre still owns pan/pinch; resize changes coverage without refitting or recentering. Physical multitouch cannot be injected by the available Codex browser API, so actual iOS/Android pinch remains an explicit verification limitation.
5. Final user steering supersedes the96px pad: one44px circle matches map controls. Drag rotates; tap faces north; arrow/Home keyboard controls remain available. Pointer lifecycle tests cover threshold, capture, cancellation and click suppression. Explicit rotation detaches follow.
6. Auto-sized copy and the place article's paragraph-style class caused inconsistent card dimensions. Standard copy uses13rem with full text/native overflow; activity horizontal rows retain128px. Delegated keyboard scrolling covers later nearby/load-more cards and lets page scroll continue at boundaries. Map cards keep their distinct layout.
7. Previous social raster used unrelated plain typography. New1200×630PNG reuses exact SVG and homepage markup/fonts/colors over the existing attributed Culebra photo. Header source is unchanged; asset revision83 refreshes public metadata URLs.

## Evidence
Both projects have reviewed complete_place_search and place_search_custom_plans migrations. Real PostGIS rollback tests traverse367fixtures once across all four sorts,24per page, including equal names/scores and invalid/wrong-scope cursor rejection. Production read-only traversal matches all94McDonald records for six variants and all247food/50shopping records, with no missing/duplicate IDs. No seed users/events or destructive changes. Legacy numeric place cursors intentionally fail; the former app never exposed place pagination links.

Actual inner-query production plans use name/rating B-tree, text GIN/trigram and spatial GiST indexes.25rows are projected per24-result page. Name9.3ms/rating7.6ms/text4.2ms/spatial101ms on the recorded cold read; no full places sequential scan. Shared function-local custom planning avoids generic CASE sort regression.

Full gate18/18suites662assertions and all browser harnesses pass. Changed Pudu modules type-check; whole-tree formatter retains the pre-existing untouched Services/Plans import-order warning. Independent source review is clear after sort-scope, delegation, selector-specificity and wiki fixes.

Codex browser: phone expanded pin reveals132px selected-card link; gesture control width shrank383→46px before final44px normalization. Joystick44×44 on phone/desktop; actual drag0→120degrees and tap-to-north. Home cards all385px desktop/all375px phone, copy208px, no horizontal overflow. Exact-brand PNG dimensions and loaded Pacifico/Nunito verified.

Exact next action: commit/release this reviewed slice and verify the deployed search continuations, map selection/joystick, cards and social metadata/assets. Remaining Starbucks/mall import staging belongs to the separate permanent-places handoff.
