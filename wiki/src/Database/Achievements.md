---
type: module
fidelity: Active
tags: [module, database, achievements]
---
# Database.Achievements
## Purpose
Private migration `achievements`: a data-driven achievements system with no monetary value. Definitions are rows; members' progress is separate; one reusable mechanism turns existing actions into progress and unlocks. Adding an achievement, including a seasonal one, is a new row plus a new badge file in `public/assets/badges/`; no unlock logic, page or script changes.
## Interface
Tables (RLS on, no policies, no client grants):
- `achievement_categories(slug, title_es, title_en, sort)`.
- `achievements(slug, category, rarity, metric, mode, step_days, target, criteria, keys, badge, title_*, description_*, sort, active, secret, available_from, available_until, season_from, season_until, meta)`. `rarity` is common, rare, epic or legendary. `mode` is `count` or `streak`. `season_*` are `MM-DD` and may wrap the year (12-01 → 01-06).
- `achievement_signals(user_id, metric, key, attrs, occurred_at)`, primary key (user, metric, key), so a repeated action never counts twice.
- `user_achievements(user_id, achievement, edition, progress, unlocked_at, seen_at)`, one row per edition.

Functions:
- `private.achievement_signal(user, metric, key, attrs, at)` is the single unlock mechanism. It answers the slugs it unlocked.
- Triggers on join requests, events, saved events, saved searches, reactions, reviews and profiles feed it. A failure inside a trigger is logged as a warning and never blocks the member's action.
- `record_achievement_signals(p_items, p_locale)` (member) takes up to 20 `{metric, key}` items for actions only the browser sees, then answers the member's unseen unlocks and marks them seen.
- `my_achievements(p_locale)` (member) answers the board: categories, every visible achievement with progress, and the unlocked count.
- `public_achievements(p_user_id, p_locale)` (anyone) answers up to 12 recent unlocked badges and the total.

## Algorithm
A signal is stored once per (member, metric, key). The function then evaluates every achievement that is active, measures the same metric, matches the signal (`attrs @> criteria`, key in `keys` when set), is inside its window now, and is not yet unlocked.

Progress is measured over the member's stored signals for that metric that match the same filters and fall inside the window:
- `count` counts them.
- `streak` takes keys that are dates and finds the longest run spaced `step_days` apart (1 for days; 7 for weeks keyed by their Monday).

When progress reaches the target, the achievement unlocks. Each unlock emits an `achievement` signal, so achievements can count other achievements. Recursion ends because keys are unique.

Browser metrics and their keys:
- `login_day`, `map_open`, `map_rotate`, `map_3d`, `radius_use` and `ai_chat` are keyed by the server's Puerto Rico date, whatever key is sent.
- `town_view` takes a municipality slug and also emits `region_view` for its region.
- `event_view`, `share` and `calendar_add` take the slug of a published activity, stored as its id.

Unknown metrics and invalid keys are ignored. A member records at most 300 browser signals a day.

## Seasons and editions
A yearly season repeats every year, so its progress and unlocks belong to an **edition**, named by the year the season starts in Puerto Rico time. A season that wraps the new year (12-01 → 01-06) belongs to the year of its December days, so 3 January 2027 is in the 2026 edition. Every other achievement has the single edition `''`, including one-off editions set with `available_from`/`available_until`.
- Progress counts only signals inside the edition, so two activities in one Christmas season and one in the next never add up to three.
- Each edition is earned once, and earning it again in a later year adds an edition rather than re-dating the first. The `achievement` signal is keyed by slug, so achievements that count other achievements count each achievement once.
- A stored signal is refreshed when the same action happens again at least 20 hours later. Its new date can then fall in a later edition (the same San Juan visit counts for SanSe 2026 and SanSe 2027).
- The board shows the open edition, or else the next one, with full dates and years ("1 dic 2026 – 6 ene 2027"), and the editions already earned ("2026–2027 · 2025–2026").
- A finished one-off edition says it has ended.
- Season days must exist in every year: 02-29, 04-31 and equal start and end days are refused.

## Negative Logic
No points, store or rewards. Secret achievements hide their title and description until unlocked. An inactive achievement stops progressing and disappears from the board unless the member already unlocked it. A seasonal achievement only progresses and unlocks inside its window; outside it, the board shows it locked with its season.
Account deletion erases the member's signals and progress; the data export includes them.

## Edge Cases
- The migration backfills signals from existing approvals, publications, saves, saved searches, likes, reviews and profiles. Unlocks from the backfill are marked seen so returning members are not flooded with toasts; they still appear on the board.
- Curated listings never count as hosting.

## Adding an achievement
1. Draw the badge: add an entry to `scripts/badges.mjs` and run it, or hand-author `public/assets/badges/<badge>.svg`. Keep the shared classes `b-float`, `b-pulse`, `b-sway`, `b-twinkle`, `b-spin`, and prefix ids with the badge name.
2. Insert the row with an existing metric. Seasonal rows set `season_from`/`season_until`, or `available_from`/`available_until` for a single edition.
3. Disable it later with `active = false`.

## Referenced by
[[src/_MOC]] · [[seams/DatabaseApi]] · [[src/View/Pages/Achievements]]
