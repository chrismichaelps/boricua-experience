---
type: module
fidelity: Active
---
# Public/PrivacyControls

## Purpose
Native details and checkbox inputs remain usable without JavaScript. Disclosure animation uses optional Motion; visual switches preserve named checkbox values, necessary choice disabled/checked, optional consent off by default. No analytics enabled by mere disclosure or checkbox animation.

## Interface
Existing public render/asset/feature contracts remain compatible.

## Algorithm
Native details and checkbox inputs remain usable without JavaScript. Disclosure animation uses optional Motion; visual switches preserve named checkbox values, necessary choice disabled/checked, optional consent off by default. No analytics enabled by mere disclosure or checkbox animation.

## Negative Logic
No raster generation, third-party scripts, implicit consent or hidden account writes.

## Edge Cases
Keyboard, disabled necessary checkbox, reduced motion, narrow/short screens, offline upgrades.

## Grill Log
- Q: Are semantics changed by visual enhancement? A: Native inputs remain the source of truth; only explicit submission saves choices. Resolved.

## Referenced by
[[src/_MOC]] · [[handoffs/homepage-refresh]]
