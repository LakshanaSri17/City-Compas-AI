import { createContext, useContext, useState, ReactNode } from 'react';
import { TripBasicInfo, TripPreferences, TripPlan } from '../types';

interface TripContextType {
  basicInfo: TripBasicInfo | null;
  preferences: TripPreferences | null;
  currentPlan: TripPlan | null;
  setBasicInfo: (info: TripBasicInfo) => void;
  setPreferences: (prefs: TripPreferences) => void;
  setCurrentPlan: (plan: TripPlan) => void;
  resetTrip: () => void;
}

const TripContext = createContext<TripContextType | undefined>(undefined);

export function TripProvider({ children }: { children: ReactNode }) {
  const [basicInfo, setBasicInfo] = useState<TripBasicInfo | null>(null);
  const [preferences, setPreferences] = useState<TripPreferences | null>(null);
  const [currentPlan, setCurrentPlan] = useState<TripPlan | null>(null);

  const resetTrip = () => {
    setBasicInfo(null);
    setPreferences(null);
    setCurrentPlan(null);
  };

  return (
    <TripContext.Provider
      value={{
        basicInfo,
        preferences,
        currentPlan,
        setBasicInfo,
        setPreferences,
        setCurrentPlan,
        resetTrip,
      }}
    >
      {children}
    </TripContext.Provider>
  );
}

export function useTrip() {
  const context = useContext(TripContext);
  if (context === undefined) {
    throw new Error('useTrip must be used within a TripProvider');
  }
  return context;
}
