/** @module update-check */

// Files that are fetched again from the server, bypassing the browser's HTTP cache
const FILES_TO_REFRESH = [
  "index.html",
  "js/bundle.js",
  "css/bundle.css",
  "data/places.min.json",
  "data/opening_hours.json"
];

/**
 * Discard all cached app files and data, fetch them again from the server and reload the page.
 *
 * Updates the service worker registration, deletes all Cache Storage entries and
 * re-requests the app files with cache mode "reload". The service worker stores the
 * fresh responses, so the following page reload uses the current version.
 */
export async function checkForUpdates() {
  try {
    const registration = await navigator.serviceWorker?.getRegistration();
    await registration?.update();
  }
  catch { /* Ignore */ }

  try {
    const cacheNames = await caches.keys();
    await Promise.all(cacheNames.map(cacheName => caches.delete(cacheName)));
  }
  catch { /* Ignore */ }

  const urls = [location.pathname, ...FILES_TO_REFRESH.map(file => new URL(file, location.href).href)];
  await Promise.all(urls.map(url => fetch(url, { cache: "reload" }).catch(() => null)));

  location.reload();
}

/**
 * Set the translated label of the "check for updates" link.
 * @param {Function} translate - Translation function
 */
export function updateCheckLabel(translate) {
  const link = document.getElementById("check-updates");
  if (link && !link.dataset.updating) { link.textContent = translate("texts_check_updates"); }
}

/**
 * Initialise the "check for updates" link.
 * @param {Function} translate - Translation function
 */
export function initUpdateCheck(translate) {
  const link = document.getElementById("check-updates");
  if (!link) { return; }
  updateCheckLabel(translate);
  link.addEventListener("click", (evt) => {
    evt.preventDefault();
    if (link.dataset.updating) { return; }
    link.dataset.updating = "true";
    link.textContent = translate("texts_checking_updates");
    checkForUpdates();
  });
}
