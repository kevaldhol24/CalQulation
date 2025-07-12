"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FrequencyInputProps {
  label: string;
  id: string;
  title?: string;
  name: string;
  required?: boolean;
  value: number;
  onChange: (value: number) => void;
}

export const FrequencyInput: React.FC<FrequencyInputProps> = ({
  label,
  id,
  title,
  name,
  required = false,
  value,
  onChange,
}) => {
  const frequencyOptions = [
    { value: 12, label: "Annually" },
    { value: 6, label: "Semi-Annually" },
    { value: 3, label: "Quarterly" },
    { value: 1, label: "Monthly" },
  ];

  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
        {required && <span className="text-destructive">*</span>}
      </label>
      <Select
        value={value.toString()}
        onValueChange={(val) => onChange(Number(val))}
        name={name}
        required={required}
      >
        <SelectTrigger
          id={id}
          title={title}
          className="w-full h-10 px-3 py-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground focus:bg-background focus:text-foreground"
        >
          <SelectValue placeholder="Select frequency" />
        </SelectTrigger>
        <SelectContent>
          {frequencyOptions.map((option) => (
            <SelectItem key={option.value} value={option.value.toString()}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
