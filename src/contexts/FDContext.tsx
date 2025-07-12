"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { CompoundInterestInputs, CompoundInterestOutput } from "loanwise";
import { calculateFD } from "@/services/FDService";

interface FDContextType {
  fdInputs: CompoundInterestInputs;
  fdResults: CompoundInterestOutput | null;
  isLoading: boolean;
  isInitialLoad: boolean;
  updateFDInputs: (inputs: Partial<CompoundInterestInputs>) => void;
}

const FDContext = createContext<FDContextType | undefined>(undefined);

export const useFD = (): FDContextType => {
  const context = useContext(FDContext);
  if (!context) {
    throw new Error("useFD must be used within a FDProvider");
  }
  return context;
};

interface FDProviderProps {
  children: React.ReactNode;
}

export const FDProvider: React.FC<FDProviderProps> = ({ children }) => {
  const [fdInputs, setFDInputs] = useState<CompoundInterestInputs>({
    principal: 100000, // Default 1 lakh
    annualRate: 6.5, // Default FD rate
    compoundingFrequency: 3, // Quarterly compounding (typical for FDs)
    years: 5, // Default 5 years
    additionalContribution: 0, // No additional contribution by default for FDs
  });
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const [fdResults, setFDResults] = useState<CompoundInterestOutput | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);

  const updateFDInputs = useCallback(
    async (inputs: Partial<CompoundInterestInputs>) => {
      const newInputs = { ...fdInputs, ...inputs };
      setFDInputs(newInputs);

      // Debounce calculation
      setIsLoading(true);
      try {
        const results = await calculateFD(newInputs);
        setFDResults(results);
      } catch (error) {
        console.error("Error calculating FD:", error);
        setFDResults(null);
      } finally {
        setIsInitialLoad(false);
        setIsLoading(false);
      }
    },
    [fdInputs]
  );

  // Initial calculation on mount
  useEffect(() => {
    updateFDInputs({});
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const value: FDContextType = {
    fdInputs,
    fdResults,
    isLoading,
    isInitialLoad,
    updateFDInputs,
  };

  return <FDContext.Provider value={value}>{children}</FDContext.Provider>;
};
