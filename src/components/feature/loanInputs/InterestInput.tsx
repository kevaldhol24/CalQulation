"use client";

import { FC, useEffect, useState } from "react";
import { TextField } from "../../common/TextField";
import { Slider } from "@/components/common/Slider";

interface InterestInputProps
  extends Omit<React.ComponentProps<"input">, "value" | "onChange" | "onBlur"> {
  value?: number;
  defaultValue?: number;
  onChange?: (value: number | null) => void;
  onBlur?: (value: number | null) => void;
}

const MAX_VALUE = 30;
const MIN_VALUE = 3;

export const InterestInput: FC<InterestInputProps> = ({
  value,
  onChange,
  onBlur,
  defaultValue,
  ...props
}) => {
  const [localValue, setLocalValue] = useState<number | null>(
    value || defaultValue || null
  );

  useEffect(() => {
    setLocalValue(value || defaultValue || null);
  }, [value, defaultValue]);

  const handleChange = (newValue: string | number) => {
    let numericValue: number | null =
      typeof newValue === "string"
        ? parseFloat(newValue.replace(/,/g, ""))
        : newValue;
    if (isNaN(numericValue)) {
      numericValue = defaultValue || null;
    }else{
      numericValue = Math.max(MIN_VALUE, Math.min(MAX_VALUE, numericValue));
    }
    setLocalValue(numericValue);
    onChange?.(numericValue);
  };

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
        value={localValue?.toLocaleString()}
        onChange={({ target: { value } }) => handleChange(value)}
        onBlur={() => onBlur?.(localValue)}
      />
      <div className="mt-1">
        <Slider
          min={3}
          max={30}
          step={0.5}
          value={localValue || undefined}
          onChange={handleChange}
          marks={[
            { value: 7, label: "7%" },
            { value: 10, label: "10%" },
            { value: 15, label: "15%" },
            { value: 20, label: "20%" },
            { value: 25, label: "25%" },
          ]}
        />
      </div>
    </div>
  );
};
