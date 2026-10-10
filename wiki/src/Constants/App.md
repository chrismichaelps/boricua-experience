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

Current cache graph: version32 aligns every browser import and shell resource for the mobile menu and refreshed map date fixes.
