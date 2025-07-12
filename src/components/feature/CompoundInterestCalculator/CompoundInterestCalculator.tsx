"use client";

import React from "react";
import { useCompoundInterest } from "@/contexts/CompoundInterestContext";
import { AmountInput } from "@/components/common/AmountInput";
import { InterestInput } from "@/components/common/InterestInput";
import { TenureInput } from "@/components/common/TenureInput";
import { FrequencyInput } from "@/components/common/FrequencyInput";
import { CompoundInterestCalculatorSkeleton } from "./CompoundInterestCalculatorSkeleton";
import { CompoundInterestSummary } from "./CompoundInterestSummary";
import { CompoundInterestCharts } from "./CompoundInterestCharts";
import { CompoundInterestYearlyBreakdown } from "./CompoundInterestYearlyBreakdown";

export const CompoundInterestCalculator: React.FC = () => {
  const { compoundInputs, updateCompoundInputs, isInitialLoad } =
    useCompoundInterest();

  if (isInitialLoad) {
    return <CompoundInterestCalculatorSkeleton />;
  }

  return (
    <div className="sm:rounded-xl bg-white/10 backdrop-blur-xl sm:p-1.5">
      <div className="bg-background sm:rounded-t-lg p-6 shadow-lg">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-2">
          <div>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold col-span-2 flex items-center">
                <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full mr-3 shadow-sm"></div>
                Investment Details
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 gap-x-6 mt-2">
              <AmountInput
                label="Initial Investment"
                id="principal-amount"
                title="Enter the initial principal amount"
                placeholder="Enter amount"
                name="principal"
                required
                minValue={1000}
                maxValue={100000000}
                value={compoundInputs.principal}
                onChange={(value) => {
                  updateCompoundInputs({ principal: Number(value) });
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
                id="interest-rate"
                title="Enter the annual interest rate in percentage"
                placeholder="Enter interest rate"
                name="annualRate"
                required
                value={compoundInputs.annualRate}
                maxValue={1000}
                minValue={0.1}
                onChange={(value) =>
                  updateCompoundInputs({ annualRate: Number(value) })
                }
                sliderMax={30}
                sliderMin={1}
                step={0.1}
              />
              <TenureInput
                label="Investment Period (Years)"
                id="investment-years"
                title="Enter the investment period"
                placeholder="Enter duration"
                name="years"
                required
                defaultValue={compoundInputs.years * 12} // Convert years to months for the component
                onChange={
                  (value) => updateCompoundInputs({ years: Number(value) / 12 }) // Convert months back to years
                }
                onlyYears
                minValue={12}
                maxValue={600}
                step={12}
                sliderMax={360}
                sliderMin={12}
              />
              <FrequencyInput
                label="Compounding Frequency"
                id="compounding-frequency"
                title="Select how often interest is compounded"
                name="compoundingFrequency"
                required
                value={compoundInputs.compoundingFrequency}
                onChange={(value) =>
                  updateCompoundInputs({ compoundingFrequency: Number(value) })
                }
              />
              <AmountInput
                label="Additional Contribution (Per Period)"
                id="additional-contribution"
                title="Enter additional periodic contribution (optional)"
                placeholder="Enter amount"
                name="additionalContribution"
                value={compoundInputs.additionalContribution || 0}
                onChange={(value) => {
                  updateCompoundInputs({
                    additionalContribution: Number(value) || 0,
                  });
                }}
                hideSlider={true}
              />
            </div>
          </div>
          <div>
            <CompoundInterestSummary />
          </div>
        </div>
      </div>

      <div className="bg-background sm:rounded-b-lg p-6 shadow-lg">
        <div className="mb-6">
          <CompoundInterestCharts />
        </div>
        <CompoundInterestYearlyBreakdown />
      </div>
    </div>
  );
};
