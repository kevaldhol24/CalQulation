"use client";

import { FC } from "react";
import { useGoalBasedSIP } from "@/contexts/GoalBasedSIPContext";
import { SummaryCard } from "@/components/feature/EmiCalculator/SummaryCard";
import { currency } from "@/services/CurrencyService";

export const GoalBasedSIPSummary: FC = () => {
  const { goalBasedSIPResults, isLoading } = useGoalBasedSIP();
  const { formateCurrency } = currency();

  const SummaryLoadingState = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 lg:gap-3 mt-2">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md border border-gray-200 dark:border-gray-700"
        >
          <div className="animate-pulse">
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-3"></div>
            <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
            <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-2/3"></div>
          </div>
        </div>
      ))}
    </div>
  );

  if (isLoading || !goalBasedSIPResults) {
    return (
      <div className="space-y-4">
        <div className="flex items-center">
          <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full mr-3 shadow-sm animate-pulse"></div>
          <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-48 animate-pulse"></div>
        </div>
        <SummaryLoadingState />
      </div>
    );
  }

  const summaryData = [
    {
      title: "Target Goal Amount",
      value: formateCurrency(goalBasedSIPResults.goalAmount),
      helpText: "Your financial target",
      color: "blue" as const,
    },
    {
      title: "Required Monthly SIP",
      value: formateCurrency(goalBasedSIPResults.monthlyInvestment),
      helpText: "Monthly investment needed",
      color: "green" as const,
    },
    {
      title: "Total Investment",
      value: formateCurrency(goalBasedSIPResults.totalInvestment),
      helpText: "Total amount to be invested",
      color: "purple" as const,
    },
    {
      title: "Wealth Gained",
      value: formateCurrency(goalBasedSIPResults.goalAmount - goalBasedSIPResults.totalInvestment),
      helpText: "Returns from your investment",
      color: "orange" as const,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full mr-3 shadow-sm"></div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          Investment Summary
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 lg:gap-3 mt-2">
        {summaryData.map((item, index) => (
          <SummaryCard
            key={index}
            title={item.title}
            value={item.value}
            helpText={item.helpText}
            color={item.color}
          />
        ))}
      </div>
       <p className="text-sm text-muted-foreground mt-1 italic">
        * Calculator shows estimated results. Actual numbers may differ.
      </p>
    </div>
  );
};
