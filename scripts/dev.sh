#!/usr/bin/env bash
# Runs the application locally on BORICUA_PORT (8080), restarting when a source file changes.
# Development talks to the local Supabase stack (`supabase start`), which applies the migrations
# and the seed; it refuses a hosted database unless BORICUA_ALLOW_REMOTE_DB=1 says so on purpose.
set -euo pipefail
root="$(cd "$(dirname "$0")/.." && pwd)"
compiler="${PUDU:-pudu}"
cd "$root"
database="$(grep -E '^BORICUA_SUPABASE_URL=' .env 2>/dev/null | cut -d= -f2- || true)"
case "$database" in
  http://127.0.0.1:*|http://localhost:*) ;;
  *)
    if [ "${BORICUA_ALLOW_REMOTE_DB:-0}" != "1" ]; then
      echo "BORICUA_SUPABASE_URL in .env is not the local stack ($database)." >&2
      echo "Run 'supabase start' and point .env at it, or set BORICUA_ALLOW_REMOTE_DB=1 deliberately." >&2
      exit 1
    fi
    ;;
esac
"$compiler" install --locked
exec "$compiler" run --watch src/Main.pudu
