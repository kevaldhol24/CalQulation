"use client";

import { CollapsibleWrapper } from "@/components/common/CollapsibleWrapper";

import { useLumpsum } from "@/contexts/LumpsumContext";
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

export const LumpsumCharts: FC = () => {
  const { lumpsumResults, isLoading } = useLumpsum();
  const { formateCurrency } = currency();
  const [isExpanded, setIsExpanded] = useState(true);

  const pieData = useMemo(() => {
    if (!lumpsumResults) return [];
    
    return [
      {
        name: "Principal",
        value: lumpsumResults.principal,
        color: "#3B82F6", // blue
      },
      {
        name: "Returns",
        value: lumpsumResults.totalInterest,
        color: "#10B981", // green
      },
    ];
  }, [lumpsumResults]);

  const yearlyGrowthData = useMemo(() => {
    if (!lumpsumResults?.schedule) return [];
    
    return lumpsumResults.schedule.map((item) => ({
      year: `Year ${item.year}`,
      amount: item.endAmount,
      interest: item.interest,
      principal: lumpsumResults.principal,
    }));
  }, [lumpsumResults]);

  const ChartLoadingState = () => (
    <div className="space-y-4">
      <CollapsibleWrapper
        title="Growth Charts"
        id="lumpsum-charts-loading"
        isExpanded={isExpanded}
        onToggle={(opened) => setIsExpanded(opened)}
      >
        <div className="h-64 bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse" />
      </CollapsibleWrapper>
    </div>
  );

  if (isLoading || !lumpsumResults) {
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
              {entry.dataKey === "amount" && `Total Amount: ${formateCurrency(entry.value)}`}
              {entry.dataKey === "interest" && `Interest: ${formateCurrency(entry.value)}`}
              {entry.dataKey === "principal" && `Principal: ${formateCurrency(entry.value)}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <CollapsibleWrapper
      title="Growth Charts"
      id="lumpsum-charts"
      isExpanded={isExpanded}
      onToggle={(opened) => setIsExpanded(opened)}
    >
      <Tabs defaultValue="breakdown" className="w-full">
        <TabsList className="grid w-full grid-cols-3 overflow-auto">
          <TabsTrigger value="breakdown" className="min-w-min">Breakdown</TabsTrigger>
          <TabsTrigger value="growth" className="min-w-min">Growth</TabsTrigger>
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

        <TabsContent value="growth" className="space-y-4">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={yearlyGrowthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="" />
                <YAxis  tickFormatter={(value) => formateCurrency(value)} />
                <Tooltip content={<CustomTooltip />} />
                <Line 
                  type="monotone" 
                  dataKey="amount" 
                  stroke="#10B981" 
                  strokeWidth={3}
                  name="Total Amount"
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
                  dataKey="principal" 
                  stackId="a" 
                  fill="#3B82F6" 
                  name="Principal"
                />
                <Bar 
                  dataKey="interest" 
                  stackId="a" 
                  fill="#10B981" 
                  name="Interest"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>
      </Tabs>
    </CollapsibleWrapper>
  );
};
