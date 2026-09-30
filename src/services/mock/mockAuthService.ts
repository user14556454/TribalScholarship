import { IAuthService } from '../interfaces/IAuthService';
import { UserProfile, UserSession } from '../../types/user';
import { PERSONAS } from '../../config/personas';

const STORAGE_KEY_AUTH = 'tribalone_auth_session';

export class MockAuthService implements IAuthService {
  public async getCurrentSession(): Promise<UserSession> {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_AUTH);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {}

    // Default to Applicant Rajesh Kumar Soren
    const defaultSession: UserSession = {
      user: PERSONAS.APPLICANT_RAJESH,
      isAuthenticated: true
    };
    this.saveSession(defaultSession);
    return defaultSession;
  }

  public async loginWithPersona(personaKey: string): Promise<UserSession> {
    const user = PERSONAS[personaKey] || PERSONAS.APPLICANT_RAJESH;
    const session: UserSession = {
      user,
      isAuthenticated: true,
      token: `mock_jwt_token_${user.id}_${Date.now()}`
    };
    this.saveSession(session);
    return session;
  }

  public async sendOtp(identifier: string): Promise<{ success: boolean; sessionRef: string }> {
    // Simulate network delay
    await new Promise((r) => setTimeout(r, 200));
    return {
      success: true,
      sessionRef: `otp_ref_${Math.random().toString(36).substring(7)}`
    };
  }

  public async verifyOtp(sessionRef: string, otp: string): Promise<UserSession> {
    await new Promise((r) => setTimeout(r, 300));
    const session: UserSession = {
      user: PERSONAS.APPLICANT_RAJESH,
      isAuthenticated: true,
      token: `mock_jwt_token_${sessionRef}`
    };
    this.saveSession(session);
    return session;
  }

  public async logout(): Promise<void> {
    localStorage.removeItem(STORAGE_KEY_AUTH);
    window.dispatchEvent(new Event('tribalone_auth_updated'));
  }

  public getAllPersonas(): UserProfile[] {
    return Object.values(PERSONAS);
  }

  private saveSession(session: UserSession): void {
    localStorage.setItem(STORAGE_KEY_AUTH, JSON.stringify(session));
    window.dispatchEvent(new Event('tribalone_auth_updated'));
  }
}

export const mockAuthService = new MockAuthService();
