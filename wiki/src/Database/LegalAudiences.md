---
type: module
fidelity: Active
tags: [module, database, privacy]
---
# Database.LegalAudiences
## Purpose
Enforce the promised audience boundary without changing existing JSON contracts or visibility facts.
## Interface
Private can_read_event helper; guarded event_detail and direct event_attendees; approved-cohort can_list_attendees; approximate native activity positions in all card projections, including historical records.
## Algorithm
Private activities admit only their organizer or an active approved participant. Non-owner reads require an active organizer where one exists. Exact native coordinates/address/instructions require organizer or approved active participant. Attendee lists admit only an active organizer or active approved participant and preserve member opt-out filtering. Native cards derive blur at read time; active stored map points are repaired, while ended-event edit protections remain intact. Native card/search/map coordinates always use blur; no precise venue address is smuggled into public card data. Official external public venue records are distinguished from member-hosted activities.
## Negative Logic
No public table grants, privileged role expansion, fabricated data, rewritten source coordinates or dropped fields. Preserve existing function permissions. Reject unexpected installed definitions rather than patching blindly.
## Edge Cases
Anonymous/unrelated/pending/approved/organizer, private/public/unlisted, open/approval, paused users and organizer, deleted organizer, source listing and existing exact public coordinates.
## Grill Log · #89
Resolved: guard current installed functions in place so both environments retain their existing additional fields. New helper is private, fixed search_path and no public execute grant. Use exact baseline checks and rollback role tests. Apply both environments after independent review; later feature migrations must retain/reapply these guards.
## Backlinks
[[src/_MOC]] · [[seams/LegalContract]]

## Applied evidence · 2026-10-13
Reviewed migration applied to development and production after expanded development rollback-role tests and production compatibility rollback. Private helper definitions/ACLs match in both environments; detail/attendee read guards, exact-location guard and both card coordinate expressions verified. Production publication count remains92; no test data added. Existing intentional closed-table/RPC advisor notices remain, with existing password/MFA warnings; no paid security feature or role grants introduced. Full pause/discovery, deletion/export and other LegalContract gates remain open.
