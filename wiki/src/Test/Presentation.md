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

## Map lifecycle regression Grill Log
Resolved: bounded acquisition and writes, immediate stop plus late-update cleanup, stop/restart barrier, separate control subscriptions, no automatic sharing restoration and map-only assistant omission.

## Discovery photo and footer Grill Log
Resolved: open search uses the first database-ordered featured scene, a local responsive real photograph and unchanged named filters. Category/town landing behavior stays intact. Empty scene catalogs render usable search without a broken image. Footer has current-year copyright, quiet grouped links and phone touch targets; eligibility policy is unchanged. Photograph source, CC BY2.0 attribution, resizing and crop are recorded in public credits and THIRD_PARTY_NOTICES.

Deleted-session JSON output Grill: assert401, secure expired sessioncookie and unchanged503 dependency response. Resolved.

## Policy key fixture Grill Log · #39
Resolved: regenerate used-message key fixture after replacing legal.version with legal.effective; translation parity remains enforced in both languages.

## Curated publication regression Grill Log · #42
Resolved: Curated cards/detail and activity output label the official source, omit local participation/request management and reject unsafe/missing booking URLs. Ended/canceled curated listings omit booking actions; native organizer management stays available. SEO omits curated capacity/availability claims. Administrator badges derive from decoded trusted profiles and translate in both languages.

## Resolved feedback Grill Log · #45
Add output regressions for confirmation, accessible password controls, noindex signup,404 h1 and absolute event-image URLs. Resolved.

## Unknown event facts Grill Log · #51
Resolved: nullable prices/end retain explicit unknown state; known free/paid and dates regressions stay covered. No1970 null-date coercion. Unknown schedule24-hour discovery cutoff is separate from actual end. Boundary, malformed input, bilingual output and provider projections need focused tests.

## Menu reader Grill Log · #69
Resolved: Render dedicated menus and parent-page links from fictional fixtures; verify escaping, translated unknown/free/paid labels, unavailable state, owner-only status labels and noindex/empty behavior.

## Activity covers Grill Log · #82
Resolved: integrate all-category organizer covers with existing upload presentation and guarded mediator routes. Removal binds the route event; confirmation is server-only after reserved-file verification. Preserve existing place/menu behavior and shared limits.

Resolved: source-provided current covers must not be described as category illustrations.

## Home-only assistant Grill Log · #86
Resolved: Assert assistant presence only in the root Explore shell, including Spanish/English guests and signed-in rendering; absence on search, category/town, auth/account, detail, publishing, map and root error shell.

## Discovery surfaces Grill Log · #88
Resolved: Assert map lacks accessibility launcher but other sections retain it; map expansion/status labels and home skeleton/shared nearby enhancement render correctly in both locales.

## Unified form controls Grill Log · #88
Resolved: enhance canonical native selects through the shared dialog, retaining disabled options, validation, reset and category change events. Add single-date calendar mode with past-date and declared min/max support; date-time edits preserve the existing clock value. Birth dates permit historical year/month navigation; month-only reviews and opening-hour clocks keep native semantics with shared neutral styling. Checkboxes/radios/switches retain names and keyboard/disabled behavior. No new database contract or date inference.

## Renewal and age cap
Asserts the sign-up birth date declares the adult cap, and the renewal page posts to `/terms/accept` with both checkboxes, both document links, the return path and a sign-out form.

## Build meta
Asserts every page carries the build meta, the update texts, and the footer link to `/version`.

## Quick-filter continuation Grill Log
Resolved: preserve canonical known traits through chips, forms, map/list, pagination and saved search. Combine traits by AND; Near me retains other filters. Family requires a stated minimum age at most12; unknown age is not a suitability claim. Step-free access is organizer-confirmed, not audited certification. Optional facts survive validation/editing and atomic database writes; legacy callers preserve existing facts. No app deployment.

## Reviewed visitor release guards · #107
Resolved: translated titles from the database are retained in map refreshes, plan/trip labels and assistant sources, with original-language fallback. Multiday spans cannot establish daily opening hours, so timed planning excludes spans24h or longer. Missing precipitation remains unknown. Each actual provider request (live chat or background translation) reserves an atomic shared UTC day/minute budget; dev10/day4/min and prod40/day16/min partition the account free allowance. No prompts/keys are stored in counters, and only the signed member bridge or private job can reserve. Focused ingestion, cancellation, concurrency and rendering regressions precede release.


## Permanent place discovery Grill Log · #120
Resolved: publish source-reviewed branches as permanent places, never dated or free activities. Shopping is a database catalogue category with a store-type profile; fast food is an explicit cuisine option. The public map_places RPC validates and clamps bounds, filters indexed geography before a bounded nearest-first limit, excludes unpublished places, and returns a limited flag. Activity date/price/trait filters exclude places rather than invent facts. Typed place projections retain a distinct kind and place route. Icons use the app category geometry, with branch names as labels; no third-party brand artwork or hover popup. Existing clustering, cancellation, camera and sharing behavior remain unchanged. Unknown facts stay unknown. Source data and SQL remain ignored; apply matching schema changes to both environments, real imports only to production.

## Business identity refinement Grill Log · #120
Resolved user refinement: a nullable map_icon_url comes from the database public place projection and holds official business artwork for identification. A missing or failed image falls back once to the category icon. Keep the circular44px button, accessible branch/category label, map positioning and selection contract. No category/brand slug guessing in browser logic. Branded marks do not establish verified ownership or affiliation; provenance remains recorded.

## Complete discovery pages · #124
Resolved: render place Results with a continuation, assert independent escaped cursor/filter links, a real place-card grid and no false activity-empty notice. Test progressive double-click locking separately. Database rollback tests cover all sort paths beyond300rows and malformed/wrong-scope cursors.

## Place discovery Grill Log · #132
Resolved: Cover real vs absent photos, gallery dialog controls, escaped bilingual labels and content, highlight counts and negative ratings, independent pagination links and empty-state omission.
Browser lifecycle harness: scripts/place-gallery-test.mjs executes the actual module with seven photographs and exercises next/previous wrapping, modified clicks/keys, native Escape ownership, close/pagehide/reopen, focus/overflow restoration, single-photo and unsupported-dialog fallbacks. Private browser fixtures never enter source, storage or production.

## Visitor guide and guest intent Grill Log · #148 — resolved
Current presentation assertions cover mainland/island guides, climate provenance/category links, independent review star/companion filter links and filtered-empty reset, surrounding place/activity cards and self-exclusion, visible town ranks, ranked first-page versus continuation/single-card omission, activity-before-place order, and guest resume links/banner suppression/like actions/auth encoding. Existing checks preserve shared nearby picker markup. These are pure rendered-output tests, not a claim of end-to-end OAuth or database verification.


## Search favicon Grill Log · #167 — resolved
Google Search receives stable supported raster favicon URLs, independent of application asset revisions. The ICO directory contains16,32,48,96,192 and256px square PNG entries and its declared sizes match those bytes; the existing192px PNG is the primary large raster. Prefer raster candidates in rel=icon discovery, retaining the official vector and all install assets unchanged. Root ICO remains revalidated after24h. Crawler requests must return images and remain allowed by robots. Google indexing timing and display are external, never an immediate acceptance claim. Rendered shell and binary regressions check both halves of the contract.


## Unknown admission placement · #171 — resolved Grill Log
Unknown admission remains explicit bilingual text but belongs in ordinary card metadata, not an image overlay that wraps over narrow map thumbnails. Only actual known amounts, including explicit zero/free, use the compact photo badge. Preserve category/photo images, source attribution, dates, navigation and accessibility text. Shared server-rendered markup covers initial and refreshed map cards as well as rails/grids/organizer lists; no CSS or database contract changes. Rendered regressions distinguish None from Some(0) and positive amounts.


## Source image semantics · #185 — resolved Grill Log
Listing galleries may contain source photographs, event artwork or official identifiers. Use neutral bilingual image labels, without presenting brand artwork as a photograph of a branch. Preserve upload controls and category-illustration fallbacks.

## Review gallery · #191 — resolved Grill Log
The inspected reference pairs a contained image with an independent context column. Render existing visible place reviews on the left at desktop widths, below the image on phones; explicitly title these as reviews of the place, not attributed to the selected photo. Use only published highlights, capped at six regardless of cursor/filter, preserve all ratings and escape content. No data import, fabricated reviews or schema change. Empty reviews show a truthful invitation. Native modal keeps background inert, exact scroll/focus restoration and Escape; thumbnails, arrows, keyboard and touch navigation keep the selected image/count/current thumbnail synchronized. Single-photo controls hide, links retain no-script/modifier behavior. Large photos stay uncropped; no autofocus moves on image changes. Review links close before navigating to their existing full-review anchor.
