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

export const InterestChange = () => {
  const {
    loanDetails: { interestRateChanges },
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
          {interestRateChanges.map((rateChange) => (
            <ExtraItemCard
              key={rateChange.id}
              icon={rateChange.rate > 0 ? TrendingUp : TrendingDown}
              color={rateChange.rate > 0 ? "destructive" : "emerald"}
              amount={rateChange.rate}
              dateRange={getRateChangeText(rateChange)}
              onDelete={() => deleteRateChange(rateChange.id)}
              badgeColor="amber"
              badgeIcon={rateChange.impact === ImpactType.EMI ? Coins : CalendarRange}
              badgeText={rateChange.impact}
              displayType="percentage"
              tooltipText={`Will ${rateChange.impact === ImpactType.EMI ? 'affect your EMI' : 'change your loan tenure'}`}
            />
          ))}
        </div>
      ) : (
        <div className="text-sm text-center text-muted-foreground italic">
          No interest rate changes scheduled
        </div>
      )}
    </motion.div>
  );
};
