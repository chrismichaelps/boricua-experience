---
type: module
fidelity: Active
tags: [module, database]
---
# Database.EventSeries
## Purpose
Private migration that lists a recurring activity once instead of once per date.
## Interface
app.events.series_key generated stored: md5 of organizer, municipality and folded trimmed title; partial index (series_key, starts_at, id) over published public rows. private.leads_series(e, from, to) and private.more_dates(e) are internal. Card adds more_dates; event_detail adds other_dates (slug, starts_at, ends_at; at most 12, soonest first). RPC signatures, grants and RLS unchanged.
## Algorithm
search_events and map_events keep a row only when no earlier listable occurrence of its series starts inside the same requested window; recommended_events applies the rule without a window. Listable means published, public and discovery_until in the future. more_dates counts listable occurrences after the row.
## Negative Logic
No row is deleted or merged: each occurrence keeps its own page, join requests, reactions and calendar file. Private and unlisted rows are never counted or linked.
## Edge Cases
A window that starts after the first date shows the next occurrence. Retitling an occurrence moves it to another series. Member events with the same title in different towns stay separate. Exact duplicates (same title and start) remain visible so they can be reported.
## Grill Log
Resolved 2026-10-12: production had 64 of 92 rows in 14 curated series and no exact duplicates, so deletion would have removed real dates. Collapsing at read time keeps imports idempotent and needs no data change.
## Referenced by
[[src/_MOC]] · [[seams/DatabaseApi]]
