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

## Free rotation
In 3D the camera turns freely: right-drag or ctrl-drag turns and tilts, a two-finger twist turns, a two-finger slide tilts, and shift with the arrow keys turns from the keyboard. Turn buttons step 30° left or right and a compass faces north again; its needle follows the bearing. 2D locks every rotation and restores north-up. A visible turn (15° or more) is reported as a `bx:action` `map_rotate` event for features that count exploration.

## Referenced by
[[src/_MOC]] · [[src/Public/Explorer]]

## Compact joystick refinement · #124
Resolved user sizing: discovery rotation is one44px circular compass, equal to the map buttons. Hide the former side buttons only on discovery; pointer drag rotates continuously, tap resets north, Left/Right keys step rotation and Home resets. Capture one primary pointer, ignore secondary pointers, cancel safely, suppress a drag's synthetic reset click and detach location-follow on explicit rotation. Existing trip controls remain unchanged. Localized label explains drag and north action. This supersedes the96px pad.

## Round route compass · #175
Route maps (plan cards and the live trip) use the same compact joystick as discovery: one round compass, no side arrows. `public/assets/js/features/mapExpand.js` (`expandable(map, button, frame)`) opens a route map over the whole screen, locks page scroll, resizes the map and calls `frame` so the route is fitted again; Escape or the same button closes it.
