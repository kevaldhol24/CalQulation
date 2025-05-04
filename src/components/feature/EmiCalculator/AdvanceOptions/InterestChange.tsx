"use client";

import { motion } from "framer-motion";
import { CalendarRange, Coins, Percent, Plus, TrendingDown, TrendingUp } from "lucide-react";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { Button } from "../../../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ExtraItemCard } from "./ExtraItemCard";

export const InterestChange = () => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
      }}
      className="bg-gradient-to-br from-background to-amber-100/40 dark:from-background dark:to-amber-950/20 p-4 rounded-xl border border-amber-300/50 dark:border-amber-900/30 shadow-sm"
    >
      <h4 className="flex justify-between items-center font-semibold mb-0 text-amber-500">
        <span className="flex items-center gap-2">
          <Percent size={18} className="text-amber-500" />
          Rate Change
          <TooltipProvider delayDuration={300}>
            <Tooltip>
              <TooltipTrigger asChild>
                <BsFillInfoCircleFill size={14} />
              </TooltipTrigger>
              <TooltipContent>
                <p>Add floating interest rate changes</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </span>
        <Button
          variant="outline"
          className="border-dashed bg-amber-50/50 dark:bg-amber-900/10 border-amber-200 dark:border-amber-800 text-amber-600 dark:text-amber-400 hover:bg-amber-100/50 dark:hover:bg-amber-800/20 transition-all group"
        >
          <Plus className="size-4 group-hover:rotate-90 transition-transform duration-300" />
          Add
        </Button>
      </h4>

      {/* <div className="text-sm text-center text-muted-foreground italic">
        No interest rate change scheduled
      </div> */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-4">
        <ExtraItemCard
          icon={TrendingUp}
          color="destructive"
          amount={8.5}
          dateRange="Effective from 1st Jan 2024"
          onDelete={() => console.log("Deleted")}
          badgeColor="amber"
          badgeIcon={CalendarRange}
          displayType="percentage"
          tooltipText="Interest rate will increase"
        />
        <ExtraItemCard
          icon={TrendingDown}
          color="emerald"
          amount={10}
          dateRange="Effective from 1st Jan 2025"
          onDelete={() => console.log("Deleted")}
          badgeColor="amber"
          badgeIcon={Coins}
          badgeText="EMI"
          displayType="percentage"
          tooltipText="Will affect your EMI"
        />
        <ExtraItemCard
          icon={TrendingUp}
          color="destructive"
          amount={12}
          dateRange="Effective from 1st Jan 2026"
          onDelete={() => console.log("Deleted")}
          showBadge={false}
          displayType="percentage"
          tooltipText="Interest rate will increase"
        />
      </div>
    </motion.div>
  );
};
