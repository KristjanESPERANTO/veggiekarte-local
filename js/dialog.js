/** @module dialog */

const FOCUSABLE = "button:not([disabled]), [href], input:not([disabled]), select, textarea, [tabindex]:not([tabindex='-1'])";

/**
 * Give a modal overlay dialog its semantics and keyboard handling.
 *
 * The dialog gets role="dialog", aria-modal and a label. While the overlay has the class "visible",
 * focus moves into the dialog, Tab stays inside it and Escape closes it; when it closes, focus goes
 * back to the element that had it before.
 * @param {HTMLElement} overlay - Backdrop element; the dialog is open while it has the class "visible"
 * @param {HTMLElement} dialog - Dialog element inside the overlay
 * @param {object} options
 * @param {Function} options.close - Closes the dialog
 * @param {Function} [options.getLabelElement] - Returns the element that names the dialog
 */
export function initDialog(overlay, dialog, { close, getLabelElement }) {
  dialog.setAttribute("role", "dialog");
  dialog.setAttribute("aria-modal", "true");
  dialog.tabIndex = -1;
  let returnFocus = null;

  const focusables = () => [...dialog.querySelectorAll(FOCUSABLE)].filter(element => element.offsetParent !== null);

  const update = () => {
    const open = overlay.classList.contains("visible");
    if (open && !returnFocus) {
      returnFocus = document.activeElement || document.body;
      const label = getLabelElement?.();
      if (label) {
        label.id ||= `${dialog.id || "dialog"}-label`;
        dialog.setAttribute("aria-labelledby", label.id);
      }
      (focusables()[0] || dialog).focus();
    }
    else if (!open && returnFocus) {
      if (returnFocus.isConnected && returnFocus !== document.body) { returnFocus.focus(); }
      returnFocus = null;
    }
  };
  new MutationObserver(update).observe(overlay, { attributes: true, attributeFilter: ["class"] });
  update();

  overlay.addEventListener("keydown", (evt) => {
    if (evt.key === "Escape") {
      evt.stopPropagation();
      close();
      return;
    }
    if (evt.key !== "Tab") { return; }
    const elements = focusables();
    if (elements.length === 0) { return; }
    const first = elements[0];
    const last = elements[elements.length - 1];
    if (evt.shiftKey && document.activeElement === first) {
      evt.preventDefault();
      last.focus();
    }
    else if (!evt.shiftKey && document.activeElement === last) {
      evt.preventDefault();
      first.focus();
    }
  });
}
