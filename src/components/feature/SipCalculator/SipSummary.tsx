"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useSip } from "@/contexts/SIPContext";
import { formateCurrency } from "@/lib/utils";
import { FaChartLine, FaMoneyBills, FaPercent } from "react-icons/fa6";
import { GiMoneyStack } from "react-icons/gi";
import { GrMoney } from "react-icons/gr";
import { TbMoneybag } from "react-icons/tb";
import { SummaryCard } from "../EmiCalculator/SummaryCard";
import { SipDonutChart } from "./SipDonutChart";

export const SipSummary = () => {
  // Get loanResults from context
  const { sipResults, isLoading, sipInputs } = useSip();

  // Loading state
  const SipSummaryLoadingSkeleton = () => (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold mb-1 lg:mb-6 flex items-center">
          <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full mr-3 shadow-sm"></div>
          SIP Summary
        </h2>
        {/* No share button during loading */}
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
      <div className="mt-3">
        <Skeleton className="h-50 w-full" />
      </div>
    </div>
  );

  if (isLoading || !sipResults) {
    return <SipSummaryLoadingSkeleton />;
  }

  const {
    maturityAmount,
    totalInvestedAmount,
    wealthGain,
    inflationAdjustedMaturityAmount,
    inflationAdjustedWealthGain,
  } = sipResults;

  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold mb-1 lg:mb-6 flex items-center">
          <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full mr-3 shadow-sm"></div>
          SIP Summary
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 lg:gap-3 mt-2">
        <SummaryCard
          value={formateCurrency(maturityAmount)}
          title="Maturity Amount"
          helpText={`Final value after ${Math.ceil(
            sipInputs.sipDurationInMonths / 12
          )} years`}
          color="blue"
          icon={<GrMoney size={28} />}
        />
        <SummaryCard
          value={formateCurrency(totalInvestedAmount)}
          title="Invested Amount"
          helpText={`Total capital invested`}
          color="gray"
          icon={<GiMoneyStack size={32} />}
        />
        <SummaryCard
          value={formateCurrency(wealthGain)}
          title="Wealth Gain"
          helpText="Returns earned on investment"
          color="green"
          icon={<TbMoneybag size={28} />}
        />
        <SummaryCard
          value={(maturityAmount / totalInvestedAmount).toFixed(2)}
          title="Wealth Gain Ratio"
          helpText="Return multiplier on investment"
          color="purple"
          icon={<FaPercent size={28} />}
        />
        <SummaryCard
          value={formateCurrency(inflationAdjustedMaturityAmount || 0)}
          title="Maturity (Inflated)"
          helpText="Real value adjusted for inflation"
          color="red"
          icon={<FaChartLine size={28} />}
        />
        <SummaryCard
          value={formateCurrency(inflationAdjustedWealthGain || 0)}
          title="Wealth Gain (Inflated)"
          helpText="Real returns after inflation"
          color="yellow"
          icon={<FaMoneyBills size={28} />}
        />
      </div>

      <div className="mt-3">
        <SipDonutChart />
      </div>
      <p className="text-sm text-muted-foreground mt-1 italic">
        * Calculator shows estimated results. Actual numbers may differ.
      </p>
    </div>
  );
};
