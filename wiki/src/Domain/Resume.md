---
type: module
path: "@root/src/Domain/Resume.pudu"
fidelity: Active
grammar: "[[grammar/pudu]]"
layer: Domain
depth_status: SHALLOW
tags: [module, domain, shallow, auth]
---

# Domain.Resume

> /** @Domain.Resume.Intent — an action a guest started before signing in, finished after */

## Purpose

Keeps a guest's tap (Interested, Going, Like, Join, review) alive through sign-in, sign-up, Google and onboarding, so the page they return to can offer to finish it.

## Interface

### Signatures

```pudu
export const PARAM: Str
export const KINDS: Array[Str]
export fn valid(kind: Str) -> Bool
export fn fromQuery(query: Str) -> Option[Str]
export fn ofPath(path: Str) -> Option[Str]
export fn returning(path: Str, kind: Str) -> Str
export fn signIn(signInPath: Str, path: Str, kind: Str) -> Str
```

### Linkage

- **Requires:** `Std.Url`.
- **Consumed by:** [[src/View/Pages/Event]], [[src/View/Pages/Auth]], [[src/View/Components/Reviews]].

## Algorithm

The action rides inside the existing `return` path as `?resume=<kind>` (before any `#fragment`), and the whole return path is URL-encoded in the sign-in link. Every identity route already redirects to the return path, so no handler stores anything new.

## Negative Logic (Prohibited Paths)

- ❌ Never performs the action by itself: the page offers one tap, because a mark toggles and a silent repeat could undo it.
- ❌ Unknown kinds resume nothing.

## Edge Cases

- An existing query gains `&resume=`; a fragment stays last.
- The onboarding gate passes the full path with its query, so a new Google account keeps the action.

## Depth

SHALLOW: string rules shared by links and pages.

## Grill Log

- **Q:** Store the pending action in a cookie?
  **A:** No: the return path already survives every flow, and a URL cannot leak between tabs or accounts.

## Referenced by

[[src/_MOC]]
