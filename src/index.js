// import cities json
import citiesJson from "./Files/navigation.json";

// Grab DOM nodes
const cities = document.getElementById("cities");
const slider = document.getElementById("slider");
const marker = document.getElementById("marker");
const currentTime = document.getElementById("current-time");

// Create DOM nodes for each city and append to document
citiesJson.cities.forEach(city => {
  let listItem = document.createElement("li");
  listItem.classList.add("city");
  listItem.innerText = city.label;
  cities.appendChild(listItem);
});

// Get city elements as array
const citiesArray = document.querySelectorAll(".city");

// Variable to keep track of/store current selected city.
let selected;

const options = {
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
  timeZone: 'America/Los_Angeles'
};

const getTime = () => {
  if (selected) {
    const time = new Intl.DateTimeFormat('default', options).format(new Date());
    currentTime.innerText = time;
    setTimeout(getTime, 1000);
  }
};

// Function for handling click event
var handleClick = (event) => {
  // Get dimensions of city name text and marker
  const cityRect = event.target.getBoundingClientRect();
  const sliderRect = slider.getBoundingClientRect();

  // Remove selected-city class from current selected
  if (selected) {
    selected.classList.remove("selected-city");
  }

  // Add class to current target
  event.target.classList.add("selected-city");

  // Update selected to current target
  selected = event.target;

  // Set marker width and left property using current city and slider dimentions
  marker.style.transition = "all 0.25s ease-in-out";
  marker.style.width = cityRect.width + "px"
  marker.style.left = cityRect.left - sliderRect.left + "px";

  // handle timezone change
  options.timeZone = citiesJson.cities.find(city => city.label === selected.innerText).zone;
  getTime();
};

// Add click event listeners to city elemeets
citiesArray.forEach(city => {
  city.addEventListener("click", handleClick);
});

// Handle Screen resize function
const handleResize = () => {
  // Relevant only if there is a selected city
  if (selected) {
    // Get dimensions of city name text and marker
    const sliderRect = slider.getBoundingClientRect();
    const cityRect = selected.getBoundingClientRect();

    // Set marker width and left property using current city and slider dimentions
    marker.style.transition = "none";
    marker.style.width = cityRect.width + "px";
    marker.style.left = cityRect.left - sliderRect.left + "px";
  }
};

// Add resize event listener to window
window.addEventListener("resize", handleResize);



