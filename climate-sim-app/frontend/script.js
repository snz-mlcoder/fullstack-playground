async function runSimulation() {
  // Read input values from the form

  const temp = parseFloat(document.getElementById("temp").value);
  const humidity = parseFloat(document.getElementById("humidity").value);
  const altitude = parseFloat(document.getElementById("altitude").value);
  const tenant = document.getElementById("tenant").value;

  const resultEl = document.getElementById("result");
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
        resultEl.innerText =
          "Validation Error:\n" + JSON.stringify(errorBody.detail, null, 2);
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
