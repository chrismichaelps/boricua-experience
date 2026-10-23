---
type: module
path: "@root/test/View/SeoCrawlTest.pudu"
fidelity: Active
---

# SeoCrawl tests

## Purpose and interface
`main` tests crawler group boundaries and canonical sitemap output from [[src/View/Seo]] without a network.

## Resolved Grill Log · #200
An explicit Meta exclusion must not propagate to wildcard crawlers or replace the existing private-route disallows. Parse groups rather than asserting one string fragment; ensure sitemap remains canonical and social preview tokens are never denied specifically.

## Referenced by
[[src/_MOC]]
