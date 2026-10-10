---
type: module
fidelity: Active
tags: [module, mobile, performance]
---

# Haptics

## Purpose

Feature-detected short Vibration API pulses for trusted click/change/invalid interactions and successful save/reaction feedback. No permission hacks, no iOS promise, no repeated scrolling vibration. Respect hidden pages, reduced motion and a brief cooldown. Unsupported vibration never blocks an action.

## Interface

Owned bounded implementation under the corresponding browser/database/test module.

## Algorithm

Feature-detected short Vibration API pulses for trusted click/change/invalid interactions and successful save/reaction feedback. No permission hacks, no iOS promise, no repeated scrolling vibration. Respect hidden pages, reduced motion and a brief cooldown. Unsupported vibration never blocks an action.

## Negative Logic

No hidden database mutations, personal data exposure, credential logging, browser permission bypass or hardware support claims.

## Edge Cases

Empty data, invalid bounds, dense regions, trusted interaction, interrupted gestures, cached pages and reduced motion.

## Depth

MEDIUM: bounded boundary adaptation.

## Grill Log

- **Q:** What keeps this feature safe and bounded? **A:** Feature-detected short Vibration API pulses for trusted click/change/invalid interactions and successful save/reaction feedback. No permission hacks, no iOS promise, no repeated scrolling vibration. Respect hidden pages, reduced motion and a brief cooldown. Unsupported vibration never blocks an action. Resolved.

## Referenced by

[[src/_MOC]] · [[handoffs/homepage-refresh]]
