const API_KEY = "5094bfe47ce826fe4088c8af6b63754a";

const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

export async function getWeather(city) {
  const url = `${BASE_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;

  const response = await fetch(url);
  const data = await response.json();

  if (!response.ok) {
    // پیام خطای واقعی API
    throw new Error(data.message || "Failed to fetch weather data");
  }

  return data;
}

