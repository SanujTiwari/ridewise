from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from datetime import datetime, timezone
from app.websocket.connection_manager import manager

router = APIRouter(prefix="/ws", tags=["WebSockets"])

@router.websocket("/bus-location")
async def bus_location_websocket(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            data = await websocket.receive_json()
            # Enrich payload with server broadcast timestamp
            data["broadcast_time"] = datetime.now(timezone.utc).isoformat()
            data["event_type"] = "BUS_LOCATION_UPDATE"
            
            # Broadcast to all connected clients
            await manager.broadcast(data)
    except WebSocketDisconnect:
        manager.disconnect(websocket)
    except Exception:
        manager.disconnect(websocket)
