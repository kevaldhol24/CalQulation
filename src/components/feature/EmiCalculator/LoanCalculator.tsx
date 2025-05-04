"use client";
import { useEffect, useState } from "react";
import { MonthPicker } from "../../common/MonthPicker";
import { AmountInput } from "./loanInputs/AmountInput";
import { InterestInput } from "./loanInputs/InterestInput";
import { TenureInput } from "./loanInputs/TenureInput";
import { LoanCalculationInputs, LoanCalculationOutput } from "loanwise";
import { calculateLoan } from "@/services/LoanService";
import { formateDate } from "@/lib/utils";
import { LoanSummary } from "./LoanSummary";
import { AdvanceLoanInputs } from "./AdvanceOptions/AdvanceLoanInputs";
import { EmiSchedule } from "./EmiScehdule";

const today = new Date();

export const LoanCalculator = () => {
  const [loanDetails, setLoanDetails] = useState<LoanCalculationInputs>({
    initialInterestRate: 10,
    tenureMonths: 120,
    startDate: formateDate(new Date(today.getFullYear(), today.getMonth())),
    loanAmount: 100000,
  });
  const [loanResults, setLoanResults] = useState<LoanCalculationOutput>();

  const handleChange = (value: number, key: string) => {
    setLoanDetails((prev) => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    const fetchResults = async () => {
      const results = await calculateLoan(loanDetails);
      setLoanResults(results);
    };
    fetchResults();
  }, [loanDetails]);

  return (
    <div>
      <div className="bg-background rounded-lg p-6 shadow-lg">
        <h2 className="text-lg font-bold col-span-2">Loan details</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-2">
          <AmountInput
            defaultValue={100000}
            onBlur={(value) => handleChange(Number(value), "loanAmount")}
          />
          <InterestInput
            defaultValue={10}
            onBlur={(value) =>
              handleChange(Number(value), "initialInterestRate")
            }
          />
          <TenureInput
            defaultValue={120}
            onBlur={(value) => handleChange(Number(value), "tenureMonths")}
          />
          <MonthPicker
            defaultValue={new Date()}
            label="Select starting month"
            placeholder="Select month"
            onChange={(value) =>
              setLoanDetails((prev) => ({
                ...prev,
                startDate: formateDate(value || new Date()),
              }))
            }
          />
        </div>
      </div>

      <div className="bg-background rounded-lg p-6 shadow-lg mt-6">
        <AdvanceLoanInputs />
      </div>

      <div className="bg-background rounded-lg p-6 shadow-lg mt-6">
        <LoanSummary loanResult={loanResults} />
        <EmiSchedule emiSchedule={loanResults?.schedule || []} />
      </div>
    </div>
  );
};
