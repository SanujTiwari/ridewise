import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Search,
  Map,
  MapPin,
  Heart,
  Bell,
  History,
  Navigation,
  Bus,
  Users,
  Shield,
  BarChart3,
  AlertTriangle,
  SlidersHorizontal
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Sidebar: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();
  const role = user?.role || 'USER';

  const isActive = (path: string) => location.pathname === path;

  // Passenger Navigation Links
  const userLinks = [
    { label: 'User Overview', path: '/app/dashboard', icon: LayoutDashboard },
    { label: 'Search Routes', path: '/search', icon: Search },
    { label: 'Live Bus Tracking', path: '/app/dashboard?tab=tracking', icon: Map },
    { label: 'Nearby Bus Stops', path: '/app/dashboard?tab=stops', icon: MapPin },
    { label: 'Favorite Routes', path: '/app/dashboard?tab=favorites', icon: Heart },
    { label: 'Service Alerts', path: '/app/dashboard?tab=alerts', icon: Bell },
    { label: 'Trip History', path: '/app/dashboard?tab=history', icon: History }
  ];

  // Driver Navigation Links
  const driverLinks = [
    { label: 'Driver Dashboard', path: '/app/dashboard', icon: LayoutDashboard },
    { label: 'Assigned Bus & Route', path: '/app/dashboard?tab=driver-bus', icon: Bus },
    { label: 'Start / Active Trip', path: '/app/dashboard?tab=active-trip', icon: Navigation },
    { label: 'Location Streamer', path: '/app/dashboard?tab=driver-gps', icon: SlidersHorizontal },
    { label: 'Driver Trip History', path: '/app/dashboard?tab=driver-history', icon: History }
  ];

  // Admin Navigation Links
  const adminLinks = [
    { label: 'Fleet Overview', path: '/app/dashboard', icon: LayoutDashboard },
    { label: 'Live Bus Monitor', path: '/app/dashboard?tab=admin-monitor', icon: Map },
    { label: 'User Management', path: '/app/dashboard?tab=admin-users', icon: Users },
    { label: 'Driver Roster', path: '/app/dashboard?tab=admin-drivers', icon: Shield },
    { label: 'Bus Management', path: '/app/dashboard?tab=admin-buses', icon: Bus },
    { label: 'Route & Stops', path: '/app/dashboard?tab=admin-routes', icon: MapPin },
    { label: 'Service Alerts', path: '/app/dashboard?tab=admin-alerts', icon: AlertTriangle },
    { label: 'Analytics & Reports', path: '/app/dashboard?tab=admin-analytics', icon: BarChart3 }
  ];

  const currentLinks = role === 'ADMIN' ? adminLinks : role === 'DRIVER' ? driverLinks : userLinks;

  return (
    <aside className="w-64 bg-gray-950/90 border-r border-gray-800/80 min-h-[calc(100vh-5rem)] p-4 flex flex-col justify-between hidden md:flex">
      <div className="space-y-6">
        
        {/* Role Badge Indicator */}
        <div className="bg-gray-900/80 p-3 rounded-xl border border-gray-800 flex items-center space-x-3">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-white text-xs ${
            role === 'ADMIN' ? 'bg-purple-600' : role === 'DRIVER' ? 'bg-amber-600' : 'bg-blue-600'
          }`}>
            {role[0]}
          </div>
          <div>
            <div className="text-xs text-gray-400 font-medium">Active Mode</div>
            <div className="text-sm font-bold text-white uppercase tracking-wider">{role} PORTAL</div>
          </div>
        </div>

        {/* Navigation Section */}
        <div>
          <div className="text-[10px] uppercase font-bold tracking-wider text-gray-400 px-3 mb-2">
            Main Navigation
          </div>
          <nav className="space-y-1">
            {currentLinks.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <Link
                  key={item.label}
                  to={item.path}
                  className={`flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    active
                      ? 'bg-blue-600/15 text-blue-400 border border-blue-500/20 font-semibold'
                      : 'text-gray-400 hover:text-white hover:bg-gray-900/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${active ? 'text-blue-400' : 'text-gray-400'}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

      </div>

      {/* Footer info in sidebar */}
      <div className="pt-4 border-t border-gray-900 text-xs text-gray-400 space-y-2">
        <div className="flex items-center justify-between">
          <span>Simulation Engine</span>
          <span className="text-emerald-400 font-mono">ONLINE</span>
        </div>
        <div className="text-[11px] text-gray-400">
          FastAPI + Redis Streams Backend
        </div>
      </div>
    </aside>
  );
};
