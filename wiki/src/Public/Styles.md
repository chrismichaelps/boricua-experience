---
type: module
fidelity: Active
grammar: "[[grammar/browser]]"
tags: [module, presentation]
---

# Styles

## Purpose

Responsive homepage hero, transparent home navigation, local Pacifico wordmark, shared search pill and existing component styles.

## Interface

`app.css` holds base components; `home.css` holds the refresh and is loaded after it. The refresh stylesheet stays under 500 lines; the pre-existing base stylesheet is retained.

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

- **Q:** How do the app-style search controls preserve filtering?
  **A:** Native named selects remain the submission source and no-script fallback. Progressive picker dialogs expose a searchable municipality list and existing date windows with translated labels, keyboard dismissal and focus restoration. Pill submission retains category, free, sort and coordinates. Version 7 refreshes entry/styles; unchanged carousel modules keep their version 3 imports.

- **Q:** How does the lower homepage use the reference without copying its content?
  **A:** Spacious activity cards, local destination tiles and a collapsible full municipality directory preserve discovery routes. The footer has Boricua discovery, towns, participation and legal links; no invented social accounts or copied third-party product copy. Real destination photography is credited in both locales. Mobile search gives the date enough width.

- **Q:** How is the hero carousel integrated?
  **A:** [[src/View/Components/Hero]] owns the fixed search surface and four scene controls. [[src/Public/Carousel]] rotates local images and captions. New controls have Spanish/English labels; asset version 3 refreshes cached scripts and styles.


- **Q:** Should signed-in HTML be persisted for offline use?
  **A:** No. Only the generic offline page is stored; participant locations and account information must not remain after sign-out.
- **Q:** How does branding remain sharp?
  **A:** Local SVGs and a locally hosted font avoid bitmap scaling and third-party font requests.

## Referenced by

[[subsystems/Presentation]] · [[src/_MOC]]

Header-white branding is scoped to `.appbar`; the shared footer logo and wordmark retain blue contrast on the light footer.

- **Q:** How are colors and footer rhythm refined?
  **A:** Existing ocean blue, ink and neutral surfaces provide the shared palette. Desktop footer links use 32px rows without accumulated list gaps; mobile targets remain 44px. Real photographs replace the generated scenes, with public credits linked in the footer.

## Parrot/privacy continuation
Use original cotorra puertorriqueña SVG assets and optional Motion privacy disclosure without changing native checkbox submission. Grill: local assets and progressive enhancement preserve behavior; resolved.

## Mobile account-menu containing block

Grill Log resolved: the header backdrop filter makes a fixed descendant relative to the 64px header. While the phone menu is open, disable both backdrop-filter properties on the header so the panel spans the viewport; retain the normal header blur after closing and the desktop popover. Verify the final logout target is unobscured at phone widths.

## Mobile/content correction Grill Log

- **Q:** What is the resolved contract? **A:** Brand images retain their native green/red fills on every surface. Resolved.

- **Q:** Can a small phone reach the free-only filter? **A:** The horizontally scrolling filter rail retains native keyboard access and each pill has a minimum44px touch height. Resolved.

## Home icon contrast Grill Log
Resolved: white home icon buttons are scoped to the photo-header appbar. Assistant close/microphone controls keep ink contrast on their white dialog. Verify real phone render, not only presence of SVG paths.

## Discovery photo and footer Grill Log
Resolved: open search uses the first database-ordered featured scene, a local responsive real photograph and unchanged named filters. Category/town landing behavior stays intact. Empty scene catalogs render usable search without a broken image. Footer has current-year copyright, quiet grouped links and phone touch targets; eligibility policy is unchanged. Photograph source, CC BY2.0 attribution, resizing and crop are recorded in public credits and THIRD_PARTY_NOTICES.

## Photographic page refinement Grill Log · #31
Resolved: search matches home viewport height, minimum640px and rounded corners on desktop/phone. Auth and About use the attributed real El Morro flags photograph with responsive local WebP derivatives, retained CC BY-SA4.0 license and no altered scenery. About has one header/title; policy documents retain their reading layout. Cookie explanations lead with human labels while naming actual cookies. Asset graph advances atomically to41. Forms and database-driven destination ordering remain unchanged.

## Shared field focus and policy labels Grill Log · #39
Resolved: search segments own one neutral2px inset focus indication; nested inputs/triggers do not add rings. Standard/picker fields use stronger neutral borders and a single focus stroke, with visible keyboard focus retained. Policy pages display effective dates without version numbers; internal agreement/version checks remain unchanged. Asset graph43 advances together.
