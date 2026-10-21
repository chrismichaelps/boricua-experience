---
type: module
path: "@root/src/View/Pages/Map.pudu"
fidelity: Active
grammar: "[[grammar/pudu]]"
layer: View
depth_status: MEDIUM
tags: [module, view, medium]
---

# View.Pages.Map

> /** @View.Pages.Map.Explorer — the map of what is happening, with live location */

## Purpose

Full-screen map, near-me and live switches, the pin data as inline JSON, and the bottom sheet of cards.

## Interface

### Signatures

```pudu
export fn pinsValue(frame, cards) -> Json.Json
export fn render(frame, cards, startNear) -> Html.Html
```

### Linkage

- **Requires:** `Std.Html.Build`, [[src/View/Frame]], [[src/I18n/Translate]], Domain types.
- **Consumed by:** Web handlers and other views.

## Algorithm

Builds `Html` values with the trait chain; text from requests or the database goes through `says`, never `raw`.

## Negative Logic (Prohibited Paths)

- ❌ No service calls: a view renders what it is given.
- ❌ No inline scripts; behaviour attaches by `data-feature`.

## Edge Cases

- Every interactive control has a visible label or `aria-label`; touch targets are at least 44 px.

## Depth

MEDIUM.

## Grill Log

- **Q:** Templates or values?
  **A:** Values: a page is an `Html` tree, so escaping cannot be forgotten and pages are testable with fixtures.

## Location text
The visible location explanation was removed to keep the map clean. The live status and the location help remain as visually hidden text so screen readers still hear status changes and the buttons keep their description. The 3D turn group is rendered hidden and shown by the map script while 3D is on.

## Referenced by

[[src/_MOC]]

- **Q:** Why replace the decorative drag handle?
  **A:** A real labeled toggle exposes the sheet action to keyboard and screen-reader users, with expanded state and controlled list id.

Map root carries the translated cluster label template; JS fills its count without injecting HTML.

## Native / spatial follow-up Grill Log

- **Q:** What is the resolved mobile and scaling contract?
  **A:** Initial unfiltered map fits island bounds; filtered maps may fit matching pins. This prevents the first dense 60-result batch shrinking the camera to one town. Resolved.

## Reviewed refinement
Map results preserve the server limited flag and show a bilingual zoom-in notice. Reaction forms lock their shared group; horizontal handle drags suppress the ensuing click. Existing public coordinate visibility remains unchanged. Grill Log: reviewed edge contracts resolved.

## Explicit location lifecycle Grill Log
Resolved: nearby lookup stays private; initial acquisition uses the bounded accurate/balanced fallback. Fresh readings alone enable the sharing badge. No storage restores sharing; hiding or leaving stops it. Epochs reject stale callbacks and serialized writes prevent a late update undoing stop. Map controls expose purpose/status in both languages; the map omits the assistant.

## Unknown publication facts Grill Log · #51
Resolved: missing price is null/None and never free; explicit zero is free. Missing end is null/None. Start stays required and finite. discovery_until is a separate generated cutoff: known end, otherwise exactly24 elapsed hours after start; it is never a displayed/exported end or proof that an event is ongoing. Existing known dates retain after-start/14-day validation. Unknown-end expiration is labeled archived; recurrence uses independent dated records. API arguments and assistant projections preserve null; exports omit unknown end/offer. Tests cover boundaries and bilingual output.

## Moving nearby and 3D Grill Log · #78
Resolved: a 3D switch sits beside Near me; its label names the action for assistive technology and shortens to “3D” on narrow screens.

## Discovery surfaces Grill Log · #88
Resolved: Render a translated44px expand/close control, initially hidden until enhancement, and a hidden accessible three-dot loading status. Expansion preserves the existing map instance, filters and card sheet; no popups are added.

## Phone sheet
A `sheet-map-pill` button (map icon + `nav.map`) follows the sheet; phones show it only while the list is raised, and it lowers the list.

## Reviewed visitor release guards · #107
Resolved: translated titles from the database are retained in map refreshes, plan/trip labels and assistant sources, with original-language fallback. Multiday spans cannot establish daily opening hours, so timed planning excludes spans24h or longer. Missing precipitation remains unknown. Each actual provider request (live chat or background translation) reserves an atomic shared UTC day/minute budget; dev10/day4/min and prod40/day16/min partition the account free allowance. No prompts/keys are stored in counters, and only the signed member bridge or private job can reserve. Focused ingestion, cancellation, concurrency and rendering regressions precede release.


## Permanent place discovery Grill Log · #120
Resolved: publish source-reviewed branches as permanent places, never dated or free activities. Shopping is a database catalogue category with a store-type profile; fast food is an explicit cuisine option. The public map_places RPC validates and clamps bounds, filters indexed geography before a bounded nearest-first limit, excludes unpublished places, and returns a limited flag. Activity date/price/trait filters exclude places rather than invent facts. Typed place projections retain a distinct kind and place route. Icons use the app category geometry, with branch names as labels; the initial category-only decision is superseded below; no hover popup. Existing clustering, cancellation, camera and sharing behavior remain unchanged. Unknown facts stay unknown. Source data and SQL remain ignored; apply matching schema changes to both environments, real imports only to production.

## Business identity refinement Grill Log · #120
Resolved user refinement: a nullable map_icon_url comes from the database public place projection and holds official business artwork for identification. A missing or failed image falls back once to the category icon. Keep the circular44px button, accessible branch/category label, map positioning and selection contract. No category/brand slug guessing in browser logic. Branded marks do not establish verified ownership or affiliation; provenance remains recorded.

## Compact joystick refinement · #124
Resolved user sizing: discovery rotation is one44px circular compass, equal to the map buttons. Hide the former side buttons only on discovery; pointer drag rotates continuously, tap resets north, Left/Right keys step rotation and Home resets. Capture one primary pointer, ignore secondary pointers, cancel safely, suppress a drag's synthetic reset click and detach location-follow on explicit rotation. Existing trip controls remain unchanged. Localized label explains drag and north action. This supersedes the96px pad.


## Refreshed admission placement · #183 — resolved Grill Log
The browser rebuilds map cards after viewport changes independently of the server card component. Event pin JSON now includes nullable `price_cents`: null/absent means unknown, explicit zero means free. Only known event amounts and existing place category labels retain thumbnail pills; unknown event admission remains visible as ordinary `card-meta`/`card-admission` text beside the image. Do not infer price knowledge from translated text. Test actual redraws, both languages, zero and positive values, missing metadata, and permanent places.
