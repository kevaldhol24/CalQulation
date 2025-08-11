"use client";
import { LoanProvider, useLoan } from "@/contexts/LoanContext";
import { cn, formateDate } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { LoanCalculationInputs } from "~lib/calqulation";
import { AmountInput } from "../../common/AmountInput";
import { InterestInput } from "../../common/InterestInput";
import { MonthPicker } from "../../common/MonthPicker";
import { TenureInput } from "../../common/TenureInput";
import { AdvanceLoanInputs } from "./AdvanceOptions/AdvanceLoanInputs";
import { EmiCalculatorTour } from "./EmiCalculatorTour";
import { EmiSchedule } from "./EmiScehdule";
import { LoanCalculatorSkeleton } from "./LoanCalculatorSkeleton";
import { LoanCharts } from "./LoanCharts";
import { LoanSummary } from "./LoanSummary";
import { Button } from "@/components/ui/button";

interface LoanCalculatorProps {
  compact?: boolean;
  isSecondary?: boolean;
  hideEmiSchedule?: boolean; // Optional prop to hide EMI schedule
  hideAdvanceOptions?: boolean; // Optional prop to hide advance options
  hideLoanCharts?: boolean; // Optional prop to hide loan charts
  initialLoanDetails?: LoanCalculationInputs;
  isFromMobile?: boolean; // Flag to indicate if the calculator is being used from a mobile device
}

export const LoanCalculator: React.FC<LoanCalculatorProps> = ({
  compact,
  initialLoanDetails,
  hideEmiSchedule,
  isSecondary,
  hideAdvanceOptions,
  hideLoanCharts,
  isFromMobile,
}) => {
  // Use the loan context instead of local state
  const {
    loanDetails,
    updateLoanDetails,
    isSharedLoading,
    isInitialLoad,
    setLoanDetails,
  } = useLoan();

  // Use a ref to track if we've already set initial details to prevent loops
  const initialDetailsSetRef = useRef(false);

  // Ref for advanced options section
  const advancedOptionsRef = useRef<HTMLDivElement | null>(null);
  const [advancedHighlight, setAdvancedHighlight] = useState(false);

  const scrollToAdvanced = () => {
    if (advancedOptionsRef.current) {
      advancedOptionsRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      setAdvancedHighlight(true);
      // remove highlight after a few seconds
      setTimeout(() => setAdvancedHighlight(false), 1500);
    }
  };

  useEffect(() => {
    // Only set initial loan details once
    if (initialLoanDetails && !initialDetailsSetRef.current) {
      setLoanDetails((prev) => ({
        ...prev,
        ...initialLoanDetails,
      }));
      initialDetailsSetRef.current = true;
    }
  }, [initialLoanDetails, setLoanDetails]);

  const handleChange = (value: number, key: string) => {
    if (value === loanDetails[key as keyof typeof loanDetails]) return;
    updateLoanDetails(key, value);
  };

  // Show skeleton during the initial load with shared calculation
  if (isInitialLoad || isSharedLoading) {
    return <LoanCalculatorSkeleton compact={compact} />;
  }

  return (
    <>
      <div className="relative">
        <EmiCalculatorTour />
        <div
          className={cn([
            {
              "bg-white/10 backdrop-blur-xl": true,
              "sm:rounded-xl sm:p-1.5": !compact,
            },
          ])}
          data-tour="calculator-wrapper"
        >
          <div
            className={cn([
              {
                "bg-background p-6 shadow-lg": true,
                "sm:rounded-t-lg": !compact,
                "2xl:rounded-t-lg pt-12 md:pt-6": compact,
              },
            ])}
          >
            <div
              className={cn([
                {
                  "grid grid-cols-1 gap-6 mt-2": true,
                  "lg:grid-cols-2": !compact,
                },
              ])}
            >
              <div className="" data-tour="loan-inputs-section">
                <div className="flex justify-between items-center">
                  <h2
                    className="text-lg font-bold col-span-2 flex items-center"
                    data-tour="loan-details-heading"
                  >
                    <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full mr-3 shadow-sm"></div>
                    Loan details
                  </h2>
                  {!hideAdvanceOptions && (
                    <div >
                      <Button
                        size="sm"
                        onClick={scrollToAdvanced}
                        className={cn(
                          "bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-500 hover:via-purple-500 hover:to-pink-500",
                          "animate-pulse"
                        )}
                        aria-describedby="advanced-options-hint"
                      >
                        <span className="flex items-center gap-1">
                          Save Money ?
                        </span>
                        <span className="absolute inset-0 rounded-full bg-white/10 opacity-0 group-hover:opacity-100 transition" />
                      </Button>
                      <p id="advanced-options-hint" className="sr-only">
                        Scrolls to the advanced loan configuration section
                        below.
                      </p>
                    </div>
                  )}
                </div>
                <div
                  className={cn([
                    {
                      "grid grid-cols-1 gap-2 mt-2": true,
                      "sm:grid-cols-2 lg:grid-cols-1": !compact,
                    },
                  ])}
                >
                  <div data-tour="loan-amount">
                    <AmountInput
                      label="Loan Amount"
                      id="loan-amount"
                      title="Enter the total loan amount"
                      placeholder="Enter amount"
                      name="loanAmount"
                      required
                      value={loanDetails.loanAmount}
                      onChange={(value) => {
                        handleChange(Number(value), "loanAmount");
                      }}
                    />
                  </div>
                  <div data-tour="interest-rate">
                    <InterestInput
                      label="Interest Rate"
                      id="interest-rate"
                      title="Enter the annual interest rate in percentage"
                      placeholder="Enter interest rate"
                      name="initialInterestRate"
                      required
                      value={loanDetails.initialInterestRate}
                      onChange={(value) =>
                        handleChange(Number(value), "initialInterestRate")
                      }
                    />
                  </div>
                  <div data-tour="tenure">
                    <TenureInput
                      label="Tenure"
                      id="loan-tenure"
                      title="Enter the loan tenure in months"
                      placeholder="Enter tenure"
                      name="tenureMonths"
                      required
                      defaultValue={loanDetails.tenureMonths}
                      onChange={(value) =>
                        handleChange(Number(value), "tenureMonths")
                      }
                    />
                  </div>
                  <div data-tour="start-month">
                    <MonthPicker
                      defaultValue={new Date(loanDetails.startDate)}
                      label="Select starting month"
                      placeholder="Select month"
                      onChange={(value) =>
                        updateLoanDetails(
                          "startDate",
                          formateDate(value || new Date())
                        )
                      }
                    />
                  </div>
                </div>
              </div>
              <div data-tour="summary-cards">
                <LoanSummary
                  compact={compact}
                  isFromMobile={isFromMobile}
                  isSecondary={isSecondary}
                />
              </div>
            </div>
          </div>

          {!hideAdvanceOptions && (
            <div
              ref={advancedOptionsRef}
              className={cn(
                "bg-background p-6 pb-0 shadow-lg transition-shadow duration-500",
                advancedHighlight &&
                  "ring-4 ring-blue-500 ring-offset-2 ring-offset-background rounded"
              )}
              data-tour="advanced-options"
            >
              <div className={cn(advancedHighlight && "animate-pulse")}>
                <AdvanceLoanInputs />
              </div>
            </div>
          )}

          {(!hideEmiSchedule || !hideLoanCharts) && (
            <div
              className={cn([
                {
                  "bg-background p-6 shadow-lg": true,
                  "sm:rounded-b-lg": !compact,
                },
              ])}
              data-tour="charts-and-schedule"
            >
              {!hideLoanCharts && (
                <div data-tour="loan-charts">
                  <LoanCharts compact={compact} />
                </div>
              )}
              {!hideEmiSchedule && (
                <div data-tour="emi-schedule">
                  <EmiSchedule />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

// Higher Order Component that wraps the LoanCalculator with LoanProvider
export const withLoanProvider = <P extends object>(
  Component: React.ComponentType<P>
) => {
  const WrappedComponent: React.FC<P> = (props) => {
    return (
      <LoanProvider>
        <Component {...props} />
      </LoanProvider>
    );
  };
  WrappedComponent.displayName = `withLoanProvider(${
    Component.displayName || Component.name
  })`;
  return WrappedComponent;
};

// Specific HOC for LoanCalculator
export const LoanCalculatorWithProvider = withLoanProvider(LoanCalculator);

// Legacy HOC for backward compatibility
export const LoanCalculatorHOC: React.FC<LoanCalculatorProps> = (props) => {
  return <LoanCalculatorWithProvider {...props} />;
};
