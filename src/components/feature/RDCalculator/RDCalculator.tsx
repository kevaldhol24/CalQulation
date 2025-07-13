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
import { useRD } from "@/contexts/RDContext";
import { InvestmentFrequency } from "~lib/calqulation";
import { FC } from "react";
import { RDSummary } from "./RDSummary";
import { RDYearlyBreakdown } from "./RDYearlyBreakdown";
import { RDCharts } from "./RDCharts";
import { RDCalculatorSkeleton } from "./RDCalculatorSkeleton";

export const RDCalculator: FC = () => {
  const { rdInputs, updateRDInputs, isInitialLoad } = useRD();

  if (isInitialLoad) {
    return <RDCalculatorSkeleton />;
  }

  return (
    <div className="sm:rounded-xl bg-white/10 backdrop-blur-xl sm:p-1.5">
      <div className="bg-background sm:rounded-t-lg p-6 shadow-lg">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-2">
          <div>
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold col-span-2 flex items-center">
                <div className="w-1 h-6 bg-gradient-to-b from-orange-500 to-red-600 rounded-full mr-3 shadow-sm"></div>
                RD Details
              </h2>
              <Select
                value={rdInputs.investmentFrequency}
                onValueChange={(value: InvestmentFrequency) =>
                  updateRDInputs("investmentFrequency", value)
                }
              >
                <SelectTrigger className="">
                  <SelectValue placeholder="Select frequency" />
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
                label="RD Amount"
                id="rd-amount"
                title="Enter the monthly RD amount"
                placeholder="Enter amount"
                name="rdAmount"
                required
                minValue={100}
                maxValue={10000000}
                value={rdInputs.rdAmount}
                onChange={(value) => {
                  updateRDInputs("rdAmount", Number(value));
                }}
                sliderMax={50000}
                sliderMin={100}
                step={500}
                marks={[
                  {
                    value: 2000,
                    label: "2 K",
                  },
                  {
                    value: 5000,
                    label: "5 K",
                  },
                  {
                    value: 10000,
                    label: "10 K",
                  },
                  {
                    value: 20000,
                    label: "20 K",
                  },
                  {
                    value: 30000,
                    label: "30 K",
                  },
                  {
                    value: 50000,
                    label: "50 K",
                  },
                ]}
              />
              <InterestInput
                label="Annual Interest Rate"
                id="rd-interest-rate"
                title="Enter the RD annual interest rate in percentage"
                placeholder="Enter interest rate"
                name="expectedReturnRate"
                required
                value={rdInputs.expectedReturnRate}
                maxValue={15}
                minValue={1}
                onChange={(value) =>
                  updateRDInputs("expectedReturnRate", Number(value))
                }
                step={0.1}
              />
              <TenureInput
                label="RD Duration"
                id="rd-duration"
                title="Enter the RD duration"
                placeholder="Enter duration"
                name="rdDurationInMonths"
                required
                defaultValue={rdInputs.rdDurationInMonths}
                onChange={(value) =>
                  updateRDInputs("rdDurationInMonths", Number(value))
                }
                minValue={12}
                maxValue={240}
                step={6}
              />
            </div>
          </div>
          <div>
            <RDSummary />
          </div>
        </div>
      </div>

      <div className="bg-background sm:rounded-b-lg p-6 shadow-lg">
        <div className="mb-6">
          <RDCharts />
        </div>
        <RDYearlyBreakdown />
      </div>
    </div>
  );
};
