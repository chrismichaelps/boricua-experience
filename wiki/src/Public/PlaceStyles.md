---
type: module
fidelity: Active
---
# Public.PlaceStyles

## Purpose
Place detail composition and review surfaces.

## Algorithm
Responsive gallery with large primary photo and smaller tiles, mobile swipe rail, original neutral review cards and full-width review panel. Min44px controls, visible focus, reduced motion, long-title/body wrapping and no fabricated images.

## Negative Logic
No external review/photo imports, hidden moderation content, fabricated ratings or network calls in views.

## Grill Log · #132
Resolved: Responsive gallery with large primary photo and smaller tiles, mobile swipe rail, original neutral review cards and full-width review panel. Min44px controls, visible focus, reduced motion, long-title/body wrapping and no fabricated images.

## Referenced by
[[src/_MOC]] · [[handoffs/place-discovery]]


## Intrinsic image sizing · #185 — resolved Grill Log
Uploaded source artwork must not be stretched or cropped as a panorama. A small progressive enhancement classifies geometry only: images narrower than640px or with intrinsic aspect below1.2 use scale-down/contain, while larger landscape photos retain cover cropping. Category artwork remains unchanged. Capture image load events for lazy and dynamically inserted map/list cards; no source/brand guessing, artificial saturation, or opacity removal. Broken/not-yet-loaded images wait for a valid intrinsic size. Detail headers and galleries retain accessible controls.

## Review gallery · #191 — resolved Grill Log
The inspected reference pairs a contained image with an independent context column. Render existing visible place reviews on the left at desktop widths, below the image on phones; explicitly title these as reviews of the place, not attributed to the selected photo. Use only published highlights, capped at six regardless of cursor/filter, preserve all ratings and escape content. No data import, fabricated reviews or schema change. Empty reviews show a truthful invitation. Native modal keeps background inert, exact scroll/focus restoration and Escape; thumbnails, arrows, keyboard and touch navigation keep the selected image/count/current thumbnail synchronized. Single-photo controls hide, links retain no-script/modifier behavior. Large photos stay uncropped; no autofocus moves on image changes. Review links close before navigating to their existing full-review anchor.
