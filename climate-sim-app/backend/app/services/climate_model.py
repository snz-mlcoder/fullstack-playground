def simulate_temperature(temp: float, humidity: float, altitude: float) -> float:
    """
    A very simple model for predicting future temperature.

    temp: initial temperature (°C)
    humidity: relative humidity (%)
    altitude: altitude in meters (temperature decreases ~6°C per 1000m)
    """

    base = temp - altitude * 0.006    # temperature drop due to altitude
    effect = humidity * 0.1           # humidity effect on temperature
    predicted = base + effect         # final predicted temperature

    return predicted
