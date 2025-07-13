"use client";

import { AmountInput } from "@/components/common/AmountInput";
import { InterestInput } from "@/components/common/InterestInput";
import { TenureInput } from "@/components/common/TenureInput";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSip } from "@/contexts/SIPContext";
import { InvestmentFrequency } from "~lib/calqulation";
import { FC } from "react";
import { SipSummary } from "./SipSummary";
import { SIPYearlyBreakdown } from "./SIPYearlyBreakdown";
import { SipCharts } from "./SipChart";
import { SipCalculatorSkeleton } from "./SipCalculatorSkeleton";

export const SIPCalculator: FC = () => {
  const { sipInputs, updateSipInputs, isInitialLoad } = useSip();

  if (isInitialLoad) {
    return <SipCalculatorSkeleton />;
  }

  return (
    <div className="sm:rounded-xl bg-white/10 backdrop-blur-xl sm:p-1.5">
      <div className="bg-background sm:rounded-t-lg p-6 shadow-lg">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-2">
          <div>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold col-span-2 flex items-center">
                <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full mr-3 shadow-sm"></div>
                SIP details
              </h2>
              <Select
                value={sipInputs.investmentFrequency}
                onValueChange={(value: InvestmentFrequency) =>
                  updateSipInputs("investmentFrequency", value)
                }
              >
                <SelectTrigger className="">
                  <SelectValue placeholder="Select an impact" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value={InvestmentFrequency.MONTHLY}>
                      Monthly
                    </SelectItem>
                    <SelectItem value={InvestmentFrequency.QUARTERLY}>
                      Quarterly
                    </SelectItem>
                    <SelectItem value={InvestmentFrequency.HALF_YEARLY}>
                      Half-Yearly
                    </SelectItem>
                    <SelectItem value={InvestmentFrequency.YEARLY}>
                      Yearly
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 gap-x-6 mt-2">
              <AmountInput
                label="SIP Amount"
                id="sip-amount"
                title="Enter the monthly SIP amount"
                placeholder="Enter amount"
                name="sipAmount"
                required
                minValue={10}
                maxValue={10000000}
                value={sipInputs.sipAmount}
                onChange={(value) => {
                  updateSipInputs("sipAmount", Number(value));
                }}
                sliderMax={100000}
                sliderMin={10}
                step={1000}
                marks={[
                  {
                    value: 5000,
                    label: "5 K",
                  },
                  {
                    value: 15000,
                    label: "15 K",
                  },
                  {
                    value: 30000,
                    label: "30 K",
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
                label="Expected Return Rate"
                id="expected-return-rate"
                title="Enter the expected annual return rate in percentage"
                placeholder="Enter return rate"
                name="expectedReturnRate"
                required
                value={sipInputs.expectedReturnRate}
                maxValue={1000}
                minValue={0.1}
                onChange={(value) =>
                  updateSipInputs("expectedReturnRate", Number(value))
                }
                sliderMax={30}
                sliderMin={1}
                step={0.1}
              />
              <InterestInput
                label="Inflation Rate"
                id="inflation-rate"
                title="Enter the expected annual inflation rate in percentage"
                placeholder="Enter inflation rate"
                name="inflationRate"
                required
                value={sipInputs.inflationRate}
                maxValue={1000}
                minValue={0}
                onChange={(value) =>
                  updateSipInputs("inflationRate", Number(value))
                }
                sliderMax={30}
                sliderMin={0}
                step={0.1}
              />
              <InterestInput
                label="Yearly Step-Up Rate"
                id="yearly-step-up-rate"
                title="Enter the expected yearly step-up rate in percentage"
                placeholder="Enter step-up rate"
                name="yearlyStepUpRate"
                required
                value={sipInputs.yearlyStepUpRate}
                maxValue={1000}
                minValue={0}
                onChange={(value) =>
                  updateSipInputs("yearlyStepUpRate", Number(value))
                }
                sliderMax={30}
                sliderMin={0}
                step={0.1}
              />
              <TenureInput
                label="SIP Duration"
                id="sip-duration"
                title="Enter the SIP duration"
                placeholder="Enter duration"
                name="sipDurationInMonths"
                required
                defaultValue={sipInputs.sipDurationInMonths}
                onChange={(value) =>
                  updateSipInputs("sipDurationInMonths", Number(value))
                }
                minValue={6}
                maxValue={1200}
                step={6}
                sliderMax={360}
                sliderMin={12}
              />
            </div>
          </div>
          <div>
            <SipSummary />
          </div>
        </div>
      </div>

      <div className="bg-background sm:rounded-b-lg p-6 shadow-lg">
        <div className="mb-6">
          <SipCharts />
        </div>
        <SIPYearlyBreakdown />
      </div>
    </div>
  );
};
