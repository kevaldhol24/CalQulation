"use client";

import { CollapsibleWrapper } from "@/components/common/CollapsibleWrapper";
import { Skeleton } from "@/components/ui/skeleton";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { useRD } from "@/contexts/RDContext";
import { currency } from "@/services/CurrencyService";
import React, { useState } from "react";

export const RDYearlyBreakdown = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const { formateCurrency } = currency();
  const { rdResults, isLoading } = useRD();

  const BreakdownLoadingState = () => (
    <div className="space-y-4">
      <CollapsibleWrapper
        title="RD Yearly Breakdown"
        id="rd-breakdown-loading"
        isExpanded={isExpanded}
        onToggle={(opened) => setIsExpanded(opened)}
      >
        <div className="overflow-x-auto rounded-lg">
          <div className="rounded-lg border w-full">
            <div className="flex p-3 bg-muted/30">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <Skeleton key={i} className="h-4 w-full mx-2" />
                ))}
            </div>
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="flex p-4 border-t">
                  {Array(5)
                    .fill(0)
                    .map((_, j) => (
                      <Skeleton key={j} className="h-4 w-full mx-2" />
                    ))}
                </div>
              ))}
          </div>
        </div>
      </CollapsibleWrapper>
    </div>
  );

  // If RD data is still loading or not available, show loading state
  if (isLoading || !rdResults || !rdResults.yearlyBreakdown) {
    return <BreakdownLoadingState />;
  }

  return (
    <>
      <CollapsibleWrapper
        title="RD Yearly Breakdown"
        id="rd-breakdown"
        isExpanded={isExpanded}
        onToggle={(opened) => setIsExpanded(opened)}
      >
        <div className="overflow-x-auto rounded-lg mt-2">
          <TooltipProvider>
            <Table
              className="w-full shadow-md rounded-lg border-collapse text-sm border"
              aria-labelledby="rd-breakdown-heading"
              aria-describedby="rd-breakdown-desc"
            >
              <caption id="rd-breakdown-desc" className="sr-only">
                Year-wise RD breakdown showing deposits, interest earned, and maturity amounts
              </caption>
              <colgroup>
                <col className="text-nowrap" />
                <col className="text-nowrap" />
                <col className="text-nowrap" />
                <col className="text-nowrap" />
                <col className="text-nowrap" />
              </colgroup>
              <TableHeader className="bg-black/8 dark:bg-gray-900 text-xs hover:bg-dark">
                <TableRow className="text-dark">
                  <TableHead className="text-dark font-bold whitespace-nowrap text-center">
                    Year
                  </TableHead>
                  <TableHead className="text-dark font-bold whitespace-nowrap text-center">
                    <Tooltip>
                      <TooltipTrigger className="underline decoration-dotted underline-offset-2">
                        Yearly Deposit
                      </TooltipTrigger>
                      <TooltipContent>
                        Amount deposited in the RD during the year
                      </TooltipContent>
                    </Tooltip>
                  </TableHead>
                  <TableHead className="text-dark font-bold whitespace-nowrap text-center">
                    <Tooltip>
                      <TooltipTrigger className="underline decoration-dotted underline-offset-2">
                        Interest Earned
                      </TooltipTrigger>
                      <TooltipContent>
                        Interest earned on RD deposits during the year
                      </TooltipContent>
                    </Tooltip>
                  </TableHead>
                  <TableHead className="text-dark font-bold whitespace-nowrap text-center">
                    <Tooltip>
                      <TooltipTrigger className="underline decoration-dotted underline-offset-2">
                        Total Deposits
                      </TooltipTrigger>
                      <TooltipContent>
                        Cumulative amount deposited till this year
                      </TooltipContent>
                    </Tooltip>
                  </TableHead>
                  <TableHead className="text-dark font-bold whitespace-nowrap text-center">
                    <Tooltip>
                      <TooltipTrigger className="underline decoration-dotted underline-offset-2">
                        Year End Value
                      </TooltipTrigger>
                      <TooltipContent>
                        Total value of RD at the end of the year
                      </TooltipContent>
                    </Tooltip>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rdResults.yearlyBreakdown.map((yearData, index) => {
                  const cumulativeDeposits = rdResults.yearlyBreakdown
                    .slice(0, index + 1)
                    .reduce((sum, item) => sum + item.yearlyInvestment, 0);

                  return (
                    <TableRow
                      key={yearData.year}
                      className="hover:bg-muted/30 transition-colors"
                    >
                      <TableCell className="font-semibold text-center text-primary">
                        {yearData.year}
                      </TableCell>
                      <TableCell className="text-center font-medium">
                        {formateCurrency(yearData.yearlyInvestment)}
                      </TableCell>
                      <TableCell className="text-center font-medium text-green-600 dark:text-green-400">
                        {formateCurrency(yearData.yearlyInterest)}
                      </TableCell>
                      <TableCell className="text-center font-medium">
                        {formateCurrency(cumulativeDeposits)}
                      </TableCell>
                      <TableCell className="text-center font-bold text-blue-600 dark:text-blue-400">
                        {formateCurrency(yearData.yearEndMaturity)}
                      </TableCell>
                    </TableRow>
                  );
                })}
                
                {/* Summary Row */}
                <TableRow className="bg-muted/50 border-t-2 border-primary/20 font-bold">
                  <TableCell className="text-center font-bold text-primary">
                    Total
                  </TableCell>
                  <TableCell className="text-center font-bold">
                    {formateCurrency(rdResults.totalInvestedAmount)}
                  </TableCell>
                  <TableCell className="text-center font-bold text-green-600 dark:text-green-400">
                    {formateCurrency(rdResults.wealthGain)}
                  </TableCell>
                  <TableCell className="text-center font-bold">
                    {formateCurrency(rdResults.totalInvestedAmount)}
                  </TableCell>
                  <TableCell className="text-center font-bold text-blue-600 dark:text-blue-400">
                    {formateCurrency(rdResults.maturityAmount)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TooltipProvider>
        </div>
        <p className="text-xs text-muted-foreground mt-3 text-center italic">
          * All amounts are shown in rupees. Interest is compounded as per the selected frequency.
        </p>
      </CollapsibleWrapper>
    </>
  );
};
