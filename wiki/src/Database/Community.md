---
type: module
fidelity: Active
tags: [module, database]
---
# Database.Community
## Purpose
Private migrations `community_enums`, `community` and `community_holds`: a waitlist that promotes itself, organizer insights and bulk approval, holds after repeated reports with an administrator restore, and a private calendar feed.
## Interface
request_status adds `waitlisted`; notification_kind adds `waitlist_promoted` and `event_held`. events.waitlist_count and events.held_at. `request_join` answers `{status, position}`; `event_detail` adds waitlist_count, held and viewer.waitlist_position; `my_requests` adds waitlist_position. `event_insights(p_event_id)` and `approve_pending(p_event_id)` for the organizer only. `admin_resolve_report(p_report_id, p_action)` with `dismissed`, `actioned`, `restore` or `hold`; `admin_reports` adds held and open_reports. `calendar_feed(p_user_id)` is service only.
## Algorithm
Joining a full activity (approved ≥ capacity) waitlists the member in strict arrival order (wall clock). When a place frees up (an approved or pending request becomes anything else, capacity grows, or a hold lifts), the oldest waitlisted members move up: open activities approve them, activities with approval make them pending, counting pending requests as taken so the organizer is never offered more requests than places; each one promoted is notified. Bulk approval approves pending requests oldest first until the capacity is reached. Conversion = requests in the last 30 days ÷ views in the last 30 days.
A listing with three open reports, or two for safety or minors, is held: it leaves search, map, recommendations, the sitemap, its organizer's public profile and its series' dates, cannot take requests, and its organizer is notified. Curated listings are never held automatically. Restore dismisses the open reports and lifts the hold, which promotes the waitlist.
## Negative Logic
A held activity keeps its page so the organizer can read why; members already going keep their place. The calendar feed address is `/calendar/<account>/<signature>`, the signature an HMAC of the account id under the session key; a wrong signature answers 404 and the feed never lists pending or waitlisted activities.
## Edge Cases
The guest spreadsheet quotes every cell, doubles inner quotes, flattens line breaks and prefixes text starting with `=`, `+`, `-`, `@` or a tab so a spreadsheet never runs it as a formula.
## Referenced by
[[src/_MOC]] · [[seams/DatabaseApi]] · [[subsystems/Participation]]
