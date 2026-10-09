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
