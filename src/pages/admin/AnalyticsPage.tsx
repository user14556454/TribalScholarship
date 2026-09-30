import React, { useEffect, useState } from 'react';
import { analyticsService } from '../../services';
import { MinistryAnalyticsOverview } from '../../types/analytics';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { KPISummaryCard } from '../../components/admin/KPISummaryCard';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import {
  Download,
  Calendar,
  Filter,
  BarChart3,
  TrendingUp,
  Award,
  Users,
  Clock,
  ShieldCheck
} from 'lucide-react';

const COLORS = ['#0284C7', '#0E766E', '#0A2540', '#D97706', '#64748B'];

export const AnalyticsPage: React.FC = () => {
  const [data, setData] = useState<MinistryAnalyticsOverview | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const res = await analyticsService.getMinistryOverview();
      setData(res);
      setLoading(false);
    };
    load();
  }, []);

  if (loading || !data) {
    return (
      <div className="p-12 text-center text-xs text-[#64748B]">
        <div className="w-8 h-8 border-2 border-[#0284C7] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p>Loading Ministry analytics and performance intelligence...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#0284C7]">
            Intelligence & Scheme Performance
          </span>
          <h1 className="text-2xl font-bold text-[#0F172A] mt-1">Ministry Analytics and Performance Reports</h1>
          <p className="text-xs text-[#64748B] mt-0.5">
            Equity metrics, processing speed benchmarks, and scheme-level disbursement tracking.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => alert('Generating signed PDF analytical summary...')}
            leftIcon={<Download className="w-3.5 h-3.5" />}
          >
            Export Signed Report (PDF)
          </Button>
        </div>
      </div>

      {/* Top High-level KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPISummaryCard
          title="Direct Benefit Transfer"
          value={`₹${data.disbursementsProcessedCr} Cr`}
          subtext="Aadhaar-seeded direct disbursements"
          changeText="100% PFMS"
          changeType="positive"
          icon={<Award className="w-5 h-5 text-[#0E766E]" />}
        />
        <KPISummaryCard
          title="Average Turnaround Time"
          value={`${data.averageTurnaroundDays} Days`}
          subtext="Submission to final verification"
          changeText="-60% vs baseline"
          changeType="positive"
          icon={<Clock className="w-5 h-5 text-[#0284C7]" />}
        />
        <KPISummaryCard
          title="Eligible Scholars Verified"
          value={data.verifiedEligible.toLocaleString()}
          subtext="Satisfying Gazette and marks criteria"
          changeText="High Integrity"
          changeType="positive"
          icon={<ShieldCheck className="w-5 h-5 text-[#0A2540]" />}
        />
        <KPISummaryCard
          title="Deficiency Resolution Rate"
          value="88.4%"
          subtext="Within standard 14-day SLA"
          changeText="8.2 Days avg"
          changeType="neutral"
          icon={<TrendingUp className="w-5 h-5 text-[#D97706]" />}
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Chart 1: Scheme Distribution (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <Card header={<h3 className="text-sm font-bold text-[#0F172A]">Applications by Scheme & Scrutiny Status</h3>}>
            <div className="h-72 w-full text-xs">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.schemeDistributions} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                  <XAxis dataKey="shortName" tick={{ fontSize: 11, fill: '#64748B' }} />
                  <YAxis tick={{ fontSize: 11, fill: '#64748B' }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0A2540', color: '#fff', borderRadius: '4px', fontSize: '11px' }}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                  <Bar dataKey="inReview" name="Under Scrutiny" fill="#0284C7" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="deficiencies" name="Deficiencies" fill="#D97706" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="approved" name="Approved" fill="#0E766E" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* Chart 2: PVTG Demographics & Equity (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <Card header={<h3 className="text-sm font-bold text-[#0F172A]">PVTG & Tribal Community Representation</h3>}>
            <div className="h-72 w-full text-xs">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data.pvtgDemographics}
                    dataKey="count"
                    nameKey="category"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label={({ name, percent }) => `${name.split(' ')[0]} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {data.pvtgDemographics.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0A2540', color: '#fff', borderRadius: '4px', fontSize: '11px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </div>

      {/* Processing Velocity Benchmarks */}
      <Card header={<h3 className="text-sm font-bold text-[#0F172A]">Processing Velocity & SLA Turnaround Benchmarks</h3>}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
          {data.processingVelocity.map((stage) => (
            <div key={stage.stage} className="p-3.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded">
              <span className="text-[11px] font-bold text-[#64748B] block mb-1">{stage.stage}</span>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-xl font-bold text-[#0A2540]">{stage.averageDays} Days</span>
                <span className="text-[11px] text-[#0E766E] font-semibold">SLA: {stage.targetSlaDays}d</span>
              </div>
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#065F46] bg-[#ECFDF5] px-2 py-0.5 rounded border border-[#A7F3D0]">
                Within SLA Target
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
