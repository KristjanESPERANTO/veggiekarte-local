// Version will be updated by the build process
const CACHE_NAME = "veggiekarte_v2.10.1";

console.info(CACHE_NAME);

// List of files to cache here.
const FILES_TO_CACHE = [
  "data/places.min.json",
  "index.html",
  "js/bundle.js"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then(cache => cache.addAll(FILES_TO_CACHE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    Promise.all([
      // Delete old caches
      caches.keys().then(cacheNames =>
        Promise.all(
          cacheNames.map(cacheName =>
            cacheName === CACHE_NAME ? null : caches.delete(cacheName)
          )
        )
      ),
      // Claim all clients
      self.clients.claim()
    ])
  );
});

// Service Worker Caching Strategy: Stale-While-Revalidate
self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") { return; }

  const requestUrl = new URL(request.url);
  if (requestUrl.origin !== self.location.origin) { return; }

  event.respondWith(
    caches.match(request)
      .then((cachedResponse) => {
        const fetchPromise = fetch(request)
          .then((networkResponse) => {
            // Clone BEFORE using the response
            if (networkResponse && networkResponse.ok) {
              const responseToCache = networkResponse.clone();
              caches.open(CACHE_NAME)
                .then(cache => cache.put(request, responseToCache));
            }
            return networkResponse;
          })
          .catch((error) => {
            console.error("Fetch failed:", error);
            // Explicit offline response for uncached or failed network requests.
            return new Response("Offline", {
              status: 503,
              statusText: "Service Unavailable"
            });
          });

        // Return cached response immediately, or wait for network
        return cachedResponse || fetchPromise;
      })
  );
});
