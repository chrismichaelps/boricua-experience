---
type: module
fidelity: Active
---
# App.Handlers.Forum

## Purpose and interface
Register forum board/thread/write/moderation message handlers over runtime once, forwarding visitor/session values to Services.Forum. No HTTP or rendering.

## Algorithm and edge cases
Register forum board/thread/write/moderation message handlers over runtime once, forwarding visitor/session values to Services.Forum. No HTTP or rendering.

## Grill Log · #137
Resolved: respect existing layer direction, escape all request/database text, use shared guards and no direct table grants. Public reads remain bounded, no automatic emails or copied discussions. Held/removed status cannot be restored by ordinary authors; errors and draft values survive refused submissions. Validate guest/member/admin/paused/ownership and ES/EN rendering.

## Referenced by
[[src/_MOC]] · [[handoffs/community-forum]]
