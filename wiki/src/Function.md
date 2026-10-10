---
type: module
path: "@root/src/Function.pudu"
fidelity: Active
grammar: "[[grammar/pudu]]"
layer: Entry
depth_status: SHALLOW
tags: [module, entry, shallow]
---

# Function

> /** @Function.Platform.Entry — the application as a serverless function */

## Purpose

Builds the application once per cold start, then answers platform invocations through [[src/Web/Platform]] until stopped. Adapter of [[seams/Platform]].

## Interface

### Signatures

```pudu
fn main() -> Int
```

### Linkage

- **Requires:** `Std.Http.Server.Lambda`, [[src/Web/Platform]], [[src/Web/Router]], [[src/Web/Access]], [[src/App/Assembly]].
- **Consumed by:** `scripts/build-vercel.sh`.

## Algorithm

settings → runtime → app → router → `Lambda.serveEnvironment(event → answered(dispatch(requestOf(event))))`.

## Negative Logic (Prohibited Paths)

- ❌ No per-invocation set-up.

## Edge Cases

- A start-up failure is reported to the platform so the deployment shows it.

## Depth

SHALLOW.

## Grill Log

- **Q:** A Node launcher?
  **A:** No: the release's musl runtime runs the program directly under `provided.al2023` ([[decisions/ADR-0006-lambda-runtime]]).

## Referenced by

[[src/_MOC]]
