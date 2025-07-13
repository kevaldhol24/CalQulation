"use server";

import { SwpCalculator, SwpInputs, SwpOutput } from "loanwise";

export const calculateSwp = async (inputs: SwpInputs): Promise<SwpOutput> => {
  try {
    // Use the SwpCalculator from loanwise library
    const calculator = new SwpCalculator(inputs);
    const result = calculator.calculate();
    
    return {
      ...result,
    };
  } catch (error) {
    console.error("Error calculating SWP:", error);
    throw new Error("Failed to calculate SWP");
  }
};
