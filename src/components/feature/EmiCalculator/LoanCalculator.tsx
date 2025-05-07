"use client";
import { useLoan } from "@/contexts/LoanContext";
import { formateDate } from "@/lib/utils";
import { MonthPicker } from "../../common/MonthPicker";
import { AdvanceLoanInputs } from "./AdvanceOptions/AdvanceLoanInputs";
import { EmiSchedule } from "./EmiScehdule";
import { AmountInput } from "./loanInputs/AmountInput";
import { InterestInput } from "./loanInputs/InterestInput";
import { TenureInput } from "./loanInputs/TenureInput";
import { LoanSummary } from "./LoanSummary";

export const LoanCalculator = () => {
  // Use the loan context instead of local state
  const { loanDetails, updateLoanDetails } = useLoan();

  const handleChange = (value: number, key: string) => {
    updateLoanDetails(key, value);
  };


  return (
    <div>
      <div className="bg-background rounded-lg p-6 shadow-lg">
        <h2 className="text-lg font-bold col-span-2">Loan details</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-2">
          <AmountInput
            value={loanDetails.loanAmount}
            onChange={(value) => handleChange(Number(value), "loanAmount")}
          />
          <InterestInput
            value={loanDetails.initialInterestRate}
            onChange={(value) =>
              handleChange(Number(value), "initialInterestRate")
            }
          />
          <TenureInput
            defaultValue={loanDetails.tenureMonths}
            onBlur={(value) => handleChange(Number(value), "tenureMonths")}
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
      </div>

      <div className="bg-background rounded-lg p-6 shadow-lg mt-6">
        <AdvanceLoanInputs />
      </div>

      <div className="bg-background rounded-lg p-6 shadow-lg mt-6">
        <LoanSummary />
        <EmiSchedule />
      </div>
    </div>
  );
};
