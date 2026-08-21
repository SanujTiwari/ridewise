import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import type { Stop } from '../../types';

interface StopMarkerProps {
  stop: Stop;
  onSelect?: (stop: Stop) => void;
}

export const StopMarker: React.FC<StopMarkerProps> = ({ stop, onSelect }) => {
  const stopIcon = L.divIcon({
    className: 'custom-stop-marker',
    html: `
      <div style="
        width: 28px;
        height: 28px;
        border-radius: 50%;
        background: #0f172a;
        border: 2px solid #06b6d4;
        box-shadow: 0 0 10px rgba(6, 182, 212, 0.4);
        display: flex;
        align-items: center;
        justify-content: center;
        color: #38bdf8;
        font-size: 12px;
      ">
        🚏
      </div>
    `,
    iconSize: [28, 28],
    iconAnchor: [14, 14],
    popupAnchor: [0, -14]
  });

  return (
    <Marker
      position={[stop.latitude, stop.longitude]}
      icon={stopIcon}
      eventHandlers={{
        click: () => onSelect?.(stop)
      }}
    >
      <Popup className="ridewise-map-popup">
        <div className="p-2 space-y-1 text-gray-900">
          <div className="font-bold text-sm text-cyan-600">{stop.name}</div>
          <div className="text-xs text-gray-600">{stop.address}</div>
          <div className="text-[10px] text-gray-500 font-mono">City: {stop.city}</div>
        </div>
      </Popup>
    </Marker>
  );
};
