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
