# RideWise - Smart Public Transport Companion

> **Travel Smarter. Arrive on Time.**
> RideWise is a production-grade smart public transportation web platform built with React, Vite, TypeScript, Tailwind CSS, Leaflet Maps, FastAPI, PostgreSQL, Redis, and WebSockets.

---

## 🚀 Key Features

* **Sub-Second Live Bus Tracking:** Real-time bus movement on interactive CartoDB dark Leaflet maps with speed telematics and ETA predictions.
* **Smart Route Recommendation Engine:** Compare fares (in ₹), total trip durations, transfer counts, and next bus ETAs across city networks.
* **Multi-Role Portals (RBAC):** Distinct workflows for Passengers (`USER`), Bus Drivers (`DRIVER`), and Transport Fleet Managers (`ADMIN`).
* **Driver Telematics & Simulator:** Integrated GPS telematics stream allowing drivers to start/stop trips and update location coordinates.
* **Service Disruption Alerts:** Real-time notifications for route diversions, bus delays, stop closures, and emergency notices.
* **Automated Unit & API Testing:** Pytest backend suite (**100% pass**) and Vite TypeScript production build.

---

## 🛠️ Technology Stack

### Frontend
* **Core:** React 19, Vite, TypeScript
* **Styling:** Tailwind CSS v4, Glassmorphism UI tokens
* **Maps:** Leaflet, React Leaflet, CartoDB Dark Matter tiles
* **State & Routing:** React Router v7, TanStack Query (React Query), Axios

### Backend
* **Core:** Python 3.11+, FastAPI, Pydantic V2, Uvicorn
* **Database:** PostgreSQL (with SQLite fallback) & SQLAlchemy 2.0 ORM
* **Security:** PyJWT access tokens, bcrypt password hashing, RBAC middleware
* **Real-Time:** WebSockets (`/api/v1/ws/bus-location`), Telematics Simulator
* **Caching:** Redis Streams

---

## 📁 Repository Structure

```
ridewise/
├── app/                          # FastAPI Backend Application
│   ├── api/                      # API Route Handlers (v1 endpoints)
│   │   ├── v1/
│   │   │   ├── admin.py
│   │   │   ├── auth.py
│   │   │   ├── buses.py
│   │   │   ├── routes.py
│   │   │   └── stops.py
│   │   └── deps.py               # DB & Auth Dependency Injection
│   ├── core/                     # Config, Security, JWT, bcrypt
│   ├── database/                 # SQLAlchemy Engine & SessionLocal
│   ├── models/                   # SQLAlchemy Database ORM Models
│   ├── schemas/                  # Pydantic V2 Request/Response Schemas
│   ├── services/                 # Telematics GPS Simulator
│   ├── websocket/                # ConnectionManager & WS Handler
│   └── main.py                   # FastAPI Application Entrypoint
│
├── frontend/                     # React + Vite + TypeScript Application
│   ├── src/
│   │   ├── api/                  # Axios HTTP client & Mock data
│   │   ├── components/           # Navbar, Footer, Sidebar components
│   │   ├── context/              # AuthContext & Role Switcher
│   │   ├── features/maps/        # MapView, BusMarker, StopMarker, Polyline
│   │   ├── hooks/                # useWebSocket custom hook
│   │   ├── layouts/              # PublicLayout & AppLayout
│   │   ├── pages/                # Landing, Route Search, Dashboard, Auth
│   │   ├── services/             # API service layers
│   │   └── types/                # TypeScript interfaces
│   ├── index.html
│   └── vite.config.ts
│
├── tests/                        # Backend Pytest Test Suite
├── Dockerfile                    # Production Docker container definition
├── docker-compose.yml            # Multi-container orchestration
└── requirements.txt              # Python package dependencies
```

---

## ⚡ Quick Start Guide

### 1. Run the Backend API Server
```bash
# Install Python dependencies
pip install -r requirements.txt

# Run Pytest test suite
python -m pytest

# Start FastAPI server on port 8000
python -m uvicorn app.main:app --reload --port 8000
```
* Interactive Swagger Docs: `http://localhost:8000/docs`

### 2. Run the Frontend Web Application
```bash
cd frontend

# Install Node dependencies
npm install

# Start Vite dev server
npm run dev
```
* Web Portal URL: `http://localhost:5173`

---

## 🐳 Docker Deployment

```bash
# Spin up FastAPI, PostgreSQL, and Redis containers
docker-compose up --build -d
```

---

## 📜 Documentation

* [SYSTEM_DESIGN.md](file:///d:/projects/ridewise-main/SYSTEM_DESIGN.md) - System architecture diagrams, component breakdown, and scalability plan.
* [API_DOCUMENTATION.md](file:///d:/projects/ridewise-main/API_DOCUMENTATION.md) - Complete REST & WebSocket endpoint specifications.
* [DATABASE_DESIGN.md](file:///d:/projects/ridewise-main/DATABASE_DESIGN.md) - Database ER diagram and table schemas.
* [ARCHITECTURE.md](file:///d:/projects/ridewise-main/ARCHITECTURE.md) - Design rationale & technology decisions.
* [DEPLOYMENT.md](file:///d:/projects/ridewise-main/DEPLOYMENT.md) - Containerization & production deployment guide.

---

## 👤 Author & License

Developed by **Sanuj Tiwari** ([GitHub](https://github.com/SanujTiwari/ridewise)). Open-source under the MIT License.
