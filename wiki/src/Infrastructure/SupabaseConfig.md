---
type: module
path: "@root/supabase/config.toml"
fidelity: Active
layer: Infrastructure
---
# Supabase local CLI configuration

## Purpose
Track the existing local development CLI configuration without publishing credentials or private SQL.

## Interface
supabase/config.toml configures local services; supabase/.gitignore excludes branches, temporary CLI files and local environment secrets.

## Algorithm
Supabase CLI reads TOML locally. OAuth, messaging and storage credentials resolve environment references. This configuration does not deploy settings to either hosted project.

## Negative Logic
No embedded credentials, migration SQL, seed SQL or automatic hosted settings mutation.

## Edge Cases
Environment references require locally supplied secrets. Existing defaults describe the local emulator, not the hosted production configuration.

## Depth
SHALLOW: configuration boundary.

## Grill Log
Resolved: review existing configuration and commit only TOML and local ignore file; root SQL ignore stays anchored and all credentials remain environment references.

## Referenced by
[[src/_MOC]] · [[architecture/DELIVERY]]
