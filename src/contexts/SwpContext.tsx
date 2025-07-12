"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { SwpInputs, SwpOutput } from "loanwise";
import { calculateSwp } from "@/services/SwpService";

interface SwpContextType {
  swpInputs: SwpInputs;
  swpResults: SwpOutput | null;
  isLoading: boolean;
  isInitialLoad: boolean;
  updateSwpInputs: (inputs: Partial<SwpInputs>) => void;
}

const SwpContext = createContext<SwpContextType | undefined>(undefined);

export const useSwp = (): SwpContextType => {
  const context = useContext(SwpContext);
  if (!context) {
    throw new Error("useSwp must be used within a SwpProvider");
  }
  return context;
};

interface SwpProviderProps {
  children: React.ReactNode;
}

export const SwpProvider: React.FC<SwpProviderProps> = ({ children }) => {
  const [swpInputs, setSwpInputs] = useState<SwpInputs>({
    principal: 1000000, // Default 10 lakhs
    annualRate: 12,
    years: 10,
    monthlyWithDrawal: 10000, // Default 10k per month
  });

  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [swpResults, setSwpResults] = useState<SwpOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const updateSwpInputs = useCallback(
    async (inputs: Partial<SwpInputs>) => {
      const newInputs = { ...swpInputs, ...inputs };
      setSwpInputs(newInputs);

      // Debounce calculation
      setIsLoading(true);
      try {
        const results = await calculateSwp(newInputs);
        setSwpResults(results);
      } catch (error) {
        console.error("Error calculating SWP:", error);
        setSwpResults(null);
      } finally {
        setIsLoading(false);
      }
    },
    [swpInputs]
  );

  // Initial calculation
  React.useEffect(() => {
    const initialCalculation = async () => {
      setIsLoading(true);
      try {
        const results = await calculateSwp(swpInputs);
        setSwpResults(results);
      } catch (error) {
        console.error("Error calculating SWP:", error);
        setSwpResults(null);
      } finally {
        setIsInitialLoad(false);
        setIsLoading(false);
      }
    };

    initialCalculation();
  }, [swpInputs]);

  const value: SwpContextType = {
    swpInputs,
    swpResults,
    isLoading,
    isInitialLoad,
    updateSwpInputs,
  };

  return <SwpContext.Provider value={value}>{children}</SwpContext.Provider>;
};