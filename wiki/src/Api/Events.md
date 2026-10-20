---
type: module
path: "@root/src/Api/Events.pudu"
fidelity: Active
grammar: "[[grammar/pudu]]"
layer: Api
depth_status: MEDIUM
tags: [module, api, medium]
---

# Api.Events

> /** @Api.Events.Client — event listings, pages, and publishing */

## Purpose

Search, recommendations, nearby, detail, attendees, organizer listings, publishing, editing, cancelling, view counting, and sitemap rows.

## Interface

### Signatures

```pudu
export type SearchArgs = { query, category, municipality, from, to, maxPriceCents, lat, lng, radiusM, sort, limit, after }
export type SitemapEntry = { slug: Str, updatedAt: Str }
export fn search(gateway, args: &SearchArgs, token: Option[Str]) -> Result[Event.Page, Problem.Problem]
export fn recommended(gateway, lat, lng, limit, token) -> Result[Array[Event.Card], Problem.Problem]
export fn near(gateway, lat: Float64, lng: Float64, radiusM: Int, limit: Int) -> Result[Event.Page, Problem.Problem]
export fn detail(gateway, slug: Str, token: Option[Str]) -> Result[Event.Detail, Problem.Problem]
export fn attendees(gateway, eventId: Str, limit: Int, token: Option[Str]) -> Result[Event.Attendees, Problem.Problem]
export fn mine(gateway, token: Str) -> Result[Array[Event.Card], Problem.Problem]
export fn create(gateway, ready: &Draft.Ready, token: Str) -> Result[Draft.Published, Problem.Problem]
export fn update(gateway, eventId: Str, ready: &Draft.Ready, token: Str) -> Result[Draft.Published, Problem.Problem]
export fn cancel(gateway, eventId: Str, token: Str) -> Result[(), Problem.Problem]
export fn recordView(gateway, eventId: Str) -> Result[(), Problem.Problem]
export fn sitemap(gateway, limit: Int) -> Result[Array[SitemapEntry], Problem.Problem]
```

### Linkage

- **Requires:** [[src/Api/Supabase/Gateway]], [[src/Domain/Event]], [[src/Domain/Draft]].
- **Consumed by:** [[src/Services/Discovery]], [[src/Services/Events]], [[src/Services/Seo]].

## Algorithm

Each function names its database function and arguments; empty filters are sent as `null`.

## Negative Logic (Prohibited Paths)

- ❌ No business rule: authorization and limits are the database's.
- ❌ No logging of arguments or tokens.

## Edge Cases

- A detail the viewer may not see answers `Missing`.

## Depth

MEDIUM: one typed function per database function; the argument names and decoding stay here.

## Grill Log

- **Q:** Search arguments as a record?
  **A:** Yes: twelve named fields read flat at the call site; positional arguments would invite swaps.

## Referenced by

[[src/_MOC]]

## Native / spatial follow-up Grill Log

- **Q:** What is the resolved mobile and scaling contract?
  **A:** Add inView calling map_events with filtered dates, text, price, category/town and validated bounds; decode the same bounded Event.Page. Existing search calls unchanged. Resolved.

## Reviewed refinement
Map results preserve the server limited flag and show a bilingual zoom-in notice. Reaction forms lock their shared group; horizontal handle drags suppress the ensuing click. Existing public coordinate visibility remains unchanged. Grill Log: reviewed edge contracts resolved.

## Unknown publication facts Grill Log · #51
Resolved: missing price is null/None and never free; explicit zero is free. Missing end is null/None. Start stays required and finite. discovery_until is a separate generated cutoff: known end, otherwise exactly24 elapsed hours after start; it is never a displayed/exported end or proof that an event is ongoing. Existing known dates retain after-start/14-day validation. Unknown-end expiration is labeled archived; recurrence uses independent dated records. API arguments and assistant projections preserve null; exports omit unknown end/offer. Tests cover boundaries and bilingual output.

## Quick-filter continuation Grill Log
Resolved: preserve canonical known traits through chips, forms, map/list, pagination and saved search. Combine traits by AND; Near me retains other filters. Family requires a stated minimum age at most12; unknown age is not a suitability claim. Step-free access is organizer-confirmed, not audited certification. Optional facts survive validation/editing and atomic database writes; legacy callers preserve existing facts. No app deployment.

## Cover completion Grill Log · #155 — resolved
Reject unknown theme values before publishing. Successful listing saves carry an explicit coverSaved outcome; a subsequent theme failure keeps the saved listing and redirects once with a bilingual warning to retry through editing, never a duplicate publish. Theme updates lock the owned parent before reading its cover so a concurrent confirmed photograph cannot be overwritten. Theme/default artwork is illustration, never a gallery photograph. The fieldset retains keyboard radio semantics, selected state, linked validation errors and all category-switch draft state. Local artwork is asset-versioned; uploaded photographs remain authoritative.
