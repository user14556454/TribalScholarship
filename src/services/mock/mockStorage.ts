import { ApplicationDetail } from '../../types/application';

const STORAGE_KEY_APPLICATIONS = 'tribalone_applications_db_v1';

export const INITIAL_APPLICATIONS: ApplicationDetail[] = [
  {
    id: 'NFST-2026-00124',
    schemeId: 'nfst',
    schemeName: 'National Fellowship for ST Students (NFST)',
    policyVersion: '2026-27.v1',
    status: 'DEFICIENCY_RAISED',
    currentMilestone: 'DOCUMENT_VERIFICATION',
    submittedAt: '12 Sep 2026, 14:32 IST',
    lastUpdatedAt: '28 Sep 2026, 11:20 IST',
    assignedScrutineer: 'Dr. V. K. Sharma',
    applicant: {
      id: 'user-app-001',
      fullName: 'Rajesh Kumar Soren',
      dateOfBirth: '14 May 1998',
      gender: 'MALE',
      category: 'ST',
      tribalCommunity: 'Santhal',
      isPvtg: true,
      pvtgName: 'Birhor / Santhal Sub-Group',
      isPwd: false,
      annualFamilyIncome: 185000,
      mobileNumber: '+91 98351 44820',
      email: 'rajesh.soren@cuj.ac.in',
      permanentState: 'Jharkhand',
      permanentDistrict: 'Ranchi',
      permanentAddress: 'Village Pandra, Post Hehal, Ranchi, Jharkhand - 834005',
      academicHistory: [
        {
          degreeName: 'Master of Arts (Anthropology)',
          fieldOfStudy: 'Tribal Cultural Studies & Indigeneity',
          institutionName: 'Ranchi University',
          completionYear: 2023,
          percentageMarks: 68.5,
          gradeOrCgpa: 'First Class with Distinction'
        },
        {
          degreeName: 'Bachelor of Arts (Sociology)',
          fieldOfStudy: 'Sociology & Tribal History',
          institutionName: 'St. Xavier’s College, Ranchi',
          completionYear: 2021,
          percentageMarks: 72.0
        }
      ],
      currentAdmission: {
        institutionName: 'Central University of Jharkhand, Brambe Campus',
        courseName: 'Ph.D. in Anthropology & Tribal Studies',
        courseType: 'FULL_TIME',
        admissionYear: 2025,
        registrationNumber: 'CUJ/DOC/ANTH/2025/08',
        guideName: 'Prof. Nirmal Minz'
      },
      bankDetails: {
        accountHolderName: 'Rajesh Kumar Soren',
        bankName: 'State Bank of India',
        accountNumberMasked: '••••••••4819',
        ifscCode: 'SBIN0011563',
        isAadhaarSeeded: true
      }
    },
    documents: [
      {
        id: 'doc-001',
        documentType: 'caste_certificate',
        title: 'Scheduled Tribe Community Certificate',
        fileName: 'ST_Certificate_Soren_Rajesh.pdf',
        fileSizeBytes: 1420000,
        uploadedAt: '12 Sep 2026, 14:15 IST',
        version: 1,
        verificationStatus: 'VERIFIED',
        aiConfidence: 0.99,
        certificateNumber: 'JH/REV/ST/2022/88219',
        issuedDate: '15 June 2022',
        issuingAuthority: 'Sub-Divisional Magistrate, Ranchi Sadar',
        aiFindings: [
          {
            id: 'f-1',
            field: 'caste_name',
            label: 'Tribal Community Name',
            extractedValue: 'Santhal (ST Entry #24)',
            expectedValue: 'Santhal',
            confidence: 0.992,
            status: 'MATCH',
            detail: 'Verified against Central Gazette of Scheduled Tribes (Jharkhand Schedule Part VII).'
          },
          {
            id: 'f-2',
            field: 'holder_name',
            label: 'Certificate Holder Name',
            extractedValue: 'Rajesh Kumar Soren',
            expectedValue: 'Rajesh Kumar Soren',
            confidence: 0.988,
            status: 'MATCH',
            detail: 'Exact 100% lexical match with applicant profile.'
          }
        ]
      },
      {
        id: 'doc-002',
        documentType: 'income_certificate',
        title: 'Annual Family Income Certificate',
        fileName: 'Income_Certificate_2024.pdf',
        fileSizeBytes: 890000,
        uploadedAt: '12 Sep 2026, 14:18 IST',
        version: 1,
        verificationStatus: 'ACTION_REQUIRED',
        aiConfidence: 0.94,
        certificateNumber: 'JH/INC/2024/0912',
        issuedDate: '10 March 2024',
        issuingAuthority: 'Circle Officer, Kanke, Ranchi',
        aiFindings: [
          {
            id: 'f-3',
            field: 'issue_date',
            label: 'Certificate Issue Date',
            extractedValue: '10 March 2024',
            expectedValue: 'FY 2025-26 or later',
            confidence: 0.95,
            status: 'WARNING',
            detail: 'Document appears expired for Academic Year 2026-27. Income certificates must be valid for the current financial year.'
          },
          {
            id: 'f-4',
            field: 'income_value',
            label: 'Certified Annual Income',
            extractedValue: '₹1,85,000 / annum',
            expectedValue: 'Below ₹6,00,000',
            confidence: 0.93,
            status: 'MATCH',
            detail: 'Value is well within MoTA ceiling requirements.'
          }
        ]
      },
      {
        id: 'doc-003',
        documentType: 'masters_marksheet',
        title: 'Master’s Degree Consolidated Marksheet',
        fileName: 'MA_Anthropology_Marksheet_CUJ.pdf',
        fileSizeBytes: 2150000,
        uploadedAt: '12 Sep 2026, 14:22 IST',
        version: 1,
        verificationStatus: 'VERIFIED',
        aiConfidence: 0.97,
        certificateNumber: 'RU/PG/2023/44910',
        issuedDate: '24 Aug 2023',
        issuingAuthority: 'Controller of Examinations, Ranchi University',
        aiFindings: [
          {
            id: 'f-5',
            field: 'percentage',
            label: 'Aggregate Marks Percentage',
            extractedValue: '68.50%',
            expectedValue: '≥ 55.00%',
            confidence: 0.97,
            status: 'MATCH',
            detail: 'Qualifies comfortably above MoTA NFST minimum 55% eligibility threshold.'
          }
        ]
      },
      {
        id: 'doc-004',
        documentType: 'admission_offer',
        title: 'Ph.D. Enrolment & Admission Letter',
        fileName: 'PhD_Admission_Letter_CUJ.pdf',
        fileSizeBytes: 1100000,
        uploadedAt: '12 Sep 2026, 14:25 IST',
        version: 1,
        verificationStatus: 'VERIFIED',
        aiConfidence: 0.96,
        certificateNumber: 'CUJ/ANTH/ADM/2025/11',
        issuedDate: '15 July 2025',
        issuingAuthority: 'Registrar, Central University of Jharkhand',
        aiFindings: [
          {
            id: 'f-6',
            field: 'course_type',
            label: 'Admission Mode',
            extractedValue: 'Regular Full-Time Ph.D.',
            expectedValue: 'FULL_TIME',
            confidence: 0.96,
            status: 'MATCH',
            detail: 'Verified full-time enrolment in Central University.'
          }
        ]
      }
    ],
    deficiencies: [
      {
        id: 'def-001',
        applicationId: 'NFST-2026-00124',
        documentId: 'doc-002',
        documentTitle: 'Annual Family Income Certificate',
        reasonCode: 'DEF_INC_EXPIRED',
        title: 'Income Certificate Expired for Academic Year 2026-27',
        description: 'The uploaded Income Certificate (Issued March 2024) is older than 1 year and has expired. As per MoTA NFST scheme guidelines, a certificate issued on or after 1 April 2025 is mandatory.',
        actionRequired: 'Please upload a freshly issued Income Certificate for FY 2025-26 or FY 2026-27 issued by a competent Revenue Authority (Tahasildar / Circle Officer / SDO).',
        deadline: '15 October 2026',
        raisedAt: '28 Sep 2026, 11:20 IST',
        raisedBy: 'Ministry of Tribal Affairs Scrutiny Desk',
        status: 'OPEN'
      }
    ],
    timeline: [
      {
        id: 't-1',
        stageName: 'SUBMITTED',
        title: 'Application Form Submitted Successfully',
        description: 'Dossier received and timestamped with digital submission receipt.',
        timestamp: '12 Sep 2026, 14:32 IST',
        actor: 'Applicant (Rajesh Kumar Soren)',
        status: 'COMPLETED'
      },
      {
        id: 't-2',
        stageName: 'DOCUMENT_VERIFICATION',
        title: 'AI Document Scrutiny & Field Extraction',
        description: 'Automated OCR completed. ST community name and Master marks verified. 1 potential expiry flag detected.',
        timestamp: '12 Sep 2026, 14:35 IST',
        actor: 'TribalOne Automated Scrutiny Engine',
        status: 'COMPLETED'
      },
      {
        id: 't-3',
        stageName: 'DOCUMENT_VERIFICATION',
        title: 'Deficiency Raised by Ministry Scrutiny Officer',
        description: 'Income Certificate flagged as expired. Applicant notified via SMS and portal.',
        timestamp: '28 Sep 2026, 11:20 IST',
        actor: 'Dr. V. K. Sharma (Scrutiny Officer)',
        status: 'ACTION_REQUIRED'
      },
      {
        id: 't-4',
        stageName: 'ELIGIBILITY_VERIFICATION',
        title: 'Deterministic Policy Evaluation',
        description: 'Pending resolution of Income Certificate deficiency.',
        timestamp: 'Upcoming',
        actor: 'MoTA Policy Engine',
        status: 'PENDING'
      },
      {
        id: 't-5',
        stageName: 'ADMIN_SCREENING',
        title: 'Committee Screening & PVTG Priority Review',
        description: 'Subject to document clearance.',
        timestamp: 'Upcoming',
        actor: 'MoTA Screening Committee',
        status: 'PENDING'
      },
      {
        id: 't-6',
        stageName: 'SELECTION',
        title: 'Merit List Allocation & Final Award Letter',
        description: 'Final allocation against 750 NFST fellowship slots.',
        timestamp: 'Upcoming',
        actor: 'MoTA Scholarship Division',
        status: 'PENDING'
      }
    ],
    ruleChecks: [
      {
        ruleId: 'r-st',
        ruleTitle: 'ST Category Verification',
        status: 'PASS',
        sourceValue: 'Santhal (Jharkhand Entry #24)',
        policyThreshold: 'Notified Scheduled Tribe',
        detail: 'Caste matches Central Gazette Schedule Part VII.'
      },
      {
        ruleId: 'r-marks',
        ruleTitle: 'Master’s Degree Minimum Percentage',
        status: 'PASS',
        sourceValue: '68.50%',
        policyThreshold: '≥ 55.00%',
        detail: 'Candidate has 68.50%, satisfying criteria.'
      },
      {
        ruleId: 'r-income',
        ruleTitle: 'Income Certificate Validity',
        status: 'NEEDS_REVIEW',
        sourceValue: '10 March 2024',
        policyThreshold: 'Issued on or after 01/04/2025',
        detail: 'Document requires replacement with current financial year validity.'
      },
      {
        ruleId: 'r-pvtg',
        ruleTitle: 'PVTG Priority Category Consideration',
        status: 'PASS',
        sourceValue: 'Birhor / Santhal PVTG Cluster',
        policyThreshold: 'Eligible for 50 PVTG Reserved Slots',
        detail: 'Priority reservation applied under NFST Clause 4.2.'
      }
    ]
  },
  {
    id: 'NOS-2026-00042',
    schemeId: 'nos',
    schemeName: 'National Overseas Scholarship for ST Students (NOS)',
    policyVersion: '2026-27.v1',
    status: 'SCREENING',
    currentMilestone: 'ADMIN_SCREENING',
    submittedAt: '05 Sep 2026, 10:14 IST',
    lastUpdatedAt: '24 Sep 2026, 16:45 IST',
    assignedScrutineer: 'Dr. V. K. Sharma',
    applicant: {
      id: 'user-app-002',
      fullName: 'Pooja Kispotta',
      dateOfBirth: '22 August 1999',
      gender: 'FEMALE',
      category: 'ST',
      tribalCommunity: 'Oraon',
      isPvtg: false,
      isPwd: false,
      annualFamilyIncome: 420000,
      mobileNumber: '+91 97182 30192',
      email: 'pooja.k@oxford.alumni.org',
      permanentState: 'Odisha',
      permanentDistrict: 'Sundargarh',
      permanentAddress: 'Sector 4, Rourkela, Sundargarh, Odisha - 769002',
      academicHistory: [
        {
          degreeName: 'B.Tech in Computer Science',
          fieldOfStudy: 'Artificial Intelligence & Systems',
          institutionName: 'NIT Rourkela',
          completionYear: 2022,
          percentageMarks: 81.4
        }
      ],
      currentAdmission: {
        institutionName: 'University of Oxford, Department of Computer Science',
        courseName: 'M.Sc. in Advanced Computer Science',
        courseType: 'FULL_TIME',
        admissionYear: 2026,
        qsWorldRanking: 4
      },
      bankDetails: {
        accountHolderName: 'Pooja Kispotta',
        bankName: 'Canara Bank',
        accountNumberMasked: '••••••••6012',
        ifscCode: 'CNRB0002104',
        isAadhaarSeeded: true
      }
    },
    documents: [
      {
        id: 'doc-nos-1',
        documentType: 'caste_certificate',
        title: 'ST Certificate (Oraon)',
        fileName: 'ST_Certificate_Oraon_Pooja.pdf',
        fileSizeBytes: 1200000,
        uploadedAt: '05 Sep 2026, 10:00 IST',
        version: 1,
        verificationStatus: 'VERIFIED',
        aiConfidence: 0.99,
        aiFindings: []
      },
      {
        id: 'doc-nos-2',
        documentType: 'unconditional_offer',
        title: 'Oxford University Unconditional Offer Letter',
        fileName: 'Oxford_MSc_Offer_PoojaK.pdf',
        fileSizeBytes: 1800000,
        uploadedAt: '05 Sep 2026, 10:05 IST',
        version: 1,
        verificationStatus: 'VERIFIED',
        aiConfidence: 0.98,
        aiFindings: []
      }
    ],
    deficiencies: [],
    timeline: [
      {
        id: 'tn-1',
        stageName: 'SUBMITTED',
        title: 'Application Submitted',
        description: 'Candidate applied for NOS 2026-27 (STEM Stream).',
        timestamp: '05 Sep 2026, 10:14 IST',
        actor: 'Applicant (Pooja Kispotta)',
        status: 'COMPLETED'
      },
      {
        id: 'tn-2',
        stageName: 'DOCUMENT_VERIFICATION',
        title: 'Document & Offer Verification Passed',
        description: 'Unconditional Oxford admission offer verified (QS Rank #4).',
        timestamp: '18 Sep 2026, 15:30 IST',
        actor: 'MoTA Overseas Scrutiny Desk',
        status: 'COMPLETED'
      },
      {
        id: 'tn-3',
        stageName: 'ADMIN_SCREENING',
        title: 'Screening for STEM Stream Allocation',
        description: 'Application evaluated under 10 STEM quota slots with female priority earmark.',
        timestamp: '24 Sep 2026, 16:45 IST',
        actor: 'MoTA Selection Board',
        status: 'IN_PROGRESS'
      }
    ],
    ruleChecks: [
      {
        ruleId: 'r-nos-qs',
        ruleTitle: 'QS World University Ranking',
        status: 'PASS',
        sourceValue: 'QS Rank 4 (Oxford)',
        policyThreshold: 'QS Top 500',
        detail: 'Exceeds top tier criterion.'
      },
      {
        ruleId: 'r-nos-inc',
        ruleTitle: 'Annual Income Ceiling',
        status: 'PASS',
        sourceValue: '₹4,20,000',
        policyThreshold: '≤ ₹6,00,000',
        detail: 'Eligible under income threshold.'
      }
    ]
  },
  {
    id: 'NFST-2026-00089',
    schemeId: 'nfst',
    schemeName: 'National Fellowship for ST Students (NFST)',
    policyVersion: '2026-27.v1',
    status: 'APPROVED',
    currentMilestone: 'FINAL_DECISION',
    submittedAt: '01 Sep 2026, 09:20 IST',
    lastUpdatedAt: '25 Sep 2026, 17:00 IST',
    assignedScrutineer: 'Dr. V. K. Sharma',
    applicant: {
      id: 'user-app-003',
      fullName: 'Amit Kumar Munda',
      dateOfBirth: '08 Dec 1997',
      gender: 'MALE',
      category: 'ST',
      tribalCommunity: 'Munda',
      isPvtg: false,
      isPwd: false,
      annualFamilyIncome: 140000,
      mobileNumber: '+91 94311 02847',
      email: 'amit.munda@bhu.ac.in',
      permanentState: 'Jharkhand',
      permanentDistrict: 'Khunti',
      permanentAddress: 'Khunti Bazar, Khunti, Jharkhand - 835210',
      academicHistory: [],
      currentAdmission: {
        institutionName: 'Banaras Hindu University (BHU)',
        courseName: 'Ph.D. in Botany & Medicinal Flora',
        courseType: 'FULL_TIME',
        admissionYear: 2025
      },
      bankDetails: {
        accountHolderName: 'Amit Kumar Munda',
        bankName: 'Punjab National Bank',
        accountNumberMasked: '••••••••1109',
        ifscCode: 'PUNB0123400',
        isAadhaarSeeded: true
      }
    },
    documents: [],
    deficiencies: [],
    timeline: [],
    ruleChecks: []
  },
  {
    id: 'TCE-2026-00215',
    schemeId: 'top-class',
    schemeName: 'Top Class Education for ST Students',
    policyVersion: '2026-27.v1',
    status: 'SUBMITTED',
    currentMilestone: 'SUBMITTED',
    submittedAt: '29 Sep 2026, 19:10 IST',
    lastUpdatedAt: '29 Sep 2026, 19:10 IST',
    applicant: {
      id: 'user-app-004',
      fullName: 'Sunita Marandi',
      dateOfBirth: '03 Feb 2004',
      gender: 'FEMALE',
      category: 'ST',
      tribalCommunity: 'Santhal',
      isPvtg: false,
      isPwd: false,
      annualFamilyIncome: 210000,
      mobileNumber: '+91 98450 11982',
      email: 'sunita.marandi@iitkgp.ac.in',
      permanentState: 'West Bengal',
      permanentDistrict: 'Purulia',
      permanentAddress: 'Manbazar, Purulia, West Bengal - 723131',
      academicHistory: [],
      currentAdmission: {
        institutionName: 'Indian Institute of Technology (IIT) Kharagpur',
        courseName: 'B.Tech in Civil Engineering',
        courseType: 'FULL_TIME',
        admissionYear: 2026
      },
      bankDetails: {
        accountHolderName: 'Sunita Marandi',
        bankName: 'State Bank of India',
        accountNumberMasked: '••••••••8821',
        ifscCode: 'SBIN0000202',
        isAadhaarSeeded: true
      }
    },
    documents: [],
    deficiencies: [],
    timeline: [],
    ruleChecks: []
  }
];

class MockStorageEngine {
  private getStorage(): ApplicationDetail[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY_APPLICATIONS);
      if (!data) {
        this.saveStorage(INITIAL_APPLICATIONS);
        return INITIAL_APPLICATIONS;
      }
      return JSON.parse(data);
    } catch {
      return INITIAL_APPLICATIONS;
    }
  }

  private saveStorage(apps: ApplicationDetail[]): void {
    try {
      localStorage.setItem(STORAGE_KEY_APPLICATIONS, JSON.stringify(apps));
      window.dispatchEvent(new Event('tribalone_storage_updated'));
    } catch (e) {
      console.error('Failed to save to localStorage:', e);
    }
  }

  public getAll(): ApplicationDetail[] {
    return this.getStorage();
  }

  public getById(id: string): ApplicationDetail | null {
    const list = this.getStorage();
    return list.find((a) => a.id.toLowerCase() === id.toLowerCase()) || null;
  }

  public save(app: ApplicationDetail): void {
    const list = this.getStorage();
    const idx = list.findIndex((a) => a.id.toLowerCase() === app.id.toLowerCase());
    if (idx >= 0) {
      list[idx] = app;
    } else {
      list.unshift(app);
    }
    this.saveStorage(list);
  }

  public reset(): void {
    this.saveStorage(INITIAL_APPLICATIONS);
  }
}

export const mockStorage = new MockStorageEngine();
