# Origin transfer incident · #200

Role: Investigator → Implementer. Owns robots policy, focused tests and the operational mitigation receipt.

## Evidence
On 2026-10-23 the Hobby team exceeded10GB origin transfer. Boricua used8.65GB; the website project1.79GB. Firewall traffic for the previous day showed107.5k Facebook-network requests and over105k requests identifying as meta-externalagent, against116.1k allowed requests. Search40.3k, map28.4k and signin24.6k dominated paths. Dynamic HTML is private by design (language/consent/session); static JS was HIT. These independent breakdowns establish the dominant crawler and an uncached response amplification path, not exact per-crawler billed bytes.

## Resolved Grill Log
Keep the fix specific to Meta ExternalAgent. Do not block Facebook link-preview fetchers, Google/Bing or all AI traffic. Do not cache personalized HTML, remove authentication guards, purge caches or add paid services. Log a narrow edge matcher before enforcing it; robots excludes the same crawler voluntarily. Existing usage cannot be reversed.

## Pending
The user published the observation rule. Verify its matches, test a preview-scoped deny, then prepare production enforcement for user publication under the Firewall skill. Next action: inspect the logged requests.
