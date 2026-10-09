---
type: module
path: "@root/src/Api/Participation.pudu"
fidelity: Active
grammar: "[[grammar/pudu]]"
layer: Api
depth_status: MEDIUM
tags: [module, api, medium]
---

# Api.Participation

> /** @Api.Participation.Client — joining, deciding, saving, reacting, and reporting */

## Purpose

The join flow and engagement calls.

## Interface

### Signatures

```pudu
export fn requestJoin(gateway, eventId, message, token) -> Result[Participation.JoinOutcome, Problem.Problem]
export fn withdraw(gateway, eventId, token) -> Result[(), Problem.Problem]
export fn decide(gateway, requestId, approve: Bool, note, token) -> Result[Participation.JoinOutcome, Problem.Problem]
export fn incoming(gateway, eventId, token) -> Result[Array[Participation.IncomingRequest], Problem.Problem]
export fn mine(gateway, token) -> Result[Array[Participation.MyRequest], Problem.Problem]
export fn toggleSaved(gateway, eventId, token) -> Result[Participation.SavedState, Problem.Problem]
export fn saved(gateway, token) -> Result[Array[Event.Card], Problem.Problem]
export fn react(gateway, eventId, value: Int, token) -> Result[Participation.ReactionState, Problem.Problem]
export fn report(gateway, eventId, reason, detail, token) -> Result[(), Problem.Problem]
```

### Linkage

- **Requires:** [[src/Api/Supabase/Gateway]], [[src/Domain/Participation]].
- **Consumed by:** [[src/Services/Participation]].

## Algorithm

Direct mapping to the database functions.

## Negative Logic (Prohibited Paths)

- ❌ No business rule: authorization and limits are the database's.
- ❌ No logging of arguments or tokens.

## Edge Cases

- Capacity and duplicate requests are refused by the database with stable codes.

## Depth

MEDIUM: one typed function per database function; the argument names and decoding stay here.

## Grill Log

- **Q:** Decide by event and member, or by request id?
  **A:** Request id: the organizer's queue lists ids; it cannot be confused across events.

## Referenced by

[[src/_MOC]]
