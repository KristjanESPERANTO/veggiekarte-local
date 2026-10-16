/**
 * Creates a progress bar controller for tracking loading operations.
 *
 * @param {Object} options - Configuration options
 * @param {string} [options.containerId="progress"] - Progress container element ID
 * @param {string} [options.barId="progress-bar"] - Progress bar element ID
 * @param {number} [options.hideDelay=500] - Delay before hiding after 100%
 * @returns {Object} Controller with start, setPercent, finish, disable methods
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

  function clearAllTimeouts() {
    if (hideTimeout) {
      clearTimeout(hideTimeout);
      hideTimeout = null;
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

  function disable() {
    enabled = false;
  }

  return { start, setPercent, finish, disable };
}
