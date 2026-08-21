import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, String, Float, DateTime, ForeignKey
from app.database.database import Base

class Trip(Base):
    __tablename__ = "trips"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String, ForeignKey("users.id"), nullable=False, index=True)
    route_id = Column(String, ForeignKey("routes.id"), nullable=False)
    bus_id = Column(String, ForeignKey("buses.id"), nullable=True)
    source = Column(String, nullable=False)
    destination = Column(String, nullable=False)
    fare_paid = Column(Float, nullable=False)
    status = Column(String, default="COMPLETED")  # COMPLETED, CANCELLED
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

class Favorite(Base):
    __tablename__ = "favorites"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String, ForeignKey("users.id"), nullable=False, index=True)
    route_id = Column(String, ForeignKey("routes.id"), nullable=False)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
