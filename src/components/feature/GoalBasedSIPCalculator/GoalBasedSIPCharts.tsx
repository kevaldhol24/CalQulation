"use client";

import { CollapsibleWrapper } from "@/components/common/CollapsibleWrapper";
import { useGoalBasedSIP } from "@/contexts/GoalBasedSIPContext";
import { FC, useMemo, useState } from "react";
import { 
  PieChart, 
  Pie, 
  Cell, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line
} from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { currency } from "@/services/CurrencyService";

export const GoalBasedSIPCharts: FC = () => {
  const { goalBasedSIPResults, isLoading } = useGoalBasedSIP();
  const { formateCurrency } = currency();
  const [isExpanded, setIsExpanded] = useState(true);

  const pieData = useMemo(() => {
    if (!goalBasedSIPResults) return [];
    
    return [
      {
        name: "Total Investment",
        value: goalBasedSIPResults.totalInvestment,
        color: "#3B82F6", // blue
      },
      {
        name: "Wealth Gained",
        value: goalBasedSIPResults.goalAmount - goalBasedSIPResults.totalInvestment,
        color: "#10B981", // green
      },
    ];
  }, [goalBasedSIPResults]);

  const yearlyGrowthData = useMemo(() => {
    if (!goalBasedSIPResults?.schedule) return [];
    
    return goalBasedSIPResults.schedule.map((item) => ({
      year: `Year ${item.year}`,
      totalInvestment: item.yearlyInvestment,
      accumulatedValue: item.yearEndMaturity,
      returns: item.yearlyInterest,
    }));
  }, [goalBasedSIPResults]);

  const ChartLoadingState = () => (
    <div className="space-y-4">
      <CollapsibleWrapper
        title="Achievement  Charts"
        id="goal-based-sip-charts-loading"
        isExpanded={isExpanded}
        onToggle={(opened) => setIsExpanded(opened)}
      >
        <div className="h-64 bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse" />
      </CollapsibleWrapper>
    </div>
  );

  if (isLoading || !goalBasedSIPResults) {
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
              {entry.dataKey === "totalInvestment" && `Total Investment: ${formateCurrency(entry.value)}`}
              {entry.dataKey === "accumulatedValue" && `Accumulated Value: ${formateCurrency(entry.value)}`}
              {entry.dataKey === "returns" && `Returns: ${formateCurrency(entry.value)}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <CollapsibleWrapper
      title="Achievement Charts"
      id="goal-based-sip-charts"
      isExpanded={isExpanded}
      onToggle={(opened) => setIsExpanded(opened)}
    >
      <Tabs defaultValue="breakdown" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="breakdown">Breakdown</TabsTrigger>
          <TabsTrigger value="progress">Progress</TabsTrigger>
          <TabsTrigger value="yearly">Yearly</TabsTrigger>
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
              <LineChart data={yearlyGrowthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis tickFormatter={(value) => formateCurrency(value)} />
                <Tooltip content={<CustomTooltip />} />
                <Line 
                  type="monotone" 
                  dataKey="accumulatedValue" 
                  stroke="#3B82F6" 
                  strokeWidth={3}
                  name="Accumulated Value"
                />
                <Line 
                  type="monotone" 
                  dataKey="totalInvestment" 
                  stroke="#10B981" 
                  strokeWidth={2}
                  name="Total Investment"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>

        <TabsContent value="yearly" className="space-y-4">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={yearlyGrowthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis tickFormatter={(value) => formateCurrency(value)} />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey="totalInvestment" 
                  stackId="a" 
                  fill="#3B82F6" 
                  name="Investment"
                />
                <Bar 
                  dataKey="returns" 
                  stackId="a" 
                  fill="#10B981" 
                  name="Returns"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>
      </Tabs>
    </CollapsibleWrapper>
  );
};
