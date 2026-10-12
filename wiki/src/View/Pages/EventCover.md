---
type: module
fidelity: Active
tags: [module, media]
---
# View.Pages.EventCover
## Purpose
Organizer cover manager.
## Interface
render(frame,detail,covers) returns Html.
## Algorithm
Render a noindex organizer page with current uploaded/source/default cover and explicit upload/replace/remove controls. Distinguish an actual source photograph from the category illustration. Reuse the shared picker and member CSRF token; no owner or photo data inferred.
## Negative Logic
No client confirmation authority, invented records, direct table grants, paid resources or write retries.
## Grill Log
Resolved: Organizer-only noindex cover manager, real current/default category preview, upload/replace/remove controls with normal CSRF token. No fictitious imagery or unauthorized media.
## Referenced by
[[src/_MOC]] · [[decisions/ADR-0012-place-media]]

Resolved source-cover presentation: an existing external/curated photograph is labeled as the current cover, never as a category illustration. The category-default notice applies only to the actual default asset.

## Touch target Grill Log
Resolved: file removal uses the normal button size so phone touch targets exceed44px rather than inheriting the compact40px button.
