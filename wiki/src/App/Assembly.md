---
type: module
path: "@root/src/App/Assembly.pudu"
fidelity: Active
grammar: "[[grammar/pudu]]"
layer: App
depth_status: MEDIUM
tags: [module, app, medium]
---

# App.Assembly

> /** @App.Assembly.Composition — the mediator built once over the runtime */

## Purpose

Builds the mediator from the pipeline and every subsystem's handlers, reporting every registration problem at once.

## Interface

### Signatures

```pudu
export type App = { runtime: Runtime.Runtime, mediator: Mediator.Mediator, kinds: Messages.Kinds, logs: Logging.Logs }
export fn assemble(runtime: &Runtime.Runtime, logs: &Logging.Logs) -> Result[App, Str]
```

### Linkage

- **Requires:** [[src/App/Pipeline]], App handlers, [[src/Services/Runtime]].
- **Consumed by:** [[src/Main]], [[src/Function]], every web module.

## Algorithm

Concatenate registrations, build, answer the app.

## Negative Logic (Prohibited Paths)

- ❌ Built once per process, never per request.

## Edge Cases

- A missing handler fails start-up, not a request.

## Depth

MEDIUM.

## Grill Log

- **Q:** Lazy registration?
  **A:** No: a cold start pays once and every request is a lookup.

## Referenced by

[[src/_MOC]]


## Forum integration Grill Log · #137
Resolved: register four typed forum messages and dedicated handlers/catalogues without changing existing contracts; preserve all session/CSRF wrappers and Spanish fallback. No HTTP below Web, no services in View.
