/* eslint-disable camelcase */
import { Control, DomEvent, DomUtil } from "leaflet";
import { CATEGORY_HIERARCHY } from "./category-mapping.js";
import { t } from "./i18n.js";

/**
 * CategoryFilterControl - Leaflet control for filtering markers by category and diet type.
 * Built like InfoButton: simple button that toggles a panel.
 */
const CategoryFilterControl = Control.extend({
  options: {
    position: "topright"
  },

  initialize(options) {
    Control.prototype.initialize.call(this, options);
    this._categoryStates = this._loadStates();
    this._dietStates = this._loadDietStates();
    this._categoryCounts = {};
    this._listeners = [];
    this._dietFilters = [];
    this._panelVisible = false;
  },

  onAdd(map) {
    this._map = map;

    // Create button container (like InfoButton)
    const container = DomUtil.create("div", "leaflet-bar leaflet-control");
    this._link = DomUtil.create("a", "category-filter-btn", container);
    this._link.href = "#";
    this._link.setAttribute("role", "button");
    this._link.innerHTML = "<svg width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'><rect x='3' y='3' width='7' height='7'/><rect x='14' y='3' width='7' height='7'/><rect x='3' y='14' width='7' height='7'/><rect x='14' y='14' width='7' height='7'/></svg>";

    // Toggle panel on click
    DomEvent.on(this._link, "click", (evt) => {
      DomEvent.stop(evt);
      this._togglePanel();
    });

    // Create panel (like #information div)
    this._createPanel();

    return container;
  },

  _createPanel() {
    // Create modal overlay (backdrop)
    this._overlay = document.createElement("div");
    this._overlay.id = "category-filter-overlay";
    this._overlay.className = "category-filter-overlay";
    document.body.appendChild(this._overlay);

    // Close on backdrop click
    this._overlay.addEventListener("click", (evt) => {
      if (evt.target === this._overlay) { this._togglePanel(); }
    });

    // Create modal container
    this._panel = document.createElement("div");
    this._panel.id = "category-filter-modal";
    this._panel.className = "category-filter-modal";
    this._overlay.appendChild(this._panel);

    // Close button (like #close in info box)
    const closeBtn = document.createElement("div");
    closeBtn.id = "category-filter-close";
    closeBtn.className = "category-filter-close";
    closeBtn.textContent = "✖";
    closeBtn.setAttribute("onclick", "document.toggleCategoryFilter()");
    this._panel.appendChild(closeBtn);

    // Register global toggle function
    document.toggleCategoryFilter = () => this._togglePanel();

    // Content container
    this._contentDiv = document.createElement("div");
    this._contentDiv.className = "category-filter-content";
    this._panel.appendChild(this._contentDiv);

    // Build the UI
    this._createUI();
  },

  _togglePanel() {
    if (!this._overlay) { return; }
    const isVisible = this._overlay.classList.contains("visible");
    if (isVisible) {
      this._overlay.classList.remove("visible");
    }
    else {
      this._overlay.classList.add("visible");
    }
  },

  _createUI() {
    if (!this._contentDiv) { return; }
    this._contentDiv.innerHTML = "";

    const selectionTitle = t("category.selection_title") || "Selection";

    // Header with counter
    const header = DomUtil.create("div", "category-filter-header", this._contentDiv);
    const title = DomUtil.create("div", "category-filter-title", header);
    title.innerHTML = `<svg width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'><rect x='3' y='3' width='7' height='7'/><rect x='14' y='3' width='7' height='7'/><rect x='3' y='14' width='7' height='7'/><rect x='14' y='14' width='7' height='7'/></svg> ${selectionTitle}`;
    this._markerCounter = DomUtil.create("div", "category-filter-counter", header);
    const loadingText = t("words.loading") || "Loading...";
    this._markerCounter.innerHTML = `<span style="color:#999">${loadingText}</span>`;

    // Diet filter section
    const dietSection = DomUtil.create("div", "diet-filter-section", this._contentDiv);
    const dietTitle = DomUtil.create("h4", "diet-filter-title", dietSection);
    dietTitle.textContent = t("category.diet_types") || "Diet Types";
    this._dietList = DomUtil.create("div", "diet-filter-list", dietSection);
    this._dietFilters.forEach(options => this._addDietFilterToDOM(options));

    // Category section with title and quick toggle buttons
    const categorySection = DomUtil.create("div", "category-section-wrapper", this._contentDiv);
    const categoryHeader = DomUtil.create("div", "category-section-header", categorySection);
    const categoryTitle = DomUtil.create("h4", "category-section-title", categoryHeader);
    categoryTitle.textContent = t("category.categories") || "Categories";

    // Quick toggle buttons - now clearly part of category section
    const quickToggle = DomUtil.create("div", "category-quick-toggle", categoryHeader);
    const foodOnlyBtn = DomUtil.create("button", "btn-food-only", quickToggle);
    foodOnlyBtn.textContent = t("category.food_only") || "🍽️ Food only";
    DomEvent.on(foodOnlyBtn, "click", () => this._toggleFoodOnly());
    const allBtn = DomUtil.create("button", "btn-enable-all", quickToggle);
    allBtn.textContent = t("category.show_all") || "✓ Show all";
    DomEvent.on(allBtn, "click", () => this._enableAll());
    const resetBtn = DomUtil.create("button", "btn-reset", quickToggle);
    resetBtn.textContent = t("category.reset") || "↺ Reset";
    resetBtn.title = t("category.reset_hint") || "Reset to default settings";
    DomEvent.on(resetBtn, "click", () => this._resetToDefaults());

    // Category list
    const categoryList = DomUtil.create("div", "category-list", categorySection);
    Object.entries(CATEGORY_HIERARCHY).forEach(([mainId, mainCat]) => {
      this._createCategorySection(categoryList, mainId, mainCat);
    });

    // Update button that opens this panel
    this._link.title = selectionTitle;
    this._link.setAttribute("aria-label", selectionTitle);
  },

  _createCategorySection(parent, mainId, mainCat) {
    const section = DomUtil.create("div", "category-section", parent);
    section.dataset.categoryId = mainId;

    // Main category header
    const mainLabel = DomUtil.create("label", "category-main", section);
    const mainInput = DomUtil.create("input", "", mainLabel);
    mainInput.type = "checkbox";
    mainInput.checked = this._categoryStates[mainId] !== false;
    DomEvent.on(mainInput, "change", () => this._toggleMainCategory(mainId, mainInput.checked));

    const mainText = DomUtil.create("span", "category-text", mainLabel);
    const translatedLabel = t(`category.${mainId}`) || mainCat.label;
    mainText.textContent = translatedLabel;

    const mainCount = DomUtil.create("span", "category-count", mainLabel);
    mainCount.dataset.categoryId = mainId;
    mainCount.textContent = this._categoryCounts[mainId] || "0";

    // Subcategories
    const subList = DomUtil.create("div", "category-sub-list", section);
    Object.entries(mainCat.subcategories).forEach(([subId, subCat]) => {
      const key = `${mainId}.${subId}`;
      const subLabel = DomUtil.create("label", "category-sub", subList);
      const subInput = DomUtil.create("input", "", subLabel);
      subInput.type = "checkbox";
      subInput.checked = this._categoryStates[key] !== false;
      DomEvent.on(subInput, "change", () => this._toggleSubCategory(mainId, subId, subInput.checked));

      const subText = DomUtil.create("span", "category-text", subLabel);
      const translatedSubLabel = t(`category.${mainId}.${subId}`) || subCat.label;
      subText.textContent = translatedSubLabel;

      const subCount = DomUtil.create("span", "category-count", subLabel);
      subCount.dataset.categoryId = key;
      subCount.textContent = this._categoryCounts[key] || "0";
    });
  },

  _toggleMainCategory(mainId, enabled) {
    if (this._isUpdating) { return; } // Prevent recursion from _updateUI
    this._categoryStates[mainId] = enabled;
    const mainCat = CATEGORY_HIERARCHY[mainId];
    Object.keys(mainCat.subcategories).forEach((subId) => {
      this._categoryStates[`${mainId}.${subId}`] = enabled;
    });
    this._saveStates();
    this._updateUI();
    this._notifyChange();
  },

  _toggleSubCategory(mainId, subId, enabled) {
    if (this._isUpdating) { return; } // Prevent recursion from _updateUI
    this._categoryStates[`${mainId}.${subId}`] = enabled;
    const mainCat = CATEGORY_HIERARCHY[mainId];
    const subCats = Object.keys(mainCat.subcategories);
    const enabledSubs = subCats.filter(id => this._categoryStates[`${mainId}.${id}`] !== false);

    if (enabledSubs.length === 0) {
      this._categoryStates[mainId] = false;
    }
    else if (enabledSubs.length === subCats.length) {
      this._categoryStates[mainId] = true;
    }
    else {
      this._categoryStates[mainId] = "indeterminate";
    }
    this._saveStates();
    this._updateUI();
    this._notifyChange();
  },

  _toggleFoodOnly() {
    Object.entries(CATEGORY_HIERARCHY).forEach(([mainId, mainCat]) => {
      const isFood = mainId === "food";
      this._categoryStates[mainId] = isFood;
      Object.keys(mainCat.subcategories).forEach((subId) => {
        this._categoryStates[`${mainId}.${subId}`] = isFood;
      });
    });
    this._saveStates();
    this._updateUI();
    this._notifyChange();
  },

  _enableAll() {
    Object.entries(CATEGORY_HIERARCHY).forEach(([mainId, mainCat]) => {
      this._categoryStates[mainId] = true;
      Object.keys(mainCat.subcategories).forEach((subId) => {
        this._categoryStates[`${mainId}.${subId}`] = true;
      });
    });
    this._saveStates();
    this._updateUI();
    this._notifyChange();
  },

  _resetToDefaults() {
    // Reset categories to default (food + shopping)
    Object.entries(CATEGORY_HIERARCHY).forEach(([mainId, mainCat]) => {
      const enabled = mainId === "food" || mainId === "shopping";
      this._categoryStates[mainId] = enabled;
      Object.keys(mainCat.subcategories).forEach((subId) => {
        this._categoryStates[`${mainId}.${subId}`] = enabled;
      });
    });
    // Reset diet types to all enabled
    this._dietStates = {
      vegan_only: true,
      vegetarian_only: true,
      vegan_friendly: true,
      vegan_limited: true,
      vegetarian_friendly: true
    };
    // Update diet checkboxes in DOM
    if (this._dietList) {
      this._dietList.querySelectorAll("input[type='checkbox']").forEach((cb) => {
        cb.checked = true;
      });
    }
    this._saveStates();
    this._saveDietStates();
    this._updateUI();
    this._notifyChange();
  },

  _updateUI() {
    if (!this._contentDiv) { return; }
    if (this._isUpdating) { return; } // Prevent recursion
    this._isUpdating = true;

    // Update category checkboxes
    Object.entries(CATEGORY_HIERARCHY).forEach(([mainId, mainCat]) => {
      const section = this._contentDiv.querySelector(`[data-category-id="${mainId}"]`);
      if (!section) { return; }

      const mainInput = section.querySelector(".category-main input");
      if (mainInput) {
        const state = this._categoryStates[mainId];
        mainInput.checked = state === true;
        mainInput.indeterminate = state === "indeterminate";
      }

      Object.keys(mainCat.subcategories).forEach((subId) => {
        const key = `${mainId}.${subId}`;
        const subInputs = section.querySelectorAll(".category-sub input");
        subInputs.forEach((input) => {
          const label = input.closest("label");
          const countEl = label?.querySelector(".category-count");
          if (countEl?.dataset.categoryId === key) {
            input.checked = this._categoryStates[key] !== false;
          }
        });
      });

      // Hide section if count is 0
      const mainCount = this._categoryCounts[mainId] || 0;
      section.style.display = mainCount > 0 ? "block" : "none";
    });

    // Update counts
    this._contentDiv.querySelectorAll(".category-count[data-category-id]").forEach((el) => {
      const catId = el.dataset.categoryId;
      el.textContent = this._categoryCounts[catId] || "0";
    });

    this._isUpdating = false;
  },

  _loadStates() {
    try {
      const saved = localStorage.getItem("categoryFilterStates");
      if (saved) { return JSON.parse(saved); }
    }
    catch { /* Ignore */ }

    // Default: food + shopping enabled, others disabled
    const defaults = {};
    Object.entries(CATEGORY_HIERARCHY).forEach(([mainId, mainCat]) => {
      const enabled = mainId === "food" || mainId === "shopping";
      defaults[mainId] = enabled;
      Object.keys(mainCat.subcategories).forEach((subId) => {
        defaults[`${mainId}.${subId}`] = enabled;
      });
    });
    return defaults;
  },

  _saveStates() {
    try {
      localStorage.setItem("categoryFilterStates", JSON.stringify(this._categoryStates));
    }
    catch { /* Ignore */ }
  },

  _loadDietStates() {
    try {
      const saved = localStorage.getItem("dietFilterStates");
      if (saved) { return JSON.parse(saved); }
    }
    catch { /* Ignore */ }
    // Default: all diet types enabled
    return {
      vegan_only: true,
      vegetarian_only: true,
      vegan_friendly: true,
      vegan_limited: true,
      vegetarian_friendly: true
    };
  },

  _saveDietStates() {
    try {
      localStorage.setItem("dietFilterStates", JSON.stringify(this._dietStates));
    }
    catch { /* Ignore */ }
  },

  _notifyChange() {
    this._listeners.forEach(fn => fn(this._categoryStates));
  },

  // Public API
  onChange(callback) {
    this._listeners.push(callback);
  },

  isSubCategoryEnabled(mainId, subId) {
    return this._categoryStates[`${mainId}.${subId}`] !== false;
  },

  getCategoryStates() {
    return { ...this._categoryStates };
  },

  setCategoryCounts(counts) {
    this._categoryCounts = counts;
    this._updateUI();
  },

  addDietFilter(options) {
    this._dietFilters.push(options);
    if (this._dietList) {
      this._addDietFilterToDOM(options);
    }
  },

  _addDietFilterToDOM(options) {
    const { dietKey, labelHtml, count, onToggle } = options;
    if (!this._dietList) { return; }

    const dietItem = DomUtil.create("div", "diet-filter-item", this._dietList);
    const label = DomUtil.create("label", "", dietItem);
    const checkbox = DomUtil.create("input", "", label);
    checkbox.type = "checkbox";
    checkbox.checked = this._dietStates[dietKey] !== false; // Load saved state
    checkbox.dataset.dietKey = dietKey;

    const labelSpan = DomUtil.create("span", "diet-label", label);
    labelSpan.innerHTML = labelHtml;

    const textSpan = DomUtil.create("span", "diet-text", label);
    textSpan.textContent = t(`texts.i18n_${dietKey}`) || dietKey.replace(/_/gu, " ");
    textSpan.title = t(`texts.i18n_${dietKey}_title`) || "";

    const countSpan = DomUtil.create("span", "category-count", label);
    countSpan.dataset.dietKey = dietKey;
    countSpan.textContent = count || "0";

    DomEvent.on(checkbox, "change", () => {
      this._dietStates[dietKey] = checkbox.checked;
      this._saveDietStates();
      onToggle(dietKey, checkbox.checked);
    });
  },

  updateDietCount(dietKey, count) {
    if (!this._dietList) { return; }
    const countEl = this._dietList.querySelector(`span.category-count[data-diet-key="${dietKey}"]`);
    if (countEl) { countEl.textContent = count; }
  },

  updateMarkerCounter(totalVisible, totalMarkers, viewportCount) {
    if (!this._markerCounter) { return; }
    const totalText = t("category.counter_total") || "total";
    const visibleText = t("category.counter_visible") || "visible";
    const viewportText = t("category.counter_viewport") || "in viewport";
    this._markerCounter.innerHTML = `<span style="color:#999">${totalMarkers.toLocaleString()} ${totalText}</span> | <strong style="color:#4caf50">${totalVisible.toLocaleString()}</strong> ${visibleText} | <span style="color:#666">${viewportCount.toLocaleString()} ${viewportText}</span>`;
  },

  getEnabledDietTypes() {
    // If DOM is not ready, use saved states
    if (!this._dietList) {
      const allTypes = ["vegan_only", "vegetarian_only", "vegan_friendly", "vegan_limited", "vegetarian_friendly"];
      return allTypes.filter(key => this._dietStates[key] !== false);
    }
    const checkboxes = this._dietList.querySelectorAll("input[type='checkbox']");
    if (checkboxes.length === 0) {
      const allTypes = ["vegan_only", "vegetarian_only", "vegan_friendly", "vegan_limited", "vegetarian_friendly"];
      return allTypes.filter(key => this._dietStates[key] !== false);
    }
    const enabled = [];
    checkboxes.forEach((cb) => {
      if (cb.checked) { enabled.push(cb.dataset.dietKey); }
    });
    return enabled;
  },

  updateTranslations() {
    this._createUI();
  }
});

export { CategoryFilterControl };
