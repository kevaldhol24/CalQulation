"use client";

import { FC } from "react";
import { useGoalBasedSIP } from "@/contexts/GoalBasedSIPContext";
import { AmountInput } from "@/components/common/AmountInput";
import { InterestInput } from "@/components/common/InterestInput";
import { TenureInput } from "@/components/common/TenureInput";
import { GoalBasedSIPCalculatorSkeleton } from "./GoalBasedSIPCalculatorSkeleton";
import { GoalBasedSIPSummary } from "./GoalBasedSIPSummary";
import { GoalBasedSIPCharts } from "./GoalBasedSIPCharts";
import { GoalBasedSIPYearlyBreakdown } from "./GoalBasedSIPYearlyBreakdown";

export const GoalBasedSIPCalculator: FC = () => {
  const { goalBasedSIPInputs, isInitialLoad, updateGoalBasedSIPInputs } =
    useGoalBasedSIP();

  if (isInitialLoad) {
    return <GoalBasedSIPCalculatorSkeleton />;
  }

  return (
    <div className="sm:rounded-xl bg-white/10 backdrop-blur-xl sm:p-1.5">
      <div className="bg-background sm:rounded-t-lg p-6 shadow-lg">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-2">
          <div>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold col-span-2 flex items-center">
                <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full mr-3 shadow-sm"></div>
                Goal details
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 gap-x-6 mt-2">
              <AmountInput
                label="Target Goal Amount"
                value={goalBasedSIPInputs.goalAmount}
                onChange={(value) =>
                  updateGoalBasedSIPInputs({ goalAmount: value || 0 })
                }
                min={1000}
                max={100000000}
                step={1000}
                placeholder="Enter goal amount"
              />

              <TenureInput
                label="Investment Duration (Years)"
                value={goalBasedSIPInputs.years * 12}
                onChange={(value) =>
                  updateGoalBasedSIPInputs({ years:  Number(value || 12) / 12 })
                }
                min={1}
                max={50}
                step={1}
                onlyYears
                placeholder="Investment period"
              />

              <InterestInput
                label="Expected Annual Return (%)"
                value={goalBasedSIPInputs.annualRate}
                onChange={(value) =>
                  updateGoalBasedSIPInputs({ annualRate: value || 1 })
                }
                min={1}
                max={30}
                step={0.1}
                placeholder="Expected return rate"
              />
            </div>
          </div>
          <div>
            <GoalBasedSIPSummary />
          </div>
        </div>
      </div>

      <div className="bg-background sm:rounded-b-lg p-6 shadow-lg">
        <div className="mb-6">
          <GoalBasedSIPCharts />
        </div>
        <GoalBasedSIPYearlyBreakdown />
      </div>
    </div>
  );
};
