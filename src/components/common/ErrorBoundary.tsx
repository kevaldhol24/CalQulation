"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

interface ErrorBoundaryProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorBoundary({
  error,
  reset,
}: ErrorBoundaryProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center p-4 text-center">
      <div className="rounded-xl bg-white/10 backdrop-blur-xl p-1.5 max-w-md w-full">
        <div className="bg-background rounded-lg p-6 shadow-lg">
          <div className="flex flex-col items-center space-y-4">
            <div className="rounded-full bg-red-100 p-3 dark:bg-red-900/20">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-red-600 dark:text-red-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium">Oops! Something went wrong</h3>
            <p className="text-muted-foreground">
              We&apos;re sorry, but we encountered an unexpected error while processing your request.
            </p>
            
            <div className="mt-6 flex gap-3">
              <Button
                variant="secondary"
                onClick={() => window.location.href = "/"}
              >
                Go Home
              </Button>
              <Button 
                onClick={reset} 
                variant="default"
              >
                Try Again
              </Button>
            </div>
            
            <p className="text-xs text-muted-foreground mt-4">
              If the problem persists, please refresh the page or try again later.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
