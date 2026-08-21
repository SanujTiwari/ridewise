from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.models.bus import Bus
from app.schemas.bus import BusSchema

router = APIRouter(prefix="/buses", tags=["Buses & Tracking"])

@router.get("", response_model=List[BusSchema])
def get_buses(db: Session = Depends(get_db)):
    return db.query(Bus).all()

@router.get("/{bus_id}", response_model=BusSchema)
def get_bus(bus_id: str, db: Session = Depends(get_db)):
    bus = db.query(Bus).filter(Bus.id == bus_id).first()
    if not bus:
        raise HTTPException(status_code=404, detail="Bus vehicle not found")
    return bus
