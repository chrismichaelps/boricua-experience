---
type: module
fidelity: Active
layer: Database
tags: [module, database, visitors]
---

# Database.VisitorFacts

## Islands and ferries
Private migration `20261014200200_islands`. Plans near a visitor stay on the land they start from (main
island, Vieques or Culebra). A shared plan that crosses water marks the crossing as a ferry from Ceiba,
planned at about two hours, never as a drive; the plan and trip pages say to check the ferry schedule,
and the assistant never offers a road route between islands.

## Tolls
Private migration `20261014200300_route_tolls`. Each way to a stop records whether it takes an
expressway (most are toll roads); the trip page tags it and notes that tolls may apply.

## Parking and cash
Private migration `20261014200400_practical_facts`. Organizers may say whether there is parking and
whether payment is cash only; unsaid stays unknown and is never shown as "no". An app that does not send
these facts keeps the saved ones. Activity pages, trip stops and the assistant show them.

## English for visitors
Private migration `20261014200500_activity_translations`. Spanish listings get an automatic English
title and summary, once per listing (again only when the organizer edits them), in the background with the
free model with at most15 translations a day, most popular upcoming first. Each request also consumes the environment's atomic provider allowance, shared with chat; see [[src/Database/ProviderBudget]].
The listing is passed as data and only a short title and summary are kept. English pages show the title
on cards and a labelled summary on the activity page. The model key is kept in the database vault.

## Units
English pages show miles; Spanish pages kilometres. Temperatures are in °F, as on the island.

## Referenced by
[[src/_MOC]] · [[src/View/Pages/Trip]]

## Reviewed visitor release guards · #107
Resolved: translated titles from the database are retained in map refreshes, plan/trip labels and assistant sources, with original-language fallback. Multiday spans cannot establish daily opening hours, so timed planning excludes spans24h or longer. Missing precipitation remains unknown. Each actual provider request (live chat or background translation) reserves an atomic shared UTC day/minute budget; dev10/day4/min and prod40/day16/min partition the account free allowance. No prompts/keys are stored in counters, and only the signed member bridge or private job can reserve. Focused ingestion, cancellation, concurrency and rendering regressions precede release.
