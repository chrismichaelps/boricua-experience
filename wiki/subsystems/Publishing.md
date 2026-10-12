---
type: subsystem
tags: [subsystem]
---

# Publishing

One form creates and edits an event: title, summary, description, instructions, category,
municipality, venue, address, a map pin, start and end, visibility, join policy, capacity, price.
The form is validated on the server ([[src/Validation/EventForm]]) and again by the database.

## Referenced by

[[subsystems/_MOC]] · [[domain/Event]]

## Places and category profiles
Publishing starts at `/create` with a category chooser. Each category offers the kinds it takes (activity, place, or both), its default first. A place's form is rendered from the category's profile ([[decisions/ADR-0010-category-profiles-and-places]]): only that category's facts are asked, and changing the category reloads the form for the new profile while keeping the shared fields. The database refuses facts outside the profile, so the form and a direct API call obey the same rules.
