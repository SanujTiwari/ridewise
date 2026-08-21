import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import type { Bus } from '../../types';

interface BusMarkerProps {
  bus: Bus;
  isSelected?: boolean;
  onSelect?: (bus: Bus) => void;
}

export const BusMarker: React.FC<BusMarkerProps> = ({ bus, isSelected, onSelect }) => {
  // Create custom SVG Leaflet Icon for Bus
  const busIcon = L.divIcon({
    className: 'custom-bus-marker',
    html: `
      <div style="
        width: 38px;
        height: 38px;
        border-radius: 12px;
        background: ${isSelected ? 'linear-gradient(135deg, #2563eb, #06b6d4)' : 'linear-gradient(135deg, #1e293b, #0f172a)'};
        border: 2px solid ${isSelected ? '#60a5fa' : '#3b82f6'};
        box-shadow: 0 4px 15px rgba(59, 130, 246, 0.4);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: 800;
        font-size: 11px;
        font-family: monospace;
        transform: rotate(${bus.location.headingDegrees || 0}deg);
        transition: all 0.3s ease;
      ">
        🚌
      </div>
    `,
    iconSize: [38, 38],
    iconAnchor: [19, 19],
    popupAnchor: [0, -20]
  });

  return (
    <Marker
      position={[bus.location.latitude, bus.location.longitude]}
      icon={busIcon}
      eventHandlers={{
        click: () => onSelect?.(bus)
      }}
    >
      <Popup className="ridewise-map-popup">
        <div className="p-3 space-y-2 min-w-[200px] text-gray-900">
          <div className="flex items-center justify-between border-b pb-2">
            <span className="font-extrabold text-blue-600 text-sm">{bus.busNumber}</span>
            <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded uppercase">
              {bus.status}
            </span>
          </div>
          <div className="text-xs space-y-1 text-gray-700">
            <div><strong>Route:</strong> {bus.routeName}</div>
            <div><strong>Registration:</strong> {bus.registrationNumber}</div>
            <div><strong>Driver:</strong> {bus.driverName}</div>
            <div><strong>Speed:</strong> {bus.location.speedKmH} km/h</div>
            <div><strong>Next Stop:</strong> {bus.nextStopName}</div>
            <div><strong>ETA:</strong> {bus.etaToNextStopMinutes} min</div>
            <div><strong>Capacity:</strong> {bus.currentOccupancy}/{bus.capacity} seats</div>
          </div>
        </div>
      </Popup>
    </Marker>
  );
};
