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
7. Previous social raster used unrelated plain typography. New1200×630PNG reuses exact SVG and homepage markup/fonts/colors over the existing attributed Culebra photo. Header source is unchanged; asset revision85 refreshes public metadata URLs.

## Evidence
Both projects have reviewed complete_place_search and place_search_custom_plans migrations. Real PostGIS rollback tests traverse367fixtures once across all four sorts,24per page, including equal names/scores and invalid/wrong-scope cursor rejection. Production read-only traversal matches all94McDonald records for six variants and all247food/50shopping records, with no missing/duplicate IDs. No seed users/events or destructive changes. Legacy numeric place cursors intentionally fail; the former app never exposed place pagination links.

Actual inner-query production plans use name/rating B-tree, text GIN/trigram and spatial GiST indexes.25rows are projected per24-result page. Name9.3ms/rating7.6ms/text4.2ms/spatial101ms on the recorded cold read; no full places sequential scan. Shared function-local custom planning avoids generic CASE sort regression.

Full gate18/18suites662assertions and all browser harnesses pass. Changed Pudu modules type-check; whole-tree formatter retains the pre-existing untouched Services/Plans import-order warning. Independent source review is clear after sort-scope, delegation, selector-specificity and wiki fixes.

Codex browser: phone expanded pin reveals132px selected-card link; gesture control width shrank383→46px before final44px normalization. Joystick44×44 on phone/desktop; actual drag0→120degrees and tap-to-north. Home cards all385px desktop/all375px phone, copy208px, no horizontal overflow. Exact-brand PNG dimensions and loaded Pacifico/Nunito verified.

Historical checkpoint (completed): commit/release this reviewed slice and verify the deployed search continuations, map selection/joystick, cards and social metadata/assets. Remaining Starbucks/mall import staging belongs to the separate permanent-places handoff.

## Live integration correction
Release0.11.1 was deployed, then rolled back to the verified0.11.0 deployment when actual Show more activation exposed a shared navigation-loader ordering bug. Its capture-phase microtask marked the link before the target pagination listener, leaving it busy without a read. The bounded correction moves shared click feedback to bubbling and gives pagination its own closure lock. Actual-module integration now reproduces capture/target/bubble checkpoints and successive pages; the old shared implementation fails the new aria-disabled assertion. Independent review is clear. Asset84/patch0.11.2 must pass browser continuation checks on a protected staged deployment before promotion. Database migrations remain valid and unchanged.

Historical checkpoint (completed): release0.11.2 and use Vercel temporary staging access for successive browser load-more checks before promotion.

## Verified replacement and final image transport
Protected0.11.2 staging browser traversed24→48→72→94unique McDonald places and all247food places through bounded pages, with no remaining load-more control at the end. Production0.11.2 (8c59753,1efea6887794) is promoted and public-domain successive clicks independently reached72unique cards with no stuck busy state.

All four tested crawler user agents receive absolute OG/Twitter image URLs. Final byte validation found the screenshot transport had JPEG bytes under the.png filename; patch0.11.3 converts the unchanged raster to genuine PNG1200×630/502656bytes and advances sharing URLs to85. Independent decoded-BMP comparison proves identical pixels. Signature/IHDR/size and service-worker tests pass; no other runtime behavior or database changes.

Historical checkpoint (completed): promote0.11.3 after checking actual PNG bytes and final production map/card/metadata behavior; record deployment identity and close #124.


## Final production verification — 0.11.3
Production is promoted at commit `ba88938bef16eed1a309be153dbfbc475c16b215`, build `f58dd6b8ea38`, asset85. Deployment: https://boricua-experience-nixhnrrp7.vercel.app. Public build identity matches the compiled artifact.

The final production browser loads asset85, shows a44×44px compass on desktop and390px phone view, and successfully loads24→48place cards with no remaining busy state. The identical application behavior in0.11.2 was verified through all94McDonald results and247food results; expanded brand-pin selection, joystick drag120degrees/tap north, equal-height cards and no phone horizontal overflow were checked. Final public sharing image has genuine PNG signature,1200×630dimensions and byte equality with the release asset. Facebook, X, LinkedIn and WhatsApp crawler requests receive matching absolute OG/Twitter URLs at revision85.

Both environments retain matching reviewed database functions and permissions. No production data was removed. All18suites/662assertions plus focused browser harnesses pass. Physical iOS/Android multitouch remains untested because the available browser cannot inject two-finger gestures; the enabled MapLibre handlers, touch CSS and expanded canvas sizing were verified separately. The pre-existing unrelated Plans formatter warning remains.

Exact next action: resume source review of the private Starbucks/mall staging batch under [[handoffs/permanent-places]]; do not infer that those unpublished records were imported by this release.
