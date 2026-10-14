---
type: module
path: "@root/public/assets/js/features/buildCheck.js"
fidelity: Active
tags: [module, public, release]
---

# BuildCheck

## Purpose and interface
`buildCheck(doc, view)` tells a long-open tab that a newer build is live. `differs(current, live)` compares two release fingerprints.

## Algorithm
Reads `meta[name=build]`; when it is a release fingerprint, fetches `/build.json` (`no-store`, no credentials) when the tab becomes visible and every 30 minutes, at most every 5 minutes. A different well-formed fingerprint shows one `role=status` notice with the page's localized text and a Refresh button that reloads.

## Negative logic and edge cases
Development pages, malformed answers, hidden tabs, network failures and a missing file stay silent; the notice appears once.

## Referenced by
[[src/_MOC]] · [[src/Public/BrowserMain]] · [[src/Test/BuildCheck]] · [[src/Infrastructure/ReleaseIdentity]]
