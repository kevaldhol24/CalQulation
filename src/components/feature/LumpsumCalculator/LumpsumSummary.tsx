"use client";

import { useLumpsum } from "@/contexts/LumpsumContext";
import { FC } from "react";
import { TbMoneybag } from "react-icons/tb";
import { GiMoneyStack } from "react-icons/gi";
import { FaPercent } from "react-icons/fa6";
import { GrMoney } from "react-icons/gr";
import { SummaryCard } from "../EmiCalculator/SummaryCard";
import { Skeleton } from "@/components/ui/skeleton";
import { currency } from "@/services/CurrencyService";

export const LumpsumSummary: FC = () => {
  const { lumpsumResults, isLoading, isInitialLoad, lumpsumInputs } =
    useLumpsum();
  const { formateCurrency } = currency();

  // Loading state
  const LumpsumSummaryLoadingSkeleton = () => (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold mb-1 lg:mb-6 flex items-center">
          <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full mr-3 shadow-sm"></div>
          Lumpsum Summary
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 lg:gap-4 mt-2">
        {Array(4)
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

  if (isLoading || isInitialLoad || !lumpsumResults) {
    return <LumpsumSummaryLoadingSkeleton />;
  }

  const { principal, totalAmount, totalInterest } = lumpsumResults;

  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold mb-1 lg:mb-6 flex items-center">
          <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full mr-3 shadow-sm"></div>
          Lumpsum Summary
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 lg:gap-3 mt-2">
        <SummaryCard
          value={formateCurrency(totalAmount)}
          title="Maturity Amount"
          helpText={`Final value after ${lumpsumInputs.years} years`}
          color="blue"
          icon={<GrMoney size={28} />}
        />
        <SummaryCard
          value={formateCurrency(principal)}
          title="Investment Amount"
          helpText="Initial lumpsum investment"
          color="gray"
          icon={<GiMoneyStack size={32} />}
        />
        <SummaryCard
          value={formateCurrency(totalInterest)}
          title="Total Returns"
          helpText="Total compound interest"
          color="green"
          icon={<TbMoneybag size={28} />}
        />
        <SummaryCard
          value={(totalAmount / principal).toFixed(2)}
          title="Return Multiplier"
          helpText="Growth multiplier on investment"
          color="purple"
          icon={<FaPercent size={28} />}
        />
      </div>
      <p className="text-sm text-muted-foreground mt-1 italic">
        * Calculator shows estimated results. Actual numbers may differ.
      </p>
    </div>
  );
};
