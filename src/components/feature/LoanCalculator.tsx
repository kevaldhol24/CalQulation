import { MonthPicker } from "../common/MonthPicker";
import { AmountInput } from "./loanInputs/AmountInput";
import { InterestInput } from "./loanInputs/InterestInput";
import { TenureInput } from "./loanInputs/TenureInput";

export const LoanCalculator = () => {
  return (
    <div className="bg-background rounded-lg p-6 grid grid-cols-2 gap-4 shadow-lg">
      <AmountInput />
      <InterestInput />
      <TenureInput />
      <MonthPicker label="Select starting month" placeholder="Select month" />
    </div>
  );
};
