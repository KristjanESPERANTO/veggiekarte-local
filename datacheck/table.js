function veggiemap_populate(parentGroup) {
  const url = "../data/check_results.json";
  fetch(url)
  .then(response => response.json())
  .then(geojson => geojsonToMarkerGroups(geojson))
  .then(markerGroupsAndDate => {
    let markerGroups = markerGroupsAndDate[0];
    let date = markerGroupsAndDate[1];

Object.keys(markerGroups);
console.log(markerGroups);

/*
  let markerGroupCategories = Object.keys(markerGroupsAndDate[0]);
  // Go through the list of categories
  for (let i = 0; i < markerGroupCategories.length; i++) {
    // Get the name
    let categoryName = markerGroupCategories[i];
    // Get the number of the markers
    let markerNumber = markerGroups[categoryName].length;
    // Add the number to the category entry
    document.getElementById(categoryName).innerHTML = "(" + markerNumber + ")";
  }
*/

// convert object to key's array
const keys = Object.keys(markerGroups);

// print all keys
console.log(keys);
// [ 'java', 'javascript', 'nodejs', 'php' ]

// iterate over object
keys.forEach((key, index) => {

    let DIV = document.createElement("DIV");
    
    let heading = document.createElement("h2");
    heading.innerText = key;
    heading.innerText += " ("+ markerGroups[key].length +")";
    DIV.appendChild(heading); 
    let table = document.createElement("table");
    let tableHead = document.createElement("tr");
    tableHead.innerHTML += "<th>Index</th>";
    tableHead.innerHTML += "<th>Name</th>";
    tableHead.innerHTML += "<th>Issues</th>";
    table.appendChild(tableHead); 



    markerGroups[key].forEach((element, index) => {


      let row = document.createElement("tr");
      index += 1;
      undef = element.properties.undefined;
      if (undef == undefined) { undef = "-" };
      console.log(element);
      row.innerHTML += "<td>" + index + "</td>";
      row.innerHTML += "<td>" + element.properties.name + "</td>";
      row.innerHTML += "<td>" + element.properties.issue_number + "</td>";
      table.appendChild(row); 

    })

    DIV.appendChild(table); 

    output = document.getElementById('output')

    output.appendChild(DIV); 
    
});



/*
    markerGroups.forEach(group => {
        console.log(group);
        
/*        let eCat = "issue_number_"
        if (feature.properties.issue_number > 6) {
          eCat += "many";
        } else {
          eCat += feature.properties.issue_number;
        }
        if (!groups[eCat]) groups[eCat] = [];
        groups[eCat].push(getMarker(feature));
    });*/





  })
  .catch(error  => {console.log('Request failed', error);});
}


// Process the places GeoJSON into the groups of markers
function geojsonToMarkerGroups(geojson) {
    const date = geojson._timestamp.split(" ")[0];
    const groups = {};
    geojson.features.forEach(feature => {

        //console.log(feature.properties.diet_vegan);
        
        let eCat = feature.properties.diet_vegan;

        if (!groups[eCat]) groups[eCat] = [];
        groups[eCat].push(feature);
    });
    return [groups, date];
}



function json2Table(json) {
  let cols = Object.keys(json[0]);


  //Map over columns, make headers,join into string
  let headerRow = cols
    .map(col => `<th>${col}</th>`)
    .join("");

  //map over array of json objs, for each row(obj) map over column values,
  //and return a td with the value of that object for its column
  //take that array of tds and join them
  //then return a row of the tds
  //finally join all the rows together
  let rows = json
    .map(row => {
      let tds = cols.map(col => `<td>${row[col]}</td>`).join("");
      return `<tr>${tds}</tr>`;
    })
    .join("");

  //build the table
  const table = `
	<table>
		<thead>
			<tr>${headerRow}</tr>
		<thead>
		<tbody>
			${rows}
		<tbody>
	<table>`;

  output = document.getElementById('output')
  output.innerHTML = json2Table(data)
}

veggiemap_populate();
