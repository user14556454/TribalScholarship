import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { DocumentItem } from '../../types/document';
import { AlertTriangle, CheckCircle2, XCircle } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  applicationId: string;
  applicantName: string;
  actionType: 'DEFICIENCY' | 'APPROVE' | 'REJECT';
  preSelectedDoc?: DocumentItem;
  onSubmit: (data: any) => Promise<void>;
}

export const DecisionModal: React.FC<Props> = ({
  isOpen,
  onClose,
  applicationId,
  applicantName,
  actionType,
  preSelectedDoc,
  onSubmit
}) => {
  const [loading, setLoading] = useState(false);
  const [reasonCode, setReasonCode] = useState('DEF_INC_EXPIRED');
  const [title, setTitle] = useState(preSelectedDoc ? `Deficiency in ${preSelectedDoc.title}` : 'Document Deficiency Raised');
  const [description, setDescription] = useState(
    preSelectedDoc?.title.includes('Income')
      ? 'The uploaded certificate appears to have expired for Academic Year 2026-27. Valid certificate required.'
      : 'The uploaded document is missing required official stamp or legible authority signature.'
  );
  const [actionRequired, setActionRequired] = useState('Please upload a fresh certificate issued by competent authority.');
  const [deadlineDays, setDeadlineDays] = useState(14);
  const [decisionNote, setDecisionNote] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (actionType === 'DEFICIENCY') {
        await onSubmit({
          documentId: preSelectedDoc?.id,
          documentTitle: preSelectedDoc?.title || 'Required Document',
          reasonCode,
          title,
          description,
          actionRequired,
          deadlineDays
        });
      } else {
        await onSubmit({
          decision: actionType,
          reasonNote: decisionNote || (actionType === 'APPROVE' ? 'Application meets all verified criteria.' : 'Does not satisfy mandatory scheme requirements.')
        });
      }
      onClose();
    } finally {
      setLoading(false);
    }
  };

  const getTitle = () => {
    if (actionType === 'DEFICIENCY') return `Raise Deficiency · ${applicationId}`;
    if (actionType === 'APPROVE') return `Approve Application · ${applicationId}`;
    return `Reject Application · ${applicationId}`;
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={getTitle()} maxWidth="lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded text-xs">
          <p className="text-[#64748B]">
            Applicant: <strong className="text-[#0F172A]">{applicantName}</strong>
          </p>
          <p className="text-[#64748B] mt-0.5">
            Application ID: <strong className="font-mono text-[#0A2540]">{applicationId}</strong>
          </p>
        </div>

        {actionType === 'DEFICIENCY' ? (
          <>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[#0F172A]">Reason Category Code</label>
              <select
                value={reasonCode}
                onChange={(e) => setReasonCode(e.target.value)}
                className="h-10 px-3 bg-white text-xs border border-[#CBD5E1] rounded outline-none"
              >
                <option value="DEF_INC_EXPIRED">DEF_INC_EXPIRED (Certificate expired for current FY)</option>
                <option value="DEF_CASTE_CLARIFY">DEF_CASTE_CLARIFY (Sub-tribe or spelling discrepancy)</option>
                <option value="DEF_LEGIBILITY">DEF_LEGIBILITY (Uploaded scan is blurred or illegible)</option>
                <option value="DEF_MARKSHEET_INCOMPLETE">DEF_MARKSHEET_INCOMPLETE (Missing semester grades)</option>
                <option value="DEF_ADMISSION_UNCONFIRMED">DEF_ADMISSION_UNCONFIRMED (Provisional admission letter)</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[#0F172A]">Deficiency Title / Subject</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="h-10 px-3 bg-white text-xs border border-[#CBD5E1] rounded outline-none"
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[#0F172A]">Explanation & Policy Ground</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="p-3 bg-white text-xs border border-[#CBD5E1] rounded outline-none"
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[#0F172A]">Exact Action Required from Applicant</label>
              <input
                type="text"
                value={actionRequired}
                onChange={(e) => setActionRequired(e.target.value)}
                className="h-10 px-3 bg-white text-xs border border-[#CBD5E1] rounded outline-none"
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[#0F172A]">Correction Deadline SLA</label>
              <select
                value={deadlineDays}
                onChange={(e) => setDeadlineDays(Number(e.target.value))}
                className="h-10 px-3 bg-white text-xs border border-[#CBD5E1] rounded outline-none"
              >
                <option value={7}>7 Days (Urgent batch cutoff)</option>
                <option value={14}>14 Days (Standard scheme SLA)</option>
                <option value={21}>21 Days (Extended appeal SLA)</option>
              </select>
            </div>
          </>
        ) : (
          <div className="space-y-3">
            <div className={`p-4 rounded border ${actionType === 'APPROVE' ? 'bg-[#ECFDF5] border-[#A7F3D0] text-[#065F46]' : 'bg-[#FEF2F2] border-[#FECACA] text-[#991B1B]'}`}>
              <div className="flex items-center gap-2 font-bold text-sm mb-1">
                {actionType === 'APPROVE' ? (
                  <CheckCircle2 className="w-5 h-5 text-[#0E766E]" />
                ) : (
                  <XCircle className="w-5 h-5 text-[#DC2626]" />
                )}
                <span>
                  {actionType === 'APPROVE'
                    ? 'Confirm Official Approval for Selection / Merit Run'
                    : 'Confirm Rejection of Application'}
                </span>
              </div>
              <p className="text-xs opacity-90 leading-relaxed">
                {actionType === 'APPROVE'
                  ? 'Application status will transition to APPROVED and will be queued for merit list slot allocation. The applicant will be notified.'
                  : 'Rejection requires mandatory administrative justification for legal and grievance auditability.'}
              </p>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[#0F172A]">Administrative Decision Reason / Note</label>
              <textarea
                value={decisionNote}
                onChange={(e) => setDecisionNote(e.target.value)}
                placeholder={actionType === 'APPROVE' ? 'Enter verification clearance notes...' : 'Enter mandatory rejection ground...'}
                rows={3}
                className="p-3 bg-white text-xs border border-[#CBD5E1] rounded outline-none"
                required={actionType === 'REJECT'}
              />
            </div>
          </div>
        )}

        <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#E2E8F0]">
          <Button variant="secondary" size="sm" type="button" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button
            variant={actionType === 'REJECT' || actionType === 'DEFICIENCY' ? 'destructive' : 'primary'}
            size="sm"
            type="submit"
            isLoading={loading}
          >
            {actionType === 'DEFICIENCY' ? 'Raise Formal Deficiency' : actionType === 'APPROVE' ? 'Approve Application' : 'Reject Application'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
