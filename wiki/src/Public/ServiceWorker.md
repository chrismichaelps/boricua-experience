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
