# Climate Sim App

A simple full-stack climate simulation application.  
The backend exposes a FastAPI API for temperature prediction, and the frontend provides a minimal UI to send inputs and display the result.

---

## 🧱 Project Structure

```text
climate-sim-app/
 ├── backend/
 │    ├── app/
 │    │    ├── main.py
 │    │    ├── routers/
 │    │    │    └── simulation.py
 │    │    └── services/
 │    │         └── climate_model.py
 │    ├── requirements.txt
 │    └── venv/ (local virtual environment, not committed)
 ├── frontend/
 │    ├── index.html
 │    ├── script.js
 │    └── styles.css
 └── docker-compose.yml




backend/ – FastAPI application with the simulation API

frontend/ – Static HTML/JS/CSS client

docker-compose.yml – Optional Docker setup (backend + frontend)


