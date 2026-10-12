---
type: module
fidelity: Active
tags: [module, media]
---
# Api.Media
## Purpose
Member RPCs (reserve, pending, conditional discard, board); privileged trusted-confirmation RPCs and server-only storage calls (signed upload, ranged read-back, delete, sweep) with the service key.
## Algorithm
Owner calls carry the member token; privileged calls carry the service key as apikey and bearer, never sent to a browser.
## Negative Logic
No storage write with a member token and no client storage policy: the bucket is server-written only.
## Grill Log
See [[decisions/ADR-0012-place-media]].
## Referenced by
[[src/_MOC]]

## Activity covers Grill Log · #82
Resolved: integrate all-category organizer covers with existing upload presentation and guarded mediator routes. Removal binds the route event; confirmation is server-only after reserved-file verification. Preserve existing place/menu behavior and shared limits.

## Verification cleanup Grill Log
Resolved: storage inspection transport errors propagate without discarding records or files. Invalid content cleanup atomically discards only a still-pending reservation; a file is removed only after successful discard, so overlapping confirmation cannot destroy ready media.
