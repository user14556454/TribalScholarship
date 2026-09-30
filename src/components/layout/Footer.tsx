import React from 'react';
import { ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-auto border-t border-[#E2E8F0] bg-white py-8 text-xs text-[#64748B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-[#0A2540] text-white flex items-center justify-center font-bold text-sm tracking-wider">
              TO
            </div>
            <div>
              <p className="font-semibold text-[#0F172A]">TribalOne — MoTA Scholar Portal</p>
              <p className="text-[11px] text-[#64748B]">Ministry of Tribal Affairs, Government of India</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs">
            <a href="#" className="hover:text-[#0284C7] transition-colors">Accessibility Statement</a>
            <a href="#" className="hover:text-[#0284C7] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#0284C7] transition-colors">Hyperlinking Policy</a>
            <a href="#" className="hover:text-[#0284C7] transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-[#0284C7] transition-colors">Help & FAQ</a>
          </div>

          <div className="flex items-center gap-1.5 text-[11px] text-[#64748B]">
            <ShieldCheck className="w-4 h-4 text-[#0E766E]" />
            <span>Govt. of India Standard Digital Service</span>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-[#F1F5F9] text-center text-[11px] text-[#94A3B8]">
          Designed for the Ministry of Tribal Affairs (Problem Statement 26239) · Built on React 19 & TypeScript
        </div>
      </div>
    </footer>
  );
};
