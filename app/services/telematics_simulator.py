import asyncio
import random
from datetime import datetime, timezone
from app.websocket.connection_manager import manager

# Coordinates along GT Road corridor: Phagwara -> LPU -> Jalandhar Cantt -> Jalandhar ISBT
SIMULATED_WAYPOINTS = [
    {"lat": 31.224, "lng": 75.770, "stop": "Phagwara Bus Stand", "eta": 15},
    {"lat": 31.241, "lng": 75.735, "stop": "LPU Gate 1", "eta": 11},
    {"lat": 31.253, "lng": 75.703, "stop": "LPU Main Gate", "eta": 8},
    {"lat": 31.280, "lng": 75.650, "stop": "Haveli GT Road", "eta": 5},
    {"lat": 31.298, "lng": 75.618, "stop": "Jalandhar Cantt", "eta": 3},
    {"lat": 31.326, "lng": 75.576, "stop": "Jalandhar Central Bus Terminal", "eta": 0}
]

class TelematicsSimulator:
    def __init__(self):
        self.running = False
        self.current_index = 0

    async def start(self):
        self.running = True
        while self.running:
            try:
                waypoint = SIMULATED_WAYPOINTS[self.current_index]
                speed = random.randint(38, 55)
                
                payload = {
                    "event_type": "BUS_LOCATION_UPDATE",
                    "busId": "BUS-101",
                    "busNumber": "BUS-101",
                    "routeNumber": "101",
                    "routeName": "Phagwara - Jalandhar Express",
                    "latitude": waypoint["lat"],
                    "longitude": waypoint["lng"],
                    "speedKmH": speed,
                    "status": "ON_ROUTE",
                    "nextStopName": waypoint["stop"],
                    "etaToNextStopMinutes": waypoint["eta"],
                    "timestamp": datetime.now(timezone.utc).isoformat()
                }
                
                # Broadcast over WebSockets to all connected web clients
                await manager.broadcast(payload)

                # Move to next waypoint
                self.current_index = (self.current_index + 1) % len(SIMULATED_WAYPOINTS)
            except Exception as e:
                print(f"[Simulator Warning] {e}")

            await asyncio.sleep(3)

    def stop(self):
        self.running = False

simulator = TelematicsSimulator()
