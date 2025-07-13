import { Breadcrumb } from "@/components/common/Breadcrumb";
import { ToolPageHero } from "@/components/common/PageHero";
import { Comments } from "@/components/feature/Comments";
import { LoanCalculatorWithProvider } from "@/components/feature/EmiCalculator/LoanCalculator";
import { LoanCalculatorSkeleton } from "@/components/feature/EmiCalculator/LoanCalculatorSkeleton";
import { formateDate } from "@/lib/utils";
import { LoanCalculationInputs } from "~lib/calqulation";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { Suspense } from "react";
import { FaCar, FaChartLine, FaLightbulb } from "react-icons/fa";
import { HiHome } from "react-icons/hi";

export const metadata: Metadata = {
  title:
    "Car Loan Calculator | Calculate Car Loan EMI, Interest & Monthly Payments",
  description:
    "Calculate your car loan EMI, total interest payable, and monthly payments. Plan your auto loan with our specialized car loan calculator for accurate financing estimates.",
  keywords:
    "car loan calculator, auto loan EMI, car financing calculator, vehicle loan EMI, car loan monthly payment, auto loan interest calculator, car loan affordability calculator",
  alternates: {
    canonical: "https://www.calqulation.com/tool/car-loan-calculator",
  },
  openGraph: {
    title:
      "Car Loan Calculator | Calculate Car Loan EMI, Interest & Monthly Payments",
    description:
      "Calculate your car loan EMI, total interest payable, and monthly payments. Plan your auto loan with specialized car loan calculator.",
    url: "https://www.calqulation.com/tool/car-loan-calculator",
    images: [
      {
        url: "/Financial-planning.svg",
        width: 1200,
        height: 630,
        alt: "Car Loan Calculator",
      },
    ],
  },
};

export default async function CarLoanCalculatorPage() {
  const cookieStore = await cookies();
  const isMobileAppCookie = cookieStore.get("is-mobile-app");
  const isMobileApp = isMobileAppCookie?.value === "true";

  // Initial values suitable for car loans
  const today = new Date();
  const initialCarLoanDetails: LoanCalculationInputs = {
    loanAmount: 500000, // 5 lakhs - typical car loan amount
    initialInterestRate: 9.5, // Typical car loan interest rate
    tenureMonths: 60, // 5 years - common car loan tenure
    startDate: formateDate(new Date(today.getFullYear(), today.getMonth())),
    prepayments: [],
    interestRateChanges: [],
    emiChanges: [],
  };

  // Schema.org structured data for the car loan calculator
  const calculatorSchemaJson = {
    "@context": "https://schema.org",
    "@type": "FinancialProduct",
    name: "Car Loan Calculator",
    description:
      "Calculate your car loan EMI, total interest payable, and monthly payments for vehicle financing.",
    featureList: [
      "Instant car loan EMI calculation",
      "Auto loan interest calculation",
      "Monthly payment breakdown",
      "Total cost of vehicle financing",
      "Visual charts and graphs",
    ],
    category: "Auto Loan Tool",
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

      {!isMobileApp && (
        <ToolPageHero
          title="Car Loan Calculator"
          subtitle="Calculate your car loan EMI and plan your vehicle financing with ease."
        >
          <Breadcrumb
            items={[
              { label: "Home", href: "/", icon: <HiHome /> },
              { label: "Tools", href: "/tools" },
              {
                label: "Car Loan Calculator",
                href: "/tool/car-loan-calculator",
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
                hideAdvanceOptions={true}
                initialLoanDetails={initialCarLoanDetails}
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
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-12 w-12 rounded-lg flex items-center justify-center shadow-lg mr-4">
                <FaCar className="text-white text-2xl" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                What is a Car Loan Calculator?
              </h2>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800/50 dark:to-blue-900/30 p-6 rounded-xl shadow-sm">
              <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
                A Car Loan Calculator is a specialized financial tool designed
                to help you estimate the monthly EMI (Equated Monthly
                Installment) for your vehicle financing. Whether you&apos;re
                planning to buy a new car, used car, or considering refinancing
                your existing auto loan, our calculator provides accurate
                estimates to help you make informed decisions about your car
                purchase.
              </p>
            </div>
          </section>

          {/* How it works section */}
          <section className="mb-16">
            <div className="flex items-center mb-10">
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 h-12 w-12 rounded-lg flex items-center justify-center shadow-lg mr-4">
                <FaChartLine className="text-white text-2xl" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                How Our Car Loan Calculator Works
              </h2>
            </div>

            <p className="text-gray-700 dark:text-gray-200 leading-relaxed mb-10">
              Our car loan calculator is specifically designed for vehicle
              financing, with default values and ranges optimized for car loans
              in India. Here&apos;s how it helps you:
            </p>

            {/* Car loan specific features */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden mb-10 transform transition-all hover:shadow-xl">
              <div className="bg-gradient-to-r from-blue-600 to-blue-400 h-2"></div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                  <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-lg mr-3">
                    <FaCar className="text-blue-600 dark:text-blue-300" />
                  </div>
                  Car Loan Specific Calculations
                </h3>

                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  Enter your car loan details to get instant EMI calculations:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-blue-50 dark:bg-gray-700 p-4 rounded-lg border-l-4 border-blue-500">
                    <h4 className="font-bold text-blue-700 dark:text-blue-300">
                      Car Price / Loan Amount
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      The amount you want to borrow for your car purchase
                    </p>
                  </div>

                  <div className="bg-blue-50 dark:bg-gray-700 p-4 rounded-lg border-l-4 border-blue-500">
                    <h4 className="font-bold text-blue-700 dark:text-blue-300">
                      Interest Rate
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Auto loan interest rate offered by your lender (typically
                      8-12%)
                    </p>
                  </div>

                  <div className="bg-blue-50 dark:bg-gray-700 p-4 rounded-lg border-l-4 border-blue-500">
                    <h4 className="font-bold text-blue-700 dark:text-blue-300">
                      Loan Tenure
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Car loan repayment period (usually 3-7 years)
                    </p>
                  </div>

                  <div className="bg-blue-50 dark:bg-gray-700 p-4 rounded-lg border-l-4 border-blue-500">
                    <h4 className="font-bold text-blue-700 dark:text-blue-300">
                      Starting Month
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      When you plan to start your car loan EMI payments
                    </p>
                  </div>
                </div>

                <p className="text-gray-700 dark:text-gray-300">
                  Our calculator instantly shows your monthly car EMI, total
                  interest cost, and the complete payment breakdown for your
                  vehicle financing.
                </p>
              </div>
            </div>
          </section>

          {/* Benefits section */}
          <section className="mb-16">
            <div className="flex items-center mb-10">
              <div className="bg-gradient-to-r from-emerald-500 to-green-600 h-12 w-12 rounded-lg flex items-center justify-center shadow-lg mr-4">
                <FaLightbulb className="text-white text-2xl" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Why Use Our Car Loan Calculator?
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold text-emerald-600 dark:text-emerald-400 mb-3">
                  Plan Your Car Purchase Budget
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Determine how much car you can afford based on your monthly
                  budget. Avoid overstretching your finances and choose a car
                  that fits your financial comfort zone.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-3">
                  Compare Car Loan Offers
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Evaluate different car loan offers from banks, NBFCs, and car
                  dealerships. Compare interest rates, processing fees, and
                  total costs to find the best deal for your car financing.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold text-purple-600 dark:text-purple-400 mb-3">
                  Understand True Cost of Ownership
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  See the complete financial picture including total interest
                  cost. This helps you understand the true cost of financing
                  your car beyond just the monthly EMI amount.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold text-amber-600 dark:text-amber-400 mb-3">
                  Make Informed Decisions
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Get instant calculations to make quick decisions at the
                  dealership. Know your EMI amount beforehand to negotiate
                  better terms and avoid surprises during the car buying
                  process.
                </p>
              </div>
            </div>
          </section>

          {/* Car loan tips section */}
          <section className="mb-16">
            <div className="flex items-center mb-10">
              <div className="bg-gradient-to-r from-amber-500 to-orange-500 h-12 w-12 rounded-lg flex items-center justify-center shadow-lg mr-4">
                <FaLightbulb className="text-white text-2xl" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Car Loan Tips for Smart Financing
              </h2>
            </div>

            <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-gray-800 dark:to-gray-900 p-8 rounded-xl">
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                Here are some practical tips to get the best car loan deal:
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
                        Make a larger down payment
                      </strong>
                      to reduce your loan amount and EMI burden
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
                        Compare offers from multiple lenders
                      </strong>
                      including banks, NBFCs, and dealer financing
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
                        Keep car loan tenure shorter
                      </strong>
                      to save on total interest costs (3-5 years is ideal)
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
                        Maintain a good credit score
                      </strong>
                      to qualify for better interest rates
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
                        Consider total cost of ownership
                      </strong>
                      including insurance, maintenance, and fuel costs
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ section */}
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
                Car Loan FAQs
              </h2>
            </div>

            <div className="space-y-6">
              {/* FAQ Item 1 */}
              <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md">
                <div className="border-l-4 border-purple-500 p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    What is the typical interest rate for car loans in India?
                  </h3>
                  <div className="text-gray-700 dark:text-gray-300">
                    <p>
                      Car loan interest rates in India typically range from 8%
                      to 12% per annum, depending on factors like your credit
                      score, loan amount, tenure, and the lender. Banks usually
                      offer lower rates compared to NBFCs, and new car loans
                      often have better rates than used car loans.
                    </p>
                  </div>
                </div>
              </div>

              {/* FAQ Item 2 */}
              <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md">
                <div className="border-l-4 border-blue-500 p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    What is the maximum loan amount I can get for a car?
                  </h3>
                  <div className="text-gray-700 dark:text-gray-300">
                    <p>
                      Most lenders finance up to 80-90% of the car&apos;s
                      on-road price. For new cars, you can typically get up to
                      90% financing, while used cars may be financed up to 80%.
                      The loan amount also depends on your income,
                      creditworthiness, and repayment capacity.
                    </p>
                  </div>
                </div>
              </div>

              {/* FAQ Item 3 */}
              <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md">
                <div className="border-l-4 border-green-500 p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    What is the ideal tenure for a car loan?
                  </h3>
                  <div className="text-gray-700 dark:text-gray-300">
                    <p>
                      The ideal car loan tenure is typically 3-5 years. While
                      longer tenures (up to 7 years) reduce your EMI burden,
                      they significantly increase the total interest cost.
                      Consider your cash flow and aim for the shortest tenure
                      you can comfortably afford.
                    </p>
                  </div>
                </div>
              </div>

              {/* FAQ Item 4 */}
              <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md">
                <div className="border-l-4 border-amber-500 p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    Should I choose fixed or floating interest rate for car
                    loans?
                  </h3>
                  <div className="text-gray-700 dark:text-gray-300">
                    <p>
                      Most car loans in India come with fixed interest rates,
                      which provide certainty in your EMI payments. Fixed rates
                      are generally recommended for car loans due to their
                      shorter tenure compared to home loans. This helps you plan
                      your finances better without worrying about rate
                      fluctuations.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Disclaimer */}
          <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-400 italic">
              Note: This car loan calculator provides estimates based on the
              information you provide. Actual loan terms, EMI amounts, and
              interest rates may vary based on the lender&apos;s specific
              policies, your credit profile, processing fees, and other factors.
              Always consult with your bank or financial institution for final
              loan details and terms.
            </p>
          </div>

          <div>
            <Comments postId="tool_car-loan-calculator" />
          </div>
        </div>
      </div>
    </div>
  );
}
