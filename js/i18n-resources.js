var resources = { 
  // Dutch (nl) localization
  nl: {
    translation: {
      "lang": {
        "en": "Engels",
        "fr": "Frans",
        "de": "Duits",
        "ru": "Russisch",
        "pt": "Portugees",
        "it": "Italiaans",
        "uk": "Oekraïens",
        "nl": "Nederlands",
        "choose": "Kies taal",
      },
      "texts": {
      },
      "words": {
        "open": "open",
        "unknown": "onbekend",
        "closed": "gesloten",
      },
    },
  },
  // French (fr) localization
  fr: {
    translation: {
      "lang": {
        "en": "Anglais",
        "fr": "Français",
        "de": "Allemand",
        "ru": "Russe",
        "pt": "Portugais",
        "it": "Italien",
        "uk": "Ukrainien",
        "choose": "Choisissez la langue",
      },
      "texts": {
      },
      "words": {
        "open": "ouvert",
        "unknown": "indéterminé",
        "closed": "fermé",
      },
    },
  },
  // Russian (ru) localization
  ru: {
    translation: {
      "lang": {
        "en": "английский",
        "fr": "французский",
        "de": "немецкий",
        "ru": "русский",
        "pt": "португальский",
        "it": "итальянский",
        "uk": "украинский",
        "choose": "Выберите язык",
      },
      "texts": {
      },
      "words": {
        "open": "c",
        "unknown": "неизвестный",
        "closed": "закрыто",
      },
    },
  },
  // Portuguese (pt) localization
  pt: {
    translation: {
      "lang": {
        "en": "Inglês",
        "fr": "Francês",
        "de": "Alemão",
        "ru": "Russo",
        "it": "Italiano",
        "pt": "Português",
        "uk": "Ucraniano",
        "choose": "Escolha a sua linguagem",
      },
      "texts": {
      },
      "words": {
        "open": "Aberto de",
        "unknown": "Desconhecido",
        "closed": "Fechado",
      },
    },
  },
  // Italian (it) localization
  it: {
    translation: {
      "lang": {
        "en": "Inglese",
        "fr": "Francese",
        "de": "Tedesco",
        "ru": "Russo",
        "it": "Italiano",
        "pt": "Portoghese",
        "uk": "Ucraino",
        "choose": "Scegli lingua",
      },
      "texts": {
      },
      "words": {
        "open": "aperto",
        "unknown": "sconosciuto",
        "closed": "chiuso",
      },
    },
  },
  // Ukrainian (uk) localization
  uk: {
    translation: {
      "lang": {
        "en": "англійська",
        "fr": "французька",
        "de": "німецька",
        "ru": "російська",
        "pt": "португальська",
        "it": "италійська",
        "uk": "українська",
        "choose": "Виберіть мову",
      },
      "texts": {
      },
      "words": {
        "open": "з",
        "unknown": "невідомий",
        "closed": "зачинено",
      },
    },
  },
  // Hungarian (hu) localization
  hu: {
    translation: {
      "lang": {
        "en": "Angol",
        "fr": "Francia",
        "de": "Német",
        "ru": "Orosz",
        "pt": "Portugál",
        "it": "Olasz",
        "uk": "Ukrán",
        "nl": "Holland",
        "hu": "Magyar",
        "choose": "Nyelv kiválasztása",
      },
      "texts": {
      },
      "words": {
        "open": "nyitva",
        "unknown": "ismeretlen",
        "closed": "zárva",
      },
    },
  },
};


function getLanguage () {
  // 1. If set return language from URL paramter
  // 2. Else return browser language if we have a translation
  // 3. Else return English as fallback         ???????????????????????????????????????????????????????????????????????????
  
  
  //https://www.w3docs.com/snippets/javascript/how-to-get-url-parameters.html
  //https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams/get
  
  
  let urlParams = new URLSearchParams(document.location.search.substring(1));
  let urlLang = urlParams.get('lang');

  



  
  if (urlLang) {
    console.log("urlLang: " + urlLang);
    return urlLang;
  } else {
    let browserLang = navigator.language.split("-")[0];
    console.log("browserLang: " + urlLang);
    return browserLang;
  }
  
}



let userLanguage = getLanguage();
let fallbackLanguage = "en";
let languageRecources = {};

const languages = [
  //"de", // German
  "en", // English
  "fr", // French
  "hu", // Hungarian
  "it", // Italian
  "nl", // Dutch
  "pt", // Portuguese
  "ru", // Russian
  "uk"  // Ukrainian
]

if (!languages.includes(userLanguage)) {
  console.log("This Website is not translated to language with language code '" + userLanguage + "'. Help to translate it!");
  userLanguage = "en";
}

function getLanguageRecources(language, init) {
  fetch('./locales/' + language + '.json')
  .then(response => {
  console.log(response.status);
  if (response.ok) {
    return response.json();
  } else {
    console.log("error");
    throw new Error(response.statusText);
  }
  
  })
  .then(data => {
console.log(languageRecources);

  // Merge new data per spread operator
  languageRecources = {...languageRecources, ...data};
  console.log(languageRecources);
  
  if (init) {
    initTranslate();
  }
  
  })
  .catch(function (err) {
  console.log(err);
  });

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
  
  console.log(i18next.t('texts.i18n_vegan_limited_title'));
  
  
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



function initTranslate() {
  i18next.init({
    lng: userLanguage,
    fallbackLng: fallbackLanguage,
    debug: false,
    resources: languageRecources
  });
  updateContent();
}



// Get browser language recources
getLanguageRecources(userLanguage, false);

// Get fallback language recources
getLanguageRecources(fallbackLanguage, true);









