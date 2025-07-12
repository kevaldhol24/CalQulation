"use client";

import React, { useState, useMemo } from "react";
import { useSwp } from "@/contexts/SwpContext";
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
  BarChart,
  Bar,
} from "recharts";

export const SwpCharts: React.FC = () => {
  const { swpResults, isLoading } = useSwp();
  const { formateCurrency } = currency();
  const [isExpanded, setIsExpanded] = useState(true);

  const pieData = useMemo(() => {
    if (!swpResults) return [];
    
    return [
      {
        name: "Total Withdrawals",
        value: swpResults.totalWithdrawals,
        color: "#EF4444", // red
      },
      {
        name: "Interest Earned",
        value: Math.max(0, swpResults.totalInterest),
        color: "#10B981", // green
      },
      {
        name: "Remaining Balance",
        value: swpResults.totalAmount,
        color: "#F97316", // orange
      },
    ];
  }, [swpResults]);

  const progressData = useMemo(() => {
    if (!swpResults?.schedule) return [];
    
    return swpResults.schedule.map((item, index) => ({
      period: `Y${item.year}M${item.month}`,
      month: index + 1,
      balance: item.closingAmount,
      withdrawal: item.withdrawal,
      interest: item.interest,
    }));
  }, [swpResults]);

  const yearlyData = useMemo(() => {
    if (!swpResults?.schedule) return [];
    
    interface YearlyAcc {
      [year: number]: {
        year: string;
        totalWithdrawal: number;
        totalInterest: number;
        endBalance: number;
      };
    }
    
    const yearlyMap = swpResults.schedule.reduce((acc: YearlyAcc, item) => {
      const existing = acc[item.year];
      if (existing) {
        existing.totalWithdrawal += item.withdrawal;
        existing.totalInterest += item.interest;
        existing.endBalance = item.closingAmount;
      } else {
        acc[item.year] = {
          year: `Year ${item.year}`,
          totalWithdrawal: item.withdrawal,
          totalInterest: item.interest,
          endBalance: item.closingAmount,
        };
      }
      return acc;
    }, {} as YearlyAcc);

    return Object.values(yearlyMap);
  }, [swpResults]);

  const ChartLoadingState = () => (
    <div className="space-y-4">
      <CollapsibleWrapper
        title="SWP Charts"
        id="swp-charts-loading"
        isExpanded={isExpanded}
        onToggle={(opened) => setIsExpanded(opened)}
      >
        <div className="h-64 bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse" />
      </CollapsibleWrapper>
    </div>
  );

  if (isLoading || !swpResults) {
    return <ChartLoadingState />;
  }

  const CustomTooltip = ({ active, payload, label }: {
    active?: boolean;
    payload?: Array<{
      color: string;
      dataKey: string;
      value: number;
    }>;
    label?: string;
  }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-3 border rounded-lg shadow-lg">
          <p className="font-medium">{label}</p>
          {payload.map((entry: {
            color: string;
            dataKey: string;
            value: number;
          }, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.dataKey === "balance" && `Balance: ${formateCurrency(entry.value)}`}
              {entry.dataKey === "withdrawal" && `Withdrawal: ${formateCurrency(entry.value)}`}
              {entry.dataKey === "interest" && `Interest: ${formateCurrency(entry.value)}`}
              {entry.dataKey === "totalWithdrawal" && `Total Withdrawal: ${formateCurrency(entry.value)}`}
              {entry.dataKey === "totalInterest" && `Total Interest: ${formateCurrency(entry.value)}`}
              {entry.dataKey === "endBalance" && `End Balance: ${formateCurrency(entry.value)}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <CollapsibleWrapper
      title="SWP Charts"
      id="swp-charts"
      isExpanded={isExpanded}
      onToggle={(opened) => setIsExpanded(opened)}
    >
      <Tabs defaultValue="breakdown" className="w-full">
        <TabsList className="grid w-full grid-cols-3 overflow-auto">
          <TabsTrigger value="breakdown" className="min-w-min">Breakdown</TabsTrigger>
          <TabsTrigger value="progress" className="min-w-min">Progress</TabsTrigger>
          <TabsTrigger value="yearly" className="min-w-min">Yearly</TabsTrigger>
        </TabsList>

        <TabsContent value="breakdown" className="space-y-4">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(1)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number) => formateCurrency(value)}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>

        <TabsContent value="progress" className="space-y-4">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={progressData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="period" />
                <YAxis tickFormatter={(value) => formateCurrency(value)} />
                <Tooltip content={<CustomTooltip />} />
                <Line 
                  type="monotone" 
                  dataKey="balance" 
                  stroke="#F97316" 
                  strokeWidth={3}
                  name="Remaining Balance"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>

        <TabsContent value="yearly" className="space-y-4">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={yearlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis tickFormatter={(value) => formateCurrency(value)} />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey="totalWithdrawal" 
                  stackId="a" 
                  fill="#EF4444" 
                  name="Total Withdrawal"
                />
                <Bar 
                  dataKey="totalInterest" 
                  stackId="a" 
                  fill="#10B981" 
                  name="Interest Earned"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>
      </Tabs>
    </CollapsibleWrapper>
  );
};
