import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bus, MapPin, Search, Bell, Shield, User as UserIcon, Menu, X, ArrowRight, Activity } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';

export const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout, switchRole } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const roles: UserRole[] = ['USER', 'DRIVER', 'ADMIN'];

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-gray-800/80 bg-gray-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform duration-200">
              <Bus className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-2xl font-extrabold tracking-tight text-white flex items-center gap-1">
                Ride<span className="gradient-text">Wise</span>
              </span>
              <span className="block text-[10px] uppercase font-bold tracking-widest text-blue-400">
                Transit Companion
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            <Link
              to="/"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                isActive('/') ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20' : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
              }`}
            >
              Home
            </Link>
            <Link
              to="/search"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                isActive('/search') ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20' : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
              }`}
            >
              <Search className="w-4 h-4 inline mr-1.5" />
              Find Route
            </Link>
            <Link
              to="/app/dashboard"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                isActive('/app/dashboard') ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20' : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
              }`}
            >
              <Activity className="w-4 h-4 inline mr-1.5 text-cyan-400" />
              Live Dashboard
            </Link>
            <a
              href="#features"
              className="px-4 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all"
            >
              Features
            </a>
          </nav>

          {/* Role Switcher & Auth Section */}
          <div className="hidden lg:flex items-center space-x-4">
            
            {/* Quick Demo Role Switcher */}
            <div className="flex items-center bg-gray-900/90 p-1 rounded-xl border border-gray-800 text-xs">
              <span className="px-2 text-gray-400 font-semibold text-[10px] uppercase">Demo Role:</span>
              {roles.map((r) => (
                <button
                  key={r}
                  onClick={() => switchRole(r)}
                  className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                    user?.role === r
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-gray-400 hover:text-gray-200'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>

            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <Link
                  to="/app/dashboard"
                  className="flex items-center space-x-2 bg-gray-900 border border-gray-800 hover:border-gray-700 px-3.5 py-2 rounded-xl text-sm font-medium text-gray-200 transition-all"
                >
                  <img
                    src={user?.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'}
                    alt={user?.name}
                    className="w-6 h-6 rounded-full object-cover border border-blue-500"
                  />
                  <span>{user?.name}</span>
                  <span className="bg-blue-500/20 text-blue-400 text-[10px] font-bold px-1.5 py-0.5 rounded uppercase">
                    {user?.role}
                  </span>
                </Link>
                <button
                  onClick={logout}
                  className="text-xs text-gray-400 hover:text-red-400 font-medium px-2 py-1"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="text-sm font-medium text-gray-300 hover:text-white px-4 py-2 rounded-xl transition-all"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white text-sm font-semibold px-4 py-2.5 rounded-xl shadow-lg shadow-blue-500/25 transition-all hover:scale-[1.02]"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-gray-950 border-b border-gray-800 px-4 pt-2 pb-6 space-y-3">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-gray-300 hover:bg-gray-800"
          >
            Home
          </Link>
          <Link
            to="/search"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-gray-300 hover:bg-gray-800"
          >
            Find Route
          </Link>
          <Link
            to="/app/dashboard"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-base font-medium text-gray-300 hover:bg-gray-800"
          >
            Live Dashboard
          </Link>
          <div className="pt-4 border-t border-gray-800 flex items-center justify-between">
            <span className="text-xs text-gray-400 uppercase font-semibold">Demo Role:</span>
            <div className="flex space-x-1">
              {roles.map((r) => (
                <button
                  key={r}
                  onClick={() => switchRole(r)}
                  className={`px-2 py-1 text-xs rounded font-medium ${
                    user?.role === r ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
