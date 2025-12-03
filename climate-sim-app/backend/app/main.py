from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers.simulation import router as simulation_router

app = FastAPI(title="Climate Simulation API")

# CORS برای ارتباط فرانت ساده
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(simulation_router)

@app.get("/")
def home():
    return {"message": "Climate Simulation API is running"}
