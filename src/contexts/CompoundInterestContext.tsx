"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { CompoundInterestInputs, CompoundInterestOutput } from "~lib/calqulation";
import { calculateCompoundInterest } from "@/services/CompoundInterestService";

interface CompoundInterestContextType {
  compoundInputs: CompoundInterestInputs;
  compoundResults: CompoundInterestOutput | null;
  isLoading: boolean;
  isInitialLoad: boolean;
  updateCompoundInputs: (inputs: Partial<CompoundInterestInputs>) => void;
}

const CompoundInterestContext = createContext<
  CompoundInterestContextType | undefined
>(undefined);

export const useCompoundInterest = (): CompoundInterestContextType => {
  const context = useContext(CompoundInterestContext);
  if (!context) {
    throw new Error(
      "useCompoundInterest must be used within a CompoundInterestProvider"
    );
  }
  return context;
};

interface CompoundInterestProviderProps {
  children: React.ReactNode;
}

export const CompoundInterestProvider: React.FC<
  CompoundInterestProviderProps
> = ({ children }) => {
  const [compoundInputs, setCompoundInputs] = useState<CompoundInterestInputs>({
    principal: 100000, // Default 1 lakh
    annualRate: 12,
    compoundingFrequency: 12, // Monthly compounding
    years: 10,
    additionalContribution: 0, // No additional contribution by default
  });
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const [compoundResults, setCompoundResults] =
    useState<CompoundInterestOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const updateCompoundInputs = useCallback(
    async (inputs: Partial<CompoundInterestInputs>) => {
      const newInputs = { ...compoundInputs, ...inputs };
      setCompoundInputs(newInputs);

      // Debounce calculation
      setIsLoading(true);
      try {
        const results = await calculateCompoundInterest(newInputs);
        setCompoundResults(results);
      } catch (error) {
        console.error("Error calculating compound interest:", error);
        setCompoundResults(null);
      } finally {
        setIsInitialLoad(false);
        setIsLoading(false);
      }
    },
    [compoundInputs]
  );

  // Initial calculation on mount
  useEffect(() => {
    updateCompoundInputs({});
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const value: CompoundInterestContextType = {
    compoundInputs,
    compoundResults,
    isLoading,
    isInitialLoad,
    updateCompoundInputs,
  };

  return (
    <CompoundInterestContext.Provider value={value}>
      {children}
    </CompoundInterestContext.Provider>
  );
};
