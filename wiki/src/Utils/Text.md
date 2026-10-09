---
type: module
path: "@root/src/Utils/Text.pudu"
fidelity: Active
grammar: "[[grammar/pudu]]"
layer: Utils
depth_status: MEDIUM
tags: [module, utils, medium]
---

# Utils.Text

> /** @Utils.Text.Shaping — trimming, shortening, and initials */

## Purpose

Text shaping for display and form input: collapsing space, shortening with an ellipsis, and avatar initials.

## Interface

### Signatures

```pudu
export fn collapse(value: Str) -> Str
export fn truncate(value: Str, max: Int) -> Str
export fn initials(name: Str) -> Str
export fn isBlank(value: Str) -> Bool
```

### Linkage

- **Requires:** `Std.Text`.
- **Consumed by:** [[src/Utils/Form]], views, validation.

## Algorithm

1. `collapse` turns tabs, carriage returns, and line breaks into spaces and joins the words with one space.
2. `truncate` collapses, then cuts to `max - 1` characters, trims the end, and appends `…`.
3. `initials` upper-cases the first letter of the first two words; `?` when there are none.

## Negative Logic (Prohibited Paths)

- ❌ Never escapes HTML: escaping belongs to the page builder.

## Edge Cases

- Empty text truncates to empty and has initials `?`.

## Depth

MEDIUM: small interface, a few rules each caller would otherwise repeat.

## Grill Log

- **Q:** Count characters or bytes when truncating?
  **A:** Characters (Unicode scalars), so accented names are never split mid-letter. _Rejected:_ byte limits.

## Referenced by

[[src/_MOC]]
