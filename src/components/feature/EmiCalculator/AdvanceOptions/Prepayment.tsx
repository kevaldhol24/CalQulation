"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useLoan } from "@/contexts/LoanContext";
import { motion } from "framer-motion";
import { PrepaymentFrequency, type Prepayment as IPrepayment } from "loanwise";
import { Rocket } from "lucide-react";
import moment from "moment";
import { useCallback } from "react";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { TbMoneybag } from "react-icons/tb";
import { ExtraItemCard } from "./ExtraItemCard";
import { PrepaymentDialog } from "./PrepaymentDialog";

export const Prepayment = () => {
  const {
    loanDetails: { prepayments },
    setLoanDetails,
    loanResults,
  } = useLoan();

  const getPrepaymentText = (prepayment: IPrepayment) => {
    const DATE_FORMAT = "MMMM YYYY";
    const startDateFormatted = moment(prepayment.startDate).format(DATE_FORMAT);

    if (prepayment.type === PrepaymentFrequency.Onetime) {
      return `In month of ${startDateFormatted}`;
    }

    if (prepayment.type === PrepaymentFrequency.Monthly) {
      const endText = prepayment.endDate
        ? moment(prepayment.endDate).format(DATE_FORMAT)
        : "Loan end";
      return `From ${startDateFormatted} to ${endText}`;
    }

    return "";
  };

  const deletePrepayment = useCallback(
    (id: string) => {
      const updatedPrepayments = prepayments!.filter(
        (prepayment) => prepayment.id !== id
      );

      setLoanDetails((prevDetails) => ({
        ...prevDetails,
        prepayments: updatedPrepayments,
      }));
    },
    [prepayments, setLoanDetails]
  );

  const getImpact = useCallback(
    (id: string) => {
      if (!loanResults?.impacts) return;
      const prepaymentImpact = loanResults.impacts.prepaymentImpacts.find(
        (item) => item.prepaymentId === id
      );
      return prepaymentImpact;
    },
    [loanResults?.impacts]
  );

  return (
    <>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
        }}
        className="bg-gradient-to-br from-background to-emerald-100/40 dark:from-background dark:to-emerald-950/20 p-4 rounded-xl border border-emerald-300/50 dark:border-emerald-900/30 shadow-sm"
        role="region"
        aria-labelledby="prepayment-heading"
      >
        <h4 className="flex justify-between items-center font-semibold text-emerald-500">
          <span className="flex items-center gap-2">
            <Rocket size={18} className="text-emerald-500" aria-hidden="true" />
            <span id="prepayment-heading">Prepayment</span>
            <TooltipProvider delayDuration={300}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="cursor-help">
                    <BsFillInfoCircleFill size={14} aria-hidden="true" />
                    <span className="sr-only">
                      Information about prepayment
                    </span>
                  </span>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Add prepayment to reduce loan term or EMI</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </span>
          <PrepaymentDialog />
        </h4>

        {prepayments && prepayments.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-4">
            {prepayments.map((prepayment) => (
              <ExtraItemCard
                key={prepayment.id}
                icon={TbMoneybag}
                color="emerald"
                amount={prepayment.amount}
                dateRange={getPrepaymentText(prepayment)}
                onDelete={() => deletePrepayment(prepayment.id)}
                impactData={getImpact(prepayment.id)}
                impact="prepayment"
                badgeText={prepayment.impact}
              />
            ))}
          </div>
        ) : (
          <div className="text-sm text-muted-foreground text-center italic">
            No prepayment added
          </div>
        )}
      </motion.div>
    </>
  );
};
