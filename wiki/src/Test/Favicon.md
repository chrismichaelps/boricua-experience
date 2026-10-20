# Search favicon assets

Source: scripts/favicon-test.mjs.

## Purpose and interface
Run with node scripts/favicon-test.mjs, included by the existing test.sh glob. Verify the favicon container and raster dimensions without image-processing dependencies or network requests.

## Algorithm
Read the ICO header, inspect each directory entry and its bounded payload, then verify PNG magic/IHDR square dimensions and matching directory sizes. Require the exact supported size set and compare the192px standalone PNG dimensions.

## Negative paths and edge cases
Reject a mislabeled32px ICO, missing48/96px entries, truncated entries, non-PNG payloads and dimensions that disagree with metadata. This proves local bytes, not Google's eventual selection.

## Grill Log — resolved
Use the existing official512px cotorra export with native deterministic downsampling; no new artwork or dependencies. Test actual asset bytes rather than source-string expectations. Shared rendered-output regressions verify stable discovery URLs.

## Referenced by
[[src/_MOC]] · [[src/Public/Brand]] · [[src/Test/Presentation]]
