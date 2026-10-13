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
