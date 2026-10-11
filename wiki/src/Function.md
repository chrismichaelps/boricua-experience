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

## Streaming contract Grill Log
- **Q:** Where does streaming run? **A:** Node supplies a narrow SSE adapter and calls a body-HMAC protected Pudu bridge for authenticated preparation/tools. Pudu still checks origin, CSRF, active/onboarded member and atomic quota. Only the adapter reads provider credentials; the browser receives public sources and text. Permission policy permits microphone on this origin for explicit editable dictation. Deployment budget120s, adapter total deadline90s and browser95s; cancellation reaches every upstream fetch. Resolved.

## Local streaming development

Resolved Grill Log: `scripts/dev.sh` rejects the production database, starts watched Pudu on the `.env` internal port8082 and watched Node proxy on8080, and terminates both children on exit. It exports private `.env` values only to these processes. `scripts/dev-chat.mjs` forwards normal HTTP traffic and isolates `/api/chat`; proxy errors are stable and contain no credentials.
