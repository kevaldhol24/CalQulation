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
import { useSip } from "@/contexts/SIPContext";
import { formateCurrency } from "@/lib/utils";
import React, { useState } from "react";
import { BiInfoCircle } from "react-icons/bi";

export const SIPYearlyBreakdown = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  const { sipResults, isLoading } = useSip();

  const BreakdownLoadingState = () => (
    <div className="space-y-4">
      <CollapsibleWrapper
        title="SIP Yearly Breakdown"
        id="sip-breakdown-loading"
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

  // If SIP data is still loading or not available, show loading state
  if (isLoading || !sipResults || !sipResults.yearlyBreakdown) {
    return <BreakdownLoadingState />;
  }

  return (
    <>
      <CollapsibleWrapper
        title="SIP Yearly Breakdown"
        id="sip-breakdown"
        isExpanded={isExpanded}
        onToggle={(opened) => setIsExpanded(opened)}
      >
        <div className="overflow-x-auto rounded-lg mt-2">
          <TooltipProvider>
            <Table
              className="w-full shadow-md rounded-lg border-collapse text-sm border"
              aria-labelledby="sip-breakdown-heading"
              aria-describedby="sip-breakdown-desc"
            >
              <caption id="sip-breakdown-desc" className="sr-only">
                Year-wise SIP breakdown showing investments, interest, maturity
                amounts and inflation adjusted values
              </caption>
              <colgroup>
                <col className="text-nowrap" />
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
                  <TableHead className="text-dark font-bold whitespace-nowrap">
                    <div className="flex gap-1 items-center justify-center">
                      Investment
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="cursor-help">
                            <BiInfoCircle size={14} aria-hidden="true" />
                            <span className="sr-only">
                              Information about investment amount
                            </span>
                          </span>
                        </TooltipTrigger>
                        <TooltipContent side="top">
                          Total amount invested up to this year
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
                              Information about interest earned
                            </span>
                          </span>
                        </TooltipTrigger>
                        <TooltipContent side="top">
                          Interest earned on your investment
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </TableHead>
                  <TableHead className="text-dark font-bold whitespace-nowrap">
                    <div className="flex gap-1 items-center justify-center">
                      Maturity
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="cursor-help">
                            <BiInfoCircle size={14} />
                          </span>
                        </TooltipTrigger>
                        <TooltipContent side="top">
                          Total amount accumulated up to this year
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </TableHead>
                  <TableHead className="text-dark font-bold whitespace-nowrap">
                    <div className="flex gap-1 items-center justify-center">
                      Inflation Adj. Interest
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="cursor-help">
                            <BiInfoCircle size={14} />
                          </span>
                        </TooltipTrigger>
                        <TooltipContent side="top">
                          Interest adjusted for inflation
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </TableHead>
                  <TableHead className="text-dark font-bold whitespace-nowrap">
                    <div className="flex gap-1 items-center justify-center">
                      Inflation Adj. Maturity
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="cursor-help">
                            <BiInfoCircle size={14} />
                          </span>
                        </TooltipTrigger>
                        <TooltipContent side="top">
                          Maturity amount adjusted for inflation
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sipResults.yearlyBreakdown.map((yearData) => (
                  <React.Fragment key={yearData.year}>
                    <TableRow className="bg-background dark:bg-muted/40 cursor-pointer hover:bg-muted text-xs">
                      <TableCell className="font-medium whitespace-nowrap text-center">
                        {yearData.year}
                      </TableCell>
                      <TableCell className="text-center font-medium whitespace-nowrap">
                        {formateCurrency(yearData.yearlyInvestment)}
                      </TableCell>
                      <TableCell className="text-center font-medium whitespace-nowrap">
                        {formateCurrency(yearData.yearlyInterest)}
                      </TableCell>
                      <TableCell className="text-center font-medium whitespace-nowrap">
                        {formateCurrency(yearData.yearEndMaturity)}
                      </TableCell>
                      <TableCell className="text-center font-medium whitespace-nowrap">
                        {formateCurrency(
                          yearData.inflationAdjustedYearlyInterest
                        )}
                      </TableCell>
                      <TableCell className="text-center font-medium whitespace-nowrap">
                        {formateCurrency(
                          yearData.inflationAdjustedYearEndMaturity
                        )}
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </TooltipProvider>
        </div>
      </CollapsibleWrapper>
    </>
  );
};
