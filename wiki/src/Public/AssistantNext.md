---
type: module
fidelity: Active
tags: [module, assistant]
---

# AssistantNext

## Purpose and contract
Follow-up questions after every answer, worked out from what the answer actually found: two
activities suggest a plan with them and the way between them, any activities suggest asking which are
free or good with children, a place suggests what is near it, and a plan suggests another plan or a
free one. At most four, never the question just asked, never a message with an unfilled placeholder.
A chosen follow-up is sent as the member's next question, so the assistant answers it from live data.
No model call is spent on suggestions.

A plan the assistant draws offers "Start trip" ([[src/View/Pages/Trip]]); a search offers "See on the
map" with the same filters. "Use my location" sends the position with the next questions; the server
turns it into the nearest town and only that town reaches the model.

## Referenced by
[[src/_MOC]] · [[src/Public/Assistant]]
