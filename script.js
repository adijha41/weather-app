const apiKey = "1a86da3c8adf9cff9db67bc542f5ec21";
const weatherBox = document.getElementById("weatherBox");

window.onload = function () {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(successLocation, errorLocation);
  } else {
    weatherBox.innerHTML = "Geolocation not supported.";
  }
};

function successLocation(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  getWeatherByCoords(lat, lon);
}

function errorLocation() {
  weatherBox.innerHTML = "Could not get location. Try entering a city.";
}

function getWeatherByCoords(lat, lon) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  fetchWeather(url);
}

function getWeatherByCity() {
  const city = document.getElementById("cityInput").value.trim();
  if (city === "") {
    weatherBox.innerHTML = "Please enter a city.";
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  fetchWeather(url);
}

function fetchWeather(url) {
  console.log("Request URL:", url); // Debug log
  weatherBox.innerHTML = "Fetching weather...";
  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.cod !== 200) {
        weatherBox.innerHTML = `Error: ${data.message}`;
        console.log(data); // Log full response for debug
        return;
      }

      const { name, main, weather } = data;
      weatherBox.innerHTML = `
        <h2>${name}</h2>
        <p>${weather[0].main} - ${weather[0].description}</p>
        <p>🌡️ Temp: ${main.temp}°C</p>
        <p>💧 Humidity: ${main.humidity}%</p>
      `;
    })
    .catch(error => {
      weatherBox.innerHTML = "Error fetching weather data.";
      console.error("Fetch error:", error);
    });
}
