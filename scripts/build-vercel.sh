#!/usr/bin/env bash
# Builds the Vercel Build Output directory: static files served by the CDN and one function that is
# the Pudu program attached to the release's musl Lambda runtime.
set -euo pipefail
root="$(cd "$(dirname "$0")/.." && pwd)"
compiler="${PUDU:-pudu}"
runtime="$root/.runtime"
output="$root/.vercel/output"
function_dir="$output/functions/app.func"
site_url="${BORICUA_SITE_URL:?set BORICUA_SITE_URL to the canonical https origin}"
# The same-origin guard compares every post with this origin, and canonical links are built from it,
# so a development origin here refuses every form on the deployed site.
if [[ ! "$site_url" =~ ^https://[a-z0-9.-]+\.[a-z]{2,}$ ]] || [[ "$site_url" == *localhost* ]]; then
  echo "BORICUA_SITE_URL must be a public https origin without a path or trailing slash; got '$site_url'." >&2
  exit 1
fi

# A release must come from a committed tree, so its fingerprint always maps back to one commit; set
# BORICUA_ALLOW_DIRTY=1 only for a local trial build.
if [[ -n "$(git -C "$root" status --porcelain)" && "${BORICUA_ALLOW_DIRTY:-}" != "1" ]]; then
  echo "Refusing to build a release from uncommitted changes; commit first (or BORICUA_ALLOW_DIRTY=1 for a trial)." >&2
  exit 1
fi

[[ -f "$runtime/pudu-musl-lambda-x86_64" ]] || "$root/scripts/fetch-runtime.sh"
(cd "$root" && "$compiler" install --locked)

rm -rf "$output"
mkdir -p "$function_dir" "$output/static"
cp -R "$root/public/." "$output/static/"
find "$output/static" -name '*.md' -delete

"$compiler" build "$root/src/Function.pudu" -o "$function_dir/bootstrap" --runtime "$runtime/pudu-musl-lambda-x86_64"
for library in ld-musl-x86_64.so.1 libffi.so.8 libz.so.1 libncursesw.so.6 libgmp.so.10; do
  cp "$runtime/$library" "$function_dir/$library"
done
mkdir -p "$output/functions/chat.func"
cp "$root/server/assistant.mjs" "$output/functions/chat.func/index.mjs"
chmod 755 "$function_dir/bootstrap" "$function_dir/ld-musl-x86_64.so.1"

# The build's identity: release version, source commit, and a fingerprint of every deployed byte.
build_version="$(sed -nE 's/^version = "([^"]+)"/\1/p' "$root/pudu.toml" | head -1)"
build_commit="$(git -C "$root" rev-parse HEAD)"
build_hash="$("$root/scripts/build-identity.sh" "$output" "$root/.vercel/build-manifest.txt")"
build_time="$(date -u +%Y-%m-%dT%H:%M:%SZ)"
cat > "$output/static/build.json" <<JSON
{"version":"$build_version","commit":"$build_commit","hash":"$build_hash","short":"${build_hash:7:12}","built_at":"$build_time"}
JSON
cat > "$output/functions/chat.func/.vc-config.json" <<JSON
{"runtime":"nodejs22.x","handler":"index.mjs","launcherType":"Nodejs","supportsResponseStreaming":true,"maxDuration":120,"environment":{"BORICUA_SITE_URL":"$site_url","BORICUA_BUILD_HASH":"$build_hash"}}
JSON

# Settings that are not secret travel with the function; keys are project environment variables.
cat > "$function_dir/.vc-config.json" <<JSON
{
  "runtime": "provided.al2023",
  "handler": "bootstrap",
  "architecture": "x86_64",
  "memory": 1024,
  "maxDuration": 120,
  "environment": {
    "BORICUA_SITE_URL": "$site_url",
    "BORICUA_LOG_FORMAT": "json",
    "BORICUA_LOG_LEVEL": "information",
    "BORICUA_BUILD_VERSION": "$build_version",
    "BORICUA_BUILD_COMMIT": "$build_commit",
    "BORICUA_BUILD_HASH": "$build_hash",
    "BORICUA_BUILD_TIME": "$build_time"
  }
}
JSON

# Assets are immutable per version query, except HTML documents, which are revalidated because their
# own address cannot carry the version a returning visitor has not seen yet; the service worker and manifest are always revalidated;
# everything that is not a file goes to the function. One daily cron (the free plan's limit) deletes
# unreferenced place media; it authenticates with CRON_SECRET.
cat > "$output/config.json" <<'JSON'
{
  "version": 3,
  "routes": [
    { "src": "^/assets/(.*)$", "headers": { "cache-control": "public, max-age=31536000, immutable" }, "continue": true },
    { "src": "^/assets/(.*)\\.html$", "headers": { "cache-control": "public, max-age=0, must-revalidate" }, "continue": true },
    { "src": "^/build\\.json$", "headers": { "cache-control": "no-store", "access-control-allow-origin": "*" }, "continue": true },
    { "src": "^/sw\\.js$", "headers": { "cache-control": "no-cache", "service-worker-allowed": "/" }, "continue": true },
    { "src": "^/favicon\\.ico$", "headers": { "cache-control": "public, max-age=86400" }, "continue": true },
    { "src": "^/api/chat$", "dest": "/chat" },
    { "handle": "filesystem" },
    { "src": "/(.*)", "dest": "/app" }
  ],
  "crons": [
    { "path": "/internal/media-sweep", "schedule": "17 8 * * *" },
    { "path": "/internal/digest", "schedule": "5 13 * * *" }
  ]
}
JSON
echo "Built $output"
echo "Build $build_version ${build_commit:0:7} $build_hash"
