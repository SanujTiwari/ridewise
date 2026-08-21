import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Search,
  MapPin,
  Filter,
  Navigation,
  ChevronRight,
  ShieldAlert
} from 'lucide-react';
import { routeService } from '../services/routeService';
import type { RouteSearchResult } from '../types';

export const RouteSearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [fromQuery, setFromQuery] = useState(searchParams.get('from') || 'Phagwara');
  const [toQuery, setToQuery] = useState(searchParams.get('to') || 'Jalandhar');
  const [results, setResults] = useState<RouteSearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedResult, setSelectedResult] = useState<RouteSearchResult | null>(null);

  const fetchResults = async (from: string, to: string) => {
    setLoading(true);
    try {
      const data = await routeService.searchRoutes(from, to);
      setResults(data);
      if (data.length > 0) {
        setSelectedResult(data[0]);
      } else {
        setSelectedResult(null);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResults(fromQuery, toQuery);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams({ from: fromQuery, to: toQuery });
    fetchResults(fromQuery, toQuery);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Search Header */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-gray-800 space-y-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Find Your Bus Route</h1>
          <p className="text-sm text-gray-400">Search city buses, stops, fares, and real-time arrival estimates.</p>
        </div>

        <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-end">
          <div className="sm:col-span-5 space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-blue-400" /> Departure Location / Stop
            </label>
            <input
              type="text"
              value={fromQuery}
              onChange={(e) => setFromQuery(e.target.value)}
              placeholder="e.g. Phagwara"
              className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="sm:col-span-5 space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
              <Navigation className="w-3.5 h-3.5 text-cyan-400" /> Destination Location / Stop
            </label>
            <input
              type="text"
              value={toQuery}
              onChange={(e) => setToQuery(e.target.value)}
              placeholder="e.g. Jalandhar"
              className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="sm:col-span-2">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center space-x-2"
            >
              <Search className="w-4 h-4" />
              <span>Search</span>
            </button>
          </div>
        </form>
      </div>

      {/* Results Content */}
      {loading ? (
        <div className="glass-panel p-12 rounded-3xl text-center space-y-4">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-gray-400 text-sm">Searching active public transit routes...</p>
        </div>
      ) : results.length === 0 ? (
        <div className="glass-panel p-12 rounded-3xl text-center space-y-4">
          <ShieldAlert className="w-12 h-12 text-amber-400 mx-auto" />
          <h3 className="text-lg font-bold text-white">No Direct Routes Found</h3>
          <p className="text-sm text-gray-400">Try broadening your search term (e.g. "Phagwara" or "Jalandhar").</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* List of Available Routes */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between text-xs text-gray-400 px-1">
              <span>Found <strong className="text-white">{results.length}</strong> available routes</span>
              <span className="flex items-center gap-1"><Filter className="w-3.5 h-3.5" /> Sorted by fastest ETA</span>
            </div>

            {results.map((res) => {
              const isSelected = selectedResult?.route.id === res.route.id;
              return (
                <div
                  key={res.route.id}
                  onClick={() => setSelectedResult(res)}
                  className={`glass-card p-6 rounded-2xl cursor-pointer transition-all ${
                    isSelected ? 'border-blue-500 bg-blue-950/20 glow-blue' : 'hover:border-gray-700'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold text-sm">
                        {res.route.routeNumber}
                      </div>
                      <div>
                        <h3 className="font-bold text-white text-base">{res.route.name}</h3>
                        <p className="text-xs text-gray-400">{res.route.source} ➔ {res.route.destination}</p>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-lg font-extrabold text-white font-mono">₹{res.route.fareInr}</div>
                      <div className="text-[10px] text-gray-400 uppercase font-semibold">Standard Fare</div>
                    </div>
                  </div>

                  {/* Route Specs Grid */}
                  <div className="mt-6 pt-4 border-t border-gray-800/80 grid grid-cols-4 gap-2 text-center text-xs">
                    <div className="bg-gray-900/60 p-2 rounded-xl">
                      <span className="text-[10px] text-gray-500 block uppercase">Duration</span>
                      <span className="font-bold text-gray-200">{res.route.estimatedDurationMinutes} min</span>
                    </div>
                    <div className="bg-gray-900/60 p-2 rounded-xl">
                      <span className="text-[10px] text-gray-500 block uppercase">Stops</span>
                      <span className="font-bold text-gray-200">{res.route.stops.length} stops</span>
                    </div>
                    <div className="bg-gray-900/60 p-2 rounded-xl">
                      <span className="text-[10px] text-gray-500 block uppercase">Transfers</span>
                      <span className="font-bold text-gray-200">{res.transfersCount === 0 ? 'Direct' : res.transfersCount}</span>
                    </div>
                    <div className="bg-blue-600/10 border border-blue-500/20 p-2 rounded-xl">
                      <span className="text-[10px] text-blue-400 block uppercase font-semibold">Next ETA</span>
                      <span className="font-extrabold text-cyan-400 font-mono">{res.nextBusEtaMinutes} min</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Selected Route Detailed View */}
          {selectedResult && (
            <div className="lg:col-span-5">
              <div className="glass-panel p-6 rounded-3xl border border-gray-800 space-y-6 sticky top-28">
                
                <div className="flex items-center justify-between border-b border-gray-800 pb-4">
                  <div>
                    <span className="text-xs text-blue-400 font-semibold uppercase tracking-wider">Route Details</span>
                    <h3 className="text-xl font-bold text-white">{selectedResult.route.name}</h3>
                  </div>
                  <Link
                    to="/app/dashboard?tab=tracking"
                    className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-3 py-2 rounded-xl transition-all flex items-center gap-1"
                  >
                    <span>Track Live</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>

                {/* Assigned Bus Info */}
                <div className="bg-gray-900/80 p-4 rounded-2xl border border-gray-800 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-400">Assigned Vehicle</span>
                    <span className="text-emerald-400 font-bold font-mono">{selectedResult.bus.busNumber}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-400">Driver</span>
                    <span className="text-gray-200 font-medium">{selectedResult.bus.driverName}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-400">Current Occupancy</span>
                    <span className="text-gray-200 font-mono">{selectedResult.bus.currentOccupancy} / {selectedResult.bus.capacity} seats</span>
                  </div>
                </div>

                {/* Stop Timeline */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">Route Stop Sequence</h4>
                  <div className="space-y-4 relative before:absolute before:left-3 before:top-3 before:bottom-3 before:w-0.5 before:bg-gray-800">
                    {selectedResult.route.stops.map((stop, i) => (
                      <div key={stop.id} className="flex items-start space-x-4 relative z-10">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white border-2 border-gray-950 ${
                          i === 0 ? 'bg-blue-600' : i === selectedResult.route.stops.length - 1 ? 'bg-emerald-500' : 'bg-gray-700'
                        }`}>
                          {stop.stopOrder}
                        </div>
                        <div className="flex-1 bg-gray-900/40 p-3 rounded-xl border border-gray-800/60 flex items-center justify-between">
                          <div>
                            <div className="text-xs font-bold text-white">{stop.name}</div>
                            <div className="text-[10px] text-gray-400">{stop.city}</div>
                          </div>
                          <div className="text-right">
                            <span className="text-[11px] font-mono text-cyan-400">+{stop.estimatedArrivalMinutesFromStart} min</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
};
