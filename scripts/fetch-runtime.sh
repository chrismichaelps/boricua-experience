#!/usr/bin/env bash
# Downloads the Pudu release's musl Lambda runtime and the libraries it loads into .runtime/,
# verified against the release's own checksums. The compiler that attaches the program must be the
# same release (PUDU_VERSION).
set -euo pipefail
root="$(cd "$(dirname "$0")/.." && pwd)"
version="${PUDU_VERSION:-v0.1.3}"
repository="chrismichaelps/pudu-lang"
target="$root/.runtime"
files=(pudu-musl-lambda-x86_64 ld-musl-x86_64.so.1 libffi.so.8 libz.so.1 libncursesw.so.6 libgmp.so.10)

mkdir -p "$target"
gh release download "$version" -R "$repository" -p 'pudu-runtime-linux-musl-x86_64.sha256' -O "$target/checksums.sha256" --clobber
for file in "${files[@]}"; do
  if [[ ! -f "$target/$file" ]]; then
    gh release download "$version" -R "$repository" -p "$file.gz" -O - | gunzip > "$target/$file"
  fi
  expected="$(awk -v name="$file" '$2 == name { print $1 }' "$target/checksums.sha256")"
  actual="$(shasum -a 256 "$target/$file" | awk '{ print $1 }')"
  if [[ "$expected" != "$actual" ]]; then
    echo "checksum mismatch for $file" >&2
    rm -f "$target/$file"
    exit 1
  fi
done
chmod 755 "$target/pudu-musl-lambda-x86_64" "$target/ld-musl-x86_64.so.1"
echo "Runtime $version ready in $target"
