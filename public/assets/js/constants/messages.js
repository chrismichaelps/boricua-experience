const MESSAGES = {
  es: {
    locationLocating: 'Buscando tu ubicación…',
    locationPinReady: 'Ubicación encontrada. Puedes ajustar el pin antes de publicar.',
    locationPinApproximate: 'Ubicación aproximada (±:distance m). Revisa y ajusta el pin antes de publicar.',
    locationPinDenied: 'Permite la ubicación en los ajustes del navegador y del dispositivo, o coloca el pin manualmente.',
    locationUnsupported: 'Este navegador no permite obtener la ubicación. Coloca el pin o escribe las coordenadas.',
    locationTimedOut: 'La ubicación tardó demasiado. Intenta otra vez o coloca el pin manualmente.',
    locationPinUnavailable: 'El dispositivo no pudo obtener tu ubicación. Intenta otra vez o coloca el pin manualmente.',
    locationMapUnavailable: 'El mapa no pudo cargar. Puedes usar tu ubicación o escribir las coordenadas.',

    copied: 'Enlace copiado',
    locationDenied: 'Activa la ubicación en tu navegador para usar esta función.',
    locationUnavailable: 'No pudimos obtener tu ubicación.',
    locationApproximate: 'Ubicación aproximada (±:distance). Se afinará en unos segundos.',
    today: 'Hoy',
    tomorrow: 'Mañana',
    now: 'Ahora',
    until: 'hasta',
    puertoRicoTime: 'Hora de Puerto Rico',
    you: 'Tú',
    mapEmpty: 'No hay actividades en esta zona. Mueve el mapa o amplía la vista.',
    locationOutside: 'Tu ubicación está fuera de Puerto Rico. Explora la isla moviendo el mapa.',
    mapRefreshFailed: 'No pudimos actualizar esta zona. Mueve el mapa para volver a intentar.',
    offline: 'Sin conexión',
    tryAgain: 'Algo no salió bien. Intenta de nuevo.',
  },
  en: {
    locationLocating: 'Finding your location…',
    locationPinReady: 'Location found. You can adjust the pin before publishing.',
    locationPinApproximate: 'Approximate location (±:distance m). Check and adjust the pin before publishing.',
    locationPinDenied: 'Allow location in browser and device settings, or place the pin manually.',
    locationUnsupported: 'Location is unavailable in this browser. Place the pin or enter coordinates.',
    locationTimedOut: 'Location timed out. Try again or place the pin manually.',
    locationPinUnavailable: 'Your device could not find your location. Try again or place the pin manually.',
    locationMapUnavailable: 'The map could not load. You can use your location or enter coordinates.',

    copied: 'Link copied',
    locationDenied: 'Allow location in your browser to use this feature.',
    locationUnavailable: "We couldn't get your location.",
    locationApproximate: 'Approximate location (±:distance). It will sharpen in a few seconds.',
    today: 'Today',
    tomorrow: 'Tomorrow',
    now: 'Now',
    until: 'until',
    puertoRicoTime: 'Puerto Rico time',
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
