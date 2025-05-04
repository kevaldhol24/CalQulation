import { LoanCalculator } from "@/components/feature/EmiCalculator/LoanCalculator";
import { LoanProvider } from "@/contexts/LoanContext";

export default function Home() {
  return (
    <div className="bg-white dark:bg-gray-950">
      <div className="bg-accent relative pb-6">
        <div className="bg-gradient-to-r from-blue-900 to-blue-500 h-80 absolute inset-0"></div>
        <div className="w-full max-w-7xl mx-auto relative py-6 px-4 sm:px-6">
          <div className="text-white flex flex-col items-center justify-center">
            <h6 className="font-bold text-center">EMI Calculator</h6>
            <p className="text-3xl font-bold text-center">Calculate your EMI</p>
            <p className="text-md mt-1 text-center max-w-xl">
              Enter the loan amount, interest rate and loan term to calculate
              your EMI. Calculator will display the EMI amount, total interest
              and total amount payable.
            </p>
          </div>
          <div className="mt-8 relative z-10">
            <LoanProvider>
              <LoanCalculator />
            </LoanProvider>
          </div>
        </div>
      </div>
      <div className="w-full max-w-7xl mx-auto relative py-6 px-4 sm:px-6"></div>
    </div>
  );
}
