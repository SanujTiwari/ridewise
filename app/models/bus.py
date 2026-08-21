import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, String, Float, Integer, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from app.database.database import Base

class Bus(Base):
    __tablename__ = "buses"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    bus_number = Column(String, unique=True, index=True, nullable=False)
    registration_number = Column(String, unique=True, nullable=False)
    capacity = Column(Integer, nullable=False, default=50)
    current_occupancy = Column(Integer, default=0)
    status = Column(String, default="OFF_LINE")  # ON_ROUTE, AT_STOP, MAINTENANCE, OFF_LINE
    
    driver_id = Column(String, ForeignKey("users.id"), nullable=True)
    route_id = Column(String, ForeignKey("routes.id"), nullable=True)

    driver = relationship("User", foreign_keys=[driver_id])
    route = relationship("Route", foreign_keys=[route_id])
    locations = relationship("BusLocation", back_populates="bus", cascade="all, delete-orphan")

class BusLocation(Base):
    __tablename__ = "bus_locations"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    bus_id = Column(String, ForeignKey("buses.id"), nullable=False)
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    speed_kmh = Column(Float, default=0.0)
    heading_degrees = Column(Float, default=0.0)
    timestamp = Column(DateTime, default=lambda: datetime.now(timezone.utc), index=True)

    bus = relationship("Bus", back_populates="locations")
