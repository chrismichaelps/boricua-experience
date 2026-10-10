---
type: module
fidelity: Active
tags: [module, test, carousel]
---

# Carousel tests

## Purpose

Exercise the production carousel with synthetic DOM elements, media preference and clock. Verify automatic rotation, manual selection, captions, pause, focus/hover, visibility, reduced motion, failed decoding, rapid selections and an upgrade with cached pre-carousel configuration.

## Interface

`node scripts/carousel-test.mjs`; rendered HTML checks run with `pudu test test/View`.

## Algorithm

A VM executes the browser module with boundary stubs. A deterministic clock invokes scheduled callbacks; image promises model successful, failed and late decodes.

## Negative Logic

No real browser/network/database access. Browser smoke tests separately verify real images and responsive controls.

## Edge Cases

Suspended timer, manual controls with reduced motion, image decode rejection, stale decode completion, caption/link synchronization.

## Depth

MEDIUM: checks observable behavior across the browser boundary.

## Grill Log

- **Q:** Why use a controlled clock? **A:** The six-second rotation and pause conditions can be verified immediately without slow/flaky sleep tests.

## Referenced by

[[src/_MOC]] · [[src/Public/Carousel]]
