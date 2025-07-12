"use server";

import { RDInputs } from "@/contexts/RDContext";
import {
    SIPCalculationResult,
    SIPCalculator
} from "loanwise";

export const calculateRD = async (
    inputs: RDInputs
): Promise<SIPCalculationResult> => {
    try {
        // For RD, we don't use inflation rate and step-up rate
        const rdService = new SIPCalculator({
            annualReturnRate: inputs.expectedReturnRate,
            monthlyInvestment: inputs.rdAmount,
            inflationRate: 0, // No inflation adjustment for RD
            stepUpRate: 0, // No step-up for RD
            durationMonths: inputs.rdDurationInMonths,
            investmentFrequency: inputs.investmentFrequency
        });
        return rdService.calculate();
    } catch (error) {
        console.error("Error calculating RD:", error);
        throw error;
    }
}
