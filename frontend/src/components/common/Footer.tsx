import React from 'react';
import { Link } from 'react-router-dom';
import { Bus, Code, Globe, Terminal } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-950 border-t border-gray-800 text-gray-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Col 1: Brand & Tagline */}
          <div className="space-y-4 md:col-span-1">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/20">
                <Bus className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-extrabold text-white">
                Ride<span className="gradient-text">Wise</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Smart public transit companion providing real-time bus tracking, ETA predictions, route search, and service alert updates.
            </p>
            <div className="flex items-center space-x-3 text-gray-400 pt-2">
              <a href="https://github.com/SanujTiwari/ridewise" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-gray-900 hover:bg-gray-800 hover:text-white transition-all" title="GitHub Repository">
                <Code className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-gray-900 hover:bg-gray-800 hover:text-white transition-all" title="Live Portal">
                <Globe className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-gray-900 hover:bg-gray-800 hover:text-white transition-all" title="API Docs">
                <Terminal className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Passenger Services */}
          <div>
            <h4 className="text-white font-semibold mb-4 uppercase tracking-wider text-xs">Passengers</h4>
            <ul className="space-y-2.5">
              <li><Link to="/search" className="hover:text-blue-400 transition-colors">Find Bus Routes</Link></li>
              <li><Link to="/app/dashboard" className="hover:text-blue-400 transition-colors">Live Bus Map</Link></li>
              <li><Link to="/app/dashboard" className="hover:text-blue-400 transition-colors">Nearby Stops</Link></li>
              <li><Link to="/app/dashboard" className="hover:text-blue-400 transition-colors">Service Alerts</Link></li>
              <li><Link to="/app/dashboard" className="hover:text-blue-400 transition-colors">Trip History</Link></li>
            </ul>
          </div>

          {/* Col 3: Drivers & Admin */}
          <div>
            <h4 className="text-white font-semibold mb-4 uppercase tracking-wider text-xs">Platform Roles</h4>
            <ul className="space-y-2.5">
              <li><Link to="/app/dashboard" className="hover:text-blue-400 transition-colors">Passenger Dashboard</Link></li>
              <li><Link to="/app/dashboard" className="hover:text-blue-400 transition-colors">Driver Trip Portal</Link></li>
              <li><Link to="/app/dashboard" className="hover:text-blue-400 transition-colors">Admin Fleet Control</Link></li>
              <li><a href="#system-design" className="hover:text-blue-400 transition-colors">System Architecture</a></li>
              <li><a href="#api" className="hover:text-blue-400 transition-colors">API Documentation</a></li>
            </ul>
          </div>

          {/* Col 4: Status & Trust */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold mb-4 uppercase tracking-wider text-xs">System Health</h4>
            <div className="glass-card p-4 rounded-xl space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 font-medium text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  All Systems Operational
                </span>
                <span className="text-gray-400 font-mono">99.9% Uptime</span>
              </div>
              <p className="text-xs text-gray-400">
                Powered by FastAPI, Redis Streams, PostgreSQL & WebSockets.
              </p>
            </div>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="mt-12 pt-8 border-t border-gray-900 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <p>© {new Date().getFullYear()} RideWise Platform. Open Source Project by Sanuj Tiwari.</p>
          <div className="flex items-center space-x-6 text-gray-500">
            <a href="#" className="hover:text-gray-300">Privacy Policy</a>
            <a href="#" className="hover:text-gray-300">Terms of Service</a>
            <a href="#" className="hover:text-gray-300">Architecture Specs</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
