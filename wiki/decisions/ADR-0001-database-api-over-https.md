---
type: adr
status: ACCEPTED
date: 2026-10-09
tags: [adr]
---

# ADR-0001 — Database API over HTTPS

## Context

Every query must be raw SQL, PostGIS is required, and the server runs as a short-lived function.
The 0.1.3 PostgreSQL driver speaks only unencrypted connections (`sslmode=disable`), and the
database is reached over the internet.

## Decision

All SQL lives in database functions (owner-run, empty search path, explicit grants) exposed at
`/rest/v1/rpc/*`. The server calls them with `pudu-lang-httpclient` over TLS, passing the member's
verified token so each function authorizes from `auth.uid()`.

## Rationale

TLS end to end; no credentials of the database in the function; the database's own pooler absorbs
function concurrency; authorization sits beside the data, so a server bug cannot widen access.

## Alternatives

- Direct driver with `sslmode=disable` — rejected: password and data in clear text.
- Table access through the generic REST surface — rejected: authorization spread over policies and
  queries composed in the server; no single place to read a query's plan.

## Consequences

Each use case is one round trip. Schema changes are function changes reviewed with their plans.
When the driver gains TLS, a socket adapter can sit behind [[seams/DatabaseApi]] unchanged.

## Validation

Review 2027-01-09: median API latency under 60 ms from the function region; no query in
`pg_stat_statements` above 20 ms mean.

## Referenced by

[[decisions/_MOC]] · [[seams/DatabaseApi]]
