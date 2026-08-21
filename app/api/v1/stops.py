from typing import List
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.models.route import Stop
from app.schemas.route import StopSchema

router = APIRouter(prefix="/stops", tags=["Bus Stops"])

@router.get("", response_model=List[StopSchema])
def get_stops(db: Session = Depends(get_db)):
    return db.query(Stop).all()

@router.get("/nearby")
def get_nearby_stops(latitude: float = 31.224, longitude: float = 75.770, db: Session = Depends(get_db)):
    stops = db.query(Stop).limit(10).all()
    return {"success": True, "data": stops}
