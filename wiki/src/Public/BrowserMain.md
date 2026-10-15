---
type: module
fidelity: Active
tags: [module, presentation, carousel]
---

# BrowserMain

## Purpose

Wires the hero-carousel feature alongside the existing feature registry; no change to auth, location or search wiring.

## Interface

hero(frame, catalog) / heroCarousel(node), wired by data-feature="hero-carousel".

## Algorithm

Server emits the first scene and functional search. The browser rotates only backgrounds and the caption; search/navigation stay fixed. Selected dot uses aria-pressed. Each image must decode before activation; stale asynchronous selections are discarded.

## Negative Logic

No moving focus, live-region announcement every six seconds, remote image loading, personal data or inline scripts. No automatic motion with prefers-reduced-motion.

## Edge Cases

No JavaScript (first image and search work), failed image decode, rapid dot clicks, page hidden, keyboard focus, hover, explicit pause, reduced-motion change.

## Depth

MEDIUM: presentation boundaries; Constants are shallow immutable data.

## Grill Log

- **Q:** How is motion added without making basic flows fragile?
  **A:** Local pinned Motion 14.1.0 loads through an optional feature. Page/card entry, button feedback and picker transitions respect reduced motion and settle on page hide. No CSS hides content before enhancement. Picker exit has a bounded fallback and never delays filter submission. Authentication retains email/password contracts; curved cotorra and official Google assets remain local.

- **Q:** How do the app-style search controls preserve filtering?
  **A:** Native named selects remain the submission source and no-script fallback. Progressive picker dialogs expose a searchable municipality list and existing date windows with translated labels, keyboard dismissal and focus restoration. Pill submission retains category, free, sort and coordinates. Version 7 refreshes entry/styles; unchanged carousel modules keep their version 3 imports.

- **Q:** Can an old worker return configuration without the new carousel export?
  **A:** The main-to-carousel and carousel-to-config imports use version 3 URLs, so an old cache-first worker cannot substitute the prior unversioned modules. Both are in the new anonymous precache.


- **Q:** Does the entire hero move?
  **A:** No. Backgrounds crossfade; the cotorra, search form and navigation stay fixed. The caption and selected dot update together.
- **Q:** How does motion stay controllable?
  **A:** A labelled pause button persists user choice. Focus, hover and page hide suspend the timer; reduced-motion preference disables automatic rotation and fades.
- **Q:** How are failed/late image loads handled?
  **A:** Keep the current image until the next decodes. A selection ticket ignores stale completions.

## Referenced by

[[src/_MOC]] · [[src/View/Pages/Home]] · [[subsystems/Presentation]]

## Resolved follow-up Grill Log

- **Q:** What contract fixes the reported gap?
  **A:** All shared Live imports must use the same versioned module URL, preventing duplicate watcher/sharing state across main, explorer and eventMaps. Version 16 invalidates changed map/location/auth assets; unchanged carousel keeps v3. Resolved.

## Native / spatial follow-up Grill Log

- **Q:** What is the resolved mobile and scaling contract?
  **A:** Initialize optional interaction feedback and mobile sheet gesture module; use one versioned import graph. Resolved.

## Parrot/privacy continuation
Use original cotorra puertorriqueña SVG assets and optional Motion privacy disclosure without changing native checkbox submission. Grill: local assets and progressive enhancement preserve behavior; resolved.

## Brand refresh contract
Original compact parrot replaces the former mascot. Brand asset URLs use shared version20; changed entry/styles/Motion refresh together while unchanged map imports retain their single version19 identity. Grill: named links and native search semantics are preserved; resolved.

Current cache graph: version37 aligns every browser import and shell resource for the mobile menu and refreshed map date fixes.

## Assistant integration Grill Log
- **Q:** What changes here? **A:** Integrate the bounded assistant contract while preserving existing routes, source escaping, session guards and optional reduced-motion enhancement. Server credentials remain secret; browser cache graph advances together. Resolved.

Assistant initializes via optional dynamic import catch; failure does not prevent existing discovery/map/consent handlers. Shared import graph advances together toversion37.

## Explicit location lifecycle Grill Log
Resolved: nearby lookup stays private; initial acquisition uses the bounded accurate/balanced fallback. Fresh readings alone enable the sharing badge. No storage restores sharing; hiding or leaving stops it. Epochs reject stale callbacks and serialized writes prevent a late update undoing stop. Map controls expose purpose/status in both languages; the map omits the assistant.

## Cache graph40 Grill Log
Resolved: all first-party browser imports, shell resources and worker revision advance together to40 for the reviewed map and discovery changes. No personal HTML or database records enter precache.

## Photographic page refinement Grill Log · #31
Resolved: search matches home viewport height, minimum640px and rounded corners on desktop/phone. Auth and About use the attributed real El Morro flags photograph with responsive local WebP derivatives, retained CC BY-SA4.0 license and no altered scenery. About has one header/title; policy documents retain their reading layout. Cookie explanations lead with human labels while naming actual cookies. Asset graph advances atomically to41. Forms and database-driven destination ordering remain unchanged.

## Full-width search Grill Log · #36
Resolved: explicit app-search body class on the open search route gives its shell8px viewport insets like home. Hero fills shell; remaining search rails retain1200px reading measure. Category/town pages keep their standard shells. Responsive hero image advertises100vw. Cache graph advances atomically to42; no filter/navigation changes.

## Shared field focus and policy labels Grill Log · #39
Resolved: search segments own one neutral2px inset focus indication; nested inputs/triggers do not add rings. Standard/picker fields use stronger neutral borders and a single focus stroke, with visible keyboard focus retained. Policy pages display effective dates without version numbers; internal agreement/version checks remain unchanged. Asset graph43 advances together.

## Curated publication Grill Log · #42
Resolved: Mechanical asset graph44 only; behavior unchanged.

## Resolved feedback Grill Log · #45
Wire password controls and native submission feedback before feature dispatch. Prevent duplicate native submissions without dropping named submitter values; reset on pageshow; defer feedback until all submit listeners accept submission. Resolved.

## Asset graph46 · #51
Resolved: first-party import identities and worker cache advance together to46 for nullable schedule/price rendering. Public code changes are limited to LocalTime, BrowserMessages, AssistantStream and Explorer; other browser modules only change dependency identities. No private data enters precache.

## Release0.5.0 Grill Log
Resolved: advance the linked local asset/cache graph from56to57together for the activity-cover release; no policy versions or third-party vendor bundles change.

## Home-only assistant Grill Log · #86
Resolved: Main58 loads the corrected assistant58; unchanged modules retain57 identities. This focused cache invalidation avoids duplicate live-location state.

## Pending release cache Grill Log · #88
Resolved: advance document entry/styles/branding to60 and changed join-panel module import to60. Unchanged modules retain their current single identities; no private HTML enters the worker cache.

## Stable map cache Grill Log · #88
Resolved: document asset revision61 and worker61 load Explorer61; unchanged shared modules retain their existing identities. Preserve private HTML network-only and the existing map card/sheet presentation.

## Calendar and sheet cache Grill Log · #88
Resolved: asset/worker62 load SearchPickers62 and DateCalendar62; Explorer61 and shared dependencies retain their existing identities. CSS62 includes compact sheet tracks and localized calendar. No private data enters precache.

## Discovery surfaces Grill Log · #88
Resolved: Advance changed Explorer import and cache graph for MapSurface while preserving shared unchanged module identity.

## Unified form controls Grill Log · #88
Resolved: enhance canonical native selects through the shared dialog, retaining disabled options, validation, reset and category change events. Add single-date calendar mode with past-date and declared min/max support; date-time edits preserve the existing clock value. Birth dates permit historical year/month navigation; month-only reviews and opening-hour clocks keep native semantics with shared neutral styling. Checkboxes/radios/switches retain names and keyboard/disabled behavior. No new database contract or date inference.

## Picker fields and terms renewal Grill Log · #88
Resolved: advance asset/worker version to 65 for FormDates, SearchPickers and DateCalendar. Date, date-time, month and opening-hour fields now render as picker triggers (calendar, time, month and year pickers) instead of native text boxes, superseding the earlier native month/clock decision; native inputs stay canonical and validated. Members on older Terms or Privacy versions are asked to accept the current ones before other pages.

## Build check
`buildCheck()` runs on every page; version 66.

## Search arrival resolved contract
Explicit discovery actions scroll to the results heading through the progressive listing module; direct entry/history retain their position, cancelled actions are ignored and reduced motion is respected. The entry and changed listing module use asset version71. Resolved.

## Grounded chat plans · #103 · Resolved Grill Log
Provider control tags are quarantined across chunk boundaries and retried within the existing budget, never displayed or executed as prose. Structured allowlisted calls remain authoritative. Public quick traits, places, itineraries and route results use typed database reads. Public map cards show supplied anchors and road geometry, explicitly label estimated travel and missing paths, and release maps on close/reset. No model coordinates, arbitrary SQL, fake data or paid fallback. Town routing is service-only, catalog-bounded, cached by directed town pair and transactionally locked; no per-user position is sent or stored. Every changed schema is verified in both environments.

## Visitor release cache contract · #107
Resolved Grill Log: entry76 imports Trip76 and Weather76; Trip76 also imports Weather76. Unchanged location and map modules retain their single existing identities. Worker76 and document assets advance together, preserving private HTML network-only.

Resolved final asset contract · #107: compact forecast/disclosure and desktop map accessibility use entry/styles/worker77; changed Weather77 and Trip77 share one import identity. No private test scenario enters the build.

## Place pin release Grill Log · #120
Resolved: advance only the changed module import chain, static stylesheet and worker shell to81. The offline shell never caches private pages. Place pins have a distinct route and no date/free label; tests execute actual projection and marker selection.

Business artwork revision82 supersedes the unreleased81 category-only pin change. Official logo assets live under /assets/listings/, while record-to-logo references remain database data. Cached changed imports advance together; no new live-location module identity. Resolved.

## Discovery corrections cache contract · #124
Resolved: entry/style/worker revision83 refreshes the changed listing and explorer modules. Unchanged shared location/network modules keep their existing single identities. No personalized HTML or database data enters the offline shell.

## Consistent card copy Grill Log · #124
Resolved: standard rail/search cards keep a shared13rem copy track, matching cover proportions and title/metadata alignment. Long text remains present in a native vertical scroll area rather than clipped; page scroll can chain at its boundaries. The focusable card link supports Arrow/Page keys for overflow without extra nested tab stops; directional keys are intercepted only when the body can scroll that direction. A single delegated listener covers initial and asynchronously inserted cards. Horizontal activity rows keep their distinct128px copy/media tracks on wide screens. Map cards remain compact and unaffected. Place article uses card-venue rather than the paragraph-only card-place class to avoid inherited flex/ellipsis rules.

Resolved dynamic-card refinement #124: one delegated keyboard listener covers initial cards and later load-more/nearby-rail insertions. Busy-lock test proves one page append on repeated activation; overflow tests preserve native scrolling at boundaries and include a card inserted after listener setup. No per-card initialization or nested tab stops.

## Pagination feedback ordering · #124
Resolved: the production browser exposed click-capture microtasks running before the target load-more listener. Shared navigation feedback now decides in the bubbling phase and never owns a canceled/script-handled click. Pagination uses its own closure lock rather than interpreting another component's aria-busy flag. Test actual shared feedback plus actual loadMore with a microtask checkpoint between capture and target, then completion/repeat activation. Asset revision84 refreshes both changed modules and entry; no database change.
