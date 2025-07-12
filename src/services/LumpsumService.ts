"use server";

import { LumpsumInputs, LumpsumOutput, LumpsumCalculator } from "loanwise";

export const calculateLumpsum = async (
  inputs: LumpsumInputs
): Promise<LumpsumOutput> => {
  try {
    const lumpsumService = new LumpsumCalculator(inputs);
    return lumpsumService.calculate();
  } catch (error) {
    console.error("Error calculating Lumpsum:", error);
    throw error;
  }
};
