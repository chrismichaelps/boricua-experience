---
type: module
fidelity: Active
tags: [module, test]
---

# Presentation

## Purpose

Pure rendered-output regressions: home versus failure headers, bilingual search, retained category/town map filters and pagination, escaped values, assets and cotorra branding.

## Interface

Run with `pudu test test` and `node scripts/service-worker-test.mjs`.

## Algorithm

Use in-memory fixtures and deterministic assertions. No database mutations or secrets.

## Negative Logic

Never treat a passing mock as proof of OAuth, publishing or location permissions on a real device.

## Edge Cases

Failed homepage, translated controls, quotes in user input, worker upgrades while signed in, offline requests.

## Depth

MEDIUM: checks public output and cache effects.

## Grill Log

- **Q:** How is motion added without making basic flows fragile?
  **A:** Local pinned Motion 14.1.0 loads through an optional feature. Page/card entry, button feedback and picker transitions respect reduced motion and settle on page hide. No CSS hides content before enhancement. Picker exit has a bounded fallback and never delays filter submission. Authentication retains email/password contracts; curved cotorra and official Google assets remain local.

- **Q:** How do the app-style search controls preserve filtering?
  **A:** Native named selects remain the submission source and no-script fallback. Progressive picker dialogs expose a searchable municipality list and existing date windows with translated labels, keyboard dismissal and focus restoration. Pill submission retains category, free, sort and coordinates. Version 7 refreshes entry/styles; unchanged carousel modules keep their version 3 imports.

- **Q:** What protects the new footer navigation?
  **A:** Rendered-output assertions check working filtered discovery, town, recovery and cookie-preference destinations, bilingual labels, real-photo references and photography credits.

- **Q:** Why add tests to a style refresh?
  **A:** The document section and offline caching changed behaviour; regressions could hide navigation or retain member data. Test outcomes across boundaries.

## Referenced by

[[src/_MOC]] · [[handoffs/homepage-refresh]]

Regenerate test/Fixtures/message-keys.txt with scripts/message-keys.sh after removing footer.imagery and adding footer.photography/map.sheet_toggle. Map output asserts an accessible controlled sheet button; documentary-photo migration asserts no obsolete AI notice.

## Resolved follow-up Grill Log

- **Q:** How is duplicate auth branding prevented? **A:** Render sign-in/register and assert the form shell has no auth-brand markup while the header retains the brand; photo markup remains present. Resolved.

## Parrot/privacy continuation
Use original cotorra puertorriqueña SVG assets and optional Motion privacy disclosure without changing native checkbox submission. Grill: local assets and progressive enhancement preserve behavior; resolved.

## Brand upgrade validation
Use the declared runtime/cache asset version rather than stale fixture versions. Grill: output and old-cache cleanup assertions still verify the same public boundary; resolved.

## Mobile/content correction Grill Log

- **Q:** What is the resolved contract? **A:** Fixture-only scenes prove catalog-driven rendering, empty carousel safety, bilingual escaping and consent/reset session tokens. Resolved.

## Expired activity output Grill Log
Resolved: fixture renders a published card exactly at its end; it has the ended message and no remaining-seat claim. Organizer activity output has no pending-request action once ended; the event detail link stays reachable. Database expiry verification uses development-only transaction rollback fixtures for past/boundary/future and pending closure.

Language-switch regression renders a token-bearing frame and checks both desktop and menu forms contain the same session token; guest and bilingual output remain covered.
