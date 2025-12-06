from fastapi import APIRouter
from pydantic import BaseModel , Field 
from app.services.climate_model import simulate_temperature

router = APIRouter()

# ---------- Models ----------

class SimulationInput(BaseModel):
    temp: float = Field(..., description="Initial temperature in °C (-50 to 60)", ge=-50, le=60)
    humidity: float = Field(..., description="Humidity percentage (0 to 100)", ge=0, le=100)
    altitude: float = Field(..., description="Altitude in meters (must be >= 0)", ge=0)
    tenant_id: str = Field(..., description="Tenant identifier")

class SimulationResult(BaseModel):
    tenant: str
    prediction: float

# ---------- Endpoints ----------

@router.post("/simulate", response_model=SimulationResult)
def run_simulation(data: SimulationInput):
    result = simulate_temperature(
        data.temp, 
        data.humidity, 
        data.altitude
    )

    return {
        "tenant": data.tenant_id,
        "prediction": result
    }

@router.get("/simulate/info")
def get_simulation_info():
    return {
        "description": "Simple climate temperature simulation based on temp, humidity, and altitude.",
        "input_fields": ["temp", "humidity", "altitude", "tenant_id"],
        "version": "1.0.0"
    }