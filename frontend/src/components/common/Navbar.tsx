import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bus, Search, Menu, X, ArrowRight, Activity, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import type { UserRole } from '../../types';

export const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout, switchRole } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;
  const roles: UserRole[] = ['USER', 'DRIVER', 'ADMIN'];

  return (
    <header className="sticky top-0 z-50 bg-gray-950/80 backdrop-blur-xl border-b border-gray-800/60 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center space-x-3 shrink-0 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/25 group-hover:scale-105 transition-transform duration-300">
              <Bus className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tight text-white flex items-center leading-none">
                Ride<span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent ml-0.5">Wise</span>
              </span>
              <span className="text-[9px] uppercase font-extrabold tracking-widest text-blue-400 mt-0.5">
                Public Transit AI
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-1.5 bg-gray-900/60 p-1.5 rounded-2xl border border-gray-800/80 backdrop-blur-md">
            <Link
              to="/"
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                isActive('/')
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'text-gray-300 hover:text-white hover:bg-gray-800/60'
              }`}
            >
              Home
            </Link>

            <Link
              to="/search"
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 flex items-center gap-1.5 ${
                isActive('/search')
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'text-gray-300 hover:text-white hover:bg-gray-800/60'
              }`}
            >
              <Search className="w-3.5 h-3.5 text-blue-400" />
              <span>Find Routes</span>
            </Link>

            <Link
              to="/app/dashboard"
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 flex items-center gap-1.5 ${
                isActive('/app/dashboard')
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'text-gray-300 hover:text-white hover:bg-gray-800/60'
              }`}
            >
              <Activity className="w-3.5 h-3.5 text-cyan-400" />
              <span>Live Dashboard</span>
            </Link>

            <Link
              to="/features"
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                isActive('/features')
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'text-gray-300 hover:text-white hover:bg-gray-800/60'
              }`}
            >
              Features
            </Link>

            <Link
              to="/about"
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                isActive('/about')
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'text-gray-300 hover:text-white hover:bg-gray-800/60'
              }`}
            >
              About
            </Link>

            <Link
              to="/contact"
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                isActive('/contact')
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'text-gray-300 hover:text-white hover:bg-gray-800/60'
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Right Action & Profile Bar */}
          <div className="hidden lg:flex items-center space-x-3 shrink-0">
            
            {/* Sleek Role Switcher Pill */}
            <div className="flex items-center bg-gray-900/90 p-1 rounded-2xl border border-gray-800">
              <span className="px-2 text-gray-500 font-bold text-[9px] uppercase tracking-wider">Role:</span>
              <div className="flex space-x-1">
                {roles.map((r) => (
                  <button
                    key={r}
                    onClick={() => switchRole(r)}
                    className={`px-2.5 py-1 rounded-xl text-[11px] font-bold tracking-wide transition-all duration-200 ${
                      user?.role === r
                        ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md shadow-blue-600/30 scale-105'
                        : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/50'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            {/* Authenticated User / Sign In Pill */}
            {isAuthenticated ? (
              <div className="flex items-center space-x-2">
                <Link
                  to="/app/dashboard"
                  className="flex items-center space-x-2.5 bg-gray-900 hover:bg-gray-850 border border-gray-800 px-3.5 py-2 rounded-2xl text-xs font-semibold text-gray-200 transition-all shadow-sm"
                >
                  <div className="relative">
                    <img
                      src={user?.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'}
                      alt={user?.name}
                      className="w-6 h-6 rounded-full object-cover ring-2 ring-blue-500/50"
                    />
                    <span className="w-2 h-2 bg-emerald-400 rounded-full absolute -bottom-0.5 -right-0.5 ring-2 ring-gray-950"></span>
                  </div>
                  <span className="font-bold text-white max-w-[100px] truncate">{user?.name}</span>
                  <span className="bg-blue-500/20 text-blue-400 text-[9px] font-extrabold px-2 py-0.5 rounded-lg border border-blue-500/30 uppercase">
                    {user?.role}
                  </span>
                </Link>

                <button
                  onClick={logout}
                  title="Sign Out"
                  className="p-2 rounded-xl text-gray-400 hover:text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-all"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="text-xs font-bold text-gray-300 hover:text-white px-3.5 py-2 rounded-xl transition-all"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="flex items-center space-x-1.5 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-lg shadow-blue-600/30 transition-all hover:scale-105"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl text-gray-400 hover:text-white bg-gray-900 border border-gray-800"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-gray-950/95 backdrop-blur-2xl border-b border-gray-800 px-4 pt-3 pb-6 space-y-3">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-2.5 rounded-xl text-sm font-semibold text-gray-300 hover:bg-gray-900"
          >
            Home
          </Link>
          <Link
            to="/search"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-2.5 rounded-xl text-sm font-semibold text-gray-300 hover:bg-gray-900"
          >
            Find Routes
          </Link>
          <Link
            to="/app/dashboard"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-2.5 rounded-xl text-sm font-semibold text-gray-300 hover:bg-gray-900"
          >
            Live Dashboard
          </Link>
          <Link
            to="/features"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-4 py-2.5 rounded-xl text-sm font-semibold text-gray-300 hover:bg-gray-900"
          >
            Features
          </Link>

          <div className="pt-4 border-t border-gray-800 space-y-3">
            <div className="flex items-center justify-between px-2">
              <span className="text-xs text-gray-400 font-bold uppercase">Demo Role Switcher</span>
              <div className="flex space-x-1">
                {roles.map((r) => (
                  <button
                    key={r}
                    onClick={() => switchRole(r)}
                    className={`px-2.5 py-1 text-xs rounded-lg font-bold ${
                      user?.role === r ? 'bg-blue-600 text-white' : 'bg-gray-900 text-gray-400'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
