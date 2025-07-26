// Type for React Native WebView
declare global {
  interface Window {
    ReactNativeWebView?: {
      postMessage: (message: string) => void;
    };
  }
}

/**
 * Utility function to handle navigation for both mobile app and web
 * @param url - The URL to navigate to
 * @param isMobileApp - Whether the user is using the mobile app
 */
export const handleNavigation = (url: string, isMobileApp: boolean) => {
  // console.log(`Navigating to: ${url}, Mobile App: ${isMobileApp}`);
  if (isMobileApp && typeof window !== 'undefined' && window.ReactNativeWebView) {
    window.ReactNativeWebView.postMessage(JSON.stringify({
      type: 'NAVIGATE',
      url: url,
    }));
  }
  // For web, the Link component or router will handle navigation
};
