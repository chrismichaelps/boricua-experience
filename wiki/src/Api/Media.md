---
type: module
fidelity: Active
tags: [module, media]
---
# Api.Media
## Purpose
Owner RPCs (reserve, pending, confirm, discard, board) and server-only storage calls (signed upload, ranged read-back, delete, sweep) with the service key.
## Algorithm
Owner calls carry the member token; privileged calls carry the service key as apikey and bearer, never sent to a browser.
## Negative Logic
No storage write with a member token and no client storage policy: the bucket is server-written only.
## Grill Log
See [[decisions/ADR-0012-place-media]].
## Referenced by
[[src/_MOC]]
