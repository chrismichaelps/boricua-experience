# Profile category switching

Source: scripts/profile-switch-test.mjs.

## Purpose and contract
Exercise the real profileSwitch module with form-owned radio-list values. A create-category change carries the selected cover and shared text through URLSearchParams; category-specific facts are discarded, category defaults remain empty, and edit forms do not navigate away.

## Grill Log — resolved
Assert the outgoing URL parameters rather than duplicating the module's field list. The authenticated browser category-switch check covers the receiving server draft and checked radio. The harness adds no network, fixtures or dependencies.

## Referenced by
[[src/_MOC]] · [[src/Public/ProfileSwitch]]
