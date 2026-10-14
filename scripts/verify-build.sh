#!/usr/bin/env bash
# Checks which build a deployment is running. The function's /version and the CDN's /build.json must
# name the same fingerprint (a mismatch means the static files and the function come from different
# builds); with a local output directory, the live fingerprint is also compared with the one computed
# here, so anyone can prove a deployment serves exactly the bytes they built.
# Usage: scripts/verify-build.sh [site-url] [output-dir]
set -euo pipefail
site="${1:-https://boricuaexperience.com}"
output="${2:-}"
field() { sed -nE "s/.*\"$1\":\"([^\"]*)\".*/\\1/p"; }
server="$(curl -fsS -H 'cache-control: no-cache' "$site/version")"
static="$(curl -fsS -H 'cache-control: no-cache' "$site/build.json")"
server_hash="$(printf '%s' "$server" | field hash)"
static_hash="$(printf '%s' "$static" | field hash)"
echo "version  $(printf '%s' "$server" | field version)"
echo "commit   $(printf '%s' "$server" | field commit)"
echo "built    $(printf '%s' "$server" | field built_at)"
echo "function $server_hash"
echo "static   $static_hash"
status=0
if [[ "$server_hash" != "$static_hash" ]]; then echo "MISMATCH: function and static files come from different builds" >&2; status=1; fi
if [[ -n "$output" ]]; then
  local_hash="$("$(dirname "$0")/build-identity.sh" "$output")"
  echo "local    $local_hash"
  if [[ "$local_hash" != "$server_hash" ]]; then echo "MISMATCH: the deployment does not serve the local build" >&2; status=1; fi
fi
[[ $status -eq 0 ]] && echo "OK: one build is live"
exit $status
