---
type: grammar
language: SQL (PostgreSQL 17, PostGIS 3.3)
tags: [grammar]
---

# Grammar — Database API

The server reaches the database only through functions exposed by the HTTP API at
`/rest/v1/rpc/<name>`, posting a JSON object of named arguments (`p_*`). The migrations that define
them are private; this page states the conventions every function keeps.

## Conventions

- Tables live in a schema the HTTP API does not expose; row-level security is enabled on all of them
  with no policies, so no client role reads a table directly.
- Every API function runs as its owner with an empty search path and fully qualified names, and
  decides authorization itself from the caller's verified token (`auth.uid()`).
- Execute grants are explicit per function: reads to guests and members, writes to members only.
- Every function answers one JSON value. Lists answer `{items, next}`; `next` is a keyset cursor for
  time-ordered pages and an offset for distance or relevance pages, capped at 300 rows.
- Failures raise a stable lower-case code as the message and a `PTxxx` state that becomes the HTTP
  status: `PT400` invalid input, `PT401` signed out, `PT403` forbidden, `PT404` missing, `PT409`
  conflict, `PT429` throttled. [[src/Constants/Codes]] lists every code.
- Listings never carry an exact location or instructions; the blurred location (about 550 m) is
  exact only for open public events.

## Function contract

| Function | Caller | Answers |
| --- | --- | --- |
| `search_events` | anyone | `{items, next}` of event cards filtered by text, category, municipality, dates, price, radius; sorted `soon`, `near`, or `relevant` |
| `recommended_events` | anyone | `{items}` ranked by popularity, the viewer's taste (approvals, saves, likes minus dislikes), distance, and time |
| `events_near` | anyone | nearest upcoming public events within a radius |
| `event_detail` | anyone | card plus description, organizer card, attendees preview, viewer state; location and instructions only when revealed |
| `event_attendees` | anyone | `{total, people, hidden, can_view}` |
| `public_profile` | anyone | organizer profile with hosting record and upcoming events |
| `list_categories`, `list_municipalities`, `sitemap_events` | anyone | reference data and sitemap rows |
| `record_event_view`, `record_consent` | anyone | view count; consent ledger row |
| `my_profile`, `my_events`, `my_requests`, `my_saved_events`, `my_notifications` | member | the account's own data |
| `create_event`, `update_event`, `cancel_event` | member | `{id, slug}` |
| `request_join`, `withdraw_request`, `decide_request`, `event_requests` | member | request status; organizer queue |
| `toggle_saved`, `set_reaction`, `report_event`, `mark_notifications_read` | member | new state |
| `complete_onboarding`, `update_my_profile`, `update_my_preferences` | member | `{updated}` |
| `record_position`, `stop_live_location`, `delete_location_history`, `event_participant_positions` | member | live location |
| `export_my_data`, `log_data_request`, `pause_my_account`, `reactivate_my_account`, `delete_my_account` | member | data-subject rights |
| `admin_overview`, `admin_reports`, `admin_resolve_report` | administrator | metrics and moderation |

## Scheduled jobs

Reminders every 15 minutes, popularity rankings every 10, position pruning hourly (30-day history,
live positions older than an hour), and monthly history partitions created ahead daily.

## Referenced by

[[grammar/_MOC]] · [[seams/DatabaseApi]] · [[src/Api/Supabase/Gateway]] · [[src/Constants/Supabase]]
