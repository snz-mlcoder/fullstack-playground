import { getWeather } from "./weatherService.js";
import { displayWeather } from "./uiRenderer.js";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("weather-form");
  const cityInput = document.getElementById("city-input");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const city = cityInput.value.trim();

    if (!city) {
      displayWeather({ name: "N/A" });
      return;
    }

    try {
      const data = await getWeather(city);
      displayWeather(data);
    } catch (error) {
      console.error(error);
      displayWeather({ name: "Unable to fetch data" });
    }
  });
});
