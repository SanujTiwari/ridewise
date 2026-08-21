import { useState, useEffect, useRef } from 'react';
import { Platform } from 'react-native';

export interface BusLocationUpdatePayload {
  event_type: string;
  busId: string;
  busNumber: string;
  routeNumber: string;
  routeName: string;
  latitude: number;
  longitude: number;
  speedKmH: number;
  status: string;
  nextStopName: string;
  etaToNextStopMinutes: number;
  timestamp: string;
}

export function useWebSocket() {
  const wsHost = Platform.OS === 'android' ? '10.0.2.2:8000' : 'localhost:8000';
  const url = `ws://${wsHost}/api/v1/ws/bus-location`;

  const [latestUpdate, setLatestUpdate] = useState<BusLocationUpdatePayload | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    let ws: WebSocket;
    let reconnectTimer: ReturnType<typeof setTimeout>;

    const connect = () => {
      try {
        ws = new WebSocket(url);
        wsRef.current = ws;

        ws.onopen = () => {
          setIsConnected(true);
        };

        ws.onmessage = (event) => {
          try {
            const data: BusLocationUpdatePayload = JSON.parse(event.data);
            if (data.event_type === 'BUS_LOCATION_UPDATE') {
              setLatestUpdate(data);
            }
          } catch {
            // Ignore non-JSON payload
          }
        };

        ws.onclose = () => {
          setIsConnected(false);
          reconnectTimer = setTimeout(connect, 3000);
        };

        ws.onerror = () => {
          setIsConnected(false);
          ws.close();
        };
      } catch {
        setIsConnected(false);
      }
    };

    connect();

    return () => {
      if (reconnectTimer) clearTimeout(reconnectTimer);
      if (wsRef.current) wsRef.current.close();
    };
  }, [url]);

  const sendLocationUpdate = (payload: Partial<BusLocationUpdatePayload>) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(payload));
    }
  };

  return { latestUpdate, isConnected, sendLocationUpdate };
}
