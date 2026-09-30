export type DocumentVerificationStatus = 'VERIFIED' | 'ACTION_REQUIRED' | 'UNDER_REVIEW' | 'PENDING';

export interface AIFinding {
  id: string;
  field: string;
  label: string;
  extractedValue: string;
  expectedValue?: string;
  confidence: number; // 0.0 - 1.0 (e.g. 0.98 -> 98%)
  status: 'MATCH' | 'MISMATCH' | 'WARNING' | 'INFO';
  detail: string;
}

export interface DocumentItem {
  id: string;
  documentType: string; // 'caste_certificate' | 'income_certificate' | 'masters_marksheet' | 'admission_offer' | 'photo'
  title: string;
  fileName: string;
  fileSizeBytes: number;
  uploadedAt: string;
  version: number;
  verificationStatus: DocumentVerificationStatus;
  aiConfidence?: number;
  aiFindings: AIFinding[];
  previewUrl?: string;
  issuedDate?: string;
  issuingAuthority?: string;
  certificateNumber?: string;
}
