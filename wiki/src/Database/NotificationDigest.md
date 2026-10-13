---
type: module
fidelity: Active
tags: [module, database, notifications]
---
# Database.NotificationDigest
## Purpose
Private migration `notification_digest`: low-cost notification preferences. In-app notifications stay the default and cost nothing. A member may also opt in to one weekly email summary, sent only when there is something to say.
## Interface
- `profiles.email_digest` and `profiles.digest_sent_at`; `my_profile` adds `email_digest`.
- `update_my_preferences(..., p_email_digest)`; a null keeps the member's current choice.
- Service only: `digest_batch(p_limit)` claims due members and answers each one's email, name, language, unread count and up to five approved activities in the next seven days. `stop_digest(p_user_id)` turns the summary off.
- Routes:
  - `GET /internal/digest` is run daily at 13:05 UTC (9:05 in Puerto Rico) by the platform scheduler, with `CRON_SECRET`.
  - `GET /digest/stop/<account>/<signature>` displays confirmation without changing preference; `POST` performs the signed no-login opt-out.
## Algorithm
A member is due when they are opted in, active and onboarded, and were not summarised in the last 156 hours. They must also have unread notifications from the last two weeks, or approved activities in the next seven days.

A run claims at most 80 members, with its consent generation and `for update skip locked` so two runs never claim the same member, and stamps them. This bounds a digest run, but does not guarantee room in the shared provider quota; recovery and contact mail use the same account. Shared budget/reservation remains a release gate.

Each plain-text letter:
- uses an idempotency key per member and week, so a retried run never sends twice;
- links to activities with `?from=notifications`;
- carries `List-Unsubscribe` headers.
## Negative Logic
Without a mail key the run refuses before claiming anyone, so no member's week is skipped. Failed sends are logged as a warning with counts only. A forged stop link answers 404.
## Referenced by
[[src/_MOC]] · [[seams/DatabaseApi]] · [[domain/Notification]]

## Unsubscribe hardening Grill Log · #89
Resolved: pending notification migration now preserves additive suppression columns, includes claim generation and retains idempotent service-only stop semantics. Apply EmailUnsubscribe before using the new sender; permission checks fail closed. Optional digest remains disabled in production until the full release gate is satisfied.
