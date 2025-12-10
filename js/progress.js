// Shared progress bar controller for both main map and datacheck
// Works with a container element (default #progress) and an inner bar (#progress-bar)
export function createProgressController({ containerId = "progress", barId = "progress-bar", labelId = "progress-label", hideDelay = 500 } = {}) {
  const container = () => document.getElementById(containerId);
  const bar = () => document.getElementById(barId);
  const label = () => document.getElementById(labelId);

  let lastPercent = 0;
  let progressStarted = false;
  let hideTimeout = null;

  function clearHideTimeout() {
    if (hideTimeout) {
      clearTimeout(hideTimeout);
      hideTimeout = null;
    }
  }

  function start() {
    const el = container();
    const barEl = bar();
    if (!el || !barEl) { return; }
    clearHideTimeout();
    progressStarted = true;
    lastPercent = 0;
    barEl.style.width = "0%";
    el.style.display = "flex";
    const labelEl = label();
    if (labelEl) { labelEl.textContent = "0%"; }
  }

  function setPercent(percent) {
    const el = container();
    const barEl = bar();
    if (!el || !barEl) { return; }
    clearHideTimeout();
    const clamped = Math.max(0, Math.min(100, Math.round(percent)));
    if (!progressStarted) { start(); }
    if (clamped > lastPercent) {
      lastPercent = clamped;
      barEl.style.width = `${clamped}%`;
      const labelEl = label();
      if (labelEl) { labelEl.textContent = `${clamped}%`; }
    }
  }

  function finish(delay = hideDelay) {
    const el = container();
    const barEl = bar();
    if (!el || !barEl) { return; }
    clearHideTimeout();
    barEl.style.width = "100%";
    const labelEl = label();
    if (labelEl) { labelEl.textContent = "100%"; }
    hideTimeout = setTimeout(() => {
      el.style.display = "none";
      barEl.style.width = "0%";
      lastPercent = 0;
      progressStarted = false;
      if (labelEl) { labelEl.textContent = "0%"; }
    }, delay);
  }

  // Special handler for MarkerCluster chunkedLoading callbacks
  function updateChunk(processed, total) {
    const el = container();
    const barEl = bar();
    if (!el || !barEl) { return; }

    clearHideTimeout();

    if (processed < total) {
      if (!progressStarted) { start(); }
      const percent = Math.round((processed / total) * 100);
      if (percent > lastPercent) {
        lastPercent = percent;
        barEl.style.width = `${percent}%`;
      }
    }
    else {
      finish();
    }
  }

  return { start, setPercent, finish, updateChunk };
}
