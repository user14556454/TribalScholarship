export interface AcademicRecord {
  degreeName: string;
  fieldOfStudy: string;
  institutionName: string;
  completionYear: number;
  percentageMarks: number;
  gradeOrCgpa?: string;
}

export interface AdmissionDetails {
  institutionName: string;
  courseName: string; // e.g. "Ph.D. in Anthropology"
  courseType: 'FULL_TIME' | 'PART_TIME';
  admissionYear: number;
  registrationNumber?: string;
  guideName?: string;
  qsWorldRanking?: number; // relevant for NOS
}

export interface BankDetails {
  accountHolderName: string;
  bankName: string;
  accountNumberMasked: string; // e.g. "••••••••4819"
  ifscCode: string;
  isAadhaarSeeded: boolean;
}

export interface ApplicantProfile {
  id: string;
  fullName: string;
  dateOfBirth: string;
  gender: 'MALE' | 'FEMALE' | 'OTHER';
  category: 'ST';
  tribalCommunity: string; // e.g. "Santhal", "Munda", "Gond", "Birhor"
  isPvtg: boolean;
  pvtgName?: string;
  isPwd: boolean;
  disabilityPercentage?: number;
  annualFamilyIncome: number; // e.g. 240000
  mobileNumber: string;
  email: string;
  permanentState: string;
  permanentDistrict: string;
  permanentAddress: string;
  academicHistory: AcademicRecord[];
  currentAdmission: AdmissionDetails;
  bankDetails: BankDetails;
}
