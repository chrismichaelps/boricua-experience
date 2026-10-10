---
type: adr
status: ACCEPTED
date: 2026-10-09
tags: [adr]
---

# ADR-0008 — Separate development and production data

## Decision

Production data lives only in the hosted Supabase project, which receives migrations and never the
seed. Development runs against the local Supabase stack (`supabase start`), which applies the same
migrations and then `supabase/seed.sql`. `supabase db reset` rebuilds it in seconds, with the local
mail catcher receiving confirmation and recovery email.

| Environment | Database | Seed | Deploy |
| --- | --- | --- | --- |
| Local | Supabase stack in Docker on 127.0.0.1:54321 | applied on start and reset | `scripts/dev.sh` |
| Production | hosted project | never | `supabase db push`, then `vercel deploy --prod` |
| Preview (later) | Supabase branch per pull request | branch seed | Vercel preview |

## Guards

- `scripts/dev.sh` refuses a non-local `BORICUA_SUPABASE_URL` unless `BORICUA_ALLOW_REMOTE_DB=1`.
- `scripts/check-production-data.sh` fails when any `@boricua.test` account or `source = 'seed'`
  event exists in production; run it after every production migration.
- Seed accounts use the reserved `.test` domain, so they can never receive mail or collide with a
  real address, and `supabase/scripts/purge-seed.sql` removes them and everything they organized.
- The Supabase CLI seeds a remote database only with an explicit `--include-seed`, which is never
  used for production.

## Rationale

One shared database mixed test accounts and invented activities into the live site. A second hosted
project costs a paid plan once the free allowance is used, and still needs care to keep in sync. The
local stack gives every developer a disposable copy built from the same migrations, so schema drift
shows up before production. Supabase branching becomes the preview environment when pull-request
previews need a hosted database.

## Consequences

Production was purged on 2026-10-09: 12 seed accounts, 46 events, and their consent, data-request,
and audit rows were removed in one transaction; the two real accounts were kept. The owner account
was granted administration by migration `20261010030000_owner_admin`.

## Referenced by

[[decisions/_MOC]] · [[architecture/DELIVERY]]
