"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSip } from "@/contexts/SIPContext";
import { currency } from "@/services/CurrencyService";
import {
  ArcElement,
  Chart as ChartJS,
  ChartOptions,
  Legend,
  Tooltip,
} from "chart.js";
import { useTheme } from "next-themes";
import { useEffect, useRef } from "react";
import { Doughnut } from "react-chartjs-2";

// Register the required chart components
ChartJS.register(ArcElement, Tooltip, Legend);

export const SipDonutChart = () => {
  const { formateCurrency } = currency();

  const { sipResults, sipInputs, isLoading } = useSip();
  const { theme, systemTheme } = useTheme();
  const standardChartRef = useRef<ChartJS<"doughnut", number[], string>>(null);
  const inflationChartRef = useRef<ChartJS<"doughnut", number[], string>>(null);

  // Determine if we're in dark mode
  const isDarkTheme =
    theme === "dark" || (theme === "system" && systemTheme === "dark");

  // Re-render the chart on results change
  useEffect(() => {
    const standardChart = standardChartRef.current;
    const inflationChart = inflationChartRef.current;

    if (standardChart) {
      standardChart.update();
    }
    if (inflationChart) {
      inflationChart.update();
    }
  }, [sipResults]);

  // Define theme-aware colors
  const colors = {
    investment: {
      main: "#0ea5e9",
      border: "#64748b",
    },
    returns: {
      main: "#22c55e",
      border: "#16a34a",
    },
    inflationAdjusted: {
      main: "#f43f5e",
      border: "#e11d48",
    },
  };

  if (isLoading) {
    return <Skeleton className="h-50 w-full" />;
  }

  if (!sipResults) return null;

  const { totalInvestedAmount, wealthGain, inflationAdjustedWealthGain } =
    sipResults;

  // Standard chart data
  const standardChartData = {
    labels: ["Total Invested", "Returns"],
    datasets: [
      {
        data: [totalInvestedAmount, wealthGain],
        backgroundColor: [colors.investment.main, colors.returns.main],
        borderColor: [colors.investment.border, colors.returns.border],
        borderWidth: 1,
        hoverOffset: 10,
      },
    ],
  };

  // Inflation-adjusted chart data
  const inflationChartData = {
    labels: ["Total Invested", "Returns"],
    datasets: [
      {
        data: [totalInvestedAmount, inflationAdjustedWealthGain],
        backgroundColor: [
          colors.investment.main,
          colors.inflationAdjusted.main,
        ],
        borderColor: [
          colors.investment.border,
          colors.inflationAdjusted.border,
        ],
        borderWidth: 1,
        hoverOffset: 10,
      },
    ],
  };

  const options: ChartOptions<"doughnut"> = {
    responsive: true,
    maintainAspectRatio: true,
    cutout: "50%",
    circumference: 180,
    rotation: -90,
    plugins: {
      legend: {
        display: false,
        position: "bottom" as const,
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
          padding: 10,
          boxHeight: 6,
          color: isDarkTheme
            ? "rgba(255, 255, 255, 0.85)"
            : "rgba(15, 23, 42, 0.85)",
          font: {
            size: 10,
          },
        },
      },
      tooltip: {
        backgroundColor: isDarkTheme
          ? "rgba(15, 23, 42, 0.95)"
          : "rgba(255, 255, 255, 0.98)",
        titleColor: isDarkTheme
          ? "rgba(255, 255, 255, 0.95)"
          : "rgba(15, 23, 42, 0.95)",
        bodyColor: isDarkTheme
          ? "rgba(255, 255, 255, 0.85)"
          : "rgba(15, 23, 42, 0.85)",
        padding: 12,
        cornerRadius: 6,
        bodyFont: {
          family: "'Geist', sans-serif",
          size: 13,
        },
        titleFont: {
          family: "'Geist', sans-serif",
          size: 14,
          weight: "bold",
        },
        callbacks: {
          label: (context) => {
            const label = context.label || "";
            const value = context.raw as number;
            return `${label}: ${formateCurrency(value)}`;
          },
          title: () => "",
        },
      },
    },
  };

  // More modern card styling with refined glass effect
  const chartCardClass = isDarkTheme
    ? "bg-gray-900/40 backdrop-blur-sm rounded-xl shadow-lg border border-gray-800/40 hover:bg-gray-900/50 transition-all duration-300"
    : "bg-white/80 backdrop-blur-sm rounded-xl shadow-md border border-gray-100 hover:bg-white/90 transition-all duration-300";

  return (
    <div
      className={`${chartCardClass} transform transition-all duration-300 hover:shadow-xl`}
    >
      <Tabs
        defaultValue={
          sipInputs.inflationRate && sipInputs.inflationRate > 0
            ? "inflation"
            : "standard"
        }
        className="w-full"
      >
        <div className="flex justify-between items-center mb-4 absolute left-0 right-0 top-2 px-4 z-20">
          <div className="flex items-center">
            <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-blue-500 to-green-500 mr-2.5 shadow-sm"></div>
            <h3 className="text-base md:text-lg font-semibold">Breakdown</h3>
          </div>
          <TabsList className="ml-auto">
            <TabsTrigger value="standard">Standard</TabsTrigger>
            <TabsTrigger value="inflation">With Inflation</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="standard">
          <div className="flex flex-col sm:flex-row rounded-lg relative">
            <div
              className="flex-1 flex justify-center mt-3 sm:mt-0"
              style={{ maxHeight: "200px" }}
            >
              <Doughnut
                ref={standardChartRef}
                data={standardChartData}
                options={options}
                height={200}
                width={400}
                aria-label="SIP standard investment breakdown chart"
              />
            </div>
            <div className="flex gap-4 justify-center absolute bottom-0 right-0 left-0 pb-4">
              <div className="flex items-center text-sm text-muted-foreground">
                <div className="w-3 h-3 bg-[#0ea5e9] rounded-full mr-2.5 shadow-sm" />
                Investment
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <div className="w-3 h-3 bg-[#22c55e] rounded-full mr-2.5 shadow-sm" />
                Returns
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="inflation">
          <div className="flex flex-col sm:flex-row rounded-lg relative">
            <div
              className="flex-1 flex justify-center mt-3 sm:mt-0"
              style={{ maxHeight: "200px" }}
            >
              <Doughnut
                ref={inflationChartRef}
                data={inflationChartData}
                options={options}
                height={200}
                width={400}
                aria-label="SIP inflation-adjusted investment breakdown chart"
              />
            </div>
            <div className="flex gap-4 justify-center absolute bottom-0 right-0 left-0 pb-4">
              <div className="flex items-center text-sm text-muted-foreground">
                <div className="w-3 h-3 bg-[#0ea5e9] rounded-full mr-2.5 shadow-sm" />
                Investment
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <div className="w-3 h-3 bg-[#f43f5e] rounded-full mr-2.5 shadow-sm" />
                Returns Inflation-Adjusted
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
