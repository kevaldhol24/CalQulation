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
    <div className="mt-6">
      <h3 className="text-md font-semibold mb-2">
        Collective Impact of Changes
      </h3>
      <div
        className={`
          relative overflow-hidden rounded-xl border p-4
          ${
            collectiveImpact.hasSavings
              ? "bg-gradient-to-r from-green-50/60 to-emerald-50/60 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-emerald-800/40"
              : "bg-gradient-to-r from-amber-50/60 to-orange-50/60 dark:from-amber-900/20 dark:to-orange-900/20 border-amber-200 dark:border-orange-800/40"
          }
          transition-all shadow-sm
        `}
      >
        {/* Header section */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-4">
            <div
              className={`rounded-full p-3 ${
                collectiveImpact.hasSavings
                  ? "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400"
                  : "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400"
              }`}
            >
              {collectiveImpact.hasSavings ? (
                <TrendingDown size={24} />
              ) : (
                <TrendingUp size={24} />
              )}
            </div>
            <div>
              <h3 className="text-lg font-semibold">
                {collectiveImpact.hasSavings
                  ? "Positive Impact"
                  : "Overall Changes"}
              </h3>
              <p className="text-sm text-muted-foreground">
                {collectiveImpact.hasSavings
                  ? "Your changes result in savings"
                  : "Summary of all loan adjustments"}
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-200 dark:bg-gray-700 my-3"></div>

        {/* Detailed impact section */}
        <div className="space-y-3 mt-2">
          {collectiveImpact.emiImpact !== 0 && (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span
                  className={`p-1 rounded-full ${
                    collectiveImpact.emiImpact <= 0
                      ? "bg-green-100 dark:bg-green-900/30"
                      : "bg-red-100 dark:bg-red-900/30"
                  }`}
                >
                  {collectiveImpact.emiImpact <= 0 ? (
                    <ArrowDown
                      size={14}
                      className="text-green-500 dark:text-green-400"
                    />
                  ) : (
                    <ArrowDown
                      size={14}
                      className="text-red-500 dark:text-red-400 transform rotate-180"
                    />
                  )}
                </span>
                <span className="text-sm font-medium">EMI Impact:</span>
              </div>
              <div
                className={`text-sm font-semibold ${
                  collectiveImpact.emiImpact <= 0
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-600 dark:text-red-400"
                }`}
              >
                {formatValue(Math.abs(collectiveImpact.emiImpact))}
              </div>
            </div>
          )}

          {collectiveImpact.interestImpact !== 0 && (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span
                  className={`p-1 rounded-full ${
                    collectiveImpact.interestImpact <= 0
                      ? "bg-green-100 dark:bg-green-900/30"
                      : "bg-red-100 dark:bg-red-900/30"
                  }`}
                >
                  {collectiveImpact.interestImpact <= 0 ? (
                    <ArrowDown
                      size={14}
                      className="text-green-500 dark:text-green-400"
                    />
                  ) : (
                    <ArrowDown
                      size={14}
                      className="text-red-500 dark:text-red-400 transform rotate-180"
                    />
                  )}
                </span>
                <span className="text-sm font-medium">Interest Impact:</span>
              </div>
              <div
                className={`text-sm font-semibold ${
                  collectiveImpact.interestImpact <= 0
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-600 dark:text-red-400"
                }`}
              >
                {formatValue(Math.abs(collectiveImpact.interestImpact))}
              </div>
            </div>
          )}

          {collectiveImpact.tenureImpact !== 0 && (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span
                  className={`p-1 rounded-full ${
                    collectiveImpact.tenureImpact <= 0
                      ? "bg-green-100 dark:bg-green-900/30"
                      : "bg-red-100 dark:bg-red-900/30"
                  }`}
                >
                  {collectiveImpact.tenureImpact <= 0 ? (
                    <ArrowDown
                      size={14}
                      className="text-green-500 dark:text-green-400"
                    />
                  ) : (
                    <ArrowDown
                      size={14}
                      className="text-red-500 dark:text-red-400 transform rotate-180"
                    />
                  )}
                </span>
                <span className="text-sm font-medium">Tenure Impact:</span>
              </div>
              <div
                className={`text-sm font-semibold ${
                  collectiveImpact.tenureImpact <= 0
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-600 dark:text-red-400"
                }`}
              >
                {Math.abs(collectiveImpact.tenureImpact)} months
              </div>
            </div>
          )}

          <div className="mt-1 pt-2 border-t border-gray-200 dark:border-gray-700">
            <div className="text-xs text-center text-muted-foreground">
              {collectiveImpact.hasSavings
                ? "Your changes have a positive impact on your loan."
                : "Consider adjustments to optimize your loan terms."}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
