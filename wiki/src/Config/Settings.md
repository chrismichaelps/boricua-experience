---
type: module
path: "@root/src/Config/Settings.pudu"
fidelity: Active
grammar: "[[grammar/pudu]]"
layer: Config
depth_status: DEEP
tags: [module, config, deep]
---

# Config.Settings

> /** @Config.Settings.Environment — what the server reads at start-up */

## Purpose

Binds every setting from `.env` (when present) over the process environment, validates them together, and keeps keys as secrets.

## Interface

### Signatures

```pudu
export type Settings = { siteUrl, supabaseUrl, anonKey: Secret, serviceKey: Secret, sessionKey: Secret, openRouterKey: Secret, logLevel, logFormat, host, port, connections }
export fn load() -> Result[Settings, Str]
export fn keyBytes(key: &Secret.Secret) -> Result[Bytes, Str]
export fn isSecure(settings: &Settings) -> Bool
```

### Linkage

- **Requires:** `pudu-lang-environment`, `pudu-lang-validator`, `Std.App.Secret`, `Std.Bytes`.
- **Consumed by:** [[src/Main]], [[src/Function]], [[src/Api/Supabase/Gateway]], [[src/Services/Auth/Sealer]], [[src/App/Logging]].

## Algorithm

Load variables leniently (no `.env` on the platform), bind the record by derivation (`BORICUA_*` names), run every rule, and describe all problems at once.

## Negative Logic (Prohibited Paths)

- Pudu settings are bound here; the narrow Node streaming adapter reads its server-only deployment environment.
- ❌ A secret never renders: `redacted()` shows `[REDACTED]`.

## Edge Cases

- A missing variable is named with every other missing one.

## Depth

DEEP.

## Grill Log

- **Q:** Fail at start or at first use?
  **A:** At start, all at once: a function that cannot serve should not report itself healthy.
- **Q:** Session key format?
  **A:** 64 hex characters for 32 bytes, generated with `openssl rand -hex 32`.

## Referenced by

[[src/_MOC]]

## Assistant integration Grill Log
- **Q:** What changes here? **A:** Integrate the bounded assistant contract while preserving existing routes, source escaping, session guards and optional reduced-motion enhancement. Server credentials remain secret; browser cache graph advances together. Resolved.

## Streaming contract Grill Log
- **Q:** Where does streaming run? **A:** Node supplies a narrow SSE adapter and calls a body-HMAC protected Pudu bridge for authenticated preparation/tools. Pudu still checks origin, CSRF, active/onboarded member and atomic quota. Only the adapter reads provider credentials; the browser receives public sources and text. Permission policy permits microphone on this origin for explicit editable dictation. Deployment budget120s, adapter total deadline90s and browser95s; cancellation reaches every upstream fetch. Resolved.

Optional BORICUA_OPENROUTER_KEY defaults empty; app remains usable while the assistant reports unconfigured before quota. Secret never reaches rendered settings.

## Build identity
`BORICUA_BUILD_VERSION`, `BORICUA_BUILD_COMMIT`, `BORICUA_BUILD_HASH`, `BORICUA_BUILD_TIME` (defaults name a development build) — see [[src/Domain/Build]].
