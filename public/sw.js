const CACHE_NAME = "bitstream-cache-v1"
const urlsToCache = [
  "/",
  "/dashboard",
  "/offline.html",
  "/manifest.json",
  "/icons/icon-192x192.png",
  "/icons/icon-512x512.png",
]

// Install a service worker
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache")
      return cache.addAll(urlsToCache)
    }),
  )
})

// Cache and return requests
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Return the cached response if we have it
      if (response) {
        return response
      }

      // Otherwise, fetch from network
      return fetch(event.request)
        .then((response) => {
          // Don't cache if it's not a valid response or it's not a GET request
          if (!response || response.status !== 200 || event.request.method !== "GET") {
            return response
          }

          // Clone the response because it's a stream and can only be consumed once
          const responseToCache = response.clone()

          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache)
          })

          return response
        })
        .catch(() => {
          // If the network is unavailable, try to return the offline page for navigation requests
          if (event.request.mode === "navigate") {
            return caches.match("/offline.html")
          }
        })
    }),
  )
})

// Update a service worker
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME]
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName)
          }
        }),
      )
    }),
  )
})
