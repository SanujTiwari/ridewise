import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Bus,
  Search,
  MapPin,
  ArrowRight,
  Navigation,
  Bell,
  ChevronDown,
  Activity
} from 'lucide-react';
import { MOCK_STATS } from '../api/mockData';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [fromQuery, setFromQuery] = useState('Phagwara');
  const [toQuery, setToQuery] = useState('Jalandhar');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/search?from=${encodeURIComponent(fromQuery)}&to=${encodeURIComponent(toQuery)}`);
  };

  const faqs = [
    {
      q: 'How accurate is the real-time bus tracking on RideWise?',
      a: 'RideWise uses direct GPS stream updates over WebSockets from drivers and simulated telemetry feeds. Bus locations and ETAs refresh dynamically every 3 seconds.'
    },
    {
      q: 'Is RideWise free for passengers to use?',
      a: 'Yes, RideWise is completely free for passengers to search routes, view real-time bus locations, check arrival schedules, and set service alerts.'
    },
    {
      q: 'Can drivers and transport administrators use RideWise?',
      a: 'Absolutely. RideWise features dedicated portals for drivers to start trips and stream GPS coordinates, as well as an Admin dashboard for managing buses, routes, and schedules.'
    },
    {
      q: 'How does the route recommendation engine work?',
      a: 'Our smart routing engine evaluates total trip distance, transfers, historical traffic bottlenecks, and active bus schedules to find the fastest, lowest-cost public transit route.'
    }
  ];

  return (
    <div className="space-y-24 pb-20">
      
      {/* SECTION 1: HERO SECTION */}
      <section className="relative pt-12 lg:pt-20 overflow-hidden">
        
        {/* Background Glowing Orbs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-blue-600/20 to-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-10 right-10 w-72 h-72 bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto space-y-6">
            
            {/* Live Status Pill */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
              <span>Next-Gen Smart Public Transport Companion</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1]">
              Travel Smarter. <br />
              <span className="gradient-text">Arrive on Time.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
              RideWise helps you discover optimal routes, track buses in real time with precision GPS, and reach your destination with absolute confidence.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                to="/search"
                className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold px-8 py-4 rounded-2xl shadow-xl shadow-blue-600/30 transition-all hover:scale-[1.03] text-base"
              >
                <Search className="w-5 h-5" />
                <span>Find My Route</span>
              </Link>
              <Link
                to="/app/dashboard"
                className="w-full sm:w-auto flex items-center justify-center space-x-2 glass-panel hover:bg-gray-800/80 text-gray-200 font-semibold px-8 py-4 rounded-2xl border border-gray-800 transition-all hover:border-gray-700 text-base"
              >
                <Activity className="w-5 h-5 text-cyan-400" />
                <span>Track a Bus Live</span>
              </Link>
            </div>

          </div>

          {/* SECTION 2: HERO QUICK SEARCH WIDGET & LIVE BUS MOCKUP */}
          <div className="mt-16 max-w-5xl mx-auto">
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-gray-800 shadow-2xl space-y-6">
              
              {/* Quick Search Form */}
              <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-end">
                <div className="sm:col-span-5 space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-blue-400" /> From Departure Stop
                  </label>
                  <input
                    type="text"
                    value={fromQuery}
                    onChange={(e) => setFromQuery(e.target.value)}
                    placeholder="e.g. Phagwara Bus Stand"
                    className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>

                <div className="sm:col-span-5 space-y-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
                    <Navigation className="w-3.5 h-3.5 text-cyan-400" /> Destination Stop
                  </label>
                  <input
                    type="text"
                    value={toQuery}
                    onChange={(e) => setToQuery(e.target.value)}
                    placeholder="e.g. Jalandhar Central Bus Terminal"
                    className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>

                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center space-x-2"
                  >
                    <span>Search</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>

              {/* Live Bus Tracking Card Preview */}
              <div className="pt-4 border-t border-gray-800/80">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-gray-900/60 p-4 rounded-2xl border border-gray-800">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center">
                        <Bus className="w-6 h-6 text-blue-400" />
                      </div>
                      <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-gray-950 rounded-full animate-ping" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-base">BUS-101</span>
                        <span className="text-xs bg-emerald-500/20 text-emerald-400 font-semibold px-2 py-0.5 rounded">ON ROUTE</span>
                      </div>
                      <p className="text-xs text-gray-400">Phagwara ➔ Jalandhar Express • Speed: <span className="text-white font-mono font-medium">42 km/h</span></p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-6 text-right w-full md:w-auto justify-between md:justify-end">
                    <div>
                      <div className="text-[10px] uppercase font-bold text-gray-500">Next Stop</div>
                      <div className="text-xs font-semibold text-gray-200">LPU Main Gate</div>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase font-bold text-gray-500">ETA</div>
                      <div className="text-sm font-bold text-cyan-400 font-mono">6 min</div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* SECTION 3: FEATURE CARDS */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <h2 className="text-3xl font-extrabold text-white">Engineered for Seamless Commuting</h2>
          <p className="text-gray-400 text-sm">
            Everything you need for stress-free public transport navigation in a single intuitive interface.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="glass-card p-8 rounded-3xl space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center">
              <Activity className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-xl font-bold text-white">Real-Time Bus Tracking</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Track active buses live on interactive maps with sub-second WebSocket updates and accurate speed telematics.
            </p>
          </div>

          <div className="glass-card p-8 rounded-3xl space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-cyan-600/10 border border-cyan-500/20 flex items-center justify-center">
              <Search className="w-6 h-6 text-cyan-400" />
            </div>
            <h3 className="text-xl font-bold text-white">Smart Route Finder</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Compare fares, duration, number of transfers, and next available bus ETAs across all city bus routes.
            </p>
          </div>

          <div className="glass-card p-8 rounded-3xl space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-600/10 border border-amber-500/20 flex items-center justify-center">
              <Bell className="w-6 h-6 text-amber-400" />
            </div>
            <h3 className="text-xl font-bold text-white">Live Service Alerts</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Instant alerts for road diversions, bus delays, stop closures, and emergency traffic updates.
            </p>
          </div>

        </div>
      </section>

      {/* SECTION 4: HOW RIDEWISE WORKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel p-10 lg:p-16 rounded-3xl border border-gray-800 space-y-12">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h2 className="text-3xl font-bold text-white">How RideWise Works</h2>
            <p className="text-gray-400 text-sm">3 simple steps to reach your destination on time</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4 relative">
              <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-sm shadow-lg shadow-blue-500/30">
                1
              </div>
              <h4 className="text-lg font-bold text-white">Enter From & To</h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                Type your starting bus stop and destination to get instant route recommendations and fare details.
              </p>
            </div>

            <div className="space-y-4 relative">
              <div className="w-10 h-10 rounded-full bg-cyan-600 text-white font-bold flex items-center justify-center text-sm shadow-lg shadow-cyan-500/30">
                2
              </div>
              <h4 className="text-lg font-bold text-white">Track Live Bus ETA</h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                Watch the assigned bus move on the live map in real time and head to the stop right before it arrives.
              </p>
            </div>

            <div className="space-y-4 relative">
              <div className="w-10 h-10 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-sm shadow-lg shadow-emerald-500/30">
                3
              </div>
              <h4 className="text-lg font-bold text-white">Board & Relax</h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                Get step-by-step stop alerts and save frequent routes to your favorites for instant 1-tap access.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: PLATFORM STATISTICS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="glass-card p-6 rounded-2xl text-center space-y-1">
            <div className="text-3xl lg:text-4xl font-extrabold text-white font-mono gradient-text">
              {MOCK_STATS.totalUsers.toLocaleString()}+
            </div>
            <div className="text-xs font-medium text-gray-400 uppercase tracking-wider">Active Passengers</div>
          </div>

          <div className="glass-card p-6 rounded-2xl text-center space-y-1">
            <div className="text-3xl lg:text-4xl font-extrabold text-white font-mono text-cyan-400">
              {MOCK_STATS.activeBuses}
            </div>
            <div className="text-xs font-medium text-gray-400 uppercase tracking-wider">Tracked Buses</div>
          </div>

          <div className="glass-card p-6 rounded-2xl text-center space-y-1">
            <div className="text-3xl lg:text-4xl font-extrabold text-white font-mono text-emerald-400">
              {MOCK_STATS.onTimePercentage}%
            </div>
            <div className="text-xs font-medium text-gray-400 uppercase tracking-wider">On-Time Accuracy</div>
          </div>

          <div className="glass-card p-6 rounded-2xl text-center space-y-1">
            <div className="text-3xl lg:text-4xl font-extrabold text-white font-mono text-amber-400">
              {MOCK_STATS.totalRoutes}
            </div>
            <div className="text-xs font-medium text-gray-400 uppercase tracking-wider">Connected Routes</div>
          </div>
        </div>
      </section>

      {/* SECTION 6: FAQ ACCORDION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold text-white">Frequently Asked Questions</h2>
          <p className="text-gray-400 text-sm">Everything you need to know about RideWise</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="glass-panel rounded-2xl border border-gray-800 overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full text-left p-6 flex items-center justify-between font-semibold text-white hover:text-blue-400 transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-5 h-5 transition-transform ${openFaq === idx ? 'rotate-180 text-blue-400' : 'text-gray-500'}`} />
              </button>
              {openFaq === idx && (
                <div className="px-6 pb-6 text-sm text-gray-400 leading-relaxed border-t border-gray-800/60 pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 7: FINAL CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-600 p-10 md:p-16 text-center space-y-6 overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Ready to Upgrade Your Daily Commute?
            </h2>
            <p className="text-blue-100 text-sm sm:text-base">
              Join thousands of riders using RideWise for real-time bus tracking and smart public transport routing.
            </p>
            <div className="pt-2 flex justify-center">
              <Link
                to="/search"
                className="bg-white text-blue-900 font-extrabold px-8 py-4 rounded-2xl shadow-xl hover:bg-gray-100 transition-all hover:scale-105"
              >
                Find Your Route Now
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
