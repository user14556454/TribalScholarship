import {
  IApplicationService,
  ApplicationFilter,
  CreateApplicationPayload,
  RaiseDeficiencyPayload,
  ResolveDeficiencyPayload,
  RecordDecisionPayload
} from '../interfaces/IApplicationService';
import { ApplicationDetail, ApplicationSummary } from '../../types/application';
import { mockStorage } from './mockStorage';

export class MockApplicationService implements IApplicationService {
  public async getApplications(filter?: ApplicationFilter): Promise<ApplicationSummary[]> {
    await new Promise((r) => setTimeout(r, 150));
    let list = mockStorage.getAll();

    if (filter?.schemeId && filter.schemeId !== 'ALL') {
      list = list.filter((a) => a.schemeId.toLowerCase() === filter.schemeId?.toLowerCase());
    }

    if (filter?.status && filter.status !== 'ALL') {
      list = list.filter((a) => a.status === filter.status);
    }

    if (filter?.searchQuery) {
      const q = filter.searchQuery.toLowerCase();
      list = list.filter(
        (a) =>
          a.id.toLowerCase().includes(q) ||
          a.applicant.fullName.toLowerCase().includes(q) ||
          a.applicant.permanentState.toLowerCase().includes(q) ||
          a.schemeName.toLowerCase().includes(q)
      );
    }

    if (filter?.applicantId) {
      list = list.filter((a) => a.applicant.id === filter.applicantId);
    }

    return list.map((a) => ({
      id: a.id,
      applicantName: a.applicant.fullName,
      category: `${a.applicant.category} (${a.applicant.tribalCommunity}${a.applicant.isPvtg ? ' - PVTG' : ''})`,
      state: a.applicant.permanentState,
      schemeId: a.schemeId,
      schemeName: a.schemeName,
      status: a.status,
      currentMilestone: a.currentMilestone,
      submittedAt: a.submittedAt,
      deficiencyCount: a.deficiencies.filter((d) => d.status === 'OPEN').length,
      aiVerificationScore: a.documents.length > 0
        ? Math.round(
            (a.documents.reduce((acc, d) => acc + (d.aiConfidence || 0.95), 0) / a.documents.length) * 100
          )
        : 95,
      assignedTo: a.assignedScrutineer
    }));
  }

  public async getApplicationById(id: string): Promise<ApplicationDetail | null> {
    await new Promise((r) => setTimeout(r, 150));
    return mockStorage.getById(id);
  }

  public async createApplication(payload: CreateApplicationPayload): Promise<ApplicationDetail> {
    await new Promise((r) => setTimeout(r, 300));
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const prefix = payload.schemeId.toUpperCase();
    const newId = `${prefix}-2026-${randomNum}`;

    const newApp: ApplicationDetail = {
      id: newId,
      schemeId: payload.schemeId,
      schemeName: payload.schemeId === 'nfst' 
        ? 'National Fellowship for ST Students (NFST)' 
        : payload.schemeId === 'nos' 
        ? 'National Overseas Scholarship for ST Students (NOS)' 
        : 'Top Class Education for ST Students',
      policyVersion: '2026-27.v1',
      status: 'SUBMITTED',
      currentMilestone: 'SUBMITTED',
      submittedAt: new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }),
      lastUpdatedAt: new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }),
      applicant: payload.applicantProfile,
      documents: payload.documents || [],
      deficiencies: [],
      timeline: [
        {
          id: `t-${Date.now()}`,
          stageName: 'SUBMITTED',
          title: 'Application Submitted',
          description: 'Applicant completed form declaration and submitted credentials.',
          timestamp: new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }),
          actor: payload.applicantProfile.fullName,
          status: 'COMPLETED'
        },
        {
          id: `t-${Date.now() + 1}`,
          stageName: 'DOCUMENT_VERIFICATION',
          title: 'AI Verification Queued',
          description: 'Checking document readability and Gazette ST compliance.',
          timestamp: 'In Progress',
          actor: 'TribalOne Automated Engine',
          status: 'IN_PROGRESS'
        }
      ],
      ruleChecks: [
        {
          ruleId: 'r-cat',
          ruleTitle: 'ST Category Verification',
          status: 'PASS',
          sourceValue: payload.applicantProfile.tribalCommunity,
          policyThreshold: 'Notified ST Entry',
          detail: 'Matched with Gazette ST reference database.'
        }
      ]
    };

    mockStorage.save(newApp);
    return newApp;
  }

  public async raiseDeficiency(applicationId: string, payload: RaiseDeficiencyPayload): Promise<ApplicationDetail> {
    await new Promise((r) => setTimeout(r, 200));
    const app = mockStorage.getById(applicationId);
    if (!app) throw new Error('Application not found');

    const deadlineDate = new Date();
    deadlineDate.setDate(deadlineDate.getDate() + (payload.deadlineDays || 14));
    const formattedDeadline = deadlineDate.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });

    const newDeficiency = {
      id: `def-${Date.now()}`,
      applicationId,
      documentId: payload.documentId,
      documentTitle: payload.documentTitle,
      reasonCode: payload.reasonCode,
      title: payload.title,
      description: payload.description,
      actionRequired: payload.actionRequired,
      deadline: formattedDeadline,
      raisedAt: new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }),
      raisedBy: 'Ministry of Tribal Affairs Scrutiny Desk',
      status: 'OPEN' as const
    };

    app.deficiencies.unshift(newDeficiency);
    app.status = 'DEFICIENCY_RAISED';
    app.currentMilestone = 'DOCUMENT_VERIFICATION';
    app.lastUpdatedAt = new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' });

    // Mark affected document as ACTION_REQUIRED
    if (payload.documentId) {
      const doc = app.documents.find((d) => d.id === payload.documentId);
      if (doc) {
        doc.verificationStatus = 'ACTION_REQUIRED';
      }
    }

    app.timeline.unshift({
      id: `t-${Date.now()}`,
      stageName: 'DOCUMENT_VERIFICATION',
      title: `Deficiency Raised: ${payload.title}`,
      description: payload.description,
      timestamp: new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }),
      actor: 'MoTA Scrutiny Officer',
      status: 'ACTION_REQUIRED'
    });

    mockStorage.save(app);
    return app;
  }

  public async resolveDeficiency(applicationId: string, payload: ResolveDeficiencyPayload): Promise<ApplicationDetail> {
    await new Promise((r) => setTimeout(r, 250));
    const app = mockStorage.getById(applicationId);
    if (!app) throw new Error('Application not found');

    const deficiency = app.deficiencies.find((d) => d.id === payload.deficiencyId);
    if (deficiency) {
      deficiency.status = 'RESOLVED';
      deficiency.resolvedAt = new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' });
      deficiency.resubmissionNotes = payload.notes;
    }

    // Update document if associated
    if (deficiency?.documentId) {
      const doc = app.documents.find((d) => d.id === deficiency.documentId);
      if (doc) {
        doc.fileName = payload.newFileName;
        doc.version += 1;
        doc.verificationStatus = 'UNDER_REVIEW';
        doc.uploadedAt = new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' });
      }
    }

    // Check if any open deficiencies remain
    const remainingOpen = app.deficiencies.filter((d) => d.status === 'OPEN').length;
    if (remainingOpen === 0) {
      app.status = 'RESUBMITTED';
    }

    app.lastUpdatedAt = new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' });

    app.timeline.unshift({
      id: `t-${Date.now()}`,
      stageName: 'DOCUMENT_VERIFICATION',
      title: 'Correction Submitted by Applicant',
      description: `Replacement document uploaded: ${payload.newFileName}. Resubmitted for ministry re-scrutiny.`,
      timestamp: new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }),
      actor: app.applicant.fullName,
      status: 'IN_PROGRESS'
    });

    mockStorage.save(app);
    return app;
  }

  public async recordDecision(applicationId: string, payload: RecordDecisionPayload): Promise<ApplicationDetail> {
    await new Promise((r) => setTimeout(r, 200));
    const app = mockStorage.getById(applicationId);
    if (!app) throw new Error('Application not found');

    if (payload.decision === 'APPROVE') {
      app.status = 'APPROVED';
      app.currentMilestone = 'FINAL_DECISION';
      app.decisionNote = payload.reasonNote;
      app.timeline.unshift({
        id: `t-${Date.now()}`,
        stageName: 'FINAL_DECISION',
        title: 'Application Approved for Fellowship Allocation',
        description: payload.reasonNote || 'Meets all mandatory criteria and documents verified.',
        timestamp: new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }),
        actor: 'Dr. V. K. Sharma (Approving Authority)',
        status: 'COMPLETED'
      });
    } else {
      app.status = 'REJECTED';
      app.currentMilestone = 'FINAL_DECISION';
      app.decisionNote = payload.reasonNote;
      app.timeline.unshift({
        id: `t-${Date.now()}`,
        stageName: 'FINAL_DECISION',
        title: 'Application Rejected',
        description: payload.reasonNote,
        timestamp: new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }),
        actor: 'Dr. V. K. Sharma (Approving Authority)',
        status: 'ACTION_REQUIRED'
      });
    }

    app.lastUpdatedAt = new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' });
    mockStorage.save(app);
    return app;
  }

  public async resetToFixtures(): Promise<void> {
    mockStorage.reset();
  }
}

export const mockApplicationService = new MockApplicationService();
