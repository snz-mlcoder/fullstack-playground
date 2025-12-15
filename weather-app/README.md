# Weather API App

A frontend-focused weather application that fetches and displays real-time weather data
from an external public API (OpenWeatherMap).

This project demonstrates how to consume third-party APIs, handle asynchronous data,
and build a clean, modular frontend architecture using modern JavaScript.

## Features

- Search weather by city name
- Display current temperature and "feels like" temperature
- Weather description
- Humidity, pressure, wind speed, and visibility
- Sunrise and sunset times (local time)
- Instant UI updates without page reload

## Architecture

- Frontend-only application
- No backend required
- Modular JavaScript using ES Modules

## Tech Stack

**Frontend**
- HTML5
- CSS3
- JavaScript (ES Modules)

**External API**
- OpenWeatherMap – Current Weather API (v2.5)

## How It Works

1. User enters a city name
2. The frontend captures the form submission
3. A request is sent to the OpenWeatherMap API
4. Weather data is returned as JSON
5. The UI is updated dynamically without reloading the page

## Running the Project

### Prerequisites
-  VS Code with Live Server extension
