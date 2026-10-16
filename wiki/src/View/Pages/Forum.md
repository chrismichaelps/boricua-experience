---
type: module
fidelity: Active
---
# View.Pages.Forum

## Purpose and interface
Public board with database town/category filters, bounded continuation; composer for questions/replies; owner edit forms, held/locked banners and administrator queue. Guest sign-in links preserve thread. Thread has oldest/newest order and next page. Pure render, no services. Forum layout responsive with readable line length and original content.

## Algorithm and edge cases
Public board with database town/category filters, bounded continuation; composer for questions/replies; owner edit forms, held/locked banners and administrator queue. Guest sign-in links preserve thread. Thread has oldest/newest order and next page. Pure render, no services. Forum layout responsive with readable line length and original content.

## Grill Log · #137
Resolved: respect existing layer direction, escape all request/database text, use shared guards and no direct table grants. Public reads remain bounded, no automatic emails or copied discussions. Held/removed status cannot be restored by ordinary authors; errors and draft values survive refused submissions. Validate guest/member/admin/paused/ownership and ES/EN rendering.

## Referenced by
[[src/_MOC]] · [[handoffs/community-forum]]
