import React from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../config/routes';
import { useAuth } from '../../context/AuthContext';
import { RoleSwitcherBanner } from './RoleSwitcherBanner';
import { Footer } from './Footer';
import {
  LayoutDashboard,
  GraduationCap,
  FileText,
  Bell,
  HelpCircle,
  LogOut,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

export const ApplicantLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate(ROUTES.PUBLIC.LANDING);
  };

  const navItems = [
    { label: 'Dashboard', to: ROUTES.APPLICANT.DASHBOARD, icon: <LayoutDashboard className="w-4 h-4" /> },
    { label: 'Explore Schemes', to: ROUTES.APPLICANT.SCHEMES, icon: <GraduationCap className="w-4 h-4" /> },
    { label: 'Track Application', to: '/applicant/tracking/NFST-2026-00124', icon: <FileText className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <RoleSwitcherBanner />

      {/* Top Header */}
      <header className="sticky top-0 z-30 bg-white border-b border-[#E2E8F0] shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-16 flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <Link to={ROUTES.APPLICANT.DASHBOARD} className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded bg-[#0A2540] text-white flex flex-col items-center justify-center font-bold">
                  <span className="text-[10px] text-sky-400 font-bold">MoTA</span>
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-[#0F172A] text-base">TribalOne</span>
                    <span className="text-[11px] font-semibold px-1.5 py-0.2 rounded bg-[#ECFDF5] text-[#065F46] border border-[#A7F3D0]">
                      Scholar Portal
                    </span>
                  </div>
                  <span className="text-[11px] text-[#64748B] block">Ministry of Tribal Affairs</span>
                </div>
              </Link>
            </div>

            {/* Navigation tabs */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-3 py-2 rounded text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-[#F0F9FF] text-[#0284C7] font-semibold'
                        : 'text-[#475569] hover:text-[#0F172A] hover:bg-[#F1F5F9]'
                    }`
                  }
                >
                  {item.icon}
                  <span>{item.label}</span>
                </NavLink>
              ))}
            </nav>

            {/* User Profile & Actions */}
            <div className="flex items-center gap-3">
              <button
                className="p-2 text-[#64748B] hover:text-[#0F172A] hover:bg-[#F1F5F9] rounded relative transition-colors"
                title="Notifications"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#DC2626]" />
              </button>

              <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-[#E2E8F0]">
                <div className="w-8 h-8 rounded-full bg-[#0A2540] text-white flex items-center justify-center font-bold text-xs uppercase">
                  {user?.fullName.charAt(0)}
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-xs font-bold text-[#0F172A] leading-tight">{user?.fullName}</span>
                  <span className="text-[10px] text-[#0E766E] font-medium flex items-center gap-0.5">
                    <ShieldCheck className="w-3 h-3" />
                    <span>ST / PVTG Scholar</span>
                  </span>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="p-1.5 text-[#64748B] hover:text-[#DC2626] hover:bg-[#FEF2F2] rounded transition-colors"
                title="Sign out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};
