---
type: seam
tags: [seam, operations]
---
# Seam — FailureLog
## Purpose
Every server failure (status 500–599) is reported to a Cloudflare Worker, `boricua-failure-log` on the free plan, which keeps it for thirty days in the D1 database `boricua-failures`. The platform's own runtime logs keep only about an hour.
## Interface
- The server posts `POST /failures` with `{method, path, status, elapsed, reason, release}` to `BORICUA_FAILURE_LOG_URL`; the log is off when the variable is unset.
- `Respond.problem` puts an unavailable dependency's reason in the internal `x-boricua-failure` header. [[src/Web/Access]] reads and removes it, then writes and reports it.
- Source: `server/failure-log/` (worker and schema). Copy `wrangler.example.jsonc` to `wrangler.jsonc`, which stays out of the repository, fill in the database id, then run `wrangler deploy`.
## Negative Logic
- Paths never carry query strings, and nothing identifies a visitor.
- The Worker refuses malformed events and bodies over 2 KB, and has a supplementary120-per-minute isolate guard plus a transactional shared5000-report UTC-day cap. Indexed quota admission bounds storage writes; index maintenance and retention also count toward Free-tier writes.
- A daily cron trigger deletes rows older than thirty days.
- A report that cannot be sent never changes the response; reports time out after 1.5 s.
## Investigating
`wrangler d1 execute boricua-failures --remote --command "select path, status, reason, count(*) from failures group by 1, 2, 3 order by 4 desc limit 20"`
## Referenced by
[[seams/_MOC]] · [[architecture/DELIVERY]]

## Grill Log · #88
Resolved: counter and report insert commit together through a SQLite trigger. Rejected reports create no row; insertion failures roll back admission. Timestamp and UTC-day bucket share one captured value. Keep the Free plan and existing operational resources.

[[src/Server/FailureLogWorker]] · [[src/Server/FailureLogSchema]]
