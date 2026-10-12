---
type: module
fidelity: Active
tags: [module, media]
---
# Web.Handlers.Media
## Purpose
Owner page, JSON upload start and finish, removal form, and the cron-only sweep route.
## Algorithm
Every owner route resolves the editable place first. The sweep answers 404 unless the bearer equals CRON_SECRET (constant-time comparison).
## Negative Logic
No public trigger for the sweep; no upload through the function body.
## Grill Log
See [[decisions/ADR-0012-place-media]].
## Referenced by
[[src/_MOC]]
