"use client";

import React, { useState, useMemo } from "react";
import { useCompoundInterest } from "@/contexts/CompoundInterestContext";
import { currency } from "@/services/CurrencyService";
import { CollapsibleWrapper } from "@/components/common/CollapsibleWrapper";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  AreaChart,
  Area,
} from "recharts";

export const CompoundInterestCharts: React.FC = () => {
  const { compoundResults, isLoading, compoundInputs } = useCompoundInterest();
  const { formateCurrency } = currency();
  const [isExpanded, setIsExpanded] = useState(true);

  const pieData = useMemo(() => {
    if (!compoundResults) return [];

    const totalContributions =
      compoundInputs.principal +
      (compoundInputs.additionalContribution || 0) *
        compoundInputs.compoundingFrequency *
        compoundInputs.years;

    return [
      {
        name: "Initial Investment",
        value: compoundInputs.principal,
        color: "#3B82F6", // blue
      },
      {
        name: "Additional Contributions",
        value: totalContributions - compoundInputs.principal,
        color: "#8B5CF6", // purple
      },
      {
        name: "Interest Earned",
        value: compoundResults.totalInterest,
        color: "#10B981", // green
      },
    ];
  }, [compoundResults, compoundInputs]);

  const progressData = useMemo(() => {
    if (!compoundResults) return [];

    return compoundResults.schedule.map((item) => ({
      year: item.year,
      amount: item.amount,
      principal:
        compoundInputs.principal +
        (compoundInputs.additionalContribution || 0) *
          compoundInputs.compoundingFrequency *
          (item.year - 1),
      interest:
        item.amount -
        (compoundInputs.principal +
          (compoundInputs.additionalContribution || 0) *
            compoundInputs.compoundingFrequency *
            (item.year - 1)),
    }));
  }, [compoundResults, compoundInputs]);

  const yearlyData = useMemo(() => {
    if (!compoundResults) return [];

    return compoundResults.schedule.map((item, index) => {
      const prevAmount =
        index > 0
          ? compoundResults.schedule[index - 1].amount
          : compoundInputs.principal;
      const yearlyGrowth =
        item.amount -
        prevAmount -
        (compoundInputs.additionalContribution || 0) *
          compoundInputs.compoundingFrequency;

      return {
        year: item.year,
        yearlyGrowth: Math.max(0, yearlyGrowth),
        totalAmount: item.amount,
      };
    });
  }, [compoundResults, compoundInputs]);

  const ChartLoadingState = () => (
    <div className="space-y-4">
      <CollapsibleWrapper
        title="Growth Visualization"
        id="compound-interest-charts"
        isExpanded={isExpanded}
        onToggle={(opened) => setIsExpanded(opened)}
      >
        <div className="h-64 bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse" />
      </CollapsibleWrapper>
    </div>
  );

  if (isLoading || !compoundResults) {
    return ChartLoadingState();
  }

  return (
    <CollapsibleWrapper
      title="Growth Visualization"
      id="compound-interest-charts"
      isExpanded={isExpanded}
      onToggle={() => setIsExpanded(!isExpanded)}
    >
      <Tabs defaultValue="breakdown" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="breakdown">Breakdown</TabsTrigger>
          <TabsTrigger value="progress">Progress</TabsTrigger>
          <TabsTrigger value="yearly">Yearly Growth</TabsTrigger>
        </TabsList>

        <TabsContent value="breakdown" className="space-y-4">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number) => [formateCurrency(value), ""]}
                  labelFormatter={(label) => label}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            {pieData.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-muted-foreground">{item.name}</span>
                <span className="font-medium">
                  {formateCurrency(item.value)}
                </span>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="progress" className="space-y-4">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={progressData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis tickFormatter={(value) => formateCurrency(value)} />
                <Tooltip
                  formatter={(value: number, name: string) => [
                    formateCurrency(value),
                    name === "amount"
                      ? "Total Value"
                      : name === "principal"
                      ? "Contributions"
                      : "Interest",
                  ]}
                  labelFormatter={(label) => `Year ${label}`}
                />
                <Area
                  type="monotone"
                  dataKey="principal"
                  stackId="1"
                  stroke="#3B82F6"
                  fill="#3B82F6"
                  fillOpacity={0.6}
                />
                <Area
                  type="monotone"
                  dataKey="interest"
                  stackId="1"
                  stroke="#10B981"
                  fill="#10B981"
                  fillOpacity={0.8}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>

        <TabsContent value="yearly" className="space-y-4">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={yearlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis tickFormatter={(value) => formateCurrency(value)} />
                <Tooltip
                  formatter={(value: number, name: string) => [
                    formateCurrency(value),
                    name === "yearlyGrowth" ? "Yearly Growth" : "Total Amount",
                  ]}
                  labelFormatter={(label) => `Year ${label}`}
                />
                <Line
                  type="monotone"
                  dataKey="yearlyGrowth"
                  stroke="#10B981"
                  strokeWidth={3}
                  dot={{ fill: "#10B981", strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>
      </Tabs>
    </CollapsibleWrapper>
  );
};
