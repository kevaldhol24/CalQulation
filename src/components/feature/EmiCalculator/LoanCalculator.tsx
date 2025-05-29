"use client";
import { useLoan } from "@/contexts/LoanContext";
import { formateDate } from "@/lib/utils";
import { MonthPicker } from "../../common/MonthPicker";
import { AdvanceLoanInputs } from "./AdvanceOptions/AdvanceLoanInputs";
import { EmiSchedule } from "./EmiScehdule";
import { LoanCharts } from "./LoanCharts";
import { AmountInput } from "../../common/AmountInput";
import { InterestInput } from "../../common/InterestInput";
import { TenureInput } from "../../common/TenureInput";
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-2">
          <div>
            <h2 className="text-lg font-bold col-span-2 flex items-center">
              <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full mr-3 shadow-sm"></div>
              Loan details
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2 mt-2">
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
          <div>
            <LoanSummary />
          </div>
        </div>
      </div>

      <div className="bg-background p-6 pb-0 shadow-lg">
        <AdvanceLoanInputs />
      </div>

      <div className="bg-background sm:rounded-b-lg p-6 shadow-lg">
        <div>
          <LoanCharts />
        </div>
        <EmiSchedule />
      </div>
    </div>
  );
};
