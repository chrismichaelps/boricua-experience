---
type: module
fidelity: Active
tags: [module, test, images]
---
# Cover image sizing tests

## Interface
`node scripts/cover-images-test.mjs` executes the real enhancement with a minimal DOM boundary.

## Resolved Grill Log
Verify small/square/portrait containment, large landscape cover behavior, default category preservation, invalid/failed image dimensions, lazy-load classification, newly inserted map cards, recycled source reset and teardown. This does not establish real-device rendering; browser checks supply that evidence.

## Referenced by
[[src/Public/CoverImages]] · [[src/_MOC]]
