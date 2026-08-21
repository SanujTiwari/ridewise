import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, MapPin, ShieldAlert, Filter, ChevronRight } from 'lucide-react';
import { routeService } from '../services/routeService';
import type { RouteSearchResult } from '../types';

export const RouteSearchPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialFrom = searchParams.get('from') || '';
  const initialTo = searchParams.get('to') || '';

  const [fromQuery, setFromQuery] = useState(initialFrom);
  const [toQuery, setToQuery] = useState(initialTo);
  const [results, setResults] = useState<RouteSearchResult[]>([]);
  const [selectedResult, setSelectedResult] = useState<RouteSearchResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    try {
      const res = await routeService.searchRoutes(fromQuery, toQuery);
      setResults(res || []);
      if (res && res.length > 0) {
        setSelectedResult(res[0]);
      } else {
        setSelectedResult(null);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <div className="space-y-8 pb-12">
      
      {/* Header Search Box */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-gray-800 space-y-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Find Public Transit Routes</h1>
          <p className="text-xs text-gray-400">Compare bus options, fares (₹), trip durations, and next bus ETAs</p>
        </div>

        <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-12 gap-4">
          
          <div className="md:col-span-5 relative">
            <MapPin className="w-4 h-4 text-blue-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Departure location (e.g. Phagwara, Delhi)..."
              value={fromQuery}
              onChange={(e) => setFromQuery(e.target.value)}
              className="w-full bg-gray-900/90 border border-gray-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="md:col-span-5 relative">
            <MapPin className="w-4 h-4 text-cyan-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Destination location (e.g. Jalandhar, Chandigarh)..."
              value={toQuery}
              onChange={(e) => setToQuery(e.target.value)}
              className="w-full bg-gray-900/90 border border-gray-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2.5 px-4 rounded-xl shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center space-x-2 text-sm"
            >
              <Search className="w-4 h-4" />
              <span>{loading ? 'Searching...' : 'Search'}</span>
            </button>
          </div>

        </form>
      </div>

      {/* SEARCH RESULTS CONTENT */}
      {loading ? (
        <div className="glass-panel p-12 rounded-3xl text-center space-y-4">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-400 text-sm">Searching active public transit routes...</p>
        </div>
      ) : results.length === 0 ? (
        <div className="glass-panel p-12 rounded-3xl text-center space-y-4">
          <ShieldAlert className="w-12 h-12 text-amber-400 mx-auto" />
          <h3 className="text-lg font-bold text-white">No Routes Found</h3>
          <p className="text-sm text-gray-400">Try searching popular hubs like "Phagwara" or "Jalandhar".</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* List of Available Routes */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between text-xs text-gray-400 px-1">
              <span>Found <strong className="text-white">{results.length}</strong> available routes</span>
              <span className="flex items-center gap-1"><Filter className="w-3.5 h-3.5" /> Sorted by fastest ETA</span>
            </div>

            {results.map((res, idx) => {
              const route = res?.route;
              const routeId = route?.id || `r-${idx}`;
              const stopsList = route?.stops || [];
              const isSelected = selectedResult?.route?.id === routeId;
              const fare = route?.fareInr || (route as any)?.fare_inr || 40;
              const duration = route?.estimatedDurationMinutes || (route as any)?.estimated_duration_minutes || 45;
              const routeNumber = route?.routeNumber || (route as any)?.route_number || '101';

              return (
                <div
                  key={routeId}
                  onClick={() => setSelectedResult(res)}
                  className={`glass-card p-6 rounded-2xl cursor-pointer transition-all ${
                    isSelected ? 'border-blue-500 bg-blue-950/20 glow-blue' : 'hover:border-gray-700'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold text-sm">
                        {routeNumber}
                      </div>
                      <div>
                        <h3 className="font-bold text-white text-base">{route?.name || 'Express Transit Route'}</h3>
                        <p className="text-xs text-gray-400">{route?.source || 'Departure'} ➔ {route?.destination || 'Arrival'}</p>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-lg font-extrabold text-white font-mono">₹{fare}</div>
                      <div className="text-[10px] text-gray-400 uppercase font-semibold">Standard Fare</div>
                    </div>
                  </div>

                  {/* Route Specs Grid */}
                  <div className="mt-6 pt-4 border-t border-gray-800/80 grid grid-cols-4 gap-2 text-center text-xs">
                    <div className="bg-gray-900/60 p-2 rounded-xl">
                      <span className="text-[10px] text-gray-500 block uppercase">Duration</span>
                      <span className="font-bold text-gray-200">{duration} min</span>
                    </div>
                    <div className="bg-gray-900/60 p-2 rounded-xl">
                      <span className="text-[10px] text-gray-500 block uppercase">Stops</span>
                      <span className="font-bold text-gray-200">{stopsList.length} stops</span>
                    </div>
                    <div className="bg-gray-900/60 p-2 rounded-xl">
                      <span className="text-[10px] text-gray-500 block uppercase">Transfers</span>
                      <span className="font-bold text-gray-200">{res?.transfersCount === 0 ? 'Direct' : res?.transfersCount || 'Direct'}</span>
                    </div>
                    <div className="bg-blue-600/10 border border-blue-500/20 p-2 rounded-xl">
                      <span className="text-[10px] text-blue-400 block uppercase font-semibold">Next ETA</span>
                      <span className="font-extrabold text-cyan-400 font-mono">{res?.nextBusEtaMinutes || 5} min</span>
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
                    <h3 className="text-xl font-bold text-white">{selectedResult.route?.name || 'Transit Route'}</h3>
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
                    <span className="text-emerald-400 font-bold font-mono">{selectedResult.bus?.busNumber || 'BUS-101'}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-400">Driver</span>
                    <span className="text-gray-200 font-medium">{selectedResult.bus?.driverName || 'Sukhwinder Singh'}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-400">Current Occupancy</span>
                    <span className="text-gray-200 font-mono">{selectedResult.bus?.currentOccupancy || 28} / {selectedResult.bus?.capacity || 50} seats</span>
                  </div>
                </div>

                {/* Stop Timeline */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">Route Stop Sequence</h4>
                  <div className="space-y-4 relative before:absolute before:left-3 before:top-3 before:bottom-3 before:w-0.5 before:bg-gray-800">
                    {(selectedResult.route?.stops || []).map((stop, i, arr) => (
                      <div key={stop.id || `st-${i}`} className="flex items-start space-x-4 relative z-10">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white border-2 border-gray-950 ${
                          i === 0 ? 'bg-blue-600' : i === arr.length - 1 ? 'bg-emerald-500' : 'bg-gray-700'
                        }`}>
                          {stop.stopOrder || (i + 1)}
                        </div>
                        <div className="flex-1 bg-gray-900/40 p-3 rounded-xl border border-gray-800/60 flex items-center justify-between">
                          <div>
                            <div className="text-xs font-bold text-white">{stop.name}</div>
                            <div className="text-[10px] text-gray-400">{stop.city || 'Punjab'}</div>
                          </div>
                          <div className="text-right">
                            <span className="text-[11px] font-mono text-cyan-400">+{stop.estimatedArrivalMinutesFromStart || (i * 15)} min</span>
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
