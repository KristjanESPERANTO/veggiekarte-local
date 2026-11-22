/** @module storage */

/**
 * Read a value from localStorage.
 * @param {string} key - Storage key
 * @returns {string|null} Stored value, or null when missing or when storage is unavailable
 */
export function loadSetting(key) {
  try { return localStorage.getItem(key); }
  catch { return null; }
}

/**
 * Write a value to localStorage; ignored when storage is unavailable.
 * @param {string} key - Storage key
 * @param {string} value - Value to store
 */
export function saveSetting(key, value) {
  try { localStorage.setItem(key, value); }
  catch { /* Ignore */ }
}

/**
 * Read a JSON value from localStorage.
 * @param {string} key - Storage key
 * @param {*} fallback - Returned when the value is missing, invalid or storage is unavailable
 * @returns {*} Parsed value or fallback
 */
export function loadJsonSetting(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
  catch { return fallback; }
}

/**
 * Write a value as JSON to localStorage; ignored when storage is unavailable.
 * @param {string} key - Storage key
 * @param {*} value - Value to store
 */
export function saveJsonSetting(key, value) {
  saveSetting(key, JSON.stringify(value));
}
