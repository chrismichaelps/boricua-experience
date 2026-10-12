---
type: module
fidelity: Active
tags: [module, media]
---
# Services.Media
## Purpose
Lists a place's files with addresses; starts an upload with a reservation and a one-path signed address; finishes it only after reading the file back; removes record then file; sweeps unreferenced files.
## Algorithm
A failed signature or size releases the reservation and deletes the stored file. Cover confirmation deletes replaced covers. Writes are never retried.
## Negative Logic
No confirmation without verification; no visible broken file.
## Grill Log
See [[decisions/ADR-0012-place-media]].
## Referenced by
[[src/_MOC]]

## Activity covers Grill Log · #82
Resolved: integrate all-category organizer covers with existing upload presentation and guarded mediator routes. Removal binds the route event; confirmation is server-only after reserved-file verification. Preserve existing place/menu behavior and shared limits.

## Verification cleanup Grill Log
Resolved: storage inspection transport errors propagate without discarding records or files. Invalid content cleanup atomically discards only a still-pending reservation; a file is removed only after successful discard, so overlapping confirmation cannot destroy ready media.
