---
type: module
fidelity: Active
tags: [module, media]
---
# Web.Handlers.EventCover
## Purpose
Guarded organizer cover routes.
## Interface
routes(app) registers GET/POST EVENT_COVER plus POST finish and remove.
## Algorithm
Resolve editable parent before decoding uploads or acting. Read current covers through mediator. Finish and removal carry both eventId and mediaId; reserve replies contain scoped signed destination and verification URL. All actions use memberAction origin/token checks.
## Negative Logic
No client confirmation authority, invented records, direct table grants, paid resources or write retries.
## Grill Log
Resolved: Authorize the organized parent before decoding or acting. Bind finish/removal media IDs to the route event. Use mediator and guarded member actions.
## Referenced by
[[src/_MOC]] · [[decisions/ADR-0012-place-media]]
