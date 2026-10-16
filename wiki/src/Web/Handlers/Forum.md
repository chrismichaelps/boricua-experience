---
type: module
fidelity: Active
---
# Web.Handlers.Forum

## Purpose and interface
GET board/new/thread/owned-topic-edit/moderation; POST topic/reply/edit/remove/report/moderate/lock under shared CSRF origin and member wrappers. Fixed server-selected command actions, topic binding checked DB. Invalid forms preserve entered text. Replies edit inline, retaining page/order. New replies redirect newest-first so their anchor exists beyond20 replies. If the parent becomes unreadable, a safe fallback retains only the submitted draft, not parent content. Admin queue checked RPC, no trust in client admin claims. Catalog via mediator. Redirect after successful writes; errors remain visible.

## Algorithm and edge cases
GET board/new/thread/owned-topic-edit/moderation; POST topic/reply/edit/remove/report/moderate/lock under shared CSRF origin and member wrappers. Fixed server-selected command actions, topic binding checked DB. Invalid forms preserve entered text. Replies edit inline, retaining page/order. New replies redirect newest-first so their anchor exists beyond20 replies. If the parent becomes unreadable, a safe fallback retains only the submitted draft, not parent content. Admin queue checked RPC, no trust in client admin claims. Catalog via mediator. Redirect after successful writes; errors remain visible.

## Grill Log · #137
Resolved: respect existing layer direction, escape all request/database text, use shared guards and no direct table grants. Public reads remain bounded, no automatic emails or copied discussions. Held/removed status cannot be restored by ordinary authors; errors and draft values survive refused submissions. Validate guest/member/admin/paused/ownership and ES/EN rendering.

## Referenced by
[[src/_MOC]] · [[handoffs/community-forum]]
