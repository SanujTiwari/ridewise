from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.models.route import Route
from app.schemas.route import RouteSchema

router = APIRouter(prefix="/routes", tags=["Routes"])

@router.get("", response_model=List[RouteSchema])
def get_routes(db: Session = Depends(get_db)):
    routes = db.query(Route).all()
    return routes

@router.get("/search")
def search_routes(from_stop: Optional[str] = None, to_stop: Optional[str] = None, db: Session = Depends(get_db)):
    query = db.query(Route)
    if from_stop:
        query = query.filter(Route.source.ilike(f"%{from_stop}%"))
    if to_stop:
        query = query.filter(Route.destination.ilike(f"%{to_stop}%"))
    
    routes = query.all()
    return {"success": True, "data": routes}

@router.get("/{route_id}", response_model=RouteSchema)
def get_route(route_id: str, db: Session = Depends(get_db)):
    route = db.query(Route).filter(Route.id == route_id).first()
    if not route:
        raise HTTPException(status_code=404, detail="Route not found")
    return route
