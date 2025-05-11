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

  // Define theme-aware colors
  const colors = {
    background: isDarkTheme
      ? "rgba(30, 41, 59, 0.7)"
      : "rgba(255, 255, 255, 1)",
    gridLines: isDarkTheme ? "rgba(148, 163, 184, 0.15)" : "rgba(0, 0, 0, 0.1)",
    text: isDarkTheme ? "rgba(255, 255, 255, 0.87)" : "rgba(0, 0, 0, 0.87)",
    principal: {
      main: "#3b82f6",
      bg: isDarkTheme ? "rgba(59, 130, 246, 0.7)" : "rgba(59, 130, 246, 0.8)",
      border: isDarkTheme ? "#60a5fa" : "#2563eb",
    },
    interest: {
      main: "#ef4444",
      bg: isDarkTheme ? "rgba(239, 68, 68, 0.7)" : "rgba(239, 68, 68, 0.8)",
      border: isDarkTheme ? "#f87171" : "#dc2626",
    },
    prepayment: {
      main: "#10b981",
      bg: isDarkTheme ? "rgba(16, 185, 129, 0.7)" : "rgba(16, 185, 129, 0.8)",
      border: isDarkTheme ? "#34d399" : "#059669",
    },
    balance: {
      main: "#8884d8",
      bg: isDarkTheme ? "rgba(136, 132, 216, 0.7)" : "rgba(136, 132, 216, 0.5)",
      border: isDarkTheme ? "#a5a3e0" : "#6d67d0",
    },
  };

  // Process EMI schedule data for charts - moved up before conditional return
  const scheduleChartData = useMemo(() => {
    if (!loanResults?.schedule) return [] as ScheduleChartItem[];

    // Group by year and quarter for better visualization (not showing all months to avoid clutter)
    const yearlyData = loanResults.schedule.reduce(
      (acc: ScheduleChartItem[], item: EMIScheduleItem, index: number) => {
        // Use every 3rd month (quarterly) for charting to avoid overcrowding
        if (index % 3 === 0 || index === loanResults.schedule.length - 1) {
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

    return yearlyData;
  }, [loanResults?.schedule]);

  // Extract yearly trends for amortization - moved up before conditional return
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
    // emi,
    totalAmountPayable,
  } = loanResults.summary;

  // Data for principal vs interest donut chart
  const principalVsInterestData = {
    labels: ["Principal", "Interest", "Prepayment"],
    datasets: [
      {
        label: "Payment Breakdown",
        data: [loanAmount, totalInterestPayable, totalPrepayment],
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
        borderWidth: 1,
      },
    ],
  };

  // Line chart data for loan balance over time
  const balanceChartData = {
    labels: scheduleChartData.map((item) => item.date),
    datasets: [
      {
        label: "Remaining Balance",
        data: scheduleChartData.map((item) => item.remainingBalance),
        borderColor: colors.balance.border,
        backgroundColor: colors.balance.bg,
        fill: true,
        tension: 0.4,
      },
      {
        label: "Principal Paid",
        data: scheduleChartData.map((item) => item.principalPaidTillDate),
        borderColor: colors.principal.border,
        backgroundColor: colors.principal.bg,
        fill: true,
        tension: 0.4,
      },
    ],
  };

  // Monthly payment breakdown line chart data
  //   const paymentBreakdownData = {
  //     labels: scheduleChartData.map(item => item.date),
  //     datasets: [
  //       {
  //         label: 'Principal',
  //         data: scheduleChartData.map(item => item.principalPaid),
  //         borderColor: colors.principal.border,
  //         backgroundColor: colors.principal.bg,
  //         borderWidth: 2,
  //         pointRadius: 0,
  //         tension: 0.4,
  //       },
  //       {
  //         label: 'Interest',
  //         data: scheduleChartData.map(item => item.interestPaid),
  //         borderColor: colors.interest.border,
  //         backgroundColor: colors.interest.bg,
  //         borderWidth: 2,
  //         pointRadius: 0,
  //         tension: 0.4,
  //       },
  //     ],
  //   };

  // Yearly amortization bar chart data
  const yearlyAmortizationData = {
    labels: amortizationData.years,
    datasets: [
      {
        label: "Principal Paid",
        data: amortizationData.principalData,
        backgroundColor: colors.principal.bg,
        stack: "Stack 0",
      },
      {
        label: "Interest Paid",
        data: amortizationData.interestData,
        backgroundColor: colors.interest.bg,
        stack: "Stack 0",
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
      },
      legend: {
        labels: {
          color: colors.text,
        },
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
        },
        grid: {
          color: colors.gridLines,
        },
      },
      x: {
        ticks: {
          color: colors.text,
        },
        grid: {
          color: colors.gridLines,
        },
      },
    },
    maintainAspectRatio: false,
    responsive: true,
  };

  // Specific options for donut chart
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
      },
      legend: {
        labels: {
          color: colors.text,
        },
      },
    },
    maintainAspectRatio: false,
    responsive: true,
  };

  const chartCardClass = isDarkTheme
    ? "bg-gray-500/10 p-4 rounded-lg shadow"
    : "bg-gray-200/10 p-4 rounded-lg shadow";

  // Function to toggle expanded/collapsed state
  const toggleExpanded = () => setIsExpanded(!isExpanded);

  return (
    <div className="mb-6">
      {/* Collapsible header with toggle button */}
      <div
        className="flex items-center justify-between cursor-pointer mb-2"
        onClick={toggleExpanded}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleExpanded();
          }
        }}
        aria-expanded={isExpanded}
        aria-controls="chart-content"
      >
        <h2 className="text-md font-bold">Loan Visualization</h2>
        <button
          className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          aria-label={isExpanded ? "Collapse charts" : "Expand charts"}
        >
          {isExpanded ? <FaChevronUp aria-hidden="true" /> : <FaChevronDown aria-hidden="true" />}
        </button>
      </div>

      {/* Collapsible content with transition */}
      <div
        id="chart-content"
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isExpanded ? "max-h-[3000px] opacity-100" : "max-h-0 opacity-0"
        }`}
        aria-hidden={!isExpanded}
        role="region"
        aria-label="Loan charts and visualizations"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Principal vs Interest Donut Chart */}
          <div className={chartCardClass}>
            <h3 className="text-md font-semibold mb-2">Payment Breakdown</h3>
            <div className="h-64">
              <Doughnut data={principalVsInterestData} options={donutOptions} />
            </div>
            <div className="text-center text-sm text-gray-400 dark:text-gray-300 mt-2">
              Total: {formateCurrency(totalAmountPayable)}
            </div>
          </div>

          {/* Yearly Amortization Bar Chart */}
          <div className={chartCardClass}>
            <h3 className="text-md font-semibold mb-2">Yearly Amortization</h3>
            <div className="h-64">
              <Bar
                data={yearlyAmortizationData}
                options={currencyTooltipOptions}
              />
            </div>
          </div>

          {/* Loan Balance Area Chart */}
          <div className={`${chartCardClass} lg:col-span-2`}>
            <h3 className="text-md font-semibold mb-2">
              Loan Balance Over Time
            </h3>
            <div className="h-64">
              <Line data={balanceChartData} options={currencyTooltipOptions} />
            </div>
          </div>

          {/* Monthly Payment Breakdown Line Chart */}
          {/* <div className={`${chartCardClass} lg:col-span-2`}>
            <h3 className="text-md font-semibold mb-2">Monthly Payment Breakdown</h3>
            <div className="h-64">
              <Line data={paymentBreakdownData} options={currencyTooltipOptions} />
            </div>
            <div className="text-center text-sm text-gray-400 dark:text-gray-300 mt-2">
              EMI: {formateCurrency(emi)}
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};
