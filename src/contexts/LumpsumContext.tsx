"use client";

import { calculateLumpsum } from "@/services/LumpsumService";
import { LumpsumInputs, LumpsumOutput } from "~lib/calqulation";
import {
  createContext,
  FC,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

interface LumpsumContext {
  lumpsumInputs: LumpsumInputs;
  lumpsumResults: LumpsumOutput | null;
  isLoading: boolean;
  updateLumpsumInputs: <K extends keyof LumpsumInputs>(
    key: K,
    value: LumpsumInputs[K]
  ) => void;
  isInitialLoad: boolean;
}

const initialLumpsumData: LumpsumContext = {
  lumpsumInputs: {
    principal: 100000,
    annualRate: 12,
    years: 10,
  },
  updateLumpsumInputs: () => {},
  lumpsumResults: {
    principal: 100000,
    totalAmount: 310584.82,
    totalInterest: 210584.82,
    schedule: [],
  },
  isLoading: false,
  isInitialLoad: true,
};

const LumpsumContext = createContext<LumpsumContext>(initialLumpsumData);

interface LumpsumProviderProps {
  children: React.ReactNode;
}

export const LumpsumProvider: FC<LumpsumProviderProps> = ({ children }) => {
  const [lumpsumInputs, setLumpsumInputs] = useState<LumpsumInputs>(
    initialLumpsumData.lumpsumInputs
  );
  const [isLoading, setIsLoading] = useState(false);
  const [lumpsumResults, setLumpsumResults] = useState<LumpsumOutput | null>(
    null
  );
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const lumpsumInputsRef = useRef<LumpsumInputs>(lumpsumInputs);
  const isFirstRender = useRef(true);

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      setIsLoading(true);
      const refInputs = lumpsumInputsRef.current;
      if (
        !isFirstRender.current &&
        refInputs.principal === lumpsumInputs.principal &&
        refInputs.annualRate === lumpsumInputs.annualRate &&
        refInputs.years === lumpsumInputs.years
      ) {
        setIsLoading(false);
        isFirstRender.current = false;
        return;
      }
      isFirstRender.current = false;
      lumpsumInputsRef.current = lumpsumInputs;

      const fetchLumpsumCalculation = async () => {
        try {
          const results = await calculateLumpsum(lumpsumInputs);
          setLumpsumResults(results);
        } catch (_e) {
          setLumpsumResults(initialLumpsumData.lumpsumResults);
          console.error("Error calculating Lumpsum:", _e);
        } finally {
          setIsLoading(false);
          setIsInitialLoad(false);
        }
      };

      fetchLumpsumCalculation();
    }, 300);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [lumpsumInputs]);

  const updateLumpsumInputs = <K extends keyof LumpsumInputs>(
    key: K,
    value: LumpsumInputs[K]
  ) => {
    setLumpsumInputs((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <LumpsumContext.Provider
      value={{
        lumpsumInputs,
        updateLumpsumInputs,
        lumpsumResults,
        isLoading,
        isInitialLoad,
      }}
    >
      {children}
    </LumpsumContext.Provider>
  );
};

export const useLumpsum = () => {
  return useContext(LumpsumContext);
};
