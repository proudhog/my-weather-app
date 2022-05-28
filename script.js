//Current day and time

let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let currentTime = document.getElementById("current-time");
currentTime.innerHTML = `${day}, ${hours}:${minutes}`;

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  return days[day];
}

//Forecast
function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
            <div class="day-of-the-week" id="first-day">${formatDay(
              forecastDay.dt
            )}</div>
          
            <div class="weather-icon">
              <img src="http://openweathermap.org/img/wn/${
                forecastDay.weather[0].icon
              }@2x.png" alt=""/>
            </div>
            <div class="temperature">
              <span class="temp-max">${Math.round(forecastDay.temp.max)}° </span
              ><span class="temp-min">${Math.round(
                forecastDay.temp.min
              )}°</span>
            </div>  
          </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

// Enter real life data

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "9cd318b691ec86b36d6f703b911de8c0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function showTemperature(response) {
  document.querySelector(".city").innerHTML = response.data.name;
  let temp = document.querySelector(".number");
  temp.innerHTML = Math.round(response.data.main.temp);
  let wind = document.querySelector("#wind-speed");
  wind.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} km/h`;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `Humidity: ${Math.round(response.data.main.humidity)}%`;
  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].description;
  let iconElement = document.querySelector("#w-icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  celsius = response.data.main.temp;

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "9cd318b691ec86b36d6f703b911de8c0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function showCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  search(city);
}

let searchForm = document.querySelector("#searching-bar");
searchForm.addEventListener("submit", showCity);
search("Berlin");

//Celsius and Fahrenheit units conversion

function showFahrenheit(event) {
  event.preventDefault();

  let fahrenheit = Math.round((celsius * 9) / 5 + 32);
  let tempInput = document.querySelector(".number");
  tempInput.innerHTML = `${fahrenheit}`;
}
let celsius = null;
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheit);

function showCelsius(event) {
  event.preventDefault();
  let tempInput = document.querySelector(".number");
  tempInput.innerHTML = Math.round(celsius);
}

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsius);

//Current Location Button
function searchLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "9cd318b691ec86b36d6f703b911de8c0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector("#current-btn");
currentLocationButton.addEventListener("click", getCurrentLocation);
