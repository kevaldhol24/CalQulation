import { Button } from "@/components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { CURRENCY_ISO } from "@/lib/constants";
import { ArrowDown, Trash2 } from "lucide-react";
import { TbMoneybag } from "react-icons/tb";
import { IconType } from "react-icons";
import { LucideIcon } from "lucide-react";

// Color themes mapping for simplified usage
const colorThemes = {
  emerald: {
    iconBg: "bg-emerald-300/20 dark:bg-emerald-500/10",
    iconText: "text-emerald-600 dark:text-emerald-400",
    badgeBg: "bg-emerald-500/10",
    badgeText: "text-emerald-600 dark:text-emerald-400",
  },
  blue: {
    iconBg: "bg-blue-300/20 dark:bg-blue-500/10",
    iconText: "text-blue-600 dark:text-blue-400",
    badgeBg: "bg-blue-500/10",
    badgeText: "text-blue-600 dark:text-blue-400",
  },
  amber: {
    iconBg: "bg-amber-300/20 dark:bg-amber-500/10",
    iconText: "text-amber-600 dark:text-amber-400",
    badgeBg: "bg-amber-500/10",
    badgeText: "text-amber-600 dark:text-amber-400",
  },
  destructive: {
    iconBg: "bg-destructive/10 dark:bg-destructive/20",
    iconText: "text-destructive dark:text-destructive",
    badgeBg: "bg-destructive/10",
    badgeText: "text-destructive dark:text-destructive",
  },
  gray: {
    iconBg: "bg-gray-300/20 dark:bg-gray-500/10",
    iconText: "text-gray-600 dark:text-gray-400",
    badgeBg: "bg-gray-500/10",
    badgeText: "text-gray-600 dark:text-gray-400",
  },
};

type ColorTheme = keyof typeof colorThemes;

interface ExtraItemCardProps {
  // Required props
  amount: number;
  dateRange: string;
  onDelete: () => void;
  
  // Optional props with defaults
  icon?: IconType | LucideIcon;
  color?: ColorTheme;
  
  // Badge props
  showBadge?: boolean;
  badgeIcon?: LucideIcon;
  badgeText?: string;
  badgeColor?: ColorTheme;
  
  // Display type
  displayType?: 'currency' | 'percentage';
  
  // Tooltip props
  tooltipText?: string;
}

export const ExtraItemCard = ({
  amount,
  dateRange,
  onDelete,
  icon: Icon = TbMoneybag,
  color = "emerald",
  showBadge = true,
  badgeIcon: BadgeIcon = ArrowDown,
  badgeText = "Tenure",
  badgeColor,
  displayType = "currency",
  tooltipText = "Will reduce your loan tenure"
}: ExtraItemCardProps) => {
  
  // Get theme colors
  const theme = colorThemes[color];
  const badgeTheme = badgeColor ? colorThemes[badgeColor] : theme;
  
  const formatValue = (value: number) => {
    if (displayType === "percentage") {
      return `${value}%`;
    } else {
      return new Intl.NumberFormat(CURRENCY_ISO, {
        style: "currency",
        currency: "INR",
        currencyDisplay: "symbol",
        maximumFractionDigits: 0,
      }).format(value);
    }
  };

  return (
    <div className="border rounded-xl p-2">
      <div className="flex items-center gap-3">
        <div className={`${theme.iconBg} p-2 rounded-lg ${theme.iconText}`}>
          <Icon size={18} />
        </div>
        <div className="flex flex-col">
          <div className="font-medium text-sm flex justify-start flex-wrap gap-1.5 items-center">
            {formatValue(amount)}
            {showBadge && (
              <TooltipProvider delayDuration={300}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className={`${badgeTheme.badgeBg} ${badgeTheme.badgeText} rounded-full px-3 py-1 text-xs flex items-center gap-1.5 font-normal`}>
                      <BadgeIcon size={14} />
                      {badgeText}
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{tooltipText}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
          <span className="text-xs text-muted-foreground mt-1">
            {dateRange}
          </span>
        </div>
        <div className="ml-auto mr-0 flex relative">
          <Button
            variant="ghost"
            className="text-destructive hover:bg-destructive/10 hover:text-destructive"
            onClick={onDelete}
          >
            <Trash2 size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
};
