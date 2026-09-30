export type DeficiencyStatus = 'OPEN' | 'RESOLVED' | 'UNDER_REVIEW' | 'OVERDUE';

export interface DeficiencyItem {
  id: string;
  applicationId: string;
  documentId?: string;
  documentTitle: string;
  reasonCode: string;
  title: string;
  description: string;
  actionRequired: string;
  deadline: string;
  raisedAt: string;
  raisedBy: string; // e.g. "MoTA Scrutiny Section"
  status: DeficiencyStatus;
  resubmittedDocumentId?: string;
  resubmissionNotes?: string;
  resolvedAt?: string;
}
