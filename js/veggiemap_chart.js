/* global Chart */

// Global variables for the config
const dateArray = [];
const dataVeganFriendly = [];
const dataVeganLimited = [];
const dataVeganOnly = [];
const dataVegetarianOnly = [];
let lastElementDate = new Date();

// Load statistics data and call function to handle the data
async function getStatistics() {
  const url = "data/stat.json";
  try {
    const response = await fetch(url);
    const data = await response.json();
    handleData(data.stat);
  }
  catch (error) {
    console.log("Request failed", error);
  }
}

function handleData(data) {
  // Call function to put the values from each day in arrays
  data.forEach(getValues);

  // Get config
  const config = buildConfig();

  // Publish chart
  publishChart(config);
}

function getValues(element) {
  const currentElementDate = new Date(element.date);
  const diffTime = Math.abs(currentElementDate - lastElementDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const minimumElementDayDifference = 6;

  if (diffDays >= minimumElementDayDifference) {
    dateArray.push(element.date);
    dataVeganOnly.push(element.n_vegan_only);
    dataVegetarianOnly.push(element.n_vegetarian_only);
    dataVeganFriendly.push(element.n_vegan_friendly);
    dataVeganLimited.push(element.n_vegan_limited);
    lastElementDate = currentElementDate;
  }
}

function buildConfig() {
  const config = {
    type: "line",
    data: {
      labels: dateArray,
      datasets: [
        {
          label: "vegan only",
          borderColor: "DarkGreen",
          backgroundColor: "DarkGreen",
          data: dataVeganOnly,
          fill: false
        },
        {
          label: "vegetarian only",
          borderColor: "SpringGreen",
          backgroundColor: "SpringGreen",
          data: dataVegetarianOnly,
          fill: false
        },
        {
          label: "vegan friendly",
          borderColor: "SkyBlue  ",
          backgroundColor: "SkyBlue  ",
          data: dataVeganFriendly,
          fill: false
        },
        {
          label: "vegan limited",
          borderColor: "Orange",
          backgroundColor: "Orange",
          data: dataVeganLimited,
          fill: false
        }
      ]
    }
  };

  return config;
}

function publishChart(config) {
  const ctx = document.getElementById("canvas").getContext("2d");
  window.myLine = new Chart(ctx, config);
}

getStatistics();
