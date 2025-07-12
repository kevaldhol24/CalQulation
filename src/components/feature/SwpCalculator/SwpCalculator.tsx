"use client";

import React from "react";
import { useSwp } from "@/contexts/SwpContext";
import { AmountInput } from "@/components/common/AmountInput";
import { TenureInput } from "@/components/common/TenureInput";
import { InterestInput } from "@/components/common/InterestInput";
import { SwpSummary } from "./SwpSummary";
import { SwpCharts } from "./SwpCharts";
import { SwpYearlyBreakdown } from "./SwpYearlyBreakdown";
import { SwpCalculatorSkeleton } from "./SwpCalculatorSkeleton";

export const SwpCalculator: React.FC = () => {
  const { swpInputs, updateSwpInputs, isLoading } = useSwp();

  if (isLoading) {
    return <SwpCalculatorSkeleton />;
  }

  return (
    <div className="sm:rounded-xl bg-white/10 backdrop-blur-xl sm:p-1.5">
      <div className="bg-background sm:rounded-t-lg p-6 shadow-lg">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-2">
          <div>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold col-span-2 flex items-center">
                <div className="w-1 h-6 bg-gradient-to-b from-orange-500 to-red-600 rounded-full mr-3 shadow-sm"></div>
                SWP details
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 gap-x-6 mt-2">
              <AmountInput
                label="Initial Investment Amount"
                id="initial-investment"
                title="Enter the initial investment amount"
                placeholder="Enter amount"
                name="principal"
                required
                minValue={100000}
                maxValue={100000000}
                value={swpInputs.principal}
                onChange={(value) => {
                  updateSwpInputs({ principal: Number(value) });
                }}
                sliderMax={10000000}
                sliderMin={100000}
                step={50000}
                marks={[
                  {
                    value: 500000,
                    label: "5 L",
                  },
                  {
                    value: 1500000,
                    label: "15 L",
                  },
                  {
                    value: 3000000,
                    label: "30 L",
                  },
                  {
                    value: 5000000,
                    label: "50 L",
                  },
                  {
                    value: 7500000,
                    label: "75 L",
                  },
                  {
                    value: 10000000,
                    label: "1 Cr",
                  },
                ]}
              />

              <AmountInput
                label="Monthly Withdrawal Amount"
                id="monthly-withdrawal"
                title="Enter the monthly withdrawal amount"
                placeholder="Enter withdrawal amount"
                name="monthlyWithDrawal"
                required
                minValue={1000}
                maxValue={1000000}
                value={swpInputs.monthlyWithDrawal}
                onChange={(value) => {
                  updateSwpInputs({ monthlyWithDrawal: Number(value) });
                }}
                sliderMax={100000}
                sliderMin={1000}
                step={1000}
                marks={[
                  {
                    value: 10000,
                    label: "10 K",
                  },
                  {
                    value: 25000,
                    label: "25 K",
                  },
                  {
                    value: 50000,
                    label: "50 K",
                  },
                  {
                    value: 75000,
                    label: "75 K",
                  },
                  {
                    value: 100000,
                    label: "1 L",
                  },
                ]}
              />

              <InterestInput
                label="Expected Annual Return"
                id="expected-return-rate"
                title="Enter the expected annual return rate in percentage"
                placeholder="Enter return rate"
                name="annualRate"
                required
                value={swpInputs.annualRate}
                maxValue={1000}
                minValue={0.1}
                onChange={(value) =>
                  updateSwpInputs({ annualRate: Number(value) })
                }
                sliderMax={30}
                sliderMin={1}
                step={0.1}
              />

              <TenureInput
                label="Withdrawal Period"
                id="withdrawal-period"
                title="Enter the withdrawal period"
                placeholder="Enter duration"
                name="years"
                required
                defaultValue={swpInputs.years * 12}
                onChange={(value) =>
                  updateSwpInputs({ years: Number(value) / 12 })
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
            <SwpSummary />
          </div>
        </div>
      </div>

      <div className="bg-background sm:rounded-b-lg p-6 shadow-lg">
        <div className="mb-6">
          <SwpCharts />
        </div>
        <SwpYearlyBreakdown />
      </div>
    </div>
  );
};
