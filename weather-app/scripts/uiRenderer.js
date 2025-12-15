export function displayWeather(data) {
  const container = document.getElementById("weather-container");

  if (!container) {
    console.error("Weather container not found");
    return;
  }

  const tempC = data.main
    ? (data.main.temp - 273.15).toFixed(2)
    : "N/A";

  const feelsLikeC = data.main
    ? (data.main.feels_like - 273.15).toFixed(2)
    : "N/A";

  const timezoneOffset = data.timezone || 0;

  const formatTime = (utc) => {
    if (!utc) return "N/A";
    const local = new Date((utc + timezoneOffset) * 1000);
    return local.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZone: "UTC"
    }) + ` (GMT ${timezoneOffset / 3600})`;
  };

  container.innerHTML = `
    <h3>${data.name}</h3>
    <p><strong>Temperature:</strong> ${tempC} °C</p>
    <p><strong>Feels Like:</strong> ${feelsLikeC} °C</p>
    <p><strong>Description:</strong> ${data.weather?.[0]?.description || "N/A"}</p>
    <p><strong>Humidity:</strong> ${data.main?.humidity || "N/A"}%</p>
    <p><strong>Pressure:</strong> ${data.main?.pressure || "N/A"} hPa</p>
    <p><strong>Wind Speed:</strong> ${data.wind?.speed || "N/A"} m/s</p>
    <p><strong>Visibility:</strong> ${data.visibility || "N/A"} m</p>
    <p><strong>Sunrise:</strong> ${formatTime(data.sys?.sunrise)}</p>
    <p><strong>Sunset:</strong> ${formatTime(data.sys?.sunset)}</p>
  `;
}
