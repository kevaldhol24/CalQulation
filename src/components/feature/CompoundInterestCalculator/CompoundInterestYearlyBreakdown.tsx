"use client";

import { CollapsibleWrapper } from "@/components/common/CollapsibleWrapper";
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
import { useCompoundInterest } from "@/contexts/CompoundInterestContext";
import { currency } from "@/services/CurrencyService";
import React, { useState } from "react";

export const CompoundInterestYearlyBreakdown: React.FC = () => {
  const { compoundResults, isLoading } = useCompoundInterest();
  const { formateCurrency } = currency();
  const [isExpanded, setIsExpanded] = useState(true);

  const TableLoadingState = () => (
    <div className="space-y-4">
      <CollapsibleWrapper
        title="Year-wise Breakdown"
        id="compound-interest-breakdown"
        isExpanded={isExpanded}
        onToggle={(opened) => setIsExpanded(opened)}
      >
        <div className="h-64 bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse" />
      </CollapsibleWrapper>
    </div>
  );

  if (isLoading || !compoundResults?.schedule) {
    return <TableLoadingState />;
  }

  return (
    <CollapsibleWrapper
      title="Year-wise Breakdown"
      id="compound-interest-breakdown"
      isExpanded={isExpanded}
      onToggle={(opened) => setIsExpanded(opened)}
    >
      <div className="overflow-x-auto border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>Year</TooltipTrigger>
                    <TooltipContent>
                      <p>Investment year</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </TableHead>
              <TableHead>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>Opening Balance</TooltipTrigger>
                    <TooltipContent>
                      <p>Amount at the beginning of the year</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </TableHead>
              <TableHead>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>Contributions</TooltipTrigger>
                    <TooltipContent>
                      <p>Additional contributions during the year</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </TableHead>
              <TableHead>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>Interest Earned</TooltipTrigger>
                    <TooltipContent>
                      <p>Compound interest earned during the year</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </TableHead>
              <TableHead>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>Closing Balance</TooltipTrigger>
                    <TooltipContent>
                      <p>Total amount at the end of the year</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {compoundResults.schedule.map((yearData, index) => {
              return (
                <React.Fragment key={yearData.year + index}>
                  <TableRow className="cursor-pointer hover:bg-muted/50">
                    <TableCell className="font-medium">
                      {yearData.year}
                    </TableCell>
                    <TableCell>
                      {formateCurrency(
                        yearData.amount -
                          (yearData.contribution || 0) -
                          yearData.interest
                      )}
                    </TableCell>
                    <TableCell>
                      {formateCurrency(yearData.contribution || 0)}
                    </TableCell>
                    <TableCell className="text-green-600">
                      {formateCurrency(yearData.interest)}
                    </TableCell>
                    <TableCell className="font-medium">
                      {formateCurrency(yearData.amount)}
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </CollapsibleWrapper>
  );
};
