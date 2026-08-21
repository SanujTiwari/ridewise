import type { Bus, FavoriteRoute, Route, ServiceAlert, Stop, SystemStats, TripHistoryItem, User } from '../types';

export const MOCK_CURRENT_USER: User = {
  id: 'u-101',
  name: 'Sanuj Tiwari',
  email: 'sanuj@ridewise.io',
  role: 'USER',
  avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
  createdAt: '2026-01-15T10:00:00Z'
};

export const MOCK_STOPS: Stop[] = [
  { id: 's-1', name: 'Phagwara Bus Stand', address: 'GT Road, Phagwara', latitude: 31.224, longitude: 75.770, city: 'Phagwara' },
  { id: 's-2', name: 'LPU Main Gate', address: 'NH-44, Phagwara', latitude: 31.253, longitude: 75.703, city: 'Phagwara' },
  { id: 's-3', name: 'Jalandhar Cantt Railway Station', address: 'Cantt Road, Jalandhar', latitude: 31.298, longitude: 75.618, city: 'Jalandhar' },
  { id: 's-4', name: 'Jalandhar Central Bus Terminal', address: 'Civil Lines, Jalandhar', latitude: 31.326, longitude: 75.576, city: 'Jalandhar' },
  { id: 's-5', name: 'Ludhiana Clock Tower', address: 'GT Road, Ludhiana', latitude: 30.910, longitude: 75.851, city: 'Ludhiana' },
  { id: 's-6', name: 'Ludhiana ISBT', address: 'Sherpur Bypass, Ludhiana', latitude: 30.895, longitude: 75.820, city: 'Ludhiana' }
];

export const MOCK_ROUTES: Route[] = [
  {
    id: 'r-101',
    routeNumber: '101',
    name: 'Phagwara - Jalandhar Express',
    source: 'Phagwara Bus Stand',
    destination: 'Jalandhar Central Bus Terminal',
    distanceKm: 22,
    estimatedDurationMinutes: 45,
    fareInr: 40,
    status: 'ACTIVE',
    stops: [
      { id: 's-1', name: 'Phagwara Bus Stand', address: 'GT Road, Phagwara', latitude: 31.224, longitude: 75.770, city: 'Phagwara', stopOrder: 1, estimatedArrivalMinutesFromStart: 0 },
      { id: 's-2', name: 'LPU Main Gate', address: 'NH-44, Phagwara', latitude: 31.253, longitude: 75.703, city: 'Phagwara', stopOrder: 2, estimatedArrivalMinutesFromStart: 12 },
      { id: 's-3', name: 'Jalandhar Cantt', address: 'Cantt Road, Jalandhar', latitude: 31.298, longitude: 75.618, city: 'Jalandhar', stopOrder: 3, estimatedArrivalMinutesFromStart: 30 },
      { id: 's-4', name: 'Jalandhar Central Bus Terminal', address: 'Civil Lines, Jalandhar', latitude: 31.326, longitude: 75.576, city: 'Jalandhar', stopOrder: 4, estimatedArrivalMinutesFromStart: 45 }
    ]
  },
  {
    id: 'r-205',
    routeNumber: '205',
    name: 'Ludhiana - Jalandhar Superfast',
    source: 'Ludhiana ISBT',
    destination: 'Jalandhar Central Bus Terminal',
    distanceKm: 61,
    estimatedDurationMinutes: 75,
    fareInr: 110,
    status: 'ACTIVE',
    stops: [
      { id: 's-6', name: 'Ludhiana ISBT', address: 'Sherpur Bypass, Ludhiana', latitude: 30.895, longitude: 75.820, city: 'Ludhiana', stopOrder: 1, estimatedArrivalMinutesFromStart: 0 },
      { id: 's-1', name: 'Phagwara Bus Stand', address: 'GT Road, Phagwara', latitude: 31.224, longitude: 75.770, city: 'Phagwara', stopOrder: 2, estimatedArrivalMinutesFromStart: 40 },
      { id: 's-4', name: 'Jalandhar Central Bus Terminal', address: 'Civil Lines, Jalandhar', latitude: 31.326, longitude: 75.576, city: 'Jalandhar', stopOrder: 3, estimatedArrivalMinutesFromStart: 75 }
    ]
  },
  {
    id: 'r-301',
    routeNumber: '301',
    name: 'Jalandhar - Phagwara Commuter',
    source: 'Jalandhar Central Bus Terminal',
    destination: 'Phagwara Bus Stand',
    distanceKm: 22,
    estimatedDurationMinutes: 50,
    fareInr: 35,
    status: 'ACTIVE',
    stops: [
      { id: 's-4', name: 'Jalandhar Central Bus Terminal', address: 'Civil Lines, Jalandhar', latitude: 31.326, longitude: 75.576, city: 'Jalandhar', stopOrder: 1, estimatedArrivalMinutesFromStart: 0 },
      { id: 's-3', name: 'Jalandhar Cantt', address: 'Cantt Road, Jalandhar', latitude: 31.298, longitude: 75.618, city: 'Jalandhar', stopOrder: 2, estimatedArrivalMinutesFromStart: 15 },
      { id: 's-2', name: 'LPU Main Gate', address: 'NH-44, Phagwara', latitude: 31.253, longitude: 75.703, city: 'Phagwara', stopOrder: 3, estimatedArrivalMinutesFromStart: 35 },
      { id: 's-1', name: 'Phagwara Bus Stand', address: 'GT Road, Phagwara', latitude: 31.224, longitude: 75.770, city: 'Phagwara', stopOrder: 4, estimatedArrivalMinutesFromStart: 50 }
    ]
  }
];

export const MOCK_BUSES: Bus[] = [
  {
    id: 'b-101',
    busNumber: 'BUS-101',
    registrationNumber: 'PB-08-AB-1234',
    capacity: 52,
    currentOccupancy: 34,
    status: 'ON_ROUTE',
    driverId: 'd-1',
    driverName: 'Harpreet Singh',
    routeId: 'r-101',
    routeName: 'Phagwara - Jalandhar Express',
    location: {
      latitude: 31.241,
      longitude: 75.725,
      speedKmH: 42,
      headingDegrees: 315,
      lastUpdated: new Date().toISOString()
    },
    nextStopName: 'LPU Main Gate',
    etaToNextStopMinutes: 6
  },
  {
    id: 'b-205',
    busNumber: 'BUS-205',
    registrationNumber: 'PB-10-CD-5678',
    capacity: 48,
    currentOccupancy: 41,
    status: 'ON_ROUTE',
    driverId: 'd-2',
    driverName: 'Gurdeep Sharma',
    routeId: 'r-205',
    routeName: 'Ludhiana - Jalandhar Superfast',
    location: {
      latitude: 31.180,
      longitude: 75.790,
      speedKmH: 58,
      headingDegrees: 320,
      lastUpdated: new Date().toISOString()
    },
    nextStopName: 'Phagwara Bus Stand',
    etaToNextStopMinutes: 12
  },
  {
    id: 'b-301',
    busNumber: 'BUS-301',
    registrationNumber: 'PB-09-EF-9012',
    capacity: 50,
    currentOccupancy: 19,
    status: 'ON_ROUTE',
    driverId: 'd-3',
    driverName: 'Rajesh Kumar',
    routeId: 'r-301',
    routeName: 'Jalandhar - Phagwara Commuter',
    location: {
      latitude: 31.310,
      longitude: 75.590,
      speedKmH: 35,
      headingDegrees: 140,
      lastUpdated: new Date().toISOString()
    },
    nextStopName: 'Jalandhar Cantt',
    etaToNextStopMinutes: 18
  }
];

export const MOCK_SERVICE_ALERTS: ServiceAlert[] = [
  {
    id: 'alert-1',
    title: 'Route Diversion on GT Road',
    description: 'Buses on Route 101 are taking a minor bypass near Haveli due to flyover maintenance.',
    severity: 'WARNING',
    affectedRouteNumber: '101',
    createdAt: new Date().toISOString()
  },
  {
    id: 'alert-2',
    title: 'Increased Frequency during Peak Hours',
    description: 'Additional shuttle buses deployed between LPU Main Gate and Jalandhar Cantt.',
    severity: 'INFO',
    affectedRouteNumber: '101',
    createdAt: new Date().toISOString()
  }
];

export const MOCK_TRIP_HISTORY: TripHistoryItem[] = [
  {
    id: 't-1',
    routeNumber: '101',
    routeName: 'Phagwara - Jalandhar Express',
    source: 'Phagwara Bus Stand',
    destination: 'Jalandhar Cantt',
    farePaid: 30,
    date: '2026-08-20T14:30:00Z',
    status: 'COMPLETED'
  },
  {
    id: 't-2',
    routeNumber: '205',
    routeName: 'Ludhiana - Jalandhar Superfast',
    source: 'Ludhiana ISBT',
    destination: 'Phagwara Bus Stand',
    farePaid: 70,
    date: '2026-08-18T09:15:00Z',
    status: 'COMPLETED'
  }
];

export const MOCK_FAVORITE_ROUTES: FavoriteRoute[] = [
  {
    id: 'fav-1',
    routeId: 'r-101',
    routeNumber: '101',
    source: 'Phagwara Bus Stand',
    destination: 'Jalandhar Central Bus Terminal',
    addedAt: '2026-08-01T10:00:00Z'
  }
];

export const MOCK_STATS: SystemStats = {
  totalUsers: 14250,
  activeBuses: 48,
  activeDrivers: 54,
  totalRoutes: 18,
  dailyPassengers: 8900,
  onTimePercentage: 96.4
};
