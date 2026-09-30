import { UserProfile, UserSession } from '../../types/user';

export interface IAuthService {
  getCurrentSession(): Promise<UserSession>;
  loginWithPersona(personaKey: string): Promise<UserSession>;
  sendOtp(identifier: string): Promise<{ success: boolean; sessionRef: string }>;
  verifyOtp(sessionRef: string, otp: string): Promise<UserSession>;
  logout(): Promise<void>;
  getAllPersonas(): UserProfile[];
}
