import { ApplicationDetail, ApplicationSummary, ApplicationState } from '../../types/application';

export interface ApplicationFilter {
  schemeId?: string;
  status?: ApplicationState | 'ALL';
  searchQuery?: string;
  applicantId?: string;
}

export interface CreateApplicationPayload {
  schemeId: string;
  applicantProfile: any;
  documents: any[];
}

export interface RaiseDeficiencyPayload {
  documentId?: string;
  documentTitle: string;
  reasonCode: string;
  title: string;
  description: string;
  actionRequired: string;
  deadlineDays: number;
}

export interface ResolveDeficiencyPayload {
  deficiencyId: string;
  newFileName: string;
  notes?: string;
}

export interface RecordDecisionPayload {
  decision: 'APPROVE' | 'REJECT';
  reasonNote: string;
}

export interface IApplicationService {
  getApplications(filter?: ApplicationFilter): Promise<ApplicationSummary[]>;
  getApplicationById(id: string): Promise<ApplicationDetail | null>;
  createApplication(payload: CreateApplicationPayload): Promise<ApplicationDetail>;
  raiseDeficiency(applicationId: string, payload: RaiseDeficiencyPayload): Promise<ApplicationDetail>;
  resolveDeficiency(applicationId: string, payload: ResolveDeficiencyPayload): Promise<ApplicationDetail>;
  recordDecision(applicationId: string, payload: RecordDecisionPayload): Promise<ApplicationDetail>;
  resetToFixtures(): Promise<void>;
}
