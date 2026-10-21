---
type: module
fidelity: Active
grammar: "[[grammar/browser]]"
tags: [module, browser, images]
---
# CoverImages

## Purpose and interface
`coverImages(root=document)` preserves complete small/square/portrait source images in cards and listing headers.

## Algorithm
Inspect already complete images, then capture image load events from the document. Add `image-contain` for intrinsic width below640px or width/height below1.2. Default category illustration URLs remain unchanged; normal large landscape photos retain their existing framing. Return a teardown for the listener.

## Negative logic
No remote requests, source/brand guessing, image upscaling, color filtering, arbitrary DOM writes, or observers on map animation frames. Invalid intrinsic dimensions do not classify images.

## Grill Log
Resolved: source thumbnails were enlarged/cropped by object-fit cover, not faded by opacity. Natural dimensions drive layout only, never publication facts. A capturing load listener covers lazy and refreshed cards without per-image handlers. Focus/navigation/control overlays remain unchanged.

## Referenced by
[[src/Public/BrowserMain]] · [[src/_MOC]]
