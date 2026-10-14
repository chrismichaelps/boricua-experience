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
