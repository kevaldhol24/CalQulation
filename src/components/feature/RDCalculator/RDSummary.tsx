"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useRD } from "@/contexts/RDContext";
import { FaPercent } from "react-icons/fa6";
import { GiMoneyStack } from "react-icons/gi";
import { GrMoney } from "react-icons/gr";
import { TbMoneybag } from "react-icons/tb";
import { SummaryCard } from "../EmiCalculator/SummaryCard";
import { RDDonutChart } from "./RDDonutChart";
import { currency } from "@/services/CurrencyService";

export const RDSummary = () => {
  const { rdResults, isLoading, rdInputs } = useRD();
  const { formateCurrency } = currency();

  // Loading state
  const RDSummaryLoadingSkeleton = () => (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold mb-1 lg:mb-6 flex items-center">
          <div className="w-1 h-6 bg-gradient-to-b from-orange-500 to-red-600 rounded-full mr-3 shadow-sm"></div>
          RD Summary
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
      <div className="mt-3">
        <Skeleton className="h-50 w-full" />
      </div>
    </div>
  );

  if (isLoading || !rdResults) {
    return <RDSummaryLoadingSkeleton />;
  }

  const {
    maturityAmount,
    totalInvestedAmount,
    wealthGain,
  } = rdResults;

  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold mb-1 lg:mb-6 flex items-center">
          <div className="w-1 h-6 bg-gradient-to-b from-orange-500 to-red-600 rounded-full mr-3 shadow-sm"></div>
          RD Summary
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 lg:gap-3 mt-2">
        <SummaryCard
          value={formateCurrency(maturityAmount)}
          title="Maturity Amount"
          helpText={`Final value after ${Math.ceil(
            rdInputs.rdDurationInMonths / 12
          )} years`}
          color="blue"
          icon={<GrMoney size={28} />}
        />
        <SummaryCard
          value={formateCurrency(totalInvestedAmount)}
          title="Total Deposits"
          helpText={`Total amount deposited`}
          color="gray"
          icon={<GiMoneyStack size={32} />}
        />
        <SummaryCard
          value={formateCurrency(wealthGain)}
          title="Interest Earned"
          helpText="Total interest earned"
          color="green"
          icon={<TbMoneybag size={28} />}
        />
        <SummaryCard
          value={(maturityAmount / totalInvestedAmount).toFixed(2)}
          title="Growth Ratio"
          helpText="Return multiplier on deposits"
          color="purple"
          icon={<FaPercent size={28} />}
        />
      </div>
      <p className="text-sm text-muted-foreground mt-1 italic">
        * Calculator shows estimated results. Actual RD rates may differ.
      </p>
    </div>
  );
};
