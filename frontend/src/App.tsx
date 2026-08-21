import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PublicLayout } from './layouts/PublicLayout';
import { AppLayout } from './layouts/AppLayout';
import { LandingPage } from './pages/LandingPage';
import { RouteSearchPage } from './pages/RouteSearchPage';
import { UserDashboardPage } from './pages/UserDashboardPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { FeaturesPage } from './pages/FeaturesPage';
import { NotFoundPage } from './pages/NotFoundPage';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/search" element={<RouteSearchPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        {/* Dashboard Routes */}
        <Route element={<AppLayout />}>
          <Route path="/app/dashboard" element={<UserDashboardPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
