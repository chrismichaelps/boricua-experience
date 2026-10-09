---
type: module
path: "@root/src/Utils/Form.pudu"
fidelity: Active
grammar: "[[grammar/pudu]]"
layer: Utils
depth_status: SHALLOW
tags: [module, utils, shallow]
---

# Utils.Form

> /** @Utils.Form.Fields — values read from a posted form */

## Purpose

Reads text, paragraphs, checkboxes, and whole numbers from posted fields.

## Interface

### Signatures

```pudu
export fn text(fields: &Map[Str, Str], name: Str) -> Str
export fn paragraph(fields: &Map[Str, Str], name: Str) -> Str
export fn flag(fields: &Map[Str, Str], name: Str) -> Bool
export fn whole(fields: &Map[Str, Str], name: Str) -> Option[Int]
```

### Linkage

- **Requires:** [[src/Utils/Text]].
- **Consumed by:** `Web/Handlers`.

## Algorithm

`text` collapses space; `paragraph` keeps line breaks; `flag` accepts `on`, `true`, `1`, `yes`.

## Negative Logic (Prohibited Paths)

- ❌ No validation here: [[src/Validation/_MOC]] decides what is acceptable.

## Edge Cases

- Absent fields read as empty or false.

## Depth

SHALLOW.

## Grill Log

- **Q:** Collapse space in descriptions?
  **A:** No: descriptions and instructions keep their line breaks (`paragraph`).

## Referenced by

[[src/_MOC]]
