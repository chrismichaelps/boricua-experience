#!/usr/bin/env bash
# Brings the hosted development project up to date: migrations, then the seed, then the auth settings
# in supabase/config.toml (site URL, redirect list, Google client). It refuses the production project,
# whose auth settings are managed in the dashboard and whose data never receives the seed.
set -euo pipefail
root="$(cd "$(dirname "$0")/.." && pwd)"
cd "$root"
# shellcheck source=scripts/environments.sh
. "$root/scripts/environments.sh"
set -a
. ./.env
set +a

ref="$(project_ref "${BORICUA_SUPABASE_URL:-}")"
if [ -z "$ref" ]; then
  echo "BORICUA_SUPABASE_URL is not a hosted project; for the local stack run 'supabase db reset'." >&2
  exit 1
fi
if [ "$ref" = "$PRODUCTION_PROJECT_REF" ]; then
  echo "Refusing: .env points at the production project." >&2
  exit 1
fi
: "${BORICUA_DB_PASSWORD:?set BORICUA_DB_PASSWORD to the development database password}"
: "${SUPABASE_AUTH_EXTERNAL_GOOGLE_CLIENT_ID:?set the development Google OAuth client id}"
: "${SUPABASE_AUTH_EXTERNAL_GOOGLE_SECRET:?set the development Google OAuth client secret}"

password="$(python3 -c 'import os, urllib.parse; print(urllib.parse.quote(os.environ["BORICUA_DB_PASSWORD"], safe=""))')"
supabase db push --yes --db-url "postgresql://postgres.$ref:$password@$POOLER_HOST:5432/postgres"
# psql runs the seed statement by statement; the CLI's batched seeding cannot see the temporary
# tables the seed creates. The seed replaces its own rows, so running it again is safe.
PGPASSWORD="$BORICUA_DB_PASSWORD" psql "host=$POOLER_HOST port=5432 user=postgres.$ref dbname=postgres sslmode=require" \
  -v ON_ERROR_STOP=1 -q -f supabase/seed.sql
supabase config push --project-ref "$ref" --yes
echo "Development project $ref is up to date."
