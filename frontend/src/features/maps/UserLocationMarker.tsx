import React from 'react';
import { Marker, Popup, Circle } from 'react-leaflet';
import L from 'leaflet';

interface UserLocationMarkerProps {
  latitude: number;
  longitude: number;
  accuracyMeters?: number;
}

export const UserLocationMarker: React.FC<UserLocationMarkerProps> = ({
  latitude,
  longitude,
  accuracyMeters = 30
}) => {
  const userIcon = L.divIcon({
    className: 'custom-user-marker',
    html: `
      <div style="
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background: #3b82f6;
        border: 3px solid white;
        box-shadow: 0 0 15px rgba(59, 130, 246, 0.8);
      "></div>
    `,
    iconSize: [24, 24],
    iconAnchor: [12, 12]
  });

  return (
    <>
      <Circle
        center={[latitude, longitude]}
        radius={accuracyMeters}
        pathOptions={{
          fillColor: '#3b82f6',
          fillOpacity: 0.15,
          color: '#60a5fa',
          weight: 1
        }}
      />
      <Marker position={[latitude, longitude]} icon={userIcon}>
        <Popup>
          <div className="p-1 text-xs font-semibold text-gray-800">
            📍 Your Current Location
          </div>
        </Popup>
      </Marker>
    </>
  );
};
