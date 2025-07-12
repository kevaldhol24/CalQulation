import { GoalBasedSIPCalculator, GoalBasedSIPInputs, GoalBasedSIPOutput } from "loanwise";

/**
 * Service to calculate goal-based SIP using the loanwise library
 */
export const calculateGoalBasedSIP = async (
  inputs: GoalBasedSIPInputs
): Promise<GoalBasedSIPOutput> => {
  try {
    // Use the GoalBasedSIPCalculator from loanwise library
    const calculator = new GoalBasedSIPCalculator(inputs);
    const result = calculator.calculate();
    
    return {
      ...result,
    };
  } catch (error) {
    console.error("Error calculating goal-based SIP:", error);
    throw new Error("Failed to calculate goal-based SIP");
  }
};
