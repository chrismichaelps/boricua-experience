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
free model under a budget of 15 a day shared with the assistant's allowance, most popular upcoming first.
The listing is passed as data and only a short title and summary are kept. English pages show the title
on cards and a labelled summary on the activity page. The model key is kept in the database vault.

## Units
English pages show miles; Spanish pages kilometres. Temperatures are in °F, as on the island.

## Referenced by
[[src/_MOC]] · [[src/View/Pages/Trip]]
