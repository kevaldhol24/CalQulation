"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useLoan } from "@/contexts/LoanContext";
import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, ChevronDown, ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";
import { TbInfoCircle } from "react-icons/tb";
import { AdvanceOptionsInfoDialog } from "./AdvanceOptionsInfoDialog";
import { EmiChange } from "./EmiChange";
import { InterestChange } from "./InterestChange";
import { Prepayment } from "./Prepayment";

export const AdvanceLoanInputs = () => {
  const [showAdvanceOptions, setShowAdvanceOptions] = useState(true);
  const { loanDetails, conflictsExist, conflictingMonths } = useLoan();

  // Calculate the total number of advanced options
  const totalAdvancedOptions = useMemo(() => {
    const prepaymentCount = loanDetails.prepayments?.length || 0;
    const emiChangeCount = loanDetails.emiChanges?.length || 0;
    const interestRateChangeCount =
      loanDetails.interestRateChanges?.length || 0;

    return prepaymentCount + emiChangeCount + interestRateChangeCount;
  }, [
    loanDetails.prepayments,
    loanDetails.emiChanges,
    loanDetails.interestRateChanges,
  ]);

  // Animation variants for smooth expansion and collapse
  const animationVariants = {
    hidden: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="rounded-xl bg-background/50 ">
      {" "}
      <h3 className="text-lg font-bold flex items-center cursor-pointer gap-2 hover:text-accent-foreground transition-colors">
        <button
          className="text-primary bg-primary/10 p-1 rounded-full"
          onClick={() => setShowAdvanceOptions(!showAdvanceOptions)}
          aria-expanded={showAdvanceOptions}
          aria-controls="advanced-options-content"
          aria-label={
            showAdvanceOptions
              ? "Collapse advanced options"
              : "Expand advanced options"
          }
        >
          {showAdvanceOptions ? (
            <ChevronDown size={18} aria-hidden="true" />
          ) : (
            <ChevronRight size={18} aria-hidden="true" />
          )}
        </button>
        <span
          className=""
          role="button"
          onClick={() => setShowAdvanceOptions(!showAdvanceOptions)}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setShowAdvanceOptions(!showAdvanceOptions);
            }
          }}
        >
          Advance Loan Options
        </span>

        {/* Badge showing the number of advanced options when count > 0 */}
        {totalAdvancedOptions > 0 && (
          <span
            className="ml-2 text-xs font-semibold bg-primary text-primary-foreground px-2 py-0.5 rounded-full"
            aria-label={`${totalAdvancedOptions} advanced options configured`}
          >
            {totalAdvancedOptions}
          </span>
        )}
      </h3>
      <AnimatePresence>
        {showAdvanceOptions && (
          <motion.div
            id="advanced-options-content"
            key="advanced-options"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={animationVariants}
            className="mt-6 space-y-6 overflow-hidden"
            role="region"
            aria-label="Advanced loan options"
          >
            <Alert variant="default" className="bg-info/10 border-info/30">
              <TbInfoCircle className="h-4 w-4" />
              <AlertDescription>
                <p className="font-medium">Advance input options</p>
                <p className="text-sm">
                  Learn more about advance input options before adding{" "}
                  <AdvanceOptionsInfoDialog
                    trigger={
                      <Button variant="ghost" size="sm" className="h-1 px-1">
                        Learn more...
                      </Button>
                    }
                  />
                </p>
                <div className="flex justify-end"></div>
              </AlertDescription>
            </Alert>

            {/* Dynamic conflict alert */}
            {conflictsExist && (
              <Alert
                variant="destructive"
                className="bg-destructive/10 border-destructive/30"
              >
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  <p className="font-medium mb-1">
                    Conflicts detected in your inputs!
                  </p>
                  <p className="text-sm">
                    The following months have multiple changes scheduled:
                  </p>
                  <ul className="list-disc pl-5 text-sm mt-1">
                    {conflictingMonths.map((conflict, index) => (
                      <li key={index}>
                        <strong>{conflict.month}</strong>:{" "}
                        {conflict.types.join(", ")}
                        {conflict.types.length > 1 && (
                          <span className="italic text-xs ml-1">
                            (applied in the order:{" "}
                            {conflict.types
                              .sort((a, b) => {
                                const order = {
                                  "interest rate": 1,
                                  EMI: 2,
                                  prepayment: 3,
                                };
                                return (
                                  (order[a as keyof typeof order] || 0) -
                                  (order[b as keyof typeof order] || 0)
                                );
                              })
                              .join(" → ")}
                            )
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </AlertDescription>
              </Alert>
            )}

            <div className="grid grid-cols-1 gap-3">
              <Prepayment />
              <InterestChange />
              <EmiChange />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
