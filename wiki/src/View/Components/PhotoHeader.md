---
type: module
fidelity: Active
tags: [module, media]
---
# View.Components.PhotoHeader
## Purpose
A listing's photographs in the home carousel container, reusing the carousel script; the default image alone when none are uploaded.
## Algorithm
Cover first, then gallery; slide labels are numbered for assistive technology.
## Negative Logic
No controls for a single image; default imagery is presentation only.
## Grill Log
See [[decisions/ADR-0012-place-media]].
## Referenced by
[[src/_MOC]]

## Cover completion Grill Log · #155 — resolved
Reject unknown theme values before publishing. Successful listing saves carry an explicit coverSaved outcome; a subsequent theme failure keeps the saved listing and redirects once with a bilingual warning to retry through editing, never a duplicate publish. Theme updates lock the owned parent before reading its cover so a concurrent confirmed photograph cannot be overwritten. Theme/default artwork is illustration, never a gallery photograph. The fieldset retains keyboard radio semantics, selected state, linked validation errors and all category-switch draft state. Local artwork is asset-versioned; uploaded photographs remain authoritative.
