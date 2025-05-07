/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { formateDate } from "@/lib/utils";
import { calculateLoan } from "@/services/LoanService";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { LoanCalculationInputs, LoanCalculationOutput } from "loanwise";

// Define types
type LoanContextType = {
  loanDetails: LoanCalculationInputs;
  loanResults: LoanCalculationOutput | undefined;
  updateLoanDetails: (key: string, value: number | string | Date | any) => void;
  setLoanDetails: React.Dispatch<React.SetStateAction<LoanCalculationInputs>>;
  isLoading: boolean;
};

// Create context with default values
const LoanContext = createContext<LoanContextType | undefined>(undefined);

// Default loan values
const today = new Date();
const defaultLoanDetails: LoanCalculationInputs = {
  initialInterestRate: 10,
  tenureMonths: 120,
  startDate: formateDate(new Date(today.getFullYear(), today.getMonth())),
  loanAmount: 100000,
  prepayments: [],
  interestRateChanges: [],
  emiChanges: [],
};

// Provider component
export const LoanProvider = ({ children }: { children: ReactNode }) => {
  const [loanDetails, setLoanDetails] =
    useState<LoanCalculationInputs>(defaultLoanDetails);
  const [loanResults, setLoanResults] = useState<LoanCalculationOutput>();
  const [isLoading, setIsLoading] = useState(false);

  // Update specific loan detail field
  const updateLoanDetails = (key: string, value: any) => {
    setLoanDetails((prev) => ({ ...prev, [key]: value }));
  };

  // Calculate loan whenever loanDetails changes
  useEffect(() => {
    const fetchResults = async () => {
      setIsLoading(true);
      try {
        const results = await calculateLoan(loanDetails);
        setLoanResults(results);
      } catch (error) {
        console.error("Error calculating loan:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [loanDetails]);

  return (
    <LoanContext.Provider
      value={{
        loanDetails,
        loanResults,
        updateLoanDetails,
        setLoanDetails,
        isLoading,
      }}
    >
      {children}
    </LoanContext.Provider>
  );
};

// Custom hook to use the loan context
export const useLoan = (): LoanContextType => {
  const context = useContext(LoanContext);
  if (context === undefined) {
    throw new Error("useLoan must be used within a LoanProvider");
  }
  return context;
};
