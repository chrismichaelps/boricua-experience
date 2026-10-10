---
type: module
fidelity: Active
tags: [module, map]
---

# MapClusters

## Purpose

Deterministic screen-space grouping for readable map markers.

## Interface

public/assets/js/features/mapClusters.js exports clusterPins(pins, project, radius).

## Algorithm

At overview zoom, greedily group nearby projected points within a fixed radius of the group anchor. Preserve all pins exactly once. Explorer renders count markers and zooms into grouped locations.

## Negative Logic

No dropped activity, private location disclosure, new network calls or changes to map filtering.

## Edge Cases

Empty results, identical coordinates, radius boundary, mobile viewport and reduced-motion zoom.

## Depth

MEDIUM: map presentation contract.

## Grill Log

- **Q:** How is marker decluttering verified?
  **A:** Screen-space grouping keeps compact count markers readable on mobile while every activity remains in the full event list. At detail zoom individual price markers return.

## Referenced by

[[src/_MOC]] · [[src/Public/Explorer]]
