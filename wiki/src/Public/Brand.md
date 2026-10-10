---
type: module
fidelity: Active
---
# Public/Brand

## Purpose
Original vector identity for Boricua Experience, based on the Puerto Rican Amazon (Amazona vittata): compact body, hooked bill, eye ring, short rounded tail. The search bird adds green plumage, a narrow red forehead and blue flight feathers. Species reference: https://www.fws.gov/species/puerto-rican-amazon-amazona-vittata.

## Interface
`cotorra-mark.svg` and `logo.svg` share the monochrome master; `cotorra-search.svg` is the matching search illustration. `icon.svg`, install/touch PNGs and favicon derive from the same master. Pacifico remains the locally licensed wordmark font. Decorative images have empty alt text inside named links.

## Algorithm
Compact cubic curves, negative-space wing and eye, restrained flat colors. A single original mark is reused at every size. PNGs are deterministic raster exports of the SVG, not generated photographs. Version20 refreshes brand URLs and shell cache.

## Negative Logic
No former frog mascot assets, copied third-party artwork, generated bitmap illustration, stock mascot, external image/font requests, gradients or tiny decorative detail.

## Edge Cases
White-on-photo, blue-on-white, 32px header, 16px favicon, 192/512px install icon and maskable safe zone. Search remains decorative and cannot intercept controls.

## Grill Log
- Q: How is the species recognizable? A: Hooked bill, compact Amazon proportions, eye ring and short tail; colored companion retains red forehead and blue flight feathers. Resolved.
- Q: How are existing installations refreshed? A: Brand/icon URLs carry the shared asset version and service-worker namespace advances. Resolved.
- Q: Why two variants? A: Monochrome mark remains legible beside the wordmark; the search companion has the species colors and the same restrained geometry. Resolved.

## Referenced by
[[src/_MOC]] · [[src/View/Layout]] · [[src/View/Components/Search]] · [[src/View/Components/Footer]] · [[src/Public/ServiceWorker]] · [[handoffs/homepage-refresh]]
