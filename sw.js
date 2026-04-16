const CACHE_NAME = 'martinelli-erp-v1';

// Instalación del Service Worker
self.addEventListener('install', (event) => {
  self.skipWaiting(); // Obliga a activar la nueva versión inmediatamente
});

// Activación y limpieza de caches antiguos
self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

// Interceptar peticiones (Fetch)
// Para esta app dinámica, usamos una estrategia simple de "Network First" o simplemente dejamos pasar la red.
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => {
      // Si falla la red, intentar buscar en caché (para el futuro modo offline)
      return caches.match(event.request);
    })
  );
});
