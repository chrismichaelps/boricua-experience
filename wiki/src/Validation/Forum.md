---
type: module
fidelity: Active
---
# Validation.Forum

## Purpose and interface
Validate query/cursor limits and command allowlist, trimmed title8–140/topic body20–5000/reply10–5000, report reason. UUID validated by DB casts, route values never interpolated into SQL. Return named field errors before write.

## Algorithm and edge cases
Validate query/cursor limits and command allowlist, trimmed title8–140/topic body20–5000/reply10–5000, report reason. UUID validated by DB casts, route values never interpolated into SQL. Return named field errors before write.

## Grill Log · #137
Resolved: respect existing layer direction, escape all request/database text, use shared guards and no direct table grants. Public reads remain bounded, no automatic emails or copied discussions. Held/removed status cannot be restored by ordinary authors; errors and draft values survive refused submissions. Validate guest/member/admin/paused/ownership and ES/EN rendering.

## Referenced by
[[src/_MOC]] · [[handoffs/community-forum]]
