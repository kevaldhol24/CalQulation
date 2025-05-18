"use client";

import { ChangeEvent, FC, useEffect, useState } from "react";
import { Slider } from "../../../common/Slider";
import { TextField } from "../../../common/TextField";

interface AmountInputProps
  extends Omit<React.ComponentProps<"input">, "value" | "onChange" | "onBlur"> {
  value?: number;
  hideSlider?: boolean;
  minValue?: number;
  maxValue?: number;
  onChange?: (value: number | null) => void;
}

export const AmountInput: FC<AmountInputProps> = ({
  value,
  hideSlider,
  onChange,
  minValue = 100000,
  maxValue = 100000000,
  ...props
}) => {
  const [localValue, setLocalValue] = useState<number | null>(value || null);

  useEffect(() => {
    setLocalValue(value || null);
  }, [value]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === "") {
      setLocalValue(null);
      return;
    }
    const parsedValue = parseInt(event.target.value.replace(/,/g, ""));
    if (isNaN(parsedValue)) return;
    setLocalValue(parsedValue);
  };

  const handleBlur = () => {
    let value = localValue;
    if (!value || value < minValue) value = minValue;
    if (!value || value > maxValue) value = maxValue;
    if (onChange) {
      setLocalValue(value);
      onChange(value);
    }
  };

  const handleSliderChange = (value: number | null, isDragging?: boolean) => {
    setLocalValue(value);
    // Only trigger onChange when not dragging (on final value)
    if (onChange && !isDragging) {
      onChange(value);
    }
  };

  return (
    <div>
      <TextField
        {...props}
        label="Amount"
        required
        id="loanAmount"
        name="amount"
        title="amount"
        endAdornment={"₹"}
        placeholder="Enter amount"
        className="w-full pr-11"
        value={localValue ? localValue.toLocaleString() : ""}
        onChange={handleInputChange}
        onBlur={handleBlur}
        aria-label="Loan amount"
        aria-describedby="amount-hint"
      />
      <span id="amount-hint" className="sr-only">
        Enter loan amount in rupees
      </span>
      {!hideSlider && (
        <div className="mt-1">
          <Slider
            min={100000}
            max={10000000}
            step={50000}
            marks={[
              { value: 100000, label: "1 L" },
              { value: 1000000, label: "10 L" },
              { value: 3000000, label: "30 L" },
              { value: 5000000, label: "50 L" },
              { value: 7000000, label: "70 L" },
              { value: 10000000, label: "1 Cr" },
            ]}
            value={localValue !== null ? localValue : undefined}
            onChange={handleSliderChange}
            aria-label="Loan amount slider"
            aria-valuemin={100000}
            aria-valuemax={10000000}
            aria-valuenow={localValue || 100000}
          />
        </div>
      )}
    </div>
  );
};
