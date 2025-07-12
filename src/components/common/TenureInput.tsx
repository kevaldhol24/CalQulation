"use client";

import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { Slider } from "./Slider";
import { TextField } from "./TextField";
import { Button } from "@/components/ui/button";

interface TenureInputProps
  extends Omit<
    React.ComponentProps<"input">,
    "value" | "onChange" | "onBlur" | "label"
  > {
  label: string;
  value?: number;
  defaultValue?: number;
  hideSlider?: boolean;
  onChange?: (value: number | null) => void;
  minValue?: number;
  maxValue?: number;
  step?: number;
  getMarks?: (tenureUnit: "Yr" | "Mo") => { value: number; label: string }[];
  sliderMax?: number;
  sliderMin?: number;
  onlyYears?: boolean; // If true, only show years in the input
}

const MAX_VALUE = 360; // 30 years in months
const MIN_VALUE = 6; // 1 year in months

export const TenureInput: FC<TenureInputProps> = ({
  value,
  label,
  defaultValue,
  hideSlider,
  onChange,
  minValue = MIN_VALUE,
  maxValue = MAX_VALUE,
  step = 6,
  sliderMax = MAX_VALUE,
  sliderMin = MIN_VALUE,
  getMarks,
  onlyYears = false,
  ...props
}) => {
  const [localValue, setLocalValue] = useState<number | null>(
    value || defaultValue || null
  );
  const [tenureUnit, setTenureUnit] = useState<"Yr" | "Mo">("Yr");
  const [markList, setMarkList] = useState<{ value: number; label: string }[]>(
    []
  );

  const handleTenureUnitChange = (unit: "Yr" | "Mo") => {
    setTenureUnit(unit);
  };

  useEffect(() => {
    setLocalValue(value || defaultValue || null);
  }, [value, defaultValue]);

  const handleChange = useCallback(
    (newValue: string | number) => {
      if (newValue === "") {
        setLocalValue(null);
        return;
      }

      let numericValue: number | null =
        typeof newValue === "string"
          ? parseFloat(newValue.replace(/,/g, ""))
          : newValue;
      if (isNaN(numericValue)) {
        return;
      }
      if (numericValue && tenureUnit === "Yr") {
        numericValue = numericValue * 12;
      }
      setLocalValue(numericValue);
    },
    [tenureUnit]
  );

  const handleBlur = useCallback(() => {
    let numericValue: number | null = null;
    if (localValue) {
      numericValue = Math.max(minValue, Math.min(maxValue, localValue));
      setLocalValue(numericValue);
    }
    setLocalValue(numericValue);
    onChange?.(numericValue);
  }, [localValue, maxValue, minValue, onChange]);

  const handleSliderChange = (newValue: number, isDragging?: boolean) => {
    setLocalValue(newValue);
    // Only trigger onChange when not dragging (on final value)
    if (onChange && !isDragging) {
      onChange(newValue);
    }
  };

  const defaultMarks = useMemo(() => {
    return [
      { value: 24, label: tenureUnit === "Mo" ? "24 Mo" : "2 Yr" },
      { value: 60, label: tenureUnit === "Mo" ? "60 Mo" : "5 Yr" },
      { value: 120, label: tenureUnit === "Mo" ? "120 Mo" : "10 Yr" },
      { value: 180, label: tenureUnit === "Mo" ? "180 Mo" : "15 Yr" },
      { value: 240, label: tenureUnit === "Mo" ? "240 Mo" : "20 Yr" },
      { value: 300, label: tenureUnit === "Mo" ? "300 Mo" : "25 Yr" },
      { value: 360, label: tenureUnit === "Mo" ? "360 Mo" : "30 Yr" },
    ];
  }, [tenureUnit]);

  useEffect(() => {
    if (getMarks) {
      setMarkList(getMarks(tenureUnit));
    } else {
      setMarkList(defaultMarks);
    }
  }, [defaultMarks, getMarks, tenureUnit]);

  return (
    <div>
      <TextField
        {...props}
        label={label}
        endAdornment={
          !onlyYears ? (
            <div>
              <Button
                variant="ghost"
                className={`border-x-1 ${
                  tenureUnit === "Yr" ? "bg-muted border-y-1" : ""
                }`}
                style={{ borderRadius: "0" }}
                onClick={() => handleTenureUnitChange("Yr")}
                aria-label="Set tenure in years"
                aria-pressed={tenureUnit === "Yr"}
              >
                Yr
              </Button>
              <Button
                variant="ghost"
                className={`border-0 ${
                  tenureUnit === "Mo" ? "bg-muted border-y-1" : ""
                }`}
                style={{ borderRadius: "0 6px 6px 0" }}
                onClick={() => handleTenureUnitChange("Mo")}
                aria-label="Set tenure in months"
                aria-pressed={tenureUnit === "Mo"}
              >
                Mo
              </Button>
            </div>
          ) : null
        }
        adornmentClassName="!right-0 !px-0 !top-[24px] !border-none"
        className="w-full pr-11"
        value={
          tenureUnit === "Yr" && localValue
            ? (localValue / 12).toLocaleString()
            : localValue?.toLocaleString() || ""
        }
        onChange={({ target: { value } }) => handleChange(value)}
        onBlur={handleBlur}
        aria-label="Loan tenure"
        aria-describedby="tenure-hint"
      />
      <span id="tenure-hint" className="sr-only">
        Enter loan tenure in {tenureUnit === "Yr" ? "years" : "months"}
      </span>
      {!hideSlider && (
        <div className="mt-1">
          <Slider
            min={sliderMin}
            max={sliderMax}
            step={step}
            marks={markList || defaultMarks}
            value={localValue !== null ? localValue : undefined}
            onChange={handleSliderChange}
            aria-label="Loan tenure slider"
            aria-valuemin={sliderMin}
            aria-valuemax={sliderMax}
            aria-valuenow={localValue || sliderMin}
            aria-valuetext={`${
              tenureUnit === "Yr" ? (localValue || 12) / 12 : localValue || 12
            } ${tenureUnit === "Yr" ? "years" : "months"}`}
          />
        </div>
      )}
    </div>
  );
};
