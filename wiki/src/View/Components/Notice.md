---
type: module
fidelity: Active
---
# View/Components/Notice

## Purpose
Privacy customization uses native details, aligned switch rows and accessible native checkboxes. Expanded panel scrolls inside the banner at small heights. Named values and submission semantics unchanged.

## Interface
Existing public render/asset/feature contracts remain compatible.

## Algorithm
Privacy customization uses native details, aligned switch rows and accessible native checkboxes. Expanded panel scrolls inside the banner at small heights. Named values and submission semantics unchanged.

## Negative Logic
No raster generation, third-party scripts, implicit consent or hidden account writes.

## Edge Cases
Keyboard, disabled necessary checkbox, reduced motion, narrow/short screens, offline upgrades.

## Grill Log
- Q: Are semantics changed by visual enhancement? A: Native inputs remain the source of truth; only explicit submission saves choices. Resolved.

## Referenced by
[[src/_MOC]] · [[handoffs/homepage-refresh]]

## Mobile/content correction Grill Log

- **Q:** What is the resolved contract? **A:** Every consent POST includes Form.token(frame), including authenticated necessary/all/custom submissions. Native redirect only dismisses after persistence. Resolved.

## Resolved feedback Grill Log · #45
Empty states use restrained typography and action with no decorative icon. Existing icon argument stays source-compatible but is unused. Resolved.
