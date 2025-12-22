/**
 * Modern i18n implementation for Veggiekarte
 * - English embedded in bundle (instant, no loading)
 * - Other languages loaded dynamically via import()
 * - Flat key-value structure (simple lookup)
 */

import fallbackTranslations from "../locales/en.js";

// Module state
let currentLanguage;
const fallbackLanguage = "en";
let translations = fallbackTranslations;
const languageChangeListeners = [];

// Supported languages
const languages = {
  ca: "Català",
  de: "Deutsch",
  en: "English",
  eo: "Esperanto",
  es: "Español",
  fi: "suomi",
  fr: "Français",
  it: "Italiano",
  ko: "한국어",
  ru: "Русский"
};

/**
 * Translate a key to the current language
 * @param {string} key - Translation key (e.g. "category_food_restaurant")
 * @returns {string} Translated string or key if not found
 */
// eslint-disable-next-line id-length
function t(key) {
  // Support both dot and underscore notation for compatibility
  const normalized = key.replaceAll(".", "_");
  return translations[normalized] || fallbackTranslations[normalized] || key;
}

/**
 * Get the current language (from localStorage, browser, or default)
 */
function getUserLanguage() {
  if (currentLanguage === undefined) {
    const storedLang = localStorage.getItem("veggiekarte_language");

    currentLanguage = storedLang || navigator.language.split("-")[0];
    console.info(`i18n: Language: ${currentLanguage}`);

    if (!Object.keys(languages).includes(currentLanguage)) {
      console.warn(`i18n: Language '${currentLanguage}' not supported, using ${fallbackLanguage}`);
      currentLanguage = fallbackLanguage;
    }
  }
  return currentLanguage;
}

/**
 * Load and activate a language
 */
async function addLanguageResources(language) {
  currentLanguage = language;

  if (language === fallbackLanguage) {
    translations = fallbackTranslations;
    console.info("i18n: Using embedded English");
  }
  else {
    try {
      const module = await import(`../locales/${language}.js`);
      translations = module.default;
      console.info(`i18n: Loaded ${language}`);
    }
    catch (err) {
      console.error(`i18n: Failed to load ${language}:`, err);
      translations = fallbackTranslations;
      currentLanguage = fallbackLanguage;
    }
  }

  // Save language preference and notify listeners
  localStorage.setItem("veggiekarte_language", currentLanguage);
  languageChangeListeners.forEach(fn => fn());
}

/**
 * Alias for compatibility
 */
const setUserLanguage = addLanguageResources;

/**
 * Register callback for language changes
 */
function onLanguageChange(callback) {
  languageChangeListeners.push(callback);
}

/**
 * Update all translated content in the page
 */
function updateContent() {
  // Info box
  document.getElementById("content-welcome-heading").innerText = t("texts_content_welcome_heading");
  document.getElementById("content-welcome-text").innerHTML = t("texts_content_welcome_text");
  document.getElementById("content-osm-heading").innerText = t("texts_content_osm_heading");
  document.getElementById("content-osm-text").innerHTML = t("texts_content_osm_text");
  document.getElementById("content-contribute-heading").innerText = t("texts_content_contribute_heading");
  document.getElementById("content-contribute-text").innerHTML = t("texts_content_contribute_text");
  document.getElementById("content-reviews-heading").innerText = t("texts_content_reviews_heading");
  document.getElementById("content-reviews-text").innerHTML = t("texts_content_reviews_text");
  document.getElementById("content-further-heading").innerText = t("texts_content_further_heading");
  document.getElementById("content-further-text").innerHTML = t("texts_content_further_text");

  // Show content now that translations are loaded
  document.getElementById("content")?.classList.add("loaded");

  // Update controls (only if they exist - may not be ready on initial load)
  const controlUpdates = [
    { selector: ".leaflet-control-zoom-in", prop: "title", key: "leaflet_L_control_zoom_zoom_in" },
    { selector: ".leaflet-control-zoom-out", prop: "title", key: "leaflet_L_control_zoom_zoom_out" },
    { selector: ".info-button", prop: "title", key: "leaflet_L_control_infoButton_title", getEl: el => el?.parentElement?.parentElement },
    { selector: ".leaflet-control-geocoder", prop: "title", key: "leaflet_L_control_geocoder_title" },
    { selector: ".leaflet-control-geocoder-form input", prop: "placeholder", key: "leaflet_L_control_geocoder_placeholder" },
    { selector: ".leaflet-control-geocoder-form-no-error", prop: "innerText", key: "leaflet_L_control_geocoder_error_message" },
    { selector: ".leaflet-control-locate a", prop: "title", key: "leaflet_L_control_locate_where_am_i" }
  ];

  controlUpdates.forEach(({ selector, prop, key, getEl }) => {
    const el = getEl ? getEl(document.querySelector(selector)) : document.querySelector(selector);
    if (el) { el[prop] = t(key); }
  });

  // Special controls with nested properties
  if (document.locateControl) {
    document.locateControl.options.strings.metersUnit = t("leaflet_L_control_locate_meter");
    document.locateControl.options.strings.popup = t("leaflet_L_control_locate_distance");
  }
  if (document.fullscreenControl) {
    document.fullscreenControl.link.title = t("leaflet_L_control_fullscreen_fullscreen");
    document.fullscreenControl.options.title = t("leaflet_L_control_fullscreen_fullscreen");
    document.fullscreenControl.options.titleCancel = t("leaflet_L_control_fullscreen_exitFullscreen");
  }

  // Language selector control
  const langButton = document.querySelector(".leaflet-control-languageselector-button");
  if (langButton) {
    const langTitle = t("leaflet_L_control_languageselector_title");
    langButton.title = langTitle;
    langButton.setAttribute("aria-label", langTitle);
  }

  // Update category filter control translations
  window.categoryFilterControl?.updateTranslations();

  // Set HTML lang attribute
  document.body.parentElement.lang = currentLanguage;
}

// Initialize on module load
onLanguageChange(updateContent);

export { setUserLanguage, getUserLanguage, addLanguageResources, t };
