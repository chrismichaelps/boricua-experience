---
type: module
fidelity: Active
---
# Services.Forum

## Purpose and interface
Validate and trim command then call API; reads enforce bounded query/cursor sizes. Membership, ownership, report privacy and budgets are DB authoritative. All errors propagate.

## Algorithm and edge cases
Validate and trim command then call API; reads enforce bounded query/cursor sizes. Membership, ownership, report privacy and budgets are DB authoritative. All errors propagate.

## Grill Log · #137
Resolved: respect existing layer direction, escape all request/database text, use shared guards and no direct table grants. Public reads remain bounded, no automatic emails or copied discussions. Held/removed status cannot be restored by ordinary authors; errors and draft values survive refused submissions. Validate guest/member/admin/paused/ownership and ES/EN rendering.

## Referenced by
[[src/_MOC]] · [[handoffs/community-forum]]
