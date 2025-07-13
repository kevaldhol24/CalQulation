"use server";

import { SIPInputs } from "@/contexts/SIPContext";
import {
    SIPCalculationResult,
    SIPCalculator
} from "~lib/calqulation";


export const calculateSip = async (
    inputs: SIPInputs
): Promise<SIPCalculationResult> => {
    try {
        const sipService = new SIPCalculator({
            annualReturnRate: inputs.expectedReturnRate,
            monthlyInvestment: inputs.sipAmount,
            inflationRate: inputs.inflationRate,
            stepUpRate: inputs.yearlyStepUpRate,
            durationMonths: inputs.sipDurationInMonths,
            investmentFrequency: inputs.investmentFrequency
        });
        return sipService.calculate();
    } catch (error) {
        console.error("Error calculating SIP:", error);
        throw error;
    }
}