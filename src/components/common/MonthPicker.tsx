"use client";

import { MONTHS, START_YEAR, YEARS } from "@/lib/constants";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { IoMdCalendar } from "react-icons/io";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { TextField } from "./TextField";

interface MonthPickerProps
  extends Omit<
    React.ComponentProps<"input">,
    "onChange" | "value" | "defaultValue"
  > {
  label: string;
  wrapperClassName?: string;
  value?: Date;
  defaultValue?: Date;
  minDate?: Date;
  maxDate?: Date;
  onChange?: (value: Date | null) => void;
}

const today = new Date();

export const MonthPicker: FC<MonthPickerProps> = ({
  label,
  value,
  defaultValue,
  onChange,
  minDate,
  maxDate,
  ...props
}) => {
  const [localValue, setLocalValue] = useState<Date | null>(null);

  const [showYears, setShowYears] = useState(false);
  const [yearsPage, setYearsPage] = useState(0);

  const [selectedMonth, setSelectedMonth] = useState(today.getMonth());
  const [selectedYear, setSelectedYear] = useState(today.getFullYear());

  useEffect(() => {
    setLocalValue(value || defaultValue || null);
    const month = value ? value.getMonth() : defaultValue?.getMonth();
    const year = value ? value.getFullYear() : defaultValue?.getFullYear();
    setSelectedMonth(month || today.getMonth());
    setSelectedYear(year || today.getFullYear());
  }, [value, defaultValue]);

  useEffect(() => {
    const currentYear = localValue?.getFullYear() || today.getFullYear();
    const yearDiff = currentYear - START_YEAR;

    const newPage = Math.floor(yearDiff / 12);
    setYearsPage(newPage);
  }, [localValue]);

  const years = useMemo(() => {
    return YEARS.slice(yearsPage * 12, (yearsPage + 1) * 12).map(({ value }) =>
      value.toString()
    );
  }, [yearsPage]);

  const handleMonthChange = (month: number) => {
    setSelectedMonth(month);
    const newDate = new Date(selectedYear, month);
    onChange?.(newDate);
    setLocalValue(newDate);
  };

  const handleYearChange = (year: number) => {
    setSelectedYear(year);
    setShowYears(false);
  };

  const handlePrevious = useCallback(() => {
    if (showYears) {
      setYearsPage((prev) => prev - 1);
      return;
    }
    const newYear = selectedYear - 1;
    handleYearChange(newYear);
  }, [showYears, selectedYear]);

  const handleNext = useCallback(() => {
    if (showYears) {
      setYearsPage((prev) => prev + 1);
      return;
    }
    const newYear = selectedYear + 1;

    handleYearChange(newYear);
  }, [showYears, selectedYear]);

  const getVariant = useCallback(
    (item: string) => {
      if (showYears) {
        return item === selectedYear.toString() ? "default" : "ghost";
      }
      const currentYear = localValue?.getFullYear() || today.getFullYear();
      return item.toLocaleLowerCase() ===
        MONTHS[selectedMonth].toLocaleLowerCase() &&
        selectedYear === currentYear
        ? "default"
        : "ghost";
    },
    [selectedMonth, selectedYear, localValue, showYears]
  );

  const disableNext = useMemo(() => {
    if (showYears) {
      const newPage = yearsPage + 1;

      const isValidYear = YEARS.slice(newPage * 12, (newPage + 1) * 12).some(
        ({ value }) => (maxDate ? value <= maxDate?.getFullYear() : true)
      );

      return !isValidYear;
    }
    const newYear = selectedYear + 1;
    const isValidYear = maxDate ? newYear <= maxDate?.getFullYear() : true;
    return !isValidYear;
  }, [showYears, selectedYear, maxDate, yearsPage]);

  const disablePrevious = useMemo(() => {
    if (showYears) {
      const newPage = yearsPage - 1;

      const isValidYear = YEARS.slice(newPage * 12, (newPage + 1) * 12).some(
        ({ value }) => (minDate ? value >= minDate?.getFullYear() : true)
      );

      return !isValidYear;
    }
    const newYear = selectedYear - 1;
    const isValidYear = minDate ? newYear >= minDate?.getFullYear() : true;
    return !isValidYear;
  }, [showYears, selectedYear, minDate, yearsPage]);

  const getDisabledState = useCallback(
    (item: string) => {
      let isValid = true;

      if (showYears) {
        if (minDate) {
          isValid = Number(item) >= minDate.getFullYear();
        }

        if (maxDate) {
          isValid = Number(item) <= maxDate.getFullYear();
        }
      } else {
        if (minDate) {
          isValid = new Date(selectedYear, MONTHS.indexOf(item) + 1) >= minDate;
        }

        if (maxDate) {
          isValid =
            isValid && new Date(selectedYear, MONTHS.indexOf(item)) <= maxDate;
        }
      }

      return !isValid;
    },
    [showYears, minDate, maxDate, selectedYear]
  );

  const inputValue = useMemo(() => {
    if (localValue) {
      const date = localValue;
      return date
        ? date.toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
          })
        : undefined;
    }
    return;
  }, [localValue]);

  const handleCalendarClick = (
    e: React.MouseEvent<HTMLElement>,
    item: string
  ) => {
    if (showYears) {
      e.stopPropagation();
      e.preventDefault();
      handleYearChange(Number(item));
    } else {
      handleMonthChange(MONTHS.indexOf(item));
    }
  };

  return (
    <div className={`relative ${props.wrapperClassName}`}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <TextField
            {...props}
            label={label}
            value={inputValue || props.placeholder}
            className={`cursor-pointer text-left ${
              inputValue ? "" : "text-muted-foreground"
            }`}
            endAdornment={
              <div className="h-full py-1 cursor-pointer">
                <IoMdCalendar />
              </div>
            }
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" data-state="open">
          <div className="flex items-center justify-between px-2 py-1">
            <Button
              variant="outline"
              className="radius-full h-9 w-9"
              style={{ borderRadius: "50%" }}
              onClick={handlePrevious}
              disabled={disablePrevious}
            >
              <ChevronLeft />
            </Button>
            <Button
              variant="ghost"
              className="font-normal"
              onClick={() => setShowYears(true)}
            >
              {selectedYear}
            </Button>
            <Button
              variant="outline"
              className="radius-full h-9 w-9"
              style={{ borderRadius: "50%" }}
              onClick={handleNext}
              disabled={disableNext}
            >
              <ChevronRight />
            </Button>
          </div>
          <div>
            <div className="grid grid-cols-4 gap-2 p-2">
              {(showYears ? years : MONTHS).map((item) => (
                <DropdownMenuItem
                  key={item}
                  onClick={(e) => handleCalendarClick(e, item)}
                  disabled={getDisabledState(item)}
                  className="p-0"
                >
                  <Button
                    variant={getVariant(item)}
                    className="w-full font-normal"
                  >
                    {showYears ? item : item.slice(0, 3)}
                  </Button>
                </DropdownMenuItem>
              ))}
            </div>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
