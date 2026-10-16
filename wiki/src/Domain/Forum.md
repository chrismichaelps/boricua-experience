---
type: module
fidelity: Active
---
# Domain.Forum

## Purpose and interface
Typed JSON author, topic, post, board, thread, moderation target; Filters, Read and Command carry plain request values. Optional public author names and catalog facts remain unknown. Topic/post status drives held visibility. No email or private profile data.

## Algorithm and edge cases
Typed JSON author, topic, post, board, thread, moderation target; Filters, Read and Command carry plain request values. Optional public author names and catalog facts remain unknown. Topic/post status drives held visibility. No email or private profile data.

## Grill Log · #137
Resolved: respect existing layer direction, escape all request/database text, use shared guards and no direct table grants. Public reads remain bounded, no automatic emails or copied discussions. Held/removed status cannot be restored by ordinary authors; errors and draft values survive refused submissions. Validate guest/member/admin/paused/ownership and ES/EN rendering.

## Referenced by
[[src/_MOC]] · [[handoffs/community-forum]]
