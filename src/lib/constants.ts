
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


export const SupportedCurrencies = [
  {
    label: "₹ INR - Indian Rupee",
    symbol: "₹",
    currency: "INR",
    iso: "en-IN",
    flag: "IN",
    style: "currency",
    currencyDisplay: "symbol",
    maximumFractionDigits: 2,
  },
  {
    label: "$ USD - United States Dollar",
    symbol: "$",
    currency: "USD",
    iso: "en-US",
    flag: "US",
    style: "currency",
    currencyDisplay: "symbol",
    maximumFractionDigits: 2,
  },
  {
    label: "€ EUR - Euro",
    symbol: "€",
    currency: "EUR",
    iso: "de-DE",
    flag: "EU",
    style: "currency",
    currencyDisplay: "symbol",
    maximumFractionDigits: 2,
  },
  {
    label: "£ GBP - British Pound Sterling",
    symbol: "£",
    currency: "GBP",
    iso: "en-GB",
    flag: "GB",
    style: "currency",
    currencyDisplay: "symbol",
    maximumFractionDigits: 2,
  },
  {
    label: "¥ JPY - Japanese Yen",
    symbol: "¥",
    currency: "JPY",
    iso: "ja-JP",
    flag: "JP",
    style: "currency",
    currencyDisplay: "symbol",
    maximumFractionDigits: 0,
  },
  {
    label: "₩ KRW - South Korean Won",
    symbol: "₩",
    currency: "KRW",
    iso: "ko-KR",
    flag: "KR",
    style: "currency",
    currencyDisplay: "symbol",
    maximumFractionDigits: 0,
  },
  {
    label: "₽ RUB - Russian Ruble",
    symbol: "₽",
    currency: "RUB",
    iso: "ru-RU",
    flag: "RU",
    style: "currency",
    currencyDisplay: "symbol",
    maximumFractionDigits: 2,
  },  
]