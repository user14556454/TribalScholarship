import React, { useState } from 'react';
import { DocumentItem } from '../../types/document';
import { Upload, CheckCircle2, AlertTriangle, FileText, Sparkles, RefreshCw, ExternalLink } from 'lucide-react';
import { Button } from '../common/Button';
import { AIBadge } from '../common/AIBadge';

interface Props {
  documentRequirement: {
    type: string;
    title: string;
    guideline?: string;
    required: boolean;
  };
  existingDoc?: DocumentItem;
  onUploadComplete: (doc: DocumentItem) => void;
}

export const DocumentUploadBox: React.FC<Props> = ({
  documentRequirement,
  existingDoc,
  onUploadComplete
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const simulateUpload = (fileName: string, isDigiLocker = false) => {
    setIsUploading(true);
    setUploadProgress(20);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          setTimeout(() => {
            setIsUploading(false);
            setUploadProgress(0);

            // Construct rich simulated document item
            const newDoc: DocumentItem = {
              id: `doc-${Date.now()}`,
              documentType: documentRequirement.type,
              title: documentRequirement.title,
              fileName: isDigiLocker ? `DigiLocker_Verified_${fileName}` : fileName,
              fileSizeBytes: Math.floor(1200000 + Math.random() * 800000),
              uploadedAt: new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }),
              version: (existingDoc?.version || 0) + 1,
              verificationStatus: 'VERIFIED',
              aiConfidence: isDigiLocker ? 1.0 : 0.98,
              certificateNumber: `JH/DOC/2026/${Math.floor(10000 + Math.random() * 90000)}`,
              issuedDate: '15 June 2025',
              issuingAuthority: 'Competent Revenue Authority / Central University',
              aiFindings: [
                {
                  id: `f-${Date.now()}-1`,
                  field: 'readability',
                  label: 'Document Legibility',
                  extractedValue: '100% Clear scan / Digital Vector',
                  confidence: 0.99,
                  status: 'MATCH',
                  detail: 'Digital signature and high contrast text detected.'
                },
                {
                  id: `f-${Date.now()}-2`,
                  field: 'identity_match',
                  label: 'Name Verification',
                  extractedValue: 'Exact Lexical Match',
                  confidence: 0.98,
                  status: 'MATCH',
                  detail: 'Matches applicant profile identity record.'
                }
              ]
            };

            onUploadComplete(newDoc);
          }, 300);
          return 100;
        }
        return prev + 35;
      });
    }, 150);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      simulateUpload(file.name);
    }
  };

  const handleDigiLockerFetch = () => {
    simulateUpload(`${documentRequirement.type}.pdf`, true);
  };

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-lg p-5 shadow-xs">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-3">
        <div>
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-bold text-[#0F172A]">{documentRequirement.title}</h4>
            {documentRequirement.required ? (
              <span className="text-[10px] font-bold text-[#DC2626] bg-[#FEF2F2] px-1.5 py-0.2 rounded border border-[#FECACA]">
                Mandatory
              </span>
            ) : (
              <span className="text-[10px] text-[#64748B] bg-[#F1F5F9] px-1.5 py-0.2 rounded">
                Optional
              </span>
            )}
          </div>
          {documentRequirement.guideline && (
            <p className="text-xs text-[#64748B] mt-0.5">{documentRequirement.guideline}</p>
          )}
        </div>

        {/* DigiLocker Button */}
        <button
          type="button"
          onClick={handleDigiLockerFetch}
          disabled={isUploading}
          className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-[#0E766E] bg-[#ECFDF5] hover:bg-[#D1FAE5] border border-[#A7F3D0] rounded transition-colors cursor-pointer disabled:opacity-50"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span>Fetch from DigiLocker</span>
        </button>
      </div>

      {/* Existing Uploaded State */}
      {existingDoc && !isUploading && (
        <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded p-3 mb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded bg-sky-100 text-[#0284C7] flex items-center justify-center">
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#0F172A]">{existingDoc.fileName}</p>
                <p className="text-[11px] text-[#64748B]">
                  {(existingDoc.fileSizeBytes / 1024 / 1024).toFixed(2)} MB · Uploaded {existingDoc.uploadedAt} (v{existingDoc.version})
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#065F46] bg-[#ECFDF5] px-2 py-0.5 rounded border border-[#A7F3D0]">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Uploaded</span>
              </span>
            </div>
          </div>

          {/* AI Findings Preview */}
          {existingDoc.aiFindings && existingDoc.aiFindings.length > 0 && (
            <div className="mt-3 pt-3 border-t border-[#E2E8F0]">
              <div className="flex items-center justify-between mb-1.5">
                <AIBadge label="AI Document Check" confidence={existingDoc.aiConfidence} />
                <span className="text-[10px] text-[#64748B]">Human review required before approval</span>
              </div>
              <div className="space-y-1 mt-1">
                {existingDoc.aiFindings.map((f) => (
                  <p key={f.id} className="text-[11px] text-[#475569] flex items-center gap-1.5">
                    <span className="text-[#0E766E] font-bold">✓</span>
                    <span><strong>{f.label}:</strong> {f.extractedValue}</span>
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Upload Progress Bar */}
      {isUploading && (
        <div className="my-3 p-3 bg-sky-50 border border-sky-200 rounded">
          <div className="flex items-center justify-between text-xs font-semibold text-sky-800 mb-1.5">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-sky-600 animate-spin" />
              <span>Scanning document & running AI verification...</span>
            </span>
            <span>{uploadProgress}%</span>
          </div>
          <div className="w-full bg-sky-200 h-2 rounded-full overflow-hidden">
            <div
              className="bg-[#0284C7] h-full transition-all duration-200"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        </div>
      )}

      {/* Dropzone trigger */}
      <label className="border border-dashed border-[#CBD5E1] hover:border-[#0284C7] bg-[#F8FAFC] hover:bg-[#F0F9FF] rounded p-4 flex flex-col items-center justify-center cursor-pointer transition-colors text-center block">
        <Upload className="w-5 h-5 text-[#64748B] mb-1" />
        <span className="text-xs font-semibold text-[#0284C7]">
          {existingDoc ? 'Click to replace document with a new version' : 'Click to select or drag and drop file'}
        </span>
        <span className="text-[11px] text-[#94A3B8] mt-0.5">
          PDF, PNG, JPG accepted (Up to 5MB) · Virus scanned & encrypted
        </span>
        <input
          type="file"
          accept=".pdf,.png,.jpg,.jpeg"
          onChange={handleFileChange}
          disabled={isUploading}
          className="hidden"
        />
      </label>
    </div>
  );
};
