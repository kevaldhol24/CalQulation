"use client";

import { motion } from "framer-motion";
import {
  CalendarRange,
  Coins,
  Percent,
  Plus,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { BsFillInfoCircleFill } from "react-icons/bs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ExtraItemCard } from "./ExtraItemCard";
import { ImpactType, InterestRateChange } from "~lib/calqulation";
import { useCallback, useState } from "react";
import { useLoan } from "@/contexts/LoanContext";
import moment from "moment";
import { InterestRateChangeDialog } from "./InterestRateChangeDialog";
import { IconType } from "react-icons";
import { isSameMonth } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export const InterestChange = () => {
  const {
    loanDetails: { interestRateChanges, initialInterestRate },
    loanResults,
    setLoanDetails,
  } = useLoan();

  const [isOpen, setIsOpen] = useState(false);

  const getRateChangeText = (rateChange: InterestRateChange) => {
    const DATE_FORMAT = "MMMM YYYY";
    const effectiveDateFormatted = moment(rateChange.effectiveDate).format(
      DATE_FORMAT
    );
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
    (
      rateChange: InterestRateChange
    ): { icon: IconType; color: "destructive" | "emerald" } => {
      if (!loanResults?.schedule) {
        // If no schedule is available, compare with initial interest rate
        return rateChange.rate > initialInterestRate
          ? { icon: TrendingUp, color: "destructive" }
          : { icon: TrendingDown, color: "emerald" };
      }

      const previousMonth = new Date(rateChange.effectiveDate);
      previousMonth.setMonth(previousMonth.getMonth() - 1);

      const previousScheduleItem = loanResults.schedule.find((item) =>
        isSameMonth(previousMonth, new Date(item.date))
      );

      // If no previous schedule item is found, compare with initial interest rate
      const previousRate =
        previousScheduleItem?.interestRate || initialInterestRate;

      // Compare current rate with previous rate to determine if it's an increase or decrease
      return rateChange.rate > previousRate
        ? { icon: TrendingUp, color: "destructive" }
        : { icon: TrendingDown, color: "emerald" };
    },
    [initialInterestRate, loanResults?.schedule]
  );

  const getImpact = useCallback(
    (id: string) => {
      if (!loanResults?.impacts) return;
      const rateChangeImpact =
        loanResults.impacts.interestRateChangeImpacts.find(
          (item) => item.interestChangeId === id
        );
      return rateChangeImpact;
    },
    [loanResults?.impacts]
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
        <Button
          variant="outline"
          onClick={() => setIsOpen(true)}
          className="border-dashed bg-amber-50/50 dark:bg-amber-900/10 border-amber-200 dark:border-amber-800 text-amber-600 dark:text-amber-400 hover:bg-amber-100/50 dark:hover:bg-amber-800/20 transition-all group"
        >
          <Plus className="size-4 group-hover:rotate-90 transition-transform duration-300" />
          Add
        </Button>
        {isOpen && (
          <InterestRateChangeDialog
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
          />
        )}
      </h4>

      {interestRateChanges && interestRateChanges.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-4">
          {interestRateChanges
            .sort(
              (a, b) =>
                new Date(a.effectiveDate).getTime() -
                new Date(b.effectiveDate).getTime()
            )
            .map((rateChange) => {
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
                  badgeIcon={
                    rateChange.impact === ImpactType.EMI ? Coins : CalendarRange
                  }
                  badgeText={rateChange.impact}
                  displayType="percentage"
                  impact="interestRate"
                  impactData={getImpact(rateChange.id)}
                />
              );
            })}
        </div>
      ) : (
        <div className="text-sm text-center text-muted-foreground italic mt-2">
          No interest rate changes scheduled
        </div>
      )}
    </motion.div>
  );
};
