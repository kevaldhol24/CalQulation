"use client";

import { calculateRD } from "@/services/RDService";
import { InvestmentFrequency, SIPCalculationResult } from "loanwise";
import {
  createContext,
  FC,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

export type RDInputs = {
  rdAmount: number;
  rdDurationInMonths: number;
  expectedReturnRate: number;
  investmentFrequency?: InvestmentFrequency;
};

interface RDContext {
  rdInputs: RDInputs;
  rdResults: SIPCalculationResult | null;
  isLoading: boolean;
  updateRDInputs: <K extends keyof RDInputs>(
    key: K,
    value: RDInputs[K]
  ) => void;
  isInitialLoad: boolean;
}

const initialRDData: RDContext = {
  rdInputs: {
    rdAmount: 5000,
    rdDurationInMonths: 60, // 5 years default
    expectedReturnRate: 6.5, // Typical RD rate
    investmentFrequency: InvestmentFrequency.MONTHLY,
  },
  updateRDInputs: () => {},
  rdResults: {
    maturityAmount: 0,
    totalInvestedAmount: 0,
    wealthGain: 0,
    yearlyBreakdown: [],
    inflationAdjustedMaturityAmount: 0,
    inflationAdjustedWealthGain: 0,
  },
  isLoading: false,
  isInitialLoad: true,
};

const RDContext = createContext<RDContext>(initialRDData);

interface RDProviderProps {
  children: React.ReactNode;
}

export const RDProvider: FC<RDProviderProps> = ({ children }) => {
  const [rdInputs, setRDInputs] = useState<RDInputs>(
    initialRDData.rdInputs
  );
  const [isLoading, setIsLoading] = useState(false);
  const [rdResults, setRDResults] = useState<SIPCalculationResult | null>(
    null
  );
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const rdInputsRef = useRef<RDInputs>(rdInputs);
  const isFirstRender = useRef(true);

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      setIsLoading(true);
      const refInputs = rdInputsRef.current;
      if (
        !isFirstRender.current &&
        refInputs.rdAmount === rdInputs.rdAmount &&
        refInputs.rdDurationInMonths === rdInputs.rdDurationInMonths &&
        refInputs.expectedReturnRate === rdInputs.expectedReturnRate &&
        refInputs.investmentFrequency === rdInputs.investmentFrequency
      ) {
        setIsLoading(false);
        isFirstRender.current = false;
        return;
      }
      isFirstRender.current = false;
      rdInputsRef.current = rdInputs;

      const fetchRDCalculation = async () => {
        try {
          const results = await calculateRD(rdInputs);
          setRDResults(results);
        } catch (_e) {
          setRDResults(initialRDData.rdResults);
          console.error("Error calculating RD:", _e);
        } finally {
          setIsLoading(false);
          setIsInitialLoad(false);
        }
      };

      fetchRDCalculation();
    }, 300);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [rdInputs]);

  const updateRDInputs = <K extends keyof RDInputs>(
    key: K,
    value: RDInputs[K]
  ) => {
    setRDInputs((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <RDContext.Provider
      value={{
        rdInputs,
        updateRDInputs,
        rdResults,
        isLoading,
        isInitialLoad,
      }}
    >
      {children}
    </RDContext.Provider>
  );
};

export const useRD = () => {
  return useContext(RDContext);
};
