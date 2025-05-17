const apiKey = "YOUR_API_KEY_HERE"; // Replace with your actual key

function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const resultBox = document.getElementById("weatherResult");

  if (!city) {
    resultBox.innerHTML = "Please enter a city name.";
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => {
      if (!response.ok) throw new Error("City not found");
      return response.json();
    })
    .then(data => {
      const { name, main, weather, wind, sys, visibility, clouds, coord } = data;

      const iconCode = weather[0].icon;
      const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
      const sunrise = new Date(sys.sunrise * 1000).toLocaleTimeString();
      const sunset = new Date(sys.sunset * 1000).toLocaleTimeString();
      const currentTime = new Date().toLocaleString();

      resultBox.innerHTML = `
        <h2>${name}, ${sys.country}</h2>
        <img src="${iconUrl}" alt="Weather Icon" />
        <table class="weather-table">
          <tr><td><strong>Temperature:</strong></td><td>${main.temp}°C</td></tr>
          <tr><td><strong>Feels Like:</strong></td><td>${main.feels_like}°C</td></tr>
          <tr><td><strong>Humidity:</strong></td><td>${main.humidity}%</td></tr>
          <tr><td><strong>Pressure:</strong></td><td>${main.pressure} hPa</td></tr>
          <tr><td><strong>Wind Speed:</strong></td><td>${wind.speed} m/s</td></tr>
          <tr><td><strong>Visibility:</strong></td><td>${visibility / 1000} km</td></tr>
          <tr><td><strong>Cloud Coverage:</strong></td><td>${clouds.all}%</td></tr>
          <tr><td><strong>Condition:</strong></td><td>${weather[0].main} (${weather[0].description})</td></tr>
          <tr><td><strong>Sunrise:</strong></td><td>${sunrise}</td></tr>
          <tr><td><strong>Sunset:</strong></td><td>${sunset}</td></tr>
          <tr><td><strong>Coordinates:</strong></td><td>${coord.lat}, ${coord.lon}</td></tr>
          <tr><td><strong>Checked at:</strong></td><td>${currentTime}</td></tr>
        </table>
      `;
    })
    .catch(error => {
      resultBox.innerHTML = "Error: " + error.message;
    });
}
