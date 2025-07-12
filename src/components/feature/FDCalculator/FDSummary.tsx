"use client";

import { SummaryCard } from "@/components/feature/EmiCalculator/SummaryCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useFD } from "@/contexts/FDContext";
import { currency } from "@/services/CurrencyService";
import { Percent } from "lucide-react";
import React, { useMemo } from "react";
import { BiMoneyWithdraw } from "react-icons/bi";
import { GiMoneyStack } from "react-icons/gi";
import { GrMoney } from "react-icons/gr";
import { TbMoneybag } from "react-icons/tb";

export const FDSummary: React.FC = () => {
  const { fdResults, isLoading, fdInputs } = useFD();
  const { formateCurrency } = currency();

  // Loading state
  const FDSummaryLoadingSkeleton = () => (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold mb-1 lg:mb-6 flex items-center">
          <div className="w-1 h-6 bg-gradient-to-b from-green-500 to-blue-600 rounded-full mr-3 shadow-sm"></div>
          Fixed Deposit Summary
        </h2>
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
  );

  const totalContributions = useMemo(() => {
    return (
      fdResults?.schedule.reduce((total, year) => {
        return total + (year.contribution || 0); // Ensure contributions are summed correctly
      }, 0) ?? 0
    );
  }, [fdResults]);

  if (isLoading || !fdResults) {
    return <FDSummaryLoadingSkeleton />;
  }

  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold mb-1 lg:mb-6 flex items-center">
          <div className="w-1 h-6 bg-gradient-to-b from-green-500 to-blue-600 rounded-full mr-3 shadow-sm"></div>
          Fixed Deposit Summary
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 lg:gap-3 mt-2">
        <SummaryCard
          value={formateCurrency(fdResults.principal)}
          title="FD Principal"
          helpText="Initial deposit amount"
          color="blue"
          icon={<GiMoneyStack size={32} />}
        />
        <SummaryCard
          value={formateCurrency(totalContributions + fdResults.principal)}
          title="Total Investment"
          helpText={`Principal + monthly top-ups`}
          color="purple"
          icon={<GrMoney size={28} />}
        />
        <SummaryCard
          value={formateCurrency(totalContributions)}
          title="Total Top-ups"
          helpText={`Monthly top-up contributions`}
          color="orange"
          icon={<GrMoney size={28} />}
        />
        <SummaryCard
          value={formateCurrency(fdResults.totalInterest)}
          title="Interest Earned"
          helpText="Total interest earned"
          color="green"
          icon={<TbMoneybag size={28} />}
        />
        <SummaryCard
          value={formateCurrency(fdResults.totalAmount)}
          title="Maturity Amount"
          helpText={`Total value after ${fdInputs.years} years`}
          color="gray"
          icon={<BiMoneyWithdraw size={28} />}
        />
        <SummaryCard
          value={Number(
            (fdResults.totalAmount / (totalContributions + fdResults.principal)).toFixed(2)
          )}
          title="Growth Ratio"
          helpText={`Return multiple`}
          color="indigo"
          icon={<Percent size={28} />}
        />
      </div>
      <p className="text-sm text-muted-foreground mt-1 italic">
        * Calculator shows estimated results. Actual FD rates may differ.
      </p>
    </div>
  );
};
