"use client";

import { CollapsibleWrapper } from "@/components/common/CollapsibleWrapper";
import { useLumpsum } from "@/contexts/LumpsumContext";
import { currency } from "@/services/CurrencyService";
import { FC, useState } from "react";

export const LumpsumYearlyBreakdown: FC = () => {
  const { lumpsumResults, isLoading } = useLumpsum();
  const { formateCurrency } = currency();
  const [isExpanded, setIsExpanded] = useState(true);

  const TableLoadingState = () => (
    <div className="space-y-4">
      <CollapsibleWrapper
        title="Year-wise Breakdown"
        id="lumpsum-breakdown-loading"
        isExpanded={isExpanded}
        onToggle={(opened) => setIsExpanded(opened)}
      >
        <div className="h-64 bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse" />
      </CollapsibleWrapper>
    </div>
  );

  if (isLoading || !lumpsumResults?.schedule) {
    return <TableLoadingState />;
  }

  return (
    <CollapsibleWrapper
      title="Year-wise Breakdown"
      id="lumpsum-breakdown"
      isExpanded={isExpanded}
      onToggle={(opened) => setIsExpanded(opened)}
    >
      <div className="overflow-x-auto rounded-lg border">
        <table className="w-full text-sm">
          <thead className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-gray-900 dark:text-gray-100">
                Year
              </th>
              <th className="px-4 py-3 text-right font-medium text-gray-900 dark:text-gray-100">
                Opening Balance
              </th>
              <th className="px-4 py-3 text-right font-medium text-gray-900 dark:text-gray-100">
                Interest Earned
              </th>
              <th className="px-4 py-3 text-right font-medium text-gray-900 dark:text-gray-100">
                Closing Balance
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {lumpsumResults.schedule.map((item, index) => (
              <tr
                key={index}
                className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
              >
                <td className="px-4 py-3 font-medium text-gray-900 dark:text-gray-100">
                  {item.year}
                </td>
                <td className="px-4 py-3 text-right text-gray-900 dark:text-gray-100">
                  {formateCurrency(item.startAmount)}
                </td>
                <td className="px-4 py-3 text-right text-green-600 dark:text-green-400 font-medium">
                  {formateCurrency(item.interest)}
                </td>
                <td className="px-4 py-3 text-right text-gray-900 dark:text-gray-100 font-medium">
                  {formateCurrency(item.endAmount)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </CollapsibleWrapper>
  );
};
