# Climate Simulation App

A simple full-stack climate simulation application.

This project simulates climate-related values (such as altitude, humidity, etc.)
using basic mathematical models and exposes them via a backend API.

## Architecture

- Backend: FastAPI (Python)
- Frontend: HTML, CSS, JavaScript
- Optional containerization with Docker



Enter the project folder: 

Run Backend: 
cd backend 
uvicorn app.main:app --reload 

Run Frontend: 
cd frontend python -m http.server 5500 

Or run everything with Docker: 
docker compose up --build
