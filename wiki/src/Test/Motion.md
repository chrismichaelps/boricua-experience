---
type: module
fidelity: Active
tags: [module, test, motion]
---

# Motion lifecycle checks

## Purpose

Verify reduced-motion gating, active animation cleanup, bounded picker completion and browser lifecycle observer release in scripts/motion-test.mjs.

## Interface

`node scripts/motion-test.mjs`; imports real vendored Motion to verify its export shape and package linkage, then tests application orchestration with deterministic DOM and animation doubles.

## Algorithm

Exercise the production feature source, capture animate calls and resolve real completion paths under reduce/visibility/page lifecycle changes. Assert app behavior rather than upstream animation internals.

## Negative Logic

No account mutations or credentials. Mock checks do not prove rendered animation timing; confirm actual browser panels and forms separately.

## Edge Cases

Initial reduced preference, preference change during exit, hidden page, failed animation, repeated page restoration and zero animation duration.

## Depth

MEDIUM: lifecycle boundary.

## Grill Log

- **Q:** Why test Motion integration?
  **A:** A stuck exit could trap focus or hide functional content. Tests require completion and observer cleanup when interrupted and skip automatic effects under reduced motion.

## Referenced by

[[src/_MOC]] · [[src/Public/Motion]]

## Native / spatial follow-up Grill Log

- **Q:** What is the resolved mobile and scaling contract?
  **A:** Verify delegated mobile control/checkbox/sheet animation respects reduced motion and never changes MapLibre positioning transforms. Resolved.
