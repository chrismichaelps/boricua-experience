---
type: module
fidelity: Active
---
# View.Components.Forum

## Purpose and interface
Escaped author/date and compact topic rows, own edit/remove actions, report details, plain-text paragraphs preserving newlines. Native forms use CSRF token and existing loading feedback. No external post content or fabricated counts.

## Algorithm and edge cases
Escaped author/date and compact topic rows, own edit/remove actions, report details, plain-text paragraphs preserving newlines. Native forms use CSRF token and existing loading feedback. No external post content or fabricated counts.

## Grill Log · #137
Resolved: respect existing layer direction, escape all request/database text, use shared guards and no direct table grants. Public reads remain bounded, no automatic emails or copied discussions. Held/removed status cannot be restored by ordinary authors; errors and draft values survive refused submissions. Validate guest/member/admin/paused/ownership and ES/EN rendering.

## Referenced by
[[src/_MOC]] · [[handoffs/community-forum]]

Held parent suppresses editing/reporting of child replies while retaining owned deletion. Inline reply editors preserve the current page query.
