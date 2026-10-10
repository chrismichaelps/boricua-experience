---
type: module
path: "@root/src/View/Seo.pudu"
fidelity: Active
grammar: "[[grammar/pudu]]"
layer: View
depth_status: MEDIUM
tags: [module, view, medium]
---

# View.Seo

> /** @View.Seo.Discovery — head tags, structured data, sitemap, robots, and the manifest */

## Purpose

Title, description, robots, canonical and alternates, Open Graph and Twitter tags; JSON-LD for the site, events, breadcrumbs, and profiles; `robots.txt`; the sitemap; the web app manifest.

## Interface

### Signatures

```pudu
export type Meta
export fn meta, head, website, event, breadcrumbs, robots, sitemap, manifest
```

### Linkage

- **Requires:** `Std.Html.Build`, [[src/View/Frame]], [[src/I18n/Translate]], Domain types.
- **Consumed by:** Web handlers and other views.

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

## Parrot install identity
Manifest icon and social image paths use shared asset version20 to refresh installed branding. Grill: purpose and icon sizes stay unchanged; resolved.
