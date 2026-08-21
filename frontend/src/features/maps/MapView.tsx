import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { BusMarker } from './BusMarker';
import { StopMarker } from './StopMarker';
import { RoutePolyline } from './RoutePolyline';
import { UserLocationMarker } from './UserLocationMarker';
import type { Bus, Route, Stop } from '../../types';

interface MapViewProps {
  buses?: Bus[];
  stops?: Stop[];
  selectedRoute?: Route;
  userLocation?: { latitude: number; longitude: number };
  center?: [number, number];
  zoom?: number;
  onSelectBus?: (bus: Bus) => void;
  onSelectStop?: (stop: Stop) => void;
  height?: string;
}

export const MapView: React.FC<MapViewProps> = ({
  buses = [],
  stops = [],
  selectedRoute,
  userLocation,
  center = [31.253, 75.703], // Default center around Phagwara / LPU / GT Road
  zoom = 12,
  onSelectBus,
  onSelectStop,
  height = '450px'
}) => {
  return (
    <div className="relative rounded-2xl overflow-hidden border border-gray-800 shadow-2xl z-0" style={{ height }}>
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={true}
        style={{ height: '100%', width: '100%', backgroundColor: '#0b0f19' }}
      >
        {/* CartoDB Dark Matter Tile Layer for SaaS UI */}
        <TileLayer
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />

        {/* Selected Route Polyline Overlay */}
        {selectedRoute && <RoutePolyline route={selectedRoute} color="#06b6d4" />}

        {/* Bus Stop Markers */}
        {stops.map((stop) => (
          <StopMarker key={stop.id} stop={stop} onSelect={onSelectStop} />
        ))}

        {/* Active Bus Markers */}
        {buses.map((bus) => (
          <BusMarker
            key={bus.id}
            bus={bus}
            isSelected={selectedRoute?.id === bus.routeId}
            onSelect={onSelectBus}
          />
        ))}

        {/* User GPS Location Marker */}
        {userLocation && (
          <UserLocationMarker
            latitude={userLocation.latitude}
            longitude={userLocation.longitude}
          />
        )}
      </MapContainer>
    </div>
  );
};
