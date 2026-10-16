---
type: module
layer: Database
fidelity: Active
---
# Database.Forum

## Purpose
Original public Puerto Rico questions and replies, with member ownership, abuse controls and moderation.

## Interface
`public.forum_board(p_query text,p_town text,p_category text,p_after text)` returns at most20 topic cards and a cursor; topics sort by latest published reply time and UUID. `public.forum_thread(p_id uuid,p_after uuid,p_order text)` returns one published topic and at most20 published replies, oldest/newest first. `public.forum_write(p_action text,p_topic uuid,p_post uuid,p_title text,p_body text,p_town text,p_category text,p_reason text)` handles validated topic/reply creation, author editing/soft deletion, reporting and administrator keep/remove/lock actions. `public.forum_moderation()` is admin-only and bounded50 reported targets.

## Schema and security
`app.forum_topics`, `app.forum_posts`, `app.forum_reports`, `app.forum_actions`; RLS enabled with no direct client policies or grants. Public API functions are SECURITY DEFINER with empty search_path and explicit schema references. Private helpers are revoked from PUBLIC. Read RPCs grant anon/authenticated/service_role; writes and moderation authenticated/service_role only, enforcing require_member/require_admin inside. No request-controlled SQL. Current profile projection includes public name/avatar only, never email, birth date or precise user position.

## Algorithm
Public status indexes and generated simple-language full-text vectors bound discovery across topic text and published replies; held/removed replies never create search matches. Topic and reply page limits are fixed20+1; cursors carry immutable creation tuple for replies and last activity tuple for topics, validate scope/shape and avoid OFFSET scans. Replies use parent-row locks and transactional refresh so count/latest activity reflect published replies after insert/status/delete. All writes serialize a per-member advisory lock before an indexed rolling action limit. Topic creation3/hour20/day; replies10/minute60/hour; edits60/hour; reports10/hour. Active/onboarded accounts only. Reporting one's own content is refused; distinct report uniqueness and24h minimum account age reduce abuse. Three unresolved reports hold a target. Administrators alone restore held/remove/lock targets and resolve reports. Author edits cannot restore held/removed content. Topic lock refuses further replies. Unknown town/category is rejected rather than silently reassigned.

## Lifecycle
The account export adds a forum section containing only the caller's authored topics/posts across published, held and removed states, own reports and own action records. Existing export keys and ACL remain unchanged. Paused accounts retain export access; no active-member guard is added. Generated search vectors are omitted.
Account profile deletion cascades the member's topics/posts/reports/actions; deleting a topic cascades its replies. Profile pause blocks writes through require_member. Author soft deletion removes public visibility without granting a route to restore removed content. No forum emails, subscription defaults, fake discussions or third-party content imports.

## Grill Log · #137
Resolved: use original member content, bounded indexed reads and transactional counters. Reuse existing membership/admin guards rather than claims supplied by callers. Reject all unauthorized edits/moderation and hidden/removed parents. Preserve report privacy, cap query length, validate cursors and test guest/member/admin/paused/deletion/concurrency behavior. Migrations must match in both projects before application release; destructive production data tests are prohibited. No schema facts are hardcoded into application records.

## Referenced by
[[src/_MOC]] · [[handoffs/community-forum]]

## Moderation lifecycle Grill Log · #137
Resolved independent review: authors can read their held topic/replies with explicit status and remove them, but cannot edit, restore or reply to held topics. Guests and other members cannot read held content. Administrator queue includes every held target even when all reporters delete their accounts and reports cascade away; zero-report held targets stay actionable. Topic/post projections add status; published counters exclude held replies. No removed content is restored.

## Validation evidence · #137
Development rollback checks cover ownership, guests, paused accounts, three-report holding, held-owner visibility/removal, private exports, locks, search visibility, both pagination orders, invalid cursor scope and direct table denial. Twelve simultaneous reply transactions accepted exactly10 and rejected2 with PT429; stored count, actual published count and budget were all10. An isolated account-deletion rollback proved content/report cascades, surviving-topic recount and a zero-report held queue target. Committed concurrency fixture was removed. Three reviewed migrations are applied in both projects; all10 function hashes/ACL and four table RLS flags match. Production has no forum seed or copied discussions.
