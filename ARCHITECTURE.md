# RideWise - Technical Architecture Rationale

## 1. Architectural Decisions

| Area | Choice | Rationale |
| :--- | :--- | :--- |
| **Frontend Framework** | React 19 + Vite | Fast HMR, minimal bundle overhead, optimized ESM builds. |
| **Styling** | Vanilla CSS + Tailwind CSS v4 | Maximum flexibility, glassmorphism tokens, zero runtime CSS overhead. |
| **Map Library** | Leaflet + CartoDB Dark Tiles | Light, open-source, highly responsive vector rendering with zero tile API key fees. |
| **Backend** | FastAPI (Python 3.11+) | Asynchronous ASGI support for WebSockets, automatic OpenAPI docs, high speed. |
| **ORM** | SQLAlchemy 2.0 | Explicit Python type hinting, robust transaction safety, clean schema migrations. |
| **Authentication** | PyJWT + Bcrypt | Stateless token verification, industry-standard password hashing, zero DB auth overhead per request. |
| **Real-Time** | WebSockets (`fastapi.WebSocket`) | Low-latency bi-directional telematics streaming. |

---

## 2. Security Architecture

1. **Password Hashing:** Passwords are hashed using bcrypt with salt. Input passwords are capped at 72 bytes.
2. **Stateless JWT Authorization:** Access tokens are signed with `HS256` and verified via secret key in middleware.
3. **Role-Based Access Control (RBAC):** Middleware checks `user.role` against required scopes (`["ADMIN"]`, `["DRIVER"]`, `["USER"]`).
