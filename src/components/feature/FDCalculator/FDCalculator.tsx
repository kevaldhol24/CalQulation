"use client";

import React from "react";
import { useFD } from "@/contexts/FDContext";
import { AmountInput } from "@/components/common/AmountInput";
import { InterestInput } from "@/components/common/InterestInput";
import { TenureInput } from "@/components/common/TenureInput";
import { FrequencyInput } from "@/components/common/FrequencyInput";
import { FDCalculatorSkeleton } from "./FDCalculatorSkeleton";
import { FDSummary } from "./FDSummary";
import { FDCharts } from "./FDCharts";
import { FDYearlyBreakdown } from "./FDYearlyBreakdown";

export const FDCalculator: React.FC = () => {
  const { fdInputs, updateFDInputs, isInitialLoad } = useFD();

  if (isInitialLoad) {
    return <FDCalculatorSkeleton />;
  }

  return (
    <div className="sm:rounded-xl bg-white/10 backdrop-blur-xl sm:p-1.5">
      <div className="bg-background sm:rounded-t-lg p-6 shadow-lg">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-2">
          <div>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold col-span-2 flex items-center">
                <div className="w-1 h-6 bg-gradient-to-b from-green-500 to-blue-600 rounded-full mr-3 shadow-sm"></div>
                Fixed Deposit Details
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 gap-x-6 mt-2">
              <AmountInput
                label="FD Amount"
                id="fd-amount"
                title="Enter the fixed deposit amount"
                placeholder="Enter amount"
                name="principal"
                required
                minValue={1000}
                maxValue={100000000}
                value={fdInputs.principal}
                onChange={(value) => {
                  updateFDInputs({ principal: Number(value) });
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
                label="Annual Interest Rate"
                id="fd-interest-rate"
                title="Enter the FD annual interest rate in percentage"
                placeholder="Enter interest rate"
                name="annualRate"
                required
                value={fdInputs.annualRate}
                maxValue={15}
                minValue={1}
                onChange={(value) =>
                  updateFDInputs({ annualRate: Number(value) })
                }
                step={0.1}
              />
              <TenureInput
                label="FD Tenure (Years)"
                id="fd-tenure"
                title="Enter the FD tenure"
                placeholder="Enter duration"
                name="years"
                required
                defaultValue={fdInputs.years * 12} // Convert years to months for the component
                onChange={
                  (value) => updateFDInputs({ years: Number(value) / 12 }) // Convert months back to years
                }
                onlyYears
                minValue={12}
                maxValue={240}
                step={12}
              />
              <FrequencyInput
                label="Interest Compounding"
                id="fd-compounding"
                title="Select how often interest is compounded"
                name="compoundingFrequency"
                required
                value={fdInputs.compoundingFrequency}
                onChange={(value) =>
                  updateFDInputs({ compoundingFrequency: Number(value) })
                }
              />
            </div>
          </div>
          <div>
            <FDSummary />
          </div>
        </div>
      </div>

      <div className="bg-background sm:rounded-b-lg p-6 shadow-lg">
        <div className="mb-6">
          <FDCharts />
        </div>
        <FDYearlyBreakdown />
      </div>
    </div>
  );
};
