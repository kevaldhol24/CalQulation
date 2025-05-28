"use client";

import { CollapsibleWrapper } from "@/components/common/CollapsibleWrapper";
import { Skeleton } from "@/components/ui/skeleton";
import { useLoan } from "@/contexts/LoanContext";
import { MONTHS } from "@/lib/constants";
import { formateCurrency } from "@/lib/utils";
import { EMIScheduleItem } from "loanwise";
import { ChevronDown, ChevronRight } from "lucide-react";
import React, { useMemo, useState } from "react";
import { BiInfoCircle } from "react-icons/bi";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../ui/tooltip";

interface YearSummary {
  year: string;
  emiItems: EMIScheduleItem[];
  totalEmi: number;
  totalInterest: number;
  totalPrincipal: number;
  totalPrepayment: number;
  totalPayment: number;
  principalPaidTillDate: number;
  endingBalance: number;
}

export const EmiSchedule = () => {
  const [expandedYears, setExpandedYears] = useState<string[]>([]);
  const [isExpanded, setIsExpanded] = useState(true);

  const { loanResults, isLoading, isInitialLoad } = useLoan();

  const yearGroupedData = useMemo(() => {
    // Group EMI items by year
    const groupedByYear: Record<string, EMIScheduleItem[]> = (
      loanResults?.schedule || []
    ).reduce((acc, item) => {
      // Extract year from the date
      const year = item.year;
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(item);
      return acc;
    }, {} as Record<string, EMIScheduleItem[]>);

    // Create year summary for each year
    return Object.keys(groupedByYear)
      .map((year) => {
        const yearItems = groupedByYear[year];
        const yearSummary: YearSummary = {
          year,
          emiItems: yearItems,
          totalEmi: yearItems.reduce(
            (sum, item) => sum + Number(item.emiAmount),
            0
          ),
          totalInterest: yearItems.reduce(
            (sum, item) => sum + Number(item.interestPaid),
            0
          ),
          totalPrincipal: yearItems.reduce(
            (sum, item) => sum + Number(item.principalPaid),
            0
          ),
          totalPrepayment: yearItems.reduce(
            (sum, item) => sum + Number(item.prepayment),
            0
          ),
          totalPayment: yearItems.reduce(
            (sum, item) => sum + Number(item.totalMonthlyPayment),
            0
          ),
          // Get the latest principal paid till date for the year
          principalPaidTillDate:
            yearItems[yearItems.length - 1].principalPaidTillDate,
          // Get the ending balance for the year
          endingBalance: yearItems[yearItems.length - 1].remainingBalance,
        };
        return yearSummary;
      })
      .sort((a, b) => parseInt(a.year) - parseInt(b.year));
  }, [loanResults?.schedule]);

  const toggleYearExpansion = (year: string) => {
    setExpandedYears((prevExpanded) =>
      prevExpanded.includes(year)
        ? prevExpanded.filter((y) => y !== year)
        : [...prevExpanded, year]
    );
  };

  const ScheduleLoadingState = () => (
    <div className="space-y-4">
      <CollapsibleWrapper
        id="emi-schedule"
        title="EMI Schedule"
        isExpanded={isExpanded}
        onToggle={(opened) => setIsExpanded(opened)}
      >
        <div className="overflow-x-auto rounded-lg">
          <div className="rounded-lg border w-full">
            <div className="flex p-3 bg-muted/30">
              {Array(8)
                .fill(0)
                .map((_, i) => (
                  <Skeleton key={i} className="h-4 w-full mx-2" />
                ))}
            </div>
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="flex p-4 border-t">
                  {Array(8)
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

  // If loan is still loading initial calculation or shared data, show loading state
  if (isLoading || !loanResults || isInitialLoad) {
    return <ScheduleLoadingState />;
  }

  return (
    <CollapsibleWrapper
      id="emi-schedule"
      title="EMI Schedule"
      isExpanded={isExpanded}
      onToggle={(opened) => setIsExpanded(opened)}
    >
      <div className="overflow-x-auto rounded-lg mt-2">
        <TooltipProvider>
          <Table
            className="w-full shadow-md rounded-lg border-collapse text-sm border"
            aria-labelledby="emi-schedule-heading"
            aria-describedby="emi-schedule-desc"
          >
            <caption id="emi-schedule-desc" className="sr-only">
              Year-wise EMI schedule showing monthly installments, interest,
              principal payments, and remaining balance
            </caption>
            <colgroup>
              <col className="text-nowrap w-4" />
              <col className="text-nowrap w-1/12" />
              <col className="text-nowrap" />
              <col className="text-nowrap" />
              <col className="text-nowrap" />
              <col className="text-nowrap" />
              <col className="text-nowrap" />
              <col className="text-nowrap" />
              <col className="text-nowrap" />
            </colgroup>
            <TableHeader className="bg-black/8 dark:bg-gray-900 text-xs hover:bg-dark">
              <TableRow className="text-dark">
                <TableHead className="text-dark font-bold whitespace-nowrap"></TableHead>
                <TableHead className="text-dark font-bold whitespace-nowrap">
                  Date
                </TableHead>
                <TableHead className="text-dark font-bold whitespace-nowrap">
                  <div className="flex gap-1 items-center justify-center">
                    EMI Amount
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="cursor-help">
                          <BiInfoCircle size={14} aria-hidden="true" />
                          <span className="sr-only">
                            Information about EMI amount
                          </span>
                        </span>
                      </TooltipTrigger>
                      <TooltipContent side="top">
                        Monthly installment amount that you pay to the lender
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </TableHead>
                <TableHead className="text-dark font-bold whitespace-nowrap">
                  <div className="flex gap-1 items-center justify-center">
                    Interest
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="cursor-help">
                          <BiInfoCircle size={14} aria-hidden="true" />
                          <span className="sr-only">
                            Information about interest
                          </span>
                        </span>
                      </TooltipTrigger>
                      <TooltipContent side="top">
                        Portion of EMI that goes towards interest payment
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </TableHead>
                <TableHead className="text-dark font-bold whitespace-nowrap">
                  <div className="flex gap-1 items-center justify-center">
                    Principal
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span>
                          <BiInfoCircle size={14} />
                        </span>
                      </TooltipTrigger>
                      <TooltipContent side="top">
                        Portion of EMI that goes towards reducing loan principal
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </TableHead>
                <TableHead className="text-dark font-bold whitespace-nowrap">
                  <div className="flex gap-1 items-center justify-center">
                    Prepayment
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span>
                          <BiInfoCircle size={14} />
                        </span>
                      </TooltipTrigger>
                      <TooltipContent side="top">
                        Any additional amount paid towards loan principal
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </TableHead>
                <TableHead className="text-dark font-bold whitespace-nowrap">
                  <div className="flex gap-1 items-center justify-center">
                    Total Payment
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span>
                          <BiInfoCircle size={14} />
                        </span>
                      </TooltipTrigger>
                      <TooltipContent side="top">
                        Sum of EMI amount and prepayment for the month
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </TableHead>
                <TableHead className="text-dark font-bold whitespace-nowrap">
                  <div className="flex gap-1 items-center justify-center">
                    Principal Paid
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span>
                          <BiInfoCircle size={14} />
                        </span>
                      </TooltipTrigger>
                      <TooltipContent side="top">
                        Total principal amount paid till date
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </TableHead>
                <TableHead className="text-dark font-bold whitespace-nowrap">
                  <div className="flex gap-1 items-center justify-end">
                    Balance
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span>
                          <BiInfoCircle size={14} />
                        </span>
                      </TooltipTrigger>
                      <TooltipContent side="top">
                        Remaining loan amount to be paid
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
                    className="bg-gray-100 dark:bg-muted/40 cursor-pointer hover:bg-muted text-xs"
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
                      {yearData.year}
                    </TableCell>
                    <TableCell className="text-center font-medium whitespace-nowrap">
                      {formateCurrency(yearData.totalEmi)}
                    </TableCell>
                    <TableCell className="text-center font-medium whitespace-nowrap">
                      {formateCurrency(yearData.totalInterest)}
                    </TableCell>
                    <TableCell className="text-center font-medium whitespace-nowrap">
                      {formateCurrency(yearData.totalPrincipal)}
                    </TableCell>
                    <TableCell className="text-center font-medium whitespace-nowrap">
                      {formateCurrency(yearData.totalPrepayment)}
                    </TableCell>
                    <TableCell className="text-center font-medium whitespace-nowrap">
                      {formateCurrency(yearData.totalPayment)}
                    </TableCell>
                    <TableCell className="text-center font-medium whitespace-nowrap">
                      {formateCurrency(yearData.principalPaidTillDate)}
                    </TableCell>
                    <TableCell className="text-end font-medium whitespace-nowrap">
                      {formateCurrency(yearData.endingBalance)}
                    </TableCell>
                  </TableRow>

                  {/* Monthly Details - Shown when expanded */}
                  {expandedYears.includes(yearData.year) &&
                    yearData.emiItems.map((item) => (
                      <TableRow
                        key={`${yearData.year}-${item.emiNumber}`}
                        className="bg-background/50 text-xs"
                        role="row"
                        id={`year-details-${yearData.year}-row-${item.emiNumber}`}
                      >
                        <TableCell className="font-normal items-center whitespace-nowrap text-center">
                          {item.emiNumber}
                        </TableCell>
                        <TableCell className="font-normal whitespace-nowrap">
                          {MONTHS[item.month]}
                        </TableCell>
                        <TableCell className="text-center font-normal whitespace-nowrap">
                          {formateCurrency(Number(item.emiAmount))}
                        </TableCell>
                        <TableCell className="text-center font-normal whitespace-nowrap">
                          {formateCurrency(Number(item.interestPaid))}
                        </TableCell>
                        <TableCell className="text-center font-normal whitespace-nowrap">
                          {formateCurrency(Number(item.principalPaid))}
                        </TableCell>
                        <TableCell className="text-center font-normal whitespace-nowrap">
                          {formateCurrency(Number(item.prepayment))}
                        </TableCell>
                        <TableCell className="text-center font-normal whitespace-nowrap">
                          {formateCurrency(Number(item.totalMonthlyPayment))}
                        </TableCell>
                        <TableCell className="text-center font-normal whitespace-nowrap">
                          {formateCurrency(Number(item.principalPaidTillDate))}
                        </TableCell>
                        <TableCell className="text-end font-normal whitespace-nowrap">
                          {formateCurrency(Number(item.remainingBalance))}
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
