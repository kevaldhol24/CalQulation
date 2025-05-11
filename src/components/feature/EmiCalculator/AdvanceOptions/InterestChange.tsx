"use client";

import { motion } from "framer-motion";
import { CalendarRange, Coins, Percent, TrendingDown, TrendingUp } from "lucide-react";
import { BsFillInfoCircleFill } from "react-icons/bs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ExtraItemCard } from "./ExtraItemCard";
import { ImpactType, InterestRateChange } from "loanwise";
import { useCallback } from "react";
import { useLoan } from "@/contexts/LoanContext";
import moment from "moment";
import { InterestRateChangeDialog } from "./InterestRateChangeDialog";
import { IconType } from "react-icons";
import { isSameMonth } from "@/lib/utils";

export const InterestChange = () => {
  const {
    loanDetails: { interestRateChanges, initialInterestRate },
    loanResults,
    setLoanDetails,
  } = useLoan();

  const getRateChangeText = (rateChange: InterestRateChange) => {
    const DATE_FORMAT = "MMMM YYYY";
    const effectiveDateFormatted = moment(rateChange.effectiveDate).format(DATE_FORMAT);
    return `Effective from ${effectiveDateFormatted}`;
  };

  const deleteRateChange = useCallback(
    (id: string) => {
      const updatedRateChanges = interestRateChanges!.filter(
        (rateChange) => rateChange.id !== id
      );

      setLoanDetails((prevDetails) => ({
        ...prevDetails,
        interestRateChanges: updatedRateChanges,
      }));
    },
    [interestRateChanges, setLoanDetails]
  );

  // Function to determine if a rate change is an increase or decrease compared to the previous month's rate
  const getComparisonIcon = useCallback(
    (rateChange: InterestRateChange): { icon: IconType; color: "destructive" | "emerald" } => {
      if (!loanResults?.schedule) {
        // If no schedule is available, compare with initial interest rate
        return rateChange.rate > initialInterestRate 
          ? { icon: TrendingUp, color: "destructive" } 
          : { icon: TrendingDown, color: "emerald" };
      }
     
      const previousMonth = new Date(rateChange.effectiveDate);
      previousMonth.setMonth(previousMonth.getMonth() - 1);
      
      const previousScheduleItem = loanResults.schedule.find(item => 
        isSameMonth(previousMonth, new Date(item.date))
      );
      
      // If no previous schedule item is found, compare with initial interest rate
      const previousRate = previousScheduleItem?.interestRate || initialInterestRate;
      
      // Compare current rate with previous rate to determine if it's an increase or decrease
      return rateChange.rate > previousRate 
        ? { icon: TrendingUp, color: "destructive" } 
        : { icon: TrendingDown, color: "emerald" };
    },
    [initialInterestRate, loanResults?.schedule]
  );

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
      }}
      className="bg-gradient-to-br from-background to-amber-100/40 dark:from-background dark:to-amber-950/20 p-4 rounded-xl border border-amber-300/50 dark:border-amber-900/30 shadow-sm"
    >
      <h4 className="flex justify-between items-center font-semibold mb-0 text-amber-500">
        <span className="flex items-center gap-2">
          <Percent size={18} className="text-amber-500" />
          Rate Change
          <TooltipProvider delayDuration={300}>
            <Tooltip>
              <TooltipTrigger asChild>
                <BsFillInfoCircleFill size={14} />
              </TooltipTrigger>
              <TooltipContent>
                <p>Add floating interest rate changes</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </span>
        <InterestRateChangeDialog />
      </h4>

      {interestRateChanges && interestRateChanges.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-4">
          {interestRateChanges.map((rateChange) => {
            const { icon, color } = getComparisonIcon(rateChange);
            return (
              <ExtraItemCard
                key={rateChange.id}
                icon={icon}
                color={color}
                amount={rateChange.rate}
                dateRange={getRateChangeText(rateChange)}
                onDelete={() => deleteRateChange(rateChange.id)}
                badgeColor="amber"
                badgeIcon={rateChange.impact === ImpactType.EMI ? Coins : CalendarRange}
                badgeText={rateChange.impact}
                displayType="percentage"
                tooltipText={`Will ${rateChange.impact === ImpactType.EMI ? 'affect your EMI' : 'change your loan tenure'}`}
              />
            );
          })}
        </div>
      ) : (
        <div className="text-sm text-center text-muted-foreground italic">
          No interest rate changes scheduled
        </div>
      )}
    </motion.div>
  );
};
