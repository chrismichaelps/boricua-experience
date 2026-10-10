---
type: module
fidelity: Active
---
# Toggle

## Purpose
Serialize save and reaction submissions with disabled controls and aria-busy, restore controls after errors, and feature-detect success haptics.

## Interface
Existing browser transport/feature exports remain compatible.

## Algorithm
Serialize save and reaction submissions with disabled controls and aria-busy, restore controls after errors, and feature-detect success haptics.

## Negative Logic
No hidden writes or permission bypass; failures remain retryable.

## Edge Cases
Aborted requests, duplicate submissions, missing vibration support and cached pages.

## Grill Log
- Q: Does enhancement block core actions? A: Controls restore in finally and feedback is optional. Resolved.

## Referenced by
[[src/_MOC]] · [[handoffs/homepage-refresh]]

## Reviewed refinement
Map results preserve the server limited flag and show a bilingual zoom-in notice. Reaction forms lock their shared group; horizontal handle drags suppress the ensuing click. Existing public coordinate visibility remains unchanged. Grill Log: reviewed edge contracts resolved.
