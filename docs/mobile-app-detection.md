# Mobile App Detection and Layout Adaptation

This implementation automatically detects when your website is being accessed from your React Native mobile app and hides the header and footer accordingly.

## How it works

### 1. Header Detection
The middleware detects your mobile app using these headers sent by your React Native WebView:
- `X-App-Source: CalqulationMobileApp`
- `X-App-Platform: React-Native`  
- `User-Agent: CalqulationMobileApp/1.0.0 (React Native WebView)`

### 2. Server-Side Detection
- Middleware sets a cookie `is-mobile-app=true` when mobile app headers are detected
- Layout reads this cookie on the server-side for initial render

### 3. Client-Side Verification
- Client-side detection also checks for `window.ReactNativeWebView` (injected by React Native WebView)
- This ensures detection works even if cookies are cleared

### 4. Conditional Rendering
- When mobile app is detected, header and footer are hidden
- Regular web browsers show the full layout with header and footer

## Files Created/Modified

### New Files:
- `src/lib/mobile-app-detection.ts` - Utility functions for detection
- `src/contexts/MobileAppContext.tsx` - React context for mobile app state
- `src/components/layout/ConditionalLayout.tsx` - Layout component that shows/hides header/footer
- `src/components/common/MobileAppConditional.tsx` - Utility components for conditional rendering
- `src/hooks/useMobileApp.ts` - Custom hooks for easy mobile app detection

### Modified Files:
- `src/app/layout.tsx` - Updated to use conditional layout
- `src/middleware.ts` - Added mobile app detection and cookie setting
- `src/app/globals.css` - Added mobile app specific styles

## Usage Examples

### Basic Hook Usage
```tsx
import { useIsMobileApp } from '@/hooks/useMobileApp';

function MyComponent() {
  const isMobileApp = useIsMobileApp();
  
  return (
    <div>
      {isMobileApp ? 'Mobile App View' : 'Web View'}
    </div>
  );
}
```

### Conditional Components
```tsx
import { WebOnlyContent, MobileAppOnlyContent } from '@/components/common/MobileAppConditional';

function MyComponent() {
  return (
    <div>
      <WebOnlyContent>
        <p>This only shows in web browsers</p>
      </WebOnlyContent>
      
      <MobileAppOnlyContent>
        <p>This only shows in the mobile app</p>
      </MobileAppOnlyContent>
    </div>
  );
}
```

## CSS Classes

When mobile app is detected, the `mobile-app-view` class is added to the body element. You can use this for additional styling:

```css
.mobile-app-view {
  /* Styles that only apply in mobile app */
}

.mobile-app-view main {
  /* Mobile app specific main content styles */
  padding-top: 1rem;
}
```

## Testing

To test the mobile app detection:

1. **In your React Native app**: The headers should automatically be sent and detection should work
2. **For web testing**: You can manually set a cookie `is-mobile-app=true` in browser dev tools
3. **For development**: Modify the detection logic temporarily to always return true

## Notes

- Detection happens on both server and client side for optimal performance
- Fallback behavior shows full layout (with header/footer) during loading
- The implementation is backward compatible - existing functionality remains unchanged
- Mobile app detection is based on specific headers your app sends, making it reliable
