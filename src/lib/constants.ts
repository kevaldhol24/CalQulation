export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const START_YEAR = 1970;
export const YEARS_LENGTH = 100;
export const YEARS = Array.from({ length: YEARS_LENGTH }, (_, i) => {
  const year = START_YEAR + i;
  return {
    label: year.toString(),
    value: year,
  };
});

export const DATE_ISO = "YYYY-MM-DD";


export const CURRENCY_ICON = "₹";
export const CURRENCY = "INR";
export const CURRENCY_ISO = "en-IN";
export const CURRENCY_FORMAT_DECIMAL = {
  style: "currency",
  currency: CURRENCY,
  currencyDisplay: "symbol",
  maximumFractionDigits: 2,
};

export const DEFAULT_BLOG_PAGINATION_SIZE = 3;