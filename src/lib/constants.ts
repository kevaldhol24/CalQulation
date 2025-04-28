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