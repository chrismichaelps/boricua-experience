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
