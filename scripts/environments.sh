#!/usr/bin/env bash
# Shared environment facts for the development scripts. A project ref is public (it is part of every
# Supabase URL), so naming production here exposes nothing; it lets every script refuse to touch it.
PRODUCTION_PROJECT_REF="vkomwdhlheneumhykgus"
POOLER_HOST="${BORICUA_DB_POOLER_HOST:-aws-0-us-east-1.pooler.supabase.com}"

# The project ref inside a hosted Supabase URL, or nothing for a local stack.
project_ref() {
  case "$1" in
    https://*.supabase.co*) echo "$1" | sed -E 's#https://([^.]+)\.supabase\.co.*#\1#' ;;
    *) echo "" ;;
  esac
}
