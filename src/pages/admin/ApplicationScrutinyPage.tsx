import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useApplicationData } from '../../context/ApplicationDataContext';
import { applicationService } from '../../services';
import { ApplicationDetail } from '../../types/application';
import { DocumentItem } from '../../types/document';
import { DocumentDossierViewer } from '../../components/admin/DocumentDossierViewer';
import { EligibilityChecklist } from '../../components/admin/EligibilityChecklist';
import { DecisionModal } from '../../components/admin/DecisionModal';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import {
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  FileText,
  User,
  GraduationCap,
  Building,
  CreditCard,
  ShieldCheck,
  Calendar
} from 'lucide-react';

export const ApplicationScrutinyPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getApplicationDetail } = useApplicationData();

  const [app, setApp] = useState<ApplicationDetail | null>(null);
  const [loading, setLoading] = useState(true);

  // Decision Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [actionType, setActionType] = useState<'DEFICIENCY' | 'APPROVE' | 'REJECT'>('DEFICIENCY');
  const [selectedDocForDeficiency, setSelectedDocForDeficiency] = useState<DocumentItem | undefined>(undefined);

  const fetchDossier = async () => {
    setLoading(true);
    const data = await getApplicationDetail(id || 'NFST-2026-00124');
    setApp(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchDossier();
  }, [id, getApplicationDetail]);

  const handleOpenDeficiency = (doc?: DocumentItem) => {
    setSelectedDocForDeficiency(doc);
    setActionType('DEFICIENCY');
    setModalOpen(true);
  };

  const handleOpenApprove = () => {
    setActionType('APPROVE');
    setModalOpen(true);
  };

  const handleOpenReject = () => {
    setActionType('REJECT');
    setModalOpen(true);
  };

  const handleDecisionSubmit = async (payload: any) => {
    if (!app) return;
    if (actionType === 'DEFICIENCY') {
      await applicationService.raiseDeficiency(app.id, payload);
    } else {
      await applicationService.recordDecision(app.id, payload);
    }
    await fetchDossier();
  };

  if (loading) {
    return (
      <div className="p-12 text-center text-xs text-[#64748B]">
        <div className="w-8 h-8 border-2 border-[#0284C7] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p>Loading application dossier for ministry scrutiny...</p>
      </div>
    );
  }

  if (!app) {
    return (
      <div className="p-8 text-center bg-white border border-[#E2E8F0] rounded-lg">
        <h3 className="text-sm font-bold text-[#0F172A]">Application Not Found</h3>
        <Link to="/admin/applications" className="text-xs text-[#0284C7] font-semibold mt-2 inline-block">
          ← Back to Applications Queue
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Top Header & Decision Action Bar */}
      <div className="bg-white border border-[#E2E8F0] rounded-lg p-6 shadow-xs flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div>
          <Link
            to="/admin/applications"
            className="text-xs text-[#64748B] hover:text-[#0F172A] inline-flex items-center gap-1 mb-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Work Queue</span>
          </Link>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-bold text-[#0F172A] font-mono">{app.id}</h1>
            <Badge status={app.status} />
          </div>
          <p className="text-xs text-[#64748B] mt-1">
            Scheme: <strong className="text-[#0A2540]">{app.schemeName}</strong> · Submitted: {app.submittedAt}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto">
          <Button
            variant="destructive"
            size="md"
            onClick={handleOpenReject}
            leftIcon={<XCircle className="w-4 h-4" />}
          >
            Reject Application
          </Button>

          <Button
            variant="secondary"
            size="md"
            className="bg-[#FFFBEB] text-[#92400E] border-[#FDE68A] hover:bg-[#FEF3C7]"
            onClick={() => handleOpenDeficiency(app.documents.find((d) => d.verificationStatus === 'ACTION_REQUIRED') || app.documents[0])}
            leftIcon={<AlertTriangle className="w-4 h-4" />}
          >
            Raise Deficiency
          </Button>

          <Button
            variant="primary"
            size="md"
            className="bg-[#0E766E] hover:bg-[#0A5852] text-white"
            onClick={handleOpenApprove}
            leftIcon={<CheckCircle2 className="w-4 h-4" />}
          >
            Approve for Merit Run
          </Button>
        </div>
      </div>

      {/* Grid: Left Dossier Particulars & Right Document Viewer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Scholar Demographic & Academic Dossier (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <Card header={<h3 className="text-xs font-bold uppercase text-[#0F172A]">Applicant Particulars</h3>}>
            <div className="space-y-3.5 text-xs">
              <div>
                <span className="text-[11px] text-[#64748B] uppercase block">Scholar Full Name</span>
                <span className="font-bold text-[#0F172A] text-sm">{app.applicant.fullName}</span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-[11px] text-[#64748B] uppercase block">Category / Tribe</span>
                  <span className="font-semibold text-[#0F172A]">
                    {app.applicant.category} ({app.applicant.tribalCommunity})
                  </span>
                </div>
                <div>
                  <span className="text-[11px] text-[#64748B] uppercase block">PVTG Priority</span>
                  <span className="font-semibold text-[#0E766E]">
                    {app.applicant.isPvtg ? 'Yes (Birhor)' : 'No'}
                  </span>
                </div>
              </div>

              <div>
                <span className="text-[11px] text-[#64748B] uppercase block">Certified Annual Family Income</span>
                <span className="font-mono font-bold text-[#0A2540]">
                  ₹{app.applicant.annualFamilyIncome.toLocaleString()} / year
                </span>
              </div>

              <div>
                <span className="text-[11px] text-[#64748B] uppercase block">Permanent Domicile</span>
                <span className="text-[#334155]">{app.applicant.permanentAddress}</span>
              </div>

              <div className="pt-3 border-t border-[#E2E8F0]">
                <span className="text-[11px] text-[#64748B] uppercase block">Enrolled University & Degree</span>
                <span className="font-bold text-[#0F172A] block">{app.applicant.currentAdmission.courseName}</span>
                <span className="text-[#64748B]">{app.applicant.currentAdmission.institutionName}</span>
              </div>

              <div className="pt-3 border-t border-[#E2E8F0]">
                <span className="text-[11px] text-[#64748B] uppercase block">Aadhaar-Seeded Bank Account</span>
                <div className="flex items-center justify-between text-xs mt-0.5">
                  <span className="font-mono text-[#0A2540]">{app.applicant.bankDetails.bankName}</span>
                  <span className="font-mono font-bold">{app.applicant.bankDetails.accountNumberMasked}</span>
                </div>
                <span className="text-[10px] text-[#0E766E] font-semibold flex items-center gap-1 mt-0.5">
                  <ShieldCheck className="w-3 h-3" />
                  <span>Aadhaar DBT Link Verified via PFMS</span>
                </span>
              </div>
            </div>
          </Card>

          {/* Policy Checklist */}
          <EligibilityChecklist ruleChecks={app.ruleChecks} />
        </div>

        {/* Right Column: Document Inspection & AI Findings (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          <DocumentDossierViewer
            documents={app.documents}
            onFlagDeficiency={handleOpenDeficiency}
          />
        </div>
      </div>

      {/* Decision Modal */}
      <DecisionModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        applicationId={app.id}
        applicantName={app.applicant.fullName}
        actionType={actionType}
        preSelectedDoc={selectedDocForDeficiency}
        onSubmit={handleDecisionSubmit}
      />
    </div>
  );
};
