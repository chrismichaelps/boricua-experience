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
