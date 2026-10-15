---
type: module
path: "@root/src/Constants/App.pudu"
fidelity: Active
grammar: "[[grammar/pudu]]"
layer: Constants
depth_status: SHALLOW
tags: [module, constants]
---

# Constants.App

> /** @Constants.App.Identity — names, versions, and fixed facts */

## Purpose

Product names, policy versions, the theme colour, Puerto Rico's UTC offset, the minimum age, the asset version, and the island's bounding box and map centre.

## Interface

`SITE_NAME`, `SHORT_NAME`, `TERMS_VERSION`, `PRIVACY_VERSION`, `COOKIE_POLICY_VERSION`, `THEME_COLOR`, `PUERTO_RICO_OFFSET_MINUTES` (-240), `MINIMUM_AGE` (18), `ASSET_VERSION`, `BOUNDS_*`, `MAP_CENTER_*`.

### Linkage

- **Requires:** nothing.
- **Consumed by:** modules of every higher layer that use these values.

## Algorithm

None: compile-time values only.

## Negative Logic (Prohibited Paths)

- ❌ No value computed from the environment or the clock.
- ❌ No literal of these values anywhere else in the source.

## Depth

SHALLOW by design: a table of names. Deletion test: the values scatter as literals.

## Grill Log

- **Q:** How is motion added without making basic flows fragile?
  **A:** Local pinned Motion 14.1.0 loads through an optional feature. Page/card entry, button feedback and picker transitions respect reduced motion and settle on page hide. No CSS hides content before enhancement. Picker exit has a bounded fallback and never delays filter submission. Authentication retains email/password contracts; curved cotorra and official Google assets remain local.

- **Q:** How do the app-style search controls preserve filtering?
  **A:** Native named selects remain the submission source and no-script fallback. Progressive picker dialogs expose a searchable municipality list and existing date windows with translated labels, keyboard dismissal and focus restoration. Pill submission retains category, free, sort and coordinates. Version 7 refreshes entry/styles; unchanged carousel modules keep their version 3 imports.

- **Q:** How is the hero carousel integrated?
  **A:** [[src/View/Components/Hero]] owns the fixed search surface and four scene controls. [[src/Public/Carousel]] rotates local images and captions. New controls have Spanish/English labels; asset version 3 refreshes cached scripts and styles.


- **Q:** How does the reference-inspired refresh preserve behaviour?
  **A:** Asset version 2 invalidates cached CSS and scripts together with the service-worker shell.


- **Q:** Handle daylight saving? **A:** No: Puerto Rico observes Atlantic Standard Time all year, so a fixed offset is exact. _Rejected:_ a time-zone database (no Pudu support, no benefit).
- **Q:** Where does a policy version change? **A:** Here; members accepting an older version are asked again on onboarding. _Rejected:_ date-derived versions.

## Referenced by

[[src/_MOC]]

## Brand refresh contract
Original compact parrot replaces the former mascot. Brand asset URLs use shared version20; changed entry/styles/Motion refresh together while unchanged map imports retain their single version19 identity. Grill: named links and native search semantics are preserved; resolved.

Cache version31 refreshes the mobile account-menu style; all browser module query references remain aligned.

Current cache graph: version33 aligns every browser import and shell resource for the mobile menu and refreshed map date fixes.

## Mobile/content correction Grill Log

- **Q:** What is the resolved contract? **A:** Asset graph version33 refreshes every changed browser import and brand asset consistently. Resolved.

## Assistant integration Grill Log
- **Q:** What changes here? **A:** Integrate the bounded assistant contract while preserving existing routes, source escaping, session guards and optional reduced-motion enhancement. Server credentials remain secret; browser cache graph advances together. Resolved.

Final assistant release uses asset revision38 to invalidate earlier development UI caches.

Revision39 refreshes the complete browser module graph, including the new location helper and bilingual assistant voice lifecycle.

## Cache graph40 Grill Log
Resolved: all first-party browser imports, shell resources and worker revision advance together to40 for the reviewed map and discovery changes. No personal HTML or database records enter precache.

## Photographic page refinement Grill Log · #31
Resolved: search matches home viewport height, minimum640px and rounded corners on desktop/phone. Auth and About use the attributed real El Morro flags photograph with responsive local WebP derivatives, retained CC BY-SA4.0 license and no altered scenery. About has one header/title; policy documents retain their reading layout. Cookie explanations lead with human labels while naming actual cookies. Asset graph advances atomically to41. Forms and database-driven destination ordering remain unchanged.

## Full-width search Grill Log · #36
Resolved: explicit app-search body class on the open search route gives its shell8px viewport insets like home. Hero fills shell; remaining search rails retain1200px reading measure. Category/town pages keep their standard shells. Responsive hero image advertises100vw. Cache graph advances atomically to42; no filter/navigation changes.

## Shared field focus and policy labels Grill Log · #39
Resolved: search segments own one neutral2px inset focus indication; nested inputs/triggers do not add rings. Standard/picker fields use stronger neutral borders and a single focus stroke, with visible keyboard focus retained. Policy pages display effective dates without version numbers; internal agreement/version checks remain unchanged. Asset graph43 advances together.

## Curated publication Grill Log · #42
Resolved: Asset graph44 invalidates updated badge presentation and preserves existing browser import identities.

## Unknown publication facts Grill Log · #51
Resolved: missing price is null/None and never free; explicit zero is free. Missing end is null/None. Start stays required and finite. discovery_until is a separate generated cutoff: known end, otherwise exactly24 elapsed hours after start; it is never a displayed/exported end or proof that an event is ongoing. Existing known dates retain after-start/14-day validation. Unknown-end expiration is labeled archived; recurrence uses independent dated records. API arguments and assistant projections preserve null; exports omit unknown end/offer. Tests cover boundaries and bilingual output.

## Asset graph46 · #51
Resolved: browser import graph/worker/shell advance atomically; UNKNOWN_END_WINDOW_MILLIS is86400000, a discovery policy fallback matching the database generated UTC cutoff.

## Menu reader Grill Log · #69
Resolved: The menu stylesheet joins the current versioned shell; advance the complete asset graph together before the menu/media release.

## Release0.5.0 Grill Log
Resolved: advance the linked local asset/cache graph from56to57together for the activity-cover release; no policy versions or third-party vendor bundles change.

## Home-only assistant Grill Log · #86
Resolved: Advance document asset version to58. Changed main and assistant module identities are58; unchanged dependencies retain57 so shared state remains a single module instance. No policy version changes.

## Pending release cache Grill Log · #88
Resolved: advance document entry/styles/branding to60 and changed join-panel module import to60. Unchanged modules retain their current single identities; no private HTML enters the worker cache.

## Stable map cache Grill Log · #88
Resolved: document asset revision61 and worker61 load Explorer61; unchanged shared modules retain their existing identities. Preserve private HTML network-only and the existing map card/sheet presentation.

## Calendar and sheet cache Grill Log · #88
Resolved: asset/worker62 load SearchPickers62 and DateCalendar62; Explorer61 and shared dependencies retain their existing identities. CSS62 includes compact sheet tracks and localized calendar. No private data enters precache.

## Discovery surfaces Grill Log · #88
Resolved: Advance asset version63 for shared discovery surfaces.

## Unified form controls Grill Log · #88
Resolved: enhance canonical native selects through the shared dialog, retaining disabled options, validation, reset and category change events. Add single-date calendar mode with past-date and declared min/max support; date-time edits preserve the existing clock value. Birth dates permit historical year/month navigation; month-only reviews and opening-hour clocks keep native semantics with shared neutral styling. Checkboxes/radios/switches retain names and keyboard/disabled behavior. No new database contract or date inference.

## Picker fields and terms renewal Grill Log · #88
Resolved: advance asset/worker version to 65 for FormDates, SearchPickers and DateCalendar. Date, date-time, month and opening-hour fields now render as picker triggers (calendar, time, month and year pickers) instead of native text boxes, superseding the earlier native month/clock decision; native inputs stay canonical and validated. Members on older Terms or Privacy versions are asked to accept the current ones before other pages.

## Build fingerprint Grill Log
Resolved: asset/worker version 66 for the build check and skeleton fade.

## Quick-filter continuation Grill Log
Resolved: preserve canonical known traits through chips, forms, map/list, pagination and saved search. Combine traits by AND; Near me retains other filters. Family requires a stated minimum age at most12; unknown age is not a suitability claim. Step-free access is organizer-confirmed, not audited certification. Optional facts survive validation/editing and atomic database writes; legacy callers preserve existing facts. No app deployment.

## Grounded chat plans · #103 · Resolved Grill Log
Provider control tags are quarantined across chunk boundaries and retried within the existing budget, never displayed or executed as prose. Structured allowlisted calls remain authoritative. Public quick traits, places, itineraries and route results use typed database reads. Public map cards show supplied anchors and road geometry, explicitly label estimated travel and missing paths, and release maps on close/reset. No model coordinates, arbitrary SQL, fake data or paid fallback. Town routing is service-only, catalog-bounded, cached by directed town pair and transactionally locked; no per-user position is sent or stored. Every changed schema is verified in both environments.

## Visitor release browser correction · #107
Resolved: trip panel implicit rows use max-content so a forecast card cannot collapse into a strip under the mobile sheet height limit. The panel keeps independent scrolling and map framing; hourly rows remain readable on desktop. CSS/asset revision76. Real390px/1280px checks required.

Resolved final asset contract · #107: compact forecast/disclosure and desktop map accessibility use entry/styles/worker77; changed Weather77 and Trip77 share one import identity. No private test scenario enters the build.

## Place pin release Grill Log · #120
Resolved: advance only the changed module import chain, static stylesheet and worker shell to81. The offline shell never caches private pages. Place pins have a distinct route and no date/free label; tests execute actual projection and marker selection.

Business artwork revision82 supersedes the unreleased81 category-only pin change. Official logo assets live under /assets/listings/, while record-to-logo references remain database data. Cached changed imports advance together; no new live-location module identity. Resolved.

## Discovery corrections cache contract · #124
Resolved: entry/style/worker revision83 refreshes the changed listing and explorer modules. Unchanged shared location/network modules keep their existing single identities. No personalized HTML or database data enters the offline shell.

## Pagination feedback ordering · #124
Resolved: the production browser exposed click-capture microtasks running before the target load-more listener. Shared navigation feedback now decides in the bubbling phase and never owns a canceled/script-handled click. Pagination uses its own closure lock rather than interpreting another component's aria-busy flag. Test actual shared feedback plus actual loadMore with a microtask checkpoint between capture and target, then completion/repeat activation. Asset revision84 refreshes both changed modules and entry; no database change.

## Social transport format correction · #124
Resolved: browser screenshot bytes must be converted to true PNG before storing social.png; the browser capture API can return JPEG despite a chosen filename. Preserve the visual raster; verify PNG signature, IHDR1200×630 and bounded bytes rather than relying on filename or a format-agnostic image viewer. Revision85 refreshes sharing URLs and the shell.
