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
import { useFD } from "@/contexts/FDContext";
import { currency } from "@/services/CurrencyService";
import React, { useState } from "react";

export const FDYearlyBreakdown: React.FC = () => {
  const { fdResults, isLoading } = useFD();
  const { formateCurrency } = currency();
  const [isExpanded, setIsExpanded] = useState(true);

  const TableLoadingState = () => (
    <div className="space-y-4">
      <CollapsibleWrapper
        title="Year-wise FD Breakdown"
        id="fd-breakdown"
        isExpanded={isExpanded}
        onToggle={(opened) => setIsExpanded(opened)}
      >
        <div className="h-64 bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse" />
      </CollapsibleWrapper>
    </div>
  );

  if (isLoading || !fdResults?.schedule) {
    return <TableLoadingState />;
  }

  return (
    <CollapsibleWrapper
      title="Year-wise FD Breakdown"
      id="fd-breakdown"
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
                      <p>FD investment year</p>
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
                    <TooltipTrigger>Interest Earned</TooltipTrigger>
                    <TooltipContent>
                      <p>Interest earned during the year</p>
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
            {fdResults.schedule.map((yearData, index) => {
              return (
                <React.Fragment key={yearData.year + index}>
                  <TableRow
                    className="cursor-pointer hover:bg-muted/50"
                  >
                    <TableCell className="font-medium">
                      {yearData.year}
                    </TableCell>
                    <TableCell>
                      {formateCurrency(yearData.amount - (yearData.contribution || 0) - yearData.interest)}
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
