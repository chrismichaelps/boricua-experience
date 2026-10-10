---
type: module
fidelity: Active
tags: [module, mobile, performance]
---

# SheetGestures

## Purpose

Touch/pen dragging begins only on the semantic sheet handle. An upward/downward threshold snaps expanded/collapsed state via the existing click contract. Ignore horizontal movement and vertical list scrolling; pointercancel clears state and suppress the ensuing synthetic click only after a real swipe.

## Interface

Owned bounded implementation under the corresponding browser/database/test module.

## Algorithm

Touch/pen dragging begins only on the semantic sheet handle. An upward/downward threshold snaps expanded/collapsed state via the existing click contract. Ignore horizontal movement and vertical list scrolling; pointercancel clears state and suppress the ensuing synthetic click only after a real swipe.

## Negative Logic

No hidden database mutations, personal data exposure, credential logging, browser permission bypass or hardware support claims.

## Edge Cases

Empty data, invalid bounds, dense regions, trusted interaction, interrupted gestures, cached pages and reduced motion.

## Depth

MEDIUM: bounded boundary adaptation.

## Grill Log

- **Q:** What keeps this feature safe and bounded? **A:** Touch/pen dragging begins only on the semantic sheet handle. An upward/downward threshold snaps expanded/collapsed state via the existing click contract. Ignore horizontal movement and vertical list scrolling; pointercancel clears state and suppress the ensuing synthetic click only after a real swipe. Resolved.

## Referenced by

[[src/_MOC]] · [[handoffs/homepage-refresh]]

## Reviewed refinement
Map results preserve the server limited flag and show a bilingual zoom-in notice. Reaction forms lock their shared group; horizontal handle drags suppress the ensuing click. Existing public coordinate visibility remains unchanged. Grill Log: reviewed edge contracts resolved.
