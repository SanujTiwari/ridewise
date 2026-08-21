import React from 'react';
import { Bus, Target, ShieldCheck, Cpu } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold">
          <Bus className="w-4 h-4" />
          <span>About RideWise Platform</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Revolutionizing Urban Transit with <span className="gradient-text">Real-Time Intelligence</span>
        </h1>
        <p className="text-gray-400 text-base leading-relaxed">
          RideWise is built to bridge the gap between commuters, drivers, and municipal transport authorities using sub-second GPS telematics, smart routing algorithms, and high-performance event-driven micro-architectures.
        </p>
      </div>

      {/* Mission Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="glass-card p-8 rounded-3xl space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
            <Target className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white">Our Mission</h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            Eliminate transit uncertainty by delivering sub-second bus arrival predictions and seamless multi-modal route planning for every citizen.
          </p>
        </div>

        <div className="glass-card p-8 rounded-3xl space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-cyan-600/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
            <Cpu className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white">High-Tech Infrastructure</h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            Engineered with FastAPI, Redis Streams, PostgreSQL, WebSockets, and Leaflet Maps for maximum throughput and reliability.
          </p>
        </div>

        <div className="glass-card p-8 rounded-3xl space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-600/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white">Enterprise Security</h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            Role-Based Access Control (RBAC) ensuring strict separation between passenger, driver telematics, and administrative operations.
          </p>
        </div>
      </div>

      {/* Tech Stack Specs Box */}
      <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-gray-800 space-y-6">
        <h2 className="text-2xl font-bold text-white">Engineering & Architecture</h2>
        <p className="text-gray-400 text-sm leading-relaxed max-w-3xl">
          RideWise adheres to modern software engineering best practices. Designed as a modular monolith ready for containerized Kubernetes deployment, it handles real-time spatial indexing, ETA calculation caches, and distributed event logging.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
          <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 space-y-1">
            <div className="text-gray-500 uppercase">Frontend</div>
            <div className="text-white font-bold">React + Vite + TS</div>
          </div>
          <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 space-y-1">
            <div className="text-gray-500 uppercase">Backend</div>
            <div className="text-cyan-400 font-bold">FastAPI Python</div>
          </div>
          <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 space-y-1">
            <div className="text-gray-500 uppercase">Database</div>
            <div className="text-blue-400 font-bold">PostgreSQL</div>
          </div>
          <div className="bg-gray-900 p-4 rounded-xl border border-gray-800 space-y-1">
            <div className="text-gray-500 uppercase">Caching</div>
            <div className="text-emerald-400 font-bold">Redis Streams</div>
          </div>
        </div>
      </div>

    </div>
  );
};
