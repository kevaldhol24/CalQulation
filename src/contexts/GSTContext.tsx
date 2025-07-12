"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";

export type GSTCalculationType = "inclusive" | "exclusive";

export interface GSTInputs {
  amount: number;
  gstRate: number;
  calculationType: GSTCalculationType;
}

export interface GSTResults {
  netAmount: number;
  gstAmount: number;
  totalAmount: number;
  effectiveGSTRate: number;
}

interface GSTContextType {
  gstInputs: GSTInputs;
  gstResults: GSTResults | null;
  isLoading: boolean;
  isInitialLoad: boolean;
  updateGSTInputs: (inputs: Partial<GSTInputs>) => void;
  commonGSTRates: { rate: number; label: string }[];
}

const commonGSTRates = [
  { rate: 0, label: "0% (Essential Items)" },
  { rate: 5, label: "5% (Basic Necessities)" },
  { rate: 12, label: "12% (Standard Items)" },
  { rate: 18, label: "18% (Most Services)" },
  { rate: 28, label: "28% (Luxury Items)" },
];

const GSTContext = createContext<GSTContextType | undefined>(undefined);

export const useGST = (): GSTContextType => {
  const context = useContext(GSTContext);
  if (!context) {
    throw new Error("useGST must be used within a GSTProvider");
  }
  return context;
};

interface GSTProviderProps {
  children: React.ReactNode;
}

const calculateGST = (inputs: GSTInputs): GSTResults => {
  const { amount, gstRate, calculationType } = inputs;
  
  let netAmount: number;
  let gstAmount: number;
  let totalAmount: number;
  
  if (calculationType === "exclusive") {
    // GST is added to the amount
    netAmount = amount;
    gstAmount = (amount * gstRate) / 100;
    totalAmount = amount + gstAmount;
  } else {
    // GST is included in the amount
    totalAmount = amount;
    netAmount = (amount * 100) / (100 + gstRate);
    gstAmount = amount - netAmount;
  }
  
  const effectiveGSTRate = netAmount > 0 ? (gstAmount / netAmount) * 100 : 0;
  
  return {
    netAmount: Math.round(netAmount * 100) / 100,
    gstAmount: Math.round(gstAmount * 100) / 100,
    totalAmount: Math.round(totalAmount * 100) / 100,
    effectiveGSTRate: Math.round(effectiveGSTRate * 100) / 100,
  };
};

export const GSTProvider: React.FC<GSTProviderProps> = ({ children }) => {
  const [gstInputs, setGSTInputs] = useState<GSTInputs>({
    amount: 10000,
    gstRate: 18,
    calculationType: "exclusive",
  });
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [gstResults, setGSTResults] = useState<GSTResults | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const updateGSTInputs = useCallback(
    (inputs: Partial<GSTInputs>) => {
      const newInputs = { ...gstInputs, ...inputs };
      setGSTInputs(newInputs);

      // Calculate immediately (no need for debouncing as it's a simple calculation)
      setIsLoading(true);
      try {
        const results = calculateGST(newInputs);
        setGSTResults(results);
      } catch (error) {
        console.error("Error calculating GST:", error);
        setGSTResults(null);
      } finally {
        setIsInitialLoad(false);
        setIsLoading(false);
      }
    },
    [gstInputs]
  );

  // Initial calculation on mount
  useEffect(() => {
    updateGSTInputs({});
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const value: GSTContextType = {
    gstInputs,
    gstResults,
    isLoading,
    isInitialLoad,
    updateGSTInputs,
    commonGSTRates,
  };

  return <GSTContext.Provider value={value}>{children}</GSTContext.Provider>;
};
