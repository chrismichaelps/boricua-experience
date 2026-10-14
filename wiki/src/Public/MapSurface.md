---
type: module
path: "@root/public/assets/js/features/mapSurface.js"
fidelity: Active
tags: [module, public]
---
# MapSurface

## Purpose and interface
Owns real loading indicator and reversible map expansion with Escape/focus restoration. connect(map,resize) updates the existing camera size without refitting. Busy updates preserve existing cards; no geolocation starts and no map data is invented. Test current-ticket cleanup, expanded geometry, Escape and lifecycle cleanup.

## Negative logic and edge cases
Never block input, cache private data, fake progress or refit a camera because results refreshed. Handle reduced motion, no script, failed resources, small viewports and lifecycle restoration.

## Grill Log
Resolved: the bounded contracts above preserve server rendering, native forms and existing map semantics.

## Referenced by
[[src/_MOC]]
