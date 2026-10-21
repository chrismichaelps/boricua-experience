---
type: module
fidelity: Active
---
# Public.PlaceGallery

## Purpose
Progressive native-dialog photo viewer.

## Algorithm
Image links work without scripts. Supported dialogs intercept links, open with a selected image, wrap prev/next, announce position, lock background scrolling and restore exact prior overflow/focus on close. Native Escape remains available. Reduced motion respected by CSS.

## Negative Logic
No external review/photo imports, hidden moderation content, fabricated ratings or network calls in views.

## Grill Log · #132
Resolved: Image links work without scripts. Supported dialogs intercept links, open with a selected image, wrap prev/next, announce position, lock background scrolling and restore exact prior overflow/focus on close. Native Escape remains available. Reduced motion respected by CSS.

## Referenced by
[[src/_MOC]] · [[handoffs/place-discovery]]

## Review gallery · #191 — resolved Grill Log
The inspected reference pairs a contained image with an independent context column. Render existing visible place reviews on the left at desktop widths, below the image on phones; explicitly title these as reviews of the place, not attributed to the selected photo. Use only published highlights, capped at six regardless of cursor/filter, preserve all ratings and escape content. No data import, fabricated reviews or schema change. Empty reviews show a truthful invitation. Native modal keeps background inert, exact scroll/focus restoration and Escape; thumbnails, arrows, keyboard and touch navigation keep the selected image/count/current thumbnail synchronized. Single-photo controls hide, links retain no-script/modifier behavior. Large photos stay uncropped; no autofocus moves on image changes. Review links close before navigating to their existing full-review anchor.

## Gallery entry · #191 — resolved Grill Log
The visible View all images summary opens the same viewer at image1 when native dialogs are supported; without scripts it remains the complete native-details album. Closing restores focus to the actual summary opener. Modified clicks retain native behavior.
