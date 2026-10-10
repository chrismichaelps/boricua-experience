#!/usr/bin/env bash
# Runs the Pudu test suites and every browser harness; exits non-zero on the first failure.
set -euo pipefail
cd "$(dirname "$0")/.."

pudu test
for harness in scripts/*-test.mjs; do
  [ "$harness" = scripts/local-time-test.mjs ] && continue
  node "$harness"
done
for zone in America/Puerto_Rico America/Los_Angeles Europe/Madrid; do
  TZ="$zone" node scripts/local-time-test.mjs
done
