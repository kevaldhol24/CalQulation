import { clsx, type ClassValue } from "clsx";
import moment from "moment";
import { twMerge } from "tailwind-merge";
import { DATE_ISO } from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formateDate = (date: Date) => {
  return moment(date).format(DATE_ISO);
};

export const isInterestRateRealistic = (loanAmount: number, emi: number, interestRate: number): boolean => {
  // Calculate maximum interest rate based on loan amount and EMI
  if (emi <= 0 || loanAmount <= 0 || interestRate <= 0) return false;
  const monthlyRate = interestRate / 1200;
  const monthlyInterest = loanAmount * monthlyRate;
  return (monthlyInterest * (1.1) < emi);
};

/**
 * Checks if two dates represent the same month and year
 */
export const isSameMonth = (date1: string | Date, date2: string | Date): boolean => {
  const d1 = date1 instanceof Date ? date1 : new Date(date1);
  const d2 = date2 instanceof Date ? date2 : new Date(date2);
  return d1.getMonth() === d2.getMonth() && d1.getFullYear() === d2.getFullYear();
};

/**
 * Formats a date to display month and year only
 */
export const formatMonthYear = (date: string | Date): string => {
  return moment(date).format('MMMM YYYY');
};

export const getNameFromSlug = (slug: string): string => {
  return slug.split('-').map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }).join(' ');
}

export const generateSlug = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove non-alphanumeric characters except spaces and hyphens
    .trim()
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with a single hyphen
}

export const comparisonBreakpoints = (compact?: boolean) => {

  const getBreakPoint = (breakpoint: "sm" | "md" | "lg" | "xl") => {
    const bpMapping = {
      sm: compact ? "2xl" : "sm",
      md: compact ? "xl" : "md",
      lg: compact ? "2xl" : "lg",
      xl: compact ? "xl" : "xl",
    };
    return bpMapping[breakpoint] || breakpoint;
  }

  return {
    getBreakPoint
  }
}

/**
 * Checks if we're running in development mode
 */
export const isDevelopment = process.env.NODE_ENV === 'development';

/**
 * Checks if we're running in production mode
 */
export const isProduction = process.env.NODE_ENV === 'production';