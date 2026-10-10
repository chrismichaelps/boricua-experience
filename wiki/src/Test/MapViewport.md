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

## Empty located viewport regression

Grill resolved: model the real camera zoom and changing bounds after easing. Confirm an empty first precise view steps out by two levels, stops at the configured regional floor, stops when data appears, and respects a visitor pan. No hardware coordinates or database writes.

Refreshed-card regression asserts the semantic time child, its instant/style attributes and readable server text.
