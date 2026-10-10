---
type: module
path: "@root/src/App/Logging.pudu"
fidelity: Active
grammar: "[[grammar/pudu]]"
layer: App
depth_status: SHALLOW
tags: [module, app, shallow]
---

# App.Logging

> /** @App.Logging.Events — the structured loggers of the application */

## Purpose

Two loggers: one event per request, and the mediator's events, quiet unless debugging. Text, coloured text, or compact JSON to standard error.

## Interface

### Signatures

```pudu
export type Logs = { requests: Logger.Logger, messages: Logger.Logger }
export fn logs(settings: &Settings.Settings) -> Logs
export fn quiet() -> Logs
```

### Linkage

- **Requires:** `pudu-lang-log`, [[src/Config/Settings]].
- **Consumed by:** [[src/Main]], [[src/Function]], [[src/App/Assembly]].

## Algorithm

Level from a const table; JSON format on the platform.

## Negative Logic (Prohibited Paths)

- ❌ No query strings, bodies, or tokens in events.

## Edge Cases

- Unknown levels mean information.

## Depth

SHALLOW.

## Grill Log

- **Q:** Log to a service?
  **A:** Standard error: the platform collects it; a sink can be added without code changes elsewhere.

## Referenced by

[[src/_MOC]]
