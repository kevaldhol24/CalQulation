"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useRD } from "@/contexts/RDContext";
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

export const RDDonutChart = () => {
  const { formateCurrency } = currency();

  const { rdResults, isLoading } = useRD();
  const { theme, systemTheme } = useTheme();
  const chartRef = useRef<ChartJS<"doughnut", number[], string>>(null);

  // Determine if we're in dark mode
  const isDarkTheme =
    theme === "dark" || (theme === "system" && systemTheme === "dark");

  // Re-render the chart on results change
  useEffect(() => {
    const chart = chartRef.current;
    if (chart) {
      chart.update();
    }
  }, [rdResults]);

  // Define theme-aware colors
  const colors = {
    deposits: {
      main: "#f97316", // orange-500
      border: "#ea580c", // orange-600
    },
    interest: {
      main: "#22c55e", // green-500
      border: "#16a34a", // green-600
    },
  };

  if (isLoading || !rdResults) {
    return <Skeleton className="h-[200px] w-full" />;
  }

  const data = {
    labels: ["Total Deposits", "Interest Earned"],
    datasets: [
      {
        data: [rdResults.totalInvestedAmount, rdResults.wealthGain],
        backgroundColor: [colors.deposits.main, colors.interest.main],
        borderColor: [colors.deposits.border, colors.interest.border],
        borderWidth: 2,
        hoverBackgroundColor: [colors.deposits.main, colors.interest.main],
        hoverBorderColor: [colors.deposits.border, colors.interest.border],
        hoverBorderWidth: 3,
      },
    ],
  };

  const options: ChartOptions<"doughnut"> = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "60%",
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          padding: 15,
          usePointStyle: true,
          color: isDarkTheme ? "#e2e8f0" : "#334155",
          font: {
            size: 12,
            weight: 500,
          },
        },
      },
      tooltip: {
        backgroundColor: isDarkTheme ? "#1e293b" : "#ffffff",
        titleColor: isDarkTheme ? "#f1f5f9" : "#0f172a",
        bodyColor: isDarkTheme ? "#e2e8f0" : "#334155",
        borderColor: isDarkTheme ? "#475569" : "#e2e8f0",
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true,
        callbacks: {
          label: (context) => {
            const label = context.label || "";
            const value = formateCurrency(context.parsed);
            const percentage = (
              (context.parsed / rdResults.maturityAmount) *
              100
            ).toFixed(1);
            return `${label}: ${value} (${percentage}%)`;
          },
        },
      },
    },
    animation: {
      animateScale: true,
      duration: 800,
    },
    elements: {
      arc: {
        borderJoinStyle: "round",
      },
    },
  };

  return (
    <div className="h-[200px] w-full">
      <Doughnut ref={chartRef} data={data} options={options} />
    </div>
  );
};
