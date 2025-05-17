import { clsx, type ClassValue } from "clsx";
import moment from "moment";
import { twMerge } from "tailwind-merge";
import { CURRENCY_FORMAT_DECIMAL, CURRENCY_ISO, DATE_ISO } from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formateDate = (date: Date) => {
  return moment(date).format(DATE_ISO);
};

export const formateCurrency = (amount: number) => {
  return new Intl.NumberFormat(CURRENCY_ISO, CURRENCY_FORMAT_DECIMAL as never).format(
    amount
  );
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

/**
 * Checks if we're running in development mode
 */
export const isDevelopment = process.env.NODE_ENV === 'development';

/**
 * Checks if we're running in production mode
 */
export const isProduction = process.env.NODE_ENV === 'production';