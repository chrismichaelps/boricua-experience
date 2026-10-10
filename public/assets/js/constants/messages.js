const MESSAGES = {
  es: {
    copied: 'Enlace copiado',
    locationDenied: 'Activa la ubicación en tu navegador para usar esta función.',
    locationUnavailable: 'No pudimos obtener tu ubicación.',
    you: 'Tú',
    mapEmpty: 'No hay actividades en esta zona. Mueve el mapa o amplía la vista.',
    locationOutside: 'Tu ubicación está fuera de Puerto Rico. Explora la isla moviendo el mapa.',
    mapRefreshFailed: 'No pudimos actualizar esta zona. Mueve el mapa para volver a intentar.',
    offline: 'Sin conexión',
    tryAgain: 'Algo no salió bien. Intenta de nuevo.',
  },
  en: {
    copied: 'Link copied',
    locationDenied: 'Allow location in your browser to use this feature.',
    locationUnavailable: "We couldn't get your location.",
    you: 'You',
    mapEmpty: 'No activities in this area. Move the map or zoom out.',
    locationOutside: 'Your location is outside Puerto Rico. Move the map to explore the island.',
    mapRefreshFailed: 'We could not update this area. Move the map to try again.',
    offline: 'Offline',
    tryAgain: 'Something went wrong. Please try again.',
  },
};

export function message(key) {
  const locale = document.documentElement.lang.startsWith('en') ? 'en' : 'es';
  return MESSAGES[locale][key] ?? MESSAGES.es[key] ?? key;
}
