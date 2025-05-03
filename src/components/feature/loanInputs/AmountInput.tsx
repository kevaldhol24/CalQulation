"use client";

import { FC, useCallback, useEffect, useState } from "react";
import { Slider } from "../../common/Slider";
import { TextField } from "../../common/TextField";

interface AmountInputProps
  extends Omit<React.ComponentProps<"input">, "value" | "onChange" | "onBlur"> {
  value?: number;
  defaultValue?: number;
  onChange?: (value: number | null) => void;
  onBlur?: (value: number | null) => void;
}

const MAX_VALUE = 100000000;
const MIN_VALUE = 100000;

export const AmountInput: FC<AmountInputProps> = ({
  value,
  defaultValue,
  onChange,
  onBlur,
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
          numericValue = localValue || defaultValue || null;
    }
    setLocalValue(numericValue);
    onChange?.(numericValue);
  };

  const handleBlur = useCallback(() => {
    let numericValue: number | null = null;
    if(localValue){
       numericValue = Math.max(MIN_VALUE, Math.min(MAX_VALUE, localValue))
      setLocalValue(numericValue);
    }
    setLocalValue(numericValue);  
    onBlur?.(numericValue);
  }, [localValue, onBlur]);

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
        value={localValue?.toLocaleString() || ""}
        onChange={({ target: { value } }) => handleChange(value)}
        onBlur={handleBlur}
      />
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
          onChange={handleChange}
        />
      </div>
    </div>
  );
};
