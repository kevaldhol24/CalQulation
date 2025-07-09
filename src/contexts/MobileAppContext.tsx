'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { isMobileAppClient } from '@/lib/mobile-app-detection';

interface MobileAppContextType {
  isMobileApp: boolean;
  isLoading: boolean;
}

const MobileAppContext = createContext<MobileAppContextType>({
  isMobileApp: false,
  isLoading: true,
});

export function MobileAppProvider({ 
  children, 
  initialIsMobileApp = false 
}: { 
  children: React.ReactNode;
  initialIsMobileApp?: boolean;
}) {
  const [isMobileApp, setIsMobileApp] = useState(initialIsMobileApp);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Client-side detection
    const detected = isMobileAppClient();
    setIsMobileApp(detected);
    setIsLoading(false);
  }, []);

  return (
    <MobileAppContext.Provider value={{ isMobileApp, isLoading }}>
      {children}
    </MobileAppContext.Provider>
  );
}

export function useMobileApp() {
  const context = useContext(MobileAppContext);
  if (context === undefined) {
    throw new Error('useMobileApp must be used within a MobileAppProvider');
  }
  return context;
}
