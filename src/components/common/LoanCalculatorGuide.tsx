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
      style={{ borderRadius: "6px 6px 0 0" }}
      className="absolute right-1/2 translate-x-1/2 bottom-[calc(100%-6px)] z-[1] bg-background hover:bg-background/90 shadow-lg transition-colors group"
    >
      <span>How to Use</span>
      <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/20 text-[11px] font-semibold">
        ?
      </span>
    </Button>
  );
};
