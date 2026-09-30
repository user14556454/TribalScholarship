import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { ApplicationDetail, ApplicationSummary } from '../types/application';
import { applicationService } from '../services';

interface ApplicationDataContextType {
  applications: ApplicationSummary[];
  loading: boolean;
  refreshApplications: () => Promise<void>;
  getApplicationDetail: (id: string) => Promise<ApplicationDetail | null>;
  resetToFixtures: () => Promise<void>;
}

const ApplicationDataContext = createContext<ApplicationDataContextType | undefined>(undefined);

export const ApplicationDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [applications, setApplications] = useState<ApplicationSummary[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const refreshApplications = useCallback(async () => {
    try {
      setLoading(true);
      const list = await applicationService.getApplications();
      setApplications(list);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshApplications();
    const handleStorageUpdated = () => {
      refreshApplications();
    };
    window.addEventListener('tribalone_storage_updated', handleStorageUpdated);
    return () => window.removeEventListener('tribalone_storage_updated', handleStorageUpdated);
  }, [refreshApplications]);

  const getApplicationDetail = useCallback(async (id: string) => {
    return applicationService.getApplicationById(id);
  }, []);

  const resetToFixtures = useCallback(async () => {
    await applicationService.resetToFixtures();
    await refreshApplications();
  }, [refreshApplications]);

  return (
    <ApplicationDataContext.Provider
      value={{
        applications,
        loading,
        refreshApplications,
        getApplicationDetail,
        resetToFixtures
      }}
    >
      {children}
    </ApplicationDataContext.Provider>
  );
};

export const useApplicationData = (): ApplicationDataContextType => {
  const context = useContext(ApplicationDataContext);
  if (!context) {
    throw new Error('useApplicationData must be used within an ApplicationDataProvider');
  }
  return context;
};
