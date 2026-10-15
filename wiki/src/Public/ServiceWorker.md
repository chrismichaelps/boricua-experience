---
type: module
fidelity: Active
grammar: "[[grammar/browser]]"
tags: [module, presentation]
---

# ServiceWorker

## Purpose

Versioned static shell; navigations use network with the generic offline page on failure and never cache personalized HTML.

## Interface

Public static assets served by [[src/Web/Static]] and used by [[src/View/Layout]].

## Algorithm

Styles use mobile-first rules; SVG assets are decorative with empty alt text. The worker precaches versioned public resources only.

## Negative Logic

No secrets, remote tracking, or private page caching. No inert controls.

## Edge Cases

Small screens, keyboard focus, reduced motion, offline navigation and upgrades from the old cache.

## Depth

MEDIUM: presentation and offline shell boundary.

## Grill Log

- **Q:** How is motion added without making basic flows fragile?
  **A:** Local pinned Motion 14.1.0 loads through an optional feature. Page/card entry, button feedback and picker transitions respect reduced motion and settle on page hide. No CSS hides content before enhancement. Picker exit has a bounded fallback and never delays filter submission. Authentication retains email/password contracts; curved cotorra and official Google assets remain local.

- **Q:** How do the app-style search controls preserve filtering?
  **A:** Native named selects remain the submission source and no-script fallback. Progressive picker dialogs expose a searchable municipality list and existing date windows with translated labels, keyboard dismissal and focus restoration. Pill submission retains category, free, sort and coordinates. Version 7 refreshes entry/styles; unchanged carousel modules keep their version 3 imports.

- **Q:** Can an old worker return configuration without the new carousel export?
  **A:** The main-to-carousel and carousel-to-config imports use version 3 URLs, so an old cache-first worker cannot substitute the prior unversioned modules. Both are in the new anonymous precache.


- **Q:** How is the hero carousel integrated?
  **A:** [[src/View/Components/Hero]] owns the fixed search surface and four scene controls. [[src/Public/Carousel]] rotates local images and captions. New controls have Spanish/English labels; asset version 3 refreshes cached scripts and styles.


- **Q:** Should signed-in HTML be persisted for offline use?
  **A:** No. Precache requests omit credentials. Only the anonymous offline page is stored; participant locations and account information must not remain after sign-out.
- **Q:** How does branding remain sharp?
  **A:** Local SVGs and a locally hosted font avoid bitmap scaling and third-party font requests.

## Referenced by

[[subsystems/Presentation]] · [[src/_MOC]]

## Parrot/privacy continuation
Use original cotorra puertorriqueña SVG assets and optional Motion privacy disclosure without changing native checkbox submission. Grill: local assets and progressive enhancement preserve behavior; resolved.

## Brand refresh contract
Original compact parrot replaces the former mascot. Brand asset URLs use shared version20; changed entry/styles/Motion refresh together while unchanged map imports retain their single version19 identity. Grill: named links and native search semantics are preserved; resolved.

Current cache graph: version33 aligns every browser import and shell resource for the mobile menu and refreshed map date fixes.

## Content boundary Grill Log
- **Q:** Does the shell embed featured destinations? **A:** No. The shell caches interface assets only; selected real photos load from the database-driven page and normal asset cache. Resolved.

## Assistant integration Grill Log
- **Q:** What changes here? **A:** Integrate the bounded assistant contract while preserving existing routes, source escaping, session guards and optional reduced-motion enhancement. Server credentials remain secret; browser cache graph advances together. Resolved.

Revision39 advances every first-party module URL with the shell, preventing an older cache from providing configuration without GEO or a stale assistant lifecycle.

## Cache graph40 Grill Log
Resolved: all first-party browser imports, shell resources and worker revision advance together to40 for the reviewed map and discovery changes. No personal HTML or database records enter precache.

## Photographic page refinement Grill Log · #31
Resolved: search matches home viewport height, minimum640px and rounded corners on desktop/phone. Auth and About use the attributed real El Morro flags photograph with responsive local WebP derivatives, retained CC BY-SA4.0 license and no altered scenery. About has one header/title; policy documents retain their reading layout. Cookie explanations lead with human labels while naming actual cookies. Asset graph advances atomically to41. Forms and database-driven destination ordering remain unchanged.

## Full-width search Grill Log · #36
Resolved: explicit app-search body class on the open search route gives its shell8px viewport insets like home. Hero fills shell; remaining search rails retain1200px reading measure. Category/town pages keep their standard shells. Responsive hero image advertises100vw. Cache graph advances atomically to42; no filter/navigation changes.

## Shared field focus and policy labels Grill Log · #39
Resolved: search segments own one neutral2px inset focus indication; nested inputs/triggers do not add rings. Standard/picker fields use stronger neutral borders and a single focus stroke, with visible keyboard focus retained. Policy pages display effective dates without version numbers; internal agreement/version checks remain unchanged. Asset graph43 advances together.

## Curated publication Grill Log · #42
Resolved: Mechanical shell graph44 only; personal HTML and database records remain outside precache.

## Asset graph46 · #51
Resolved: first-party import identities and worker cache advance together to46 for nullable schedule/price rendering. Public code changes are limited to LocalTime, BrowserMessages, AssistantStream and Explorer; other browser modules only change dependency identities. No private data enters precache.

## Menu reader Grill Log · #69
Resolved: Include menu.css in the versioned static graph; advance the complete graph together before the menu/media release. Personalized HTML and media remain outside precache.

## Release0.5.0 Grill Log
Resolved: advance the linked local asset/cache graph from56to57together for the activity-cover release; no policy versions or third-party vendor bundles change.

## Home-only assistant Grill Log · #86
Resolved: Worker revision58 precaches new document styles/branding/main and assistant58; unchanged shared dependencies retain57. Personalized HTML remains network-only.

## Pending release cache Grill Log · #88
Resolved: advance document entry/styles/branding to60 and changed join-panel module import to60. Unchanged modules retain their current single identities; no private HTML enters the worker cache.

## Stable map cache Grill Log · #88
Resolved: document asset revision61 and worker61 load Explorer61; unchanged shared modules retain their existing identities. Preserve private HTML network-only and the existing map card/sheet presentation.

## Calendar and sheet cache Grill Log · #88
Resolved: asset/worker62 load SearchPickers62 and DateCalendar62; Explorer61 and shared dependencies retain their existing identities. CSS62 includes compact sheet tracks and localized calendar. No private data enters precache.

## Discovery surfaces Grill Log · #88
Resolved: Advance shell to63, add readiness boot and MapSurface and update changed entry/Explorer styles together; private navigations remain network-only.

## Unified form controls Grill Log · #88
Resolved: enhance canonical native selects through the shared dialog, retaining disabled options, validation, reset and category change events. Add single-date calendar mode with past-date and declared min/max support; date-time edits preserve the existing clock value. Birth dates permit historical year/month navigation; month-only reviews and opening-hour clocks keep native semantics with shared neutral styling. Checkboxes/radios/switches retain names and keyboard/disabled behavior. No new database contract or date inference.

## Picker fields and terms renewal Grill Log · #88
Resolved: advance asset/worker version to 65 for FormDates, SearchPickers and DateCalendar. Date, date-time, month and opening-hour fields now render as picker triggers (calendar, time, month and year pickers) instead of native text boxes, superseding the earlier native month/clock decision; native inputs stay canonical and validated. Members on older Terms or Privacy versions are asked to accept the current ones before other pages.

## Build fingerprint Grill Log
Resolved: shell 66 adds buildCheck.

## Quick-filter continuation Grill Log
Resolved: preserve canonical known traits through chips, forms, map/list, pagination and saved search. Combine traits by AND; Near me retains other filters. Family requires a stated minimum age at most12; unknown age is not a suitability claim. Step-free access is organizer-confirmed, not audited certification. Optional facts survive validation/editing and atomic database writes; legacy callers preserve existing facts. No app deployment.

## Search arrival resolved contract
Explicit discovery actions scroll to the results heading through the progressive listing module; direct entry/history retain their position, cancelled actions are ignored and reduced motion is respected. The entry and changed listing module use asset version71. Resolved.

## Grounded chat plans · #103 · Resolved Grill Log
Provider control tags are quarantined across chunk boundaries and retried within the existing budget, never displayed or executed as prose. Structured allowlisted calls remain authoritative. Public quick traits, places, itineraries and route results use typed database reads. Public map cards show supplied anchors and road geometry, explicitly label estimated travel and missing paths, and release maps on close/reset. No model coordinates, arbitrary SQL, fake data or paid fallback. Town routing is service-only, catalog-bounded, cached by directed town pair and transactionally locked; no per-user position is sent or stored. Every changed schema is verified in both environments.

## Visitor release browser correction · #107
Resolved: trip panel implicit rows use max-content so a forecast card cannot collapse into a strip under the mobile sheet height limit. The panel keeps independent scrolling and map framing; hourly rows remain readable on desktop. CSS/asset revision76. Real390px/1280px checks required.

Resolved final asset contract · #107: compact forecast/disclosure and desktop map accessibility use entry/styles/worker77; changed Weather77 and Trip77 share one import identity. No private test scenario enters the build.

## Place pin release Grill Log · #120
Resolved: advance only the changed module import chain, static stylesheet and worker shell to81. The offline shell never caches private pages. Place pins have a distinct route and no date/free label; tests execute actual projection and marker selection.
