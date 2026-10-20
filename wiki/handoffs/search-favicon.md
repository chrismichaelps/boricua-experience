# Search favicon · #167

Role: Architect → Implementer. Owns View/Layout icon declarations, official favicon.ico format conversion, focused presentation/binary regressions and matching mirrors. Preserve unrelated application and database work.

## Resolved Grill Log
The production globe is an observed Google result, not proof of a crawler block. Current image requests succeed and robots allow them. Fix confirmed defects:32px ICO declared48px and changing discovery URLs. Keep official cotorra artwork. Stable supported PNG/ICO, accurate multi-size metadata; no auth/database changes. Google may take days/weeks and does not guarantee display.

Next action: merge the reviewed fix, release0.14.1 and verify production image responses.

## Referenced by
[[handoffs/_MOC]] · [[src/View/Layout]] · [[src/Public/Brand]] · [[src/Test/Favicon]]

## Validation and review
Independent source/binary review found no runtime blocker; wording was clarified to describe a raster preference. All21 suites pass with752 assertions; all JavaScript harnesses and three timezone runs pass. Pinned formatter and Main source check pass. The browser observes stable ICO/PNG declarations and loads the192px official raster. No database migration is required.
