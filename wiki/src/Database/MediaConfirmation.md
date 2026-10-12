---
type: module
fidelity: Active
tags: [module, media]
---
# Database.MediaConfirmation
## Purpose
Trusted confirmation and pending cleanup.
## Interface
confirm_verified_place_media(uuid,text,uuid) and confirm_verified_event_cover(uuid,text,uuid) return replaced paths; EXECUTE service_role only. discard_pending_place_media(uuid) and discard_pending_event_media(uuid,uuid) return path; authenticated only. Legacy member confirms revoked after deployment.
## Algorithm
The server reads bytes with its service key after the member pending lookup. Confirm checks active/onboarded actor, ownership and stored-object size/MIME. Lock parent, re-read media FOR UPDATE and reject missing/stale rows before setting ready or replacing covers. Pending cleanup uses the same order and refuses ready rows. Sweep conditional DELETE rechecks pending status on blocked rows. Add prepare migrations, deploy new callers, then apply legacy grant revocation.
## Negative Logic
No client confirmation authority, invented records, direct table grants, paid resources or write retries.
## Grill Log
Resolved: Trusted server confirmations with explicit sealed-session actor, active onboarded profile check, parent then media locking/recheck and reserved storage-object verification. Anonymous/member roles cannot call confirmation after cutover. Prepare additive RPCs before deploying callers, then revoke legacy authenticated confirmation afterward to preserve availability.
## Referenced by
[[src/_MOC]] · [[decisions/ADR-0012-place-media]]

## Verification cleanup Grill Log
Resolved: storage inspection transport errors propagate without discarding records or files. Invalid content cleanup atomically discards only a still-pending reservation; a file is removed only after successful discard, so overlapping confirmation cannot destroy ready media.
