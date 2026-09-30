export interface KPICardData {
  title: string;
  value: string | number;
  changeText?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  subtext?: string;
  badgeText?: string;
}

export interface SchemeDistribution {
  name: string;
  shortName: string;
  totalApplications: number;
  approved: number;
  inReview: number;
  deficiencies: number;
  fillRatePercent: number;
}

export interface DemographicMetric {
  category: string;
  count: number;
  percentage: number;
}

export interface ProcessingVelocityMetric {
  stage: string;
  averageDays: number;
  targetSlaDays: number;
  status: 'OPTIMAL' | 'NEAR_SLA' | 'BREACHED';
}

export interface MinistryAnalyticsOverview {
  totalApplications: number;
  verifiedEligible: number;
  activeDeficiencies: number;
  disbursementsProcessedCr: number;
  averageTurnaroundDays: number;
  schemeDistributions: SchemeDistribution[];
  pvtgDemographics: DemographicMetric[];
  genderEquity: DemographicMetric[];
  processingVelocity: ProcessingVelocityMetric[];
}
