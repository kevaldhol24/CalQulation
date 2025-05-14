"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

/**
 * Navigation progress indicator component
 * Wrapped in Suspense in the layout.tsx file to handle the searchParams CSR bailout
 */
export function NavigationProgress() {
  const [isNavigating, setIsNavigating] = useState(false);
  const [progress, setProgress] = useState(0);
  const pathname = usePathname();
  // This hook needs to be wrapped in a Suspense boundary (done in layout.tsx)
  const searchParams = useSearchParams();

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let intervalId: NodeJS.Timeout;

    const startProgress = () => {
      setIsNavigating(true);
      setProgress(0);

      // Simulate progress
      intervalId = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress >= 90) {
            clearInterval(intervalId);
            return 90;
          }
          return prevProgress + 10;
        });
      }, 200);
    };

    const completeProgress = () => {
      clearInterval(intervalId);
      setProgress(100);

      // Keep 100% state briefly before hiding
      timeoutId = setTimeout(() => {
        setIsNavigating(false);
        setProgress(0);
      }, 200);
    };

    // Setup event listeners for Next.js App Router navigation
    const handleRouteChangeStart = () => startProgress();

    // Add listeners for navigation events
    window.addEventListener("beforeunload", handleRouteChangeStart);

    // Create custom event listener for Next.js App Router
    const handleClick = (e: MouseEvent) => {
      // Check if the click was on an anchor tag or inside one
      const anchor = (e.target as Element).closest("a");
      if (
        anchor &&
        anchor.href &&
        anchor.href.startsWith(window.location.origin)
      ) {
        // Check if the link is to the current page
        const url = new URL(anchor.href);
        const currentUrl = new URL(window.location.href);
        
        // Compare pathname and search params to determine if it's the same page
        if (url.pathname === currentUrl.pathname && url.search === currentUrl.search) {
          // If it's the same page, don't start the progress
          return;
        }

        // Internal navigation to a different page
        startProgress();
      }
    };

    document.addEventListener("click", handleClick);

    // Reset progress when route changes
    if (pathname) {
      completeProgress();
    }

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
      window.removeEventListener("beforeunload", handleRouteChangeStart);
      document.removeEventListener("click", handleClick);
    };
  }, [pathname, searchParams]);

  if (!isNavigating) {
    return null;
  }

  return (
    <div className="fixed top-[64px] left-0 right-0 h-1 z-50 bg-gray-200 dark:bg-gray-800">
      <div
        className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
