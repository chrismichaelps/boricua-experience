---
type: adr
status: ACCEPTED
date: 2026-10-09
tags: [adr]
---

# ADR-0008 — Separate development and production data

## Decision

Production data lives only in the hosted production project, which receives migrations and never the
seed. Development runs against a second hosted project, `boricua-experience-dev`, which receives the
same migrations first, then `supabase/seed.sql`, then the auth settings in `supabase/config.toml`
(`scripts/dev-db.sh`). The local Docker stack (`supabase start`) stays available for machines that
can run it.

Each environment is fully isolated: its own users, signing keys, storage, Google OAuth client, and
session key. A development sign-in can never produce a session production accepts.

| Environment | Database | Seed | Deploy |
| --- | --- | --- | --- |
| Development | hosted project `boricua-experience-dev` | `scripts/dev-db.sh` | `scripts/dev.sh` |
| Local (optional) | Supabase stack in Docker on 127.0.0.1:54321 | applied on start and reset | `scripts/dev.sh` |
| Production | hosted project | never | `supabase db push`, then `vercel deploy --prod` |
| Preview (later) | Supabase branch per pull request | branch seed | Vercel preview |

## Guards

- `scripts/dev.sh` and `scripts/dev-db.sh` refuse a `BORICUA_SUPABASE_URL` naming the production
  project (`scripts/environments.sh`); a project ref is public, so naming it in git exposes nothing.
- `scripts/dev-db.sh` is the only path that pushes `config.toml` auth settings, and only to a
  non-production project; production auth settings are edited in the dashboard.
- Google sign-in uses one OAuth client per environment. The development client allows only the
  development project's callback and `http://localhost:8080`; the production client allows only
  production addresses. Once development works, `http://localhost:8080` is removed from the
  production project's redirect list.
- `scripts/check-production-data.sh` fails when any `@boricua.test` account or `source = 'seed'`
  event exists in production; run it after every production migration.
- Seed accounts use the reserved `.test` domain, so they can never receive mail or collide with a
  real address, and `supabase/scripts/purge-seed.sql` removes them and everything they organized.
- The Supabase CLI seeds a remote database only with an explicit `--include-seed`, which is never
  used for production.

## Rationale

One shared database mixed test accounts and invented activities into the live site. A second hosted
project needs a free slot (the free plan allows two active projects per owner) and care to keep in
sync, which migrations-first ordering provides; Docker was not available on the development Mac. The
local stack gives every developer a disposable copy built from the same migrations, so schema drift
shows up before production. Supabase branching becomes the preview environment when pull-request
previews need a hosted database.

## Consequences

Production was purged on 2026-10-09: 12 seed accounts, 46 events, and their consent, data-request,
and audit rows were removed in one transaction; the two real accounts were kept. The owner account
was granted administration by migration `20261010030000_owner_admin`.

## Referenced by

[[decisions/_MOC]] · [[architecture/DELIVERY]]
