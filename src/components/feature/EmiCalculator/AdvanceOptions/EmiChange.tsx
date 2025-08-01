"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useLoan } from "@/contexts/LoanContext";
import { formatMonthYear, isSameMonth } from "@/lib/utils";
import { motion } from "framer-motion";
import { EMIChange } from "~lib/calqulation";
import { ArrowDown, ArrowUp, CreditCard, Plus } from "lucide-react";
import { useCallback, useState } from "react";
import { IconType } from "react-icons";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { EMIChangeDialog } from "./EMIChangeDialog";
import { ExtraItemCard } from "./ExtraItemCard";
import { Button } from "@/components/ui/button";

export const EmiChange = () => {
  const {
    loanDetails: { emiChanges },
    loanResults,
    setLoanDetails,
  } = useLoan();
  const [isOpen, setIsOpen] = useState(false);

  const getEmiChangeText = (emiChange: EMIChange) => {
    return `Effective from ${formatMonthYear(emiChange.startDate)}`;
  };

  const deleteEmiChange = useCallback(
    (id: string) => {
      const updatedEmiChanges = emiChanges!.filter(
        (emiChange) => emiChange.id !== id
      );

      setLoanDetails((prevDetails) => ({
        ...prevDetails,
        emiChanges: updatedEmiChanges,
      }));
    },
    [emiChanges, setLoanDetails]
  );

  const getComparisonIcon = useCallback(
    (emiChange: EMIChange): { icon: IconType; color: "emerald" | "amber" } => {
      const { startDate, emi } = emiChange;
      const previousMonth = new Date(startDate);
      previousMonth.setMonth(previousMonth.getMonth() - 1);
      const matchedEMI = loanResults?.schedule.find((item) => {
        return isSameMonth(previousMonth, item.date);
      });
      if (!matchedEMI) return { icon: ArrowUp, color: "emerald" };
      return emi > matchedEMI.emiAmount
        ? { icon: ArrowUp, color: "emerald" }
        : { icon: ArrowDown, color: "amber" };
    },
    [loanResults?.schedule]
  );

  const getImpact = useCallback(
    (id: string) => {
      if (!loanResults?.impacts) return;
      const prepaymentImpact = loanResults.impacts.emiChangeImpacts.find(
        (item) => item.emiChangeId === id
      );
      return prepaymentImpact;
    },
    [loanResults?.impacts]
  );

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
      }}
      className="bg-gradient-to-br from-background to-blue-100/40 dark:from-background dark:to-blue-950/20 p-4 rounded-xl border border-blue-300/50 dark:border-blue-900/30 shadow-sm"
    >
      <h4 className="flex justify-between items-center font-semibold mb-0 text-blue-500">
        <span className="flex items-center gap-2">
          <CreditCard size={18} className="text-blue-500" />
          EMI Change
          <TooltipProvider delayDuration={300}>
            <Tooltip>
              <TooltipTrigger asChild>
                <BsFillInfoCircleFill size={14} />
              </TooltipTrigger>
              <TooltipContent>
                <p>Add EMI adjustments</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </span>
        <Button
          variant="outline"
          onClick={() => setIsOpen(true)}
          className="border-dashed bg-blue-50/50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 hover:bg-blue-100/50 dark:hover:bg-blue-800/20 transition-all group"
        >
          <Plus className="size-4 group-hover:rotate-90 transition-transform duration-300" />
          Add
        </Button>
        {isOpen && (
          <EMIChangeDialog isOpen={isOpen} onClose={() => setIsOpen(false)} />
        )}
      </h4>

      {emiChanges && emiChanges.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-4">
          {emiChanges.map((emiChange) => {
            const { icon, color } = getComparisonIcon(emiChange);
            return (
              <ExtraItemCard
                key={emiChange.id}
                icon={icon}
                color={color}
                amount={emiChange.emi}
                dateRange={getEmiChangeText(emiChange)}
                onDelete={() => deleteEmiChange(emiChange.id)}
                showBadge={false}
                displayType="currency"
                impact="emi"
                impactData={getImpact(emiChange.id)}
              />
            );
          })}
        </div>
      ) : (
        <div className="text-sm text-center text-muted-foreground italic mt-2">
          No EMI adjustments scheduled
        </div>
      )}
    </motion.div>
  );
};
