"use client";

import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Prepayment } from "./Prepayment";
import { InterestChange } from "./InterestChange";
import { EmiChange } from "./EmiChange";

export const AdvanceLoanInputs = () => {
  const [showAdvanceOptions, setShowAdvanceOptions] = useState(false);

  return (
    <div className="rounded-xl bg-background/50 ">
      <h3
        className="text-lg font-bold flex items-center cursor-pointer gap-2 hover:text-accent-foreground transition-colors"
        onClick={() => setShowAdvanceOptions(!showAdvanceOptions)}
      >
        <span className="text-primary bg-primary/10 p-1 rounded-full">
          {showAdvanceOptions ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
        </span> 
        <span className="">Advance Loan Options</span>
      </h3>

      {showAdvanceOptions && (
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, height: 0 },
            visible: { opacity: 1, height: "auto", transition: { duration: 0.3 } }
          }}
          className="mt-6 space-y-6"
        >
          <div className="grid grid-cols-1 gap-3">
            <Prepayment />
            <InterestChange />
            <EmiChange />
          </div>
        </motion.div>
      )}
    </div>
  );
};
