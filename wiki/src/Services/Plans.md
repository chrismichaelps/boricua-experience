# Services.Plans

Source: src/Services/Plans.pudu. Builds bounded nearby itineraries and road routes through the authenticated gateway, retaining database-provided styles and shared-plan identifiers. Invalid input is refused before querying; visitor choices never become authorization.

## Grill Log — resolved
The database owns availability, style eligibility and routing. Preserve typed input validation and failure reporting. Import normalization is formatting only. Existing plan regressions cover route and style selection.

## Referenced by
[[src/_MOC]]
