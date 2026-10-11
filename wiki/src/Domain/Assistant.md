---
type: module
fidelity: Active
tags: [module, assistant]
---

# Domain.Assistant

## Purpose
Conversation validation and minimal public activity projection.

## Interface
Turn{role,content} derivesDecode/Encode; Input{message,history=[]}; Tool{name,args:Json,known:Array[Str]} deriveDecode. valid(&Input)->Bool; source(&Event.Card)->Json.

## Algorithm
Message nonblank≤1200, history≤6, rolesuser/assistant only, eachcontent≤1200. source includes localhref/slug,title,summary≤600,town,category,starts_at,ends_at,price_cents,join_policy,spots_left.

## Negative Logic
No accountID/email, coordinates, attendee names, organizer relations or client tool/system messages.

## Edge Cases
Empty history, malformed tool arguments, full/unlimited capacity.

## Depth
Bounded subsystem boundary.

## Grill Log
Resolved: The model receives only authorized projections; accepting a tool name never permits arbitrary SQL.

## Referenced by
[[src/_MOC]] · [[handoffs/assistant]]

Public source image uses coverUrl from the database, or existing category-slug-derived cover fallback. No model-selected image or hardcoded event record.

## Bilingual tooling Grill Log
Resolved: Localized source projection selects database category nameEn/nameEs. Internal Tool carries validated es/en locale; the compatibility source function defaults to Spanish.
