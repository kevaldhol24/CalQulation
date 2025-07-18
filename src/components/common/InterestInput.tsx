"use client";

import { ChangeEvent, FC, useCallback, useEffect, useState } from "react";
import { TextField } from "./TextField";
import { Slider } from "@/components/common/Slider";

interface InterestInputProps
  extends Omit<
    React.ComponentProps<"input">,
    "value" | "onChange" | "onBlur" | "label"
  > {
  label: string;
  value?: number;
  hideSlider?: boolean;
  minValue?: number;
  maxValue?: number;
  onChange?: (value: number | null) => void;
  sliderMax?: number;
  sliderMin?: number;
  step?: number;
  marks?: { value: number; label: string }[];
}

const defaultMarks = [
  { value: 7, label: "7%" },
  { value: 10, label: "10%" },
  { value: 15, label: "15%" },
  { value: 20, label: "20%" },
  { value: 25, label: "25%" },
];

export const InterestInput: FC<InterestInputProps> = ({
  value,
  label,
  hideSlider,
  minValue = 1,
  maxValue = 30,
  onChange,
  sliderMax = 30,
  sliderMin = 1,
  step = 0.5,
  marks = defaultMarks,
  ...props
}) => {
  const [localValue, setLocalValue] = useState<string | null>(
    value?.toString() || null
  );

  useEffect(() => {
    setLocalValue(value?.toString() || null);
  }, [value]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === "") {
      setLocalValue(null);
      return;
    }
    const newValue = event.target.value;
    const parsedValue: string | null = newValue.endsWith(".")
      ? newValue.slice(0, -1)
      : newValue;
    if (isNaN(Number(parsedValue))) return;
    setLocalValue(newValue);
  };

  const handleSliderChange = (value: number | null, isDragging?: boolean) => {
    setLocalValue(value?.toString() || null);
    // Only trigger onChange when not dragging (on final value).
    if (onChange && !isDragging) {
      onChange(value);
    }
  };

  const handleBlur = useCallback(() => {
    let value = localValue;
    if (!value || parseFloat(value) < (minValue || 0))
      value = minValue?.toString() || null;
    if (!value || parseFloat(value) > (maxValue || Infinity))
      value = maxValue?.toString() || null;
    if (onChange) {
      setLocalValue(value);
      onChange(value ? parseFloat(value) : null);
    }
  }, [localValue, onChange, minValue, maxValue]);
  return (
    <div>
      <TextField
        {...props}
        label={label}
        endAdornment={"%"}
        className="w-full pr-11"
        value={localValue?.toLocaleString() || ""}
        onChange={handleInputChange}
        onBlur={handleBlur}
        aria-label="Interest rate percentage"
        aria-describedby="interest-hint"
        type="number"
      />
      <span id="interest-hint" className="sr-only">
        Enter annual interest rate in percentage
      </span>
      {!hideSlider && (
        <div className="mt-1">
          <Slider
            min={sliderMin}
            max={sliderMax}
            step={step}
            value={
              (localValue ? parseFloat(localValue) : undefined) || undefined
            }
            onChange={handleSliderChange}
            marks={marks}
            aria-label="Interest rate slider"
            aria-valuemin={sliderMin}
            aria-valuemax={sliderMax}
            aria-valuenow={localValue ? parseFloat(localValue) : sliderMin}
          />
        </div>
      )}
    </div>
  );
};
