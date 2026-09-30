import React, { useState } from 'react';
import { DocumentItem } from '../../types/document';
import { Badge } from '../common/Badge';
import { AIBadge } from '../common/AIBadge';
import { Button } from '../common/Button';
import { FileText, CheckCircle2, AlertTriangle, ShieldCheck, Eye, Download, AlertCircle } from 'lucide-react';

interface Props {
  documents: DocumentItem[];
  onFlagDeficiency: (doc: DocumentItem) => void;
}

export const DocumentDossierViewer: React.FC<Props> = ({ documents, onFlagDeficiency }) => {
  const [selectedDocId, setSelectedDocId] = useState<string>(documents[0]?.id || '');
  const activeDoc = documents.find((d) => d.id === selectedDocId) || documents[0];

  if (!documents || documents.length === 0) {
    return (
      <div className="bg-white border border-[#E2E8F0] rounded-lg p-8 text-center text-[#64748B]">
        <FileText className="w-8 h-8 mx-auto text-[#CBD5E1] mb-2" />
        <p className="text-sm font-semibold">No documents uploaded for this application.</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-lg overflow-hidden shadow-xs">
      <div className="px-6 py-4 border-b border-[#E2E8F0] bg-[#F8FAFC] flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-[#0F172A]">Document Verification & AI Scrutiny Dossier</h3>
          <p className="text-xs text-[#64748B]">Inspect uploaded certificates side-by-side with OCR extraction models</p>
        </div>
        <span className="text-xs font-semibold text-[#0F172A] bg-white px-2.5 py-1 rounded border border-[#CBD5E1]">
          {documents.length} Documents Attached
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[460px]">
        {/* Document Selector Column */}
        <div className="lg:col-span-4 border-r border-[#E2E8F0] p-3 space-y-2 bg-[#F8FAFC]">
          {documents.map((doc) => {
            const isSelected = doc.id === activeDoc?.id;
            return (
              <div
                key={doc.id}
                onClick={() => setSelectedDocId(doc.id)}
                className={`p-3 rounded border text-left cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-white border-[#0284C7] shadow-xs ring-1 ring-[#0284C7]'
                    : 'bg-white border-[#E2E8F0] hover:border-[#CBD5E1]'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <h4 className="text-xs font-bold text-[#0F172A] leading-snug line-clamp-1">{doc.title}</h4>
                  <Badge status={doc.verificationStatus} size="sm" />
                </div>
                <p className="text-[11px] text-[#64748B] truncate mb-2">{doc.fileName}</p>
                <div className="flex items-center justify-between text-[10px] text-[#94A3B8]">
                  <span>v{doc.version} · {(doc.fileSizeBytes / 1024 / 1024).toFixed(1)} MB</span>
                  {doc.aiConfidence && (
                    <span className="text-[#0E766E] font-semibold">AI: {Math.round(doc.aiConfidence * 100)}%</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Document Details & AI Findings Column */}
        {activeDoc && (
          <div className="lg:col-span-8 p-6 flex flex-col justify-between">
            <div>
              {/* Document Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#E2E8F0]">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-base font-bold text-[#0F172A]">{activeDoc.title}</h4>
                    <Badge status={activeDoc.verificationStatus} />
                  </div>
                  <p className="text-xs text-[#64748B] mt-0.5">
                    File: <code className="text-[#0A2540] font-mono">{activeDoc.fileName}</code> · Uploaded {activeDoc.uploadedAt}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => onFlagDeficiency(activeDoc)}
                    leftIcon={<AlertTriangle className="w-3.5 h-3.5" />}
                  >
                    Raise Deficiency
                  </Button>
                </div>
              </div>

              {/* Certificate Metadata Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4 p-3.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded">
                <div>
                  <p className="text-[11px] font-semibold text-[#64748B] uppercase">Certificate / Reg No.</p>
                  <p className="text-xs font-mono font-bold text-[#0F172A] mt-0.5">
                    {activeDoc.certificateNumber || 'N/A'}
                  </p>
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-[#64748B] uppercase">Issue Date</p>
                  <p className="text-xs font-bold text-[#0F172A] mt-0.5">{activeDoc.issuedDate || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-[#64748B] uppercase">Issuing Authority</p>
                  <p className="text-xs font-bold text-[#0F172A] mt-0.5 truncate" title={activeDoc.issuingAuthority}>
                    {activeDoc.issuingAuthority || 'N/A'}
                  </p>
                </div>
              </div>

              {/* AI Assisted Verification Findings Section */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <AIBadge label="AI Extraction Findings" confidence={activeDoc.aiConfidence} />
                    <span className="text-xs text-[#64748B]">Deterministic OCR & Gazette match</span>
                  </div>
                  <span className="text-[11px] text-[#64748B]">Model: v2026.09 (Gazette Reference Part VII)</span>
                </div>

                {activeDoc.aiFindings && activeDoc.aiFindings.length > 0 ? (
                  <div className="space-y-2.5">
                    {activeDoc.aiFindings.map((finding) => (
                      <div
                        key={finding.id}
                        className={`p-3 rounded border text-xs ${
                          finding.status === 'WARNING'
                            ? 'bg-[#FFFBEB] border-[#FDE68A] text-[#92400E]'
                            : 'bg-white border-[#E2E8F0] text-[#334155]'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold flex items-center gap-1.5">
                            {finding.status === 'WARNING' ? (
                              <AlertCircle className="w-3.5 h-3.5 text-[#D97706]" />
                            ) : (
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#0E766E]" />
                            )}
                            <span>{finding.label}</span>
                          </span>
                          <span className="text-[11px] font-mono text-[#64748B]">
                            Confidence: {Math.round(finding.confidence * 100)}%
                          </span>
                        </div>
                        <p className="text-[11px] mt-0.5 font-medium leading-relaxed">{finding.detail}</p>
                        <div className="mt-1.5 pt-1.5 border-t border-slate-200/60 flex items-center justify-between text-[11px]">
                          <span>Extracted: <strong className="font-mono">{finding.extractedValue}</strong></span>
                          {finding.expectedValue && (
                            <span className="text-slate-500">Expected: {finding.expectedValue}</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded text-center text-xs text-[#64748B]">
                    No automated anomalies detected for this document.
                  </div>
                )}
              </div>
            </div>

            {/* Document Verification Notice */}
            <div className="pt-3 border-t border-[#E2E8F0] flex items-center justify-between text-[11px] text-[#64748B]">
              <span className="flex items-center gap-1 text-[#0E766E] font-medium">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Digitally signed and hashed on upload (SHA-256 Verified)</span>
              </span>
              <span>Human verification required for final eligibility record</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
