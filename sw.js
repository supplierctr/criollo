// ===== SERVICE WORKER PARA CRIOLLO 4 =====
const CACHE_NAME = 'criollo-4-v1.0.0';
const STATIC_CACHE = 'criollo-static-v1.0.0';
const DYNAMIC_CACHE = 'criollo-dynamic-v1.0.0';

// Archivos a cachear estáticamente
const STATIC_FILES = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
  '/manifest.json',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
  'https://fonts.googleapis.com/icon?family=Material+Icons'
];

// ===== INSTALACIÓN =====
self.addEventListener('install', (event) => {
  console.log('🔄 Service Worker instalando...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('📦 Cacheando archivos estáticos...');
        return cache.addAll(STATIC_FILES);
      })
      .then(() => {
        console.log('✅ Service Worker instalado correctamente');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('❌ Error durante la instalación:', error);
      })
  );
});

// ===== ACTIVACIÓN =====
self.addEventListener('activate', (event) => {
  console.log('🚀 Service Worker activando...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log('🗑️ Eliminando cache obsoleto:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('✅ Service Worker activado correctamente');
        return self.clients.claim();
      })
  );
});

// ===== INTERCEPTACIÓN DE PETICIONES =====
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Estrategia para diferentes tipos de recursos
  if (request.method === 'GET') {
    // Archivos estáticos (HTML, CSS, JS)
    if (request.destination === 'document' || 
        request.destination === 'style' || 
        request.destination === 'script') {
      event.respondWith(cacheFirst(request, STATIC_CACHE));
    }
    // Fuentes y recursos externos
    else if (request.destination === 'font' || 
             url.hostname === 'fonts.googleapis.com' ||
             url.hostname === 'fonts.gstatic.com') {
      event.respondWith(cacheFirst(request, STATIC_CACHE));
    }
    // API calls (Google Sheets)
    else if (url.hostname === 'script.google.com') {
      event.respondWith(networkFirst(request, DYNAMIC_CACHE));
    }
    // Otros recursos
    else {
      event.respondWith(networkFirst(request, DYNAMIC_CACHE));
    }
  }
});

// ===== ESTRATEGIAS DE CACHE =====

// Cache First: Para archivos estáticos
async function cacheFirst(request, cacheName) {
  try {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.error('Error en cacheFirst:', error);
    return new Response('Error de conexión', { status: 503 });
  }
}

// Network First: Para datos dinámicos
async function networkFirst(request, cacheName) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.log('🌐 Sin conexión, usando cache...');
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Respuesta offline personalizada
    return new Response(
      JSON.stringify({
        error: 'Sin conexión a internet',
        message: 'Los datos no están disponibles offline'
      }), 
      {
        status: 503,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}

// ===== SINCRONIZACIÓN EN BACKGROUND =====
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    console.log('🔄 Sincronización en background iniciada');
    event.waitUntil(backgroundSync());
  }
});

async function backgroundSync() {
  try {
    // Aquí se pueden implementar tareas de sincronización
    // cuando se recupere la conexión
    console.log('✅ Sincronización completada');
  } catch (error) {
    console.error('❌ Error en sincronización:', error);
  }
}

// ===== NOTIFICACIONES PUSH =====
self.addEventListener('push', (event) => {
  console.log('📱 Notificación push recibida');
  
  const options = {
    body: event.data ? event.data.text() : 'Nueva actualización disponible',
    icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="20" fill="%236366f1"/><text y=".9em" font-size="60" text-anchor="middle" x="50" fill="white">🍽️</text></svg>',
    badge: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="20" fill="%236366f1"/><text y=".9em" font-size="60" text-anchor="middle" x="50" fill="white">🍽️</text></svg>',
    vibrate: [200, 100, 200],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Ver detalles',
        icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="20" fill="%2310b981"/><text y=".9em" font-size="60" text-anchor="middle" x="50" fill="white">👁️</text></svg>'
      },
      {
        action: 'close',
        title: 'Cerrar',
        icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="20" fill="%23ef4444"/><text y=".9em" font-size="60" text-anchor="middle" x="50" fill="white">❌</text></svg>'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('Criollo 4', options)
  );
});

// ===== CLICK EN NOTIFICACIONES =====
self.addEventListener('notificationclick', (event) => {
  console.log('🖱️ Notificación clickeada');
  
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  } else if (event.action === 'close') {
    // Solo cerrar la notificación
    return;
  } else {
    // Click en el cuerpo de la notificación
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// ===== MENSAJES DEL CLIENTE =====
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage({ version: CACHE_NAME });
  }
});

console.log('🛠️ Service Worker cargado');
