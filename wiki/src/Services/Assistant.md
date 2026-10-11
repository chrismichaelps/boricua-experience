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
