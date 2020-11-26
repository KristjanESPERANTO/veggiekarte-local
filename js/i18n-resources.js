// localization
var resources = { // English is fallback language.
    // English (en) localization
    en: {
        translation: {
            "lang": {
                "en": "English",
                "fr": "French",
                "de": "German",
                "ru": "Russian",
                "pt": "Portuguese",
                "it": "Italian",
                "uk": "Ukrainian",
                "nl": "Dutch language",
                "hu": "Hungarian",
                "choose": "Choose Language",
            },
            "texts": {
                "will open soon": ', but will open soon',
                "will close soon": ', but will close soon',
                "more_info": 'More information',
            },
            "words": {
                "open": "open",
                "unknown": "unknown",
                "closed": "closed",
                "public_holiday": "holiday",
            },
            "leaflet": {
                "L-control-geocoder": {
                    "placeholder": "Search…",
                    "error_message": "Nothing found.",
                },
                "L-control-infoButton": {
                    "title": "Information about this site",
                },
                "L-control-locate": {
                    "where_am_i": "Show me where I am!",
                    "meter": "meters",
                    "distance": "You are within {distance} {unit} from this point.",
                },
                "L-control-zoom": {
                    "zoom_in": "zoom in",
                    "zoom_out": "zoom out",
                },
            },
        },
    },
    // German (de) localization
    de: {
        translation: {
            "lang": {
                "en": "Englisch",
                "fr": "Französisch",
                "de": "Deutsch",
                "ru": "Russisch",
                "pt": "Portugiesisch",
                "it": "Italienisch",
                "uk": "Ukrainisch",
                "choose": "Wähle eine Sprache",
            },
            "texts": {
                "will open soon": ', aber wird bald öffnen',
                "will close soon": ', aber wird bald schließen',
                "more_info": 'Mehr Infos',
            },
            "words": {
                "open": "geöffnet",
                "unknown": "unbekannt",
                "closed": "geschlossen",
                "public_holiday": "Feiertag",
            },
            "leaflet": {
                "L-control-geocoder": {
                    "placeholder": "Nach Ortsnamen suchen…",
                    "error_message": "Nichts gefunden.",
                },
                "L-control-infoButton": {
                    "title": "Informationen über diese Seite",
                },
                "L-control-locate": {
                    "where_am_i": "Standort ermitteln",
                    "meter": "Meter",
                    "distance": "Du befindest dich maximal {distance} {unit} entfernt von diesem Punkt.",
                },
                "L-control-zoom": {
                    "zoom_in": "hineinzoomen",
                    "zoom_out": "herauszoomen",
                },
            },
        },
    },
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


i18next.init({
    lng: navigator.language,
    fallbackLng: 'en',
    debug: false,
    resources: resources
});
