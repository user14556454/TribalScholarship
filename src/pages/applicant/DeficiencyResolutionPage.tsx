import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useApplicationData } from '../../context/ApplicationDataContext';
import { applicationService } from '../../services';
import { ApplicationDetail } from '../../types/application';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { DocumentUploadBox } from '../../components/applicant/DocumentUploadBox';
import { DocumentItem } from '../../types/document';
import {
  AlertTriangle,
  Calendar,
  CheckCircle2,
  FileText,
  ArrowRight,
  ShieldAlert,
  ArrowLeft,
  Sparkles
} from 'lucide-react';

export const DeficiencyResolutionPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getApplicationDetail } = useApplicationData();

  const [app, setApp] = useState<ApplicationDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [resubmissionNotes, setResubmissionNotes] = useState(
    'Uploaded newly issued Income Certificate for FY 2026-27 issued by Circle Officer, Kanke.'
  );
  const [replacementDoc, setReplacementDoc] = useState<DocumentItem | null>(null);

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
        <p>Loading deficiency case details...</p>
      </div>
    );
  }

  if (!app) {
    return (
      <div className="p-8 text-center bg-white border border-[#E2E8F0] rounded-lg">
        <h3 className="text-sm font-bold text-[#0F172A]">Application Not Found</h3>
        <Link to="/applicant/dashboard" className="text-xs text-[#0284C7] font-semibold mt-2 inline-block">
          ← Back to Dashboard
        </Link>
      </div>
    );
  }

  const openDeficiency = app.deficiencies.find((d) => d.status === 'OPEN') || app.deficiencies[0];

  const handleDocumentUploaded = (doc: DocumentItem) => {
    setReplacementDoc(doc);
  };

  const handleSubmitResolution = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replacementDoc) {
      alert('Please upload or select the replacement document before submitting.');
      return;
    }

    try {
      setSubmitting(true);
      await applicationService.resolveDeficiency(app.id, {
        deficiencyId: openDeficiency.id,
        newFileName: replacementDoc.fileName,
        notes: resubmissionNotes
      });

      alert('Deficiency response successfully submitted! Status updated to Under Review.');
      navigate(`/applicant/tracking/${app.id}`);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Link
            to={`/applicant/tracking/${app.id}`}
            className="text-xs text-[#64748B] hover:text-[#0F172A] inline-flex items-center gap-1 mb-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Application Dossier</span>
          </Link>
          <h1 className="text-2xl font-bold text-[#0F172A]">Deficiency Resolution & Document Resubmission</h1>
          <p className="text-xs text-[#64748B] mt-0.5">
            Application: <strong className="font-mono text-[#0A2540]">{app.id}</strong> · {app.schemeName}
          </p>
        </div>

        <span className="text-xs font-bold text-[#92400E] bg-[#FFFBEB] px-3 py-1 rounded border border-[#FDE68A] flex items-center gap-1">
          <Calendar className="w-3.5 h-3.5" />
          <span>SLA Deadline: {openDeficiency?.deadline}</span>
        </span>
      </div>

      {openDeficiency ? (
        <form onSubmit={handleSubmitResolution} className="space-y-6">
          {/* Deficiency Specification Box */}
          <Card className="border-[#FDE68A] bg-[#FFFBEB]">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-full bg-[#FEF3C7] text-[#92400E] flex items-center justify-center shrink-0 border border-[#FCD34D]">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div className="flex-1 text-xs">
                <span className="font-bold uppercase tracking-wider text-[#92400E] text-[10px] bg-[#FEF3C7] px-2 py-0.5 rounded">
                  Deficiency Code: {openDeficiency.reasonCode}
                </span>

                <h3 className="text-base font-bold text-[#92400E] mt-1.5">{openDeficiency.title}</h3>
                <p className="text-[#78350F] leading-relaxed mt-1 text-xs">{openDeficiency.description}</p>

                <div className="mt-3 p-3 bg-white/70 border border-[#FDE68A] rounded">
                  <p className="font-bold text-[#92400E] mb-0.5">Required Action:</p>
                  <p className="text-[#78350F]">{openDeficiency.actionRequired}</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Replacement Document Upload */}
          <Card header={<h3 className="text-sm font-bold text-[#0F172A]">Upload Corrected Certificate / Document</h3>}>
            <DocumentUploadBox
              documentRequirement={{
                type: 'income_certificate',
                title: openDeficiency.documentTitle,
                guideline: 'Must be issued by Circle Officer / SDO / Tahasildar valid for FY 2025-26 or FY 2026-27.',
                required: true
              }}
              existingDoc={replacementDoc || undefined}
              onUploadComplete={handleDocumentUploaded}
            />
          </Card>

          {/* Applicant Explanation Notes */}
          <Card header={<h3 className="text-sm font-bold text-[#0F172A]">Applicant Explanation / Clarification Note</h3>}>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[#0F172A]">
                Provide any context or clarification for the Scrutiny Officer
              </label>
              <textarea
                value={resubmissionNotes}
                onChange={(e) => setResubmissionNotes(e.target.value)}
                rows={3}
                className="p-3 bg-white text-xs border border-[#CBD5E1] rounded outline-none focus:ring-2 focus:ring-[#0284C7]"
                placeholder="Enter details regarding the newly uploaded certificate..."
                required
              />
            </div>

            <div className="flex items-center justify-between pt-4 mt-4 border-t border-[#E2E8F0]">
              <Link to={`/applicant/tracking/${app.id}`}>
                <Button variant="secondary" size="sm" type="button">
                  Cancel
                </Button>
              </Link>

              <Button
                variant="primary"
                size="md"
                type="submit"
                isLoading={submitting}
                className="bg-[#D97706] hover:bg-[#B45309] text-white"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Submit Replacement Document for Scrutiny
              </Button>
            </div>
          </Card>
        </form>
      ) : (
        <Card className="p-8 text-center">
          <CheckCircle2 className="w-10 h-10 text-[#0E766E] mx-auto mb-2" />
          <h3 className="text-base font-bold text-[#0F172A]">No Open Deficiencies</h3>
          <p className="text-xs text-[#64748B] mt-1">All flagged items for this application have been resolved.</p>
          <Link to={`/applicant/tracking/${app.id}`} className="text-xs text-[#0284C7] font-semibold mt-4 inline-block">
            ← Return to Application Tracking
          </Link>
        </Card>
      )}
    </div>
  );
};
