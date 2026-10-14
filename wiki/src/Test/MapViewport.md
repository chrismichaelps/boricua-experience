---
type: module
fidelity: Active
grammar: "[[grammar/browser]]"
tags: [module, map]
---

# MapViewport

## Purpose

Regression checks for viewport culling, camera query geometry and asynchronous explorer/location integration.

## Interface

MapViewport exports visiblePins and viewportQuery; tests run through scripts/map-viewport-test.mjs and scripts/explorer-test.mjs.

## Algorithm

Run the production pure helpers and explorer in a VM with explicit map, DOM, transport and location boundaries. Synthetic coordinates avoid collecting the user location.

## Negative Logic

No backend mutations, hardware location collection, discarded search filters or response-driven camera moves.

## Edge Cases

Empty viewport, sheet occlusion, radius limits, moved camera, late responses, failed location and off-island position.

## Depth

MEDIUM.

## Grill Log

- **Q:** How are results tied to the map?
  **A:** Project actual activity coordinates, exclude points outside the visible canvas, refresh after camera movement and reject stale read responses. Resolved.

## Referenced by

[[src/_MOC]] · [[src/Public/Explorer]]

## Native / spatial follow-up Grill Log

- **Q:** What is the resolved mobile and scaling contract?
  **A:** Exact view bounds account for sheet occlusion and are passed to the bounded server request. Explorer test covers aborts and bounded cache behavior in addition to stale response protection. Resolved.

## Stable located viewport regression

Grill resolved: model camera zoom and changing bounds after easing. Empty results retain zoom; GPS jitter, accuracy degradation and recovery cannot repeatedly fit bounds. Initial coarse readings fit once before the first precise refinement. Visitor pan/zoom detaches until explicit recenter, and locate off preserves independent sharing without camera following. No hardware coordinates or database writes.

Refreshed-card regression asserts the semantic time child, its instant/style attributes and readable server text.

## Map lifecycle regression Grill Log
Resolved: bounded acquisition and writes, immediate stop plus late-update cleanup, stop/restart barrier, separate control subscriptions, no automatic sharing restoration and map-only assistant omission.

## Nullable schedule rendering Grill Log · #51
Resolved: refreshed sheet data-ends normalizes null to empty; LocalTime treats malformed ends as unknown. Organizing activity final-state text uses archived when actual end unknown, retaining cancellation precedence. Test actual date renderer with null-end sheet data and bilingual archived output.

## Stable discovery camera Grill Log · #88
Resolved: result responses never zoom the discovery camera. Remove empty-result widening and speed-based zoom because competing GPS/result eases cause oscillation. Explicit locate frames the initial accuracy once; a first precise fix may refine a previously coarse initial view once. Later readings only update position and follow center, preserving zoom even if accuracy degrades or speed changes. User pan/zoom/rotation detaches; recenter is explicit. Turning private locate off detaches even while sharing continues. Regression cases cover empty/filled responses, accuracy alternation, stationary/noisy/moving fixes, user gestures and sharing lifecycle. This supersedes earlier widening/speed-follow contracts.

Reviewed transition cases: simulate nonzero-duration easing without immediately assigning target zoom, duplicated locate/share callbacks, and pan before first location. Assert intended scale remains stable and late readings cannot reclaim the manually moved camera. Resolved.

Explicit exploration tests: focused list cards and activated clusters detach the location camera; later GPS readings still update the marker without undoing those choices. Resolved.
