---
type: architecture
tags: [architecture]
---

# Language

| Term | Definition | Not |
| --- | --- | --- |
| Module | A unit with an interface and an implementation; here, one source file. | a folder |
| Interface | Everything a caller must know: types, failures, ordering, effects. | only the signature |
| Depth | Behavior a caller gets per unit of interface learned. | size |
| Seam | A boundary where behavior can vary without editing callers. | any import |
| Layer | A row of [[architecture/_MOC#Layers]]; imports point upward in that table only. | a folder name |
| Message | A typed request sent through the mediator; one per page or action. | an HTTP request |
| Problem | The failure value every service answers ([[src/Domain/Problem]]). | an exception |
| Card | The listing projection of an event: never an exact location. | the detail |
| Viewer | The visitor of a request: a guest or a member with a session. | the organizer |

## Referenced by

[[architecture/_MOC]]
