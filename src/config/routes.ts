export const ROUTES = {
  PUBLIC: {
    LANDING: '/',
    LOGIN: '/login',
  },
  APPLICANT: {
    ROOT: '/applicant',
    DASHBOARD: '/applicant/dashboard',
    SCHEMES: '/applicant/schemes',
    APPLY: '/applicant/apply/:schemeId',
    TRACKING: '/applicant/tracking/:id',
    DEFICIENCY: '/applicant/deficiencies/:id',
  },
  ADMIN: {
    ROOT: '/admin',
    DASHBOARD: '/admin/dashboard',
    APPLICATIONS: '/admin/applications',
    SCRUTINY: '/admin/applications/:id',
    ANALYTICS: '/admin/analytics',
  },
} as const;
