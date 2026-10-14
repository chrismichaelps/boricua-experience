---
type: infrastructure
path: "@root/scripts/build-identity.sh"
fidelity: Active
tags: [infrastructure, release]
---

# Release identity

## Purpose and interface
- `scripts/build-identity.sh <output> [manifest]` — prints `sha256:<hex>`: the SHA-256 of a manifest listing every file under `static/` and `functions/` with its own SHA-256, sorted by path (C collation). `.vc-config.json` files and `static/build.json` are excluded, so the fingerprint covers exactly the bytes served and run.
- `scripts/build-vercel.sh` — refuses an uncommitted tree before building (`BORICUA_ALLOW_DIRTY=1` for trials), computes the identity after the output is complete, writes `static/build.json`, keeps the manifest at `.vercel/build-manifest.txt`, and passes `BORICUA_BUILD_VERSION/COMMIT/HASH/TIME` to the function (the hash also to the chat function). `/build.json` is served `no-store` with `access-control-allow-origin: *`.
- `scripts/verify-build.sh [site] [output]` — compares the function's `/version` with the CDN's `/build.json` (a mismatch means mixed builds) and, given a local output, with the locally computed fingerprint.

## Surfaces
`GET /version` (function, `no-store`, any origin), `GET /build.json` (static), the `x-build` header on every function response, `<meta name="build">` on every page, and the footer label linking to `/version`.

## Negative logic and edge cases
Two builds of the same tree produced the same fingerprint (verified on 0.6.0). Build time is metadata outside the hash. A dirty tree never yields a release fingerprint.

## Referenced by
[[src/_MOC]] · [[src/Domain/Build]] · [[src/Public/BuildCheck]]
