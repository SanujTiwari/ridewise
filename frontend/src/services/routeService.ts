import { apiClient } from '../api/axiosClient';
import { MOCK_BUSES, MOCK_ROUTES, MOCK_SERVICE_ALERTS, MOCK_STATS, MOCK_STOPS } from '../api/mockData';
import { Bus, Route, RouteSearchResult, ServiceAlert, Stop, SystemStats } from '../types';

export const routeService = {
  // Search routes matching source and destination query
  async searchRoutes(fromQuery: string, toQuery: string): Promise<RouteSearchResult[]> {
    try {
      const response = await apiClient.get('/routes/search', { params: { from: fromQuery, to: toQuery } });
      return response.data.data;
    } catch {
      // Fallback to intelligent mock filter
      const normalizedFrom = fromQuery.trim().toLowerCase();
      const normalizedTo = toQuery.trim().toLowerCase();

      const matchedRoutes = MOCK_ROUTES.filter((r) => {
        const matchesSource = !normalizedFrom || r.source.toLowerCase().includes(normalizedFrom) || r.stops.some(s => s.name.toLowerCase().includes(normalizedFrom));
        const matchesDest = !normalizedTo || r.destination.toLowerCase().includes(normalizedTo) || r.stops.some(s => s.name.toLowerCase().includes(normalizedTo));
        return matchesSource && matchesDest;
      });

      return matchedRoutes.map((route) => {
        const bus = MOCK_BUSES.find((b) => b.routeId === route.id) || MOCK_BUSES[0];
        return {
          route,
          bus,
          nextBusEtaMinutes: bus.etaToNextStopMinutes || 7,
          transfersCount: 0,
          departureTime: '10:15 AM',
          arrivalTime: '11:00 AM'
        };
      });
    }
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
