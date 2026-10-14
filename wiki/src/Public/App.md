---
type: module
fidelity: Active
tags: [module, browser]
---
# Public.App
## Purpose
Navigation helpers, join form disclosure, retry and worker registration.
## Interface
back, joinPanel, retry, registerServiceWorker.
## Algorithm
Preserve native navigation and named submission. A ResizeObserver measures the fixed join panel in screen pixels, normalizes by the footer CSS zoom, then reserves equivalent footer padding. No extra body gap is needed; footer remains reachable above fixed controls.
## Negative Logic
No data writes, fabricated state or suppression of native forms.
## Edge Cases
Missing observer, no form, accessibility zoom, panel resize and viewport changes.
## Grill Log · #88
Resolved: normalize measured panel height in the footer coordinate system. Do not count scaled pixels twice. Observer disconnects on pagehide and resumes on pageshow.
## Referenced by
[[src/_MOC]] · [[src/Public/Styles]]
