"use server";

import { LumpsumInputs, LumpsumOutput, LumpsumCalculator } from "~lib/calqulation";

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
