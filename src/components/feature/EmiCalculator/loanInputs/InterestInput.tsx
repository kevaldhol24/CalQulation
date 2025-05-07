"use client";

import { ChangeEvent, FC, useCallback, useEffect, useState } from "react";
import { TextField } from "../../../common/TextField";
import { Slider } from "@/components/common/Slider";

interface InterestInputProps
  extends Omit<React.ComponentProps<"input">, "value" | "onChange" | "onBlur"> {
  value?: number;
  hideSlider?: boolean;
  minValue?: number;
  maxValue?: number;
  onChange?: (value: number | null) => void;
}

export const InterestInput: FC<InterestInputProps> = ({
  value,
  hideSlider,
  minValue = 1,
  maxValue = 30,
  onChange,
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

  const handleSliderChange = (value: number | null) => {
    setLocalValue(value?.toString() || null);
    if (onChange) {
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
        label="Interest Rate"
        required
        id="interestRate"
        name="interest"
        title="interest"
        endAdornment={"%"}
        placeholder="Enter interest rate"
        className="w-full pr-11"
        value={localValue?.toLocaleString() || ""}
        onChange={handleInputChange}
        onBlur={handleBlur}
      />
      {!hideSlider && (
        <div className="mt-1">
          <Slider
            min={3}
            max={30}
            step={0.5}
            value={
              (localValue ? parseFloat(localValue) : undefined) || undefined
            }
            onChange={handleSliderChange}
            marks={[
              { value: 7, label: "7%" },
              { value: 10, label: "10%" },
              { value: 15, label: "15%" },
              { value: 20, label: "20%" },
              { value: 25, label: "25%" },
            ]}
          />
        </div>
      )}
    </div>
  );
};
