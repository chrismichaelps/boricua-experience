# Origin transfer incident · #200

Role: Investigator → Implementer. Owns robots policy, focused tests and the operational mitigation receipt.

## Evidence
On 2026-10-23 the Hobby team exceeded10GB origin transfer. Boricua used8.65GB; the website project1.79GB. Firewall traffic for the previous day showed107.5k Facebook-network requests and over105k requests identifying as meta-externalagent, against116.1k allowed requests. Search40.3k, map28.4k and signin24.6k dominated paths. Dynamic HTML is private by design (language/consent/session); static JS was HIT. These independent breakdowns establish the dominant crawler and an uncached response amplification path, not exact per-crawler billed bytes.

## Resolved Grill Log
Keep the fix specific to Meta ExternalAgent. Do not block Facebook link-preview fetchers, Google/Bing or all AI traffic. Do not cache personalized HTML, remove authentication guards, purge caches or add paid services. Log a narrow edge matcher before enforcing it; robots excludes the same crawler voluntarily. Existing usage cannot be reversed.

## Applied edge mitigation
The user published observation, preview-only enforcement and then production enforcement. Rule `rule_observe_meta_external_agent_crawl_traffic_m7xIbS` denies only user agents containing `meta-externalagent/`. Observed matches were all Facebook-network Meta agents. Authenticated preview probes: target403, browser/Google-shaped/social-preview controls200. Production search/map/signin probes: target403,59-byte `x-vercel-mitigated: deny` responses. Normal search and robots200; homepage browser and social-preview retries200 after one transient function invocation failure. First complete post-enforcement minute had4allowed requests versus roughly120/min beforehand;96denied. This is immediate evidence, not a monthly-quota guarantee. One free custom rule; no paid managed rules, rate limit or plan changes.

## Validation and release
23/23 suites,787assertions and all browser/timezone harnesses pass. Formatting and source checks pass using the pinned0.1.3 compiler. PR201 merged to dev. Role: Implementer → Release engineer. Next action: deploy release0.16.3 and verify live robots plus matching build fingerprints.

