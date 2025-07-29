import { Metadata } from "next";
import { Suspense } from "react";
import { HiHome } from "react-icons/hi";
import { BsBank, BsCreditCard } from "react-icons/bs";
import { FaChartLine, FaLightbulb, FaChartBar } from "react-icons/fa";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { ToolPageHero } from "@/components/common/PageHero";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { LoanCalculatorWithProvider } from "@/components/feature/EmiCalculator/LoanCalculator";
import { LoanCalculatorSkeleton } from "@/components/feature/EmiCalculator/LoanCalculatorSkeleton";
import { Comments } from "@/components/feature/Comments";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title:
    "Personal Loan EMI Calculator | Calculate Personal Loan EMI - Calqulation",
  description:
    "Calculate your personal loan EMI with our advanced personal loan calculator. Get accurate monthly installment calculations, interest breakdown, and payment schedules for personal loans.",
  keywords:
    "personal loan calculator, personal loan EMI calculator, EMI calculation, personal loan interest, monthly installment calculator, personal finance calculator",
  openGraph: {
    title:
      "Personal Loan EMI Calculator | Calculate Personal Loan EMI - Calqulation",
    description:
      "Calculate your personal loan EMI with our advanced personal loan calculator. Get accurate monthly installment calculations, interest breakdown, and payment schedules for personal loans.",
    url: "https://www.calqulation.com/tool/personal-loan-calculator",
    images: [
      {
        url: "/Financial-planning.svg",
        width: 1200,
        height: 630,
        alt: "Personal Loan EMI Calculator - Calqulation",
      },
    ],
  },
};

// Schema.org structured data for the personal loan calculator
const calculatorSchemaJson = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Personal Loan EMI Calculator",
  description:
    "Calculate your personal loan EMI, total interest, and monthly payment schedule with our advanced personal loan calculator.",
  url: "https://www.calqulation.com/tool/personal-loan-calculator",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  featureList: [
    "Personal loan EMI calculation",
    "Interest breakdown analysis",
    "Monthly payment schedule",
    "Total interest calculation",
    "Loan amortization table",
    "Visual charts and graphs",
  ],
};

export default async function PersonalLoanCalculatorPage() {
  const cookieStore = await cookies();
  const isMobileAppCookie = cookieStore.get("is-mobile-app");
  const isMobileApp = isMobileAppCookie?.value === "true";

  // Initial loan details suitable for personal loans
  const initialLoanDetails = {
    loanAmount: 500000, // ₹5,00,000 - typical personal loan amount
    initialInterestRate: 12.5, // 12.5% - typical personal loan interest rate
    tenureMonths: 36, // 3 years - common personal loan tenure
    startDate: `${new Date().getFullYear()}-${String(
      new Date().getMonth() + 1
    ).padStart(2, "0")}-01`,
  };

  return (
    <div className="bg-gray-200 dark:bg-gray-950 min-h-screen">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(calculatorSchemaJson),
        }}
      />

      {!isMobileApp && (
        <ToolPageHero
          title="Personal Loan Calculator"
          subtitle="Calculate your personal loan EMI with our advanced calculator designed for personal financing needs."
        >
          <Breadcrumb
            items={[
              { label: "Home", href: "/", icon: <HiHome /> },
              { label: "Tools", href: "/tools" },
              {
                label: "Personal Loan Calculator",
                href: "/tool/personal-loan-calculator",
              },
            ]}
            className="text-gray-300"
          />
        </ToolPageHero>
      )}

      <div className="relative max-w-7xl mx-auto px-0 sm:px-6 lg:px-8 z-10 pt-0 pb-0 sm:pb-8">
        <div className="relative overflow-hidden">
          <div className="overflow-hidden">
            <Suspense
              fallback={
                <div className="h-1 bg-gray-200 dark:bg-gray-800">
                  <LoanCalculatorSkeleton />
                </div>
              }
            >
              <LoanCalculatorWithProvider
                // hideAdvanceOptions={true}
                isSecondary
                initialLoanDetails={initialLoanDetails}
              />
            </Suspense>
          </div>
        </div>
      </div>

      {/* Content section with modern styling */}
      <div className="bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Introduction section */}
          <section className="mb-16">
            <div className="flex items-center mb-6">
              <div className="bg-gradient-to-r from-purple-500 to-pink-600 h-12 w-12 rounded-lg flex items-center justify-center shadow-lg mr-4">
                <BsCreditCard className="text-white text-2xl" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                What is a Personal Loan Calculator?
              </h2>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-800/50 dark:to-purple-900/30 p-6 rounded-xl shadow-sm">
              <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
                A personal loan calculator is a specialized financial tool that
                helps you estimate the monthly EMI (Equated Monthly Installment)
                for personal loans. Whether you need funds for home renovation,
                medical expenses, education, wedding, or any other personal
                requirement, this calculator helps you plan your finances by
                showing exactly how much you&apos;ll pay each month and the
                total cost of borrowing.
              </p>
            </div>
          </section>

          {/* How it works section */}
          <section className="mb-16">
            <div className="flex items-center mb-10">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 h-12 w-12 rounded-lg flex items-center justify-center shadow-lg mr-4">
                <FaChartLine className="text-white text-2xl" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                How Our Personal Loan Calculator Works
              </h2>
            </div>

            <p className="text-gray-700 dark:text-gray-200 leading-relaxed mb-10">
              Our personal loan calculator is designed specifically for personal
              financing needs, providing accurate calculations and detailed
              insights for your borrowing decisions.
            </p>

            {/* Input parameters card */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden mb-10">
              <div className="bg-gradient-to-r from-purple-600 to-pink-400 h-2"></div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                  <div className="bg-purple-100 dark:bg-purple-900 p-2 rounded-lg mr-3">
                    <BsBank className="text-purple-600 dark:text-purple-300" />
                  </div>
                  Personal Loan Calculation Parameters
                </h3>

                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  Simply enter these key details to get instant results:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-purple-50 dark:bg-gray-700 p-4 rounded-lg border-l-4 border-purple-500">
                    <h4 className="font-bold text-purple-700 dark:text-purple-300">
                      Loan Amount
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      The total amount you want to borrow (typically ₹50,000 to
                      ₹40,00,000)
                    </p>
                  </div>

                  <div className="bg-purple-50 dark:bg-gray-700 p-4 rounded-lg border-l-4 border-purple-500">
                    <h4 className="font-bold text-purple-700 dark:text-purple-300">
                      Interest Rate
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Annual interest rate (usually 10% to 24% for personal
                      loans)
                    </p>
                  </div>

                  <div className="bg-purple-50 dark:bg-gray-700 p-4 rounded-lg border-l-4 border-purple-500">
                    <h4 className="font-bold text-purple-700 dark:text-purple-300">
                      Loan Tenure
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Repayment period (typically 12 to 84 months)
                    </p>
                  </div>

                  <div className="bg-purple-50 dark:bg-gray-700 p-4 rounded-lg border-l-4 border-purple-500">
                    <h4 className="font-bold text-purple-700 dark:text-purple-300">
                      Starting Month
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      When you plan to start your loan repayment
                    </p>
                  </div>
                </div>

                <p className="text-gray-700 dark:text-gray-300">
                  Our calculator instantly provides your monthly EMI, total
                  interest payable, and a complete payment breakdown to help you
                  make informed decisions.
                </p>
              </div>
            </div>
          </section>

          {/* Personal Loan Features section */}
          <section className="mb-16">
            <div className="flex items-center mb-10">
              <div className="bg-gradient-to-r from-emerald-500 to-green-600 h-12 w-12 rounded-lg flex items-center justify-center shadow-lg mr-4">
                <FaLightbulb className="text-white text-2xl" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Why Choose Our Personal Loan Calculator?
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold text-purple-600 dark:text-purple-400 mb-3">
                  Quick & Easy Calculations
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Get instant EMI calculations without complex paperwork. Simply
                  input your loan requirements and see results immediately.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-3">
                  Compare Different Scenarios
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Test different loan amounts, interest rates, and tenures to
                  find the most affordable option that fits your budget.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold text-green-600 dark:text-green-400 mb-3">
                  Detailed Payment Schedule
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  View a complete month-by-month breakdown of your payments,
                  showing principal and interest components.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold text-amber-600 dark:text-amber-400 mb-3">
                  Budget Planning
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Understand the total cost of your loan and plan your monthly
                  budget accordingly before applying for the loan.
                </p>
              </div>
            </div>
          </section>

          {/* Personal Loan Use Cases section */}
          <section className="mb-16">
            <div className="flex items-center mb-10">
              <div className="bg-gradient-to-r from-amber-500 to-orange-400 h-12 w-12 rounded-lg flex items-center justify-center shadow-lg mr-4">
                <RiMoneyDollarCircleFill className="text-white text-2xl" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Common Personal Loan Use Cases
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-700 p-6 rounded-xl">
                <h3 className="text-lg font-bold text-blue-700 dark:text-blue-300 mb-3">
                  Home Renovation
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Fund your home improvement projects, interior design, or
                  property repairs with flexible personal loans.
                </p>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-green-100 dark:from-gray-800 dark:to-gray-700 p-6 rounded-xl">
                <h3 className="text-lg font-bold text-green-700 dark:text-green-300 mb-3">
                  Medical Expenses
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Cover unexpected medical bills, surgeries, or healthcare
                  expenses with quick personal loan approval.
                </p>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-gray-800 dark:to-gray-700 p-6 rounded-xl">
                <h3 className="text-lg font-bold text-purple-700 dark:text-purple-300 mb-3">
                  Education & Training
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Invest in your education, professional courses, or skill
                  development programs.
                </p>
              </div>

              <div className="bg-gradient-to-r from-pink-50 to-pink-100 dark:from-gray-800 dark:to-gray-700 p-6 rounded-xl">
                <h3 className="text-lg font-bold text-pink-700 dark:text-pink-300 mb-3">
                  Wedding Expenses
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Plan your dream wedding or other special occasions without
                  financial stress.
                </p>
              </div>

              <div className="bg-gradient-to-r from-indigo-50 to-indigo-100 dark:from-gray-800 dark:to-gray-700 p-6 rounded-xl">
                <h3 className="text-lg font-bold text-indigo-700 dark:text-indigo-300 mb-3">
                  Debt Consolidation
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Combine multiple high-interest debts into a single manageable
                  personal loan.
                </p>
              </div>

              <div className="bg-gradient-to-r from-amber-50 to-amber-100 dark:from-gray-800 dark:to-gray-700 p-6 rounded-xl">
                <h3 className="text-lg font-bold text-amber-700 dark:text-amber-300 mb-3">
                  Travel & Vacation
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Fund your travel plans, family vacations, or honeymoon trips
                  with affordable EMIs.
                </p>
              </div>
            </div>
          </section>

          {/* Tips section */}
          <section className="mb-16">
            <div className="flex items-center mb-10">
              <div className="bg-gradient-to-r from-teal-500 to-cyan-600 h-12 w-12 rounded-lg flex items-center justify-center shadow-lg mr-4">
                <FaChartBar className="text-white text-2xl" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Personal Loan Tips
              </h2>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-teal-600 dark:text-teal-400 mb-4">
                    Before Applying
                  </h3>
                  <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                    <li className="flex items-start">
                      <span className="text-teal-500 mr-2">•</span>
                      Check your credit score and improve it if needed
                    </li>
                    <li className="flex items-start">
                      <span className="text-teal-500 mr-2">•</span>
                      Compare interest rates from multiple lenders
                    </li>
                    <li className="flex items-start">
                      <span className="text-teal-500 mr-2">•</span>
                      Calculate EMI to ensure it fits your budget
                    </li>
                    <li className="flex items-start">
                      <span className="text-teal-500 mr-2">•</span>
                      Read all terms and conditions carefully
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-cyan-600 dark:text-cyan-400 mb-4">
                    During Repayment
                  </h3>
                  <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                    <li className="flex items-start">
                      <span className="text-cyan-500 mr-2">•</span>
                      Set up auto-debit to avoid missing payments
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-500 mr-2">•</span>
                      Make prepayments when possible to save interest
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-500 mr-2">•</span>
                      Keep track of your payment schedule
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-500 mr-2">•</span>
                      Avoid taking multiple loans simultaneously
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
          <div>
            <Comments postId="tool_personal-loan-calculator" />
          </div>
        </div>
      </div>
    </div>
  );
}
