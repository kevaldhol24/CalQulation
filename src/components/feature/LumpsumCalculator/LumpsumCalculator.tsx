"use client";

import { AmountInput } from "@/components/common/AmountInput";
import { InterestInput } from "@/components/common/InterestInput";
import { TenureInput } from "@/components/common/TenureInput";
import { useLumpsum } from "@/contexts/LumpsumContext";
import { FC } from "react";
import { LumpsumSummary } from "./LumpsumSummary";
import { LumpsumYearlyBreakdown } from "./LumpsumYearlyBreakdown";
import { LumpsumCharts } from "./LumpsumCharts";
import { LumpsumCalculatorSkeleton } from "./LumpsumCalculatorSkeleton";

export const LumpsumCalculator: FC = () => {
  const { lumpsumInputs, updateLumpsumInputs, isInitialLoad } = useLumpsum();

  if (isInitialLoad) {
    return <LumpsumCalculatorSkeleton />;
  }

  return (
    <div className="sm:rounded-xl bg-white/10 backdrop-blur-xl sm:p-1.5">
      <div className="bg-background sm:rounded-t-lg p-6 shadow-lg">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-2">
          <div>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold col-span-2 flex items-center">
                <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full mr-3 shadow-sm"></div>
                Lumpsum details
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 gap-x-6 mt-2">
              <AmountInput
                label="Investment Amount"
                id="lumpsum-amount"
                title="Enter the total lumpsum investment amount"
                placeholder="Enter amount"
                name="principal"
                required
                minValue={1000}
                maxValue={100000000}
                value={lumpsumInputs.principal}
                onChange={(value) => {
                  updateLumpsumInputs("principal", Number(value));
                }}
                sliderMax={1000000}
                sliderMin={1000}
                step={10000}
                marks={[
                  {
                    value: 100000,
                    label: "1 L",
                  },
                  {
                    value: 300000,
                    label: "3 L",
                  },
                  {
                    value: 500000,
                    label: "5 L",
                  },
                  {
                    value: 750000,
                    label: "7.5 L",
                  },
                  {
                    value: 1000000,
                    label: "10 L",
                  },
                ]}
              />
              <InterestInput
                label="Expected Return Rate"
                id="expected-return-rate"
                title="Enter the expected annual return rate in percentage"
                placeholder="Enter return rate"
                name="annualRate"
                required
                value={lumpsumInputs.annualRate}
                maxValue={1000}
                minValue={0.1}
                onChange={(value) =>
                  updateLumpsumInputs("annualRate", Number(value))
                }
                sliderMax={30}
                sliderMin={1}
                step={0.1}
              />
              <TenureInput
                label="Investment Duration"
                id="investment-duration"
                title="Enter the investment duration"
                placeholder="Enter duration"
                name="years"
                required
                defaultValue={lumpsumInputs.years * 12} // Convert years to months for the component
                onChange={
                  (value) => updateLumpsumInputs("years", Number(value) / 12) // Convert months back to years
                }
                minValue={12}
                maxValue={600}
                step={12}
                sliderMax={360}
                sliderMin={12}
              />
            </div>
          </div>
          <div>
            <LumpsumSummary />
          </div>
        </div>
      </div>

      <div className="bg-background sm:rounded-b-lg p-6 shadow-lg">
        <div className="mb-6">
          <LumpsumCharts />
        </div>
        <LumpsumYearlyBreakdown />
      </div>
    </div>
  );
};
