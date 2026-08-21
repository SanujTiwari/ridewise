import React from 'react';
import { Bus, Search, Map, Bell, Shield, Heart, Activity, Smartphone, SlidersHorizontal, RefreshCw } from 'lucide-react';

export const FeaturesPage: React.FC = () => {
  const featureList = [
    { icon: Activity, title: 'Sub-Second Live GPS Tracking', desc: 'Watch active buses move dynamically across the interactive Leaflet map canvas with speed telematics.' },
    { icon: Search, title: 'Smart Route Recommendation Engine', desc: 'Compare fares, transfer counts, total trip durations, and next bus arrival times across city networks.' },
    { icon: Bell, title: 'Service Disruption Alerts', desc: 'Instant notifications for road diversions, bus cancellations, route changes, and emergency closures.' },
    { icon: Shield, title: 'Role-Based Authentication (RBAC)', desc: 'Distinct interface workflows tailored for Passengers, Bus Drivers, and Transport Fleet Administrators.' },
    { icon: SlidersHorizontal, title: 'Driver Telematics Portal', desc: 'Enables bus operators to start trips, monitor assigned routes, and stream GPS coordinates directly.' },
    { icon: RefreshCw, title: 'Redis Cache & Event Streams', desc: 'High-speed caching for ETAs and location payloads ensuring seamless scalability during peak traffic.' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <h1 className="text-4xl font-extrabold text-white">Full Platform Features</h1>
        <p className="text-gray-400 text-sm">Explore the technological capabilities behind the RideWise smart transit ecosystem.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {featureList.map((item, i) => {
          const Icon = item.icon;
          return (
            <div key={i} className="glass-card p-8 rounded-3xl space-y-4 hover:border-blue-500/40 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">{item.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
