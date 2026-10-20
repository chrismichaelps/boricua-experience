# Public/ProfileSwitch

Source: corresponding implementation module. Bounded responsibility: cover selection state and publishing outcome.

## Cover completion Grill Log · #155 — resolved
Reject unknown theme values before publishing. Successful listing saves carry an explicit coverSaved outcome; a subsequent theme failure keeps the saved listing and redirects once with a bilingual warning to retry through editing, never a duplicate publish. Theme updates lock the owned parent before reading its cover so a concurrent confirmed photograph cannot be overwritten. Theme/default artwork is illustration, never a gallery photograph. The fieldset retains keyboard radio semantics, selected state, linked validation errors and all category-switch draft state. Local artwork is asset-versioned; uploaded photographs remain authoritative.

Regression: [[src/Test/ProfileSwitch]] verifies the browser URL; authenticated create/place browser navigation verifies the server reads the theme back.
