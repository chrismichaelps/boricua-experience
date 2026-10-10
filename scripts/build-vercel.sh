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
chmod 755 "$function_dir/bootstrap" "$function_dir/ld-musl-x86_64.so.1"

# Settings that are not secret travel with the function; keys are project environment variables.
cat > "$function_dir/.vc-config.json" <<JSON
{
  "runtime": "provided.al2023",
  "handler": "bootstrap",
  "architecture": "x86_64",
  "memory": 1024,
  "maxDuration": 30,
  "environment": {
    "BORICUA_SITE_URL": "$site_url",
    "BORICUA_LOG_FORMAT": "json",
    "BORICUA_LOG_LEVEL": "information"
  }
}
JSON

# Assets are immutable per version query; the service worker and manifest are always revalidated;
# everything that is not a file goes to the function.
cat > "$output/config.json" <<'JSON'
{
  "version": 3,
  "routes": [
    { "src": "^/assets/(.*)$", "headers": { "cache-control": "public, max-age=31536000, immutable" }, "continue": true },
    { "src": "^/sw\\.js$", "headers": { "cache-control": "no-cache", "service-worker-allowed": "/" }, "continue": true },
    { "src": "^/favicon\\.ico$", "headers": { "cache-control": "public, max-age=86400" }, "continue": true },
    { "handle": "filesystem" },
    { "src": "/(.*)", "dest": "/app" }
  ]
}
JSON
echo "Built $output"
