"use client";

import { CollapsibleWrapper } from "@/components/common/CollapsibleWrapper";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRD } from "@/contexts/RDContext";
import { currency } from "@/services/CurrencyService";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  ChartOptions,
  Tooltip as ChartTooltip,
  Legend,
  LinearScale,
  ScriptableContext,
  Title,
  TooltipItem,
} from "chart.js";
import { useTheme } from "next-themes";
import { useMemo, useState } from "react";
import { Bar } from "react-chartjs-2";
import { RDDonutChart } from "./RDDonutChart";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  ChartTooltip,
  Legend
);

export const RDCharts = () => {
  const { rdResults, isLoading } = useRD();
  const { theme, systemTheme } = useTheme();
  const [isExpanded, setIsExpanded] = useState(true);
  const { formateCurrency } = currency();

  // Determine if we're in dark mode
  const isDarkTheme =
    theme === "dark" || (theme === "system" && systemTheme === "dark");

  // Define theme-aware colors with refined modern palette
  const colors = {
    background: isDarkTheme
      ? "rgba(15, 23, 42, 0.8)"
      : "rgba(255, 255, 255, 1)",
    gridLines: isDarkTheme
      ? "rgba(148, 163, 184, 0.12)"
      : "rgba(0, 0, 0, 0.06)",
    text: isDarkTheme ? "rgba(255, 255, 255, 0.9)" : "rgba(30, 41, 59, 0.9)",
    deposits: {
      main: "#f97316", // Orange
      bg: isDarkTheme ? "rgba(249, 115, 22, 0.65)" : "rgba(249, 115, 22, 0.75)",
      gradient: isDarkTheme
        ? "rgba(249, 115, 22, 0.85)"
        : "rgba(249, 115, 22, 0.95)",
      border: isDarkTheme ? "#fb923c" : "#ea580c",
    },
    interest: {
      main: "#10b981", // Emerald green
      bg: isDarkTheme ? "rgba(16, 185, 129, 0.65)" : "rgba(16, 185, 129, 0.75)",
      gradient: isDarkTheme
        ? "rgba(16, 185, 129, 0.85)"
        : "rgba(16, 185, 129, 0.95)",
      border: isDarkTheme ? "#34d399" : "#059669",
    },
  };

  // Process yearly breakdown data for charts
  const yearlyData = useMemo(() => {
    if (!rdResults?.yearlyBreakdown)
      return {
        years: [],
        deposits: [],
        interest: [],
        maturity: [],
      };

    return {
      years: rdResults.yearlyBreakdown.map((item) => item.year.toString()),
      deposits: rdResults.yearlyBreakdown.map((item) => item.yearlyInvestment),
      interest: rdResults.yearlyBreakdown.map((item) => item.yearlyInterest),
      maturity: rdResults.yearlyBreakdown.map((item) => item.yearEndMaturity),
    };
  }, [rdResults]);

  // Standard chart configuration
  const chartConfig: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        top: 5,
        bottom: 5,
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "top",
        align: "center",
        labels: {
          usePointStyle: true,
          pointStyle: "rectRounded",
          color: colors.text,
          font: {
            size: 12,
            weight: 500,
          },
          padding: 20,
        },
      },
      tooltip: {
        backgroundColor: colors.background,
        borderColor: colors.gridLines,
        borderWidth: 1,
        titleColor: colors.text,
        bodyColor: colors.text,
        cornerRadius: 8,
        displayColors: true,
        mode: "index",
        intersect: false,
        callbacks: {
          label: (context: TooltipItem<"bar">) => {
            return `${context.dataset.label}: ${formateCurrency(
              context.parsed.y
            )}`;
          },
        },
      },
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: "Year",
          color: colors.text,
          font: {
            size: 12,
            weight: 600,
          },
        },
        ticks: {
          color: colors.text,
          font: {
            size: 11,
          },
        },
        grid: {
          color: colors.gridLines,
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: "Amount (₹)",
          color: colors.text,
          font: {
            size: 12,
            weight: 600,
          },
        },
        ticks: {
          color: colors.text,
          font: {
            size: 11,
          },
          callback: function (value) {
            if (typeof value === "number") {
              return formateCurrency(value);
            }
            return value;
          },
        },
        grid: {
          color: colors.gridLines,
        },
      },
    },
    animation: {
      duration: 750,
      easing: "easeInOutQuart",
    },
    interaction: {
      mode: "index",
      intersect: false,
    },
  };

  // Yearly breakdown chart data
  const yearlyBreakdownData = {
    labels: yearlyData.years,
    datasets: [
      {
        label: "Yearly Deposits",
        data: yearlyData.deposits,
        backgroundColor: (context: ScriptableContext<"bar">) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) return colors.deposits.bg;

          const gradient = ctx.createLinearGradient(
            0,
            chartArea.bottom,
            0,
            chartArea.top
          );
          gradient.addColorStop(0, colors.deposits.bg);
          gradient.addColorStop(1, colors.deposits.gradient);
          return gradient;
        },
        borderColor: colors.deposits.border,
        borderWidth: 1.5,
        borderRadius: 4,
        borderSkipped: false,
      },
      {
        label: "Yearly Interest",
        data: yearlyData.interest,
        backgroundColor: (context: ScriptableContext<"bar">) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) return colors.interest.bg;

          const gradient = ctx.createLinearGradient(
            0,
            chartArea.bottom,
            0,
            chartArea.top
          );
          gradient.addColorStop(0, colors.interest.bg);
          gradient.addColorStop(1, colors.interest.gradient);
          return gradient;
        },
        borderColor: colors.interest.border,
        borderWidth: 1.5,
        borderRadius: 4,
        borderSkipped: false,
      },
    ],
  };

  // Maturity growth chart data
  const maturityGrowthData = {
    labels: yearlyData.years,
    datasets: [
      {
        label: "Maturity Amount",
        data: yearlyData.maturity,
        backgroundColor: (context: ScriptableContext<"bar">) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) return colors.deposits.bg;

          const gradient = ctx.createLinearGradient(
            0,
            chartArea.bottom,
            0,
            chartArea.top
          );
          gradient.addColorStop(0, colors.deposits.bg);
          gradient.addColorStop(1, colors.deposits.gradient);
          return gradient;
        },
        borderColor: colors.deposits.border,
        borderWidth: 1.5,
        borderRadius: 4,
        borderSkipped: false,
      },
    ],
  };

  if (isLoading || !rdResults) {
    return (
      <CollapsibleWrapper
        title="RD Growth Visualization"
        id="rd-charts"
        isExpanded={isExpanded}
        onToggle={() => setIsExpanded(!isExpanded)}
      >
        <Skeleton className="h-[300px] w-full" />
      </CollapsibleWrapper>
    );
  }

  return (
    <CollapsibleWrapper
      title="RD Growth Visualization"
      id="rd-charts"
      isExpanded={isExpanded}
      onToggle={() => setIsExpanded(!isExpanded)}
    >
      <Tabs defaultValue="yearly" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="yearly">Yearly</TabsTrigger>
          <TabsTrigger value="breakdown">Breakdown</TabsTrigger>
          <TabsTrigger value="growth">Growth</TabsTrigger>
        </TabsList>

        <TabsContent value="yearly" className="space-y-4">
          <div className="h-[350px] w-full">
            <Bar data={yearlyBreakdownData} options={chartConfig} />
          </div>
        </TabsContent>

        <TabsContent value="growth" className="space-y-4">
          <div className="h-[350px] w-full">
            <Bar data={maturityGrowthData} options={chartConfig} />
          </div>
        </TabsContent>
        <TabsContent value="breakdown" className="space-y-4">
          <div className="h-[350px] w-full">
            <RDDonutChart />
          </div>
        </TabsContent>
      </Tabs>
    </CollapsibleWrapper>
  );
};
