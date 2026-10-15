---
type: module
path: "@root/scripts/social-image-test.mjs"
fidelity: Active
tags: [module, test]
---
# Social image transport
## Purpose
Validate the actual sharing raster format and geometry independently of its filename.
## Interface
node scripts/social-image-test.mjs
## Algorithm
Check PNG signature, first IHDR chunk,1200×630 dimensions and a2MB ceiling.
## Negative logic
No inference of exact typography from pixels; visual comparison remains a browser review.
## Grill Log
Resolved: the final transport check caught JPEG bytes under a.png path. This test fails that prior export and verifies the converted PNG without altering branding.
## Referenced by
[[src/_MOC]] · [[src/Public/Brand]]
