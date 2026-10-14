---
type: module
path: "@root/src/Domain/Build.pudu"
fidelity: Active
grammar: "[[grammar/pudu]]"
layer: Domain
depth_status: SHALLOW
tags: [module, domain, release]
---

# Domain.Build

## Purpose and interface
The identity of the running build, so any page, monitor, or service can tell which release is live and whether two parts of a deployment agree. `Build = { version, commit, hash, builtAt }`.

- `of(version, commit, hash, builtAt)` — the release identity from the environment, or `development()` when the hash is missing or malformed.
- `wellFormed(hash)`, `isRelease(build)` — `sha256:` plus 64 lowercase hex characters.
- `short(build)` — the first 12 hex characters people compare; `shortCommit(build)` — 7 characters.
- `label(build)` — `v0.7.0 · 1a2b3c4d5e6f`, or `development`.
- `json(build)` — `{version, commit, hash, short, built_at}`, the shape `/version` and `/build.json` share.

## Algorithm
The fingerprint is computed by [[src/Infrastructure/ReleaseIdentity]] over the deployed bytes and travels to the function as `BORICUA_BUILD_*` variables ([[src/Config/Settings]]), into [[src/Services/Runtime]] and every [[src/View/Frame]].

## Negative logic and edge cases
No release fingerprint is ever invented: a malformed or absent hash renders as `development`, and the browser check ([[src/Public/BuildCheck]]) ignores it. The commit is informative; the hash is the identity.

## Grill Log
Resolved: identify a build by the content it serves (reproducible SHA-256 over every deployed file) rather than by commit or time alone — two builds of one commit with different compilers differ, and two deploys of identical bytes match. Rejected: a random build id (not verifiable) and the asset version (changes by hand, not per build).

## Referenced by
[[src/_MOC]] · [[src/Web/Handlers/Site]] · [[src/Web/Respond]] · [[src/View/Layout]] · [[src/View/Components/Footer]]
