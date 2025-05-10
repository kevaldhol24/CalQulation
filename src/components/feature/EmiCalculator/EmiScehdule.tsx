"use client";

import { MONTHS } from "@/lib/constants";
import { formateCurrency } from "@/lib/utils";
import { EMIScheduleItem } from "loanwise";
import { ChevronDown, ChevronRight } from "lucide-react";
import React, { useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { BiInfoCircle } from "react-icons/bi";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../ui/tooltip";
import { useLoan } from "@/contexts/LoanContext";

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

  const { loanResults } = useLoan();

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

  return (
    <>
      <h2 className="text-md font-bold mt-6">EMI Schedule</h2>
      <div className="overflow-x-auto rounded-lg mt-2">
        <TooltipProvider>
          <Table className="w-full shadow-md rounded-lg border-collapse text-sm border">
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
                        <span>
                          <BiInfoCircle size={14} />
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
                        <span>
                          <BiInfoCircle size={14} />
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
                  >
                    <TableCell className="font-medium flex items-center whitespace-nowrap">
                      {expandedYears.includes(yearData.year) ? (
                        <ChevronDown size={18} />
                      ) : (
                        <ChevronRight size={18} />
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
    </>
  );
};
