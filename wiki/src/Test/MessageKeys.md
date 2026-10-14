---
type: module
path: "@root/scripts/message-keys.sh"
fidelity: Active
tags: [module, test, translations]
---
# MessageKeys
## Purpose and interface
Regenerate the public translation-key fixture from literal references and declared dynamic families; run bash scripts/message-keys.sh.
## Algorithm
Extract source literals and dynamic catalog, policy, assistant, menu, media and calendar families, then sort/deduplicate. Translation tests verify all listed keys exist in both languages.
## Negative logic and edge cases
No database values, secrets or private inputs. Runtime-composed keys must not be omitted merely because source names their suffixes.
## Grill Log
Resolved: include calendar dictionary keys alongside existing runtime families so month/year and shared calendar labels survive fixture regeneration and bilingual coverage.
## Referenced by
[[src/_MOC]] · [[src/I18n/Translate]]

## Build family
The key scan includes `build.*`.

## Quick-filter continuation Grill Log
Resolved: preserve canonical known traits through chips, forms, map/list, pagination and saved search. Combine traits by AND; Near me retains other filters. Family requires a stated minimum age at most12; unknown age is not a suitability claim. Step-free access is organizer-confirmed, not audited certification. Optional facts survive validation/editing and atomic database writes; legacy callers preserve existing facts. No app deployment.

## Assistant plan labels
Resolved: runtime assistant dataset labels and new prompt families from EsPlan are included in the fixture scan.

## Reviewed visitor release guards · #107
Resolved: translated titles from the database are retained in map refreshes, plan/trip labels and assistant sources, with original-language fallback. Multiday spans cannot establish daily opening hours, so timed planning excludes spans24h or longer. Missing precipitation remains unknown. Each actual provider request (live chat or background translation) reserves an atomic shared UTC day/minute budget; dev10/day4/min and prod40/day16/min partition the account free allowance. No prompts/keys are stored in counters, and only the signed member bridge or private job can reserve. Focused ingestion, cancellation, concurrency and rendering regressions precede release.
