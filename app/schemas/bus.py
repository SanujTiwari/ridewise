from pydantic import BaseModel, ConfigDict
from typing import Optional
from datetime import datetime

class BusLocationSchema(BaseModel):
    latitude: float
    longitude: float
    speed_kmh: float
    heading_degrees: float
    timestamp: datetime

    model_config = ConfigDict(from_attributes=True)

class BusSchema(BaseModel):
    id: str
    bus_number: str
    registration_number: str
    capacity: int
    current_occupancy: int
    status: str
    driver_id: Optional[str] = None
    route_id: Optional[str] = None
    location: Optional[BusLocationSchema] = None

    model_config = ConfigDict(from_attributes=True)
