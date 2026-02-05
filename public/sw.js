const CACHE_NAME = 'chambia-v1'
const urlsToCache = [
  '/',
  '/register-work',
  '/profile',
  '/history',
  '/employer-view',
  '/manifest.json'
]

// Instalación del service worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache')
        return cache.addAll(urlsToCache)
      })
  )
})

// Estrategia de caché: Network First con fallback
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response
        }

        // Clone la request porque es un stream
        const fetchRequest = event.request.clone()

        return fetch(fetchRequest).then(
          response => {
            // Chequear si recibimos respuesta válida
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response
            }

            // Clone la respuesta porque es un stream
            const responseToCache = response.clone()

            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache)
              })

            return response
          }
        ).catch(() => {
          // Fallback para conexión offline
          if (event.request.url.includes('/register-work') ||
              event.request.url.includes('/profile') ||
              event.request.url.includes('/history')) {
            return caches.match('/')
          }
        })
      })
  )
})

// Limpieza de cachés antiguos
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME]
  
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
})

// Notificaciones push (para el futuro)
self.addEventListener('push', event => {
  const options = {
    body: event.data ? event.data.text() : 'Tienes una nueva notificación de ChambIA',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/icon-72x72.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Ver Notificación',
        icon: '/images/checkmark.png'
      },
      {
        action: 'close',
        title: 'Cerrar',
        icon: '/images/xmark.png'
      }
    ]
  }

  event.waitUntil(
    self.registration.showNotification('ChambIA', options)
  )
})