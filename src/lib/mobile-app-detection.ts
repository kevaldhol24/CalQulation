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
