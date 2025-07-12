import { SwpProvider } from "@/contexts/SwpContext";
import { SwpCalculator } from "@/components/feature/SwpCalculator/SwpCalculator";
import { Metadata } from "next";
import { ToolPageHero } from "@/components/common/PageHero";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { HiHome } from "react-icons/hi";
import { Suspense } from "react";
import { SwpCalculatorSkeleton } from "@/components/feature/SwpCalculator/SwpCalculatorSkeleton";
import { cookies } from "next/headers";
import { Comments } from "@/components/feature/Comments";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import {
  FaChartLine,
  FaLightbulb,
  FaRegCheckCircle,
  FaRegQuestionCircle,
} from "react-icons/fa";

export const metadata: Metadata = {
  title:
    "SWP Calculator - Systematic Withdrawal Plan Calculator for Retirement Planning",
  description:
    "Calculate systematic withdrawals from your investments with our SWP calculator. Plan your retirement income, track withdrawals, and see how long your money will last.",
  keywords: [
    "SWP calculator",
    "systematic withdrawal plan",
    "retirement planning",
    "withdrawal calculator",
    "investment withdrawal",
    "retirement income",
    "pension planning",
    "financial planning tool",
  ],
  openGraph: {
    title: "SWP Calculator - Plan Your Systematic Withdrawals",
    description:
      "Calculate how long your investments will last with systematic withdrawals. Perfect for retirement and income planning.",
    type: "website",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "SWP Calculator",
  description:
    "Calculate systematic withdrawals from your investments. Plan retirement income and see how long your money will last.",
  url: "https://www.calqulation.com/tool/swp-calculator",
  mainEntity: {
    "@type": "FinancialProduct",
    name: "SWP Calculator",
    description:
      "A tool to calculate systematic withdrawal plans for retirement and income planning.",
    productID: "swp-calculator-001",
  },
};

export default async function SwpCalculatorPage() {
  const cookieStore = await cookies();
  const isMobileAppCookie = cookieStore.get("is-mobile-app");
  const isMobileApp = isMobileAppCookie?.value === "true";

  return (
    <div className="bg-gray-200 dark:bg-gray-950 min-h-screen">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {!isMobileApp && (
        <ToolPageHero
          title="SWP Calculator"
          subtitle="Calculate systematic withdrawals from your investments."
        >
          <Breadcrumb
            items={[
              { label: "Home", href: "/", icon: <HiHome /> },
              { label: "Tools", href: "/tools" },
              { label: "SWP Calculator", href: "/tool/swp-calculator" },
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
                  <SwpCalculatorSkeleton />
                </div>
              }
            >
              <SwpProvider>
                <SwpCalculator />
              </SwpProvider>
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
              <div className="bg-gradient-to-r from-orange-500 to-red-600 h-12 w-12 rounded-lg flex items-center justify-center shadow-lg mr-4 p-3">
                <RiMoneyDollarCircleFill className="text-white text-2xl" />
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                What is a Systematic Withdrawal Plan (SWP)?
              </h2>
            </div>

            <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-gray-800/50 dark:to-red-900/30 p-6 rounded-xl shadow-sm">
              <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
                A Systematic Withdrawal Plan (SWP) is an investment strategy
                that allows you to withdraw a fixed amount from your investment
                portfolio at regular intervals, typically monthly. It&apos;s the
                opposite of a SIP (Systematic Investment Plan) and is commonly
                used for retirement planning or generating regular income from
                investments. Our SWP calculator helps you determine how long
                your investments will last based on your withdrawal amount,
                expected returns, and initial investment.
              </p>
            </div>
          </section>

          {/* How it works section with cards */}
          <section className="mb-16">
            <div className="flex items-center mb-10">
              <div className="bg-gradient-to-r from-red-500 to-orange-600 h-12 w-12 rounded-lg flex items-center justify-center shadow-lg mr-4 p-3">
                <FaChartLine className="text-white text-2xl" />
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                How Our SWP Calculator Works
              </h2>
            </div>

            <p className="text-gray-700 dark:text-gray-200 leading-relaxed mb-10">
              Our comprehensive SWP calculator uses advanced financial
              calculations to project your withdrawal plan. Here&apos;s how it
              helps you plan your financial future:
            </p>

            {/* Core calculation card */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden mb-10 transform transition-all hover:shadow-xl">
              <div className="bg-gradient-to-r from-orange-600 to-red-400 h-2"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                  Advanced SWP Calculations
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Enter your initial investment, monthly withdrawal amount, and
                  expected returns to get detailed insights:
                </p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <li className="flex items-start">
                    <FaRegCheckCircle className="text-orange-500 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">
                      How long your money will last with regular withdrawals
                    </span>
                  </li>
                  <li className="flex items-start">
                    <FaRegCheckCircle className="text-orange-500 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">
                      Total amount you can withdraw over the entire period
                    </span>
                  </li>
                  <li className="flex items-start">
                    <FaRegCheckCircle className="text-orange-500 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">
                      Interest earned while making withdrawals
                    </span>
                  </li>
                  <li className="flex items-start">
                    <FaRegCheckCircle className="text-orange-500 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">
                      Remaining balance at any point in time
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Retirement planning features */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden mb-10">
              <div className="bg-gradient-to-r from-red-600 to-pink-400 h-2"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                  Retirement Planning Features
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Our calculator includes specialized features for retirement
                  and income planning:
                </p>
                <ul className="space-y-4 mb-4">
                  <li className="flex items-start">
                    <FaRegCheckCircle className="text-red-500 mt-1 mr-2 flex-shrink-0" />
                    <div>
                      <span className="font-medium text-gray-800 dark:text-gray-200">
                        Flexible Withdrawal Scenarios
                      </span>
                      <p className="text-gray-700 dark:text-gray-300">
                        Test different monthly withdrawal amounts to find the
                        right balance between income and portfolio longevity.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <FaRegCheckCircle className="text-red-500 mt-1 mr-2 flex-shrink-0" />
                    <div>
                      <span className="font-medium text-gray-800 dark:text-gray-200">
                        Return Rate Analysis
                      </span>
                      <p className="text-gray-700 dark:text-gray-300">
                        See how different market conditions and return
                        expectations affect your withdrawal sustainability.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <FaRegCheckCircle className="text-red-500 mt-1 mr-2 flex-shrink-0" />
                    <div>
                      <span className="font-medium text-gray-800 dark:text-gray-200">
                        Year-by-Year Breakdown
                      </span>
                      <p className="text-gray-700 dark:text-gray-300">
                        Track your portfolio balance year by year to understand
                        exactly when your funds might be depleted.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* Visual tracking section */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-pink-500 to-red-400 h-2"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                  Visual Progress Tracking
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Monitor your withdrawal plan with comprehensive visual
                  analytics:
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <FaRegCheckCircle className="text-pink-500 mt-1 mr-2 flex-shrink-0" />
                    <div>
                      <span className="font-medium text-gray-800 dark:text-gray-200">
                        Investment Breakdown Charts
                      </span>
                      <p className="text-gray-700 dark:text-gray-300">
                        Visualize how your initial investment is distributed
                        between withdrawals, interest earned, and remaining
                        balance.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <FaRegCheckCircle className="text-pink-500 mt-1 mr-2 flex-shrink-0" />
                    <div>
                      <span className="font-medium text-gray-800 dark:text-gray-200">
                        Withdrawal Timeline
                      </span>
                      <p className="text-gray-700 dark:text-gray-300">
                        Track your portfolio balance over time with line charts
                        showing the gradual depletion of your investment.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Why Use Our Calculator section */}
          <section className="mb-16">
            <div className="flex items-center mb-10">
              <div className="bg-gradient-to-r from-orange-500 to-red-600 h-12 w-12 rounded-lg flex items-center justify-center shadow-lg mr-4 p-3">
                <FaLightbulb className="text-white text-2xl" />
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                Why Use Our SWP Calculator?
              </h2>
            </div>

            {/* Benefits grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center">
                  <div className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-900 flex items-center justify-center mr-3">
                    <span className="text-orange-600 dark:text-orange-400 font-bold">
                      1
                    </span>
                  </div>
                  Retirement Income Planning
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Perfect for planning your retirement income. Calculate how
                  much you can safely withdraw each month without depleting your
                  savings too quickly.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center">
                  <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center mr-3">
                    <span className="text-red-600 dark:text-red-400 font-bold">
                      2
                    </span>
                  </div>
                  Tax-Efficient Withdrawals
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  SWP can be more tax-efficient than lumpsum withdrawals,
                  especially for equity mutual funds where gains are taxed based
                  on holding period.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center">
                  <div className="w-8 h-8 rounded-full bg-pink-100 dark:bg-pink-900 flex items-center justify-center mr-3">
                    <span className="text-pink-600 dark:text-pink-400 font-bold">
                      3
                    </span>
                  </div>
                  Scenario Analysis
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Test multiple scenarios with different withdrawal amounts and
                  return rates to find the optimal strategy for your financial
                  situation.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center">
                  <div className="w-8 h-8 rounded-full bg-yellow-100 dark:bg-yellow-900 flex items-center justify-center mr-3">
                    <span className="text-yellow-600 dark:text-yellow-400 font-bold">
                      4
                    </span>
                  </div>
                  Inflation Protection
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Your remaining investment continues to grow, providing some
                  protection against inflation while you make regular
                  withdrawals.
                </p>
              </div>
            </div>
          </section>

          {/* Formula section with styled design */}
          <section className="mb-16">
            <div className="flex items-center mb-10">
              <div className="bg-gradient-to-r from-red-500 to-orange-600 h-12 w-12 rounded-lg flex items-center justify-center shadow-lg mr-4 p-3">
                <span className="text-white font-bold text-lg">ƒx</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                Understanding SWP Calculations
              </h2>
            </div>

            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-orange-100 dark:border-gray-700">
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                Our SWP calculator uses compound interest calculations to
                determine how your investment balance changes over time with
                regular withdrawals:
              </p>

              <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/30 dark:to-red-900/30 p-6 rounded-xl mb-6 flex justify-center">
                <p className="text-lg md:text-xl font-mono text-gray-800 dark:text-gray-100">
                  New Balance = (Previous Balance - Withdrawal) × (1 + Monthly
                  Rate)
                </p>
              </div>

              <p className="text-gray-700 dark:text-gray-300 mb-4 font-medium">
                This calculation is repeated monthly until:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                  <span className="text-xl font-bold text-orange-600 dark:text-orange-400">
                    Balance = 0
                  </span>
                  <p className="text-gray-700 dark:text-gray-300">
                    Your investment is completely exhausted
                  </p>
                </div>

                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                  <span className="text-xl font-bold text-red-600 dark:text-red-400">
                    Time Period
                  </span>
                  <p className="text-gray-700 dark:text-gray-300">
                    Your specified withdrawal duration ends
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Tips section */}
          <section className="mb-16">
            <div className="flex items-center mb-10">
              <div className="bg-gradient-to-r from-orange-500 to-red-500 h-12 w-12 rounded-lg flex items-center justify-center shadow-lg mr-4 p-3">
                <FaLightbulb className="text-white text-2xl" />
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                SWP Best Practices
              </h2>
            </div>

            <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-gray-800 dark:to-gray-900 p-8 rounded-xl">
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                Follow these best practices to optimize your systematic
                withdrawal plan:
              </p>

              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-orange-100 dark:bg-orange-900/40 p-2 rounded-full mr-4 mt-1">
                    <span className="text-orange-600 dark:text-orange-400 font-bold">
                      1
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-2">
                      Conservative Withdrawal Rate
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      A common rule of thumb is the 4% rule - withdrawing no
                      more than 4% of your portfolio annually. This helps ensure
                      your money lasts for 25-30 years.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-red-100 dark:bg-red-900/40 p-2 rounded-full mr-4 mt-1">
                    <span className="text-red-600 dark:text-red-400 font-bold">
                      2
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-2">
                      Diversified Portfolio
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      Maintain a diversified portfolio across equity, debt, and
                      other assets to reduce volatility and ensure steady
                      returns during your withdrawal phase.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-pink-100 dark:bg-pink-900/40 p-2 rounded-full mr-4 mt-1">
                    <span className="text-pink-600 dark:text-pink-400 font-bold">
                      3
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-2">
                      Emergency Buffer
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      Keep 6-12 months of expenses in liquid investments
                      separate from your SWP corpus to handle emergencies
                      without disrupting your withdrawal plan.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-yellow-100 dark:bg-yellow-900/40 p-2 rounded-full mr-4 mt-1">
                    <span className="text-yellow-600 dark:text-yellow-400 font-bold">
                      4
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-2">
                      Regular Review
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      Review your SWP annually and adjust withdrawal amounts
                      based on portfolio performance, inflation, and changing
                      financial needs.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ section */}
          <section className="mb-16">
            <div className="flex items-center mb-10">
              <div className="bg-gradient-to-r from-red-500 to-orange-600 h-12 w-12 rounded-lg flex items-center justify-center shadow-lg mr-4 p-3">
                <FaRegQuestionCircle className="text-white text-2xl" />
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">
                    What&apos;s the difference between SWP and dividend payout?
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    SWP gives you control over the withdrawal amount and timing,
                    while dividend payouts depend on fund performance and
                    management decisions. SWP provides predictable cash flow,
                    making it better for financial planning, whereas dividends
                    can be irregular and uncertain.
                  </p>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">
                    Can I change my SWP amount after starting?
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Yes, most mutual fund companies allow you to modify or stop
                    your SWP. You can increase, decrease, or pause withdrawals
                    based on your changing financial needs. Some funds may have
                    restrictions on frequency of changes.
                  </p>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">
                    What happens if my investment value drops significantly?
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    If your portfolio value drops due to market conditions, your
                    SWP will continue as scheduled, but this will reduce the
                    longevity of your investment. Consider reducing withdrawal
                    amounts during market downturns to preserve capital.
                  </p>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">
                    How are SWP withdrawals taxed?
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    SWP withdrawals are treated as redemptions and taxed based
                    on holding period. For equity funds, gains are tax-free if
                    held for more than 1 year, and 15% if held for less. For
                    debt funds, gains are taxed at your income tax slab. Consult
                    a tax advisor for specific guidance.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Disclaimer */}
          <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-400 italic">
              Note: This SWP calculator provides estimates based on the
              information you provide. Actual investment returns may vary based
              on market conditions, fund performance, and economic factors. The
              calculations assume consistent market returns and do not account
              for market volatility, expense ratios, or taxes. Always consult
              with a qualified financial advisor for personalized investment
              advice.
            </p>
          </div>

          <div className="mt-16">
            <Comments postId="tool_swp-calculator" />
          </div>
        </div>
      </div>
    </div>
  );
}
