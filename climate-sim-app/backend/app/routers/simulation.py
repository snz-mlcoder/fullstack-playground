from fastapi import APIRouter
from pydantic import BaseModel
from app.services.climate_model import simulate_temperature

router = APIRouter()

class SimulationInput(BaseModel):
    temp: float
    humidity: float
    altitude: float
    tenant_id: str

@router.post("/simulate")
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
