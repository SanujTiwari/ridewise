from typing import List
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.models.alert import ServiceAlert

router = APIRouter(prefix="/notifications", tags=["Service Alerts & Notifications"])

@router.get("/alerts")
def get_service_alerts(db: Session = Depends(get_db)):
    alerts = db.query(ServiceAlert).all()
    if not alerts:
        # Default mock alert fallback
        return {
            "success": True,
            "data": [
                {
                    "id": "alert-1",
                    "title": "GT Road Route Diversion",
                    "description": "Route 101 operating with 5-minute delays near LPU Bypass due to flyover construction.",
                    "severity": "WARNING",
                    "affectedRouteNumber": "101",
                    "createdAt": "2026-08-22T00:00:00Z"
                }
            ]
        }
    return {"success": True, "data": alerts}
