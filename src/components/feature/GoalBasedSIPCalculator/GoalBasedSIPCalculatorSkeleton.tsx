"use client";

import { FC } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const GoalBasedSIPCalculatorSkeleton: FC = () => {
  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Main Calculator Skeleton */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
        {/* Header Skeleton */}
        <div className="flex items-center mb-6">
          <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full mr-4 shadow-sm animate-pulse"></div>
          <Skeleton className="h-8 w-64" />
        </div>

        <Skeleton className="h-4 w-full mb-6" />

        {/* Input Controls Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-12 w-full" />
            </div>
          ))}
        </div>
      </div>

      {/* Summary Skeleton */}
      <div className="space-y-4">
        <div className="flex items-center">
          <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full mr-3 shadow-sm animate-pulse"></div>
          <Skeleton className="h-6 w-48" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md border border-gray-200 dark:border-gray-700"
            >
              <div className="animate-pulse">
                <Skeleton className="h-4 w-24 mb-3" />
                <Skeleton className="h-8 w-32 mb-2" />
                <Skeleton className="h-3 w-20" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Charts Skeleton */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full mr-3 shadow-sm animate-pulse"></div>
            <Skeleton className="h-6 w-48" />
          </div>
          <Skeleton className="h-8 w-24" />
        </div>
        <Skeleton className="h-64 w-full" />
      </div>

      {/* Yearly Breakdown Skeleton */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full mr-3 shadow-sm animate-pulse"></div>
            <Skeleton className="h-6 w-48" />
          </div>
          <Skeleton className="h-8 w-24" />
        </div>
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} className="h-12 w-full" />
          ))}
        </div>
      </div>
    </div>
  );
};
