"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowUp,
  CreditCard,
  Plus
} from "lucide-react";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { Button } from "../../../ui/button";
import { ExtraItemCard } from "./ExtraItemCard";

export const EmiChange = () => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
      }}
      className="bg-gradient-to-br from-background to-blue-100/40 dark:from-background dark:to-blue-950/20 p-4 rounded-xl border border-blue-300/50 dark:border-blue-900/30 shadow-sm"
    >
      <h4 className="flex justify-between items-center font-semibold mb-0 text-blue-500">
        <span className="flex items-center gap-2">
          <CreditCard size={18} className="text-blue-500" />
          EMI Change
          <TooltipProvider delayDuration={300}>
            <Tooltip>
              <TooltipTrigger asChild>
                <BsFillInfoCircleFill size={14} />
              </TooltipTrigger>
              <TooltipContent>
                <p>Add EMI adjustments</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </span>

        <Button
          variant="outline"
          className="border-dashed bg-blue-50/50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 hover:bg-blue-100/50 dark:hover:bg-blue-800/20 transition-all group"
        >
          <Plus className="size-4 group-hover:rotate-90 transition-transform duration-300" />
          Add
        </Button>
      </h4>

      {/* <div className="text-sm text-center text-muted-foreground italic">
        No EMI adjustments scheduled
      </div> */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-4">
        <ExtraItemCard
          icon={ArrowUp}
          color="emerald"
          amount={8.5}
          dateRange="Effective from 1st Jan 2024"
          onDelete={() => console.log("Deleted")}
          showBadge={false}
          displayType="currency"
        />
        <ExtraItemCard
          icon={ArrowUp}
          color="emerald"
          amount={10}
          dateRange="Effective from 1st Jan 2025"
          onDelete={() => console.log("Deleted")}
          showBadge={false}
          displayType="currency"
        />
        <ExtraItemCard
          icon={ArrowDown}
          color="amber"
          amount={12}
          dateRange="Effective from 1st Jan 2026"
          onDelete={() => console.log("Deleted")}
          showBadge={false}
          displayType="currency"
        />
      </div>
    </motion.div>
  );
};
