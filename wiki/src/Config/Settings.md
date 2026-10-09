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
export type Settings = { siteUrl, supabaseUrl, anonKey: Secret, serviceKey: Secret, sessionKey: Secret, logLevel, logFormat, host, port, connections }
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

- ❌ No setting is read anywhere else.
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
