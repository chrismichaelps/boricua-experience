---
type: module
fidelity: Active
grammar: "[[grammar/browser]]"
tags: [module, map]
---

# MapViewport

## Purpose

Visible map results and bounded camera query geometry.

## Interface

MapViewport exports visiblePins and viewportQuery; tests run through scripts/map-viewport-test.mjs and scripts/explorer-test.mjs.

## Algorithm

Project pins into the unobscured canvas. Clamp read-query center to the existing Puerto Rico search bounds and measure a radius that covers the canvas corners, bounded at 200km.

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

## Moving nearby and 3D Grill Log · #78
Resolved: `snapArea` widens the camera outward to a zoom-only grid so moving visitors share cached areas; `speedBetween` and `speedZoom` choose the following zoom from ground speed. See [[decisions/ADR-0011-moving-nearby-and-3d-map]].
