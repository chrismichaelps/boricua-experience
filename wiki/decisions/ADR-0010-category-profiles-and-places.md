---
type: adr
status: ACCEPTED
date: 2026-10-12
tags: [adr]
---

# ADR-0010 — Category profiles and permanent places

## Decision

Two kinds of listing share the catalogue of categories:

- an **activity** (`app.events`): dated, joinable, ends;
- a **place** (`app.places`): permanent — a restaurant, a beach, a trail, a lodging, a venue — with
  hours, contact, category facts, reviews and, for food, a menu.

An activity may name the place it happens at (`events.place_id`), so a venue is one row however many
activities it hosts.

Each category declares, per kind, the facts it asks for in `app.category_fields`: key, type
(`text`, `long_text`, `number`, `choice`, `flags`, `toggle`, `url`, `phone`), bilingual label and
hint, options with bilingual labels, bounds, whether it is required, and whether a card highlights
it. `list_categories` returns these profiles with the catalogue, which the server caches. The
publishing form, the detail page and the cards are rendered from the profile; facts are stored as a
JSON object (`details`) on the row.

The database is the authority: `private.check_details` refuses unknown keys, wrong types, values
outside the options or bounds and missing required facts, so a direct API call cannot store what the
form would refuse. The server validates the same profile first to name each refused field.

## Rationale

Sixteen categories with distinct facts as typed columns would mean sixteen tables or a very wide one,
and every new fact a migration across schema, API, server and views. A declarative profile keeps one
code path for forms, validation, display and search, lets a category gain facts with a data change,
and still refuses malformed data at the boundary. Places are a separate table because their life cycle
differs from activities: they do not expire, do not take join requests, and accumulate reviews.

## Consequences

- Category-specific behaviour that is more than facts (a structured menu, rooms, reviews) gets its own
  table keyed by place, not more JSON.
- Profiles must remain backward compatible: a removed key stays readable until no row uses it.
- Searching inside facts is limited to what is indexed (category, town, name, highlights).

## Referenced by

[[decisions/_MOC]]
