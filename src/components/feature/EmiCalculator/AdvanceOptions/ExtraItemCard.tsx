import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { CURRENCY_ISO } from "@/lib/constants";
import { formateCurrency } from "@/lib/utils";
import {
  EMIChangeImpact,
  InterestRateChangeImpact,
  PrepaymentImpact,
} from "loanwise";
import { ArrowDown, LucideIcon, Trash2 } from "lucide-react";
import { useMemo } from "react";
import { IconType } from "react-icons";
import { TbMoneybag } from "react-icons/tb";

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
  displayType?: "currency" | "percentage";

  // Tooltip props
  tooltipText?: string;

  //impact props
  impactData?: PrepaymentImpact | EMIChangeImpact | InterestRateChangeImpact;
  impact?: "emi" | "prepayment" | "interestRate";
}

interface CollectedImpact {
  emiImpact: number;
  interestImpact: number;
  tenureImpact: number;
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
  impactData,
  impact,
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
  }; // Calculate impact based on the type of change
  const refinedImpact: CollectedImpact | null = useMemo(() => {
    if (!impactData || !impact) return null;

    switch (impact) {
      case "emi": {
        const data = impactData as EMIChangeImpact;
        return {
          emiImpact: data.newEMI - data.oldEMI,
          interestImpact: data.interestDifference,
          tenureImpact: data.tenureChange,
        };
      }
      case "prepayment": {
        const data = impactData as PrepaymentImpact;
        return {
          emiImpact: -data.emiReduced,
          interestImpact: -data.interestSaved,
          tenureImpact: -data.monthsReduced,
        };
      }
      case "interestRate": {
        const data = impactData as InterestRateChangeImpact;
        return {
          emiImpact: data.newEMI - data.oldEMI,
          interestImpact: data.interestDifference,
          tenureImpact: data.tenureChange,
        };
      }
      default:
        return null;
    }
  }, [impact, impactData]);

  return (
    <HoverCard openDelay={50} closeDelay={50}>
      <div className="border rounded-xl p-2">
        <div className="flex items-center gap-3">
          <HoverCardTrigger className="flex items-center gap-3 w-full">
            <div className={`${theme.iconBg} p-2 rounded-lg ${theme.iconText}`}>
              <Icon size={18} />
            </div>
            <div className="flex flex-col">
              <div className="font-medium text-sm flex justify-start flex-wrap gap-1.5 items-center">
                {formatValue(amount)}
                {showBadge && (
                  <div
                    className={`${badgeTheme.badgeBg} ${badgeTheme.badgeText} capitalize rounded-full px-3 py-1 text-xs flex items-center gap-1.5 font-normal`}
                  >
                    <BadgeIcon size={14} />
                    {badgeText}
                  </div>
                )}
              </div>
              <span className="text-xs text-muted-foreground mt-1">
                {dateRange}
              </span>
            </div>
          </HoverCardTrigger>

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
      <HoverCardContent
        className="w-80 p-0 border-none shadow-lg"
        align="center"
      >
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/90 dark:to-gray-900/90 rounded-md overflow-hidden">
          <div className="p-3 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
            <h4 className="text-sm font-semibold flex items-center justify-center">
              Loan Impact Summary
            </h4>
          </div>

          <div className="px-4 py-3">
            {refinedImpact ? (
              <div className="space-y-3">
                {!!refinedImpact.emiImpact && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        className={`p-1 rounded-full ${
                          refinedImpact.emiImpact <= 0
                            ? "bg-green-100 dark:bg-green-900/30"
                            : "bg-red-100 dark:bg-red-900/30"
                        }`}
                      >
                        {refinedImpact.emiImpact <= 0 ? (
                          <ArrowDown
                            size={14}
                            className="text-green-500 dark:text-green-400"
                          />
                        ) : (
                          <ArrowDown
                            size={14}
                            className="text-red-500 dark:text-red-400 transform rotate-180"
                          />
                        )}
                      </span>
                      <span className="text-sm font-medium">EMI Impact:</span>
                    </div>
                    <div
                      className={`text-sm font-semibold ${
                        refinedImpact.emiImpact <= 0
                          ? "text-green-600 dark:text-green-400"
                          : "text-red-600 dark:text-red-400"
                      }`}
                    >
                      {formateCurrency(Math.abs(refinedImpact.emiImpact))}
                      
                    </div>
                  </div>
                )}

                {!!refinedImpact.interestImpact && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        className={`p-1 rounded-full ${
                          refinedImpact.interestImpact <= 0
                            ? "bg-green-100 dark:bg-green-900/30"
                            : "bg-red-100 dark:bg-red-900/30"
                        }`}
                      >
                        {refinedImpact.interestImpact <= 0 ? (
                          <ArrowDown
                            size={14}
                            className="text-green-500 dark:text-green-400"
                          />
                        ) : (
                          <ArrowDown
                            size={14}
                            className="text-red-500 dark:text-red-400 transform rotate-180"
                          />
                        )}
                      </span>
                      <span className="text-sm font-medium">Interest:</span>
                    </div>
                    <div
                      className={`text-sm font-semibold ${
                        refinedImpact.interestImpact <= 0
                          ? "text-green-600 dark:text-green-400"
                          : "text-red-600 dark:text-red-400"
                      }`}
                    >
                      {formateCurrency(Math.abs(refinedImpact.interestImpact))}
                    </div>
                  </div>
                )}

                {!!refinedImpact.tenureImpact && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        className={`p-1 rounded-full ${
                          refinedImpact.tenureImpact <= 0
                            ? "bg-green-100 dark:bg-green-900/30"
                            : "bg-red-100 dark:bg-red-900/30"
                        }`}
                      >
                        {refinedImpact.tenureImpact <= 0 ? (
                          <ArrowDown
                            size={14}
                            className="text-green-500 dark:text-green-400"
                          />
                        ) : (
                          <ArrowDown
                            size={14}
                            className="text-red-500 dark:text-red-400 transform rotate-180"
                          />
                        )}
                      </span>
                      <span className="text-sm font-medium">Tenure:</span>
                    </div>
                    <div
                      className={`text-sm font-semibold ${
                        refinedImpact.tenureImpact <= 0
                          ? "text-green-600 dark:text-green-400"
                          : "text-red-600 dark:text-red-400"
                      }`}
                    >
                      {Math.abs(refinedImpact.tenureImpact)} months
                     
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-center py-2 text-sm text-muted-foreground">
                <span>No impact data available</span>
              </div>
            )}
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};
