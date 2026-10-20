---
type: module
fidelity: Active
---
# Public/Brand

## Purpose
Original vector identity for Boricua Experience, based on the Puerto Rican Amazon (Amazona vittata): compact body, hooked bill, eye ring, short rounded tail. The search bird adds green plumage, a narrow red forehead and blue flight feathers. Species reference: https://www.fws.gov/species/puerto-rican-amazon-amazona-vittata.

## Interface
`cotorra-mark.svg` and `logo.svg` share the green/red master; `cotorra-search.svg` is the matching search illustration. `icon.svg`, install/touch PNGs and favicon derive from the same master. Pacifico remains the locally licensed wordmark font. Decorative images have empty alt text inside named links.

## Algorithm
Compact cubic curves, filled wing and ivory eye ring, restrained flat colors. A single original mark is reused at every size. PNGs are deterministic raster exports of the SVG, not generated photographs. Version33 refreshes brand URLs and shell cache.

## Negative Logic
No former frog mascot assets, copied third-party artwork, generated bitmap illustration, stock mascot, external image/font requests, gradients or tiny decorative detail.

## Edge Cases
Green/red-on-photo, green/red-on-white, 32px header, 16px favicon, 192/512px install icon and maskable safe zone. Search remains decorative and cannot intercept controls.

## Grill Log
- Q: How is the species recognizable? A: Hooked bill, compact Amazon proportions, eye ring and short tail; colored companion retains red forehead and blue flight feathers. Resolved.
- Q: How are existing installations refreshed? A: Brand/icon URLs carry the shared asset version and service-worker namespace advances. Resolved.
- Q: Why two variants? A: The compact mark and search companion both retain species colors; the mark uses fewer curves for small sizes. Resolved.

## Referenced by
[[src/_MOC]] · [[src/View/Layout]] · [[src/View/Components/Search]] · [[src/View/Components/Footer]] · [[src/Public/ServiceWorker]] · [[handoffs/homepage-refresh]]

## Search companion redraw Grill Log

- **Q:** What changed in `cotorra-search.svg`?
  **A:** A three-quarter profile replaces the front-facing blob: a rounded crown and chest with soft plumage gradients, feather scallops, a red forehead band, a white eye ring with a brown iris, a pale hooked bill, a tucked wing with blue primaries, and zygodactyl feet gripping the search surface. Resolved.
- **Q:** How does it move?
  **A:** CSS inside the SVG, so it runs as a plain `<img>`. The bird rises out of the search surface, clipped at the surface line, and the feet settle after it. Afterwards it blinks every few seconds, glances left and right, and breathes slightly. `prefers-reduced-motion` disables every animation. Resolved.

## Peeking companion Grill Log

- **Q:** Why redraw the search parrot again?
  **A:** A full-body bird standing above the search surface read as a sticker. The companion is now a head and two feet, 84 × 60 (72 × 52 on phones), whose bottom edge sits flush on the surface while the feet hook over it. It rises from behind the edge (clipped at the surface line), blinks, glances side to side, and ducks briefly; reduced motion disables all of it. Resolved.
- **Q:** What changed in the carousel controls?
  **A:** A 28 px translucent pill with 6 px dots; the current dot stretches into a short bar. Each dot keeps a hit area of at least 24 × 44 through a pseudo-element, so the control shrinks visually without failing touch-target size. Resolved.

## Mobile/content correction Grill Log

- **Q:** What is the resolved contract? **A:** One green body/deep-green wing/red forehead/ivory bill/white eye-ring SVG master replaces monochrome/blue marks across header, footer, favicon and install assets. No recoloring filters. Original curves; deterministic PNG exports. Resolved.

## Exact-header social export · #124
Resolved: social.png is a1200×630 deterministic browser raster of the actual cotorra SVG and homepage brand markup, using local Pacifico and Nunito Sans through existing styles. Scale the whole lockup uniformly, retain white homepage text and green/red master, use the existing attributed Culebra photo with a contrast overlay. No generated or redrawn brand artwork; header source remains unchanged. Shared asset83 refreshes OG/Twitter links. Verify pixel dimensions, fonts loaded, absolute production URLs and live asset bytes.

## Social transport format correction · #124
Resolved: browser screenshot bytes must be converted to true PNG before storing social.png; the browser capture API can return JPEG despite a chosen filename. Preserve the visual raster; verify PNG signature, IHDR1200×630 and bounded bytes rather than relying on filename or a format-agnostic image viewer. Revision85 refreshes sharing URLs and the shell.


## Search favicon Grill Log · #167 — resolved
Google Search receives stable supported raster favicon URLs, independent of application asset revisions. The ICO directory contains16,32,48,96,192 and256px square PNG entries and its declared sizes match those bytes; the existing192px PNG is the primary large raster. Prefer raster candidates in rel=icon discovery, retaining the official vector and all install assets unchanged. Root ICO remains revalidated after24h. Crawler requests must return images and remain allowed by robots. Google indexing timing and display are external, never an immediate acceptance claim. Rendered shell and binary regressions check both halves of the contract.
