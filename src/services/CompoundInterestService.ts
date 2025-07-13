"use server";

import { CompoundInterestInputs, CompoundInterestOutput, CompoundInterestCalculator } from "~lib/calqulation";

export const calculateCompoundInterest = async (
    inputs: CompoundInterestInputs
): Promise<CompoundInterestOutput> => {
    try {
        const compoundService = new CompoundInterestCalculator({
            principal: inputs.principal,
            annualRate: inputs.annualRate,
            compoundingFrequency: inputs.compoundingFrequency,
            years: inputs.years,
            additionalContribution: inputs.additionalContribution || 0
        });
        return compoundService.calculate();
    } catch (error) {
        console.error("Error calculating compound interest:", error);
        throw error;
    }
}
