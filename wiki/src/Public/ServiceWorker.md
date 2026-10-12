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
