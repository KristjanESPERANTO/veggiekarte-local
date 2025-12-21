/**
 * Simple i18n implementation for Veggiekarte
 * Replaces i18next with a lightweight solution for basic key-value translations
 */

// Module state
let currentLanguage;
const fallbackLanguage = "en";
const translations = {}; // { lang: { key: value } }
const languageChangeListeners = [];

// Supported languages (there has to be a json file for each language)
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
 * @param {string} key - Translation key (e.g. "texts.content-osm-heading")
 * @returns {string} Translated string or key if not found
 */
// eslint-disable-next-line id-length
function t(key) {
  const lang = currentLanguage || fallbackLanguage;

  // Try current language
  if (translations[lang]) {
    const value = getNestedValue(translations[lang], key);
    if (value !== undefined) { return value; }
  }

  // Fallback to English
  if (lang !== fallbackLanguage && translations[fallbackLanguage]) {
    const value = getNestedValue(translations[fallbackLanguage], key);
    if (value !== undefined) { return value; }
  }

  return key; // Return key if translation not found
}

/**
 * Get nested object value by dot notation key
 * @param {object} obj - Object to search
 * @param {string} key - Dot-separated key (e.g. "texts.heading")
 * @returns {any} Value or undefined
 */
function getNestedValue(obj, key) {
  return key.split(".").reduce((current, part) => current?.[part], obj);
}

/**
 * Set the current language and trigger updates
 * @param {string} language - Language code
 */
function setUserLanguage(language) {
  currentLanguage = language;

  if (translations[language]) {
    console.info(`i18n: Use language data for ${language} from storage.`);
    notifyLanguageChange();
  }
  else {
    console.info(`i18n: Load language data for ${language} from file.`);
    addLanguageResources(language);
  }
}

/**
 * Get the current language (from URL, browser, or default)
 * @returns {string} Language code
 */
function getUserLanguage() {
  if (currentLanguage === undefined) {
    // 1. Try URL parameter
    const urlParameters = new URLSearchParams(document.location.search);
    const urlLanguage = urlParameters.get("lang");

    if (urlLanguage) {
      console.info(`i18n: Language from URL: ${urlLanguage}`);
      currentLanguage = urlLanguage;
    }
    else {
      // 2. Try browser language
      const browserLanguage = navigator.language.split("-")[0];
      console.info(`i18n: Browser language: ${browserLanguage}`);
      currentLanguage = browserLanguage;
    }

    // 3. Check if we support the language
    if (!Object.keys(languages).includes(currentLanguage)) {
      console.warn(`i18n: This Website is not translated to language with language code '${currentLanguage}'. Help to translate it!`);
      currentLanguage = fallbackLanguage;
    }
  }

  return currentLanguage;
}

/**
 * Load translation resources for a language
 * @param {string} language - Language code to load
 */
async function addLanguageResources(language) {
  try {
    const languageFile = `./locales/${language}.json`;
    const response = await fetch(languageFile);

    if (!response.ok) {
      throw new Error(`Failed to load ${languageFile}: ${response.statusText}`);
    }

    const data = await response.json();
    translations[language] = data[language].translation;

    // Load fallback language if needed
    if (language !== fallbackLanguage && !translations[fallbackLanguage]) {
      await addLanguageResources(fallbackLanguage);
    }

    notifyLanguageChange();
  }
  catch (err) {
    console.error(`i18n: Error loading language ${language}:`, err);
  }
}

/**
 * Notify all listeners that the language changed
 */
function notifyLanguageChange() {
  window.history.replaceState({}, "", updateURLParameter(window.location.href, "lang", currentLanguage));
  languageChangeListeners.forEach(fn => fn());
}

/**
 * Register a callback for language changes
 * @param {Function} callback - Function to call when language changes
 */
function onLanguageChange(callback) {
  languageChangeListeners.push(callback);
}

/**
 * Add or replace a parameter (with value) in the given URL.
 * @param {string} url - the URL
 * @param {string} param - the parameter
 * @param {string} paramVal - the value of the parameter
 * @returns {string} the changed URL
 */
function updateURLParameter(url, param, paramVal) {
  let theAnchor;
  let newAdditionalURL = "";
  let tempArray = url.split("?");
  let baseURL = tempArray[0];
  let additionalURL = tempArray[1];
  let temp = "";

  if (additionalURL) {
    const tmpAnchor = additionalURL.split("#");
    const theParams = tmpAnchor[0];
    theAnchor = tmpAnchor[1];
    if (theAnchor) {
      additionalURL = theParams;
    }

    tempArray = additionalURL.split("&");

    for (let i = 0; i < tempArray.length; i += 1) {
      if (tempArray[i].split("=")[0] !== param) {
        newAdditionalURL += temp + tempArray[i];
        temp = "&";
      }
    }
  }
  else {
    const tmpAnchor = baseURL.split("#");
    const theParams = tmpAnchor[0];
    theAnchor = tmpAnchor[1];

    if (theParams) {
      baseURL = theParams;
    }
  }
  const rowsTxt = `${temp}${param}=${paramVal}#${theAnchor}`;
  return `${baseURL}?${newAdditionalURL}${rowsTxt}`;
}

/**
 * Update all translated content in the page
 */
function updateContent() {
  // Info box
  document.getElementById("content-welcome-heading").innerText = t("texts.content-welcome-heading");
  document.getElementById("content-welcome-text").innerHTML = t("texts.content-welcome-text");
  document.getElementById("content-osm-heading").innerText = t("texts.content-osm-heading");
  document.getElementById("content-osm-text").innerHTML = t("texts.content-osm-text");
  document.getElementById("content-contribute-heading").innerText = t("texts.content-contribute-heading");
  document.getElementById("content-contribute-text").innerHTML = t("texts.content-contribute-text");
  document.getElementById("content-reviews-heading").innerText = t("texts.content-reviews-heading");
  document.getElementById("content-reviews-text").innerHTML = t("texts.content-reviews-text");
  document.getElementById("content-further-heading").innerText = t("texts.content-further-heading");
  document.getElementById("content-further-text").innerHTML = t("texts.content-further-text");

  // Show content now that translations are loaded
  const content = document.getElementById("content");
  if (content) {
    content.classList.add("loaded");
  }

  // Controls
  document.getElementsByClassName("leaflet-control-zoom-in")[0].title = t("leaflet.L-control-zoom.zoom_in");
  document.getElementsByClassName("leaflet-control-zoom-out")[0].title = t("leaflet.L-control-zoom.zoom_out");
  document.getElementsByClassName("info-button")[0].parentElement.parentElement.title = t("leaflet.L-control-infoButton.title");
  document.getElementsByClassName("leaflet-control-geocoder")[0].title = t("leaflet.L-control-geocoder.title");
  document.getElementsByClassName("leaflet-control-geocoder-form")[0].firstChild.placeholder = t("leaflet.L-control-geocoder.placeholder");
  document.getElementsByClassName("leaflet-control-geocoder-form-no-error")[0].innerText = t("leaflet.L-control-geocoder.error_message");
  document.getElementsByClassName("leaflet-control-locate")[0].firstChild.title = t("leaflet.L-control-locate.where_am_i");
  document.locateControl.options.strings.metersUnit = t("leaflet.L-control-locate.meter");
  document.locateControl.options.strings.popup = t("leaflet.L-control-locate.distance");

  // Fullscreen control
  document.fullscreenControl.link.title = t("leaflet.L-control-fullscreen.fullscreen");
  document.fullscreenControl.options.title = t("leaflet.L-control-fullscreen.fullscreen");
  document.fullscreenControl.options.titleCancel = t("leaflet.L-control-fullscreen.exitFullscreen");

  // Language selector control
  const langButton = document.querySelector(".leaflet-control-languageselector-button");
  if (langButton) {
    const langTitle = t("leaflet.L-control-languageselector.title");
    langButton.title = langTitle;
    langButton.setAttribute("aria-label", langTitle);
  }

  // Update category filter control translations
  if (window.categoryFilterControl && window.categoryFilterControl.updateTranslations) {
    window.categoryFilterControl.updateTranslations();
  }

  // Set HTML lang attribute
  document.body.parentElement.lang = currentLanguage;
}

// Initialize on module load
onLanguageChange(updateContent);

export { setUserLanguage, getUserLanguage, addLanguageResources, t };
