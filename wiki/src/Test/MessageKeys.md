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
