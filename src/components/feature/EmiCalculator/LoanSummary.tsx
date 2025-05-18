"use client";

import { useLoan } from "@/contexts/LoanContext";
import { formateCurrency } from "@/lib/utils";
import moment from "moment";
import { FaMoneyBills } from "react-icons/fa6";
import { GiMoneyStack } from "react-icons/gi";
import { GrMoney } from "react-icons/gr";
import { IoMdCalendar } from "react-icons/io";
import { TbMoneybag } from "react-icons/tb";
import { CollectiveImpactSummary } from "./CollectiveImpactSummary";
import { SummaryCard } from "./SummaryCard";
import { ShareButton } from "./ShareButton";
import { DownloadButton } from "./DownloadButton";
import { Skeleton } from "@/components/ui/skeleton";

export const LoanSummary = () => {
  // Get loanResults from context
  const { loanResults, isLoading, isInitialLoad } = useLoan();

  // Loading state
  const LoanSummaryLoadingSkeleton = () => (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold">Loan Summary</h2>
        {/* No share button during loading */}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mt-2">
        {Array(6).fill(0).map((_, i) => (
          <div key={i} className="bg-card border rounded-lg p-4 space-y-2">
            <Skeleton className="h-5 w-[80px]" />
            <Skeleton className="h-8 w-[120px]" />
            <Skeleton className="h-4 w-[100px]" />
          </div>
        ))}
      </div>
    </div>
  );

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
        <h2 className="text-lg font-bold">Loan Summary</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mt-2">
        <SummaryCard
          value={formateCurrency(emi)}
          title="EMI"
          helpText="Current EMI amount"
          color="blue"
          icon={<GrMoney size={28} />}
        />
        <SummaryCard
          value={formateCurrency(loanAmount)}
          title="Loan Amount"
          helpText="Total loan amount"
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
          helpText="Total prepayment amount"
          color="green"
        />
        <SummaryCard
          value={moment(lastPaymentDate).format("MMMM YYYY")}
          title="Last Payment"
          helpText="Date of the last payment"
          color="purple"
          icon={<IoMdCalendar size={28} />}
        />
      </div>

      <div className="flex justify-center gap-2 mt-4">
        <ShareButton />
        <DownloadButton />
      </div>
      
      {/* Collective Impact Summary */}
      <CollectiveImpactSummary />
    </div>
  );
};
