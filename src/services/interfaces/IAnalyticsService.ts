import { MinistryAnalyticsOverview } from '../../types/analytics';

export interface IAnalyticsService {
  getMinistryOverview(): Promise<MinistryAnalyticsOverview>;
}
