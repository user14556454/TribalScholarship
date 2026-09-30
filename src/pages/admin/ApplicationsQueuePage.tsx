import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { applicationService } from '../../services';
import { ApplicationSummary } from '../../types/application';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { Search, Filter, ArrowRight, Sparkles, Download, RefreshCw } from 'lucide-react';

export const ApplicationsQueuePage: React.FC = () => {
  const navigate = useNavigate();
  const [applications, setApplications] = useState<ApplicationSummary[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState('');
  const [selectedScheme, setSelectedScheme] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');

  const fetchApps = async () => {
    setLoading(true);
    try {
      const list = await applicationService.getApplications({
        searchQuery: search,
        schemeId: selectedScheme,
        status: selectedStatus as any
      });
      setApplications(list);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApps();
  }, [selectedScheme, selectedStatus]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchApps();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#0284C7]">
            Scrutiny & Operational Work Queue
          </span>
          <h1 className="text-2xl font-bold text-[#0F172A] mt-1">Ministry Applications Management</h1>
          <p className="text-xs text-[#64748B] mt-0.5">
            Filter and review candidate submissions, inspect AI document findings, and record formal decisions.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={fetchApps}
            leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
          >
            Refresh
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => alert('Exporting full application table to CSV (watermarked)...')}
            leftIcon={<Download className="w-3.5 h-3.5" />}
          >
            Export CSV
          </Button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <Card className="p-4">
        <form onSubmit={handleSearchSubmit} className="flex flex-col lg:flex-row items-center gap-3">
          {/* Search Input */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 absolute left-3 top-3 text-[#94A3B8]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by Application ID, Applicant Name, Community or State..."
              className="h-10 pl-9 pr-3 bg-white text-xs border border-[#CBD5E1] rounded w-full outline-none focus:ring-2 focus:ring-[#0284C7]"
            />
          </div>

          {/* Scheme Select */}
          <select
            value={selectedScheme}
            onChange={(e) => setSelectedScheme(e.target.value)}
            className="h-10 px-3 bg-white text-xs border border-[#CBD5E1] rounded w-full lg:w-48 outline-none"
          >
            <option value="ALL">All Schemes</option>
            <option value="nfst">NFST Fellowships</option>
            <option value="nos">NOS Overseas</option>
            <option value="top-class">Top Class Premier</option>
          </select>

          {/* Status Select */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="h-10 px-3 bg-white text-xs border border-[#CBD5E1] rounded w-full lg:w-48 outline-none"
          >
            <option value="ALL">All Statuses</option>
            <option value="SUBMITTED">Submitted</option>
            <option value="DEFICIENCY_RAISED">Deficiency Raised</option>
            <option value="RESUBMITTED">Resubmitted</option>
            <option value="SCREENING">Screening</option>
            <option value="APPROVED">Approved</option>
            <option value="REJECTED">Rejected</option>
          </select>

          <Button variant="primary" size="md" type="submit" className="w-full lg:w-auto">
            Apply Filters
          </Button>
        </form>
      </Card>

      {/* Main Table */}
      <Card className="p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#E2E8F0] text-[#64748B] uppercase tracking-wider text-[11px] bg-[#F8FAFC]">
                <th className="py-3 px-4">Application ID</th>
                <th className="py-3 px-4">Applicant & Community</th>
                <th className="py-3 px-4">Scheme</th>
                <th className="py-3 px-4">State</th>
                <th className="py-3 px-4">AI Confidence</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1F5F9]">
              {loading ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-[#64748B]">
                    <div className="w-6 h-6 border-2 border-[#0284C7] border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                    <span>Loading queue applications...</span>
                  </td>
                </tr>
              ) : applications.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-[#64748B]">
                    No applications match the selected filter criteria.
                  </td>
                </tr>
              ) : (
                applications.map((app) => (
                  <tr key={app.id} className="hover:bg-[#F8FAFC] transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-[#0A2540]">
                      <Link to={`/admin/applications/${app.id}`} className="hover:text-[#0284C7] hover:underline">
                        {app.id}
                      </Link>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-bold text-[#0F172A] block">{app.applicantName}</span>
                      <span className="text-[11px] text-[#64748B]">{app.category}</span>
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-[#334155]">{app.schemeId.toUpperCase()}</td>
                    <td className="py-3.5 px-4 text-[#475569]">{app.state}</td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-[#0284C7]" />
                        <span className="font-semibold text-[#0E766E]">{app.aiVerificationScore}%</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <Badge status={app.status} size="sm" />
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => navigate(`/admin/applications/${app.id}`)}
                        rightIcon={<ArrowRight className="w-3 h-3" />}
                      >
                        Scrutinize Dossier
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="px-4 py-3 bg-[#F8FAFC] border-t border-[#E2E8F0] flex items-center justify-between text-xs text-[#64748B]">
          <span>Showing <strong>{applications.length}</strong> applications</span>
          <span>Role-Based Access: Ministry Scrutiny Queue</span>
        </div>
      </Card>
    </div>
  );
};
