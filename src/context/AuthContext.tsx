import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, UserRole } from '../types/user';
import { authService } from '../services';
import { PERSONAS } from '../config/personas';

interface AuthContextType {
  user: UserProfile | null;
  role: UserRole;
  isAuthenticated: boolean;
  switchPersona: (personaKey: string) => Promise<void>;
  logout: () => Promise<void>;
  allPersonas: typeof PERSONAS;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);

  const loadSession = async () => {
    try {
      const session = await authService.getCurrentSession();
      setUser(session.user);
    } catch {
      setUser(PERSONAS.APPLICANT_RAJESH);
    }
  };

  useEffect(() => {
    loadSession();
    const handleAuthUpdated = () => loadSession();
    window.addEventListener('tribalone_auth_updated', handleAuthUpdated);
    return () => window.removeEventListener('tribalone_auth_updated', handleAuthUpdated);
  }, []);

  const switchPersona = async (personaKey: string) => {
    const session = await authService.loginWithPersona(personaKey);
    setUser(session.user);
  };

  const logout = async () => {
    await authService.logout();
    await loadSession();
  };

  const role: UserRole = user?.role || 'APPLICANT';

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        isAuthenticated: !!user,
        switchPersona,
        logout,
        allPersonas: PERSONAS
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
