"use client";

import React from "react";
import { useSwp } from "@/contexts/SwpContext";
import { currency } from "@/services/CurrencyService";
import { SummaryCard } from "@/components/feature/EmiCalculator/SummaryCard";
import { Skeleton } from "@/components/ui/skeleton";
import { TbMoneybag } from "react-icons/tb";
import { GiMoneyStack } from "react-icons/gi";
import { FaPercent } from "react-icons/fa6";
import { GrMoney } from "react-icons/gr";

export const SwpSummary: React.FC = () => {
  const { swpResults, isLoading, swpInputs } = useSwp();
  const { formateCurrency } = currency();

  // Loading state
  const SwpSummaryLoadingSkeleton = () => (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold mb-1 lg:mb-6 flex items-center">
          <div className="w-1 h-6 bg-gradient-to-b from-orange-500 to-red-600 rounded-full mr-3 shadow-sm"></div>
          SWP Summary
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

  if (isLoading || !swpResults) {
    return <SwpSummaryLoadingSkeleton />;
  }

  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold mb-1 lg:mb-6 flex items-center">
          <div className="w-1 h-6 bg-gradient-to-b from-orange-500 to-red-600 rounded-full mr-3 shadow-sm"></div>
          SWP Summary
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 lg:gap-3 mt-2">
        <SummaryCard
          value={formateCurrency(swpResults.principal)}
          title="Initial Investment"
          helpText="Starting investment amount"
          color="blue"
          icon={<GiMoneyStack size={32} />}
        />
        <SummaryCard
          value={formateCurrency(swpResults.totalWithdrawals)}
          title="Total Withdrawals"
          helpText={`Total amount withdrawn over ${swpInputs.years} years`}
          color="red"
          icon={<GrMoney size={28} />}
        />
        <SummaryCard
          value={formateCurrency(swpResults.totalInterest)}
          title="Interest Earned"
          helpText="Returns generated on investment"
          color="green"
          icon={<TbMoneybag size={28} />}
        />
        <SummaryCard
          value={formateCurrency(swpResults.totalAmount)}
          title="Final Balance"
          helpText={`Remaining amount after ${swpInputs.years} years`}
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
