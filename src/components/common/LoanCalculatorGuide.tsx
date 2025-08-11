"use client";
import { Button } from "../ui/button";

export const LoanCalculatorGuide = () => {
  return (
    <Button
      type="button"
      onClick={() => {
        if (typeof window !== "undefined") {
          window.dispatchEvent(new CustomEvent("start-emi-tour"));
        }
      }}
      aria-label="Start calculator walkthrough"
      className="fixed bottom-6 left-4 z-[1] rounded-full shadow-lg transition-colors group bg-purple-700"
    >
      <span>How to Use</span>
      <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/20 text-[11px] font-semibold">
        ?
      </span>
    </Button>
  );
};
