---
type: module
path: "@root/src/I18n/EsLegal.pudu"
fidelity: Active
grammar: "[[grammar/pudu]]"
layer: I18n
depth_status: SHALLOW
tags: [module, i18n, shallow]
---

# I18n.EsLegal

> /** @I18n.EsLegal.Catalog — Spanish text of the policies and the about page */

## Purpose

Spanish terms, privacy policy, cookie policy, and about page, section by section.

## Interface

### Signatures

```pudu
export const MESSAGES: Map[Str, Str]
```

### Linkage

- **Requires:** nothing.
- **Consumed by:** [[src/I18n/Translate]].

## Algorithm

Const map; paragraphs separated by blank lines.

## Negative Logic (Prohibited Paths)

- ❌ Not legal advice: review by counsel before launch.

## Edge Cases

- Paragraph breaks are `\n\n`.

## Depth

SHALLOW.

## Grill Log

- **Q:** Why separate from the interface catalogue?
  **A:** Size and audience: policies change on a different schedule and are read by different reviewers.

## Referenced by

[[src/_MOC]]
