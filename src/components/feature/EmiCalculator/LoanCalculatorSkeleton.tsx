"use client";

import { Skeleton } from "@/components/ui/skeleton";

export const LoanCalculatorSkeleton = () => {
  return (
    <div className="bg-white/10 sm:rounded-xl backdrop-blur-xl sm:p-1.5">
      <div>
        <div className="bg-background sm:rounded-t-lg p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h2 className="text-lg font-bold col-span-2 flex items-center">
              <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full mr-3 shadow-sm"></div>
              Loan details
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2 mt-6">
              {/* Input fields skeletons */}
              {Array(4)
                .fill(0)
                .map((_, index) => (
                  <div key={index} className="space-y-2">
                    <Skeleton className="h-4 w-[100px]" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                ))}
            </div>
          </div>
          <div>
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold mb-1 lg:mb-6 flex items-center">
                <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full mr-3 shadow-sm"></div>
                Loan Summary
              </h2>
              {/* No share button during loading */}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 lg:gap-4 mt-2">
              {Array(6)
                .fill(0)
                .map((_, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-end bg-card border rounded-lg p-4 space-y-2"
                  >
                    <Skeleton className="h-2 w-[80px]" />
                    <Skeleton className="h-4 w-[120px]" />
                    <Skeleton className="h-2 w-[100px]" />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="bg-background p-6">
          {/* Advanced Options Skeleton */}
          <Skeleton className="h-6 w-[200px] mb-4" />
          <div className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      </div>

      <div className="bg-background p-6 sm:rounded-b-lg">
        {/* Charts Skeleton */}
        <div className="mt-6">
          <Skeleton className="h-[300px] w-full" />
        </div>

        {/* Schedule Skeleton */}
        <div className="mt-6">
          <Skeleton className="h-6 w-[150px] mb-4" />
          <div className="space-y-2">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      </div>
    </div>
  );
};
