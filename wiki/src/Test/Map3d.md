---
type: module
path: "@root/scripts/map-3d-test.mjs"
fidelity: Active
tags: [module, test]
---
# Map3d regression
## Purpose
Execute the actual 3D rotation module with map, storage and control doubles.
## Interface
node scripts/map-3d-test.mjs
## Algorithm
Check initial/restored/explicit3D camera, keyboard/gesture switches, rotation controls, storage failure and reduced motion.
## Negative logic
Synthetic events do not prove physical-device touch behavior.
## Grill Log
Resolved: compact joystick captures only one primary pointer, ignores subthreshold motion, rotates on drag, suppresses reset after drag, supports north tap and keyboard directions; canceled/lost captures stop further movement. Existing trip behavior remains untouched.
## Referenced by
[[src/_MOC]] · [[src/Public/Map3d]]
