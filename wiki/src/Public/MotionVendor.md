---
type: module
fidelity: Active
tags: [module, presentation]
---

# MotionVendor

## Purpose

Pinned upstream animation library and MIT license in public/assets/js/vendor.

## Interface

motion-14.1.0.js is the upstream UMD distribution imported for its global Motion export.

## Algorithm

Vendor code is immutable third-party code; application source remains below 500 lines. Record package integrity and SHA256 in provenance; do not add a bundler or weaken CSP.

## Negative Logic

No secret data, persistent animation loops, hidden unenhanced content or new remote runtime dependencies.

## Edge Cases

Reduced motion, interrupted transitions, unsupported enhancement, keyboard focus, narrow screens, no scripts and returning cached clients.

## Depth

MEDIUM: progressive presentation; vendor is an external library boundary.

## Grill Log

- **Q:** What keeps this change bounded?
  **A:** Vendor code is immutable third-party code; application source remains below 500 lines. Record package integrity and SHA256 in provenance; do not add a bundler or weaken CSP.

## Referenced by

[[src/_MOC]] · [[subsystems/Presentation]] · [[handoffs/homepage-refresh]]
