import { ApplicantProfile } from './applicant';
import { DocumentItem } from './document';
import { DeficiencyItem } from './deficiency';

export type ApplicationState =
  | 'DRAFT'
  | 'SUBMITTED'
  | 'DOCUMENT_VERIFICATION'
  | 'ELIGIBILITY_VERIFICATION'
  | 'UNDER_REVIEW'
  | 'DEFICIENCY_RAISED'
  | 'RESUBMISSION_REQUIRED'
  | 'RESUBMITTED'
  | 'SCREENING'
  | 'ELIGIBLE'
  | 'SELECTED'
  | 'NOT_SELECTED'
  | 'APPROVED'
  | 'COMPLETED'
  | 'REJECTED';

export type MilestoneStage =
  | 'SUBMITTED'
  | 'DOCUMENT_VERIFICATION'
  | 'ELIGIBILITY_VERIFICATION'
  | 'ADMIN_SCREENING'
  | 'SELECTION'
  | 'FINAL_DECISION';

export interface TimelineEvent {
  id: string;
  stageName: string;
  title: string;
  description: string;
  timestamp: string;
  actor: string;
  status: 'COMPLETED' | 'IN_PROGRESS' | 'PENDING' | 'ACTION_REQUIRED';
}

export interface RuleCheckResult {
  ruleId: string;
  ruleTitle: string;
  status: 'PASS' | 'FAIL' | 'NEEDS_REVIEW';
  detail: string;
  sourceValue: string;
  policyThreshold: string;
}

export interface ApplicationDetail {
  id: string; // e.g. "NFST-2026-00124"
  schemeId: string;
  schemeName: string;
  policyVersion: string;
  status: ApplicationState;
  currentMilestone: MilestoneStage;
  submittedAt: string;
  lastUpdatedAt: string;
  applicant: ApplicantProfile;
  documents: DocumentItem[];
  deficiencies: DeficiencyItem[];
  timeline: TimelineEvent[];
  ruleChecks: RuleCheckResult[];
  assignedScrutineer?: string;
  decisionNote?: string;
  meritRank?: number;
}

export interface ApplicationSummary {
  id: string;
  applicantName: string;
  category: string;
  state: string;
  schemeId: string;
  schemeName: string;
  status: ApplicationState;
  currentMilestone: MilestoneStage;
  submittedAt: string;
  deficiencyCount: number;
  aiVerificationScore: number; // e.g. 96 (%)
  assignedTo?: string;
}
