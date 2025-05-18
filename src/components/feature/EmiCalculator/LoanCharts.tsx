"use client";

import { useLoan } from "@/contexts/LoanContext";
import { formateCurrency } from "@/lib/utils";
import { EMIScheduleItem } from "loanwise";
import { useMemo, useState } from "react";
import { useTheme } from "next-themes";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip as ChartTooltip,
  Legend,
  Filler,
  TooltipItem,
  ChartOptions,
  ScriptableContext,
} from "chart.js";
import { Line, Bar, Doughnut } from "react-chartjs-2";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  ChartTooltip,
  Legend,
  Filler
);

// Define types for chart data
type ScheduleChartItem = {
  emiNumber: number;
  date: string;
  principalPaid: number;
  interestPaid: number;
  remainingBalance: number;
  principalPaidTillDate: number;
};

type YearlyAmortizationData = {
  years: number[];
  principalData: number[];
  interestData: number[];
};

export const LoanCharts = () => {
  const { loanResults } = useLoan();
  const { theme, systemTheme } = useTheme();
  // State for tracking expanded/collapsed state (default: expanded)
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
    principal: {
      main: "#0ea5e9", // Changed to a more vibrant blue
      bg: isDarkTheme ? "rgba(14, 165, 233, 0.65)" : "rgba(14, 165, 233, 0.75)",
      gradient: isDarkTheme
        ? "rgba(14, 165, 233, 0.85)"
        : "rgba(14, 165, 233, 0.95)",
      border: isDarkTheme ? "#38bdf8" : "#0284c7",
    },
    interest: {
      main: "#f43f5e", // Vivid pink/red
      bg: isDarkTheme ? "rgba(244, 63, 94, 0.65)" : "rgba(244, 63, 94, 0.75)",
      gradient: isDarkTheme
        ? "rgba(244, 63, 94, 0.85)"
        : "rgba(244, 63, 94, 0.95)",
      border: isDarkTheme ? "#fb7185" : "#e11d48",
    },
    prepayment: {
      main: "#10b981", // Emerald green
      bg: isDarkTheme ? "rgba(16, 185, 129, 0.65)" : "rgba(16, 185, 129, 0.75)",
      gradient: isDarkTheme
        ? "rgba(16, 185, 129, 0.85)"
        : "rgba(16, 185, 129, 0.95)",
      border: isDarkTheme ? "#34d399" : "#059669",
    },
    balance: {
      main: "#8b5cf6", // Bright purple
      bg: isDarkTheme ? "rgba(139, 92, 246, 0.55)" : "rgba(139, 92, 246, 0.45)",
      gradient: isDarkTheme
        ? "rgba(139, 92, 246, 0.75)"
        : "rgba(139, 92, 246, 0.65)",
      border: isDarkTheme ? "#a78bfa" : "#7c3aed",
    },
  };
  // Process EMI schedule data for charts
  const scheduleChartData = useMemo(() => {
    if (!loanResults?.schedule) return [] as ScheduleChartItem[];

    // Calculate sampling interval based on the loan length
    // For longer loans, sample less frequently to avoid overcrowding
    const totalEMIs = loanResults.schedule.length;
    let samplingInterval = 3; // Default quarterly

    if (totalEMIs > 120) { // For loans > 10 years (120 months)
      samplingInterval = 6; // Every 6 months
    } else if (totalEMIs > 240) { // For loans > 20 years
      samplingInterval = 12; // Yearly
    }

    // Group by sampling interval for better visualization
    const sampledData = loanResults.schedule.reduce(
      (acc: ScheduleChartItem[], item: EMIScheduleItem, index: number) => {
        // Sample data based on interval, always include first and last point
        if (index % samplingInterval === 0 || index === loanResults.schedule.length - 1) {
          acc.push({
            emiNumber: item.emiNumber,
            date: `${item.emiNumber}`,
            principalPaid: item.principalPaid,
            interestPaid: item.interestPaid,
            remainingBalance: item.remainingBalance,
            principalPaidTillDate: item.principalPaidTillDate,
          });
        }
        return acc;
      },
      []
    );

    return sampledData;
  }, [loanResults?.schedule]);

  // Extract yearly trends for amortization
  const amortizationData = useMemo(() => {
    if (!loanResults?.schedule)
      return {
        years: [] as number[],
        principalData: [] as number[],
        interestData: [] as number[],
      } as YearlyAmortizationData;

    const yearData = new Map<
      number,
      {
        year: number;
        totalPrincipal: number;
        totalInterest: number;
        remainingBalance: number;
      }
    >();

    loanResults.schedule.forEach((item) => {
      if (!yearData.has(item.year)) {
        yearData.set(item.year, {
          year: item.year,
          totalPrincipal: 0,
          totalInterest: 0,
          remainingBalance: item.remainingBalance,
        });
      }

      const data = yearData.get(item.year)!;
      data.totalPrincipal += item.principalPaid;
      data.totalInterest += item.interestPaid;
      data.remainingBalance = item.remainingBalance; // Last remaining balance for the year
    });

    const sortedData = Array.from(yearData.values()).sort(
      (a, b) => a.year - b.year
    );

    return {
      years: sortedData.map((item) => item.year),
      principalData: sortedData.map((item) => item.totalPrincipal),
      interestData: sortedData.map((item) => item.totalInterest),
    };
  }, [loanResults?.schedule]);

  // Return empty if no results
  if (!loanResults) {
    return <></>;
  }

  const {
    loanAmount,
    totalInterestPayable,
    totalPrepayment,
    totalAmountPayable,
  } = loanResults.summary;

  // Data for principal vs interest donut chart with improved colors
  const principalVsInterestData = {
    labels: ["Principal", "Interest", "Prepayment"],
    datasets: [
      {
        label: "Payment Breakdown",
        data: [
          totalPrepayment ? loanAmount - totalPrepayment : loanAmount,
          totalInterestPayable,
          totalPrepayment || 0,
        ],
        backgroundColor: [
          colors.principal.bg,
          colors.interest.bg,
          colors.prepayment.bg,
        ],
        borderColor: [
          colors.principal.border,
          colors.interest.border,
          colors.prepayment.border,
        ],
        borderWidth: 1.5,
        hoverBackgroundColor: [
          colors.principal.gradient,
          colors.interest.gradient,
          colors.prepayment.gradient,
        ],
        hoverBorderColor: [
          colors.principal.border,
          colors.interest.border,
          colors.prepayment.border,
        ],
        hoverBorderWidth: 2,
        hoverOffset: 8,
      },
    ],
  };

  // Line chart data for loan balance over time with improved gradient fill
  const balanceChartData = {
    labels: scheduleChartData.map((item) => item.date),
    datasets: [
      {
        label: "Remaining Balance",
        data: scheduleChartData.map((item) => item.remainingBalance),
        borderColor: colors.balance.border,
        backgroundColor: (context: ScriptableContext<"line">) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) return colors.balance.bg;

          // Create gradient fill
          const gradient = ctx.createLinearGradient(
            0,
            chartArea.top,
            0,
            chartArea.bottom
          );
          gradient.addColorStop(0, colors.balance.bg);
          gradient.addColorStop(1, "rgba(139, 92, 246, 0.05)");
          return gradient;
        },
        fill: true,
        tension: 0.4,
        borderWidth: 2.5,
        pointRadius: 2,
        pointHoverRadius: 6,
        pointBackgroundColor: colors.balance.border,
        pointHoverBackgroundColor: colors.balance.main,
        pointHoverBorderColor: isDarkTheme
          ? "rgba(255, 255, 255, 0.8)"
          : "rgba(255, 255, 255, 1)",
        pointHoverBorderWidth: 2,
      },
      {
        label: "Principal Paid",
        data: scheduleChartData.map((item) => item.principalPaidTillDate),
        borderColor: colors.principal.border,
        backgroundColor: (context: ScriptableContext<"line">) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) return colors.principal.bg;

          // Create gradient fill
          const gradient = ctx.createLinearGradient(
            0,
            chartArea.top,
            0,
            chartArea.bottom
          );
          gradient.addColorStop(0, colors.principal.bg);
          gradient.addColorStop(1, "rgba(14, 165, 233, 0.05)");
          return gradient;
        },
        fill: true,
        tension: 0.4,
        borderWidth: 2.5,
        pointRadius: 2,
        pointHoverRadius: 6,
        pointBackgroundColor: colors.principal.border,
        pointHoverBackgroundColor: colors.principal.main,
        pointHoverBorderColor: isDarkTheme
          ? "rgba(255, 255, 255, 0.8)"
          : "rgba(255, 255, 255, 1)",
        pointHoverBorderWidth: 2,
      },
    ],
  };

  // Yearly amortization bar chart data with enhanced styling
  const yearlyAmortizationData = {
    labels: amortizationData.years,
    datasets: [
      {
        label: "Principal Paid",
        data: amortizationData.principalData,
        backgroundColor: (context: ScriptableContext<"bar">) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) return colors.principal.bg;

          // Create gradient fill
          const gradient = ctx.createLinearGradient(
            0,
            chartArea.bottom,
            0,
            chartArea.top
          );
          gradient.addColorStop(0, colors.principal.bg);
          gradient.addColorStop(1, colors.principal.gradient);
          return gradient;
        },
        borderRadius: 4,
        borderSkipped: false,
        stack: "Stack 0",
        hoverBackgroundColor: colors.principal.gradient,
        borderColor: colors.principal.border,
        borderWidth: 1,
      },
      {
        label: "Interest Paid",
        data: amortizationData.interestData,
        backgroundColor: (context: ScriptableContext<"bar">) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) return colors.interest.bg;

          // Create gradient fill
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
        borderRadius: 4,
        borderSkipped: false,
        stack: "Stack 0",
        hoverBackgroundColor: colors.interest.gradient,
        borderColor: colors.interest.border,
        borderWidth: 1,
      },
    ],
  };

  // Common options for currency formatting in tooltips
  const currencyTooltipOptions: ChartOptions<"line" | "bar"> = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context: TooltipItem<"line" | "bar">) {
            let label = context.dataset.label || "";
            if (label) {
              label += ": ";
            }
            if (context.parsed !== null) {
              label += formateCurrency(
                typeof context.parsed === "number"
                  ? context.parsed
                  : context.parsed.y || 0
              );
            }
            return label;
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
      },      x: {
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
          maxTicksLimit: 15, // Limit the number of ticks to prevent overcrowding
          callback: function(val, index) {
            // Skip some labels to avoid crowding with long tenure loans
            if (index % 2 !== 0 && this.chart) {
              const labels = this.chart.data.labels || [];
              if (labels.length > 20) {
                return '';
              }
            }
            return val;
          }
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
    },    layout: {
      padding: {
        top: 10,
        bottom: 8,
        left: 8,
        right: 8,
      },
    },
    elements: {
      point: {
        radius: 0,
        hitRadius: 8,
        hoverRadius: 6,
      },
      line: {
        tension: 0.4,
        borderJoinStyle: "round",
        capBezierPoints: true,
      },
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
  }; // Specific options for donut chart
  const donutOptions: ChartOptions<"doughnut"> = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context: TooltipItem<"doughnut">) {
            const label = context.label || "";
            const value = formateCurrency(context.parsed);
            const total = (
              context.chart.data.datasets[0].data as number[]
            ).reduce((a: number, b: number) => a + b, 0);
            const percentage = Math.round((context.parsed / total) * 100);
            return `${label}: ${value} (${percentage}%)`;
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
        position: "bottom",
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
      },
    },
    maintainAspectRatio: false,
    responsive: true,
    cutout: "70%",
    animation: {
      animateScale: true,
      animateRotate: true,
      duration: 1000,
      easing: "easeOutQuart",
    },
    elements: {
      arc: {
        borderWidth: 1.5,
        borderRadius: 4,
      },
    },
  };
  // More modern card styling with refined glass effect
  const chartCardClass = isDarkTheme
    ? "bg-gray-900/40 backdrop-blur-sm p-4 md:p-5 rounded-xl shadow-lg border border-gray-800/40 hover:bg-gray-900/50 transition-all duration-300"
    : "bg-white/80 backdrop-blur-sm p-4 md:p-5 rounded-xl shadow-md border border-gray-100 hover:bg-white/90 transition-all duration-300";

  // Function to toggle expanded/collapsed state
  const toggleExpanded = () => setIsExpanded(!isExpanded);

  return (
    <div className="mb-8">
      {/* Collapsible header with toggle button - modern styling */}
      <div
        className="flex items-center justify-between cursor-pointer mb-4 group"
        onClick={toggleExpanded}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            toggleExpanded();
          }
        }}
        aria-expanded={isExpanded}
        aria-controls="chart-content"
      >
        <div className="flex items-center">
          <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full mr-3 shadow-sm"></div>
          <h2 className="text-lg font-bold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            Loan Visualization
          </h2>
        </div>
        <button
          className="p-2 rounded-full hover:bg-gray-200/70 dark:hover:bg-gray-700/70 transition-all duration-300 hover:scale-110"
          aria-label={isExpanded ? "Collapse charts" : "Expand charts"}
        >
          {isExpanded ? (
            <FaChevronUp
              className="text-gray-500 dark:text-gray-400"
              aria-hidden="true"
            />
          ) : (
            <FaChevronDown
              className="text-gray-500 dark:text-gray-400"
              aria-hidden="true"
            />
          )}
        </button>
      </div>

      {/* Collapsible content with better transition */}
      <div
        id="chart-content"
        className={`transition-all duration-500 ease-in-out overflow-hidden ${
          isExpanded
            ? "max-h-[3000px] opacity-100 scale-100"
            : "max-h-0 opacity-0 scale-95"
        }`}
        aria-hidden={!isExpanded}
        role="region"
        aria-label="Loan charts and visualizations"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">          {/* Principal vs Interest Donut Chart */}
          <div
            className={`${chartCardClass} transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}
          >
            <h3 className="text-base md:text-lg font-semibold mb-3 flex items-center">
              <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 mr-2.5 shadow-sm"></div>
              Payment Breakdown
            </h3>
            <div className="h-[280px]">
              <Doughnut data={principalVsInterestData} options={donutOptions} />
            </div>
            <div className="text-center text-sm text-gray-500 dark:text-gray-300 mt-3 font-medium">
              Total Amount: {formateCurrency(totalAmountPayable)}
            </div>
          </div>          {/* Yearly Amortization Bar Chart */}
          <div
            className={`${chartCardClass} transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}
          >            <h3 className="text-base md:text-lg font-semibold mb-3 flex items-center">
              <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 mr-2.5 shadow-sm"></div>
              Yearly Amortization
            </h3>
            <div className="overflow-x-auto sm:overflow-x-visible overflow-y-hidden relative" style={{ 
              minWidth: "100%",
              width: "100%", 
              scrollbarWidth: "thin",
              scrollbarColor: isDarkTheme ? "#4B5563 #1F2937" : "#CBD5E1 #F1F5F9",
            }}>              <div style={{ 
                minWidth: amortizationData.years.length > 10 
                  ? `${Math.max(600, Math.min(1200, amortizationData.years.length * 40))}px` 
                  : "100%",
                width: "100%", 
                maxWidth: amortizationData.years.length > 10 ? "none" : "100%",
                height: "280px",
              }}>                <Bar
                  data={yearlyAmortizationData}
                  options={{
                    ...currencyTooltipOptions,
                    maintainAspectRatio: false,
                    responsive: true,
                    plugins: {
                      ...currencyTooltipOptions.plugins,
                      legend: {
                        ...currencyTooltipOptions.plugins?.legend,
                        display: true,
                      }
                    },
                    scales: {
                      ...currencyTooltipOptions.scales,
                      x: {
                        ...currencyTooltipOptions.scales?.x,
                        ticks: {
                          ...currencyTooltipOptions.scales?.x?.ticks,
                          autoSkip: true,
                          maxTicksLimit: amortizationData.years.length > 15 ? 15 : undefined,
                        }
                      }
                    }
                  }}
                />
              </div>
            </div>            <div className="text-xs text-right text-gray-500 dark:text-gray-400 mt-2 sm:hidden">
              {amortizationData.years.length > 10 && "← Swipe horizontally to see all years →"}
            </div>
          </div>          {/* Loan Balance Area Chart */}
          <div
            className={`${chartCardClass} mb-2 lg:col-span-2 transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}
          >            <h3 className="text-base md:text-lg font-semibold mb-3 flex items-center">
              <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-green-500 to-teal-500 mr-2.5 shadow-sm"></div>
              Loan Balance Over Time
            </h3>
            <div className="overflow-x-auto sm:overflow-x-visible overflow-y-hidden relative" style={{ 
              minWidth: "100%",
              width: "100%", 
              scrollbarWidth: "thin",
              scrollbarColor: isDarkTheme ? "#4B5563 #1F2937" : "#CBD5E1 #F1F5F9",
            }}>              <div style={{ 
                minWidth: scheduleChartData.length > 20 
                  ? `${Math.max(800, Math.min(1600, scheduleChartData.length * 25))}px` 
                  : "100%",
                width: "100%",
                maxWidth: scheduleChartData.length > 20 ? "none" : "100%",
                height: "280px",
              }}>                <Line 
                  data={balanceChartData} 
                  options={{
                    ...currencyTooltipOptions,
                    maintainAspectRatio: false,
                    responsive: true,
                    plugins: {
                      ...currencyTooltipOptions.plugins,
                      legend: {
                        ...currencyTooltipOptions.plugins?.legend,
                        display: true,
                      }
                    },
                    scales: {
                      ...currencyTooltipOptions.scales,
                      x: {
                        ...currencyTooltipOptions.scales?.x,
                        ticks: {
                          ...currencyTooltipOptions.scales?.x?.ticks,
                          autoSkip: true,
                          maxTicksLimit: scheduleChartData.length > 30 ? 20 : 30,
                        }
                      }
                    }
                  }}
                />
              </div>
            </div>            <div className="text-xs text-right text-gray-500 dark:text-gray-400 mt-2 sm:hidden">
              {scheduleChartData.length > 20 && "← Swipe horizontally to see full timeline →"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
