---
type: module
fidelity: Active
grammar: "[[grammar/browser]]"
---
# Passwords

## Purpose
Password controls are progressive enhancement. Toggle text/password, preserve autocomplete/value/focus, announce show/hide via aria-pressed and localized names. Local length guidance is not an entropy estimate; no network or logging receives passwords. New-password guidance excludes confirmation and respects existing provider limits.

## Interface
Exported initialization plus pure local helpers where needed.

## Algorithm
Delegated document lifecycle with idempotent initialization and explicit completion/restoration.

## Negative Logic
No secrets, hidden requests, tracking, fake strength guarantees, disabled successful form controls or authentication bypass.

## Edge Cases
No JavaScript, invalid/canceled submit, duplicate clicks, BFCache return, modified clicks, keyboard navigation, reduced motion and both locales.

## Grill Log
Resolved: Password controls are progressive enhancement. Toggle text/password, preserve autocomplete/value/focus, announce show/hide via aria-pressed and localized names. Local length guidance is not an entropy estimate; no network or logging receives passwords. New-password guidance excludes confirmation and respects existing provider limits.

## Referenced by
[[src/Public/BrowserMain]] · [[handoffs/homepage-refresh]]

Confirmation sets localized native validity on both fields’ input events; server validation remains authoritative when enhancement is absent. Resolved.
