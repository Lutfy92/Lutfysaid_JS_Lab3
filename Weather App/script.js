const form = document.getElementById("searchForm");
const cityInput = document.getElementById("cityInput");
const cityCountryElement = document.getElementById("cityCountry");
const dateElement = document.getElementById("date");
const temperatureElement = document.getElementById("temperature");
const lowHighTempElement = document.getElementById("lowHighTemp");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const city = cityInput.value.trim();
  if (city === "") return;
  fetchWeatherData(city);
});

function fetchWeatherData(city) {
  const apiKey = "7e3f21edee540e6110af347b55eb1ab2";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      const { name, sys, main } = data;
      const country = sys.country;
      const currentDate = new Date().toDateString();
      const temperature = main.temp;
      const lowTemp = main.temp_min;
      const highTemp = main.temp_max;

      cityCountryElement.textContent = `${name}, ${country}`;
      dateElement.textContent = `${currentDate}`;
      temperatureElement.textContent = `${Math.round (temperature)}°C`;
      lowHighTempElement.textContent = `${Math.round (lowTemp)}°C / ${Math.round (highTemp)}°C`;
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
      cityCountryElement.textContent = "City not found";
      dateElement.textContent = "";
      temperatureElement.textContent = "";
      lowHighTempElement.textContent = "";
    });
}


