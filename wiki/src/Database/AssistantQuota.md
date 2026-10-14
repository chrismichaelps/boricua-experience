---
type: module
fidelity: Active
layer: Database
tags: [module, assistant]
---

# Database.AssistantQuota

## Purpose
How many assistant answers a member and the whole site may start, decided in one short step per
question, with limits the team can change without a deploy.

## Interface
`assistant_reserve(member)` (server only) answers whether an answer may start and, when not, why:
the member's minute, the member's day, the shared minute (`busy`) or the shared day (`daily`), with the
seconds until a retry can succeed. `reserve_assistant_request(member)` stays as a yes/no wrapper for the
app version still running during a release. The app shows a different message for each reason.

## Algorithm
Private migration `20261014180000_assistant_limits`.
- The limits live in one settings row (enabled, per member per minute and per day, shared per minute
  and per day). Raising the shared budget when the model allowance grows is one update.
- Each member has one counter row per Puerto Rico day, so members never wait on one another; the shared
  budget is one row per day changed by a single conditional update, so a request only waits on a row
  for the length of that statement. There is no site-wide lock.
- When the shared budget refuses, the member's reservation is given back.
- Refusals are counted per day by reason, so the team can see when the shared budget is too small.
- A daily job deletes member counters older than two days and shared rows older than 90 days.
- No question, answer or location is stored: only counts.

## Negative Logic
No client grant; inactive or unfinished accounts are refused; no paid model fallback.

## Grill Log
- **Q:** Why not keep the global lock? **A:** It made every question on the site wait for every other,
  and the limits were fixed in code. Row-level updates give the same guarantees per row. Resolved.
- **Q:** Why keep a shared budget at all? **A:** The free model allowance is shared by the whole site;
  the budget keeps one busy hour from exhausting the day. Its size is now a setting. Resolved.

## Referenced by
[[src/_MOC]] · [[handoffs/assistant]]
