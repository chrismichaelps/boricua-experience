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
