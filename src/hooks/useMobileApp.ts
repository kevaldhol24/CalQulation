import { useMobileApp } from '@/contexts/MobileAppContext';

/**
 * A simple hook that returns whether the app is currently running in mobile app mode
 * @returns boolean indicating if running in mobile app
 */
export function useIsMobileApp(): boolean {
  const { isMobileApp } = useMobileApp();
  return isMobileApp;
}

/**
 * Hook that returns both mobile app status and loading state
 * @returns object with isMobileApp and isLoading properties
 */
export function useMobileAppStatus() {
  return useMobileApp();
}
