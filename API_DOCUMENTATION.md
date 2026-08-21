# RideWise - API Documentation

Base URL: `http://localhost:8000/api/v1`

---

## 1. Authentication Endpoints

### `POST /auth/register`
Registers a new user account.

**Request Body:**
```json
{
  "name": "Sanuj Tiwari",
  "email": "sanuj@ridewise.io",
  "password": "password123",
  "role": "USER",
  "phone": "+91 9876543210"
}
```

**Response (200 OK):**
```json
{
  "access_token": "eyJhbGciOiJIUzI1Ni...",
  "token_type": "bearer",
  "user": {
    "id": "u-101",
    "name": "Sanuj Tiwari",
    "email": "sanuj@ridewise.io",
    "role": "USER"
  }
}
```

---

### `POST /auth/login`
Authenticates user credentials and returns JWT bearer token.

**Request Body:**
```json
{
  "email": "sanuj@ridewise.io",
  "password": "password123"
}
```

---

### `GET /auth/me`
Retrieves current authenticated user profile. (Requires `Authorization: Bearer <token>`).

---

## 2. Route & Stop Endpoints

### `GET /routes`
Retrieves all active bus routes.

### `GET /routes/search`
Searches available transit routes.

**Query Parameters:**
* `from_stop` (string, optional): Departure location
* `to_stop` (string, optional): Destination location

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": "r-101",
      "route_number": "101",
      "name": "Phagwara - Jalandhar Express",
      "source": "Phagwara Bus Stand",
      "destination": "Jalandhar Central Bus Terminal",
      "distance_km": 22.0,
      "estimated_duration_minutes": 45,
      "fare_inr": 40.0,
      "status": "ACTIVE"
    }
  ]
}
```

---

### `GET /stops/nearby`
Retrieves bus stops near specified GPS coordinates.

---

## 3. Bus & Telematics Endpoints

### `GET /buses`
Returns active bus roster and positions.

---

## 4. WebSocket Endpoint

### `WS /ws/bus-location`
Bi-directional real-time WebSocket connection for telematics streaming.

**Outbound Broadcast Payload:**
```json
{
  "event_type": "BUS_LOCATION_UPDATE",
  "busId": "BUS-101",
  "busNumber": "BUS-101",
  "routeNumber": "101",
  "latitude": 31.253,
  "longitude": 75.703,
  "speedKmH": 48,
  "status": "ON_ROUTE",
  "nextStopName": "LPU Main Gate",
  "etaToNextStopMinutes": 8,
  "timestamp": "2026-08-22T00:10:00Z"
}
```
