"use server";

import {
  AdvancedLoanCalculator,
  LoanCalculationInputs,
  LoanCalculationOutput,
} from "~lib/calqulation";


export const calculateLoan = async (
  inputs: LoanCalculationInputs
): Promise<LoanCalculationOutput> => { 
  try {
    const loanService = new AdvancedLoanCalculator(inputs);
    return loanService.calculate();
  } catch (error) {
    console.error("Error calculating loan:", error);
    throw error;
  }
 }