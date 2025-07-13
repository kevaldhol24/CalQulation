/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { getSharedCalculation } from "@/actions/sharedCalculationActions";
import { formateDate, formatMonthYear } from "@/lib/utils";
import { calculateLoan } from "@/services/LoanService";
import {
  calculateMinimumEMI,
  LoanCalculationInputs,
  LoanCalculationOutput,
  PrepaymentFrequency,
} from "~lib/calqulation";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useSearchParams } from "next/navigation";
import { InitialLoanResults } from "./InitialLoanResults";

// Define types
type LoanContextType = {
  loanDetails: LoanCalculationInputs;
  loanResults: LoanCalculationOutput | undefined;
  updateLoanDetails: (key: string, value: number | string | Date | any) => void;
  setLoanDetails: React.Dispatch<React.SetStateAction<LoanCalculationInputs>>;
  getMinimumEMIForMonth: (date: Date) => number;
  isLoading: boolean;
  isSharedLoading: boolean;
  isInitialLoad: boolean;
  isShared: boolean;
  sharedId?: string | null;
  conflictsExist: boolean;
  conflictingMonths: Array<{ month: string; types: string[] }>;
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
  const [isLoadingShared, setIsLoadingShared] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Use search params to get the shared ID if available
  const searchParams = useSearchParams();
  const sharedId = searchParams.get("share");

  // Use ref for timeout to avoid dependency cycle and track if we've loaded shared calculation
  const calculationTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const hasLoadedSharedRef = useRef<boolean>(false);
  
  // Load shared calculation if the ID is provided in the URL
  useEffect(() => {
    // Store current sharedId to avoid conflicts with new IDs
    const currentSharedId = sharedId;
    
    const loadSharedCalculation = async () => {
      // If no shared ID or we've already loaded this shared calculation, skip
      if (!currentSharedId || hasLoadedSharedRef.current) {
        setIsInitialLoad(false);
        return;
      }

      setIsLoadingShared(true);
      try {
        const result = await getSharedCalculation(currentSharedId);

        if (result.success && result.loanDetails) {
          setLoanDetails(result.loanDetails);
        } else {
          // console.error("Error loading shared calculation:", result.error);
        }
      } catch (error) {
        // console.error("Error loading shared calculation:", error);
      } finally {
        // Mark that we've loaded the shared calculation
        hasLoadedSharedRef.current = true;
        setIsLoadingShared(false);
        setIsInitialLoad(false);
      }
    };

    loadSharedCalculation();
    
    // Reset the loaded flag when sharedId changes
    return () => {
      if (currentSharedId !== sharedId) {
        hasLoadedSharedRef.current = false;
      }
    };
  }, [sharedId]);

  // Update specific loan detail field
  const updateLoanDetails = (key: string, value: any) => {
    setLoanDetails((prev) => ({ ...prev, [key]: value }));
  };

  // Detect conflicts in advance inputs
  const { conflictsExist, conflictingMonths } = useMemo(() => {
    const { interestRateChanges, emiChanges, prepayments } = loanDetails;
    const conflictMap = new Map<string, string[]>();

    // Helper to check if multiple changes exist for the same month
    const checkAndAddConflict = (date: Date | string, type: string) => {
      const monthYear = formatMonthYear(date);
      if (!conflictMap.has(monthYear)) {
        conflictMap.set(monthYear, [type]);
      } else {
        const existing = conflictMap.get(monthYear) || [];
        if (!existing.includes(type)) {
          conflictMap.set(monthYear, [...existing, type]);
        }
      }
    };

    // Check interest rate changes
    interestRateChanges?.forEach((change) => {
      checkAndAddConflict(change.effectiveDate, "interest rate");
    });

    // Check EMI changes
    emiChanges?.forEach((change) => {
      checkAndAddConflict(change.startDate, "EMI");
    });

    // Check prepayments
    prepayments?.forEach((prepay) => {
      // For one-time prepayments
      if (prepay.type === "onetime") {
        checkAndAddConflict(prepay.startDate, "prepayment");
      }
      // For recurring prepayments, check all months in the range
      else if (prepay.type === PrepaymentFrequency.Monthly) {
        const startDate = new Date(prepay.startDate);
        const endDate = prepay.endDate ? new Date(prepay.endDate) : null;

        if (!endDate) {
          checkAndAddConflict(startDate, "prepayment");
          return;
        }

        // For recurring prepayments with an end date, add all months in the range
        const currentDate = new Date(startDate);
        while (currentDate <= endDate) {
          checkAndAddConflict(new Date(currentDate), "prepayment");
          currentDate.setMonth(currentDate.getMonth() + 1);
        }
      }
    });

    // Filter to only months with multiple changes
    const conflicts = Array.from(conflictMap.entries())
      .filter(([_, types]) => types.length > 1)
      .map(([month, types]) => ({
        month,
        types,
      }));

    return {
      conflictsExist: conflicts.length > 0,
      conflictingMonths: conflicts,
    };
  }, [loanDetails]);

  useEffect(() => {
    // If initial load and no shared ID, set initial results
    if (isInitialLoad && !sharedId) {
      setLoanResults(InitialLoanResults);
      setIsInitialLoad(false);
      return;
    }
    
    // Skip recalculation if still in initial load or shared loading state
    if (isInitialLoad || isLoadingShared) {
      return;
    }
    
    // Clear any existing timeout to prevent stale calculations
    if (calculationTimeoutRef.current) {
      clearTimeout(calculationTimeoutRef.current);
    }

    // Set a new timeout to debounce the calculation
    const timeoutId = setTimeout(async () => {
      setIsLoading(true);
      try {
        const results = await calculateLoan(loanDetails);
        setLoanResults(results);
      } catch (error) {
        console.error("Error calculating loan:", error);
      } finally {
        setIsLoading(false);
      }
    }, 300); // 300ms debounce delay

    calculationTimeoutRef.current = timeoutId;

    // Cleanup
    return () => {
      if (calculationTimeoutRef.current) {
        clearTimeout(calculationTimeoutRef.current);
      }
    };
  }, [loanDetails, isInitialLoad, isLoadingShared, sharedId]);

  const getMinimumEMIForMonth = useCallback(
    (date: Date) => {
      if (!loanResults?.schedule) return 0;

      const month = date.getMonth();
      const year = date.getFullYear();

      const emiForMonth = loanResults.schedule.find(
        (emi) => emi.month === month && emi.year === year
      );

      if (!emiForMonth) return 0;

      return calculateMinimumEMI(
        emiForMonth.remainingBalance,
        emiForMonth.interestRate
      );
    },
    [loanResults]
  );
  return (
    <LoanContext.Provider
      value={{
        loanDetails,
        loanResults,
        getMinimumEMIForMonth,
        updateLoanDetails,
        setLoanDetails,
        isLoading: isLoading || isLoadingShared,
        isSharedLoading: isLoadingShared,
        isInitialLoad,
        isShared: !!sharedId,
        sharedId,
        conflictsExist,
        conflictingMonths,
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
