/* eslint-disable capitalized-comments */
/* global i18next */

import "../third-party/i18next/i18next.min.js";

// Declare module variables
let userLanguage;
const fallbackLanguage = "en";
let languageResources = {};

// Languages (there has to be a json file for each language)
const languages = {
  de: "Deutsch",
  en: "English",
  eo: "Esperanto",
  fi: "suomi",
  fr: "Français",
  it: "Italiano",
  ko: "한국어",
  ru: "Русский"
};

function setUserLanguage(language) {
  userLanguage = language;
  if (i18next.isInitialized) {
    i18next.changeLanguage(language);
    if (language in i18next.store.data) {
      console.info(`i18n: Use language data for ${language} from storage.`);
    }
    else {
      console.info(`i18n: Load language data for ${language} from file.`);
      addLanguageResources(language);
    }
  }
  else {
    initTranslate(language);
  }
}

function getUserLanguage() {
  // 1. If set, take language from URL parameter
  // 2. Else take browser language
  // 3. If the taken language isn't one of the translated, return English

  if (userLanguage === undefined) {
    // Get language from URL
    const urlParameters = new URLSearchParams(document.location.search.substring(1));
    const urlLanguage = urlParameters.get("lang");

    if (urlLanguage) {
      console.info(`i18n: Language from URL: ${urlLanguage}`);
      userLanguage = urlLanguage;
    }
    else {
      // Get language from browser
      const browserLanguage = navigator.language.split("-")[0];
      console.info(`i18n: Browser language: ${browserLanguage}`);
      userLanguage = browserLanguage;
    }

    // Check if we support the taken language
    if (!Object.keys(languages).includes(userLanguage)) {
      console.warn(`i18n: This Website is not translated to language with language code '${userLanguage}'. Help to translate it!`);
      userLanguage = "en";
    }
  }

  return userLanguage;
}

async function addLanguageResources(language) {
  try {
    const languageFile = `./locales/${language}.json`;
    const response = await fetch(languageFile);

    if (!response.ok) {
      console.error("Error");
      throw new Error(response.statusText);
    }

    const data = await response.json();

    if (i18next.isInitialized) {
      const translations = data[language].translation;
      i18next.addResourceBundle(language, "translation", translations);
      updateContent();
    }
    else {
      // Merge new data per spread operator
      languageResources = { ...languageResources, ...data };

      if (language === fallbackLanguage) {
        initTranslate(userLanguage);
      }
      else {
        // Get fallback language resources
        await addLanguageResources(fallbackLanguage);
      }
    }
  }
  catch (err) {
    console.error(err);
  }
}

function initTranslate(language) {
  i18next.init({
    lng: language,
    fallbackLng: fallbackLanguage,
    debug: false,
    resources: languageResources
  });
}

i18next.on("languageChanged", () => {
  window.history.replaceState({}, "", updateURLParameter(window.location.href, "lang", i18next.language));
  updateContent();
});

/**
 * Add or replace a parameter (with value) in the given URL.
 * @param String url the URL
 * @param String param the parameter
 * @param String paramVal the value of the parameter
 * @return String the changed URL
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

function updateContent() {
  // Info box
  document.getElementById("content-welcome-heading").innerText = i18next.t("texts.content-welcome-heading");
  document.getElementById("content-welcome-text").innerHTML = i18next.t("texts.content-welcome-text");
  document.getElementById("content-osm-heading").innerText = i18next.t("texts.content-osm-heading");
  document.getElementById("content-osm-text").innerHTML = i18next.t("texts.content-osm-text");
  document.getElementById("content-contribute-heading").innerText = i18next.t("texts.content-contribute-heading");
  document.getElementById("content-contribute-text").innerHTML = i18next.t("texts.content-contribute-text");
  document.getElementById("content-reviews-heading").innerText = i18next.t("texts.content-reviews-heading");
  document.getElementById("content-reviews-text").innerHTML = i18next.t("texts.content-reviews-text");
  document.getElementById("content-further-heading").innerText = i18next.t("texts.content-further-heading");
  document.getElementById("content-further-text").innerHTML = i18next.t("texts.content-further-text");

  // Controls
  document.getElementsByClassName("leaflet-control-zoom-in")[0].title = i18next.t("leaflet.L-control-zoom.zoom_in");
  document.getElementsByClassName("leaflet-control-zoom-out")[0].title = i18next.t("leaflet.L-control-zoom.zoom_out");
  document.getElementsByClassName("info-button")[0].parentElement.parentElement.title = i18next.t("leaflet.L-control-infoButton.title");
  document.getElementsByClassName("leaflet-control-geocoder")[0].title = i18next.t("leaflet.L-control-geocoder.title");
  document.getElementsByClassName("leaflet-control-geocoder-form")[0].firstChild.placeholder = i18next.t("leaflet.L-control-geocoder.placeholder");
  document.getElementsByClassName("leaflet-control-geocoder-form-no-error")[0].innerText = i18next.t("leaflet.L-control-geocoder.error_message");
  document.getElementsByClassName("leaflet-control-locate")[0].firstChild.title = i18next.t("leaflet.L-control-locate.where_am_i");
  document.locateControl.options.strings.metersUnit = i18next.t("leaflet.L-control-locate.meter");
  document.locateControl.options.strings.popup = i18next.t("leaflet.L-control-locate.distance");

  // Fullscreen control
  document.fullscreenControl.link.title = i18next.t("leaflet.L-control-fullscreen.fullscreen");
  document.fullscreenControl.options.title = i18next.t("leaflet.L-control-fullscreen.fullscreen");
  document.fullscreenControl.options.titleCancel = i18next.t("leaflet.L-control-fullscreen.exitFullscreen");

  // Layer control
  document.getElementsByClassName("second-cell")[0].innerText = i18next.t("texts.i18n_vegan_only");
  document.getElementsByClassName("legend-row")[0].parentElement.parentElement.title = i18next.t("texts.i18n_vegan_only_title");
  document.getElementsByClassName("second-cell")[1].innerText = i18next.t("texts.i18n_vegetarian_only");
  document.getElementsByClassName("legend-row")[1].parentElement.parentElement.title = i18next.t("texts.i18n_vegetarian_only_title");
  document.getElementsByClassName("second-cell")[2].innerText = i18next.t("texts.i18n_vegan_friendly");
  document.getElementsByClassName("legend-row")[2].parentElement.parentElement.title = i18next.t("texts.i18n_vegan_friendly_title");
  document.getElementsByClassName("second-cell")[3].innerText = i18next.t("texts.i18n_vegan_limited");
  document.getElementsByClassName("legend-row")[3].parentElement.parentElement.title = i18next.t("texts.i18n_vegan_limited_title");

  // document.getElementsByClassName("second-cell")[4].innerText = i18next.t("texts.i18n_vegetarian_friendly");
  // document.getElementsByClassName("legend-row")[4].parentElement.parentElement.title = i18next.t("texts.i18n_vegetarian_friendly_title");

  // Set HTML lang attribute
  document.body.parentElement.lang = i18next.language;
}

export { setUserLanguage, getUserLanguage, addLanguageResources };
