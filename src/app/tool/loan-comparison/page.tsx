import { Comments } from "@/components/feature/Comments";
import LoanComparison from "@/components/feature/LoanComparison/LoanComparison";
import { Metadata } from "next";
import {
  FaChartLine,
  FaLightbulb,
  FaBalanceScale,
  FaCalculator,
  FaMoneyBillWave,
  FaPercentage,
  FaClock,
  FaCheckCircle,
} from "react-icons/fa";
import { RiMoneyDollarCircleFill } from "react-icons/ri";

const comparisonSchemaJson = {
  "@context": "https://schema.org",
  "@type": "FinancialProduct",
  name: "Loan Comparison Tool",
  url: "https://www.calqulation.com/tool/loan-comparison",
  description:
    "Compare multiple loan options side by side to find the best deal for your financial needs.",
  featureList: [
    "Side-by-side loan comparison",
    "EMI calculation for multiple loans",
    "Interest rate comparison",
    "Total cost analysis",
    "Visual comparison charts",
  ],
  category: "Financial Tool",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "INR",
  },
};

export const metadata: Metadata = {
  title: "Loan Comparison Tool | Compare Multiple Loan Options Side by Side",
  description:
    "Compare different loan options with our advanced loan comparison tool. Analyze EMI, interest rates, tenure, and total cost side by side to make informed decisions.",
  keywords:
    "loan comparison, compare loans, loan calculator comparison, EMI comparison, home loan comparison, car loan comparison, personal loan comparison",
  alternates: {
    canonical: "https://www.calqulation.com/tool/loan-comparison",
  },
  openGraph: {
    title: "Loan Comparison Tool | Compare Multiple Loan Options",
    description:
      "Compare different loan options side by side. Analyze EMI, interest rates, and total costs to make the best financial decision.",
    url: "https://www.calqulation.com/tool/loan-comparison",
    images: [
      {
        url: "/Financial-planning.svg",
        width: 1200,
        height: 630,
        alt: "Loan Comparison Tool",
      },
    ],
  },
};

export default function LoanComparisonPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(comparisonSchemaJson),
        }}
      />
      <LoanComparison />
      {/* Content section with modern styling */}
      <div className="bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Introduction section */}
          <section className="mb-16">
            <div className="flex items-center mb-6">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-12 w-12 rounded-lg flex items-center justify-center shadow-lg mr-4 p-3">
                <RiMoneyDollarCircleFill className="text-white text-2xl" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Why Compare Loans Side by Side?
              </h2>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800/50 dark:to-blue-900/30 p-6 rounded-xl shadow-sm">
              <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
                Choosing the right loan can save you thousands of rupees over
                the loan tenure. Our loan comparison tool allows you to evaluate
                multiple loan options simultaneously, helping you make informed
                financial decisions by comparing EMI amounts, total interest
                payable, and different loan scenarios side by side.
              </p>
            </div>
          </section>

          {/* How it works section */}
          <section className="mb-16">
            <div className="flex items-center mb-10">
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 h-12 w-12 rounded-lg flex items-center justify-center shadow-lg mr-4 p-3">
                <FaChartLine className="text-white text-2xl" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                How Our Loan Comparison Tool Works
              </h2>
            </div>

            <p className="text-gray-700 dark:text-gray-200 leading-relaxed mb-10">
              Our comprehensive loan comparison tool provides a detailed
              analysis of different loan options to help you choose the best
              deal. Here&apos;s what you can compare:
            </p>

            {/* Comparison features cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="bg-blue-100 dark:bg-blue-900/30 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <FaCalculator className="text-blue-600 dark:text-blue-400 text-xl" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  EMI Comparison
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Compare monthly EMI amounts across different loan options to
                  find the most affordable payment plan.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="bg-green-100 dark:bg-green-900/30 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <FaPercentage className="text-green-600 dark:text-green-400 text-xl" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Interest Rate Analysis
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Evaluate different interest rates and their impact on your
                  total loan cost over the entire tenure.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="bg-purple-100 dark:bg-purple-900/30 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <FaMoneyBillWave className="text-purple-600 dark:text-purple-400 text-xl" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Total Cost Comparison
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Compare the total amount payable including principal and
                  interest to understand the true cost.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="bg-orange-100 dark:bg-orange-900/30 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <FaClock className="text-orange-600 dark:text-orange-400 text-xl" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Tenure Flexibility
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Analyze how different loan tenures affect your EMI and total
                  interest across various options.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="bg-red-100 dark:bg-red-900/30 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <FaBalanceScale className="text-red-600 dark:text-red-400 text-xl" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Prepayment Impact
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Compare how prepayments affect different loan options and find
                  the best strategy.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="bg-indigo-100 dark:bg-indigo-900/30 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <FaChartLine className="text-indigo-600 dark:text-indigo-400 text-xl" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Visual Charts
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Get visual representations of payment breakdowns and
                  amortization schedules for easy comparison.
                </p>
              </div>
            </div>
          </section>

          {/* Benefits section */}
          <section className="mb-16">
            <div className="flex items-center mb-10">
              <div className="p-4 bg-gradient-to-r from-emerald-500 to-green-600 h-12 w-12 rounded-lg flex items-center justify-center shadow-lg mr-4">
                <FaLightbulb className="text-white text-2xl" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Benefits of Using Our Comparison Tool
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <FaCheckCircle className="text-green-500 text-xl mr-3" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Save Money
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  Find the loan option with the lowest total cost and save
                  thousands of rupees over the loan tenure.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <FaCheckCircle className="text-green-500 text-xl mr-3" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Make Informed Decisions
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  Compare all aspects of different loans to make well-informed
                  financial decisions based on concrete data.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <FaCheckCircle className="text-green-500 text-xl mr-3" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Time Efficient
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  No need to calculate each loan separately. Compare multiple
                  options simultaneously in one place.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center mb-4">
                  <FaCheckCircle className="text-green-500 text-xl mr-3" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Comprehensive Analysis
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  Get detailed breakdowns, charts, and amortization schedules
                  for each loan option.
                </p>
              </div>
            </div>
          </section>

          {/* Tips section */}
          <section className="mb-16">
            <div className="flex items-center mb-10">
              <div className="bg-gradient-to-r from-amber-500 to-orange-500 h-12 w-12 rounded-lg flex items-center justify-center shadow-lg mr-4 p-4">
                <FaLightbulb className="text-white text-2xl" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Tips for Effective Loan Comparison
              </h2>
            </div>

            <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-gray-800 dark:to-gray-900 p-8 rounded-xl">
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                To get the most out of our loan comparison tool, keep these
                important factors in mind:
              </p>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-amber-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-4 mt-1 p-3">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                      Compare APR, Not Just Interest Rates
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      Look at the Annual Percentage Rate (APR) which includes
                      all fees and charges, not just the base interest rate.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-amber-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-4 mt-1 p-3">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                      Consider Processing Fees
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      Factor in processing fees, documentation charges, and
                      other upfront costs when comparing total loan expenses.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-amber-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-4 mt-1 p-3">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                      Evaluate Prepayment Options
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      Check prepayment policies and penalties. Some loans allow
                      free prepayments while others charge penalties.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-amber-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-4 mt-1 p-3">
                    4
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                      Understand Rate Types
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      Compare fixed vs. floating rate loans and consider how
                      rate changes might affect your payments over time.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-amber-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-4 mt-1 p-3">
                    5
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                      Check Loan Terms and Conditions
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      Review all terms including insurance requirements, late
                      payment penalties, and other conditions that might affect
                      costs.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ section */}
          <section className="mb-16">
            <div className="flex items-center mb-10">
              <div className="p-3 bg-gradient-to-r from-indigo-500 to-blue-600 h-12 w-12 rounded-lg flex items-center justify-center shadow-lg mr-4">
                <FaBalanceScale className="text-white text-2xl" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  How many loans can I compare at once?
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Our tool allows you to compare two loans side by side. This
                  provides a clear, focused comparison without overwhelming you
                  with too much information at once.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Can I compare different types of loans?
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Yes, you can compare any types of loans - home loans, car
                  loans, personal loans, etc. The tool works with any loan as
                  long as you have the basic parameters like amount, interest
                  rate, and tenure.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Does the tool consider floating interest rates?
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Yes, our advanced calculator supports floating rate loans and
                  allows you to model interest rate changes over the loan tenure
                  for more accurate comparisons.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Can I factor in prepayments in my comparison?
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Absolutely! You can add prepayment scenarios to both loan
                  options and see how they affect the total cost and tenure,
                  helping you choose the loan that offers the best prepayment
                  benefits.
                </p>
              </div>
            </div>
          </section>

          {/* Disclaimer */}
          <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-400 italic">
              Note: This loan comparison tool provides estimates based on the
              information you provide. Actual loan terms, interest rates, and
              fees may vary based on individual creditworthiness, lender
              policies, and market conditions. Always consult with financial
              institutions for final loan details and terms.
            </p>
          </div>

          {/* Comments section */}
          <div className="mt-16">
            <Comments postId="tool_loan-comparison" />
          </div>
        </div>
      </div>
    </>
  );
}
