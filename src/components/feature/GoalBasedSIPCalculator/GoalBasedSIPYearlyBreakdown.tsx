"use client";

import { CollapsibleWrapper } from "@/components/common/CollapsibleWrapper";
import { useGoalBasedSIP } from "@/contexts/GoalBasedSIPContext";
import { currency } from "@/services/CurrencyService";
import { FC, useState } from "react";

export const GoalBasedSIPYearlyBreakdown: FC = () => {
  const { goalBasedSIPResults, isLoading } = useGoalBasedSIP();
  const { formateCurrency } = currency();
  const [isExpanded, setIsExpanded] = useState(true);

  const TableLoadingState = () => (
    <div className="space-y-4">
      <CollapsibleWrapper
        title="Year-wise Breakdown"
        id="goal-based-sip-breakdown-loading"
        isExpanded={isExpanded}
        onToggle={(opened) => setIsExpanded(opened)}
      >
        <div className="h-64 bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse" />
      </CollapsibleWrapper>
    </div>
  );

  if (isLoading || !goalBasedSIPResults?.schedule) {
    return <TableLoadingState />;
  }

  return (
    <CollapsibleWrapper
      title="Year-wise Breakdown"
      id="goal-based-sip-breakdown"
      isExpanded={isExpanded}
      onToggle={(opened) => setIsExpanded(opened)}
    >
      <div className="overflow-x-auto rounded-lg border">
        <table className="w-full text-sm">
          <thead className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-gray-900 dark:text-gray-100">
                Year
              </th>
              <th className="px-4 py-3 text-right font-medium text-gray-900 dark:text-gray-100">
                Monthly SIP
              </th>
              <th className="px-4 py-3 text-right font-medium text-gray-900 dark:text-gray-100">
                Total Investment
              </th>
              <th className="px-4 py-3 text-right font-medium text-gray-900 dark:text-gray-100">
                Accumulated Value
              </th>
              <th className="px-4 py-3 text-right font-medium text-gray-900 dark:text-gray-100">
                Returns Earned
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {goalBasedSIPResults.schedule.map((item, index) => (
              <tr
                key={index}
                className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
              >
                <td className="px-4 py-3 font-medium text-gray-900 dark:text-gray-100">
                  {item.year}
                </td>
                <td className="px-4 py-3 text-right text-gray-900 dark:text-gray-100">
                  {formateCurrency(goalBasedSIPResults.monthlyInvestment)}
                </td>
                <td className="px-4 py-3 text-right text-blue-600 dark:text-blue-400 font-medium">
                  {formateCurrency(item.yearlyInvestment)}
                </td>
                <td className="px-4 py-3 text-right text-gray-900 dark:text-gray-100 font-medium">
                  {formateCurrency(item.yearEndMaturity)}
                </td>
                <td className="px-4 py-3 text-right text-green-600 dark:text-green-400 font-medium">
                  {formateCurrency(item.yearlyInterest)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </CollapsibleWrapper>
  );
};
