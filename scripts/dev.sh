#!/usr/bin/env bash
# Runs the application locally on BORICUA_PORT (8080), restarting when a source file changes.
set -euo pipefail
root="$(cd "$(dirname "$0")/.." && pwd)"
compiler="${PUDU:-pudu}"
cd "$root"
"$compiler" install --locked
exec "$compiler" run --watch src/Main.pudu
