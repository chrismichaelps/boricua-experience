---
type: module
path: "@root/src/I18n/Translate.pudu"
fidelity: Active
grammar: "[[grammar/pudu]]"
layer: I18n
depth_status: DEEP
tags: [module, i18n, deep]
---

# I18n.Translate

> /** @I18n.Translate.Lookup — message keys turned into text in a language */

## Purpose

Looks up a key in the reader's language with Spanish as fallback, fills `:name` placeholders, and picks singular or plural forms.

## Interface

### Signatures

```pudu
export fn text(locale: &Locale.Locale, key: Str) -> Str
export fn fill(locale: &Locale.Locale, key: Str, values: &Array[(Str, Str)]) -> Str
export fn count(locale: &Locale.Locale, key: Str, amount: Int) -> Str
```

### Linkage

- **Requires:** [[src/I18n/Es]], [[src/I18n/En]], [[src/Domain/Locale]].
- **Consumed by:** every view, [[src/I18n/Dates]], [[src/I18n/Format]].

## Algorithm

Const tables (built once); a missing English entry falls back to Spanish, a missing key renders as itself so it is noticed. Placeholders are replaced longest name first.

## Negative Logic (Prohibited Paths)

- ❌ No HTML in messages: views add markup.

## Edge Cases

- `count` uses `key.one` for 1 and `key.other` otherwise.

## Depth

DEEP.

## Grill Log

- **Q:** Placeholder syntax?
  **A:** `:name`, because braces in Pudu strings are interpolation.

## Referenced by

[[src/_MOC]]

## Catalogue split

Lookup reads the interface, account ([[src/I18n/EsAccount]], [[src/I18n/EnAccount]]), and policy catalogues in that order, Spanish as fallback.
