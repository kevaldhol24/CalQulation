"use client";

import { calculateSip } from "@/services/SipService";
import { InvestmentFrequency, SIPCalculationResult } from "~lib/calqulation";
import {
  createContext,
  FC,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

export type SIPInputs = {
  sipAmount: number;
  sipDurationInMonths: number;
  expectedReturnRate: number;
  yearlyStepUpRate?: number;
  inflationRate?: number;
  investmentFrequency?: InvestmentFrequency;
};

interface SIPContext {
  sipInputs: SIPInputs;
  sipResults: SIPCalculationResult | null; // Replace 'any' with the actual type if known
  isLoading: boolean;
  updateSipInputs: <K extends keyof SIPInputs>(
    key: K,
    value: SIPInputs[K]
  ) => void;
  isInitialLoad: boolean;
}

const initialSIPData: SIPContext = {
  sipInputs: {
    sipAmount: 5000,
    sipDurationInMonths: 120,
    expectedReturnRate: 12,
    yearlyStepUpRate: 0,
    inflationRate: 5,
    investmentFrequency: InvestmentFrequency.MONTHLY,
  },
  updateSipInputs: () => {},
  sipResults: {
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

const SIPContext = createContext<SIPContext>(initialSIPData);

interface SIPProviderProps {
  children: React.ReactNode;
}

export const SipProvider: FC<SIPProviderProps> = ({ children }) => {
  const [sipInputs, setSipInputs] = useState<SIPInputs>(
    initialSIPData.sipInputs
  );
  const [isLoading, setIsLoading] = useState(false);
  const [sipResults, setSipResults] = useState<SIPCalculationResult | null>(
    null
  ); // Replace 'any' with the actual type if known
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const sipInputsRef = useRef<SIPInputs>(sipInputs);
  const isFirstRender = useRef(true);

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      setIsLoading(true);
      const refInputs = sipInputsRef.current;
      if (
        !isFirstRender.current &&
        refInputs.sipAmount === sipInputs.sipAmount &&
        refInputs.sipDurationInMonths === sipInputs.sipDurationInMonths &&
        refInputs.expectedReturnRate === sipInputs.expectedReturnRate &&
        refInputs.yearlyStepUpRate === sipInputs.yearlyStepUpRate &&
        refInputs.inflationRate === sipInputs.inflationRate &&
        refInputs.investmentFrequency === sipInputs.investmentFrequency
      ) {
        setIsLoading(false);
        isFirstRender.current = false;
        return;
      }
      isFirstRender.current = false;
      sipInputsRef.current = sipInputs;

      const fetchSipCalculation = async () => {
        try {
          const results = await calculateSip(sipInputs);
          setSipResults(results);
        } catch (_e) {
          setSipResults(initialSIPData.sipResults);
          console.error("Error calculating SIP:", _e);
        } finally {
          setIsLoading(false);
          setIsInitialLoad(false);
        }
      };

      fetchSipCalculation();
    }, 300);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [sipInputs]);

  const updateSipInputs = <K extends keyof SIPInputs>(
    key: K,
    value: SIPInputs[K]
  ) => {
    setSipInputs((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <SIPContext.Provider
      value={{
        sipInputs,
        updateSipInputs,
        sipResults,
        isLoading,
        isInitialLoad,
      }}
    >
      {children}
    </SIPContext.Provider>
  );
};

export const useSip = () => {
  return useContext(SIPContext);
};
