---
type: module
path: "@root/src/Main.pudu"
fidelity: Active
grammar: "[[grammar/pudu]]"
layer: Entry
depth_status: SHALLOW
tags: [module, entry, shallow]
---

# Main

> /** @Main.Server.Entry — the application on a local socket for development */

## Purpose

Loads settings, builds the runtime and application, and serves the router on a socket with static files and access logs.

## Interface

### Signatures

```pudu
fn main() -> Int
```

### Linkage

- **Requires:** [[src/Config/Settings]], [[src/Services/Runtime]], [[src/App/Assembly]], [[src/Web/Router]], [[src/Web/Static]], [[src/Web/Access]].
- **Consumed by:** `scripts/dev.sh`.

## Algorithm

settings → logs → runtime → app → `Server.start` → serve until stopped.

## Negative Logic (Prohibited Paths)

- ❌ Never used in production.

## Edge Cases

- A start-up problem is printed and exits 1.

## Depth

SHALLOW.

## Grill Log

- **Q:** Serve static files from Pudu in production too?
  **A:** No: the CDN serves them; this middleware exists for development only.

## Referenced by

[[src/_MOC]]
