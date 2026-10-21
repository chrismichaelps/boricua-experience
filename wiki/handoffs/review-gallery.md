# Review gallery · #191

Role: Architect → Implementer. Owns place gallery composition, review sidebar, browser lifecycle, styling, bilingual copy and presentation regressions. Preserve other work.

## Review gallery · #191 — resolved Grill Log
The inspected reference pairs a contained image with an independent context column. Render existing visible place reviews on the left at desktop widths, below the image on phones; explicitly title these as reviews of the place, not attributed to the selected photo. Use only published highlights, capped at six regardless of cursor/filter, preserve all ratings and escape content. No data import, fabricated reviews or schema change. Empty reviews show a truthful invitation. Native modal keeps background inert, exact scroll/focus restoration and Escape; thumbnails, arrows, keyboard and touch navigation keep the selected image/count/current thumbnail synchronized. Single-photo controls hide, links retain no-script/modifier behavior. Large photos stay uncropped; no autofocus moves on image changes. Review links close before navigating to their existing full-review anchor.

Next action: implement and validate the bounded viewer, then independent review and production release.

## Verification
Independent source/wiki review clear.22suites/776assertions and every browser/timezone harness pass. Browser-tested the actual rendered component with an ignored seven-image/two-review fixture at1280px and390px: thumbnail selection, next/wrap, keyboard arrows, horizontal pointer swipe, modal Escape, exact overflow/focus restoration and no horizontal overflow. Production data remains untouched. Next action: commit, merge to dev and release0.16.0; verify the live original-source gallery and truthful empty reviews.
