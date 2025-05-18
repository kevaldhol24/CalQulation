"use client";

import { Skeleton } from "@/components/ui/skeleton";

export const LoanCalculatorSkeleton = () => {
  return (
    <div>
      <div className="rounded-xl bg-white/10 backdrop-blur-xl p-1.5">
        <div className="bg-background rounded-lg p-6 shadow-lg">
          <h2 className="text-lg font-bold col-span-2">Loan details</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-2">
            {/* Input fields skeletons */}
            {Array(4).fill(0).map((_, index) => (
              <div key={index} className="space-y-2">
                <Skeleton className="h-4 w-[100px]" />
                <Skeleton className="h-10 w-full" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-xl bg-white/10 backdrop-blur-xl p-1.5 mt-6">
        <div className="bg-background rounded-lg p-6 shadow-lg">
          {/* Advanced Options Skeleton */}
          <Skeleton className="h-6 w-[200px] mb-4" />
          <div className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
      </div>

      <div className="rounded-xl bg-white/10 backdrop-blur-xl p-1.5 mt-6">
        <div className="bg-background rounded-lg p-6 shadow-lg">
          {/* Loan Summary Skeleton */}
          <Skeleton className="h-6 w-[150px] mb-4" />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mt-2">
            {Array(6).fill(0).map((_, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-2">
                <Skeleton className="h-5 w-[80px]" />
                <Skeleton className="h-8 w-[120px]" />
                <Skeleton className="h-4 w-[100px]" />
              </div>
            ))}
          </div>
          
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
    </div>
  );
};
