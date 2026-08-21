# RideWise - System Design & Architecture Blueprint

## 1. High-Level Architecture Diagram

```mermaid
graph TD
    Client[Web Browser / Mobile App] --> CDN[CDN / Static Assets]
    Client -->|HTTPS / REST| API_GW[FastAPI Gateway Router]
    Client -->|WSS / WebSockets| WS_SRV[WebSocket Location Broadcast]

    subgraph Modular Monolith Backend
        API_GW --> AuthMod[Auth & RBAC Module]
        API_GW --> RouteMod[Route Search Engine]
        API_GW --> BusMod[Bus Fleet Manager]
        API_GW --> AdminMod[Admin Analytics Engine]
        
        WS_SRV --> ConnMgr[ConnectionManager]
        Telematics[Telematics Simulator / Driver GPS] -->|Location Stream| WS_SRV
    end

    subgraph Data & Persistence Layer
        AuthMod --> PG[(PostgreSQL Database)]
        RouteMod --> PG
        BusMod --> PG
        AdminMod --> PG
        
        RouteMod --> Redis[(Redis Cache - ETAs & Active Buses)]
        WS_SRV --> Redis
    end
```

---

## 2. Real-Time Telematics & WebSocket Flow

```mermaid
sequenceDiagram
    autonumber
    participant Driver as Driver App / Telematics Feed
    participant WS as FastAPI WebSocket Router
    participant CM as ConnectionManager
    participant User as React Frontend (MapView)

    User->>WS: Connect WSS (/api/v1/ws/bus-location)
    WS->>CM: Register active WebSocket connection
    Driver->>WS: Send GPS payload {busId, lat, lng, speed, eta}
    WS->>CM: Forward payload to ConnectionManager
    CM->>User: Broadcast JSON telematics update
    User->>User: Re-render BusMarker position on Leaflet Map
```

---

## 3. Caching & Performance Strategy

1. **Read Heavy Query Caching (Redis):** Nearby bus stops, frequent routes, and active bus locations are stored in Redis with a TTL of 10 to 60 seconds to prevent unnecessary database hits during peak commute hours.
2. **Database Indexing:** Indexed columns on `users.email`, `routes.route_number`, `stops.name`, `stops.city`, `buses.bus_number`, and `bus_locations.timestamp`.
3. **Stateless JWT Authorization:** Tokens are verified statelessly in memory via secret key decoding without hitting the database on every request.

---

## 4. Scalability & Microservices Evolution Path

While the initial implementation uses a **Modular Monolith** pattern for velocity and zero deployment overhead, individual services are strictly isolated into submodules:

* **Location Service:** Can be extracted into a dedicated Go/Rust service for handling 100k+ concurrent WebSocket connections.
* **Route Engine:** Can be decoupled to run routing algorithms (Dijkstra / A*) independently.
* **Notification Service:** Can ingest message events from Redis Streams or Apache Kafka to dispatch push notifications.
