import { Skeleton } from "@/components/ui/skeleton";
import { FC } from "react";

interface LumpsumCalculatorSkeletonProps {
  compact?: boolean;
}

export const LumpsumCalculatorSkeleton: FC<LumpsumCalculatorSkeletonProps> = ({
  compact,
}) => {
  return (
    <div className="sm:rounded-xl bg-white/10 backdrop-blur-xl sm:p-1.5">
      <div className="bg-background sm:rounded-t-lg p-6 shadow-lg">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-2">
          <div>
            <div className="flex items-center justify-between mb-4">
              <Skeleton className="h-6 w-48" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 gap-x-6">
              {/* Investment Amount Skeleton */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-6 w-full" />
              </div>
              
              {/* Annual Return Rate Skeleton */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-6 w-full" />
              </div>
              
              {/* Investment Period Skeleton */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-6 w-full" />
              </div>
            </div>
          </div>
          
          {/* Summary Skeleton */}
          <div className="space-y-4">
            <Skeleton className="h-6 w-32" />
            <div className="grid grid-cols-1 gap-4">
              <div className="p-4 border rounded-lg space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-8 w-32" />
              </div>
              <div className="p-4 border rounded-lg space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-8 w-32" />
              </div>
              <div className="p-4 border rounded-lg space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-8 w-32" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {!compact && (
        <div className="bg-background sm:rounded-b-lg p-6 shadow-lg">
          {/* Charts Skeleton */}
          <div className="mb-6">
            <Skeleton className="h-64 w-full" />
          </div>
          
          {/* Yearly Breakdown Skeleton */}
          <div className="space-y-4">
            <Skeleton className="h-6 w-48" />
            <div className="space-y-2">
              {Array.from({ length: 5 }).map((_, index) => (
                <Skeleton key={index} className="h-12 w-full" />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
