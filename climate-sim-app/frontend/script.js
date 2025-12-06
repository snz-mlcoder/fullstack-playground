
// Turn FastAPI/Pydantic validation errors into human-friendly messages
function formatValidationErrors(detailArray) {
  if (!Array.isArray(detailArray)) {
    return "Invalid input.";
  }

  const messages = detailArray.map((err) => {
    const loc = err.loc || [];
    const field = loc[loc.length - 1]; // last item is usually the field name

    switch (field) {
      case "temp":
        return "Temperature must be between -50 and 60 °C.";
      case "humidity":
        return "Humidity must be between 0 and 100%.";
      case "altitude":
        return "Altitude must be 0 or higher (no negative values).";
      case "tenant_id":
        return "Tenant ID is required and cannot be empty.";
      default:
        // fallback to raw Pydantic message if we don't know the field
        return err.msg || "Invalid input.";
    }
  });

  // Join multiple messages into one string
  return messages.join("\n");
}





async function runSimulation() {
  // Read input values from the form

  const temp = parseFloat(document.getElementById("temp").value);
  const humidity = parseFloat(document.getElementById("humidity").value);
  const altitude = parseFloat(document.getElementById("altitude").value);
  const tenant = document.getElementById("tenant").value;

  const resultEl = document.getElementById("result");


  
  // Frontend validation before sending request
  if (Number.isNaN(temp) || Number.isNaN(humidity) || Number.isNaN(altitude)) {
    resultEl.innerText = "Please fill in all numeric fields.";
    return;
  }

  if (temp < -50 || temp > 60) {
    resultEl.innerText = "Temperature must be between -50 and 60 °C.";
    return;
  }

  if (humidity < 0 || humidity > 100) {
    resultEl.innerText = "Humidity must be between 0 and 100%.";
    return;
  }

  if (altitude < 0) {
    resultEl.innerText = "Altitude must be 0 or higher.";
    return;
  }
  try {
    // Send request to backend API
    const response = await fetch("http://localhost:8000/simulate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        temp: temp,
        humidity: humidity,
        altitude: altitude,
        tenant_id: tenant
      })
    });
    // Handle validation errors (422) and other non-OK responses
    if (!response.ok) {
        const errorBody = await response.json().catch(() => null);

        // Show validation details from FastAPI
        if (errorBody && errorBody.detail) {
          const prettyMessage = formatValidationErrors(errorBody.detail);
          resultEl.innerText = prettyMessage;
        } else {
          resultEl.innerText = `Error ${response.status}: ${response.statusText}`;
        }
        return;
      }
    // Parse successful response

      const result = await response.json();

    // Display prediction
      if (result.prediction !== undefined && result.prediction !== null) {
        resultEl.innerText =
          "Predicted Temp: " + result.prediction.toFixed(2) + "°C";
      } else {
        resultEl.innerText =
          "Unexpected response:\n" + JSON.stringify(result, null, 2);
      }
  } catch (err) {
    // Handle network failures or unexpected errors
    resultEl.innerText = "Request failed: " + err;
    console.error(err);
  }
}


async function loadSimulationInfo() {
  const res = await fetch("http://127.0.0.1:8000/simulate/info");
  const data = await res.json();
  console.log("Info:", data);
  document.getElementById("model-info").textContent = JSON.stringify(data, null, 2);
}
