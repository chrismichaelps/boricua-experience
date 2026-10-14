---
type: module
fidelity: Active
tags: [module, weather, view]
---
# Weather slots and labels
## Purpose and interface
`src/View/Components/Weather.pudu` supplies one hidden localized label/icon registry per page, card(town,townName,at,outdoor), and compact slot(town,at,outdoor). Hidden slots expose only catalog town and activity instant to the progressive weather feature.
## Algorithm and edge cases
The browser fills from the shared island forecast; no covered forecast means no card. Icons cover clear/cloud/showers/storm/fog/night. All message keys originate in ES/EN Plan catalogs, including optional hourly disclosure. No model-generated weather or coordinates.
## Resolved Grill Log
Native disclosure puts detailed hours behind a44px keyboard/touch control; warnings remain visible. Add hourly label to the registry so browser text stays localized. Required icons/variables and unknown-fact behavior are unchanged.
## Referenced by
[[src/Public/Weather]] · [[src/View/Pages/Trip]] · [[src/_MOC]]
