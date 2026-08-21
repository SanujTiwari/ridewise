export type UserRole = 'USER' | 'DRIVER' | 'ADMIN';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  phone?: string;
}

export interface BusLocation {
  latitude: number;
  longitude: number;
  speedKmH: number;
  headingDegrees: number;
  lastUpdated: string;
}

export interface Bus {
  id: string;
  busNumber: string;
  registrationNumber: string;
  capacity: number;
  currentOccupancy: number;
  status: 'ON_ROUTE' | 'AT_STOP' | 'MAINTENANCE' | 'OFF_LINE';
  driverName: string;
  routeName: string;
  location: BusLocation;
  nextStopName: string;
  etaToNextStopMinutes: number;
}

export interface Stop {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  city: string;
  stopOrder?: number;
  estimatedArrivalMinutesFromStart?: number;
}

export interface Route {
  id: string;
  routeNumber: string;
  name: string;
  source: string;
  destination: string;
  distanceKm: number;
  estimatedDurationMinutes: number;
  fareInr: number;
  status: 'ACTIVE' | 'DELAYED' | 'SUSPENDED';
  stops: Stop[];
}

export interface RouteSearchResult {
  route: Route;
  bus: Bus;
  nextBusEtaMinutes: number;
  transfersCount: number;
  departureTime: string;
  arrivalTime: string;
}

export interface ServiceAlert {
  id: string;
  title: string;
  description: string;
  severity: 'INFO' | 'WARNING' | 'CRITICAL';
  affectedRouteNumber?: string;
  createdAt: string;
}
