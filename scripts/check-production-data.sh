#!/usr/bin/env bash
# Fails when development seed data is present in the database BORICUA_PRODUCTION_DB_URL names.
# Production holds only real data; seed accounts use the reserved .test domain.
set -euo pipefail
url="${BORICUA_PRODUCTION_DB_URL:?set BORICUA_PRODUCTION_DB_URL to the production connection string}"
found="$(psql "$url" -At -c "select (select count(*) from auth.users where email like '%@boricua.test') + (select count(*) from app.events where source = 'seed')")"
if [ "$found" != "0" ]; then
  echo "production holds $found seed rows; remove them with supabase/scripts/purge-seed.sql" >&2
  exit 1
fi
echo "production holds no seed data"
