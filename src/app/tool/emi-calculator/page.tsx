import { Breadcrumb } from "@/components/common/Breadcrumb";
import { ToolPageHero } from "@/components/common/PageHero";
import { Comments } from "@/components/feature/Comments";
import { LoanCalculatorWithProvider } from "@/components/feature/EmiCalculator/LoanCalculator";
import { LoanCalculatorSkeleton } from "@/components/feature/EmiCalculator/LoanCalculatorSkeleton";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { Suspense } from "react";
import { BsBank } from "react-icons/bs";
import {
  FaChartBar,
  FaChartLine,
  FaLightbulb,
  FaRegClock,
} from "react-icons/fa";
import { HiHome } from "react-icons/hi";
import { RiMoneyDollarCircleFill } from "react-icons/ri";

export const metadata: Metadata = {
  title:
    "EMI Calculator | Calculate - Loan EMI, Interest & Amortization Schedule",
  description:
    "Calculate your loan EMI, total interest payable, and view detailed amortization schedule. Plan home loans, car loans & personal loans with advanced options like prepayments.",
  keywords:
    "EMI calculator, loan calculator with floating rate, loan EMI calculation, home loan EMI, car loan EMI, personal loan calculator, loan amortization schedule, prepayment calculator, interest rates",
  alternates: {
    canonical: "https://www.calqulation.com/tool/emi-calculator",
  },
  openGraph: {
    title:
      "EMI Calculator | Calculate - Loan EMI, Interest & Amortization Schedule",
    description:
      "Calculate your loan EMI, total interest payable, and view detailed amortization schedule. Plan home loans, car loans & personal loans with advanced options.",
    url: "https://www.calqulation.com/tool/emi-calculator",
    images: [
      {
        url: "/Financial-planning.svg",
        width: 1200,
        height: 630,
        alt: "EMI Calculator",
      },
    ],
  },
};

export default async function EmiCalculatorPage() {
  const cookieStore = await cookies();
  const isMobileAppCookie = cookieStore.get("is-mobile-app");
  const initialIsWeb = isMobileAppCookie?.value !== "true";

  // Schema.org structured data for the EMI calculator
  const calculatorSchemaJson = {
    "@context": "https://schema.org",
    "@type": "FinancialProduct",
    name: "Loan EMI Calculator",
    description:
      "Calculate your loan EMI, total interest payable, and generate a detailed amortization schedule.",
    featureList: [
      "Instant EMI calculation",
      "Amortization schedule",
      "Prepayment options",
      "Interest rate change scenarios",
      "Visual charts and graphs",
    ],
    category: "Financial Tool",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "INR",
    },
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

      {initialIsWeb && (
        <ToolPageHero
          title="EMI Calculator"
          subtitle="Get accurate EMI calculations with our advanced financial tool."
        >
          <Breadcrumb
            items={[
              { label: "Home", href: "/", icon: <HiHome /> },
              { label: "Tools", href: "/tools" },
              { label: "EMI Calculator", href: "/tool/emi-calculator" },
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
              <LoanCalculatorWithProvider isFromMobile={!initialIsWeb} />
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
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-12 w-12 rounded-lg flex items-center justify-center shadow-lg mr-4">
                <RiMoneyDollarCircleFill className="text-white text-2xl" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                What is an EMI Calculator?
              </h2>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800/50 dark:to-blue-900/30 p-6 rounded-xl shadow-sm">
              <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
                An EMI (Equated Monthly Installment) calculator is an essential
                financial tool that helps you estimate the monthly payments for
                your loans. Whether you&apos;re planning to take a home loan,
                car loan, personal loan, or any other type of loan,
                understanding your EMI obligations beforehand can help you make
                informed financial decisions.
              </p>
            </div>
          </section>

          {/* How it works section with cards */}
          <section className="mb-16">
            <div className="flex items-center mb-10">
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 h-12 w-12 rounded-lg flex items-center justify-center shadow-lg mr-4">
                <FaChartLine className="text-white text-2xl" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                How Our EMI Calculator Works
              </h2>
            </div>

            <p className="text-gray-700 dark:text-gray-200 leading-relaxed mb-10">
              Our comprehensive EMI calculator goes beyond basic calculations to
              offer an in-depth analysis of your loan repayment journey.
              Here&apos;s how it works:
            </p>

            {/* Basic loan calculation card */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden mb-10 transform transition-all hover:shadow-xl">
              <div className="bg-gradient-to-r from-blue-600 to-blue-400 h-2"></div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                  <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-lg mr-3">
                    <BsBank className="text-blue-600 dark:text-blue-300" />
                  </div>
                  Basic Loan Calculation
                </h3>

                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  To get started, simply input three key parameters:
                </p>

                {/* Input parameters with visual enhancements */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-blue-50 dark:bg-gray-700 p-4 rounded-lg border-l-4 border-blue-500">
                    <h4 className="font-bold text-blue-700 dark:text-blue-300">
                      Loan Amount
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      The principal amount you wish to borrow
                    </p>
                  </div>

                  <div className="bg-blue-50 dark:bg-gray-700 p-4 rounded-lg border-l-4 border-blue-500">
                    <h4 className="font-bold text-blue-700 dark:text-blue-300">
                      Interest Rate
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      The annual interest rate offered by your lender
                    </p>
                  </div>

                  <div className="bg-blue-50 dark:bg-gray-700 p-4 rounded-lg border-l-4 border-blue-500">
                    <h4 className="font-bold text-blue-700 dark:text-blue-300">
                      Loan Tenure
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      The repayment period in months
                    </p>
                  </div>

                  <div className="bg-blue-50 dark:bg-gray-700 p-4 rounded-lg border-l-4 border-blue-500">
                    <h4 className="font-bold text-blue-700 dark:text-blue-300">
                      Starting Month
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      When you plan to begin your loan repayment
                    </p>
                  </div>
                </div>

                <p className="text-gray-700 dark:text-gray-300">
                  Once these details are entered, our calculator instantly
                  computes your monthly EMI, total interest payable, and the
                  total amount you&apos;ll end up paying over the entire loan
                  tenure.
                </p>
              </div>
            </div>

            {/* Advanced features section */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden mb-10">
              <div className="bg-gradient-to-r from-purple-600 to-pink-400 h-2"></div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                  <div className="bg-purple-100 dark:bg-purple-900 p-2 rounded-lg mr-3">
                    <FaLightbulb className="text-purple-600 dark:text-purple-300" />
                  </div>
                  Advanced Features: Customizing Your Loan Journey
                </h3>

                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  What sets our EMI calculator apart is its ability to model
                  real-life scenarios that most standard calculators don&apos;t
                  account for:
                </p>

                {/* Feature cards */}
                <div className="space-y-6">
                  {/* Prepayments card */}
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-700 dark:to-gray-700 p-5 rounded-xl border border-purple-100 dark:border-gray-600">
                    <div className="flex items-center mb-3">
                      <div className="bg-purple-100 dark:bg-purple-800/50 h-10 w-10 rounded-full flex items-center justify-center mr-3">
                        <span className="text-xl font-bold text-purple-600 dark:text-purple-300">
                          1
                        </span>
                      </div>
                      <h4 className="text-xl font-bold text-purple-700 dark:text-purple-300">
                        Prepayments
                      </h4>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">
                      Planning to pay extra amounts occasionally to reduce your
                      principal? Our calculator lets you add multiple prepayment
                      instances throughout your loan tenure. You can specify the
                      month and amount for each prepayment, instantly seeing how
                      this affects your loan closure date and interest savings.
                    </p>
                  </div>

                  {/* Interest Rate Changes card */}
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-700 p-5 rounded-xl border border-blue-100 dark:border-gray-600">
                    <div className="flex items-center mb-3">
                      <div className="bg-blue-100 dark:bg-blue-800/50 h-10 w-10 rounded-full flex items-center justify-center mr-3">
                        <span className="text-xl font-bold text-blue-600 dark:text-blue-300">
                          2
                        </span>
                      </div>
                      <h4 className="text-xl font-bold text-blue-700 dark:text-blue-300">
                        Interest Rate Changes
                      </h4>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">
                      In today&apos;s fluctuating economy, interest rates rarely
                      remain constant throughout a long-term loan. Our
                      calculator allows you to model potential interest rate
                      changes at specific points in your loan tenure, giving you
                      a more realistic forecast of your repayment journey.
                    </p>
                  </div>

                  {/* EMI Adjustments card */}
                  <div className="bg-gradient-to-r from-emerald-50 to-green-50 dark:from-gray-700 dark:to-gray-700 p-5 rounded-xl border border-green-100 dark:border-gray-600">
                    <div className="flex items-center mb-3">
                      <div className="bg-green-100 dark:bg-green-800/50 h-10 w-10 rounded-full flex items-center justify-center mr-3">
                        <span className="text-xl font-bold text-green-600 dark:text-green-300">
                          3
                        </span>
                      </div>
                      <h4 className="text-xl font-bold text-green-700 dark:text-green-300">
                        EMI Adjustments
                      </h4>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">
                      Life circumstances change, and so might your ability to
                      pay. Our tool lets you simulate scenarios where you
                      increase or decrease your EMI amount at different stages
                      of your loan, helping you plan for future financial
                      changes.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Visual Insights section */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-amber-500 to-orange-400 h-2"></div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                  <div className="bg-amber-100 dark:bg-amber-900/50 p-2 rounded-lg mr-3">
                    <FaChartBar className="text-amber-600 dark:text-amber-300" />
                  </div>
                  Visual Insights for Better Understanding
                </h3>

                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  Numbers alone can be hard to interpret, which is why our
                  calculator provides:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-amber-50 dark:bg-gray-700 p-4 rounded-lg text-center">
                    <div className="bg-amber-100 dark:bg-amber-800/60 h-14 w-14 rounded-full flex items-center justify-center mx-auto mb-3">
                      <FaChartBar className="text-amber-600 dark:text-amber-300 text-2xl" />
                    </div>
                    <h4 className="font-bold text-gray-800 dark:text-gray-100 mb-2">
                      Comprehensive Charts
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Visual breakdowns of principal vs. interest components
                      across your loan tenure
                    </p>
                  </div>

                  <div className="bg-amber-50 dark:bg-gray-700 p-4 rounded-lg text-center">
                    <div className="bg-amber-100 dark:bg-amber-800/60 h-14 w-14 rounded-full flex items-center justify-center mx-auto mb-3">
                      <FaRegClock className="text-amber-600 dark:text-amber-300 text-2xl" />
                    </div>
                    <h4 className="font-bold text-gray-800 dark:text-gray-100 mb-2">
                      Payment Schedule
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Detailed view of each payment, showing how each
                      installment affects your outstanding balance
                    </p>
                  </div>

                  <div className="bg-amber-50 dark:bg-gray-700 p-4 rounded-lg text-center">
                    <div className="bg-amber-100 dark:bg-amber-800/60 h-14 w-14 rounded-full flex items-center justify-center mx-auto mb-3">
                      <RiMoneyDollarCircleFill className="text-amber-600 dark:text-amber-300 text-2xl" />
                    </div>
                    <h4 className="font-bold text-gray-800 dark:text-gray-100 mb-2">
                      Summary Cards
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      At-a-glance view of key metrics including your EMI, total
                      interest, and more
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Why Use Our Calculator section */}
          <section className="mb-16">
            <div className="flex items-center mb-10">
              <div className="bg-gradient-to-r from-emerald-500 to-green-600 h-12 w-12 rounded-lg flex items-center justify-center shadow-lg mr-4">
                <FaLightbulb className="text-white text-2xl" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Why Use Our EMI Calculator?
              </h2>
            </div>

            {/* Benefits grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold text-emerald-600 dark:text-emerald-400 mb-3">
                  Make Informed Borrowing Decisions
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Before taking a loan, use our calculator to determine whether
                  the EMI fits comfortably within your monthly budget. This
                  helps prevent financial strain and potential default issues
                  later.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-3">
                  Plan for Financial Milestones
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  See how different prepayment strategies can help you become
                  debt-free sooner. Our calculator shows exactly how much
                  you&apos;ll save in interest by making occasional lump-sum
                  payments or increasing your regular EMI.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold text-purple-600 dark:text-purple-400 mb-3">
                  Prepare for Rate Fluctuations
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  If you&apos;re considering a floating rate loan, our advanced
                  options help you visualize the impact of potential interest
                  rate changes, allowing you to prepare financially for various
                  scenarios.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold text-amber-600 dark:text-amber-400 mb-3">
                  Compare Loan Offers
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Received multiple loan offers? Use our calculator to compare
                  them side by side, considering different interest rates,
                  tenures, and processing fees to identify the most
                  cost-effective option.
                </p>
              </div>
            </div>
          </section>

          {/* Formula section with styled design */}
          <section className="mb-16">
            <div className="flex items-center mb-10">
              <div className="bg-gradient-to-r from-indigo-500 to-blue-600 h-12 w-12 rounded-lg flex items-center justify-center shadow-lg mr-4">
                <span className="text-white font-bold text-xl">ƒx</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Understanding EMI Calculation Formula
              </h2>
            </div>

            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-indigo-100 dark:border-gray-700">
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                The calculation behind our tool uses the standard EMI formula:
              </p>

              <div className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/30 dark:to-blue-900/30 p-6 rounded-xl mb-6 flex justify-center">
                <div className="font-mono text-xl text-indigo-700 dark:text-indigo-300 font-bold text-center">
                  EMI = P × r × (1 + r)^n / [(1 + r)^n - 1]
                </div>
              </div>

              <p className="text-gray-700 dark:text-gray-300 mb-4 font-medium">
                Where:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-indigo-50 dark:bg-gray-700 p-4 rounded-lg flex items-center">
                  <div className="bg-indigo-100 dark:bg-indigo-800 h-8 w-8 rounded-full flex items-center justify-center mr-3">
                    <span className="text-indigo-700 dark:text-indigo-300 font-bold">
                      P
                    </span>
                  </div>
                  <div>
                    <p className="text-gray-800 dark:text-gray-200">
                      Principal loan amount
                    </p>
                  </div>
                </div>

                <div className="bg-indigo-50 dark:bg-gray-700 p-4 rounded-lg flex items-center">
                  <div className="bg-indigo-100 dark:bg-indigo-800 h-8 w-8 rounded-full flex items-center justify-center mr-3">
                    <span className="text-indigo-700 dark:text-indigo-300 font-bold">
                      r
                    </span>
                  </div>
                  <div>
                    <p className="text-gray-800 dark:text-gray-200">
                      Monthly interest rate
                    </p>
                  </div>
                </div>

                <div className="bg-indigo-50 dark:bg-gray-700 p-4 rounded-lg flex items-center">
                  <div className="bg-indigo-100 dark:bg-indigo-800 h-8 w-8 rounded-full flex items-center justify-center mr-3">
                    <span className="text-indigo-700 dark:text-indigo-300 font-bold">
                      n
                    </span>
                  </div>
                  <div>
                    <p className="text-gray-800 dark:text-gray-200">
                      Loan tenure in months
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Tips section */}
          <section className="mb-16">
            <div className="flex items-center mb-10">
              <div className="bg-gradient-to-r from-amber-500 to-orange-500 h-12 w-12 rounded-lg flex items-center justify-center shadow-lg mr-4">
                <FaLightbulb className="text-white text-2xl" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Tips for Loan Management
              </h2>
            </div>

            <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-gray-800 dark:to-gray-900 p-8 rounded-xl">
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                While our calculator provides the numbers, here are some
                practical tips to manage your loan effectively:
              </p>

              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="bg-amber-100 dark:bg-amber-900/50 p-2 rounded-full mr-4 mt-1">
                    <svg
                      className="w-5 h-5 text-amber-600 dark:text-amber-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-800 dark:text-gray-200">
                      <strong className="text-amber-700 dark:text-amber-400">
                        Allocate no more than 40-50%
                      </strong>
                      of your monthly income towards total debt repayments
                    </p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="bg-amber-100 dark:bg-amber-900/50 p-2 rounded-full mr-4 mt-1">
                    <svg
                      className="w-5 h-5 text-amber-600 dark:text-amber-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-800 dark:text-gray-200">
                      <strong className="text-amber-700 dark:text-amber-400">
                        Consider prepayments
                      </strong>
                      whenever you receive bonuses or unexpected windfalls
                    </p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="bg-amber-100 dark:bg-amber-900/50 p-2 rounded-full mr-4 mt-1">
                    <svg
                      className="w-5 h-5 text-amber-600 dark:text-amber-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-800 dark:text-gray-200">
                      <strong className="text-amber-700 dark:text-amber-400">
                        Review your loan terms periodically
                      </strong>
                      to check if refinancing at lower rates makes sense
                    </p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="bg-amber-100 dark:bg-amber-900/50 p-2 rounded-full mr-4 mt-1">
                    <svg
                      className="w-5 h-5 text-amber-600 dark:text-amber-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-800 dark:text-gray-200">
                      <strong className="text-amber-700 dark:text-amber-400">
                        Set up automatic payments
                      </strong>
                      to avoid late payment penalties
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ section with accordion style */}
          <section className="mb-16">
            <div className="flex items-center mb-10">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-12 w-12 rounded-lg flex items-center justify-center shadow-lg mr-4">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-6">
              {/* FAQ Item 1 */}
              <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md">
                <div className="border-l-4 border-purple-500 p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    Is the EMI amount fixed throughout the loan tenure?
                  </h3>
                  <div className="text-gray-700 dark:text-gray-300">
                    <p>
                      For fixed-rate loans, the EMI remains constant unless you
                      opt for prepayments or restructuring. For floating-rate
                      loans, the EMI may change when interest rates are reset,
                      unless you adjust the tenure instead.
                    </p>
                  </div>
                </div>
              </div>

              {/* FAQ Item 2 */}
              <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md">
                <div className="border-l-4 border-blue-500 p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    How do prepayments affect my loan?
                  </h3>
                  <div className="text-gray-700 dark:text-gray-300">
                    <p>
                      Prepayments reduce your outstanding principal, which in
                      turn decreases the interest component of future EMIs. This
                      either shortens your loan tenure or reduces your EMI
                      amount, depending on your agreement with the lender.
                    </p>
                  </div>
                </div>
              </div>

              {/* FAQ Item 3 */}
              <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md">
                <div className="border-l-4 border-red-500 p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    What happens if I miss an EMI payment?
                  </h3>
                  <div className="text-gray-700 dark:text-gray-300">
                    <p>
                      Missing EMI payments typically incurs late payment fees
                      and negatively impacts your credit score. Multiple missed
                      payments may result in penalties and potentially lead to
                      loan default procedures.
                    </p>
                  </div>
                </div>
              </div>

              {/* FAQ Item 4 */}
              <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md">
                <div className="border-l-4 border-green-500 p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    Can I increase my EMI amount later?
                  </h3>
                  <div className="text-gray-700 dark:text-gray-300">
                    <p>
                      Yes, most lenders allow you to increase your EMI amount.
                      This helps reduce your overall interest burden and
                      shortens the loan tenure. Our advanced EMI change feature
                      lets you model such scenarios.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Disclaimer */}
          <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-400 italic">
              Note: This EMI calculator provides estimates based on the
              information you provide. Actual loan terms and EMI amounts may
              vary based on the lender&apos;s specific policies, processing
              fees, and other factors. Always consult with your financial
              institution for the final loan details.
            </p>
          </div>

          <div>
            {/* Set the dynamic parameter to ensure the page is regenerated on each request */}
            <Comments postId="tool_emi-calculator" />
          </div>
        </div>
      </div>
    </div>
  );
}
