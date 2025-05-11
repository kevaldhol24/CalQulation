"use client";

import { FC, useCallback, useEffect, useState } from "react";
import { Slider } from "../../../common/Slider";
import { TextField } from "../../../common/TextField";
import { Button } from "@/components/ui/button";

interface TenureInputProps
  extends Omit<React.ComponentProps<"input">, "value" | "onChange" | "onBlur"> {
  value?: number;
  defaultValue?: number;
  onChange?: (value: number | null) => void;
  onBlur?: (value: number | null) => void;
}

const MAX_VALUE = 360; // 30 years in months
const MIN_VALUE = 6; // 1 year in months

export const TenureInput: FC<TenureInputProps> = ({
  value,
  defaultValue,
  onChange,
  onBlur,
  ...props
}) => {
  const [localValue, setLocalValue] = useState<number | null>(
    value || defaultValue || null
  );
  const [tenureUnit, setTenureUnit] = useState<"Yr" | "Mo">("Yr");

  const handleTenureUnitChange = (unit: "Yr" | "Mo") => {
    setTenureUnit(unit);
  };

  useEffect(() => {
    setLocalValue(value || defaultValue || null);
  }, [value, defaultValue]);

  const handleChange = useCallback(
    (newValue: string | number) => {
      let numericValue: number | null =
        typeof newValue === "string"
          ? parseFloat(newValue.replace(/,/g, ""))
          : newValue;
      if (isNaN(numericValue)) {
        numericValue = localValue || defaultValue || null;
      }
      if (numericValue && tenureUnit === "Yr") {
        numericValue = numericValue * 12;
      }
      setLocalValue(numericValue);
      onChange?.(numericValue);
    },
    [defaultValue, localValue, onChange, tenureUnit]
  );

  const handleBlur = useCallback(() => {
    let numericValue: number | null = null;
    if (localValue) {
      numericValue = Math.max(MIN_VALUE, Math.min(MAX_VALUE, localValue));
      setLocalValue(numericValue);
    }
    setLocalValue(numericValue);
    onBlur?.(numericValue);
  }, [localValue, onBlur]);

  const handleSliderChange = (newValue: number) => {
    setLocalValue(newValue);
    onChange?.(newValue);
  };

  return (
    <div>
      <TextField
        {...props}
        label="Tenure"
        required
        id="loanTenure"
        name="tenure"
        title="tenure"
        endAdornment={
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
        }
        adornmentClassName="!right-0 !px-0 !top-[24px] !border-none"
        placeholder="Enter tenure"
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
      <span id="tenure-hint" className="sr-only">Enter loan tenure in {tenureUnit === "Yr" ? "years" : "months"}</span>
      <div className="mt-1">
        <Slider
          min={12}
          max={360}
          step={6}
          marks={[
            { value: 24, label: tenureUnit === "Mo" ? "24 Mo" : "2 Yr" },
            { value: 60, label: tenureUnit === "Mo" ? "60 Mo" : "5 Yr" },
            { value: 120, label: tenureUnit === "Mo" ? "120 Mo" : "10 Yr" },
            { value: 180, label: tenureUnit === "Mo" ? "180 Mo" : "15 Yr" },
            { value: 240, label: tenureUnit === "Mo" ? "240 Mo" : "20 Yr" },
            { value: 300, label: tenureUnit === "Mo" ? "300 Mo" : "25 Yr" },
            { value: 360, label: tenureUnit === "Mo" ? "360 Mo" : "30 Yr" },
          ]}
          value={localValue !== null ? localValue : undefined}
          onChange={handleSliderChange}
          aria-label="Loan tenure slider"
          aria-valuemin={12}
          aria-valuemax={360}
          aria-valuenow={localValue || 12}
          aria-valuetext={`${tenureUnit === "Yr" ? (localValue || 12) / 12 : localValue || 12} ${tenureUnit === "Yr" ? "years" : "months"}`}
        />
      </div>
    </div>
  );
};
