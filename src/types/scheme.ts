export type SchemeCategory = 'FELLOWSHIP' | 'OVERSEAS' | 'HIGHER_EDUCATION';

export interface EligibilityRule {
  id: string;
  field: string;
  operator: 'gte' | 'lte' | 'in' | 'eq';
  value: string | number | string[];
  description: string;
}

export interface SchemeDocumentRequirement {
  type: string;
  title: string;
  required: boolean;
  validationRule?: string;
  guideline?: string;
}

export interface SchemeQuotaRules {
  totalSlots: number;
  pvtgReservedSlots?: number;
  pwdReservedPercent?: number;
  femaleEarmarkSlots?: number;
  streamQuotas?: Record<string, number>;
}

export interface SchemeDefinition {
  id: string; // e.g. "NFST", "NOS", "TCE"
  code: string;
  title: string;
  shortDescription: string;
  category: SchemeCategory;
  academicYear: string;
  policyVersion: string;
  status: 'OPEN' | 'CLOSED' | 'UPCOMING';
  applicationDeadline: string;
  stipendOrAwardText: string;
  eligibleCourses: string[];
  eligibilityRules: EligibilityRule[];
  documentsRequired: SchemeDocumentRequirement[];
  quotas: SchemeQuotaRules;
}
