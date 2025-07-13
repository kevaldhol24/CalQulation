"use server";

import { CompoundInterestInputs, CompoundInterestOutput, CompoundInterestCalculator } from "~lib/calqulation";

export const calculateFD = async (
    inputs: CompoundInterestInputs
): Promise<CompoundInterestOutput> => {
    try {
        const fdService = new CompoundInterestCalculator({
            principal: inputs.principal,
            annualRate: inputs.annualRate,
            compoundingFrequency: inputs.compoundingFrequency,
            years: inputs.years,
            additionalContribution: inputs.additionalContribution || 0
        });
        return fdService.calculate();
    } catch (error) {
        console.error("Error calculating FD:", error);
        throw error;
    }
}
