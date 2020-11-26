// The "use strict" directive helps to write cleaner code.
"use strict";


/* Definition (polyfill) for the function replaceAll
   for older browser versions (before 2020)
   Can be removed after some years. */
if (!String.prototype.replaceAll) {
    String.prototype.replaceAll = function (old_str, new_str){
        return this.replace(new RegExp(old_str, 'g'), new_str);
    };
}

// Define marker groups
let parentGroup = L.markerClusterGroup({showCoverageOnHover: false, maxClusterRadius: 20});
let vegan_only = L.featureGroup.subGroup(parentGroup, {});
let vegetarian_only = L.featureGroup.subGroup(parentGroup, {});
let vegan_friendly = L.featureGroup.subGroup(parentGroup, {});
let vegan_limited = L.featureGroup.subGroup(parentGroup, {});
let vegetarian_friendly = L.featureGroup.subGroup(parentGroup, {});
let map;

function veggiemap() {

  // TileLayer
  let tileOSM = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; <a href='https://openstreetmap.org'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>",
    maxZoom: 18
  });

  // Map
  map = L.map("map", {
    layers: [tileOSM],
    center: [51.42, 12.0],
    zoom: 11,
    worldCopyJump: true,
    zoomControl: false
  });

// Add zoom control
L.control.zoom({
     position:'topright',
     zoomInTitle: i18next.t('leaflet.L-control-zoom.zoom_in'),
     zoomOutTitle: i18next.t('leaflet.L-control-zoom.zoom_out')
}).addTo(map);

  // Define overlays (each marker group gets a layer) + add legend to the description
  let overlays = {
    "<div class='legendRow' title='Place which offers only vegan food.'><div class='firstCell vegan_only'></div><div class='secondCell'>vegan only</div><div class='thirdCell' id='n_vegan_only'></div></div>" : vegan_only,
    "<div class='legendRow' title='Place which offers only vegetarian and vegan food.'><div class='firstCell vegetarian_only'></div><div class='secondCell'>vegetarian only + vegan</div><div class='thirdCell' id='n_vegetarian_only'></div></div>" : vegetarian_only,
    "<div class='legendRow' title='Place which offers also vegan food.'><div class='firstCell vegan_friendly'></div><div class='secondCell'>vegan friendly</div><div class='thirdCell' id='n_vegan_friendly'></div></div>" : vegan_friendly,
    "<div class='legendRow' title='Place with limited vegan offer (usualy that means, you have to ask for it).'><div class='firstCell vegan_limited'></div><div class='secondCell'>vegan limited</div><div class='thirdCell' id='n_vegan_limited'></div></div>" : vegan_limited,
    "<div class='legendRow' title='Place which offers also vegetarian food, but no vegan.'><div class='firstCell vegetarian_friendly'></div><div class='secondCell'>vegetarian friendly</div><div class='thirdCell' id='n_vegetarian_friendly'></div></div><br /><br /><div id='date'></div>" : vegetarian_friendly
  };

  // Add marker groups to the map
  vegan_only.addTo(map);
  vegetarian_only.addTo(map);
  vegan_friendly.addTo(map);
  vegan_limited.addTo(map);
  // vegetarian_friendly.addTo(map);

  veggiemap_populate(parentGroup);

  // Add the parent marker group to the map
  parentGroup.addTo(map);

  // Add hash to the url
  let hash = new L.Hash(map);

  // Add info button
  let infoButton = L.easyButton(
    '<div class="info-button"></div>',
    function(btn, map){toggleInfo();},
    i18next.t('leaflet.L-control-infoButton.title')
  ).addTo(map);
  infoButton.setPosition('topright');

  // Add button for search places
  L.Control.geocoder({
    placeholder: i18next.t('leaflet.L-control-geocoder.placeholder'),
    errorMessage: i18next.t('leaflet.L-control-geocoder.error_message'),
    //TODO: Add title somehow, because all other buttons have titles.
  }).addTo(map);

  // Add button to search own position
  L.control.locate({
    icon: 'locate_icon',
    iconLoading: 'loading_icon',
    showCompass: true,
    strings: {
      title: i18next.t('leaflet.L-control-locate.where_am_i'),
      metersUnit: i18next.t('leaflet.L-control-locate.meter'),
      popup: i18next.t('leaflet.L-control-locate.distance'),
    },
    locateOptions: {maxZoom: 16},
    position:'topright'
  }).addTo(map);

  // Add layer control button
  L.control.layers(null, overlays).addTo(map);
}

// Function to toogle the visibility of the Info box.
function toggleInfo() {
  let element = document.getElementById('information');    // get the element of the information window
  let computedStyle = window.getComputedStyle(element);    // get the actual style information
    if (computedStyle.display != "block") {
      element.style.display = "block";
    }
    else {
      element.style.display = "none";
    }
}

// Function to put the numbers of markers into the legend.
//   The numbers are calculated using the refresh.py script and stored in the places.json file.
function stat_populate() {
  const url = "data/stat.json";
  fetch(url)
  .then(response => response.json())
  .then(data => onEachFeatureStat(data))
  .catch(error  => {console.log('Request failed', error);});
}

function onEachFeatureStat(data) {
  for (let x in data.stat[data.stat.length -1]){
    document.getElementById(x).innerHTML = data.stat[data.stat.length -1][x];
  }
}

// Function to get the information from the places json file.
function veggiemap_populate(parentGroup) {
  const url = "data/places.json";

  fetch(url)
  .then(response => response.json())
  .then(data => {L.geoJSON([data], {onEachFeature: onEachFeature});})
  .catch(error  => {console.log('Request failed', error);});
}

// Function to handle the places data.
function onEachFeature(feature) {

    // Get the Information 
    let eId  = feature.properties._id;
    let eLatLon = [feature.geometry.coordinates[1],feature.geometry.coordinates[0]];
    let eNam = feature.properties.name;
    let eTyp = feature.properties._type;
    let eCit = feature.properties.addr_city;
    let eCou = feature.properties.addr_country;
    let ePos = feature.properties.addr_postcode;
    let eStr = feature.properties.addr_street;
    let eCat = feature.properties.category;
    let eEma = feature.properties.contact_email;
    let ePho = feature.properties.contact_phone;
    let eWeb = feature.properties.contact_website;
    let eFac = feature.properties.contact_facebook;
    let eIns = feature.properties.contact_instagram;
    let eCui = feature.properties.cuisine;
    let eIco = feature.properties.icon;
    let eInf = feature.properties.more_info;
    let eOpe = feature.properties.opening_hours;
    let eSym = feature.properties.symbol;

    /*** Building the popup content ***/
    let popupContent = "<div class='mapPopupTitle'>" + eSym + " " + eNam; // Symbol and name
    
     // OSM link for popup and console outputs
    let osmUrl = "https://openstreetmap.org/"+eTyp+"/"+eId
    popupContent += "<a href='"+osmUrl+"' target='_blank' rel='noopener noreferrer'> *</a></div><hr/>";

    // Adding cuisine information to popup
    if(eCui!=undefined){popupContent += "<div class='popupflex-container'><div>👩‍🍳</div><div>" + eCui.replaceAll(";", ", ").replaceAll("_", " ") +"</div></div>"}

    // Address
    let eAddr = ""
    // Collecting address information
    if(eStr!=undefined){eAddr += eStr +"<br/>"} // Street
    if(ePos!=undefined){eAddr += ePos +" "}     // Postcode
    if(eCit!=undefined){eAddr += eCit +" "}     // City
    // if(eCou!=undefined){eAddr += eCou}       // Country

    // Adding address information to popup
    if(eAddr!=""){popupContent += "<div class='popupflex-container'><div>📍</div><div>" + eAddr +"</div></div>"
    } else {
      console.log("-W- " + eNam + " without address information. - " + osmUrl)
    }

    // Adding opening hours to popup
    if(eOpe!=undefined){
      // Country: Germany
      let country_code = 'de';
      // State: Sachsen-Anhalt
      let state = 'st';
      // Get browser language for the warnings and the prettifier
      let locale = navigator.language.split('-')[0];
      //Create opening_hours object
      let oh = new opening_hours(eOpe, {
          'lat':eLatLon[0],'lon':[0], 'address': {'country_code':country_code, 'state':state}},
          {'locale':locale});
      let prettified_value = oh.prettifyValue({conf: {'locale':locale, 'rule_sep_string': '<br />', 'print_semicolon': false, 'sep_one_day_between': ', '}});
      prettified_value = prettified_value.replaceAll(',', ', ').replaceAll('PH', i18next.t('words.public_holiday'));
      // Find out the open state
      let open_state = '';
      let open_state_emoji = '';
      if(oh.getState()){
        open_state = i18next.t('words.open');
        open_state_emoji = 'open';
        if(!oh.isOpenInMinutes()){
          open_state += i18next.t('texts.will close soon');
          open_state_emoji = 'closes_soon';
        }
      } else {
        open_state = i18next.t('words.closed');
        open_state_emoji = 'closed';
        if(oh.isOpenInMinutes()){
          open_state += i18next.t('texts.will open soon');
          open_state_emoji = 'opens_soon';
        }
      }
      // Append opening hours to the popup
      popupContent += "<div class='popupflex-container'><div>🕖</div><div><span class='open_state_circle " + open_state_emoji + "'></span>" + open_state + "<br />" + prettified_value + "</div></div>";
    } else {
      // Output console warning if there is no opening_hours
      console.log("-W- " + eNam + " (" + eStr + ") without opening hours. - " + osmUrl)
    }
    
    // Adding addidtional information to popup
    if(ePho!=undefined){popupContent += "<div class='popupflex-container'><div>☎️</div><div><a href='tel:" + ePho + "' target='_blank' rel='noopener noreferrer'>" + ePho + "</a></div></div>"}
    if(eEma!=undefined){popupContent += "<div class='popupflex-container'><div>📧</div><div><a href='mailto:" + eEma + "' target='_blank' rel='noopener noreferrer'>" + eEma + "</a></div></div>"}
    if(eWeb!=undefined){popupContent += "<div class='popupflex-container'><div>🌐</div><div><a href='" + eWeb + "' target='_blank' rel='noopener noreferrer'>" + eWeb.replace("https://", "") + "</a></div></div>"}
    if(eFac!=undefined){popupContent += "<div class='popupflex-container'><div>🇫</div><div><a href='" + eFac + "' target='_blank' rel='noopener noreferrer'>" + decodeURI(eFac).replace("https://", "") + "</a></div></div>"}
    if(eIns!=undefined){popupContent += "<div class='popupflex-container'><div>📸</div><div><a href='" + eIns + "' target='_blank' rel='noopener noreferrer'>" + eIns.replace("https://", "") + "</a></div></div>"}
    if(eInf){popupContent += "<hr/><div class='popupflex-container'><div>ℹ️</div><div><a href=\"https://www.vegan-in-halle.de/wp/leben/vegane-stadtkarte/#"+eTyp+eId+"\" target=\"_top\">" + i18next.t('texts.more_info') + "</a></div>"}

    // Adding the marker to the map
    L.marker(eLatLon,{title:eSym + " " + eNam,icon:getIcon(eIco, eCat)}).bindPopup(popupContent).addTo(eval(eCat));
}


// Adding function for opening_hours objects to check if place will be open after n minutes
if (!opening_hours.prototype.isOpenInMinutes) {
  opening_hours.prototype.isOpenInMinutes = function(minutes = 60) {
    let nowPlusHours = new Date();
    nowPlusHours.setUTCMinutes(nowPlusHours.getUTCMinutes()+minutes);
    return this.getState(nowPlusHours);
  };
}

// Put the markers to the map
veggiemap();

// Put the numbers into the legend
stat_populate();
