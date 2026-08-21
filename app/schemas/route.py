from pydantic import BaseModel, ConfigDict
from typing import List, Optional

class StopSchema(BaseModel):
    id: str
    name: str
    address: Optional[str] = None
    latitude: float
    longitude: float
    city: str

    model_config = ConfigDict(from_attributes=True)

class RouteStopSchema(StopSchema):
    stop_order: int
    estimated_arrival_minutes: int

class RouteSchema(BaseModel):
    id: str
    route_number: str
    name: str
    source: str
    destination: str
    distance_km: float
    estimated_duration_minutes: int
    fare_inr: float
    status: str
    stops: List[RouteStopSchema] = []

    model_config = ConfigDict(from_attributes=True)

class RouteSearchRequest(BaseModel):
    from_stop: str
    to_stop: str
