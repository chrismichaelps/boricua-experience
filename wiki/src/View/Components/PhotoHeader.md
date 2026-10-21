---
type: module
fidelity: Active
tags: [module, media]
---
# View.Components.PhotoHeader
## Purpose
Cover-first media projection and menu headers using the shared photo/context viewer. Empty collections render labeled category artwork without a viewer.
## Algorithm
`photosOf` returns the uploaded cover, otherwise a non-category existing image, then gallery images. `render` delegates to PlaceGallery.renderWithContext with the place title and a parent-detail link; no carousel or review query.
## Negative Logic
Single real images open the viewer with navigation hidden. Category/default artwork remains presentation only, never a gallery photo.
## Grill Log
See [[decisions/ADR-0012-place-media]].
## Referenced by
[[src/_MOC]]

## Cover completion Grill Log · #155 — resolved
Reject unknown theme values before publishing. Successful listing saves carry an explicit coverSaved outcome; a subsequent theme failure keeps the saved listing and redirects once with a bilingual warning to retry through editing, never a duplicate publish. Theme updates lock the owned parent before reading its cover so a concurrent confirmed photograph cannot be overwritten. Theme/default artwork is illustration, never a gallery photograph. The fieldset retains keyboard radio semantics, selected state, linked validation errors and all category-switch draft state. Local artwork is asset-versioned; uploaded photographs remain authoritative.

## All listing details · #195 — resolved Grill Log
Reuse the same native viewer on place details, real activity-cover images and menu-header images across every category. Place reviews remain published, bounded and place-level. Other routes pass truthful existing context without inventing reviews or querying private facts. Preserve activity back/share/save controls, cover framing, modifier/no-script image links and default category artwork; illustrations never become gallery photos. Keep dialogs outside clipped event-cover styling. Shared canonical image links initialize both single event images and full albums; context links close before navigation. No schema or data mutation.
