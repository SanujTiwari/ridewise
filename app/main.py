from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.database.database import engine, Base, SessionLocal
from app.api.v1 import auth, routes, stops, buses, admin
from app.models import User, Route, Stop, Bus, ServiceAlert
from app.core.security import hash_password

# Auto-create tables on startup
Base.metadata.create_all(bind=engine)

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup DB Seeding
    db = SessionLocal()
    try:
        if not db.query(User).filter(User.email == "admin@ridewise.io").first():
            admin_user = User(
                name="Admin Operator",
                email="admin@ridewise.io",
                password_hash=hash_password("admin123"),
                role="ADMIN"
            )
            db.add(admin_user)

        if not db.query(User).filter(User.email == "sanuj@ridewise.io").first():
            test_user = User(
                name="Sanuj Tiwari",
                email="sanuj@ridewise.io",
                password_hash=hash_password("password123"),
                role="USER"
            )
            db.add(test_user)

        if not db.query(Route).filter(Route.route_number == "101").first():
            express_route = Route(
                route_number="101",
                name="Phagwara - Jalandhar Express",
                source="Phagwara Bus Stand",
                destination="Jalandhar Central Bus Terminal",
                distance_km=22.0,
                estimated_duration_minutes=45,
                fare_inr=40.0,
                status="ACTIVE"
            )
            db.add(express_route)

        db.commit()
    finally:
        db.close()
    yield

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix=settings.API_V1_STR)
app.include_router(routes.router, prefix=settings.API_V1_STR)
app.include_router(stops.router, prefix=settings.API_V1_STR)
app.include_router(buses.router, prefix=settings.API_V1_STR)
app.include_router(admin.router, prefix=settings.API_V1_STR)

@app.get("/")
def root():
    return {
        "project": settings.PROJECT_NAME,
        "version": settings.VERSION,
        "status": "running",
        "docs_url": "/docs"
    }