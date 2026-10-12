---
type: moc
tags: [moc, adr]
---

# Decisions

| ADR | Status | Decision |
| --- | --- | --- |
| [[decisions/ADR-0001-database-api-over-https]] | ACCEPTED | The server reaches PostgreSQL through raw-SQL functions over HTTPS, not a socket. |
| [[decisions/ADR-0002-server-rendered-pwa]] | ACCEPTED | Pages are rendered by Pudu; scripts enhance them; the shell is installable. |
| [[decisions/ADR-0003-sealed-session-cookie]] | ACCEPTED | Tokens live in one sealed, HttpOnly cookie. |
| [[decisions/ADR-0004-location-privacy]] | ACCEPTED | Location is the owner's; sharing is opt-in, scoped, throttled, and deletable. |
| [[decisions/ADR-0005-reactions]] | ACCEPTED | Likes are public counts; dislikes are private "not interested" signals. |
| [[decisions/ADR-0006-lambda-runtime]] | ACCEPTED | The function is the Pudu program on the release's musl runtime. |
| [[decisions/ADR-0007-attendee-visibility]] | ACCEPTED | Who may see who is going, and how a member opts out. |

## Referenced by

[[00-INDEX]]
- [[decisions/ADR-0008-separate-environments]] — local stack with seed for development; hosted project with real data only for production.
- [[decisions/ADR-0009-event-expiry]] — events end at their end time; a job marks them ended, the row is kept.
- [[decisions/ADR-0010-category-profiles-and-places]] — places beside activities; per-category facts declared in the database and rendered from the catalogue.
- [[decisions/ADR-0012-place-media]] — owner photos and menu files: reserve, signed upload, verify, sweep.
