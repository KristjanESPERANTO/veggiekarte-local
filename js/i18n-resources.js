// The "use strict" directive helps to write cleaner code.
"use strict";

//TODO: - Rename this file
//      - translate cuisine


// Languages (there has to be a json file for each language)
const languages = {
	de: 'Deutsch',
	en: 'English',
	eo: 'Esperanto',
	fi: 'Suomi',
	fr: 'Français'
};

function getUserLanguage () {
  // 1. If set, take language from URL paramter
  // 2. Else take browser language
  // 3. If the taken language isn't one of the translated, return English 

  let language;
  
  // Get language from URL
  let urlParameters = new URLSearchParams(document.location.search.substring(1));
  let urlLanguage = urlParameters.get('lang');

  if (urlLanguage != undefined) {
    console.log("Language from URL: " + urlLanguage);
    language = urlLanguage;
  } else {
	// Get language from browser
    let browserLanguage = navigator.language.split("-")[0];
    console.log("Browser language: " + browserLanguage);
    language = browserLanguage;
  }

  // Check if we support the taken language
  if (!Object.keys(languages).includes(language)) {
    console.log("This Website is not translated to language with language code '" + language + "'. Help to translate it!");
    language = "en";
  }

  return language;
}


function getLanguageRecources(userLanguage, init) {
  let languageFile = './locales/' + userLanguage + '.json';
  fetch(languageFile)
  .then(response => {
  if (response.ok) {
    return response.json();
  } else {
    console.log("error");
    throw new Error(response.statusText);
  }
  
  })
  .then(data => {

    // Merge new data per spread operator
    languageRecources = {...languageRecources, ...data};

    if (init) {
      initTranslate();
    } else {
      // Get fallback language recources
      getLanguageRecources(fallbackLanguage, true);
    }  
  
  })
  .catch(function (err) {
    console.log(err);
  });

}



function initTranslate() {
  if (!initialized) {
    i18next.init({
      lng: userLanguage,
	  fallbackLng: fallbackLanguage,
      debug: false,
      resources: languageRecources
    });
	initialized = true;
  }
  
  updateContent();
}




function updateContent() {

  // Controls
  document.getElementsByClassName('leaflet-control-zoom-in')[0].title = i18next.t('leaflet.L-control-zoom.zoom_in');
  document.getElementsByClassName('leaflet-control-zoom-out')[0].title = i18next.t('leaflet.L-control-zoom.zoom_out');
  document.getElementsByClassName('info-button')[0].parentElement.parentElement.title = i18next.t('leaflet.L-control-infoButton.title');
  document.getElementsByClassName('leaflet-control-geocoder')[0].title = i18next.t('leaflet.L-control-geocoder.title');
  document.getElementsByClassName('leaflet-control-geocoder-form')[0].firstChild.placeholder = i18next.t('leaflet.L-control-geocoder.placeholder');
  document.getElementsByClassName('leaflet-control-geocoder-form-no-error')[0].innerText = i18next.t('leaflet.L-control-geocoder.error_message');
  document.getElementsByClassName('leaflet-control-locate')[0].firstChild.title = i18next.t('leaflet.L-control-locate.where_am_i');
  locate_control.options.strings.metersUnit = i18next.t('leaflet.L-control-locate.meter');
  locate_control.options.strings.popup = i18next.t('leaflet.L-control-locate.distance');
  
  // Legend
  // document.getElementById('i18n_vegan_only').innerText = i18next.t('texts.i18n_vegan_only');
  // document.getElementById('i18n_vegetarian_only').innerText = i18next.t('texts.i18n_vegetarian_only');
  // document.getElementById('i18n_vegan_friendly').innerText = i18next.t('texts.i18n_vegan_friendly');
  // document.getElementById('i18n_vegan_limited').innerText = i18next.t('texts.i18n_vegan_limited');
  // document.getElementById('i18n_vegetarian_friendly').innerText = i18next.t('texts.i18n_vegetarian_friendly');
  
  
  //(layerContol._overlaysList).getElementById('i18n_vegetarian_friendly').innerHTML = i18next.t('texts.i18n_vegetarian_friendly');
  
  console.log(layerContol._overlaysList.innerHTML);
  
  
  let legendHTML = '<label for="x"><div><input id="x" type="checkbox" class="leaflet-control-layers-selector" checked=""><span><div class="legendRow" title="' +
                   i18next.t('texts.i18n_vegan_only_title') +
                   '"><div class="firstCell vegan_only"></div><div class="secondCell">' +
                   i18next.t('texts.i18n_vegan_only') +
                   '</div><div class="thirdCell" id="n_vegan_only"></div></div></span></div></label>' +
                   '<label><div><input type="checkbox" class="leaflet-control-layers-selector" checked=""><span><div class="legendRow" title="' +
                   i18next.t('texts.i18n_vegetarian_only_title') +
                   '"><div class="firstCell vegetarian_only"></div><div class="secondCell">' +
                   i18next.t('texts.i18n_vegetarian_only') +
                   '</div><div class="thirdCell" id="n_vegetarian_only"></div></div></span></div></label>' +
                   '<label><div><input type="checkbox" class="leaflet-control-layers-selector" checked=""><span> <div class="legendRow" title="' +
                   i18next.t('texts.i18n_vegan_friendly_title') +
                   '"><div class="firstCell vegan_friendly"></div><div class="secondCell">' +
                   i18next.t('texts.i18n_vegan_friendly') +
                   '</div><div class="thirdCell" id="n_vegan_friendly"></div></div></span></div></label>' +
                   '<label><div><input type="checkbox" class="leaflet-control-layers-selector" checked=""><span> <div class="legendRow" title="' +
                   i18next.t('texts.i18n_vegan_limited_title') +
                   '"><div class="firstCell vegan_limited"></div><div class="secondCell">' +
                   i18next.t('texts.i18n_vegan_limited') +
                   '</div><div class="thirdCell" id="n_vegan_limited"></div></div></span></div></label>' +
                   '<label><div><input type="checkbox" class="leaflet-control-layers-selector" checked=""><span> <div class="legendRow" title="' +
                   i18next.t('texts.i18n_vegetarian_friendly_title') +
                   '"><div class="firstCell vegetarian_friendly"></div><div class="secondCell">' +
                   i18next.t('texts.i18n_vegetarian_friendly') +
                   '</div><div class="thirdCell" id="n_vegetarian_friendly"></div></div><br><br><div id="date"></div></span></div></label>';
  
    //document.getElementsByClassName('leaflet-control-layers-selector')[0].nextElementSibling.innerText = i18next.t('leaflet.L-control-zoom.zoom_in');
  document.getElementsByClassName('legendRow')[0].innerText = i18next.t('leaflet.L-control-zoom.zoom_in');  
  document.getElementsByClassName('leaflet-control-layers-overlays')[0].children[0].title = i18next.t('leaflet.L-control-zoom.zoom_in');
  
  
  console.log(legendHTML);
  //SSlayerContol._overlaysList.innerHTML = legendHTML;
  console.log(layerContol._overlaysList.innerHTML);
  
  // Infobox
  document.getElementById('content-welcome-heading').innerText = i18next.t('texts.content-welcome-heading');
  document.getElementById('content-welcome-text').innerHTML = i18next.t('texts.content-welcome-text');
  document.getElementById('content-osm-heading').innerText = i18next.t('texts.content-osm-heading');
  document.getElementById('content-osm-text').innerHTML = i18next.t('texts.content-osm-text');
  document.getElementById('content-contribute-heading').innerText = i18next.t('texts.content-contribute-heading');
  document.getElementById('content-contribute-text').innerHTML = i18next.t('texts.content-contribute-text');
  document.getElementById('content-further-heading').innerText = i18next.t('texts.content-further-heading');
  document.getElementById('content-further-text').innerHTML = i18next.t('texts.content-further-text');
  
}

let languageRecources = {};
let initialized = false;
let fallbackLanguage = "en";
let userLanguage = getUserLanguage();





// Get language recources
getLanguageRecources(userLanguage, false);


