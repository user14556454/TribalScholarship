import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApplicationData } from '../../context/ApplicationDataContext';
import { ApplicationDetail } from '../../types/application';
import { ApplicationProgressTracker } from '../../components/applicant/ApplicationProgressTracker';
import { DeficiencyBanner } from '../../components/applicant/DeficiencyBanner';
import { Badge } from '../../components/common/Badge';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import {
  FileText,
  Clock,
  ArrowRight,
  Download,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  User,
  AlertTriangle,
  Building
} from 'lucide-react';

export const ApplicationTrackingPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getApplicationDetail } = useApplicationData();

  const [app, setApp] = useState<ApplicationDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const data = await getApplicationDetail(id || 'NFST-2026-00124');
      setApp(data);
      setLoading(false);
    };
    fetch();
  }, [id, getApplicationDetail]);

  if (loading) {
    return (
      <div className="p-12 text-center text-xs text-[#64748B]">
        <div className="w-8 h-8 border-2 border-[#0284C7] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p>Loading application tracking dossier...</p>
      </div>
    );
  }

  if (!app) {
    return (
      <div className="p-8 text-center bg-white border border-[#E2E8F0] rounded-lg">
        <h3 className="text-sm font-bold text-[#0F172A]">Application Not Found</h3>
        <p className="text-xs text-[#64748B] mt-1">Application ID {id} does not exist in the record.</p>
        <Link to="/applicant/dashboard" className="text-xs text-[#0284C7] font-semibold mt-4 inline-block">
          ← Return to Dashboard
        </Link>
      </div>
    );
  }

  const activeDeficiency = app.deficiencies.find((d) => d.status === 'OPEN');

  const handleDownloadReceipt = () => {
    alert(`Downloading Official Digitally Signed Submission Receipt for ${app.id} (PDF)`);
  };

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <div className="bg-white border border-[#E2E8F0] rounded-lg p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0284C7] bg-[#F0F9FF] px-2.5 py-0.5 rounded border border-[#BAE6FD]">
              Application Tracking Dossier
            </span>
            <Badge status={app.status} />
          </div>

          <h1 className="text-xl sm:text-2xl font-bold text-[#0F172A]">
            {app.id} · {app.schemeName}
          </h1>

          <p className="text-xs text-[#64748B] mt-1">
            Applicant: <strong className="text-[#0F172A]">{app.applicant.fullName}</strong> · Category:{' '}
            <strong className="text-[#0F172A]">{app.applicant.category} ({app.applicant.tribalCommunity})</strong>
            {app.applicant.isPvtg && <span className="text-[#0E766E] font-bold"> [PVTG Priority]</span>}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={handleDownloadReceipt}
            leftIcon={<Download className="w-3.5 h-3.5" />}
          >
            Download Receipt (PDF)
          </Button>
        </div>
      </div>

      {/* Deficiency Alert Banner */}
      {activeDeficiency && <DeficiencyBanner deficiency={activeDeficiency} />}

      {/* Progress Stepper */}
      <ApplicationProgressTracker
        currentStage={app.currentMilestone}
        hasDeficiency={!!activeDeficiency}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Timeline Events */}
        <div className="lg:col-span-7 space-y-4">
          <Card header={<h3 className="text-sm font-bold text-[#0F172A]">Official Processing Timeline & Activity</h3>}>
            <div className="space-y-6 relative before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#E2E8F0]">
              {app.timeline.map((event, idx) => (
                <div key={event.id} className="relative flex items-start gap-4">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 z-10 text-xs font-bold ${
                      event.status === 'COMPLETED'
                        ? 'bg-[#0E766E] text-white shadow-xs'
                        : event.status === 'ACTION_REQUIRED'
                        ? 'bg-[#D97706] text-white shadow-xs'
                        : 'bg-white border-2 border-[#0284C7] text-[#0284C7]'
                    }`}
                  >
                    {event.status === 'COMPLETED' ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : event.status === 'ACTION_REQUIRED' ? (
                      <AlertTriangle className="w-3.5 h-3.5" />
                    ) : (
                      <Clock className="w-3.5 h-3.5" />
                    )}
                  </div>

                  <div className="flex-1 bg-[#F8FAFC] border border-[#E2E8F0] rounded p-3 text-xs">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-bold text-[#0F172A]">{event.title}</h4>
                      <span className="text-[10px] text-[#64748B] font-mono">{event.timestamp}</span>
                    </div>
                    <p className="text-[#475569] leading-relaxed mb-2">{event.description}</p>
                    <p className="text-[10px] text-[#94A3B8]">
                      Authorized Actor: <strong className="text-[#64748B]">{event.actor}</strong>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Column: Submitted Documents & Metadata */}
        <div className="lg:col-span-5 space-y-4">
          <Card header={<h3 className="text-sm font-bold text-[#0F172A]">Submitted Certificates & Evidence</h3>}>
            <div className="space-y-3">
              {app.documents.map((doc) => (
                <div key={doc.id} className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded text-xs">
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-[#0284C7] shrink-0" />
                      <span className="font-bold text-[#0F172A] leading-tight">{doc.title}</span>
                    </div>
                    <Badge status={doc.verificationStatus} size="sm" />
                  </div>
                  <p className="text-[11px] text-[#64748B] font-mono mb-1">{doc.fileName}</p>
                  <div className="flex items-center justify-between text-[10px] text-[#94A3B8]">
                    <span>v{doc.version} · Uploaded {doc.uploadedAt}</span>
                    {doc.certificateNumber && (
                      <span className="font-mono text-slate-600">Reg: {doc.certificateNumber}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-[#E2E8F0]">
              <div className="p-3 bg-sky-50 border border-sky-200 rounded text-xs text-sky-900">
                <p className="font-semibold mb-0.5">Assistance & Grievance Cell</p>
                <p className="text-[11px] text-sky-800 leading-relaxed">
                  For queries regarding verification status or document guidelines, contact MoTA Nodal Helpdesk at <strong>scholarship-support@tribal.gov.in</strong>.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
