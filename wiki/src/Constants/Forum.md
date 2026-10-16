---
type: module
fidelity: Active
---
# Constants.Forum

## Purpose and interface
Routes /forum, /forum/new, /forum/moderation and UUID topic paths; RPC names, allowed commands and content limits. Pure constants and path constructors. No records or database content.

## Algorithm and edge cases
Routes /forum, /forum/new, /forum/moderation and UUID topic paths; RPC names, allowed commands and content limits. Pure constants and path constructors. No records or database content.

## Grill Log · #137
Resolved: respect existing layer direction, escape all request/database text, use shared guards and no direct table grants. Public reads remain bounded, no automatic emails or copied discussions. Held/removed status cannot be restored by ordinary authors; errors and draft values survive refused submissions. Validate guest/member/admin/paused/ownership and ES/EN rendering.

## Referenced by
[[src/_MOC]] · [[handoffs/community-forum]]
