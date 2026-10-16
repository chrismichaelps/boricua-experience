---
type: module
fidelity: Active
---
# Api.Forum

## Purpose and interface
Typed board/thread/read and write RPC adapters through Gateway. Reads carry optional viewer token, writes required token, empty optional UUIDs are JSON null. No business logic or SQL.

## Algorithm and edge cases
Typed board/thread/read and write RPC adapters through Gateway. Reads carry optional viewer token, writes required token, empty optional UUIDs are JSON null. No business logic or SQL.

## Grill Log · #137
Resolved: respect existing layer direction, escape all request/database text, use shared guards and no direct table grants. Public reads remain bounded, no automatic emails or copied discussions. Held/removed status cannot be restored by ordinary authors; errors and draft values survive refused submissions. Validate guest/member/admin/paused/ownership and ES/EN rendering.

## Referenced by
[[src/_MOC]] · [[handoffs/community-forum]]
