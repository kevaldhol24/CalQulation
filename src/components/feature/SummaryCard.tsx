"use client";

import { RocketIcon } from "lucide-react";
import { FC, ReactNode } from "react";

// Color mappings for Tailwind classes
const colorMappings = {
  purple: {
    bg: "bg-purple-100/50 dark:bg-purple-700/10",
    border: "border-purple-300 dark:border-purple-900",
    icon: "text-purple-500 dark:text-purple-300",
  },
  green: {
    bg: "bg-green-100/50 dark:bg-green-700/10",
    border: "border-green-300 dark:border-green-900",
    icon: "text-green-500 dark:text-green-300",
  },
  blue: {
    bg: "bg-blue-100/50 dark:bg-blue-700/10",
    border: "border-blue-300 dark:border-blue-900",
    icon: "text-blue-500 dark:text-blue-300",
  },
  red: {
    bg: "bg-red-100/50 dark:bg-red-700/10",
    border: "border-red-300 dark:border-red-900",
    icon: "text-red-500 dark:text-red-300",
  },
  yellow: {
    bg: "bg-yellow-100/50 dark:bg-yellow-700/10",
    border: "border-yellow-300 dark:border-yellow-900",
    icon: "text-yellow-500 dark:text-yellow-300",
  },
  orange: {
    bg: "bg-orange-100/50 dark:bg-orange-700/10",
    border: "border-orange-300 dark:border-orange-900",
    icon: "text-orange-500 dark:text-orange-300",
  },
  indigo: {
    bg: "bg-indigo-100/50 dark:bg-indigo-700/10",
    border: "border-indigo-300 dark:border-indigo-900",
    icon: "text-indigo-500 dark:text-indigo-300",
  },
  gray: {
    bg: "bg-gray-100/50 dark:bg-gray-700/10",
    border: "border-gray-300 dark:border-gray-700",
    icon: "text-gray-500 dark:text-gray-300",
  },
};

interface SummaryCardProps {
  value: string | number;
  title: string;
  helpText: string;
  color?: keyof typeof colorMappings;
  icon?: ReactNode;
}

export const SummaryCard: FC<SummaryCardProps> = ({
  value,
  title,
  helpText,
  color = "purple",
  icon,
}) => {
  // Get the color classes or default to purple
  const colorClasses = colorMappings[color] || colorMappings.purple;

  return (
    <div
      className={`rounded border px-4 py-2 ${colorClasses.bg} ${colorClasses.border} flex items-center justify-between rounded-md`}
    >
      <div className={colorClasses.icon}>
        {icon || <RocketIcon size={28} />}
      </div>
      <div className="flex flex-col items-end gap-0">
        <span className={`text-muted-foreground text-sm font-bold`}>
          {title}
        </span>
        <p className={`text-lg font-bold`}>{value}</p>
        <span className={`text-muted-foreground text-xs`}>{helpText}</span>
      </div>
    </div>
  );
};
