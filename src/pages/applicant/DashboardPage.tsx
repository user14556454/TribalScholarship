import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useApplicationData } from '../../context/ApplicationDataContext';
import { ApplicationDetail } from '../../types/application';
import { DeficiencyBanner } from '../../components/applicant/DeficiencyBanner';
import { ApplicationProgressTracker } from '../../components/applicant/ApplicationProgressTracker';
import { Badge } from '../../components/common/Badge';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { SCHEMES } from '../../config/schemes';
import { ROUTES } from '../../config/routes';
import {
  FileText,
  Clock,
  ArrowRight,
  ShieldCheck,
  Award,
  Bell,
  CheckCircle2,
  Calendar,
  Sparkles,
  ExternalLink
} from 'lucide-react';

export const ApplicantDashboardPage: React.FC = () => {
  const { user } = useAuth();
  const { getApplicationDetail } = useApplicationData();
  const navigate = useNavigate();

  const [activeApp, setActiveApp] = useState<ApplicationDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApp = async () => {
      setLoading(true);
      // Default to Rajesh's application
      const app = await getApplicationDetail('NFST-2026-00124');
      setActiveApp(app);
      setLoading(false);
    };
    fetchApp();
  }, [getApplicationDetail]);

  const activeDeficiency = activeApp?.deficiencies.find((d) => d.status === 'OPEN');

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-white border border-[#E2E8F0] rounded-lg p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0284C7] bg-[#F0F9FF] px-2.5 py-0.5 rounded border border-[#BAE6FD]">
              Applicant Dashboard · Academic Year 2026-27
            </span>
            <span className="text-xs font-semibold text-[#0E766E] bg-[#ECFDF5] px-2 py-0.5 rounded border border-[#A7F3D0] flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Verified ST / PVTG Profile</span>
            </span>
          </div>

          <h1 className="text-2xl font-bold text-[#0F172A]">Welcome back, {user?.fullName}</h1>
          <p className="text-xs text-[#64748B] mt-0.5">
            Scholar ID: <strong className="font-mono text-[#0A2540]">ST-JH-2026-4418</strong> · Enrolled: Central University of Jharkhand
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link to={ROUTES.APPLICANT.SCHEMES}>
            <Button variant="primary" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
              Explore Other Schemes
            </Button>
          </Link>
        </div>
      </div>

      {/* High-visibility Deficiency Alert if present */}
      {activeDeficiency && (
        <DeficiencyBanner deficiency={activeDeficiency} />
      )}

      {/* Active Application Card */}
      {activeApp && (
        <Card className="p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-[#E2E8F0] mb-5">
            <div>
              <div className="flex items-center gap-2.5">
                <h3 className="text-lg font-bold text-[#0F172A]">{activeApp.schemeName}</h3>
                <Badge status={activeApp.status} />
              </div>
              <p className="text-xs text-[#64748B] mt-1">
                Application Number: <strong className="font-mono text-[#0A2540]">{activeApp.id}</strong> · Submitted on {activeApp.submittedAt}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => navigate(`/applicant/tracking/${activeApp.id}`)}
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                View Full Tracking Dossier
              </Button>
            </div>
          </div>

          {/* Stepper Progress */}
          <div className="mb-6">
            <ApplicationProgressTracker
              currentStage={activeApp.currentMilestone}
              hasDeficiency={!!activeDeficiency}
            />
          </div>

          {/* Quick Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#E2E8F0] text-xs">
            <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded">
              <p className="text-[11px] font-semibold text-[#64748B] uppercase">Enrolled Course</p>
              <p className="font-bold text-[#0F172A] mt-0.5">{activeApp.applicant.currentAdmission.courseName}</p>
              <p className="text-[11px] text-[#64748B]">{activeApp.applicant.currentAdmission.institutionName}</p>
            </div>

            <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded">
              <p className="text-[11px] font-semibold text-[#64748B] uppercase">AI Verification Result</p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <Sparkles className="w-4 h-4 text-[#0284C7]" />
                <span className="font-bold text-[#0E766E]">98% Confidence</span>
              </div>
              <p className="text-[11px] text-[#64748B]">Caste matched with Central Gazette</p>
            </div>

            <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded">
              <p className="text-[11px] font-semibold text-[#64748B] uppercase">Next Step</p>
              <p className="font-bold text-[#D97706] mt-0.5">
                {activeDeficiency ? 'Respond to Income Certificate deficiency' : 'Under Ministry Committee review'}
              </p>
              <p className="text-[11px] text-[#64748B]">
                {activeDeficiency ? `Due by ${activeDeficiency.deadline}` : 'Standard SLA: 7 days'}
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Available Schemes Row */}
      <div className="pt-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-[#0F172A]">Explore Other Open MoTA Schemes</h3>
            <p className="text-xs text-[#64748B]">Check eligibility and apply for concurrent or upcoming awards</p>
          </div>
          <Link to={ROUTES.APPLICANT.SCHEMES} className="text-xs font-semibold text-[#0284C7] hover:underline">
            View All Schemes →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SCHEMES.filter((s) => s.id !== 'nfst').map((scheme) => (
            <Card key={scheme.id} className="p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-[#0284C7] bg-[#F0F9FF] px-2 py-0.5 rounded border border-[#BAE6FD]">
                    {scheme.code}
                  </span>
                  <span className="text-[11px] text-[#0E766E] font-semibold bg-[#ECFDF5] px-2 py-0.5 rounded border border-[#A7F3D0]">
                    Open
                  </span>
                </div>
                <h4 className="text-sm font-bold text-[#0F172A] mb-1">{scheme.title}</h4>
                <p className="text-xs text-[#64748B] line-clamp-2 mb-3">{scheme.shortDescription}</p>
              </div>

              <div className="pt-3 border-t border-[#F1F5F9] flex items-center justify-between">
                <span className="text-xs text-[#64748B]">Deadline: {scheme.applicationDeadline}</span>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => navigate(`/applicant/apply/${scheme.id}`)}
                  rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                >
                  Apply
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
