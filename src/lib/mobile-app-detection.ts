// Utility to detect if the request is from the mobile app
export function isMobileApp(headers: Headers): boolean {
    const appSource = headers.get('X-App-Source');
    const appPlatform = headers.get('X-App-Platform');
    const userAgent = headers.get('User-Agent');

    return (
        appSource === 'CalqulationMobileApp' ||
        appPlatform === 'React-Native' ||
        (userAgent?.includes('CalqulationMobileApp') ?? false)
    );
}

// Client-side detection function
export function isMobileAppClient(): boolean {
    if (typeof window === 'undefined') return false;

    // Check for custom properties that might be injected by the mobile app
    return (
        window.ReactNativeWebView !== undefined ||
        navigator.userAgent.includes('CalqulationMobileApp')
    );
}

// Enhanced WebView detection for better rendering optimizations
export function isWebViewEnvironment(): boolean {
    if (typeof window === 'undefined' || typeof navigator === 'undefined') return false;

    const userAgent = navigator.userAgent;
    
    return (
        // React Native WebView
        window.ReactNativeWebView !== undefined ||
        // Custom app identifier
        userAgent.includes('CalqulationMobileApp') ||
        // Android WebView indicators
        userAgent.includes('wv') ||
        (userAgent.includes('Android') && userAgent.includes('Chrome') && !userAgent.includes('Chrome/')) ||
        // iOS WebView indicators
        (userAgent.includes('iPhone') && !userAgent.includes('Safari')) ||
        (userAgent.includes('iPad') && !userAgent.includes('Safari')) ||
        // General WebView indicators
        userAgent.includes('WebView') ||
        // iOS standalone mode
        'standalone' in window.navigator && (window.navigator as { standalone?: boolean }).standalone === true
    );
}

// Check if backdrop-filter is supported
export function supportsBackdropFilter(): boolean {
    if (typeof window === 'undefined') return false;
    
    const testElement = document.createElement('div');
    testElement.style.backdropFilter = 'blur(1px)';
    
    return testElement.style.backdropFilter !== '';
}
