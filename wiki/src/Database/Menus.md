---
type: module
fidelity: Active
tags: [module, database, menus]
---
# Database.Menus

## Purpose
Normalized owner-managed menus for category-capable permanent places. No restaurant records or prices are inferred.

## Interface
`app.category_capabilities`, `place_menus`, `menu_sections` and `menu_items`.
`public.place_menu(place_id)` returns published menus to guests and all menus to the active owner.
`public.save_place_menu(place_id, document, expected_revision, menu_id=null)` atomically saves a complete bounded menu and returns stable IDs and its new revision.
New menus require revision0; edits require the current revision. Supplied status and locale must be strings; absence supplies defaults. Prices are nullable USD cents; explicit0 is free. Ordered sections and items retain IDs when edited or moved within one menu. Omitted children are deleted by the owner's explicit full-document save, not accumulated as inaccessible history.

## Algorithm
Lock quota admission per member, then the place, then the menu. Require an active onboarded owner and database category capability. Validate bounded JSON shapes, strings, status, sections, items, prices and owner-declared dietary/allergen labels; refuse unknown keys. Permit at most3menus per place,12sections per menu,100items per menu and20saves per member in a rolling day. Preserve existing item IDs, refuse foreign-menu references and duplicate IDs, and generate new IDs in the database. An update increments revision once. Published menus require at least one listed item; availability can remain unknown. Public reads exclude drafts, archived menus, hidden or removed places, paused owners and categories that no longer support menus. Existing owners can archive a menu after a category switch.

## Negative Logic
No direct table privileges for API roles, arbitrary file URLs, inferred ingredients, document-to-item inference, booking claims or changes to existing events and reviews. Allergen and dietary information is owner-declared and does not establish cross-contact safety.

## Edge Cases
Concurrent edits and cross-place quota races; reused, duplicate or foreign-menu IDs; unknown/free/paid prices; unknown availability; empty drafts and published-empty refusal; hidden/removed parents; category changes; paused owners; malformed JSON and supplied null status/locale. Deletion of menu children must later invalidate associated private media access and queue object cleanup before introducing uploads.

## Grill Log
Resolved: behavior-specific data belongs in normalized tables rather than category-details JSON. Member-wide quota admission precedes resource locks. Revisions prevent stale saves. Omitted child rows are removed, while referenced active IDs remain stable; future media manifests preserve cleanup keys when a target disappears. Private SQL remains ignored and this vault documents the shareable contract. Existing external food-menu URLs stay readable. Apply both projects after rollback, permission and race tests plus independent review. Frontend/media integration continues under issue69.

## Referenced by
[[src/_MOC]] · [[decisions/ADR-0010-category-profiles-and-places]] · [[handoffs/product-strategy]]
