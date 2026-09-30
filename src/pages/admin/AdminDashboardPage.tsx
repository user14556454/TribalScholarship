import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { analyticsService, applicationService } from '../../services';
import { MinistryAnalyticsOverview } from '../../types/analytics';
import { ApplicationSummary } from '../../types/application';
import { KPISummaryCard } from '../../components/admin/KPISummaryCard';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { ROUTES } from '../../config/routes';
import {
  FileText,
  Clock,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  ArrowRight,
  ShieldAlert,
  BarChart3,
  Users,
  Search,
  ExternalLink
} from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [metrics, setMetrics] = useState<MinistryAnalyticsOverview | null>(null);
  const [recentApps, setRecentApps] = useState<ApplicationSummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const [overview, apps] = await Promise.all([
        analyticsService.getMinistryOverview(),
        applicationService.getApplications()
      ]);
      setMetrics(overview);
      setRecentApps(apps.slice(0, 5));
      setLoading(false);
    };
    loadData();
  }, []);

  return (
    <div className="space-y-6">
      {/* Title & Masthead */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-700 bg-sky-50 px-2 py-0.5 rounded border border-sky-200">
              Administrative Control Center · AY 2026-27
            </span>
            <span className="text-xs text-[#64748B]">Shastri Bhawan, New Delhi</span>
          </div>
          <h1 className="text-2xl font-bold text-[#0F172A]">Ministry Operations & Scrutiny Dashboard</h1>
          <p className="text-xs text-[#64748B] mt-0.5">
            Real-time tracking of scholarship applications, AI-assisted verifications, and deficiency turnaround.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link to={ROUTES.ADMIN.APPLICATIONS}>
            <Button variant="primary" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
              Open Full Applications Queue
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Cards Row */}
      {metrics && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <KPISummaryCard
            title="Total Applications Received"
            value={metrics.totalApplications.toLocaleString()}
            subtext="Across all 3 schemes"
            changeText="+14.2%"
            changeType="positive"
            icon={<FileText className="w-5 h-5 text-[#0284C7]" />}
          />
          <KPISummaryCard
            title="Under Scrutiny & Verification"
            value="6,200"
            subtext="Pending officer disposition"
            icon={<Clock className="w-5 h-5 text-[#D97706]" />}
            badgeText="SLA: 5 Days"
          />
          <KPISummaryCard
            title="Active Deficiencies"
            value={metrics.activeDeficiencies.toLocaleString()}
            subtext="Awaiting scholar document replacement"
            changeText="Turnaround: 8.2 Days"
            changeType="neutral"
            icon={<AlertTriangle className="w-5 h-5 text-[#DC2626]" />}
          />
          <KPISummaryCard
            title="Verified & Ready for Selection"
            value={metrics.verifiedEligible.toLocaleString()}
            subtext="Satisfies all policy thresholds"
            changeText="Eligible Pool"
            changeType="positive"
            icon={<CheckCircle2 className="w-5 h-5 text-[#0E766E]" />}
          />
        </div>
      )}

      {/* Main Grid: Priority Action Queue & Scheme Allocations */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Applications Requiring Immediate Action (7 cols) */}
        <div className="lg:col-span-8 space-y-4">
          <Card
            header={
              <div className="flex items-center justify-between w-full">
                <h3 className="text-sm font-bold text-[#0F172A]">Priority Applications Queue (SLA & Deficiencies)</h3>
                <Link to={ROUTES.ADMIN.APPLICATIONS} className="text-xs font-semibold text-[#0284C7] hover:underline">
                  View All ({recentApps.length}) →
                </Link>
              </div>
            }
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#E2E8F0] text-[#64748B] uppercase tracking-wider text-[11px] bg-[#F8FAFC]">
                    <th className="py-2.5 px-3">Application ID</th>
                    <th className="py-2.5 px-3">Applicant Name</th>
                    <th className="py-2.5 px-3">Scheme</th>
                    <th className="py-2.5 px-3">Status</th>
                    <th className="py-2.5 px-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F1F5F9]">
                  {recentApps.map((a) => (
                    <tr key={a.id} className="hover:bg-[#F8FAFC] transition-colors">
                      <td className="py-3 px-3 font-mono font-bold text-[#0A2540]">
                        <Link to={`/admin/applications/${a.id}`} className="hover:text-[#0284C7]">
                          {a.id}
                        </Link>
                      </td>
                      <td className="py-3 px-3">
                        <span className="font-semibold text-[#0F172A] block">{a.applicantName}</span>
                        <span className="text-[11px] text-[#64748B]">{a.category}</span>
                      </td>
                      <td className="py-3 px-3 text-[#475569]">{a.schemeId.toUpperCase()}</td>
                      <td className="py-3 px-3">
                        <Badge status={a.status} size="sm" />
                      </td>
                      <td className="py-3 px-3 text-right">
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => navigate(`/admin/applications/${a.id}`)}
                          rightIcon={<ArrowRight className="w-3 h-3" />}
                        >
                          Review
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Right: Scheme Slot Quotas & Quick Links (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <Card header={<h3 className="text-sm font-bold text-[#0F172A]">Scheme Slot Allocation & Caps</h3>}>
            <div className="space-y-4 text-xs">
              <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-[#0F172A]">NFST (National Fellowships)</span>
                  <span className="font-bold text-[#0284C7]">750 Slots</span>
                </div>
                <p className="text-[11px] text-[#64748B]">
                  Reserved: 50 PVTG Slots · 3% PwD (23 Slots) · 225 Female Earmark
                </p>
                <div className="w-full bg-[#E2E8F0] h-1.5 rounded-full mt-2 overflow-hidden">
                  <div className="bg-[#0284C7] h-full" style={{ width: '100%' }} />
                </div>
              </div>

              <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-[#0F172A]">NOS (National Overseas)</span>
                  <span className="font-bold text-[#0284C7]">20 Awards</span>
                </div>
                <p className="text-[11px] text-[#64748B]">
                  17 ST Awards · 3 PVTG Awards · 10 STEM Quota Slots
                </p>
                <div className="w-full bg-[#E2E8F0] h-1.5 rounded-full mt-2 overflow-hidden">
                  <div className="bg-[#0E766E] h-full" style={{ width: '100%' }} />
                </div>
              </div>

              <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-[#0F172A]">Top Class Premier Education</span>
                  <span className="font-bold text-[#0284C7]">1,000 Seats</span>
                </div>
                <p className="text-[11px] text-[#64748B]">IITs, IIMs, NITs, and AIIMS premier premier institutes</p>
                <div className="w-full bg-[#E2E8F0] h-1.5 rounded-full mt-2 overflow-hidden">
                  <div className="bg-[#0A2540] h-full" style={{ width: '98%' }} />
                </div>
              </div>

              <div className="pt-2">
                <Link to={ROUTES.ADMIN.ANALYTICS}>
                  <Button variant="secondary" size="sm" className="w-full" leftIcon={<BarChart3 className="w-3.5 h-3.5" />}>
                    View Detailed Ministry Analytics
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
