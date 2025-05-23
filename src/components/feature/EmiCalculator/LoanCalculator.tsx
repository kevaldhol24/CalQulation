"use client";
import { useLoan } from "@/contexts/LoanContext";
import { formateDate } from "@/lib/utils";
import { MonthPicker } from "../../common/MonthPicker";
import { AdvanceLoanInputs } from "./AdvanceOptions/AdvanceLoanInputs";
import { EmiSchedule } from "./EmiScehdule";
import { LoanCharts } from "./LoanCharts";
import { AmountInput } from "./loanInputs/AmountInput";
import { InterestInput } from "./loanInputs/InterestInput";
import { TenureInput } from "./loanInputs/TenureInput";
import { LoanSummary } from "./LoanSummary";
import { LoanCalculatorSkeleton } from "./LoanCalculatorSkeleton";

export const LoanCalculator = () => {
  // Use the loan context instead of local state
  const { loanDetails, updateLoanDetails, isSharedLoading, isInitialLoad } =
    useLoan();

  const handleChange = (value: number, key: string) => {
    if (value === loanDetails[key as keyof typeof loanDetails]) return;
    updateLoanDetails(key, value);
  };

  // Show skeleton during the initial load with shared calculation
  if (isInitialLoad || isSharedLoading) {
    return <LoanCalculatorSkeleton />;
  }

  return (
    <div className="sm:rounded-xl bg-white/10 backdrop-blur-xl sm:p-1.5">
      <div className="bg-background sm:rounded-t-lg p-6 shadow-lg">
        <h2 className="text-lg font-bold col-span-2">Loan details</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-2">
          <AmountInput
            value={loanDetails.loanAmount}
            onChange={(value) => {
              handleChange(Number(value), "loanAmount");
            }}
          />
          <InterestInput
            value={loanDetails.initialInterestRate}
            onChange={(value) =>
              handleChange(Number(value), "initialInterestRate")
            }
          />
          <TenureInput
            defaultValue={loanDetails.tenureMonths}
            onChange={(value) => handleChange(Number(value), "tenureMonths")}
          />
          <MonthPicker
            defaultValue={new Date(loanDetails.startDate)}
            label="Select starting month"
            placeholder="Select month"
            onChange={(value) =>
              updateLoanDetails("startDate", formateDate(value || new Date()))
            }
          />
        </div>
        <p className="text-sm text-muted-foreground mt-4 italic">
          * Calculator shows estimated results. Actual numbers may differ.
        </p>
      </div>

      <div className="bg-background p-6 shadow-lg">
        <AdvanceLoanInputs />
      </div>

      <div className="bg-background sm:rounded-b-lg p-6 shadow-lg">
        <LoanSummary />
        <div className="mt-6">
          <LoanCharts />
        </div>
        <EmiSchedule />
      </div>
    </div>
  );
};
