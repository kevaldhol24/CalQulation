"use client";

import { motion } from "framer-motion";
import { Plus, Rocket } from "lucide-react";
import { Button } from "../../../ui/button";
import { ExtraItemCard } from "./ExtraItemCard";
import { BsFillInfoCircleFill } from "react-icons/bs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TbMoneybag } from "react-icons/tb";

export const Prepayment = () => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
      }}
      className="bg-gradient-to-br from-background to-emerald-100/40 dark:from-background dark:to-emerald-950/20 p-4 rounded-xl border border-emerald-300/50 dark:border-emerald-900/30 shadow-sm"
    >
      <h4 className="flex justify-between items-center font-semibold text-emerald-500">
        <span className="flex items-center gap-2">
          <Rocket size={18} className="text-emerald-500" />
          Prepayment
          <TooltipProvider delayDuration={300}>
            <Tooltip>
              <TooltipTrigger asChild>
                <BsFillInfoCircleFill size={14} />
              </TooltipTrigger>
              <TooltipContent>
                <p>Add prepayment to reduce loan term or EMI</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </span>
        <Button
          variant="outline"
          className="border-dashed bg-emerald-50/50 dark:bg-emerald-900/10 border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-100/50 dark:hover:bg-emerald-800/20 transition-all group"
        >
          <Plus className="size-4 group-hover:rotate-90 transition-transform duration-300" />
          Add
        </Button>
      </h4>
      {/* <div className="text-sm text-muted-foreground text-center italic">
        No prepayment added
      </div> */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-4">
        <ExtraItemCard 
          icon={TbMoneybag} 
          color="emerald" 
          amount={100000} 
          dateRange="From here to there" 
          onDelete={() => console.log('Deleted')}
          tooltipText="Will reduce your loan tenure"
        />
        <ExtraItemCard 
          icon={TbMoneybag} 
          color="blue" 
          amount={200000} 
          dateRange="Another range" 
          onDelete={() => console.log('Deleted')}
          tooltipText="Will reduce your EMI amount"
        />
        <ExtraItemCard 
          icon={TbMoneybag} 
          color="gray" 
          amount={300000} 
          dateRange="Yet another range" 
          onDelete={() => console.log('Deleted')}
          showBadge={false}
        />
      </div>
    </motion.div>
  );
};
