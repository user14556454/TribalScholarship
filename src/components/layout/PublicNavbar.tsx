import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../config/routes';
import { Button } from '../common/Button';
import { Compass, Search, User, Globe } from 'lucide-react';

export const PublicNavbar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-[#E2E8F0] shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand identity */}
        <Link to={ROUTES.PUBLIC.LANDING} className="flex items-center gap-3.5 group">
          <div className="w-10 h-10 rounded-sm bg-[#0A2540] text-white flex flex-col items-center justify-center font-bold shadow-xs">
            <span className="text-xs leading-none tracking-widest text-sky-400">MoTA</span>
            <span className="text-[10px] leading-none text-slate-300">GOV</span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-lg font-bold tracking-tight text-[#0F172A] group-hover:text-[#0284C7] transition-colors">
                TribalOne
              </span>
              <span className="text-xs font-semibold px-1.5 py-0.2 rounded bg-[#F1F5F9] text-[#475569] border border-[#CBD5E1]">
                MoTA Scholar
              </span>
            </div>
            <span className="text-xs text-[#64748B]">Ministry of Tribal Affairs · Govt. of India</span>
          </div>
        </Link>

        {/* Public Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[#475569]">
          <Link to={ROUTES.PUBLIC.LANDING} className="hover:text-[#0284C7] transition-colors">
            Home
          </Link>
          <Link to={ROUTES.APPLICANT.SCHEMES} className="hover:text-[#0284C7] transition-colors">
            Available Schemes
          </Link>
          <Link to="/applicant/tracking/NFST-2026-00124" className="hover:text-[#0284C7] transition-colors">
            Track Application
          </Link>
          <a href="#guidelines" className="hover:text-[#0284C7] transition-colors">
            Guidelines & FAQs
          </a>
        </nav>

        {/* Right CTA Actions */}
        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-1.5 text-xs text-[#64748B] mr-2">
            <Globe className="w-3.5 h-3.5 text-[#0284C7]" />
            <span>English / हिंदी</span>
          </div>

          <Button
            variant="secondary"
            size="sm"
            onClick={() => navigate(ROUTES.PUBLIC.LOGIN)}
            leftIcon={<User className="w-3.5 h-3.5" />}
          >
            Portal Login
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={() => navigate(ROUTES.APPLICANT.SCHEMES)}
            leftIcon={<Compass className="w-3.5 h-3.5" />}
          >
            Apply for Fellowship
          </Button>
        </div>
      </div>
    </header>
  );
};
