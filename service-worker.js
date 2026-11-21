// Version will be updated by the build process
const CACHE_NAME = "veggiekarte_v3.2.0";

console.info(CACHE_NAME);

// List of files to cache here.
const FILES_TO_CACHE = [
  "data/places.min.json",
  "index.html",
  "js/bundle.js"
];

// A failed precache fails the installation on purpose: the old version, or no worker at all, stays in charge.
async function install() {
  const cache = await caches.open(CACHE_NAME);
  await cache.addAll(FILES_TO_CACHE);
  await self.skipWaiting();
}

async function activate() {
  const cacheNames = await caches.keys();
  await Promise.all(
    cacheNames.map(cacheName =>
      cacheName === CACHE_NAME ? null : caches.delete(cacheName))
  );
  await self.clients.claim();
}

let cacheWarningShown = false;

function warnCacheError(error) {
  // Cache Storage can break in damaged browser profiles; the network still works then.
  if (cacheWarningShown) { return; }
  cacheWarningShown = true;
  console.warn("App cache unavailable, using network only:", error);
}

async function respond(request, networkPromise) {
  try {
    const cache = await caches.open(CACHE_NAME);
    const cachedResponse = await cache.match(request);
    if (cachedResponse) { return cachedResponse; }
  }
  catch (error) {
    warnCacheError(error);
  }

  try {
    return await networkPromise;
  }
  catch (error) {
    console.error("Fetch failed:", error);
    // Explicit offline response for uncached or failed network requests.
    return new Response("Offline", {
      status: 503,
      statusText: "Service Unavailable"
    });
  }
}

async function updateCache(request, networkPromise) {
  let response;
  try {
    response = await networkPromise;
  }
  catch {
    return;
  }
  if (!response.ok) { return; }

  // Clone before the page consumes the body
  const copy = response.clone();
  try {
    const cache = await caches.open(CACHE_NAME);
    await cache.put(request, copy);
  }
  catch (error) {
    warnCacheError(error);
  }
}

self.addEventListener("install", (event) => {
  event.waitUntil(install());
});

self.addEventListener("activate", (event) => {
  event.waitUntil(activate());
});

// Service Worker Caching Strategy: Stale-While-Revalidate
self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") { return; }

  const requestUrl = new URL(request.url);
  if (requestUrl.origin !== self.location.origin) { return; }

  const networkPromise = fetch(request);
  // Register the cache update first so it can clone the response before the page reads it
  event.waitUntil(updateCache(request, networkPromise));
  event.respondWith(respond(request, networkPromise));
});
