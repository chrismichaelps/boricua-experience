---
type: module
fidelity: Active
---
# View.Components.PlaceGallery

## Purpose
Responsive permanent-place photo mosaic and complete gallery.

## Algorithm
Use cover-first database photos, deduplicated; show at most five mosaic tiles, all photos in a native details fallback. Dialog enhancement offers previous/next, keyboard, dismissal and focus restoration. Never autoplay listing photos. Empty gallery renders compact explicitly labeled category art.

## Negative Logic
No external review/photo imports, hidden moderation content, fabricated ratings or network calls in views.

## Grill Log · #132
Resolved: Use cover-first database photos, deduplicated; show at most five mosaic tiles, all photos in a native details fallback. Dialog enhancement offers previous/next, keyboard, dismissal and focus restoration. Never autoplay listing photos. Empty gallery renders compact explicitly labeled category art.

## Referenced by
[[src/_MOC]] · [[handoffs/place-discovery]]

## Review gallery · #191 — resolved Grill Log
The inspected reference pairs a contained image with an independent context column. Render existing visible place reviews on the left at desktop widths, below the image on phones; explicitly title these as reviews of the place, not attributed to the selected photo. Use only published highlights, capped at six regardless of cursor/filter, preserve all ratings and escape content. No data import, fabricated reviews or schema change. Empty reviews show a truthful invitation. Native modal keeps background inert, exact scroll/focus restoration and Escape; thumbnails, arrows, keyboard and touch navigation keep the selected image/count/current thumbnail synchronized. Single-photo controls hide, links retain no-script/modifier behavior. Large photos stay uncropped; no autofocus moves on image changes. Review links close before navigating to their existing full-review anchor.
