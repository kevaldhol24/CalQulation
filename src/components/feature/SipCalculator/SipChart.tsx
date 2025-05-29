"use client";

import { CollapsibleWrapper } from "@/components/common/CollapsibleWrapper";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSip } from "@/contexts/SIPContext";
import { formateCurrency } from "@/lib/utils";
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

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  ChartTooltip,
  Legend
);

export const SipCharts = () => {
  const { sipResults, sipInputs, isLoading } = useSip();
  const { theme, systemTheme } = useTheme();
  const [isExpanded, setIsExpanded] = useState(true);

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
    investment: {
      main: "#0ea5e9", // Vibrant blue
      bg: isDarkTheme ? "rgba(14, 165, 233, 0.65)" : "rgba(14, 165, 233, 0.75)",
      gradient: isDarkTheme
        ? "rgba(14, 165, 233, 0.85)"
        : "rgba(14, 165, 233, 0.95)",
      border: isDarkTheme ? "#38bdf8" : "#0284c7",
    },
    returns: {
      main: "#10b981", // Emerald green
      bg: isDarkTheme ? "rgba(16, 185, 129, 0.65)" : "rgba(16, 185, 129, 0.75)",
      gradient: isDarkTheme
        ? "rgba(16, 185, 129, 0.85)"
        : "rgba(16, 185, 129, 0.95)",
      border: isDarkTheme ? "#34d399" : "#059669",
    },
    inflationAdjusted: {
      main: "#f43f5e", // Vivid pink/red
      bg: isDarkTheme ? "rgba(244, 63, 94, 0.65)" : "rgba(244, 63, 94, 0.75)",
      gradient: isDarkTheme
        ? "rgba(244, 63, 94, 0.85)"
        : "rgba(244, 63, 94, 0.95)",
      border: isDarkTheme ? "#fb7185" : "#e11d48",
    },
  };

  // Process yearly breakdown data for charts
  const yearlyData = useMemo(() => {
    if (!sipResults?.yearlyBreakdown)
      return {
        years: [],
        investment: [],
        returns: [],
        maturity: [],
        inflationAdjustedReturns: [],
        inflationAdjustedMaturity: [],
      };

    return {
      years: sipResults.yearlyBreakdown.map((item) => item.year.toString()),
      investment: sipResults.yearlyBreakdown.map(
        (item) => item.yearlyInvestment
      ),
      returns: sipResults.yearlyBreakdown.map((item) => item.yearlyInterest),
      maturity: sipResults.yearlyBreakdown.map((item) => item.yearEndMaturity),
      inflationAdjustedReturns: sipResults.yearlyBreakdown.map(
        (item) => item.inflationAdjustedYearlyInterest
      ),
      inflationAdjustedMaturity: sipResults.yearlyBreakdown.map(
        (item) => item.inflationAdjustedYearEndMaturity
      ),
    };
  }, [sipResults?.yearlyBreakdown]);

  if (isLoading) {
    return (
      <CollapsibleWrapper
        id="sip-breakdown-chart"
        title="SIP Yearly Breakdown Chart"
        isExpanded={isExpanded}
        onToggle={(opened) => setIsExpanded(opened)}
      >
        <Skeleton className="h-80 w-full" />
      </CollapsibleWrapper>
    );
  }

  // Return empty if no results
  if (!sipResults) {
    return <></>;
  }

  // Standard chart data
  const standardChartData = {
    labels: yearlyData.years,
    datasets: [
      {
        label: "Investment",
        data: yearlyData.investment,
        backgroundColor: (context: ScriptableContext<"bar">) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 300);
          gradient.addColorStop(0, colors.investment.bg);
          gradient.addColorStop(1, colors.investment.gradient);
          return gradient;
        },
        borderRadius: 4,
        borderSkipped: false,
        hoverBackgroundColor: colors.investment.gradient,
        borderColor: colors.investment.border,
        borderWidth: 1,
      },
      {
        label: "Returns",
        data: yearlyData.returns,
        backgroundColor: (context: ScriptableContext<"bar">) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 300);
          gradient.addColorStop(0, colors.returns.bg);
          gradient.addColorStop(1, colors.returns.gradient);
          return gradient;
        },
        borderRadius: 4,
        borderSkipped: false,
        hoverBackgroundColor: colors.returns.gradient,
        borderColor: colors.returns.border,
        borderWidth: 1,
      },
    ],
  };

  // Inflation-adjusted chart data
  const inflationAdjustedChartData = {
    labels: yearlyData.years,
    datasets: [
      {
        label: "Investment",
        data: yearlyData.investment,
        backgroundColor: (context: ScriptableContext<"bar">) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 300);
          gradient.addColorStop(0, colors.investment.bg);
          gradient.addColorStop(1, colors.investment.gradient);
          return gradient;
        },
        borderRadius: 4,
        borderSkipped: false,
        hoverBackgroundColor: colors.investment.gradient,
        borderColor: colors.investment.border,
        borderWidth: 1,
      },
      {
        label: "Inflation Adjusted Returns",
        data: yearlyData.inflationAdjustedReturns,
        backgroundColor: (context: ScriptableContext<"bar">) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 300);
          gradient.addColorStop(0, colors.inflationAdjusted.bg);
          gradient.addColorStop(1, colors.inflationAdjusted.gradient);
          return gradient;
        },
        borderRadius: 4,
        borderSkipped: false,
        hoverBackgroundColor: colors.inflationAdjusted.gradient,
        borderColor: colors.inflationAdjusted.border,
        borderWidth: 1,
      },
    ],
  };

  // Common options for currency formatting in tooltips
  const currencyTooltipOptions: ChartOptions<"bar"> = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context: TooltipItem<"bar">) {
            const label = context.dataset.label || "";
            const value = context.parsed.y;
            return `${label}: ${formateCurrency(value)}`;
          },
        },
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
        caretSize: 6,
        displayColors: true,
        boxPadding: 4,
        titleMarginBottom: 8,
        multiKeyBackground: "transparent",
      },
      legend: {
        labels: {
          color: colors.text,
          font: {
            family: "'Geist', sans-serif",
            size: 13,
          },
          padding: 16,
          usePointStyle: true,
          pointStyle: "circle",
          boxWidth: 8,
          boxHeight: 8,
        },
        position: "top",
        align: "center",
      },
    },
    scales: {
      y: {
        ticks: {
          callback: function (value: number | string) {
            const numValue =
              typeof value === "number" ? value : parseFloat(value);
            return numValue >= 1000
              ? `${(numValue / 1000).toFixed(0)}k`
              : value;
          },
          color: colors.text,
          font: {
            family: "'Geist', sans-serif",
            size: 12,
          },
          padding: 8,
        },
        grid: {
          color: colors.gridLines,
          tickLength: 0,
        },
        border: {
          display: false,
        },
      },
      x: {
        ticks: {
          color: colors.text,
          font: {
            family: "'Geist', sans-serif",
            size: 11,
          },
          maxRotation: 45,
          minRotation: 0,
          autoSkip: true,
          autoSkipPadding: 15,
          padding: 5,
          maxTicksLimit: 15,
        },
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
      },
    },
    maintainAspectRatio: false,
    responsive: true,
    animation: {
      duration: 800,
      easing: "easeOutQuart",
    },
    layout: {
      padding: {
        top: 10,
        bottom: 8,
        left: 8,
        right: 8,
      },
    },
    elements: {
      bar: {
        borderWidth: 1,
        borderRadius: 4,
        borderSkipped: false,
      },
    },
    interaction: {
      mode: "index",
      intersect: false,
    },
  };

  // More modern card styling with refined glass effect
  const chartCardClass = isDarkTheme
    ? "bg-gray-900/40 backdrop-blur-sm p-4 md:p-5 rounded-xl shadow-lg border border-gray-800/40 hover:bg-gray-900/50 transition-all duration-300"
    : "bg-white/80 backdrop-blur-sm p-4 md:p-5 rounded-xl shadow-md border border-gray-100 hover:bg-white/90 transition-all duration-300";

  // Function to toggle expanded/collapsed state

  return (
    <div className="space-y-4">
      <CollapsibleWrapper
        id="sip-breakdown-chart"
        title="SIP Yearly Breakdown Chart"
        isExpanded={isExpanded}
        onToggle={(opened) => setIsExpanded(opened)}
      >
        <div className="grid grid-cols-1 gap-4">
          {/* Yearly breakdown bar chart with tabs */}
          <div
            className={`${chartCardClass} transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}
          >
            <Tabs
              defaultValue={
                sipInputs.inflationRate && sipInputs.inflationRate > 0
                  ? "inflation-adjusted"
                  : "standard"
              }
            >
              <div className="flex items-center justify-between mb-3 flex-wrap gap-4">
                <h3 className="text-base md:text-lg font-semibold flex items-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-blue-500 to-green-500 mr-2.5 shadow-sm"></div>
                  Yearly Investment & Returns
                </h3>
                <TabsList className="ml-auto">
                  <TabsTrigger value="standard">Standard</TabsTrigger>
                  <TabsTrigger value="inflation-adjusted">
                    With Inflation
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="standard">
                <div
                  className="overflow-x-auto sm:overflow-x-visible overflow-y-hidden relative"
                  style={{
                    minWidth: "100%",
                    width: "100%",
                    scrollbarWidth: "thin",
                    scrollbarColor: isDarkTheme
                      ? "#4B5563 #1F2937"
                      : "#CBD5E1 #F1F5F9",
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      height: "320px",
                    }}
                  >
                    <Bar
                      data={standardChartData}
                      options={{
                        ...currencyTooltipOptions,
                        maintainAspectRatio: false,
                        responsive: true,
                        plugins: {
                          ...currencyTooltipOptions.plugins,
                          legend: {
                            ...currencyTooltipOptions.plugins?.legend,
                            display: true,
                          },
                          tooltip: {
                            ...currencyTooltipOptions.plugins?.tooltip,
                            callbacks: {
                              ...currencyTooltipOptions.plugins?.tooltip
                                ?.callbacks,
                              title: function (context) {
                                return `Year ${context[0].label}`;
                              },
                            },
                          },
                        },
                        scales: {
                          ...currencyTooltipOptions.scales,
                          x: {
                            ...currencyTooltipOptions.scales?.x,
                            ticks: {
                              ...currencyTooltipOptions.scales?.x?.ticks,
                              autoSkip: true,
                              maxTicksLimit:
                                yearlyData.years.length > 15 ? 15 : undefined,
                              callback: function (val) {
                                return `Year ${this.getLabelForValue(
                                  val as number
                                )}`;
                              },
                            },
                          },
                        },
                      }}
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="inflation-adjusted">
                <div
                  className="overflow-x-auto sm:overflow-x-visible overflow-y-hidden relative"
                  style={{
                    minWidth: "100%",
                    width: "100%",
                    scrollbarWidth: "thin",
                    scrollbarColor: isDarkTheme
                      ? "#4B5563 #1F2937"
                      : "#CBD5E1 #F1F5F9",
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      height: "320px",
                    }}
                  >
                    <Bar
                      data={inflationAdjustedChartData}
                      options={{
                        ...currencyTooltipOptions,
                        maintainAspectRatio: false,
                        responsive: true,
                        plugins: {
                          ...currencyTooltipOptions.plugins,
                          legend: {
                            ...currencyTooltipOptions.plugins?.legend,
                            display: true,
                          },
                          tooltip: {
                            ...currencyTooltipOptions.plugins?.tooltip,
                            callbacks: {
                              ...currencyTooltipOptions.plugins?.tooltip
                                ?.callbacks,
                              title: function (context) {
                                return `Year ${context[0].label}`;
                              },
                            },
                          },
                        },
                        scales: {
                          ...currencyTooltipOptions.scales,
                          x: {
                            ...currencyTooltipOptions.scales?.x,
                            ticks: {
                              ...currencyTooltipOptions.scales?.x?.ticks,
                              autoSkip: true,
                              maxTicksLimit:
                                yearlyData.years.length > 15 ? 15 : undefined,
                              callback: function (val) {
                                return `Year ${this.getLabelForValue(
                                  val as number
                                )}`;
                              },
                            },
                          },
                        },
                      }}
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
            <div className="text-xs text-right text-gray-500 dark:text-gray-400 mt-2 sm:hidden">
              {yearlyData.years.length > 10 &&
                "← Swipe horizontally to see all years →"}
            </div>
          </div>
        </div>
      </CollapsibleWrapper>
    </div>
  );
};
