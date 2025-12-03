from fastapi import APIRouter
from pydantic import BaseModel
from app.services.climate_model import simulate_temperature

router = APIRouter()

# ---------- Models ----------

class SimulationInput(BaseModel):
    temp: float
    humidity: float
    altitude: float
    tenant_id: str

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