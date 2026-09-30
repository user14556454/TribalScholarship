import { SchemeDefinition } from '../types/scheme';

export const SCHEMES: SchemeDefinition[] = [
  {
    id: 'nfst',
    code: 'NFST-2026',
    title: 'National Fellowship for Scheduled Tribe Students (NFST)',
    shortDescription: 'Financial assistance for ST scholars pursuing full-time M.Phil. and Ph.D. degrees in Indian universities and research institutes.',
    category: 'FELLOWSHIP',
    academicYear: '2026-27',
    policyVersion: '2026-27.v1',
    status: 'OPEN',
    applicationDeadline: '31 October 2026',
    stipendOrAwardText: '₹37,000/mo (JRF) + HRA & Contingency grants for 5 years',
    eligibleCourses: ['Ph.D. in Humanities / Social Sciences', 'Ph.D. in Sciences & Engineering', 'Ph.D. in Tribal Studies & Linguistics'],
    eligibilityRules: [
      {
        id: 'category_st',
        field: 'applicant.category',
        operator: 'in',
        value: ['ST'],
        description: 'Candidate must belong to a notified Scheduled Tribe (ST) community.'
      },
      {
        id: 'masters_percentage',
        field: 'academic.masters_percentage',
        operator: 'gte',
        value: 55,
        description: 'Minimum 55% marks in Master’s Degree or equivalent grade.'
      },
      {
        id: 'admission_regular',
        field: 'admission.course_type',
        operator: 'eq',
        value: 'FULL_TIME',
        description: 'Candidate must be admitted to regular full-time Ph.D./M.Phil. in a recognized university.'
      }
    ],
    documentsRequired: [
      { type: 'caste_certificate', title: 'ST Certificate with Gazette Community Name', required: true, guideline: 'Issued by competent Revenue Authority with legible digital barcode.' },
      { type: 'income_certificate', title: 'Income Certificate (FY 2025-26 / 2026-27)', required: true, guideline: 'Annual family income certificate valid for the current financial year.' },
      { type: 'masters_marksheet', title: 'Post-Graduate Degree Marksheet & Certificate', required: true, guideline: 'Showing minimum 55% aggregate marks.' },
      { type: 'admission_offer', title: 'Ph.D. Admission / Enrolment Letter', required: true, guideline: 'Signed by Dean / Registrar with research guide allocation.' }
    ],
    quotas: {
      totalSlots: 750,
      pvtgReservedSlots: 50,
      pwdReservedPercent: 3,
      femaleEarmarkSlots: 225
    }
  },
  {
    id: 'nos',
    code: 'NOS-2026',
    title: 'National Overseas Scholarship for ST Students (NOS)',
    shortDescription: 'Financial support for ST students to pursue higher studies (Master’s and Ph.D.) abroad in premier QS-ranked universities.',
    category: 'OVERSEAS',
    academicYear: '2026-27',
    policyVersion: '2026-27.v1',
    status: 'OPEN',
    applicationDeadline: '15 November 2026',
    stipendOrAwardText: 'Full tuition + $15,400/yr annual living allowance + return airfare',
    eligibleCourses: ['Master’s Degree (1-2 years)', 'Ph.D. Degree (up to 4 years) in STEM, Management, Medicine & Social Sciences'],
    eligibilityRules: [
      {
        id: 'category_st_pvtg',
        field: 'applicant.category',
        operator: 'in',
        value: ['ST'],
        description: 'Must belong to Scheduled Tribes (with 3 priority awards for PVTG candidates).'
      },
      {
        id: 'income_ceiling',
        field: 'applicant.annual_income',
        operator: 'lte',
        value: 600000,
        description: 'Total family annual income must not exceed ₹6,00,000.'
      },
      {
        id: 'qs_rank',
        field: 'admission.qs_rank',
        operator: 'lte',
        value: 500,
        description: 'Foreign university must be within top 500 in latest QS World Rankings.'
      }
    ],
    documentsRequired: [
      { type: 'caste_certificate', title: 'ST / PVTG Certificate', required: true, guideline: 'Valid state-issued certificate.' },
      { type: 'income_certificate', title: 'Annual Family Income Certificate (Below ₹6L)', required: true, guideline: 'Valid revenue authority certificate.' },
      { type: 'passport', title: 'Valid Indian Passport', required: true, guideline: 'Valid for at least 1 year.' },
      { type: 'unconditional_offer', title: 'Unconditional Admission Offer from QS-Ranked University', required: true, guideline: 'Confirming course and commencement dates.' }
    ],
    quotas: {
      totalSlots: 20,
      pvtgReservedSlots: 3,
      femaleEarmarkSlots: 6,
      streamQuotas: {
        'Engineering / Tech / STEM': 10,
        'Management / Economics / Law': 4,
        'Agriculture / Medicine': 4,
        'Humanities / Social Sciences': 2
      }
    }
  },
  {
    id: 'top-class',
    code: 'TCE-2026',
    title: 'Top Class Education for ST Students',
    shortDescription: 'Scholarship scheme encouraging meritorious ST students to pursue degree courses in premier notified institutions like IITs, IIMs, NITs, and AIIMS.',
    category: 'HIGHER_EDUCATION',
    academicYear: '2026-27',
    policyVersion: '2026-27.v1',
    status: 'OPEN',
    applicationDeadline: '30 November 2026',
    stipendOrAwardText: 'Full tuition fee reimbursement + ₹3,000/mo living allowance + ₹45,000 IT grant',
    eligibleCourses: ['B.Tech / B.E.', 'MBBS', 'MBA / PGDM', 'Law (BALLB)', 'Design (B.Des)'],
    eligibilityRules: [
      {
        id: 'notified_institute',
        field: 'admission.is_notified_institute',
        operator: 'eq',
        value: 'TRUE',
        description: 'Must secure admission in an approved Top Class Notified Premier Institution.'
      },
      {
        id: 'income_ceiling_tce',
        field: 'applicant.annual_income',
        operator: 'lte',
        value: 600000,
        description: 'Total family annual income must not exceed ₹6,00,000.'
      }
    ],
    documentsRequired: [
      { type: 'caste_certificate', title: 'ST Certificate', required: true, guideline: 'Authorized revenue certificate.' },
      { type: 'fee_receipt', title: 'Institute Fee Structure & Admission Letter', required: true, guideline: 'Issued by premier institute finance/academic section.' },
      { type: 'income_certificate', title: 'Income Certificate', required: true, guideline: 'Certified by competent authority.' }
    ],
    quotas: {
      totalSlots: 1000
    }
  }
];
