import { IAnalyticsService } from '../interfaces/IAnalyticsService';
import { MinistryAnalyticsOverview } from '../../types/analytics';

export class MockAnalyticsService implements IAnalyticsService {
  public async getMinistryOverview(): Promise<MinistryAnalyticsOverview> {
    await new Promise((r) => setTimeout(r, 150));
    return {
      totalApplications: 14820,
      verifiedEligible: 11450,
      activeDeficiencies: 1890,
      disbursementsProcessedCr: 84.5,
      averageTurnaroundDays: 14.2,
      schemeDistributions: [
        {
          name: 'National Fellowship for ST Students (NFST)',
          shortName: 'NFST',
          totalApplications: 8420,
          approved: 750,
          inReview: 6200,
          deficiencies: 1470,
          fillRatePercent: 100
        },
        {
          name: 'National Overseas Scholarship (NOS)',
          shortName: 'NOS',
          totalApplications: 1240,
          approved: 20,
          inReview: 1080,
          deficiencies: 140,
          fillRatePercent: 100
        },
        {
          name: 'Top Class Education (TCE)',
          shortName: 'TCE',
          totalApplications: 5160,
          approved: 980,
          inReview: 3900,
          deficiencies: 280,
          fillRatePercent: 98
        }
      ],
      pvtgDemographics: [
        { category: 'Santhal / Birhor (Jharkhand)', count: 2420, percentage: 35.8 },
        { category: 'Gond / Baiga (MP / Chhattisgarh)', count: 1890, percentage: 28.0 },
        { category: 'Bodo / Mishing (Assam)', count: 980, percentage: 14.5 },
        { category: 'Chenchu / Yanadi (AP / Telangana)', count: 640, percentage: 9.5 },
        { category: 'Other Scheduled Tribes', count: 820, percentage: 12.2 }
      ],
      genderEquity: [
        { category: 'Male Scholars', count: 7706, percentage: 52 },
        { category: 'Female Scholars', count: 7114, percentage: 48 }
      ],
      processingVelocity: [
        { stage: 'Submission to OCR/AI Scrutiny', averageDays: 1.5, targetSlaDays: 2, status: 'OPTIMAL' },
        { stage: 'Ministry Scrutiny Review', averageDays: 4.8, targetSlaDays: 5, status: 'OPTIMAL' },
        { stage: 'Deficiency Resolution Turnaround', averageDays: 8.2, targetSlaDays: 14, status: 'OPTIMAL' },
        { stage: 'Merit List Allocation', averageDays: 3.1, targetSlaDays: 3, status: 'OPTIMAL' }
      ]
    };
  }
}

export const mockAnalyticsService = new MockAnalyticsService();
