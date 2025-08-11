"use client";

import { useEffect, useState } from 'react';
import { isWebViewEnvironment, supportsBackdropFilter } from '@/lib/mobile-app-detection';

interface WebViewOptimizations {
  isWebView: boolean;
  hasBackdropFilter: boolean;
  shouldUseSimpleEffects: boolean;
  recommendedBorderRadius: number;
  recommendedOverlayOpacity: string;
}

export function useWebViewOptimization(): WebViewOptimizations {
  const [optimizations, setOptimizations] = useState<WebViewOptimizations>({
    isWebView: false,
    hasBackdropFilter: false,
    shouldUseSimpleEffects: false,
    recommendedBorderRadius: 12,
    recommendedOverlayOpacity: 'rgba(15,23,42,0.55)',
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const isWebView = isWebViewEnvironment();
    const hasBackdropFilter = supportsBackdropFilter();
    const shouldUseSimpleEffects = isWebView || !hasBackdropFilter;

    setOptimizations({
      isWebView,
      hasBackdropFilter,
      shouldUseSimpleEffects,
      recommendedBorderRadius: isWebView ? 8 : 12,
      recommendedOverlayOpacity: isWebView ? 'rgba(0,0,0,0.85)' : 'rgba(15,23,42,0.55)',
    });
  }, []);

  return optimizations;
}

// CSS utility for generating WebView-optimized styles
export function getWebViewOptimizedStyles(isWebView: boolean, hasBackdropFilter: boolean) {
  return {
    spotlight: {
      light: isWebView || !hasBackdropFilter 
        ? {
            outline: '4px solid rgba(99,102,241,1)',
            boxShadow: '0 0 0 8px rgba(99,102,241,0.3), 0 0 25px rgba(99,102,241,0.6)',
            backgroundColor: 'transparent',
            borderRadius: '8px',
            transform: 'scale(1.01)',
          }
        : {
            outline: '2px solid rgba(99,102,241,0.85)',
            boxShadow: '0 0 0 4px rgba(99,102,241,0.35), 0 4px 18px -2px rgba(0,0,0,0.45)',
            backgroundColor: 'rgba(255,255,255,0.35)',
            backdropFilter: 'blur(2px) brightness(1.05)',
          },
      dark: isWebView || !hasBackdropFilter
        ? {
            outline: '4px solid rgba(129,140,248,1)',
            boxShadow: '0 0 0 8px rgba(129,140,248,0.4), 0 0 25px rgba(129,140,248,0.7)',
            backgroundColor: 'transparent',
            borderRadius: '8px',
            transform: 'scale(1.01)',
          }
        : {
            outline: '2px solid rgba(129,140,248,0.95)',
            boxShadow: '0 0 0 4px rgba(129,140,248,0.55), 0 0 0 8px rgba(255,255,255,0.06), 0 4px 22px -2px rgba(0,0,0,0.75)',
            backgroundColor: 'rgba(30,41,59,0.55)',
            backdropFilter: 'blur(3px) brightness(1.2) saturate(1.1)',
          },
    },
  };
}
