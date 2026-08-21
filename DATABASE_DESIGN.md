# RideWise - Database Schema & ER Design

## 1. Entity-Relationship (ER) Diagram

```mermaid
erDiagram
    USERS ||--o{ BUSES : drives
    USERS ||--o{ TRIPS : takes
    USERS ||--o{ FAVORITES : saves
    ROUTES ||--o{ ROUTE_STOPS : contains
    STOPS ||--o{ ROUTE_STOPS : features
    ROUTES ||--o{ BUSES : operates_on
    BUSES ||--o{ BUS_LOCATIONS : logs

    USERS {
        string id PK
        string name
        string email UK
        string password_hash
        string role
        timestamp created_at
    }

    ROUTES {
        string id PK
        string route_number UK
        string name
        string source
        string destination
        float distance_km
        int estimated_duration_minutes
        float fare_inr
    }

    STOPS {
        string id PK
        string name
        float latitude
        float longitude
        string city
    }

    ROUTE_STOPS {
        string id PK
        string route_id FK
        string stop_id FK
        int stop_order
    }

    BUSES {
        string id PK
        string bus_number UK
        string registration_number UK
        int capacity
        int current_occupancy
        string driver_id FK
        string route_id FK
    }

    BUS_LOCATIONS {
        string id PK
        string bus_id FK
        float latitude
        float longitude
        float speed_kmh
        timestamp timestamp
    }
```

---

## 2. Table Specifications

* **`users`**: Manages passenger, driver, and admin user credentials. Indexed on `email`.
* **`buses`**: Manages vehicle fleet specs, driver assignments, and route bindings. Indexed on `bus_number`.
* **`routes`**: Core route configurations. Indexed on `route_number`.
* **`stops`**: Bus stop locations with spatial latitude and longitude coordinates. Indexed on `name` and `city`.
* **`bus_locations`**: Historical and active GPS telematics coordinates. Indexed on `timestamp`.
