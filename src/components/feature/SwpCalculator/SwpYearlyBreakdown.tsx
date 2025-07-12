"use client";

import React, { useMemo, useState } from "react";
import { useSwp } from "@/contexts/SwpContext";
import { currency } from "@/services/CurrencyService";
import { CollapsibleWrapper } from "@/components/common/CollapsibleWrapper";
import { Skeleton } from "@/components/ui/skeleton";
import { MONTHS } from "@/lib/constants";
import { ChevronDown, ChevronRight } from "lucide-react";
import { BiInfoCircle } from "react-icons/bi";
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

interface MonthData {
  month: number;
  startingAmount: number;
  withdrawal: number;
  interest: number;
  closingAmount: number;
}

interface YearSummary {
  year: string;
  monthItems: MonthData[];
  totalWithdrawal: number;
  totalInterest: number;
  startBalance: number;
  endBalance: number;
}

export const SwpYearlyBreakdown: React.FC = () => {
  const { swpResults, isLoading } = useSwp();
  const { formateCurrency } = currency();
  const [expandedYears, setExpandedYears] = useState<string[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);

  const yearGroupedData = useMemo(() => {
    if (!swpResults?.schedule) return [];

    // Group schedule items by year
    const groupedByYear: Record<string, MonthData[]> = swpResults.schedule.reduce((acc, item) => {
      const year = item.year.toString();
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push({
        month: item.month,
        startingAmount: item.startingAmount,
        withdrawal: item.withdrawal,
        interest: item.interest,
        closingAmount: item.closingAmount,
      });
      return acc;
    }, {} as Record<string, MonthData[]>);

    // Create year summary for each year
    return Object.keys(groupedByYear)
      .map((year) => {
        const monthItems = groupedByYear[year];
        const yearSummary: YearSummary = {
          year,
          monthItems: monthItems.sort((a, b) => a.month - b.month),
          totalWithdrawal: monthItems.reduce((sum, item) => sum + item.withdrawal, 0),
          totalInterest: monthItems.reduce((sum, item) => sum + item.interest, 0),
          startBalance: monthItems[0]?.startingAmount || 0,
          endBalance: monthItems[monthItems.length - 1]?.closingAmount || 0,
        };
        return yearSummary;
      })
      .sort((a, b) => parseInt(a.year) - parseInt(b.year));
  }, [swpResults?.schedule]);

  const toggleYearExpansion = (year: string) => {
    setExpandedYears((prevExpanded) =>
      prevExpanded.includes(year)
        ? prevExpanded.filter((y) => y !== year)
        : [...prevExpanded, year]
    );
  };

  const BreakdownLoadingState = () => (
    <div className="space-y-4">
      <CollapsibleWrapper
        id="swp-breakdown"
        title="SWP Breakdown"
        isExpanded={isExpanded}
        onToggle={(opened) => setIsExpanded(opened)}
      >
        <div className="overflow-x-auto rounded-lg">
          <div className="rounded-lg border w-full">
            <div className="flex p-3 bg-muted/30">
              {Array(6)
                .fill(0)
                .map((_, i) => (
                  <Skeleton key={i} className="h-4 w-full mx-2" />
                ))}
            </div>
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="flex p-4 border-t">
                  {Array(6)
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

  if (isLoading || !swpResults) {
    return <BreakdownLoadingState />;
  }

  return (
    <CollapsibleWrapper
      id="swp-breakdown"
      title="SWP Breakdown"
      isExpanded={isExpanded}
      onToggle={(opened) => setIsExpanded(opened)}
    >
      <div className="overflow-x-auto rounded-lg mt-2">
        <TooltipProvider>
          <Table
            className="w-full shadow-md rounded-lg border-collapse text-sm border"
            aria-labelledby="swp-breakdown-heading"
            aria-describedby="swp-breakdown-desc"
          >
            <caption id="swp-breakdown-desc" className="sr-only">
              Year-wise SWP breakdown showing monthly withdrawals, interest earned,
              and remaining balance
            </caption>
            <colgroup>
              <col className="text-nowrap w-4" />
              <col className="text-nowrap w-1/12" />
              <col className="text-nowrap" />
              <col className="text-nowrap" />
              <col className="text-nowrap" />
              <col className="text-nowrap" />
            </colgroup>
            <TableHeader className="bg-black/8 dark:bg-gray-900 text-xs hover:bg-dark">
              <TableRow className="text-dark">
                <TableHead className="text-dark font-bold whitespace-nowrap"></TableHead>
                <TableHead className="text-dark font-bold whitespace-nowrap">
                  Period
                </TableHead>
                <TableHead className="text-dark font-bold whitespace-nowrap">
                  <div className="flex gap-1 items-center justify-center">
                    Starting Balance
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="cursor-help">
                          <BiInfoCircle size={14} aria-hidden="true" />
                          <span className="sr-only">
                            Information about starting balance
                          </span>
                        </span>
                      </TooltipTrigger>
                      <TooltipContent side="top">
                        Investment balance at the beginning of the period
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </TableHead>
                <TableHead className="text-dark font-bold whitespace-nowrap">
                  <div className="flex gap-1 items-center justify-center">
                    Withdrawal
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="cursor-help">
                          <BiInfoCircle size={14} aria-hidden="true" />
                          <span className="sr-only">
                            Information about withdrawal
                          </span>
                        </span>
                      </TooltipTrigger>
                      <TooltipContent side="top">
                        Amount withdrawn during the period
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </TableHead>
                <TableHead className="text-dark font-bold whitespace-nowrap">
                  <div className="flex gap-1 items-center justify-center">
                    Interest Earned
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span>
                          <BiInfoCircle size={14} />
                        </span>
                      </TooltipTrigger>
                      <TooltipContent side="top">
                        Interest earned on the remaining investment
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </TableHead>
                <TableHead className="text-dark font-bold whitespace-nowrap">
                  <div className="flex gap-1 items-center justify-end">
                    Closing Balance
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span>
                          <BiInfoCircle size={14} />
                        </span>
                      </TooltipTrigger>
                      <TooltipContent side="top">
                        Remaining investment balance after withdrawal and interest
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {yearGroupedData.map((yearData) => (
                <React.Fragment key={yearData.year}>
                  {/* Year Summary Row - Clickable to expand/collapse */}
                  <TableRow
                    className="bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-900/20 dark:to-red-900/20 cursor-pointer hover:from-orange-200 hover:to-red-200 dark:hover:from-orange-900/40 dark:hover:to-red-900/40 text-xs"
                    onClick={() => toggleYearExpansion(yearData.year)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        toggleYearExpansion(yearData.year);
                      }
                    }}
                    tabIndex={0}
                    role="button"
                    aria-expanded={expandedYears.includes(yearData.year)}
                    aria-controls={`year-details-${yearData.year}`}
                    aria-label={`Year ${yearData.year} summary, click to ${
                      expandedYears.includes(yearData.year)
                        ? "collapse"
                        : "expand"
                    }`}
                  >
                    <TableCell className="font-medium flex items-center whitespace-nowrap">
                      {expandedYears.includes(yearData.year) ? (
                        <ChevronDown size={18} aria-hidden="true" />
                      ) : (
                        <ChevronRight size={18} aria-hidden="true" />
                      )}
                    </TableCell>
                    <TableCell className="font-medium whitespace-nowrap">
                      Year {yearData.year}
                    </TableCell>
                    <TableCell className="text-center font-medium whitespace-nowrap">
                      {formateCurrency(yearData.startBalance)}
                    </TableCell>
                    <TableCell className="text-center font-medium whitespace-nowrap">
                      {formateCurrency(yearData.totalWithdrawal)}
                    </TableCell>
                    <TableCell className="text-center font-medium whitespace-nowrap">
                      {formateCurrency(yearData.totalInterest)}
                    </TableCell>
                    <TableCell className="text-end font-medium whitespace-nowrap">
                      {formateCurrency(yearData.endBalance)}
                    </TableCell>
                  </TableRow>

                  {/* Monthly Details - Shown when expanded */}
                  {expandedYears.includes(yearData.year) &&
                    yearData.monthItems.map((item, index) => (
                      <TableRow
                        key={`${yearData.year}-${item.month}`}
                        className="bg-background/50 text-xs"
                        role="row"
                        id={`year-details-${yearData.year}-row-${index}`}
                      >
                        <TableCell className="font-normal items-center whitespace-nowrap text-center">
                          {index + 1}
                        </TableCell>
                        <TableCell className="font-normal whitespace-nowrap">
                          {MONTHS[item.month - 1]}
                        </TableCell>
                        <TableCell className="text-center font-normal whitespace-nowrap">
                          {formateCurrency(item.startingAmount)}
                        </TableCell>
                        <TableCell className="text-center font-normal whitespace-nowrap">
                          {formateCurrency(item.withdrawal)}
                        </TableCell>
                        <TableCell className="text-center font-normal whitespace-nowrap">
                          {formateCurrency(item.interest)}
                        </TableCell>
                        <TableCell className="text-end font-normal whitespace-nowrap">
                          {formateCurrency(item.closingAmount)}
                        </TableCell>
                      </TableRow>
                    ))}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </TooltipProvider>
      </div>
    </CollapsibleWrapper>
  );
};
