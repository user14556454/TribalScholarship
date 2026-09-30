import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ApplicationDataProvider } from './context/ApplicationDataContext';

// Layouts
import { ApplicantLayout } from './components/layout/ApplicantLayout';
import { AdminLayout } from './components/layout/AdminLayout';

// Public Pages
import { LandingPage } from './pages/public/LandingPage';
import { LoginPage } from './pages/public/LoginPage';

// Applicant Pages
import { ApplicantDashboardPage } from './pages/applicant/DashboardPage';
import { SchemeSelectionPage } from './pages/applicant/SchemeSelectionPage';
import { ApplicationFormPage } from './pages/applicant/ApplicationFormPage';
import { ApplicationTrackingPage } from './pages/applicant/ApplicationTrackingPage';
import { DeficiencyResolutionPage } from './pages/applicant/DeficiencyResolutionPage';

// Admin Pages
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { ApplicationsQueuePage } from './pages/admin/ApplicationsQueuePage';
import { ApplicationScrutinyPage } from './pages/admin/ApplicationScrutinyPage';
import { AnalyticsPage } from './pages/admin/AnalyticsPage';

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <ApplicationDataProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />

            {/* Applicant Portal Routes */}
            <Route path="/applicant" element={<ApplicantLayout />}>
              <Route index element={<Navigate to="/applicant/dashboard" replace />} />
              <Route path="dashboard" element={<ApplicantDashboardPage />} />
              <Route path="schemes" element={<SchemeSelectionPage />} />
              <Route path="apply/:schemeId" element={<ApplicationFormPage />} />
              <Route path="tracking/:id" element={<ApplicationTrackingPage />} />
              <Route path="deficiencies/:id" element={<DeficiencyResolutionPage />} />
            </Route>

            {/* Administrator Portal Routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="dashboard" element={<AdminDashboardPage />} />
              <Route path="applications" element={<ApplicationsQueuePage />} />
              <Route path="applications/:id" element={<ApplicationScrutinyPage />} />
              <Route path="analytics" element={<AnalyticsPage />} />
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </ApplicationDataProvider>
    </AuthProvider>
  );
};

export default App;
