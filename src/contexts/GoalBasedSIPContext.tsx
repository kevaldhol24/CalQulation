"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { GoalBasedSIPInputs, GoalBasedSIPOutput } from "loanwise";
import { calculateGoalBasedSIP } from "@/services/GoalBasedSIPService";

interface GoalBasedSIPContextType {
  goalBasedSIPInputs: GoalBasedSIPInputs;
  goalBasedSIPResults: GoalBasedSIPOutput | null;
  isLoading: boolean;
  updateGoalBasedSIPInputs: (inputs: Partial<GoalBasedSIPInputs>) => void;
}

const GoalBasedSIPContext = createContext<GoalBasedSIPContextType | undefined>(
  undefined
);

export const useGoalBasedSIP = (): GoalBasedSIPContextType => {
  const context = useContext(GoalBasedSIPContext);
  if (!context) {
    throw new Error("useGoalBasedSIP must be used within a GoalBasedSIPProvider");
  }
  return context;
};

interface GoalBasedSIPProviderProps {
  children: React.ReactNode;
}

export const GoalBasedSIPProvider: React.FC<GoalBasedSIPProviderProps> = ({
  children,
}) => {
  const [goalBasedSIPInputs, setGoalBasedSIPInputs] = useState<GoalBasedSIPInputs>({
    goalAmount: 1000000, // Default 10 lakhs
    years: 10,
    annualRate: 12,
  });

  const [goalBasedSIPResults, setGoalBasedSIPResults] = useState<GoalBasedSIPOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const updateGoalBasedSIPInputs = useCallback(
    async (inputs: Partial<GoalBasedSIPInputs>) => {
      const newInputs = { ...goalBasedSIPInputs, ...inputs };
      setGoalBasedSIPInputs(newInputs);

      // Debounce calculation
      setIsLoading(true);
      try {
        const results = await calculateGoalBasedSIP(newInputs);
        setGoalBasedSIPResults(results);
      } catch (error) {
        console.error("Error calculating goal-based SIP:", error);
        setGoalBasedSIPResults(null);
      } finally {
        setIsLoading(false);
      }
    },
    [goalBasedSIPInputs]
  );

  // Initial calculation
  React.useEffect(() => {
    const initialCalculation = async () => {
      setIsLoading(true);
      try {
        const results = await calculateGoalBasedSIP(goalBasedSIPInputs);
        setGoalBasedSIPResults(results);
      } catch (error) {
        console.error("Error calculating goal-based SIP:", error);
        setGoalBasedSIPResults(null);
      } finally {
        setIsLoading(false);
      }
    };
    
    initialCalculation();
  }, [goalBasedSIPInputs]);

  const value: GoalBasedSIPContextType = {
    goalBasedSIPInputs,
    goalBasedSIPResults,
    isLoading,
    updateGoalBasedSIPInputs,
  };

  return (
    <GoalBasedSIPContext.Provider value={value}>
      {children}
    </GoalBasedSIPContext.Provider>
  );
};
