const nominatimCache = {};
const inflight = {};

const PERSIST_KEY = "vk_nominatim_v1";
const MAX_ENTRIES = 300;
const TTL_MS = 24 * 60 * 60 * 1000;

let persistentLoaded = false;
let persistentStore = { entries: {}, order: [] };

function loadPersistentStore() {
  if (persistentLoaded) { return; }
  persistentLoaded = true;
  try {
    const parsed = JSON.parse(window.localStorage.getItem(PERSIST_KEY) || "{}");
    if (parsed.entries && parsed.order) { persistentStore = parsed; }
  }
  catch { /* Ignore */ }
}

function savePersistentStore() {
  try { window.localStorage.setItem(PERSIST_KEY, JSON.stringify(persistentStore)); }
  catch { /* Ignore */ }
}

function touchOrder(key) {
  const idx = persistentStore.order.indexOf(key);
  if (idx >= 0) { persistentStore.order.splice(idx, 1); }
  persistentStore.order.push(key);
  if (persistentStore.order.length > MAX_ENTRIES) {
    delete persistentStore.entries[persistentStore.order.shift()];
  }
}

/** Retrieve in-memory nominatim entry. */
export function getMemoryNominatim(key) {
  return nominatimCache[key] || null;
}

/** Store in-memory nominatim entry. */
export function setMemoryNominatim(key, data) {
  nominatimCache[key] = data;
}

/** Retrieve persistent nominatim entry with freshness metadata. */
export function getPersistentNominatim(key) {
  loadPersistentStore();
  const entry = persistentStore.entries[key];
  if (!entry) { return null; }
  const age = Date.now() - entry.ts;
  return { data: entry.data, ts: entry.ts, fresh: age < TTL_MS, stale: age >= TTL_MS };
}

/** Store persistent nominatim entry. */
export function setPersistentNominatim(key, data) {
  loadPersistentStore();
  persistentStore.entries[key] = { ts: Date.now(), data };
  touchOrder(key);
  savePersistentStore();
}

/** Retrieve in-flight request promise for key (if any). */
export function getInflightNominatim(key) {
  return inflight[key] || null;
}

/** Store in-flight request promise for key. */
export function setInflightNominatim(key, promise) {
  inflight[key] = promise;
}

/** Clear in-flight request promise for key. */
export function clearInflightNominatim(key) {
  delete inflight[key];
}
