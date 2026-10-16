---
type: handoff
---
# Community forum and compact discovery

Role: Architect. Issues #136 (cards) and #137 (forum). TripAdvisor destination and forum pages inspected in Codex browser; source observations are inspiration only, never copied content/assets. Existing place gallery release0.12.0 is live (8b12b6e,buildb0cfc59db6a0), both databases match; the licensed Serrallés cover is attached only to its matching business-admin-owned production record, without replacing any uploaded cover.

Card contract: smaller photos and natural-height copy, no nested scrolling or hidden long titles; map and organizer layouts remain distinct.

Forum contract: public reads and active-member contributions; database-owned content and town/category catalogs, bounded keyset pagination/search, original topics/replies, editing/soft deletion, reporting/admin moderation, posting limits serialized per user. No copied discussions or artificial community seed in production. No automatic emails. Account erasure must anonymize or remove content per existing policy; no private email/location exposure. Both databases receive reviewed migrations. Each application module gets a complete mirror and resolved Grill before implementation; separate database-contract and application PRs stay reviewable. Independent review required.

Next action: implement #136, then the forum database contract and complete vertical flow with browser and authorization tests.

#136 validation:390px discovery cards measure171×269px with natural-height visible copy;1280px search has four285px columns, home rail cards286.5×328px and no page overflow. Map retains94px thumbnail columns; organizer cards retain the pre-existing160px thumbnail/128px desktop copy tracks and full-title overflow behavior. Independent review caught and corrected an accidental organizer-rule removal before merge.

Final #136 QA:320px search has128px cards and no page overflow; public profile has four desktop columns. Independent review cleared CSS after organizer rules were restored; four affected mirrors explicitly supersede the old discovery copy track.
