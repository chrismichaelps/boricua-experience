#!/usr/bin/env bash
# Runs the application locally on BORICUA_PORT (8080), restarting when a source file changes.
# Development talks to the hosted development project or the local Supabase stack, and refuses the
# production project outright.
set -euo pipefail
root="$(cd "$(dirname "$0")/.." && pwd)"
compiler="${PUDU:-pudu}"
cd "$root"
# shellcheck source=scripts/environments.sh
. "$root/scripts/environments.sh"
database="$(grep -E '^BORICUA_SUPABASE_URL=' .env 2>/dev/null | cut -d= -f2- || true)"
if [ "$(project_ref "$database")" = "$PRODUCTION_PROJECT_REF" ]; then
  echo "BORICUA_SUPABASE_URL in .env is the production project; development never runs against it." >&2
  echo "Point .env at the development project (boricua-experience-dev) or at 'supabase start'." >&2
  exit 1
fi
"$compiler" install --locked
exec "$compiler" run --watch src/Main.pudu
