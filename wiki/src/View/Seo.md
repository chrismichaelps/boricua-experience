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

## Curated publication Grill Log · #42
Resolved: Curated event structured data omits offers/availability and person-organizer claims because Boricua cannot confirm external stock or represent the publisher as the producer.

## Resolved feedback Grill Log · #45
Resolve absolute external event images correctly. Do not advertise Spanish alternate content at an English cookie-selected URL; retain canonical/default. Public routes remain indexable and auth/private pages remain excluded. Resolved.

## Unknown publication facts Grill Log · #51
Resolved: missing price is null/None and never free; explicit zero is free. Missing end is null/None. Start stays required and finite. discovery_until is a separate generated cutoff: known end, otherwise exactly24 elapsed hours after start; it is never a displayed/exported end or proof that an event is ongoing. Existing known dates retain after-start/14-day validation. Unknown-end expiration is labeled archived; recurrence uses independent dated records. API arguments and assistant projections preserve null; exports omit unknown end/offer. Tests cover boundaries and bilingual output.

## Crawler transfer Grill Log · #200
Resolved: exclude only `meta-externalagent` using its own robots group and `Disallow: /`. Terminate that group before the wildcard group so Google, Bing, social preview fetchers and user-triggered assistants retain existing public discovery. Robots is advisory; a separate narrowly matched edge rule controls actual origin traffic. Preserve the canonical sitemap and private-route exclusions.
