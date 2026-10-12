---
type: module
fidelity: Active
tags: [module, media]
---
# Domain.Media
## Purpose
Kinds, stored records, galleries with public addresses, reservations, signed-upload answers and sweep results for place media.
## Algorithm
Pure types and two selectors (`ofKind`, `isDocument`); `empty()` for pages whose media cannot be read.
## Negative Logic
No storage path is shown without its public address; PDFs belong only to menu documents.
## Grill Log
See [[decisions/ADR-0012-place-media]].
## Referenced by
[[src/_MOC]]

## Activity covers Grill Log · #82
Resolved: integrate all-category organizer covers with existing upload presentation and guarded mediator routes. Removal binds the route event; confirmation is server-only after reserved-file verification. Preserve existing place/menu behavior and shared limits.
