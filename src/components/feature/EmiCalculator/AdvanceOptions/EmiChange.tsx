"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowUp,
  CreditCard
} from "lucide-react";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { ExtraItemCard } from "./ExtraItemCard";
import { EMIChange } from "loanwise";
import { useCallback } from "react";
import { useLoan } from "@/contexts/LoanContext";
import moment from "moment";
import { EMIChangeDialog } from "./EMIChangeDialog";

export const EmiChange = () => {
  const {
    loanDetails: { emiChanges },
    loanResults,
    setLoanDetails,
  } = useLoan();

  const getEmiChangeText = (emiChange: EMIChange) => {
    const DATE_FORMAT = "MMMM YYYY";
    const effectiveDateFormatted = moment(emiChange.startDate).format(DATE_FORMAT);
    return `Effective from ${effectiveDateFormatted}`;
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

  const getComparisonIcon = (emiAmount: number) => {
    const currentEmi = loanResults?.summary?.emi || 0;
    return emiAmount > currentEmi ? ArrowUp : ArrowDown;
  };

  const getComparisonColor = (emiAmount: number) => {
    const currentEmi = loanResults?.summary?.emi || 0;
    return emiAmount > currentEmi ? "emerald" : "amber";
  };

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

        <EMIChangeDialog />
      </h4>

      {emiChanges && emiChanges.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-4">
          {emiChanges.map((emiChange) => (
            <ExtraItemCard
              key={emiChange.id}
              icon={getComparisonIcon(emiChange.emi)}
              color={getComparisonColor(emiChange.emi)}
              amount={emiChange.emi}
              dateRange={getEmiChangeText(emiChange)}
              onDelete={() => deleteEmiChange(emiChange.id)}
              showBadge={false}
              displayType="currency"
              tooltipText={`EMI will ${emiChange.emi > (loanResults?.summary?.emi || 0) ? 'increase' : 'decrease'} from this date`}
            />
          ))}
        </div>
      ) : (
        <div className="text-sm text-center text-muted-foreground italic">
          No EMI adjustments scheduled
        </div>
      )}
    </motion.div>
  );
};
