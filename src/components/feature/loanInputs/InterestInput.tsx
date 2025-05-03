"use client";

import { FC, useCallback, useEffect, useState } from "react";
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
  const [localValue, setLocalValue] = useState<string | null>(
    value?.toString() || defaultValue?.toString() || null
  );

  useEffect(() => {
    setLocalValue(value?.toString() || defaultValue?.toString() || null);
  }, [value, defaultValue]);

  const handleChange = (newValue: string) => {

    let numericValue: string | null = newValue.endsWith(".") ? newValue.slice(0, -1) : newValue;

    if (isNaN(Number(numericValue))) {
      numericValue = localValue?.toString() || defaultValue?.toString() || null;
    }else{
      numericValue = newValue;
    }
    setLocalValue(numericValue);
    onChange?.(numericValue ? parseFloat(numericValue) : null);
  };

  const handleBlur = useCallback(() => {
    let numericValue: number | null = null;
    if (localValue) {
      numericValue = Math.max(MIN_VALUE, Math.min(MAX_VALUE, parseFloat(localValue)));
      setLocalValue(numericValue.toString());
    }
    setLocalValue(numericValue?.toString() || null);
    onBlur?.(numericValue);
  }, [localValue, onBlur]);

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
        onChange={({ target: { value } }) => handleChange(value)}
        onBlur={handleBlur}
      />
      <div className="mt-1">
        <Slider
          min={3}
          max={30}
          step={0.5}
          value={(localValue ? parseFloat(localValue) : undefined) || undefined}
          onChange={(value)=>handleChange(value.toString())}
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
