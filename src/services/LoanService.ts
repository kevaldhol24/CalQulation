"use server";

import {
  AdvancedLoanCalculator,
  LoanCalculationInputs,
  LoanCalculationOutput,
} from "loanwise";

export const calculateLoan = async (
  inputs: LoanCalculationInputs
): Promise<LoanCalculationOutput> => {
  const calculator = new AdvancedLoanCalculator(inputs);
  const result = calculator.calculate();
  return result;
};
