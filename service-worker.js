// Version will be updated by the build process
const CACHE_NAME = "veggiekarte_v1.1.3";

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
  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        const fetchPromise = fetch(event.request)
          .then((networkResponse) => {
            // Update cache with new response
            if (networkResponse.ok) {
              caches.open(CACHE_NAME)
                .then(cache => cache.put(event.request, networkResponse.clone()));
            }
            return networkResponse;
          })
          .catch((error) => {
            // Log the error to the console when the fetch fails
            console.error("Fetch failed:", error);
          });

        // Return cached response immediately, or wait for network
        return cachedResponse || fetchPromise;
      })
  );
});
