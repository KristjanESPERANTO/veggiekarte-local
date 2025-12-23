/**
 * Creates a progress bar controller for tracking loading operations.
 *
 * Designed specifically for Leaflet MarkerCluster's chunkedLoading feature,
 * which loads markers in batches across multiple SubGroups. Each SubGroup
 * triggers its own chunkedLoading cycle, so we need intelligent handling:
 *
 * - Phase 1 (0-50%): Data loading (fetch + JSON parsing)
 * - Phase 2 (50-100%): Marker rendering via chunkedLoading
 *
 * The challenge: Multiple SubGroups load in parallel, each reporting their
 * own progress (0/total → total/total). We can't finish() when ONE SubGroup
 * completes - we must wait for ALL. Solution: debouncing with auto-finish.
 *
 * @param {Object} options - Configuration options
 * @param {string} [options.containerId="progress"] - Progress container element ID
 * @param {string} [options.barId="progress-bar"] - Progress bar element ID
 * @param {number} [options.hideDelay=500] - Delay before hiding after 100%
 * @returns {Object} Controller with start, setPercent, finish, updateChunk, disable methods
 */
export function createProgressController({
  containerId = "progress",
  barId = "progress-bar",
  hideDelay = 500
} = {}) {
  const container = () => document.getElementById(containerId);
  const bar = () => document.getElementById(barId);

  let lastPercent = 0;
  let progressStarted = false;
  let hideTimeout = null;
  let enabled = true;
  let autoFinishTimeout = null;

  function clearAllTimeouts() {
    if (hideTimeout) {
      clearTimeout(hideTimeout);
      hideTimeout = null;
    }
    if (autoFinishTimeout) {
      clearTimeout(autoFinishTimeout);
      autoFinishTimeout = null;
    }
  }

  function start() {
    const el = container();
    const barEl = bar();
    if (!el || !barEl) { return; }

    clearAllTimeouts();
    enabled = true;
    progressStarted = true;
    lastPercent = 0;
    barEl.style.width = "0%";
    el.style.display = "flex";
  }

  function setPercent(percent) {
    const el = container();
    const barEl = bar();
    if (!el || !barEl || !enabled) { return; }

    clearAllTimeouts();
    const clamped = Math.max(0, Math.min(100, Math.round(percent)));

    if (!progressStarted) { start(); }
    if (clamped > lastPercent) {
      lastPercent = clamped;
      barEl.style.width = `${clamped}%`;
    }
  }

  function finish(delay = hideDelay) {
    const el = container();
    const barEl = bar();
    if (!el || !barEl) { return; }

    clearAllTimeouts();
    barEl.style.width = "100%";

    hideTimeout = setTimeout(() => {
      el.style.display = "none";
      barEl.style.width = "0%";
      lastPercent = 0;
      progressStarted = false;
    }, delay);
  }

  /**
   * Handles chunkedLoading progress callbacks from MarkerCluster.
   *
   * Maps chunk progress (0-100%) to the second half of the bar (50-100%).
   * Uses debouncing to auto-finish: when no updates arrive for 300ms,
   * we assume all SubGroups are done and call finish().
   *
   * Why ignore (0, 0)? When a SubGroup is added to the map but has no
   * markers to render, MarkerCluster still fires a callback with (0, 0).
   * These are noise and should be ignored.
   *
   * Why debouncing? Multiple SubGroups load in parallel. A small SubGroup
   * might complete (1000/1000) while larger ones (5000/50000) are still
   * loading. We can't finish() on the first completion - we must wait
   * until ALL are done. The debounce detects "no activity" as "completion".
   *
   * @param {number} processed - Number of markers processed so far
   * @param {number} total - Total number of markers to process
   */
  function updateChunk(processed, total) {
    if (!enabled) { return; }

    const el = container();
    const barEl = bar();
    if (!el || !barEl) { return; }

    clearAllTimeouts();

    // Ignore empty chunks (SubGroup with no markers)
    if (processed === 0 && total === 0) { return; }

    // Update progress bar (map 0-100% chunk → 50-100% total)
    if (processed < total) {
      if (!progressStarted) { start(); }

      const chunkPercent = Math.round((processed / total) * 100);
      const percent = 50 + Math.round(chunkPercent / 2);

      if (percent > lastPercent) {
        lastPercent = percent;
        barEl.style.width = `${percent}%`;
      }
    }

    // Schedule auto-finish with debouncing
    // If no new updates arrive within 300ms, all SubGroups are done
    autoFinishTimeout = setTimeout(() => {
      finish();
      enabled = false; // Prevent further updates after completion
    }, 300);
  }

  function disable() {
    enabled = false;
  }

  return { start, setPercent, finish, updateChunk, disable };
}
