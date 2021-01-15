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
let issue_number_1 = L.featureGroup.subGroup(parentGroup, {});
let issue_number_2 = L.featureGroup.subGroup(parentGroup, {});
let issue_number_3 = L.featureGroup.subGroup(parentGroup, {});
let issue_number_4 = L.featureGroup.subGroup(parentGroup, {});
let issue_number_5 = L.featureGroup.subGroup(parentGroup, {});
let issue_number_6 = L.featureGroup.subGroup(parentGroup, {});
let issue_number_many = L.featureGroup.subGroup(parentGroup, {});
let subgroups = { issue_number_1, issue_number_2, issue_number_3, issue_number_4, issue_number_5, issue_number_6, issue_number_many };

let map;


function veggiemap() {

  // TileLayer
  let tileOSM = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap contributors</a>",
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
L.control.zoom().addTo(map);

  // Define overlays (each marker group gets a layer) + add legend to the description
  let overlays = {
    "<div class='legendRow'><div class='firstCell vegan_only'></div><div class='secondCell'>1 issue</div><div class='thirdCell' id='n_vegan_only'></div></div>" : issue_number_1,
    "<div class='legendRow'><div class='firstCell vegetarian_only'></div><div class='secondCell'>2 issues</div><div class='thirdCell' id='n_vegetarian_only'></div></div>" : issue_number_2,
    "<div class='legendRow'><div class='firstCell vegan_friendly'></div><div class='secondCell'>3 issues</div><div class='thirdCell' id='n_vegan_friendly'></div></div>" : issue_number_3,
    "<div class='legendRow'><div class='firstCell vegan_limited'></div><div class='secondCell'>4 issues</div><div class='thirdCell' id='n_vegan_limited'></div></div>" : issue_number_4,
    "<div class='legendRow'><div class='firstCell vegetarian_friendly'></div><div class='secondCell'>5 issues</div><div class='thirdCell' id='7'></div></div>" : issue_number_5,
    "<div class='legendRow'><div class='firstCell vegetarian_friendly'></div><div class='secondCell'>6 issues</div><div class='thirdCell' id='6'></div></div>" : issue_number_6,
    "<div class='legendRow'><div class='firstCell vegetarian_friendly'></div><div class='secondCell'>more than 6</div><div class='thirdCell' id='n_vegetarian_friendly'></div></div><br /><br /><div id='date'></div>" : issue_number_many
  };

  veggiemap_populate(parentGroup);

  // Enable the on-demand popup and tooltip calculation
  parentGroup.bindPopup(calculatePopup);
  parentGroup.bindTooltip(calculateTooltip);

  // Close the tooltip when opening the popup
  parentGroup.on("click", function(e){
    if(parentGroup.isPopupOpen()){
      parentGroup.closeTooltip();
    }
  })

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
  for (let category in data.stat[data.stat.length -1]){
    let number_of_elements = data.stat[data.stat.length -1][category];
    document.getElementById(category).innerHTML = "(" + number_of_elements + ")";
  }
}

// Function to get the information from the places json file.
function veggiemap_populate(parentGroup) {
  const url = "data/check_results.json";
  fetch(url)
  .then(response => response.json())
  .then(geojson => geojsonToMarkerGroups(geojson.features))
  .then(markerGroups => {
    Object.entries(subgroups).forEach(([key, subgroup]) => {
      // Bulk add all the markers from a markerGroup to a subgroup in one go
      // Source: https://github.com/ghybs/Leaflet.FeatureGroup.SubGroup/issues/5
      subgroup.addLayer(L.layerGroup(markerGroups[key]));
      map.addLayer(subgroup);
    });

    // Don't show markers with only 1 issue
    map.removeLayer(issue_number_1);

    // Reveal all the markers and clusters on the map in one go
    map.addLayer(parentGroup);

    // Call the function to put the numbers into the legend
    stat_populate();


  })
  .catch(error  => {console.log('Request failed', error);});
}

// Process the places GeoJSON into the groups of markers
function geojsonToMarkerGroups(features) {
    const groups = {};
    groups["vegan_only"] = [];
    features.forEach(feature => {
        let eCat = "issue_number_"
        if (feature.properties.issue_number > 6) {
          eCat += feature.properties.many;
        } else {
          eCat += feature.properties.issue_number;
        }
        if (!groups[eCat]) groups[eCat] = [];

      
        groups[eCat].push(getMarker(feature));
    });
    return groups;
}

// Function to get the marker.
function getMarker(feature) {
    let eLatLon = [feature.geometry.coordinates[1],feature.geometry.coordinates[0]];
    let eNam = feature.properties.name;

    let marker = L.marker(eLatLon);
    marker.feature = feature;
    return marker;
}

// Calculate tooltip content for a given marker layer
function calculateTooltip(layer) {
    let feature = layer.feature;
    let eNam = feature.properties.name;
    return eNam;
}

// Calculate popup content for a given marker layer
function calculatePopup(layer) {
    // Get the information
    let feature = layer.feature;
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
    let eIco = feature.properties.icon;
    let eInf = feature.properties.more_info;
    let eOpe = feature.properties.opening_hours;
    let eSym = feature.properties.symbol;

    /*** Building the popup content ***/
    let popupContent = "<div class='mapPopupTitle'>" + eNam + "</div>"; // Name

    // OSM link for popup
    let osmUrl = "https://openstreetmap.org/"+eTyp+"/"+eId;
    popupContent += "<div><a href='"+osmUrl+"' target='_blank' rel='noopener noreferrer'>(Edit on OpenStreetMap)</a></div><hr/>"; // OSM link

    // Add undefined keys
    feature.properties.undefined.forEach(key => popupContent += "<div>'"+key+"' is undefined</div>")
    
    // Add issues
    feature.properties.issues.forEach(issue => popupContent += "<div>"+issue+"</div>")


  
    // Address
    let eAddr = ""
    // Collecting address information
    if(eStr!=undefined){eAddr += eStr +"<br/>"}  // Street
    if(ePos!=undefined){eAddr += ePos +" "}      // Postcode
    if(eCit!=undefined){eAddr += eCit +" "}      // City
    //if(eCou!=undefined){eAddr += "<br/>" + eCou} // Country

    // Adding address information to popup
    if(eAddr!=""){popupContent += "<div class='popupflex-container'><div>📍</div><div>" + eAddr +"</div></div>"}


    // Adding addidtional information to popup
    if(ePho!=undefined){popupContent += "<div class='popupflex-container'><div>☎️</div><div><a href='tel:" + ePho + "' target='_blank' rel='noopener noreferrer'>" + ePho + "</a></div></div>"}
    if(eEma!=undefined){popupContent += "<div class='popupflex-container'><div>📧</div><div><a href='mailto:" + eEma + "' target='_blank' rel='noopener noreferrer'>" + eEma + "</a></div></div>"}
    if(eWeb!=undefined){popupContent += "<div class='popupflex-container'><div>🌐</div><div><a href='" + eWeb + "' target='_blank' rel='noopener noreferrer'>" + eWeb.replace("https://", "") + "</a></div></div>"}
    if(eFac!=undefined){popupContent += "<div class='popupflex-container'><div>🇫</div><div><a href='" + eFac + "' target='_blank' rel='noopener noreferrer'>" + decodeURI(eFac).replace("https://", "") + "</a></div></div>"}
    if(eIns!=undefined){popupContent += "<div class='popupflex-container'><div>📸</div><div><a href='" + eIns + "' target='_blank' rel='noopener noreferrer'>" + eIns.replace("https://", "") + "</a></div></div>"}
    if(eInf!=undefined){popupContent += "<hr/><div class='popupflex-container'><div>ℹ️</div><div><a href=\"https://www.vegan-in-halle.de/wp/leben/vegane-stadtkarte/#"+eTyp+eId+"\" target=\"_top\">" + i18next.t('texts.more_info') + "</a></div>"}

    return popupContent;
}


// Adding function for opening_hours objects to check if place will be open after n minutes
if (!opening_hours.prototype.isOpenInMinutes) {
  opening_hours.prototype.isOpenInMinutes = function(minutes = 60) {
    let nowPlusHours = new Date();
    nowPlusHours.setUTCMinutes(nowPlusHours.getUTCMinutes()+minutes);
    return this.getState(nowPlusHours);
  };
}



// Main function
veggiemap();
