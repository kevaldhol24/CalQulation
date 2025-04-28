"use client";

import { useEffect, useState } from "react";
import { Slider as SliderInput } from "./../ui/slider";

interface SliderProps {
  marks?: { value: number; label: string }[];
  value?: number;
  min: number;
  max: number;
  step?: number;
  onChange?: (value: number) => void;
}

export const Slider: React.FC<SliderProps> = ({
  marks,
  value,
  min,
  max,
  step,
  onChange,
}) => {
  const [localValue, setLocalValue] = useState<number>(value || min);

  const handleChange = ([newValue]: number[]) => {
    setLocalValue(newValue);
    onChange?.(newValue);
  };

  useEffect(() => {
    if (value !== undefined) {
      setLocalValue(value);
    }
  }, [value]);

  const handleMarkClick = (markValue: number) => {
    setLocalValue(markValue);
    onChange?.(markValue);
  };
  const getMarkStyles = (markValue: number) => {
    const percentage = ((markValue - min) / (max - min)) * 100;
    
    return {
      left: `${percentage}%`,
      transform: "translateX(-50%)"
    };
  };

  return (
    <div className="flex flex-col items-center relative pb-6 pt-1">
      <div className="relative w-full custom-range z-1">
        <SliderInput
          value={[localValue]}
          className="cursor-pointer touch-none select-none w-full"
          min={min}
          max={max}
          step={step}
          onValueChange={handleChange}
        />
      </div>
      {marks && (
        <div className="w-full">
          <div className="relative w-[calc(100%-8px)] top-[-4.5px] z-0 mx-auto">
            {marks.map((mark) => (
              <div
                key={mark.value}
                className="absolute flex flex-col items-center gap-2 cursor-pointer"
                style={getMarkStyles(mark.value)}
                role="button"
                tabIndex={-1}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleMarkClick(mark.value);
                  }
                }}
                onClick={() => handleMarkClick(mark.value)}
              >
                <div
                  className={`w-2 h-2 rounded-full ${
                    localValue >= mark.value ? "bg-primary" : "bg-border dark:bg-[#464646]"
                  }`}
                />
                <span className="text-[10px] whitespace-nowrap text-muted-foreground">
                  {mark.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
