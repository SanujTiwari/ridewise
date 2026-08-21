import React, { useState, useEffect } from 'react';
import {
  Bus,
  MapPin,
  AlertTriangle,
  Heart,
  SlidersHorizontal,
  Play,
  Square,
  Plus,
  Map as MapIcon
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { routeService } from '../services/routeService';
import { MapView } from '../features/maps/MapView';
import { MOCK_STOPS } from '../api/mockData';
import type { Bus as BusType, ServiceAlert, SystemStats } from '../types';

export const UserDashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [buses, setBuses] = useState<BusType[]>([]);
  const [alerts, setAlerts] = useState<ServiceAlert[]>([]);
  const [stats, setStats] = useState<SystemStats | null>(null);

  // Driver state simulation
  const [driverTripStatus, setDriverTripStatus] = useState<'IDLE' | 'ON_TRIP'>('IDLE');
  const [driverSpeed, setDriverSpeed] = useState(42);
  const [simulatedLat, setSimulatedLat] = useState(31.241);
  const [simulatedLng, setSimulatedLng] = useState(75.725);

  useEffect(() => {
    const fetchData = async () => {
      const b = await routeService.getActiveBuses();
      const a = await routeService.getServiceAlerts();
      const st = await routeService.getSystemStats();
      setBuses(b);
      setAlerts(a);
      setStats(st);
    };
    fetchData();

    // Simulated GPS pulse every 4s
    const timer = setInterval(() => {
      setSimulatedLat((prev) => +(prev + 0.0015).toFixed(4));
      setSimulatedLng((prev) => +(prev - 0.0012).toFixed(4));
    }, 4000);

  const { latestUpdate, isConnected: isWsConnected } = useWebSocket();

  useEffect(() => {
    if (latestUpdate) {
      setBuses((prevBuses) =>
        prevBuses.map((b) => {
          if (b.busNumber === latestUpdate.busNumber) {
            return {
              ...b,
              location: {
                ...b.location,
                latitude: latestUpdate.latitude,
                longitude: latestUpdate.longitude,
                speedKmH: latestUpdate.speedKmH,
                lastUpdated: latestUpdate.timestamp
              },
              nextStopName: latestUpdate.nextStopName,
              etaToNextStopMinutes: latestUpdate.etaToNextStopMinutes
            };
          }
          return b;
        })
      );
    }
  }, [latestUpdate]);

  const role = user?.role || 'USER';

  return (
    <div className="space-y-8">
      
      {/* Header Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-gray-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs text-blue-400 font-bold uppercase tracking-wider mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>RideWise Live Telematics Dashboard</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Welcome back, {user?.name || 'Passenger'}
          </h1>
          <p className="text-sm text-gray-400">
            {role === 'ADMIN'
              ? 'Monitoring live fleet telematics, driver rosters, and system performance.'
              : role === 'DRIVER'
              ? 'Manage active trip routes and broadcast real-time GPS telematics.'
              : 'View nearby stops, active buses, ETAs, and service notifications.'}
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <div className="bg-gray-900 px-4 py-2 rounded-xl border border-gray-800 text-xs">
            <div className="text-gray-500 font-semibold uppercase">Current Role</div>
            <div className="text-white font-bold">{role}</div>
          </div>
        </div>
      </div>

      {/* SERVICE ALERTS BANNER */}
      {alerts.length > 0 && (
        <div className="space-y-3">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-2xl flex items-start space-x-3 text-amber-200 text-sm"
            >
              <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div className="flex-1">
                <span className="font-bold text-white mr-2">{alert.title}:</span>
                <span>{alert.description}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ROLE 1: PASSENGER / USER VIEW */}
      {role === 'USER' && (
        <div className="space-y-8">
          
          {/* Quick Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="glass-card p-6 rounded-2xl space-y-2">
              <div className="flex items-center justify-between text-gray-400">
                <span className="text-xs font-semibold uppercase">Current Location</span>
                <MapPin className="w-4 h-4 text-blue-400" />
              </div>
              <div className="text-lg font-bold text-white">Phagwara Sector 4</div>
              <div className="text-xs text-gray-400">Accuracy: ±5 meters</div>
            </div>

            <div className="glass-card p-6 rounded-2xl space-y-2">
              <div className="flex items-center justify-between text-gray-400">
                <span className="text-xs font-semibold uppercase">Nearest Bus Stop</span>
                <Bus className="w-4 h-4 text-cyan-400" />
              </div>
              <div className="text-lg font-bold text-white">Phagwara Bus Stand</div>
              <div className="text-xs text-cyan-400 font-medium">350 meters away (4 min walk)</div>
            </div>

            <div className="glass-card p-6 rounded-2xl space-y-2">
              <div className="flex items-center justify-between text-gray-400">
                <span className="text-xs font-semibold uppercase">Saved Favorites</span>
                <Heart className="w-4 h-4 text-pink-400" />
              </div>
              <div className="text-lg font-bold text-white">1 Active Favorite</div>
              <div className="text-xs text-gray-400">Route 101 Express</div>
            </div>

          </div>

          {/* UPCOMING BUSES WITH ETAS SECTION */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-gray-800 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-white">Upcoming Buses & ETAs</h3>
                <p className="text-xs text-gray-400">Live arrival estimates at your nearest stop</p>
              </div>
              <span className="text-xs bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full font-semibold font-mono">
                LIVE TELEMATICS
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {buses.map((bus) => (
                <div key={bus.id} className="glass-card p-5 rounded-2xl space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center font-bold text-xs text-blue-400">
                        {bus.busNumber}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white">{bus.routeName}</div>
                        <div className="text-[10px] text-gray-400">{bus.registrationNumber}</div>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-cyan-400 bg-cyan-950/60 px-2 py-1 rounded border border-cyan-800 font-mono">
                      ETA {bus.etaToNextStopMinutes} min
                    </span>
                  </div>

                  <div className="text-xs space-y-1 bg-gray-900/60 p-3 rounded-xl border border-gray-800">
                    <div className="flex justify-between text-gray-400">
                      <span>Destination:</span>
                      <span className="text-white font-medium">Jalandhar</span>
                    </div>
                    <div className="flex justify-between text-gray-400">
                      <span>Next Stop:</span>
                      <span className="text-gray-200 font-medium">{bus.nextStopName}</span>
                    </div>
                    <div className="flex justify-between text-gray-400">
                      <span>Occupancy:</span>
                      <span className="text-gray-200 font-mono">{bus.currentOccupancy}/{bus.capacity} seats</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SIMULATED LIVE MAP VIEW */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-gray-800 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-white">Live Route Telematics Map</h3>
                <p className="text-xs text-gray-400">Active bus location coordinates on GT Road Corridor</p>
              </div>
              <div className="flex items-center space-x-2 text-xs text-gray-400">
                <MapIcon className="w-4 h-4 text-blue-400" />
                <span>Simulated Leaflet View</span>
              </div>
            </div>

            {/* Map Container View */}
            <MapView
              buses={buses}
              stops={MOCK_STOPS}
              userLocation={{ latitude: 31.253, longitude: 75.703 }}
              height="380px"
            />
          </div>

        </div>
      )}

      {/* ROLE 2: DRIVER DASHBOARD VIEW */}
      {role === 'DRIVER' && (
        <div className="space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Driver Vehicle Assignment */}
            <div className="glass-panel p-6 rounded-3xl border border-gray-800 space-y-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Bus className="w-5 h-5 text-amber-400" />
                Assigned Vehicle Specs
              </h3>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between bg-gray-900/60 p-3 rounded-xl border border-gray-800">
                  <span className="text-gray-400">Bus Identifier:</span>
                  <span className="font-bold text-white font-mono">BUS-101</span>
                </div>
                <div className="flex justify-between bg-gray-900/60 p-3 rounded-xl border border-gray-800">
                  <span className="text-gray-400">Registration Number:</span>
                  <span className="font-bold text-white font-mono">PB-08-AB-1234</span>
                </div>
                <div className="flex justify-between bg-gray-900/60 p-3 rounded-xl border border-gray-800">
                  <span className="text-gray-400">Assigned Route:</span>
                  <span className="font-bold text-blue-400">Route 101 (Phagwara - Jalandhar)</span>
                </div>
              </div>

              {/* Start / Stop Trip Button Controls */}
              <div className="pt-4 border-t border-gray-800 flex gap-4">
                {driverTripStatus === 'IDLE' ? (
                  <button
                    onClick={() => setDriverTripStatus('ON_TRIP')}
                    className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-emerald-600/30 transition-all flex items-center justify-center space-x-2"
                  >
                    <Play className="w-5 h-5" />
                    <span>START TRIP & STREAM GPS</span>
                  </button>
                ) : (
                  <button
                    onClick={() => setDriverTripStatus('IDLE')}
                    className="flex-1 bg-red-600 hover:bg-red-500 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-red-600/30 transition-all flex items-center justify-center space-x-2"
                  >
                    <Square className="w-5 h-5" />
                    <span>END TRIP</span>
                  </button>
                )}
              </div>
            </div>

            {/* GPS Telematics Simulator Panel */}
            <div className="glass-panel p-6 rounded-3xl border border-gray-800 space-y-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <SlidersHorizontal className="w-5 h-5 text-cyan-400" />
                Live GPS Telematics Stream
              </h3>

              <div className="space-y-4 text-xs">
                <div className="bg-gray-900 p-4 rounded-xl space-y-2 border border-gray-800 font-mono">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Latitude:</span>
                    <span className="text-emerald-400">{simulatedLat}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Longitude:</span>
                    <span className="text-emerald-400">{simulatedLng}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Status:</span>
                    <span className="text-cyan-400 uppercase font-bold">{driverTripStatus}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-gray-400 font-semibold block">Simulated Speed ({driverSpeed} km/h)</label>
                  <input
                    type="range"
                    min="0"
                    max="90"
                    value={driverSpeed}
                    onChange={(e) => setDriverSpeed(Number(e.target.value))}
                    className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                  />
                </div>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* ROLE 3: ADMIN DASHBOARD VIEW */}
      {role === 'ADMIN' && (
        <div className="space-y-8">
          
          {/* Admin Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="glass-card p-6 rounded-2xl space-y-1">
              <div className="text-xs text-gray-400 uppercase font-semibold">Total Fleet Users</div>
              <div className="text-3xl font-bold text-white font-mono">{stats?.totalUsers}</div>
            </div>
            <div className="glass-card p-6 rounded-2xl space-y-1">
              <div className="text-xs text-gray-400 uppercase font-semibold">Active Buses</div>
              <div className="text-3xl font-bold text-cyan-400 font-mono">{stats?.activeBuses}</div>
            </div>
            <div className="glass-card p-6 rounded-2xl space-y-1">
              <div className="text-xs text-gray-400 uppercase font-semibold">Active Drivers</div>
              <div className="text-3xl font-bold text-emerald-400 font-mono">{stats?.activeDrivers}</div>
            </div>
            <div className="glass-card p-6 rounded-2xl space-y-1">
              <div className="text-xs text-gray-400 uppercase font-semibold">On-Time Accuracy</div>
              <div className="text-3xl font-bold text-purple-400 font-mono">{stats?.onTimePercentage}%</div>
            </div>
          </div>

          {/* Admin Fleet Management Table */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-gray-800 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-white">Active Bus Fleet Roster</h3>
              <button className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all flex items-center space-x-1">
                <Plus className="w-4 h-4" />
                <span>Add Bus</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-gray-300">
                <thead className="bg-gray-900/80 uppercase text-gray-400 font-semibold border-b border-gray-800">
                  <tr>
                    <th className="p-3">Bus Number</th>
                    <th className="p-3">Reg. Number</th>
                    <th className="p-3">Route</th>
                    <th className="p-3">Driver</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800/60">
                  {buses.map((b) => (
                    <tr key={b.id} className="hover:bg-gray-900/40 transition-colors">
                      <td className="p-3 font-bold text-white font-mono">{b.busNumber}</td>
                      <td className="p-3 font-mono">{b.registrationNumber}</td>
                      <td className="p-3 text-blue-400">{b.routeName}</td>
                      <td className="p-3">{b.driverName}</td>
                      <td className="p-3">
                        <span className="bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-bold">
                          {b.status}
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        <button className="text-gray-400 hover:text-white font-medium mr-2">Edit</button>
                        <button className="text-red-400 hover:text-red-300 font-medium">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
