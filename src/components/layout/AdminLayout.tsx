import React from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../config/routes';
import { useAuth } from '../../context/AuthContext';
import { RoleSwitcherBanner } from './RoleSwitcherBanner';
import {
  LayoutDashboard,
  FileCheck2,
  BarChart3,
  Settings,
  Bell,
  LogOut,
  Search,
  Shield,
  Layers
} from 'lucide-react';

export const AdminLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate(ROUTES.PUBLIC.LANDING);
  };

  const navLinks = [
    { label: 'Control Center', to: ROUTES.ADMIN.DASHBOARD, icon: <LayoutDashboard className="w-4 h-4" /> },
    { label: 'Applications Queue', to: ROUTES.ADMIN.APPLICATIONS, icon: <FileCheck2 className="w-4 h-4" /> },
    { label: 'Analytics & Reports', to: ROUTES.ADMIN.ANALYTICS, icon: <BarChart3 className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <RoleSwitcherBanner />

      {/* Admin Top Masthead */}
      <header className="sticky top-0 z-30 bg-[#0A2540] text-white border-b border-[#1E3A5F] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-16 flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <Link to={ROUTES.ADMIN.DASHBOARD} className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded bg-white text-[#0A2540] flex flex-col items-center justify-center font-bold">
                  <span className="text-[10px] text-sky-700 font-extrabold">MoTA</span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-base tracking-tight">TribalOne Admin</span>
                    <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-sky-950 text-sky-400 border border-sky-800">
                      CONTROL CENTER
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-300">Ministry of Tribal Affairs · Official Workbench</span>
                </div>
              </Link>
            </div>

            {/* Navigation Links */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-3.5 py-2 rounded text-xs font-semibold transition-colors ${
                      isActive
                        ? 'bg-[#143258] text-sky-300 border border-[#2B4B75]'
                        : 'text-slate-300 hover:text-white hover:bg-[#143258]'
                    }`
                  }
                >
                  {item.icon}
                  <span>{item.label}</span>
                </NavLink>
              ))}
            </nav>

            {/* Officer Profile & Signout */}
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex flex-col text-right">
                <span className="text-xs font-bold text-white leading-tight">{user?.fullName}</span>
                <span className="text-[10px] text-sky-300 font-medium">{user?.designation || 'MoTA Scrutiny Officer'}</span>
              </div>

              <div className="w-8 h-8 rounded-full bg-sky-600 text-white flex items-center justify-center font-bold text-xs uppercase shadow-xs">
                {user?.fullName.charAt(0)}
              </div>

              <button
                onClick={handleLogout}
                className="p-1.5 text-slate-300 hover:text-red-400 hover:bg-[#143258] rounded transition-colors ml-1"
                title="Sign out of Admin Session"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Admin Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Outlet />
      </main>

      {/* Admin Footer */}
      <footer className="border-t border-[#E2E8F0] bg-white py-4 text-xs text-[#64748B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>MoTA Scholar Platform Administration · Restricted Government Intranet Service</span>
          <span className="font-mono text-[11px] text-[#94A3B8]">Audit Engine Version: 2026.09-PROD</span>
        </div>
      </footer>
    </div>
  );
};
