"use client";

import { formateCurrency } from "@/lib/utils";
import { ArrowDown, ChevronDown, ChevronRight, Plus, Rocket, Calendar, Percent, CreditCard } from "lucide-react";
import { useState } from "react";
import { Button } from "../../../ui/button";
import { motion } from "framer-motion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../../../ui/tooltip";

export const AdvanceLoanInputs = () => {
  const [showAdvanceOptions, setShowAdvanceOptions] = useState(false);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  return (
    <div className="rounded-xl bg-background/50 transition-all">
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
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <motion.div 
              variants={cardVariants}
              className="bg-gradient-to-br from-background to-blue-50/30 dark:from-background dark:to-blue-950/20 p-5 rounded-xl border border-blue-100/50 dark:border-blue-900/30 shadow-sm"
            >
              <h4 className="flex justify-between items-center font-semibold mb-3 text-primary">
                <span className="flex items-center gap-2">
                  <Rocket size={18} className="text-blue-500" />
                  Prepayment
                </span>
              </h4>
              
              <div className="text-sm text-muted-foreground mb-5 italic">
                Add prepayment to reduce loan term or EMI
              </div>
              
              <div className="bg-blue-100/50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4 mb-3 hover:shadow-md transition-all">
                <div className="flex items-start gap-3">
                  <div className="bg-blue-500/20 dark:bg-blue-500/10 p-2 rounded-lg text-blue-600 dark:text-blue-400">
                    <Calendar size={18} />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium text-lg">{formateCurrency(100000)}</span>
                    <span className="text-sm text-muted-foreground mt-1">From Apr 2025 to May 2026 (10 months)</span>
                  </div>
                </div>
                <div className="mt-3 flex justify-end">
                  <TooltipProvider delayDuration={300}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="bg-primary/10 text-primary rounded-full px-4 py-1.5 text-xs flex items-center gap-1.5 font-medium hover:bg-primary/20 transition-colors cursor-pointer">
                          <ArrowDown size={14} />
                          Reduce Tenure
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Will reduce your loan tenure</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
              
              <Button 
                variant="outline" 
                className="w-full mt-3 border-dashed bg-blue-50/50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 hover:bg-blue-100/50 dark:hover:bg-blue-800/20 transition-all group"
              >
                <Plus className="mr-2 size-4 group-hover:rotate-90 transition-transform duration-300" /> Add Prepayment
              </Button>
            </motion.div>
            
            <motion.div 
              variants={cardVariants}
              className="bg-gradient-to-br from-background to-amber-50/30 dark:from-background dark:to-amber-950/20 p-5 rounded-xl border border-amber-100/50 dark:border-amber-900/30 shadow-sm"
            >
              <h4 className="flex justify-between items-center font-semibold mb-3 text-primary">
                <span className="flex items-center gap-2">
                  <Percent size={18} className="text-amber-500" />
                  Interest Rate Change
                </span>
              </h4>
              
              <div className="text-sm text-muted-foreground mb-5 italic">
                Adjust for future interest rate changes
              </div>
              
              <Button 
                variant="outline" 
                className="w-full mt-3 border-dashed bg-amber-50/50 dark:bg-amber-900/10 border-amber-200 dark:border-amber-800 text-amber-600 dark:text-amber-400 hover:bg-amber-100/50 dark:hover:bg-amber-800/20 transition-all group"
              >
                <Plus className="mr-2 size-4 group-hover:rotate-90 transition-transform duration-300" /> Add Interest Change
              </Button>
            </motion.div>
            
            <motion.div 
              variants={cardVariants}
              className="bg-gradient-to-br from-background to-emerald-50/30 dark:from-background dark:to-emerald-950/20 p-5 rounded-xl border border-emerald-100/50 dark:border-emerald-900/30 shadow-sm"
            >
              <h4 className="flex justify-between items-center font-semibold mb-3 text-primary">
                <span className="flex items-center gap-2">
                  <CreditCard size={18} className="text-emerald-500" />
                  EMI Change
                </span>
              </h4>
              
              <div className="text-sm text-muted-foreground mb-5 italic">
                Schedule future EMI adjustments
              </div>
              
              <Button 
                variant="outline" 
                className="w-full mt-3 border-dashed bg-emerald-50/50 dark:bg-emerald-900/10 border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-100/50 dark:hover:bg-emerald-800/20 transition-all group"
              >
                <Plus className="mr-2 size-4 group-hover:rotate-90 transition-transform duration-300" /> Add EMI Change
              </Button>
            </motion.div>
          </div>
        </motion.div>
      )}
    </div>
  );
};
