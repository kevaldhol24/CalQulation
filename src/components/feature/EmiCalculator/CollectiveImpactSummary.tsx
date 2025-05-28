"use client";

import { useLoan } from "@/contexts/LoanContext";
import { CURRENCY_ISO } from "@/lib/constants";
import { ArrowDown, TrendingDown, TrendingUp } from "lucide-react";
import { useMemo } from "react";

// Component to display collective impacts across all loan changes
export const CollectiveImpactSummary = () => {
  const { loanResults } = useLoan();

  // Calculate total impact across all changes
  const collectiveImpact = useMemo(() => {
    if (!loanResults?.impacts) return null;

    const { emiChangeImpacts, interestRateChangeImpacts, prepaymentImpacts } =
      loanResults.impacts;

    const totalEmiImpact = [
      ...emiChangeImpacts.map((impact) => impact.newEMI - impact.oldEMI),
      ...interestRateChangeImpacts.map(
        (impact) => impact.newEMI - impact.oldEMI
      ),
      ...prepaymentImpacts.map((impact) => -impact.emiReduced),
    ].reduce((acc, impact) => {
      return acc + impact;
    }, 0);

    // Aggregate interest impacts
    const totalInterestImpact = [
      ...emiChangeImpacts.map((impact) => impact.interestDifference),
      ...interestRateChangeImpacts.map((impact) => impact.interestDifference),
      ...prepaymentImpacts.map((impact) => -impact.interestSaved), // Prepayments save interest (negative impact is good)
    ].reduce((acc, impact) => acc + impact, 0);

    // Aggregate tenure impacts (in months)
    const totalTenureImpact = [
      ...emiChangeImpacts.map((impact) => impact.tenureChange),
      ...interestRateChangeImpacts.map((impact) => impact.tenureChange),
      ...prepaymentImpacts.map((impact) => -impact.monthsReduced), // Reduced months is good (negative impact)
    ].reduce((acc, impact) => acc + impact, 0);

    return {
      emiImpact: totalEmiImpact,
      interestImpact: totalInterestImpact,
      tenureImpact: totalTenureImpact,
      hasSavings: totalInterestImpact <= 0 || totalTenureImpact <= 0,
      hasPositiveImpact:
        totalEmiImpact !== 0 ||
        totalInterestImpact !== 0 ||
        totalTenureImpact !== 0,
    };
  }, [loanResults?.impacts]);

  // Format currency values
  const formatValue = (value: number) => {
    return new Intl.NumberFormat(CURRENCY_ISO, {
      style: "currency",
      currency: "INR",
      currencyDisplay: "symbol",
      maximumFractionDigits: 0,
    }).format(value);
  };
  // No need to render if no impact data or not significant changes
  if (!collectiveImpact || !collectiveImpact.hasPositiveImpact) return null;
  return (
    <div className="relative">
      <div
        className={`
          relative overflow-hidden rounded-xl border 
          ${
            collectiveImpact.hasSavings
              ? "bg-gradient-to-br from-green-50/40 to-white dark:from-green-900/10 dark:to-transparent border-green-200/70 dark:border-emerald-800/30"
              : "bg-gradient-to-br from-amber-50/40 to-white dark:from-amber-900/10 dark:to-transparent border-amber-200/70 dark:border-amber-800/30"
          }
          shadow-sm
        `}
      >
        {/* Top section with card design */}
        <div className="flex items-center justify-between px-3 py-2.5 border-b border-gray-100 dark:border-gray-800/40">
          <div className="flex items-center gap-2.5">
            <div
              className={`rounded-md p-1 ${
                collectiveImpact.hasSavings
                  ? "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400"
                  : "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400"
              }`}
            >
              {collectiveImpact.hasSavings ? (
                <TrendingDown size={16} />
              ) : (
                <TrendingUp size={16} />
              )}
            </div>
            <div>
              <h3 className="text-sm font-medium leading-tight">
                {collectiveImpact.hasSavings
                  ? "Positive Impact"
                  : "Overall Changes"}
              </h3>
              <p className="text-xs text-muted-foreground">
                {collectiveImpact.hasSavings
                  ? "Your changes result in savings"
                  : "Summary of adjustments"}
              </p>
            </div>
          </div>
        </div>
        
        {/* Impact Metrics - Sleek horizontal layout */}
        <div className="px-3 py-3 flex flex-wrap items-center justify-between">
          <div className="space-y-2 w-full">
            {/* EMI Impact */}
            {collectiveImpact.emiImpact !== 0 && (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span 
                    className={`inline-block w-1.5 h-1.5 rounded-full ${
                      collectiveImpact.emiImpact <= 0
                        ? "bg-green-500 dark:bg-green-400"
                        : "bg-red-500 dark:bg-red-400"
                    }`}
                  />
                  <span className="text-xs font-medium">EMI:</span>
                </div>
                <div className="flex items-center gap-1">
                  <span
                    className={`text-xs font-medium ${
                      collectiveImpact.emiImpact <= 0
                        ? "text-green-600 dark:text-green-400"
                        : "text-red-600 dark:text-red-400"
                    }`}
                  >
                    {formatValue(Math.abs(collectiveImpact.emiImpact))}
                  </span>
                  <span
                    className={`p-0.5 rounded-full ${
                      collectiveImpact.emiImpact <= 0
                        ? "text-green-500 dark:text-green-400"
                        : "text-red-500 dark:text-red-400"
                    }`}
                  >
                    {collectiveImpact.emiImpact <= 0 ? (
                      <ArrowDown size={10} />
                    ) : (
                      <ArrowDown size={10} className="transform rotate-180" />
                    )}
                  </span>
                </div>
              </div>
            )}

            {/* Interest Impact */}
            {collectiveImpact.interestImpact !== 0 && (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span 
                    className={`inline-block w-1.5 h-1.5 rounded-full ${
                      collectiveImpact.interestImpact <= 0
                        ? "bg-green-500 dark:bg-green-400"
                        : "bg-red-500 dark:bg-red-400"
                    }`}
                  />
                  <span className="text-xs font-medium">Interest:</span>
                </div>
                <div className="flex items-center gap-1">
                  <span
                    className={`text-xs font-medium ${
                      collectiveImpact.interestImpact <= 0
                        ? "text-green-600 dark:text-green-400"
                        : "text-red-600 dark:text-red-400"
                    }`}
                  >
                    {formatValue(Math.abs(collectiveImpact.interestImpact))}
                  </span>
                  <span
                    className={`p-0.5 rounded-full ${
                      collectiveImpact.interestImpact <= 0
                        ? "text-green-500 dark:text-green-400"
                        : "text-red-500 dark:text-red-400"
                    }`}
                  >
                    {collectiveImpact.interestImpact <= 0 ? (
                      <ArrowDown size={10} />
                    ) : (
                      <ArrowDown size={10} className="transform rotate-180" />
                    )}
                  </span>
                </div>
              </div>
            )}

            {/* Tenure Impact */}
            {collectiveImpact.tenureImpact !== 0 && (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span 
                    className={`inline-block w-1.5 h-1.5 rounded-full ${
                      collectiveImpact.tenureImpact <= 0
                        ? "bg-green-500 dark:bg-green-400"
                        : "bg-red-500 dark:bg-red-400"
                    }`}
                  />
                  <span className="text-xs font-medium">Tenure:</span>
                </div>
                <div className="flex items-center gap-1">
                  <span
                    className={`text-xs font-medium ${
                      collectiveImpact.tenureImpact <= 0
                        ? "text-green-600 dark:text-green-400"
                        : "text-red-600 dark:text-red-400"
                    }`}
                  >
                    {Math.abs(collectiveImpact.tenureImpact)} months
                  </span>
                  <span
                    className={`p-0.5 rounded-full ${
                      collectiveImpact.tenureImpact <= 0
                        ? "text-green-500 dark:text-green-400"
                        : "text-red-500 dark:text-red-400"
                    }`}
                  >
                    {collectiveImpact.tenureImpact <= 0 ? (
                      <ArrowDown size={10} />
                    ) : (
                      <ArrowDown size={10} className="transform rotate-180" />
                    )}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
