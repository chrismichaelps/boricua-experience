---
type: module
path: "@root/src/App/Messages.pudu"
fidelity: Active
grammar: "[[grammar/pudu]]"
layer: App
depth_status: DEEP
tags: [module, app, deep]
---

# App.Messages

> /** @App.Messages.Vocabulary — every request the application answers */

## Purpose

The message records and the `Kinds` record: one typed request kind per use case, tagged read, command, or identity. `Visit[T]` carries an optional session; `Signed[T]` a required one.

## Interface

### Signatures

```pudu
export type Visit[T] = { session: Option[Session.Session], input: T }
export type Signed[T] = { session: Session.Session, input: T }
export type Place, Decision, Edit, Joining, Reacting, Reporting, SignUp, Provider, Callback, Onboard, CookieChoice, Resolution
export type Kinds = { home, search, suggest, pins, catalog, event, attendees, publish, editable, update, cancel, join, withdraw, decide, queue, save, react, report, activity, recordPosition, stopSharing, eraseLocation, participants, me, profile, onboard, updateProfile, updatePreferences, notifications, markRead, cookies, exportData, pause, reactivate, deleteAccount, signIn, signUp, provider, callback, recover, changePassword, signOut, sitemap, dashboard, resolve }
export const READ, COMMAND, IDENTITY: Str
export fn kinds() -> Kinds
```

### Linkage

- **Requires:** `pudu-lang-mediator`, Domain types, service result types.
- **Consumed by:** [[src/App/Assembly]], [[src/App/Pipeline]], App handlers, [[src/Web/Serve]] and every web handler.

## Algorithm

Kinds are made once at assembly and shared by the mediator and the routes.

## Negative Logic (Prohibited Paths)

- ❌ No message carries raw HTTP: the web layer translates first.

## Edge Cases

- Every kind's failure type is `Problem`.

## Depth

DEEP: the application's full vocabulary in one place.

## Grill Log

- **Q:** How do map results stay consistent with the listing?
  **A:** The pins message carries Search.Filters. The service passes the same validated text, category, municipality, date and free-only arguments to search_events with the map limit. Nearby refreshes preserve these filters; category/town map links explicitly encode their landing filter.


- **Q:** Generic wrappers or one record per message?
  **A:** `Visit[T]`/`Signed[T]` wrap plain inputs: the session rule is visible in the type and 44 kinds need no boilerplate records.

## Referenced by

[[src/_MOC]]

## Reviewed refinement
Map results preserve the server limited flag and show a bilingual zoom-in notice. Reaction forms lock their shared group; horizontal handle drags suppress the ensuing click. Existing public coordinate visibility remains unchanged. Grill Log: reviewed edge contracts resolved.
