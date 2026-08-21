import React from 'react';
import { Polyline } from 'react-leaflet';
import type { Route } from '../../types';

interface RoutePolylineProps {
  route: Route;
  color?: string;
}

export const RoutePolyline: React.FC<RoutePolylineProps> = ({ route, color = '#3b82f6' }) => {
  // Extract coordinate pairs [lat, lng] from ordered stops
  const positions: [number, number][] = route.stops.map((stop) => [stop.latitude, stop.longitude]);

  if (positions.length < 2) return null;

  return (
    <Polyline
      positions={positions}
      pathOptions={{
        color,
        weight: 5,
        opacity: 0.8,
        dashArray: '8, 8'
      }}
    />
  );
};
