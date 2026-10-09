---
type: module
path: "@root/src/Utils/Cookie.pudu"
fidelity: Active
grammar: "[[grammar/pudu]]"
layer: Utils
depth_status: MEDIUM
tags: [module, utils, medium]
---

# Utils.Cookie

> /** @Utils.Cookie.Header — cookie headers read and written */

## Purpose

Parses a `Cookie` header into a map and writes `Set-Cookie` values.

## Interface

### Signatures

```pudu
export type Attributes = { maxAge: Int, httpOnly: Bool, secure: Bool, sameSite: Str }
export fn parse(header: Str) -> Map[Str, Str]
export fn render(name: Str, value: Str, attributes: &Attributes) -> Str
export fn expire(name: Str, secure: Bool) -> Str
```

### Linkage

- **Requires:** `Std.Url`.
- **Consumed by:** [[src/Web/Context]], [[src/Web/Respond]].

## Algorithm

Parsing splits on `;`, keeps the first value of a repeated name, and percent-decodes values. Rendering percent-encodes the value and always sets `Path=/`, `Max-Age`, and `SameSite`.

## Negative Logic (Prohibited Paths)

- ❌ Never omits `SameSite`.
- ❌ Never sets a domain: cookies stay host-only.

## Edge Cases

- A pair without `=` is ignored.

## Depth

MEDIUM.

## Grill Log

- **Q:** Which value wins for a repeated name?
  **A:** The first, as browsers send the most specific path first. _Rejected:_ the last.

## Referenced by

[[src/_MOC]]
