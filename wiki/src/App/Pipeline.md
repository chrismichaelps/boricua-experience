---
type: module
path: "@root/src/App/Pipeline.pudu"
fidelity: Active
grammar: "[[grammar/pudu]]"
layer: App
depth_status: MEDIUM
tags: [module, app, medium]
---

# App.Pipeline

> /** @App.Pipeline.Behaviors — what every message passes through */

## Purpose

The open behaviors every message runs through: the logging recorder outermost, an exception action that logs faults as errors and unavailable dependencies as warnings, and validation bounds on search and suggestion text; plus the mapping from mediator failures to `Problem`.

## Interface

### Signatures

```pudu
export const FAULT: Str
export const UPSTREAM: Str
export fn isFault[E](failure: &Messaging.Failure[E]) -> Bool
export fn registrations(kinds: &Messages.Kinds, messages: &Logger.Logger) -> Array[Registration.Registration]
export fn problemOf(failure: &Messaging.Failure[Problem.Problem]) -> Problem.Problem
```

### Linkage

- **Requires:** `pudu-lang-mediator` (Behaviors.Logging, Behaviors.Validation), `pudu-lang-log`, `pudu-lang-validator`.
- **Consumed by:** [[src/App/Assembly]], [[src/Web/Context]].

## Algorithm

Recorder → alarm → validation → handler. `problemOf` keeps raised problems, maps validation to field errors, and turns crashes into `Unavailable`.

## Negative Logic (Prohibited Paths)

- ❌ The recorder never logs message contents (they carry tokens).

## Edge Cases

- Oversized search text is refused before any database call.

## Depth

MEDIUM.

## Grill Log

- **Q:** Validate everything in the pipeline?
  **A:** Bounds only; domain validation with translated field errors lives in the services.

## Referenced by

[[src/_MOC]]
