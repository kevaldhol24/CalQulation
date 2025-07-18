"use client";

import { useLoan } from "@/contexts/LoanContext";
import moment from "moment";
import { FaMoneyBills } from "react-icons/fa6";
import { GiMoneyStack } from "react-icons/gi";
import { GrMoney } from "react-icons/gr";
import { IoMdCalendar } from "react-icons/io";
import { TbMoneybag } from "react-icons/tb";
import { DownloadButton } from "./DownloadButton";
import { ShareButton } from "./ShareButton";
import { SummaryCard } from "./SummaryCard";
import { Skeleton } from "@/components/ui/skeleton";
import { FC, useMemo } from "react";
import { currency } from "@/services/CurrencyService";
import { cn } from "@/lib/utils";

interface LoanSummaryProps {
  compact?: boolean;
  isFromMobile?: boolean; // Flag to indicate if the summary is being used from a mobile device
}

export const LoanSummary: FC<LoanSummaryProps> = ({
  compact,
  isFromMobile,
}) => {
  // Get loanResults from context
  const { loanResults, isLoading, isInitialLoad } = useLoan();
  const { formateCurrency } = currency();

  // Loading state
  const LoanSummaryLoadingSkeleton = () => (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold mb-1 lg:mb-6 flex items-center">
          <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full mr-3 shadow-sm"></div>
          Loan Summary
        </h2>
        {/* No share button during loading */}
      </div>
      <div
        className={cn([
          {
            "grid grid-cols-1 gap-2 mt-2": true,
            "sm:grid-cols-2 lg:gap-4": !compact,
            "lg:grid-cols-2 2xl:gap-4": compact,
          },
        ])}
      >
        {Array(6)
          .fill(0)
          .map((_, i) => (
            <div
              key={i}
              className="flex flex-col items-end bg-card border rounded-lg p-4 space-y-2"
            >
              <Skeleton className="h-2 w-[80px]" />
              <Skeleton className="h-4 w-[120px]" />
              <Skeleton className="h-2 w-[100px]" />
            </div>
          ))}
      </div>
    </div>
  );

  const remainingMonths = useMemo(() => {
    if (!loanResults?.summary.lastPaymentDate) return 0;
    const lastDate = moment(loanResults.summary.lastPaymentDate);
    const endDate = moment().add(-1, "M");
    return lastDate.diff(endDate, "M");
  }, [loanResults?.summary.lastPaymentDate]);

  const nextMonthEmi = useMemo(() => {
    return (
      loanResults?.schedule.find((item) => {
        return moment(item.date).isSame(moment().add(1, "M"), "month");
      })?.emiAmount || 0
    );
  }, [loanResults?.schedule]);

  if (!loanResults || isLoading || isInitialLoad) {
    return <LoanSummaryLoadingSkeleton />;
  }

  const {
    emi,
    lastPaymentDate,
    loanAmount,
    totalInterestPayable,
    totalAmountPayable,
    totalPrepayment,
  } = loanResults.summary;

  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold mb-1 lg:mb-6 flex items-center">
          <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full mr-3 shadow-sm"></div>
          Loan Summary
        </h2>
      </div>
      <div
        className={cn([
          {
            "grid grid-cols-1 gap-2 mt-2": true,
            "sm:grid-cols-2 lg:gap-4": !compact,
            "lg:grid-cols-2 2xl:gap-4": compact,
          },
        ])}
      >
        <SummaryCard
          value={formateCurrency(nextMonthEmi)}
          title="Next month EMI"
          helpText={`First EMI ${formateCurrency(emi)}`}
          color="blue"
          icon={<GrMoney size={28} />}
        />
        <SummaryCard
          value={formateCurrency(loanAmount)}
          title="Loan Amount"
          helpText={`Until ${moment(lastPaymentDate).format("MMM YYYY")}`}
          color="gray"
          icon={<GiMoneyStack size={32} />}
        />
        <SummaryCard
          value={formateCurrency(totalInterestPayable)}
          title="Interest"
          helpText="Total interest payable"
          color="red"
          icon={<FaMoneyBills size={28} />}
        />
        <SummaryCard
          value={formateCurrency(totalAmountPayable)}
          title="Total Amount"
          helpText="Total amount payable"
          color="orange"
          icon={<TbMoneybag size={28} />}
        />
        <SummaryCard
          value={formateCurrency(totalPrepayment)}
          title="Prepayment"
          helpText="Total prepayment"
          color="green"
        />
        <SummaryCard
          value={remainingMonths}
          title="Remaining EMIs"
          helpText={`${loanResults.schedule.length - remainingMonths} EMI${
            loanResults.schedule.length - remainingMonths === 1 ? "" : "s"
          } paid`}
          color="purple"
          icon={<IoMdCalendar size={28} />}
        />
      </div>

      <p className="text-sm text-muted-foreground mt-1 italic">
        * Calculator shows estimated results. Actual numbers may differ.
      </p>

      <div className="flex justify-center gap-2 mt-4">
        {!compact && <ShareButton />}
        {!isFromMobile && <DownloadButton />}
      </div>
    </div>
  );
};
