---
type: module
fidelity: Active
grammar: "[[grammar/browser]]"
tags: [module, map]
---

# Map3d

> `public/assets/js/features/map3d.js` — the optional 3D building view of the map page.

## Purpose
Turn the map's hidden `building-3d` extrusion layer on or off and tilt the camera to match, remembering the choice in this browser only.

## Interface
```js
export function view3d(map, on, animate = true)
export function buildings3d(map, button)
```

## Algorithm
On: show the layer, tilt to `MAP.pitch3d`, and zoom to at least `MAP.buildingsZoom` so buildings are visible. Off: hide the layer and return to a flat, north-up camera. Reduced motion jumps instead of animating. Storage failures never block the switch.

## Negative Logic
- ❌ No new tile host, key or download: heights come from the existing vector tiles.
- ❌ No automatic 3D: it is off until the visitor turns it on.
- ❌ No claim of building data where OpenStreetMap has none.

## Grill Log
See [[decisions/ADR-0011-moving-nearby-and-3d-map]].

## Referenced by
[[src/_MOC]] · [[src/Public/Explorer]]
