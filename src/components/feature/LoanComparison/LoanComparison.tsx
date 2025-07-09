"use client";

import { Breadcrumb } from "@/components/common/Breadcrumb";
import { ToolPageHero } from "@/components/common/PageHero";
import { LoanCalculatorWithProvider } from "@/components/feature/EmiCalculator/LoanCalculator";
import { LoanCalculatorSkeleton } from "@/components/feature/EmiCalculator/LoanCalculatorSkeleton";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Suspense, useEffect, useRef, useState } from "react";
import { HiHome } from "react-icons/hi";

interface LoanComparisonProps {
  isFromMobileApp?: boolean;
}

export default function LoanComparison({
  isFromMobileApp,
}: LoanComparisonProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentLoan, setCurrentLoan] = useState(1);

  useEffect(() => {
    const handleSwipe = () => {
      if (!containerRef.current) return;
      const scrollLeft = containerRef.current.scrollLeft;
      const containerWidth = containerRef.current.clientWidth;
      const scrollPosition = scrollLeft / containerWidth;
      const newLoan = Math.round(scrollPosition) + 1; // 1 or 2 based on scroll position
      setCurrentLoan(newLoan);
    };

    const currentContainer = containerRef.current;
    currentContainer?.addEventListener("scroll", handleSwipe);

    return () => {
      currentContainer?.removeEventListener("scroll", handleSwipe);
    };
  }, []);

  return (
    <div className="bg-gray-200 dark:bg-gray-950 min-h-screen">
      {!isFromMobileApp && (
        <ToolPageHero
          title="Loan Comparison"
          subtitle="Compare multiple loan options side by side to make the best financial decision."
        >
          <Breadcrumb
            items={[
              { label: "Home", href: "/", icon: <HiHome /> },
              { label: "Tools", href: "/tools" },
              { label: "Loan Comparison", href: "/tool/loan-comparison" },
            ]}
            className="text-gray-300"
          />
        </ToolPageHero>
      )}

      <div className="relative max-w-7xl mx-auto px-0 md:px-6 lg:px-8 z-10 pt-0 pb-0 sm:pb-8">
        <div className="md:rounded-xl md:p-1.5 bg-white/10 backdrop-blur-xl">
          <div className="relative overflow-hidden md:rounded-md">
            {/* Current Loan Indicator - Mobile only, positioned at the top */}
            <div className="md:hidden absolute top-2 left-1/2 -translate-x-1/2 z-20 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-full px-3 py-1.5 border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
              <div className="flex items-center space-x-2">
                <div
                  className={`w-2 h-2 rounded-full transition-all duration-500 ${
                    currentLoan === 1
                      ? "bg-blue-500 shadow-lg shadow-blue-500/50"
                      : "bg-gray-300 dark:bg-gray-600"
                  }`}
                />
                <span className="text-xs text-gray-700 dark:text-gray-200 font-medium">
                  {currentLoan === 1 ? "Loan 1" : "Loan 2"}
                </span>
                <div
                  className={`w-2 h-2 rounded-full transition-all duration-500 ${
                    currentLoan === 2
                      ? "bg-green-500 shadow-lg shadow-green-500/50"
                      : "bg-gray-300 dark:bg-gray-600"
                  }`}
                />
              </div>
            </div>
            <span
              className={`text-xs text-gray-600 dark:text-gray-400 flex gap-2 items-center md:hidden absolute z-20${
                currentLoan === 1
                  ? "  top-3.5 right-1/2 translate-x-[110px]"
                  : "  top-3.5 left-1/2 -translate-x-[110px]"
              }`}
            >
              {currentLoan === 1 ? (
                <>
                  Swipe <ArrowRight size={12} />
                </>
              ) : (
                <>
                  <ArrowLeft size={12} />
                  Swipe
                </>
              )}
            </span>
            <div
              className="md:grid md:grid-cols-2 overflow-auto flex snap-x snap-mandatory scrollbar-hide"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              ref={containerRef}
            >
              <div className="relative overflow-hidden md:min-w-auto min-w-[calc(100vw)] border-r snap-start">
                <Suspense
                  fallback={
                    <div className="h-1 bg-gray-200 dark:bg-gray-800">
                      <LoanCalculatorSkeleton />
                    </div>
                  }
                >
                  <LoanCalculatorWithProvider compact />
                </Suspense>
              </div>

              <div className="relative overflow-hidden md:min-w-auto min-w-[calc(100vw)] snap-start">
                <Suspense
                  fallback={
                    <div className="h-1 bg-gray-200 dark:bg-gray-800">
                      <LoanCalculatorSkeleton />
                    </div>
                  }
                >
                  <LoanCalculatorWithProvider compact />
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS for hiding scrollbars */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
