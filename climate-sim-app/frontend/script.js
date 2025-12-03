async function runSimulation() {
  const temp = parseFloat(document.getElementById("temp").value);
  const humidity = parseFloat(document.getElementById("humidity").value);
  const altitude = parseFloat(document.getElementById("altitude").value);
  const tenant = document.getElementById("tenant").value;

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

  const result = await response.json();
  document.getElementById("result").innerText = 
    "Predicted Temp: " + result.prediction.toFixed(2) + "°C";
}
