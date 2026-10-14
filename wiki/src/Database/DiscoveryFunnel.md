---
type: module
fidelity: Active
tags: [module, database, discovery]
---
# Database.DiscoveryFunnel
## Purpose
Private migration `discovery_funnel`: daily counts of activity-page views and join requests by the channel that led there, for the administrator's "discovery to requests" table.
## Interface
- `app.discovery_daily(day, channel, views, joins)`, with day in Puerto Rico time.
- `record_event_view(p_event_id, p_channel)` and `request_join(p_event_id, p_message, p_channel)`; the channel parameter is optional on both.
- `admin_discovery_funnel(p_days)` for administrators.
- [[src/Web/Channel]] classifies a visit from its referring address, or from `?from=` for assistant, share and notification links.
## Algorithm
- **Channels:** home, search, map, town, category, profile, another activity, my activity, notifications, assistant, share, external, direct, other.
- **Views:** only real page views are counted. A reload or the redirect after an action (same referring page) is not, and neither is a page shown again after a refusal.
- **Joins:** the join form carries the channel its page was reached from.
## Negative Logic
Aggregates only: no visitor, member, address or session is stored with a count, so the table cannot be traced to anyone. Unknown channels are ignored by both the server and the database.
## Referenced by
[[src/_MOC]] · [[seams/DatabaseApi]] · [[src/Database/Community]]
