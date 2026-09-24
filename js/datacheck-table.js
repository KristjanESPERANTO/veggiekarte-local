/** Create a table cell with the given items separated by line breaks.
 * @param {Array<Node|string>} items text strings or nodes
 * @returns {HTMLTableCellElement}
 */
function createCell(items) {
  const td = document.createElement("td");
  items.forEach((item, idx) => {
    if (idx > 0) { td.appendChild(document.createElement("br")); }
    td.append(item);
  });
  return td;
}

/** Create a link that opens in a new tab.
 * @param {string} url
 * @param {string} text
 * @returns {HTMLAnchorElement}
 */
function createLink(url, text) {
  const link = document.createElement("a");
  link.href = url;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.textContent = text;
  return link;
}

async function fetchData() {
  const url = "../data/check_results.json";

  try {
    const response = await fetch(url);
    const geojson = await response.json();

    const markerGroups = geojson.features;
    const date = geojson._timestamp.split(" ")[0];
    const output = document.getElementById("output");
    const head = document.createElement("h1");
    head.innerText = `Datacheck ${date}`;

    const issuesDiv = document.createElement("div");
    issuesDiv.innerText += `Places with issues: ${geojson.features.length}`;

    const table = document.createElement("table");
    const tableHead = document.createElement("tr");
    for (const heading of ["index", "osm", "name", "issue count", "undefined", "other issues"]) {
      const th = document.createElement("th");
      th.textContent = heading;
      tableHead.appendChild(th);
    }
    table.appendChild(tableHead);

    markerGroups.forEach((element, index) => {
      const row = document.createElement("tr");
      const type = encodeURIComponent(element.properties._type);
      const id = encodeURIComponent(element.properties._id);

      const undef = element.properties.undefined;
      const undefLines = undef === undefined ? ["-"] : undef;
      const issueLines = element.properties.issues ?? [];

      row.append(
        createCell([String(index + 1)]),
        createCell([
          createLink(`https://www.openstreetmap.org/${type}/${id}`, "show"),
          createLink(`https://www.openstreetmap.org/edit?${type}=${id}`, "edit")
        ]),
        createCell([element.properties.name]),
        createCell([String(element.properties.issue_count)]),
        createCell(undefLines),
        createCell(issueLines)
      );
      table.appendChild(row);
    });

    output.appendChild(head);
    output.appendChild(issuesDiv);
    output.appendChild(table);
  }
  catch (error) {
    console.log("Request failed", error);
  }
}

fetchData();
