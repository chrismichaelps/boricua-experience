---
type: module
fidelity: Active
layer: Database
tags: [module, database, assistant]
---

# Provider request budget

## Purpose and interface
The private visitor-release-guards migration adds an atomic allowance for every actual OpenRouter request, shared by live chat and background translations. `reserve_assistant_provider()` is service-only and checks the service role; `private.reserve_provider_request()` is not executable by guests or members. The signed assistant bridge reserves before each provider attempt, including retries.

## Algorithm and limits
One UTC-day row stores day and minute counters. Conditional row updates admit at most the configured limits under concurrency; minute advances never roll backwards. Development allocates10/day and4/min; production40/day and16/min. Combined allocations are50/day and20/min. Closed RLS and revoked grants keep counters/settings inaccessible to members. Translations additionally lock their existing15/day row. No prompts, positions, user identifiers or credentials enter these counters. Old counters expire after90 days using the real clock.

## Failure and edge cases
Zero caps, null clock, day exhaustion and minute exhaustion refuse reservations. A failed provider attempt still spends a request. The private clock parameter permits rolled-back boundary tests; public callers cannot override time. The provider account's own limits remain authoritative for traffic from unrelated applications. No paid fallback or quota reset is introduced.

## Resolved Grill Log
The row lock plus conditional update prevents concurrent overspending; the8-request development concurrency test admitted exactly1 request into1 remaining slot. Environment allocations deliberately differ, while function definitions and ACLs match. The launch counter conservatively accounts for earlier requests rather than resetting the day's allowance. Unknown rain and unsupported overnight scheduling are separate data-truth guards in the same reviewed migration.

## Referenced by
[[src/Database/VisitorFacts]] · [[src/Database/Weather]] · [[src/Web/Handlers/Assistant]] · [[src/Public/AssistantStream]] · [[src/_MOC]]
