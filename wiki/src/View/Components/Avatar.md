---
type: module
path: "@root/src/View/Components/Avatar.pudu"
fidelity: Active
grammar: "[[grammar/pudu]]"
layer: View
depth_status: MEDIUM
tags: [module, view, medium]
---

# View.Components.Avatar

> /** @View.Components.Avatar.Faces — initials in a coloured circle, alone or stacked */

## Purpose

Initials avatars with a stable colour per name, and overlapping stacks with a count.

## Interface

### Signatures

```pudu
export fn avatar(name, size) -> H.Node
export fn stack(names, total) -> H.Node
```

### Linkage

- **Requires:** `Std.Html.Build`, [[src/View/Frame]], [[src/I18n/Translate]], Domain types.
- **Consumed by:** Web handlers and other views.

### Photos

`face(name, photo, size)` renders the stored photo (lazy, sized, empty alt) when there is one and the initials otherwise; `stack` takes (name, photo) pairs.

## Algorithm

Builds `Html` values with the trait chain; text from requests or the database goes through `says`, never `raw`.

## Negative Logic (Prohibited Paths)

- ❌ No service calls: a view renders what it is given.
- ❌ No inline scripts; behaviour attaches by `data-feature`.

## Edge Cases

- Every interactive control has a visible label or `aria-label`; touch targets are at least 44 px.

## Depth

MEDIUM.

## Grill Log

- **Q:** Templates or values?
  **A:** Values: a page is an `Html` tree, so escaping cannot be forgotten and pages are testable with fixtures.

## Referenced by

[[src/_MOC]]
