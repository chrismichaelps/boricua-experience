---
type: module
path: "@root/public/assets/js/home-readiness.js"
fidelity: Active
tags: [module, public]
---
# HomeReadiness

## Purpose and interface
Small external classic head script, following the existing accessibility boot exception: enable home skeleton before body parsing and clear after first hero decode and font readiness. No fake minimum delay; bounded4s fail-open, image errors, focus/pointer interaction, BFCache and exit all clear. Root errors and no-JS remain usable. No private storage/network calls.

## Negative logic and edge cases
Never block input, cache private data, fake progress or refit a camera because results refreshed. Handle reduced motion, no script, failed resources, small viewports and lifecycle restoration.

## Grill Log
Resolved: the bounded contracts above preserve server rendering, native forms and existing map semantics.

## Referenced by
[[src/_MOC]]

## Shimmer
Skeleton blocks use a moving light band (1.3s linear) instead of an opacity pulse; reduced motion shows them static.

## Scroll intent and fade
Wheel, touch-move, scroll and key presses reveal the page immediately (the content is already rendered; scrolling behind a fixed placeholder landed visitors somewhere unseen). The skeleton stays in the layout but invisible when not pending and fades out over 0.28s instead of disappearing; reduced motion removes the fade.
