#!/usr/bin/env bash
# Prints the content fingerprint of a Vercel Build Output directory: the SHA-256 of a manifest that
# lists every deployed file's own SHA-256 and path, sorted by path. Settings files (.vc-config.json)
# and the published identity (static/build.json) are left out, so the fingerprint names the bytes that
# are served and run, and the same output always yields the same fingerprint.
# Usage: scripts/build-identity.sh <output-dir> [manifest-file]
set -euo pipefail
output="${1:?usage: build-identity.sh <output-dir> [manifest-file]}"
manifest="${2:-/dev/null}"
cd "$output"
find static functions -type f ! -name '.vc-config.json' ! -path 'static/build.json' -print0 \
  | LC_ALL=C sort -z \
  | xargs -0 shasum -a 256 \
  | tee "$manifest" \
  | shasum -a 256 | cut -d' ' -f1 | sed 's/^/sha256:/'
