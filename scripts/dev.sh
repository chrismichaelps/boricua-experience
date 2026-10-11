#!/usr/bin/env bash
# Runs the public development proxy on8080 and the watched Pudu server on8082.
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
set -a
. "$root/.env"
set +a
if [ "${BORICUA_PORT:-}" != "8082" ]; then
  echo "Set BORICUA_PORT=8082 in .env for the internal Pudu server." >&2
  exit 1
fi
export BORICUA_ASSISTANT_BRIDGE_URL=http://127.0.0.1:8082
"$compiler" run --watch src/Main.pudu &
pudu_pid=$!
node --watch "$root/scripts/dev-chat.mjs" &
proxy_pid=$!
trap 'kill "$pudu_pid" "$proxy_pid" 2>/dev/null || true' EXIT INT TERM
wait "$pudu_pid" "$proxy_pid"
