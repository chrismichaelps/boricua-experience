---
type: module
fidelity: Active
tags: [module, assistant]
---

# Services.Assistant

## Purpose
Live database context, quota reservation and authorized tools.

## Interface
tools()->Array[Json]; execute(runtime,name,args,known)->Result[(Json,Array[Card]),Problem]; prepare(runtime,session,input,locale)->Result[Json,Problem]; runTool(runtime,session,Tool)->Result[Json,Problem].

## Algorithm
prepare validates/config-checks before service-only quota, then loads actual town/category catalog and returns server prompt/history/tools/locale. search_activities validates catalogslugs, filters current public results through anonymous RPC and limit6; detail/organizer require a previously searched slug and public visibility. my_preferences uses current-member token and returns only home town/language/notification preferences. Toolargs≤1200, names≤64, known≤12. Publicdescription≤1600, visibleorganizerbio≤600. Successful searched/verified marker authorizes grounded output.

## Negative Logic
No user-chosen table, SQL, provider/model or service-role arbitrary reads. Dependency failures are normalized at Web boundary. Personal preferences only for requested personal context.

## Edge Cases
Invalidslugs, missingconfig, exceededquota, emptyresults, hiddenorganizer, expired/public activity.

## Depth
Bounded subsystem boundary.

## Grill Log
Resolved: All activity facts come from database. Known-source IDs stay in signed server bridge. Node limits provider loop; server prompt demands neutral Markdown and supplied AST schedules without internal jargon.

## Referenced by
[[src/_MOC]] · [[handoffs/assistant]]

## Bilingual tooling Grill Log
Resolved: browse_catalog reads live town/category reference data, filters a short query and returns at most24 rows with a truncation flag. Tool locale is validated; all source cards select the matching database category language. No migration or new unrestricted table access is needed.

## Curated boundary Grill Log · #42
Resolved: Curated organizer_details returns a publisher with role curator and no organizer or hosted/member statistics. Native public organizer details retain their existing projection. The prompt distinguishes publication from production and treats external availability as unknown.

## Unknown facts Grill Log · #51
Resolved: system instruction distinguishes null price/end from free/known dates.24-hour discovery policy must not be narrated as actual duration.

## Grounded chat plans · #103 · Resolved Grill Log
Provider control tags are quarantined across chunk boundaries and retried within the existing budget, never displayed or executed as prose. Structured allowlisted calls remain authoritative. Public quick traits, places, itineraries and route results use typed database reads. Public map cards show supplied anchors and road geometry, explicitly label estimated travel and missing paths, and release maps on close/reset. No model coordinates, arbitrary SQL, fake data or paid fallback. Town routing is service-only, catalog-bounded, cached by directed town pair and transactionally locked; no per-user position is sent or stored. Every changed schema is verified in both environments.
