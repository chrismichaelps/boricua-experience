---
type: subsystem
tags: [subsystem]
---

# Discovery

The front door. Home shows a search pill, category chips, recommendations, "this weekend", and
"near you" once a position is known. Search reads `q`, category, municipality, date window, price,
and sort, and pages by cursor. Municipality and category pages are search with one filter fixed, so
each has a canonical, indexable URL. The map shows the same results as pins.

Modules: [[src/Services/Discovery]], [[src/Api/Events]], [[src/View/Pages/Home]],
[[src/View/Pages/Search]], [[src/View/Pages/Map]].

## Referenced by

[[subsystems/_MOC]] · [[domain/Recommendation]]

## Nearby without location
A visitor names a town (`cerca`) and a radius (`radio`, one of 5, 10, 25 or 50 km); the listing is anchored at the town's centroid and sorted nearest first unless a sort was chosen. A device position always wins over a town. An unknown town or radius is dropped rather than refused. The last choice is kept in the preference cookie `bx_near` (`town:km`), cleared when the visitor chooses anywhere. The home page never reads that cookie itself: `/api/home/near` answers the rail privately and the browser inserts it, so the guest home page remains one cacheable document.

## One rail per event
`Services.Discovery.arrange` keeps each event in the first rail that shows it, in page order. Rails read twice what they show so that deduplication leaves them full. The near rail drops cards shown above it, and the rails below give up the cards it shows. Hidden gems are upcoming events with a known price, a named organizer or an official source, and at most three joins, saves and likes, least engaged first.
