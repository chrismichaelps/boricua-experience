// Distances as people read them: kilometres in Spanish, miles in English, with one decimal.
export function distanceText(meters, lang = document.documentElement.lang) {
  return String(lang || '').startsWith('en') ? `${(meters / 1609.344).toFixed(1)} mi` : `${(meters / 1000).toFixed(1)} km`;
}
