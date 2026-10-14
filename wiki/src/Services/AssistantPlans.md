---
type: module
fidelity: Active
tags: [module, assistant, plans]
---

# AssistantPlans

## Purpose and contract
Typed itinerary construction and public town/activity routing. Validate catalog slugs, options and previously returned public activity slugs; project server-owned map/plan JSON and never model geometry. Unknown duration remains planning assumption, not organizer fact.

## Grill Log
Resolved: bounded database-owned output, viewer privacy, free infrastructure, failure transparency and lifecycle tests required before delivery.

## Referenced by
[[src/_MOC]] · [[handoffs/assistant]]

## Reviewed visitor release guards · #107
Resolved: translated titles from the database are retained in map refreshes, plan/trip labels and assistant sources, with original-language fallback. Multiday spans cannot establish daily opening hours, so timed planning excludes spans24h or longer. Missing precipitation remains unknown. Each actual provider request (live chat or background translation) reserves an atomic shared UTC day/minute budget; dev10/day4/min and prod40/day16/min partition the account free allowance. No prompts/keys are stored in counters, and only the signed member bridge or private job can reserve. Focused ingestion, cancellation, concurrency and rendering regressions precede release.
