---
type: module
fidelity: Active
tags: [module, tests, discovery]
---

# Listing browser regressions
`scripts/listing-test.mjs` verifies one-shot explicit arrival, reduced motion, stale/malformed/blocked storage, direct navigation, history restoration, modified/external/map clicks and cancelled submissions. Real browser checks verify the result heading is visible after a search action. Grill Log: test observable navigation intent and scroll behavior without mirroring presentation styles; resolved.

## Referenced by
[[src/_MOC]] · [[src/Public/Listing]]

Resolved dynamic-card refinement #124: one delegated keyboard listener covers initial cards and later load-more/nearby-rail insertions. Busy-lock test proves one page append on repeated activation; overflow tests preserve native scrolling at boundaries and include a card inserted after listener setup. No per-card initialization or nested tab stops.
