import { clsx, type ClassValue } from "clsx";
import moment from "moment";
import { twMerge } from "tailwind-merge";
import { CURRENCY_FORMAT_DECIMAL, CURRENCY_ISO, DATE_ISO } from "./constants";
import { EMIChange, InterestRateChange, Prepayment } from "loanwise";

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
 * Get the conflicting inputs for a specific month
 * @returns Array of conflicting input types in the order they will be applied
 */
export const getConflictsForMonth = (
  date: string | Date,
  interestChanges?: InterestRateChange[],
  emiChanges?: EMIChange[],
  prepayments?: Prepayment[]
): string[] => {
  const conflicts: string[] = [];
  
  // Check for interest rate changes
  const hasInterestChange = interestChanges?.some(change => 
    isSameMonth(change.effectiveDate, date)
  );
  if (hasInterestChange) conflicts.push('interest rate change');
  
  // Check for EMI changes
  const hasEmiChange = emiChanges?.some(change => 
    isSameMonth(change.startDate, date)
  );
  if (hasEmiChange) conflicts.push('EMI change');
  
  // Check for prepayments (single and recurring)
  const hasPrepayment = prepayments?.some(prepay => {
    // For one-time prepayments
    if (prepay.type === 'onetime') {
      return isSameMonth(prepay.startDate, date);
    } 
    // For recurring prepayments
    else if (prepay.type === 'monthly') {
      const startDate = new Date(prepay.startDate);
      const currentDate = new Date(date);
      const endDate = prepay.endDate ? new Date(prepay.endDate) : null;
      
      // Check if the date is within the prepayment period
      if (endDate) {
        return currentDate >= startDate && currentDate <= endDate;
      } else {
        return currentDate >= startDate;
      }
    }
    return false;
  });
  if (hasPrepayment) conflicts.push('prepayment');
  
  return conflicts;
};

/**
 * Get all months with conflicting inputs
 * @returns Map of formatted month-year strings to arrays of conflicting input types
 */
export const getAllConflicts = (
  interestChanges?: InterestRateChange[],
  emiChanges?: EMIChange[],
  prepayments?: Prepayment[]
): Map<string, string[]> => {
  const conflictMap = new Map<string, string[]>();
  const allDates = new Set<string>();
  
  // Collect all unique dates from all changes
  interestChanges?.forEach(change => {
    allDates.add(formatMonthYear(change.effectiveDate));
  });
  
  emiChanges?.forEach(change => {
    allDates.add(formatMonthYear(change.startDate));
  });
  
  prepayments?.forEach(prepay => {
    allDates.add(formatMonthYear(prepay.startDate));
    if (prepay.type === 'monthly' && prepay.endDate) {
      // For recurring prepayments, add all months in between
      const start = moment(prepay.startDate);
      const end = moment(prepay.endDate);
      while (start.isSameOrBefore(end)) {
        allDates.add(start.format('MMMM YYYY'));
        start.add(1, 'month');
      }
    }
  });
  
  // Check for conflicts for each date
  allDates.forEach(dateStr => {
    const conflicts = getConflictsForMonth(
      new Date(moment(dateStr, 'MMMM YYYY').format('YYYY-MM-DD')),
      interestChanges,
      emiChanges,
      prepayments
    );
    
    // Only add to map if there are multiple conflicts
    if (conflicts.length > 1) {
      conflictMap.set(dateStr, conflicts);
    }
  });
  
  return conflictMap;
}
