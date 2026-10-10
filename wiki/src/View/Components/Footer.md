---
type: module
fidelity: Active
grammar: "[[grammar/pudu]]"
tags: [module, view, presentation]
---

# View.Components.Footer

## Purpose

Shared footer with the cotorra brand, four groups of real application links and cookie settings.

## Interface

`render(frame: &Frame.Frame) -> H.Node`. Consumed by [[src/View/Layout]].

## Algorithm

Render translated discovery, destination, community and legal groups. Every link uses a real route. End with cookie preferences, adult/copyright note and real-photography credits.

## Negative Logic

No fictional social profiles, unimplemented FAQ links, external tracking or copied third-party content.

## Edge Cases

Two columns on phones, four on desktop, footer hidden on full-screen map, Spanish/English parity, keyboard links at least 44px tall.

## Depth

MEDIUM: shared navigational presentation.

## Grill Log

- **Q:** What should appear in place of reference product lists?
  **A:** Existing activity search, free/weekend filters, map, featured municipalities, publishing/account routes and legal pages. Only implemented destinations are linked.
- **Q:** Are the destination images photographs of exact places?
  **A:** They are real photographs with verified place descriptions, author attribution, source links and reuse licenses on the public credits page.

## Referenced by

[[src/View/Layout]] · [[src/_MOC]] · [[subsystems/Presentation]]

- **Q:** How are the latest footer corrections applied?
  **A:** Compact desktop link rows, expanded island/community description in both locales, no AI imagery statement, and a photography credits link with the authors, licenses and source pages for the real photographs. Phone links retain 44px touch targets.

## Parrot/privacy continuation
Use original cotorra puertorriqueña SVG assets and optional Motion privacy disclosure without changing native checkbox submission. Grill: local assets and progressive enhancement preserve behavior; resolved.

## Brand refresh contract
Original compact parrot replaces the former mascot. Brand asset URLs use shared version20; changed entry/styles/Motion refresh together while unchanged map imports retain their single version19 identity. Grill: named links and native search semantics are preserved; resolved.
