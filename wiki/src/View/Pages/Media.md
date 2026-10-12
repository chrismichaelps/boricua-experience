---
type: module
fidelity: Active
tags: [module, media]
---
# View.Pages.Media
## Purpose
Owner page for the main photo, more photos and (for menu categories) menu files, with per-file removal and limits.
## Algorithm
Upload controls need scripts and say so; the default image is labelled as a category illustration.
## Negative Logic
No claim that the default image shows the venue; noindex.
## Grill Log
See [[decisions/ADR-0012-place-media]].
## Referenced by
[[src/_MOC]]

## Activity covers Grill Log · #82
Resolved: integrate all-category organizer covers with existing upload presentation and guarded mediator routes. Removal binds the route event; confirmation is server-only after reserved-file verification. Preserve existing place/menu behavior and shared limits.

## Touch target Grill Log
Resolved: file removal uses the normal button size so phone touch targets exceed44px rather than inheriting the compact40px button.
