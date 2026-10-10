---
type: module
path: "@root/src/Domain/Locale.pudu"
fidelity: Active
grammar: "[[grammar/pudu]]"
layer: Domain
depth_status: SHALLOW
tags: [module, domain, shallow]
---

# Domain.Locale

> /** @Domain.Locale.Language — the two languages the app speaks */

## Purpose

Spanish (default) and English, with codes, language tags, and negotiation from `Accept-Language`.

## Interface

### Signatures

```pudu
export type Locale = Es | En
export fn fromCode(written: Str) -> Locale
export fn code(locale: &Locale) -> Str
export fn tag(locale: &Locale) -> Str
export fn fromAcceptLanguage(header: Str) -> Locale
```

### Linkage

- **Requires:** nothing.
- **Consumed by:** [[src/I18n/Translate]], [[src/Web/Context]], views.

## Algorithm

The first range naming `es` or `en` wins; anything else is Spanish.

## Negative Logic (Prohibited Paths)

- ❌ No third language without a full table in [[src/I18n/Translate]].

## Edge Cases

- An empty header is Spanish.

## Depth

SHALLOW: typed values with their decoding, so no caller reads raw JSON.

## Grill Log

- **Q:** Default language?
  **A:** Spanish: the audience is Puerto Rico. English is one tap away and remembered.

## Referenced by

[[src/_MOC]]
