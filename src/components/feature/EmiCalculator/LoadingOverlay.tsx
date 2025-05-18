"use client";

import { useLoan } from "@/contexts/LoanContext";

export const LoadingOverlay = () => {
  const { isLoading, isSharedLoading } = useLoan();

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-background/40 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-card p-6 rounded-lg shadow-lg max-w-md w-full">
        <div className="space-y-4 text-center">
          <div className="flex flex-col items-center">
            <div className="h-10 w-10 rounded-full border-4 border-primary border-t-transparent animate-spin mb-4"></div>
            <h3 className="text-lg font-medium">
              {isSharedLoading ? "Loading Shared Calculation" : "Calculating Loan Details"}
            </h3>
            <p className="text-sm text-muted-foreground mt-2">
              {isSharedLoading 
                ? "Please wait while we retrieve the shared calculation" 
                : "Please wait while we process your calculation"}
            </p>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Processing</span>
              <span className="text-primary">Please wait...</span>
            </div>
            <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full w-2/3 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
