---
type: module
fidelity: Active
tags: [module, presentation]
---

# Motion

## Purpose

Bounded native-feeling feedback using local Motion 14.1.0.

## Interface

motion() binds optional page/card/press/picker feedback; initialize from BrowserMain via dynamic import.

## Algorithm

Reduced motion skips effects and finishes active transitions; pagehide releases observers/animations. Native content remains visible without the feature. Picker close is cancellable with a short guaranteed completion fallback.

## Negative Logic

No secret data, persistent animation loops, hidden unenhanced content or new remote runtime dependencies.

## Edge Cases

Reduced motion, interrupted transitions, unsupported enhancement, keyboard focus, narrow screens, no scripts and returning cached clients.

## Depth

MEDIUM: progressive presentation; vendor is an external library boundary.

## Grill Log

- **Q:** What keeps this change bounded?
  **A:** Reduced motion skips effects and finishes active transitions; pagehide releases observers/animations. Native content remains visible without the feature. Picker close is cancellable with a short guaranteed completion fallback.

## Referenced by

[[src/_MOC]] · [[subsystems/Presentation]] · [[handoffs/homepage-refresh]]

## Native / spatial follow-up Grill Log

- **Q:** What is the resolved mobile and scaling contract?
  **A:** Extend delegated press feedback to navigation links, cards, picker triggers, sheet and location actions while excluding MapLibre positioned markers. Animate checkbox/radio labels after actual changes and sheet snapping with Motion, preserving reduced-motion and interrupted-navigation settling. Resolved.

## Fixed-position containment
Never transform an ancestor of fixed participation controls. Capture and restore original inline transform/opacity after animation, cancellation, hidden pages and preference changes. Grill: native animation final styles must not create a permanent containing block; resolved.

## Parrot/privacy continuation
Use original cotorra puertorriqueña SVG assets and optional Motion privacy disclosure without changing native checkbox submission. Grill: local assets and progressive enhancement preserve behavior; resolved.
