import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useApplicationData } from '../../context/ApplicationDataContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { Users, RotateCcw, Shield, ExternalLink } from 'lucide-react';
import { ROUTES } from '../../config/routes';

export const RoleSwitcherBanner: React.FC = () => {
  const { user, switchPersona, allPersonas } = useAuth();
  const { resetToFixtures } = useApplicationData();
  const navigate = useNavigate();
  const location = useLocation();

  const handleReset = async () => {
    if (window.confirm('Reset all applications, deficiencies, and documents to default seed state?')) {
      await resetToFixtures();
      alert('Mock database reset to default demo scenario.');
    }
  };

  const handlePersonaChange = (key: string) => {
    switchPersona(key);
    if (key === 'ADMIN_OFFICER') {
      navigate(ROUTES.ADMIN.DASHBOARD);
    } else {
      navigate(ROUTES.APPLICANT.DASHBOARD);
    }
  };

  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="bg-[#0A2540] text-white border-b border-[#1E3A5F] px-4 py-2 text-xs flex flex-wrap items-center justify-between gap-3 z-40 select-none">
      <div className="flex items-center gap-2.5">
        <span className="flex items-center gap-1.5 font-semibold text-sky-400 bg-sky-950/80 px-2 py-0.5 rounded border border-sky-800">
          <Shield className="w-3.5 h-3.5" />
          <span>Interactive Prototype</span>
        </span>
        <span className="text-slate-300 hidden sm:inline">
          Active Persona: <strong className="text-white">{user?.fullName}</strong> ({user?.role === 'ADMIN' ? 'Ministry Scrutiny Officer' : 'ST Scholar / Applicant'})
        </span>
      </div>

      <div className="flex items-center gap-3">
        {/* Switch Persona */}
        <div className="flex items-center gap-1.5">
          <Users className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-400 hidden md:inline">Switch Role:</span>
          <select
            value={user?.id === 'user-adm-001' ? 'ADMIN_OFFICER' : user?.id === 'user-app-002' ? 'APPLICANT_POOJA' : 'APPLICANT_RAJESH'}
            onChange={(e) => handlePersonaChange(e.target.value)}
            className="bg-[#143258] text-white text-xs rounded border border-[#2B4B75] px-2 py-1 outline-none cursor-pointer focus:ring-1 focus:ring-sky-400"
          >
            <option value="APPLICANT_RAJESH">Rajesh Soren (ST/PVTG Applicant - NFST)</option>
            <option value="ADMIN_OFFICER">Dr. V. K. Sharma (MoTA Scrutiny Officer)</option>
            <option value="APPLICANT_POOJA">Pooja Kispotta (ST Scholar - NOS Overseas)</option>
          </select>
        </div>

        {/* Quick Portal Switcher */}
        {isAdminRoute ? (
          <button
            onClick={() => navigate(ROUTES.APPLICANT.DASHBOARD)}
            className="flex items-center gap-1 text-sky-300 hover:text-white px-2 py-1 rounded bg-[#143258] border border-[#2B4B75] hover:bg-[#1E4374] transition-colors"
          >
            <span>Applicant View</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        ) : (
          <button
            onClick={() => navigate(ROUTES.ADMIN.DASHBOARD)}
            className="flex items-center gap-1 text-sky-300 hover:text-white px-2 py-1 rounded bg-[#143258] border border-[#2B4B75] hover:bg-[#1E4374] transition-colors"
          >
            <span>Admin Control Center</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        )}

        {/* Reset State Button */}
        <button
          onClick={handleReset}
          title="Reset to default seed applications"
          className="flex items-center gap-1 text-slate-300 hover:text-white px-2 py-1 rounded hover:bg-[#143258] transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          <span className="hidden sm:inline">Reset Demo Data</span>
        </button>
      </div>
    </div>
  );
};
