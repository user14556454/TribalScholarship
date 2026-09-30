export type UserRole = 'APPLICANT' | 'ADMIN' | 'SCRUTINEER' | 'INSTITUTE';

export interface UserProfile {
  id: string;
  fullName: string;
  role: UserRole;
  email: string;
  mobile: string;
  avatarUrl?: string;
  department?: string;
  designation?: string;
  instituteName?: string;
}

export interface UserSession {
  user: UserProfile;
  token?: string;
  isAuthenticated: boolean;
}
