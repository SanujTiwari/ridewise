export type UserRole = 'USER' | 'DRIVER' | 'ADMIN';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  phone?: string;
  createdAt: string;
}

export interface Stop {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  city: string;
}

export interface RouteStop extends Stop {
  stopOrder: number;
  estimatedArrivalMinutesFromStart: number;
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
  stops: RouteStop[];
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
  driverId?: string;
  driverName?: string;
  routeId?: string;
  routeName?: string;
  location: BusLocation;
  nextStopName?: string;
  etaToNextStopMinutes?: number;
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

export interface TripHistoryItem {
  id: string;
  routeNumber: string;
  routeName: string;
  source: string;
  destination: string;
  farePaid: number;
  date: string;
  status: 'COMPLETED' | 'CANCELLED';
}

export interface FavoriteRoute {
  id: string;
  routeId: string;
  routeNumber: string;
  source: string;
  destination: string;
  addedAt: string;
}

export interface SystemStats {
  totalUsers: number;
  activeBuses: number;
  activeDrivers: number;
  totalRoutes: number;
  dailyPassengers: number;
  onTimePercentage: number;
}
