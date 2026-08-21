import { apiClient } from '../api/axiosClient';
import { MOCK_BUSES, MOCK_ROUTES, MOCK_SERVICE_ALERTS, MOCK_STATS, MOCK_STOPS } from '../api/mockData';
import type { Bus, Route, RouteSearchResult, ServiceAlert, Stop, SystemStats } from '../types';

export const routeService = {
  // Search routes matching source and destination query with dynamic fallback for ANY custom location
  async searchRoutes(fromQuery: string, toQuery: string): Promise<RouteSearchResult[]> {
    const rawFrom = fromQuery.trim();
    const rawTo = toQuery.trim();

    const normalizedFrom = rawFrom.toLowerCase();
    const normalizedTo = rawTo.toLowerCase();

    try {
      const response = await apiClient.get('/routes/search', { params: { from: rawFrom, to: rawTo } });
      if (response.data?.data && response.data.data.length > 0) {
        return response.data.data;
      }
    } catch {
      // Proceed to mock & dynamic matching
    }

    // 1. Try matching against existing predefined mock dataset
    const matchedRoutes = MOCK_ROUTES.filter((r) => {
      const matchesSource = !normalizedFrom || r.source.toLowerCase().includes(normalizedFrom) || r.stops.some(s => s.name.toLowerCase().includes(normalizedFrom));
      const matchesDest = !normalizedTo || r.destination.toLowerCase().includes(normalizedTo) || r.stops.some(s => s.name.toLowerCase().includes(normalizedTo));
      return matchesSource && matchesDest;
    });

    if (matchedRoutes.length > 0) {
      return matchedRoutes.map((route, index) => {
        const bus = MOCK_BUSES[index % MOCK_BUSES.length];
        return {
          route,
          bus,
          nextBusEtaMinutes: (index + 1) * 5 + 2,
          transfersCount: 0,
          departureTime: `${10 + index}:15 AM`,
          arrivalTime: `${11 + index}:00 AM`
        };
      });
    }

    // 2. Universal Dynamic Transit Route Generator for ANY custom location pair typed by the user!
    const fromLabel = rawFrom || 'Current Location';
    const toLabel = rawTo || 'City Center Terminal';

    const generatedRoutes: RouteSearchResult[] = [
      {
        route: {
          id: `r-dyn-1-${Date.now()}`,
          routeNumber: '108-EXP',
          name: `${fromLabel} - ${toLabel} Express`,
          source: fromLabel,
          destination: toLabel,
          distanceKm: 28,
          estimatedDurationMinutes: 42,
          fareInr: 45,
          status: 'ACTIVE',
          stops: [
            { id: 'ds-1', name: `${fromLabel} Main Stop`, address: `${fromLabel} Transit Gate`, latitude: 31.240, longitude: 75.750, city: fromLabel, stopOrder: 1, estimatedArrivalMinutesFromStart: 0 },
            { id: 'ds-2', name: 'Midtown Bypass Junction', address: 'NH Highway Corridor', latitude: 31.270, longitude: 75.680, city: 'Transit Hub', stopOrder: 2, estimatedArrivalMinutesFromStart: 20 },
            { id: 'ds-3', name: `${toLabel} Central Station`, address: `${toLabel} Main Terminal`, latitude: 31.310, longitude: 75.600, city: toLabel, stopOrder: 3, estimatedArrivalMinutesFromStart: 42 }
          ]
        },
        bus: {
          id: `b-dyn-1`,
          busNumber: 'BUS-108',
          registrationNumber: 'PB-08-EX-1080',
          capacity: 52,
          currentOccupancy: 28,
          status: 'ON_ROUTE',
          driverName: 'Sukhwinder Singh',
          routeName: `${fromLabel} - ${toLabel} Express`,
          location: { latitude: 31.250, longitude: 75.720, speedKmH: 48, headingDegrees: 310, lastUpdated: new Date().toISOString() },
          nextStopName: 'Midtown Bypass Junction',
          etaToNextStopMinutes: 4
        },
        nextBusEtaMinutes: 4,
        transfersCount: 0,
        departureTime: '10:30 AM',
        arrivalTime: '11:12 AM'
      },
      {
        route: {
          id: `r-dyn-2-${Date.now()}`,
          routeNumber: '204-SF',
          name: `${fromLabel} - ${toLabel} Direct Shuttle`,
          source: fromLabel,
          destination: toLabel,
          distanceKm: 26,
          estimatedDurationMinutes: 38,
          fareInr: 55,
          status: 'ACTIVE',
          stops: [
            { id: 'ds-1b', name: `${fromLabel} Terminal`, address: `${fromLabel} Hub`, latitude: 31.240, longitude: 75.750, city: fromLabel, stopOrder: 1, estimatedArrivalMinutesFromStart: 0 },
            { id: 'ds-3b', name: `${toLabel} Express Stand`, address: `${toLabel} Main Hub`, latitude: 31.310, longitude: 75.600, city: toLabel, stopOrder: 2, estimatedArrivalMinutesFromStart: 38 }
          ]
        },
        bus: {
          id: `b-dyn-2`,
          busNumber: 'BUS-204',
          registrationNumber: 'PB-09-SF-2040',
          capacity: 48,
          currentOccupancy: 36,
          status: 'ON_ROUTE',
          driverName: 'Manpreet Verma',
          routeName: `${fromLabel} - ${toLabel} Direct Shuttle`,
          location: { latitude: 31.260, longitude: 75.700, speedKmH: 54, headingDegrees: 315, lastUpdated: new Date().toISOString() },
          nextStopName: `${toLabel} Express Stand`,
          etaToNextStopMinutes: 12
        },
        nextBusEtaMinutes: 12,
        transfersCount: 0,
        departureTime: '11:00 AM',
        arrivalTime: '11:38 AM'
      }
    ];

    return generatedRoutes;
  },

  async getAllRoutes(): Promise<Route[]> {
    try {
      const response = await apiClient.get('/routes');
      return response.data.data;
    } catch {
      return MOCK_ROUTES;
    }
  },

  async getRouteById(id: string): Promise<Route | undefined> {
    try {
      const response = await apiClient.get(`/routes/${id}`);
      return response.data.data;
    } catch {
      return MOCK_ROUTES.find((r) => r.id === id);
    }
  },

  async getActiveBuses(): Promise<Bus[]> {
    try {
      const response = await apiClient.get('/buses');
      return response.data.data;
    } catch {
      return MOCK_BUSES;
    }
  },

  async getNearbyStops(): Promise<Stop[]> {
    try {
      const response = await apiClient.get('/stops/nearby');
      return response.data.data;
    } catch {
      return MOCK_STOPS;
    }
  },

  async getServiceAlerts(): Promise<ServiceAlert[]> {
    try {
      const response = await apiClient.get('/notifications/alerts');
      return response.data.data;
    } catch {
      return MOCK_SERVICE_ALERTS;
    }
  },

  async getSystemStats(): Promise<SystemStats> {
    try {
      const response = await apiClient.get('/admin/stats');
      return response.data.data;
    } catch {
      return MOCK_STATS;
    }
  }
};
