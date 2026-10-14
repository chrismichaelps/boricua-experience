---
type: module
fidelity: Active
tags: [module, database]
---
# Database.Discovery
## Purpose
Private migration `discovery_preferences`: discovery radius and favourite towns, ranking with quality signals and near-duplicate removal, a popularity sort, preference-aware recommendations and saved searches.
## Interface
profiles.preferred_radius_km (5, 10, 25, 50 or null) and preferred_municipalities (at most five). `update_my_discovery(p_radius_km, p_towns)`; `my_profile` adds preferred_radius_km and preferred_towns (slugs, in chosen order). event_rankings.duplicate_of; `private.is_duplicate(id)`. `search_events` accepts p_sort `top`. app.saved_searches with `save_search(p_label, p_query)`, `delete_saved_search(p_id)`, `my_saved_searches()`; twenty per member, the same query renames.
## Algorithm
Score = previous engagement terms + 0.6 with a cover + 0.4 with a description of 140+ characters + up to 1 for publication in the last week + 0.5 when limited places are 60% filled − 1.5 per open report. A listing is a near duplicate when another ranked listing has the same folded title, the same town and starts within three hours with a better score (ties: earlier creation, then id); duplicates leave search and recommendations. Recommendations add 2.5 for a favourite town and, without a position, measure distance from the first favourite town or the home town.
## Negative Logic
Nothing is deleted: duplicates keep their pages and can still be reported. Saved queries are rebuilt by the server from parsed filters; their labels are written by the server.
## Edge Cases
A remembered browser choice for the nearby rail wins over profile preferences; the profile fills in only when the browser remembers none.
## Referenced by
[[src/_MOC]] · [[seams/DatabaseApi]]
