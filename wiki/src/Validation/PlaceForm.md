---
type: module
path: "@root/src/Validation/PlaceForm.pudu"
fidelity: Active
grammar: "[[grammar/pudu]]"
layer: Validation
depth_status: MEDIUM
tags: [module, validation]
---

# Validation.PlaceForm

> /** @Validation.PlaceForm.Publishing — a place draft checked against its category's profile */

## Purpose

Checks a place draft against the catalogue's profile for its category and converts facts to typed JSON for the database.

## Interface

### Signatures

```pudu
export fn check(draft: &Place.Draft, catalog: &Catalog.Catalog) -> Result[Place.Ready, Problem.Problem]
export fn phoneOk, urlOk
```

### Linkage

- **Requires:** [[src/Domain/Catalog]], [[src/Domain/Place]].
- **Consumed by:** [[src/Services/Places]].

## Algorithm

Only fields the profile declares are read; each converts by type (text, long text, choice, flags, toggle, number, url, phone) or is refused with `form.fact_invalid`; missing required facts are `form.fact_required`. Every refused field is reported at once.

## Negative Logic (Prohibited Paths)

- ❌ A posted name outside the profile is never stored.
- ❌ The database (`private.check_details`) remains the authority; this check only names fields.

## Referenced by

[[src/_MOC]]
