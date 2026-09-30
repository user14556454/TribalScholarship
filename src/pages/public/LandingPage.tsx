import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { PublicNavbar } from '../../components/layout/PublicNavbar';
import { Footer } from '../../components/layout/Footer';
import { RoleSwitcherBanner } from '../../components/layout/RoleSwitcherBanner';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { SCHEMES } from '../../config/schemes';
import { ROUTES } from '../../config/routes';
import {
  Compass,
  Search,
  CheckCircle2,
  Shield,
  Sparkles,
  ArrowRight,
  Award,
  Users,
  Building,
  GraduationCap,
  FileCheck,
  CreditCard
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <RoleSwitcherBanner />
      <PublicNavbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-[#0A2540] to-[#0D3156] text-white py-16 md:py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-950/80 border border-sky-700/60 text-sky-300 text-xs font-semibold mb-6">
              <Shield className="w-3.5 h-3.5 text-sky-400" />
              <span>Ministry of Tribal Affairs · Government of India</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-white mb-6">
              Empowering Scheduled Tribe Scholars with Transparent Fellowship Management
            </h1>

            <p className="text-base sm:text-lg text-slate-300 mb-8 leading-relaxed">
              TribalOne is the official unified platform for applying, verifying, and tracking national fellowships and overseas scholarships. AI-assisted document scrutiny with guaranteed human oversight.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Button
                variant="primary"
                size="lg"
                onClick={() => navigate(ROUTES.APPLICANT.SCHEMES)}
                rightIcon={<ArrowRight className="w-5 h-5" />}
                className="bg-[#0284C7] hover:bg-[#0369A1] text-white font-bold px-6"
              >
                Apply for a Scholarship (2026-27)
              </Button>

              <Button
                variant="secondary"
                size="lg"
                onClick={() => navigate('/applicant/tracking/NFST-2026-00124')}
                leftIcon={<Search className="w-4 h-4" />}
                className="bg-white/10 hover:bg-white/20 text-white border-white/20"
              >
                Track Existing Application
              </Button>
            </div>
          </div>
        </div>

        {/* Decorative subtle civic grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1E3A5F15_1px,transparent_1px),linear-gradient(to_bottom,#1E3A5F15_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
      </section>

      {/* Key Stats Bar */}
      <section className="bg-white border-b border-[#E2E8F0] py-6 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-2">
              <p className="text-2xl sm:text-3xl font-extrabold text-[#0A2540]">750 Slots</p>
              <p className="text-xs text-[#64748B] mt-1 font-medium">National Fellowships (NFST)</p>
            </div>
            <div className="p-2 border-l border-[#E2E8F0]">
              <p className="text-2xl sm:text-3xl font-extrabold text-[#0A2540]">20 Awards</p>
              <p className="text-xs text-[#64748B] mt-1 font-medium">National Overseas (NOS)</p>
            </div>
            <div className="p-2 border-l border-[#E2E8F0]">
              <p className="text-2xl sm:text-3xl font-extrabold text-[#0A2540]">₹84.5 Cr</p>
              <p className="text-xs text-[#64748B] mt-1 font-medium">Direct DBT Disbursed</p>
            </div>
            <div className="p-2 border-l border-[#E2E8F0]">
              <p className="text-2xl sm:text-3xl font-extrabold text-[#0A2540]">60% Faster</p>
              <p className="text-xs text-[#64748B] mt-1 font-medium">Median Processing Turnaround</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Schemes Section */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#0284C7] bg-[#F0F9FF] px-2.5 py-1 rounded border border-[#BAE6FD]">
              Academic Year 2026-27
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A] mt-2">
              Available MoTA Fellowship & Scholarship Schemes
            </h2>
            <p className="text-sm text-[#64748B] mt-1">
              Select an approved government scheme to check eligibility requirements and apply online.
            </p>
          </div>

          <Link to={ROUTES.APPLICANT.SCHEMES}>
            <Button variant="secondary" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
              View All Schemes
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SCHEMES.map((scheme) => (
            <Card key={scheme.id} className="flex flex-col justify-between hover:border-[#CBD5E1] transition-all">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-[#0284C7] bg-[#F0F9FF] px-2 py-0.5 rounded border border-[#BAE6FD]">
                    {scheme.code}
                  </span>
                  <span className="text-[11px] font-semibold text-[#0E766E] bg-[#ECFDF5] px-2 py-0.5 rounded border border-[#A7F3D0]">
                    Applications Open
                  </span>
                </div>

                <h3 className="text-base font-bold text-[#0F172A] mb-2 leading-snug">{scheme.title}</h3>
                <p className="text-xs text-[#64748B] leading-relaxed mb-4">{scheme.shortDescription}</p>

                <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded mb-4 text-xs">
                  <p className="font-semibold text-[#64748B] uppercase text-[10px]">Stipend / Award</p>
                  <p className="font-bold text-[#0A2540] mt-0.5">{scheme.stipendOrAwardText}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-[#F1F5F9] flex items-center justify-between">
                <span className="text-xs text-[#64748B]">
                  Deadline: <strong className="text-[#0F172A]">{scheme.applicationDeadline}</strong>
                </span>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => navigate(`/applicant/apply/${scheme.id}`)}
                >
                  Apply Now
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* End-to-End Workflow Stepper */}
      <section className="bg-white py-16 border-t border-[#E2E8F0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A]">How TribalOne Works</h2>
            <p className="text-sm text-[#64748B] mt-2">
              A transparent, five-stage digital journey from application submission to direct bank disbursement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg">
              <div className="w-8 h-8 rounded bg-[#0A2540] text-white flex items-center justify-center font-bold text-xs mb-3">
                1
              </div>
              <h4 className="text-sm font-bold text-[#0F172A]">Online Application</h4>
              <p className="text-xs text-[#64748B] mt-1 leading-relaxed">
                Save drafts across sessions, upload certificates, and get instant eligibility feedback.
              </p>
            </div>

            <div className="p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg">
              <div className="w-8 h-8 rounded bg-[#0284C7] text-white flex items-center justify-center font-bold text-xs mb-3">
                2
              </div>
              <h4 className="text-sm font-bold text-[#0F172A]">AI-Assisted Scrutiny</h4>
              <p className="text-xs text-[#64748B] mt-1 leading-relaxed">
                OCR cross-validates marks, income, and community names against central Gazette data.
              </p>
            </div>

            <div className="p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg">
              <div className="w-8 h-8 rounded bg-[#0A2540] text-white flex items-center justify-center font-bold text-xs mb-3">
                3
              </div>
              <h4 className="text-sm font-bold text-[#0F172A]">Ministry Review</h4>
              <p className="text-xs text-[#64748B] mt-1 leading-relaxed">
                Authorised officials review flagged items. Structured deficiencies resolve easily online.
              </p>
            </div>

            <div className="p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg">
              <div className="w-8 h-8 rounded bg-[#0E766E] text-white flex items-center justify-center font-bold text-xs mb-3">
                4
              </div>
              <h4 className="text-sm font-bold text-[#0F172A]">Merit Allocation</h4>
              <p className="text-xs text-[#64748B] mt-1 leading-relaxed">
                Automated slot matching under PVTG, PwD, and female priority guidelines.
              </p>
            </div>

            <div className="p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg">
              <div className="w-8 h-8 rounded bg-[#0A2540] text-white flex items-center justify-center font-bold text-xs mb-3">
                5
              </div>
              <h4 className="text-sm font-bold text-[#0F172A]">DBT Disbursement</h4>
              <p className="text-xs text-[#64748B] mt-1 leading-relaxed">
                Direct PFMS bank transfer to Aadhaar-seeded accounts with online continuation tracking.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
