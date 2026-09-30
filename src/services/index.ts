import { mockAuthService } from './mock/mockAuthService';
import { mockSchemeService } from './mock/mockSchemeService';
import { mockApplicationService } from './mock/mockApplicationService';
import { mockAnalyticsService } from './mock/mockAnalyticsService';

// Service boundary export.
// When connecting to FastAPI backend in the future,
// simply swap mock implementations with HttpApiClient implementations here.
export const authService = mockAuthService;
export const schemeService = mockSchemeService;
export const applicationService = mockApplicationService;
export const analyticsService = mockAnalyticsService;

export * from './interfaces/IAuthService';
export * from './interfaces/ISchemeService';
export * from './interfaces/IApplicationService';
export * from './interfaces/IAnalyticsService';
