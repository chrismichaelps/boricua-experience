---
type: database
fidelity: Active
tags: [database, towns]
---

# Database · Town guides (#152)

## Purpose

What a visitor checks before going to a town, derived only from data.

## Interface

```pudu
app.town_climate (municipality_id, month, high_c, low_c, rain_mm, rain_days, temp_station, rain_station, temp_km, rain_km)
app.town_access (municipality_id, airport_seconds, airport_meters, computed_at)
public.town_guide(p_slug) -> jsonb   -- anon, authenticated
```

## Algorithm

Climate is NOAA's 1991–2020 monthly Climate Normals (public domain): each town takes the nearest of 26 stations reporting temperatures and the nearest of 49 reporting rainfall (days ≥ 0.10 in), converted to °C and mm, both distances kept. The airport drive runs `assistant_town_route('carolina', town)` once per main-island town (filling that cache too); where the graph has no path between centres, the straight distance is stretched by `travel_pace.detour` at `seconds_per_m`. Vieques and Culebra keep no drive. Category counts are live: published places and upcoming public activities.

## Negative Logic (Prohibited Paths)

- ❌ Tables are private (RLS on, no grants); only the function reads them.
- ❌ No written description of any town.

## Grill Log

- **Q:** Use the forecast provider for climate? **A:** No: forecasts are days ahead; normals are the 30-year record visitors plan with.

## Referenced by

[[src/_MOC]]
