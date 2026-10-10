---
type: module
fidelity: Active
tags: [module, map]
---

# MapClusters

## Purpose

Verify overview grouping without losing or duplicating activities.

## Interface

scripts/map-clusters-test.mjs imports the production pure function.

## Algorithm

Check nearby versus distant points, radius boundaries, input preservation, empty input and each pin appearing exactly once.

## Negative Logic

No dropped activity, private location disclosure, new network calls or changes to map filtering.

## Edge Cases

Empty results, identical coordinates, radius boundary, mobile viewport and reduced-motion zoom.

## Depth

MEDIUM: map presentation contract.

## Grill Log

- **Q:** How is marker decluttering verified?
  **A:** The pure algorithm is tested independently of MapLibre rendering; browser tests verify count-marker zoom, selection and total representation.

## Referenced by

[[src/_MOC]] · [[src/Public/Explorer]]
