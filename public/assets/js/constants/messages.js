const MESSAGES = {
  es: {
    copied: 'Enlace copiado',
    locationDenied: 'Activa la ubicación en tu navegador para usar esta función.',
    locationUnavailable: 'No pudimos obtener tu ubicación.',
    you: 'Tú',
    offline: 'Sin conexión',
    tryAgain: 'Algo no salió bien. Intenta de nuevo.',
  },
  en: {
    copied: 'Link copied',
    locationDenied: 'Allow location in your browser to use this feature.',
    locationUnavailable: "We couldn't get your location.",
    you: 'You',
    offline: 'Offline',
    tryAgain: 'Something went wrong. Please try again.',
  },
};

export function message(key) {
  const locale = document.documentElement.lang.startsWith('en') ? 'en' : 'es';
  return MESSAGES[locale][key] ?? MESSAGES.es[key] ?? key;
}
