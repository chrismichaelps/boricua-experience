---
type: module
fidelity: Active
tags: [module, media]
---
# Database.EventCovers
## Purpose
Organizer cover RPCs and storage lifecycle.
## Interface
reserve_event_cover(uuid,text,int), pending_event_media(uuid), event_cover(uuid), discard_event_cover(uuid,uuid); authenticated organizer only. Trusted confirmation belongs to MediaConfirmation.
## Algorithm
JPEG/PNG/WebP only and3MBmax. Three pending/ready slots count for3hours, shared40/day reservations serialize on one actor advisory lock across place/event writes. Parent then media lock rechecks protect replacement/removal. Removal clears cover_url so the renderer follows the current category. Sweep retains either referenced media kind and drops expired unconfirmed records.
## Negative Logic
No client confirmation authority, invented records, direct table grants, paid resources or write retries.
## Grill Log
Resolved: Organizer covers across all activity categories. Typed images only, bounded pending reservations, shared actor daily quota, organizer parent lock followed by media row recheck. Signed upload/read-back before trusted server confirmation. Removal binds event and media identity; category fallback restored only for the removed active cover. Sweep preserves referenced place and event files.
## Referenced by
[[src/_MOC]] · [[decisions/ADR-0012-place-media]]
