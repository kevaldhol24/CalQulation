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
