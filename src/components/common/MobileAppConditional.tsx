'use client';

import { useMobileApp } from '@/contexts/MobileAppContext';

interface MobileAppConditionalProps {
  children: React.ReactNode;
  /** If true, renders children only when in mobile app. If false, renders children only when NOT in mobile app */
  showInMobileApp: boolean;
  /** Fallback content to show when condition is not met */
  fallback?: React.ReactNode;
}

/**
 * Component that conditionally renders children based on whether the app is running in mobile app mode
 */
export function MobileAppConditional({ 
  children, 
  showInMobileApp, 
  fallback = null 
}: MobileAppConditionalProps) {
  const { isMobileApp, isLoading } = useMobileApp();

  // During loading, don't render anything to avoid flash
  if (isLoading) {
    return null;
  }

  const shouldShow = showInMobileApp ? isMobileApp : !isMobileApp;
  
  return shouldShow ? <>{children}</> : <>{fallback}</>;
}

/**
 * Component that renders children only when NOT in mobile app
 */
export function WebOnlyContent({ children, fallback }: { children: React.ReactNode; fallback?: React.ReactNode }) {
  return (
    <MobileAppConditional showInMobileApp={false} fallback={fallback}>
      {children}
    </MobileAppConditional>
  );
}

/**
 * Component that renders children only when IN mobile app
 */
export function MobileAppOnlyContent({ children, fallback }: { children: React.ReactNode; fallback?: React.ReactNode }) {
  return (
    <MobileAppConditional showInMobileApp={true} fallback={fallback}>
      {children}
    </MobileAppConditional>
  );
}
