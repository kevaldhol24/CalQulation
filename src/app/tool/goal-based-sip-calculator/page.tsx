import { GoalBasedSIPProvider } from "@/contexts/GoalBasedSIPContext";
import { GoalBasedSIPCalculator } from "@/components/feature/GoalBasedSIPCalculator/GoalBasedSIPCalculator";
import { Metadata } from "next";
import { ToolPageHero } from "@/components/common/PageHero";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { HiHome } from "react-icons/hi";
import { Suspense } from "react";
import { GoalBasedSIPCalculatorSkeleton } from "@/components/feature/GoalBasedSIPCalculator/GoalBasedSIPCalculatorSkeleton";
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
    "Goal-Based SIP Calculator - Calculate Required SIP for Your Financial Goals",
  description:
    "Calculate the monthly SIP amount needed to achieve your financial goals. Plan your systematic investments with our goal-based SIP calculator and track your progress.",
  keywords: [
    "goal-based SIP calculator",
    "SIP calculator for goals",
    "financial goal planning",
    "systematic investment plan",
    "target-based investment",
    "goal planning calculator",
    "SIP goal tracker",
    "financial planning tool",
  ],
  openGraph: {
    title: "Goal-Based SIP Calculator - Achieve Your Financial Goals",
    description:
      "Calculate the exact monthly SIP amount needed for your financial goals. Plan better with our goal-based investment calculator.",
    type: "website",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Goal-Based SIP Calculator",
  description:
    "Calculate the monthly SIP amount needed to achieve your financial goals. Plan your systematic investments with goal-based calculations.",
  url: "https://www.calqulation.com/tool/goal-based-sip-calculator",
  mainEntity: {
    "@type": "FinancialProduct",
    name: "Goal-Based SIP Calculator",
    description:
      "A tool to calculate the required monthly SIP amount to achieve specific financial goals.",
    productID: "goal-based-sip-calculator-001",
  },
};

export default async function GoalBasedSIPCalculatorPage() {
  const cookieStore = await cookies();
  const isMobileAppCookie = cookieStore.get("is-mobile-app");
  const isMobileApp = isMobileAppCookie?.value === "true";

  return (
    <div className="bg-gray-200 dark:bg-gray-950 min-h-screen">
      {/* Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      {!isMobileApp && (
        <ToolPageHero
          title="Goal-Based SIP Calculator"
          subtitle="Calculate the monthly SIP amount needed to achieve your financial goals. Plan your systematic investments with precision and track your progress."
        >
          <Breadcrumb
            items={[
              { label: "Home", href: "/", icon: <HiHome /> },
              { label: "Tools", href: "/tools" },
              { label: "Goal-Based SIP Calculator", href: "/tool/goal-based-sip-calculator" },
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
                  <GoalBasedSIPCalculatorSkeleton />
                </div>
              }
            >
              <GoalBasedSIPProvider>
                <GoalBasedSIPCalculator />
              </GoalBasedSIPProvider>
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
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-12 w-12 rounded-lg flex items-center justify-center shadow-lg mr-4 p-3">
                <RiMoneyDollarCircleFill className="text-white text-2xl" />
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                What is a Goal-Based SIP Calculator?
              </h2>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800/50 dark:to-blue-900/30 p-6 rounded-xl shadow-sm">
              <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
                A Goal-Based SIP Calculator is a specialized financial planning tool that helps you determine the exact 
                monthly SIP amount required to achieve specific financial goals. Unlike traditional SIP calculators that 
                show returns for a given investment, this calculator works backward from your target amount to calculate 
                the required monthly investment. It&apos;s perfect for goal-oriented financial planning like buying a house, 
                funding children&apos;s education, planning retirement, or any other financial milestone.
              </p>
            </div>
          </section>

          {/* How it works section with cards */}
          <section className="mb-16">
            <div className="flex items-center mb-10">
              <div className="bg-gradient-to-r from-purple-500 to-blue-600 h-12 w-12 rounded-lg flex items-center justify-center shadow-lg mr-4 p-3">
                <FaChartLine className="text-white text-2xl" />
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                How Our Goal-Based SIP Calculator Works
              </h2>
            </div>

            <p className="text-gray-700 dark:text-gray-200 leading-relaxed mb-10">
              Our comprehensive goal-based calculator uses reverse SIP calculation to determine your investment strategy. 
              Here&apos;s how it helps you achieve your financial goals:
            </p>

            {/* Core calculation card */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden mb-10 transform transition-all hover:shadow-xl">
              <div className="bg-gradient-to-r from-blue-600 to-purple-400 h-2"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                  Reverse SIP Calculation
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Enter your target goal amount, timeframe, and expected returns to instantly calculate:
                </p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <li className="flex items-start">
                    <FaRegCheckCircle className="text-blue-500 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">
                      Required monthly SIP amount to achieve your goal
                    </span>
                  </li>
                  <li className="flex items-start">
                    <FaRegCheckCircle className="text-blue-500 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">
                      Total investment needed over the entire duration
                    </span>
                  </li>
                  <li className="flex items-start">
                    <FaRegCheckCircle className="text-blue-500 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">
                      Expected wealth gained through compound returns
                    </span>
                  </li>
                  <li className="flex items-start">
                    <FaRegCheckCircle className="text-blue-500 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">
                      Year-by-year progress tracking toward your goal
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Goal planning features */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden mb-10">
              <div className="bg-gradient-to-r from-purple-600 to-indigo-400 h-2"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                  Smart Goal Planning Features
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Our calculator includes advanced features for comprehensive goal-based financial planning:
                </p>
                <ul className="space-y-4 mb-4">
                  <li className="flex items-start">
                    <FaRegCheckCircle className="text-purple-500 mt-1 mr-2 flex-shrink-0" />
                    <div>
                      <span className="font-medium text-gray-800 dark:text-gray-200">
                        Flexible Goal Setting
                      </span>
                      <p className="text-gray-700 dark:text-gray-300">
                        Set any financial goal amount and timeframe - from short-term goals like vacation 
                        funding to long-term objectives like retirement planning.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <FaRegCheckCircle className="text-purple-500 mt-1 mr-2 flex-shrink-0" />
                    <div>
                      <span className="font-medium text-gray-800 dark:text-gray-200">
                        Multiple Time Horizons
                      </span>
                      <p className="text-gray-700 dark:text-gray-300">
                        Plan for goals ranging from 1 year to 50 years, allowing you to create 
                        a comprehensive financial roadmap for all life stages.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <FaRegCheckCircle className="text-purple-500 mt-1 mr-2 flex-shrink-0" />
                    <div>
                      <span className="font-medium text-gray-800 dark:text-gray-200">
                        Return Rate Scenarios
                      </span>
                      <p className="text-gray-700 dark:text-gray-300">
                        Test different expected return rates to understand how market performance 
                        affects your required monthly investment amount.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* Progress tracking section */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-500 to-blue-400 h-2"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                  Progress Visualization
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Track your journey toward financial goals with comprehensive visual tools:
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <FaRegCheckCircle className="text-indigo-500 mt-1 mr-2 flex-shrink-0" />
                    <div>
                      <span className="font-medium text-gray-800 dark:text-gray-200">
                        Investment vs. Returns Breakdown
                      </span>
                      <p className="text-gray-700 dark:text-gray-300">
                        Visualize how much of your goal comes from your contributions versus 
                        compound returns through interactive charts.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <FaRegCheckCircle className="text-indigo-500 mt-1 mr-2 flex-shrink-0" />
                    <div>
                      <span className="font-medium text-gray-800 dark:text-gray-200">
                        Year-by-Year Progress Tracking
                      </span>
                      <p className="text-gray-700 dark:text-gray-300">
                        Monitor your progress annually with detailed charts showing accumulated 
                        value and remaining gap to your target goal.
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
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-12 w-12 rounded-lg flex items-center justify-center shadow-lg mr-4 p-3">
                <FaLightbulb className="text-white text-2xl" />
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                Why Use Our Goal-Based SIP Calculator?
              </h2>
            </div>

            {/* Benefits grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center">
                  <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-3">
                    <span className="text-blue-600 dark:text-blue-400 font-bold">1</span>
                  </div>
                  Goal-Oriented Planning
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Unlike traditional calculators, our tool starts with your end goal and works backward 
                  to determine the exact monthly investment needed, making financial planning more purposeful.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center">
                  <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center mr-3">
                    <span className="text-purple-600 dark:text-purple-400 font-bold">2</span>
                  </div>
                  Precise Calculations
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Our calculator uses exact SIP formulas to provide accurate monthly investment amounts, 
                  ensuring you stay on track to achieve your financial goals within your timeframe.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center mr-3">
                    <span className="text-indigo-600 dark:text-indigo-400 font-bold">3</span>
                  </div>
                  Visual Progress Tracking
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Interactive charts and year-by-year breakdowns help you visualize your progress 
                  and stay motivated throughout your investment journey.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center">
                  <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mr-3">
                    <span className="text-green-600 dark:text-green-400 font-bold">4</span>
                  </div>
                  Scenario Planning
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Test different timeframes and return expectations to understand how changes 
                  in your assumptions affect your required monthly investment amount.
                </p>
              </div>
            </div>
          </section>

          {/* Formula section with styled design */}
          <section className="mb-16">
            <div className="flex items-center mb-10">
              <div className="bg-gradient-to-r from-purple-500 to-blue-600 h-12 w-12 rounded-lg flex items-center justify-center shadow-lg mr-4 p-3">
                <span className="text-white font-bold text-lg">ƒx</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                Understanding Goal-Based SIP Formula
              </h2>
            </div>

            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-blue-100 dark:border-gray-700">
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                Our goal-based SIP calculator uses the reverse SIP formula to determine the required monthly investment:
              </p>

              <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 p-6 rounded-xl mb-6 flex justify-center">
                <p className="text-lg md:text-xl font-mono text-gray-800 dark:text-gray-100">
                  PMT = FV ÷ (((1 + r)<sup>n</sup> - 1) / r)
                </p>
              </div>

              <p className="text-gray-700 dark:text-gray-300 mb-4 font-medium">Where:</p>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                  <span className="text-xl font-bold text-blue-600 dark:text-blue-400">PMT</span>
                  <p className="text-gray-700 dark:text-gray-300">
                    Required monthly SIP payment to achieve your goal
                  </p>
                </div>

                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                  <span className="text-xl font-bold text-purple-600 dark:text-purple-400">FV</span>
                  <p className="text-gray-700 dark:text-gray-300">
                    Future Value - your target goal amount
                  </p>
                </div>

                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                  <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400">r</span>
                  <p className="text-gray-700 dark:text-gray-300">
                    Monthly rate of return (annual rate ÷ 12)
                  </p>
                </div>

                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                  <span className="text-xl font-bold text-green-600 dark:text-green-400">n</span>
                  <p className="text-gray-700 dark:text-gray-300">
                    Total number of monthly payments (years × 12)
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Tips section */}
          <section className="mb-16">
            <div className="flex items-center mb-10">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-12 w-12 rounded-lg flex items-center justify-center shadow-lg mr-4 p-3">
                <FaLightbulb className="text-white text-2xl" />
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                Tips for Successful Goal-Based SIP Planning
              </h2>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 p-8 rounded-xl">
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                While our calculator provides the numbers, here are practical tips to ensure 
                you successfully achieve your financial goals:
              </p>

              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-blue-100 dark:bg-blue-900/40 p-2 rounded-full mr-4 mt-1">
                    <span className="text-blue-600 dark:text-blue-400 font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-2">
                      Set SMART Financial Goals
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      Make your goals Specific, Measurable, Achievable, Relevant, and Time-bound. 
                      Clear goals with defined amounts and deadlines are more likely to be achieved 
                      than vague financial aspirations.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-purple-100 dark:bg-purple-900/40 p-2 rounded-full mr-4 mt-1">
                    <span className="text-purple-600 dark:text-purple-400 font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-2">
                      Start Early for Compound Benefits
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      The earlier you start, the lower your required monthly SIP amount will be. 
                      Starting even a year earlier can significantly reduce your monthly investment burden 
                      thanks to the power of compound interest.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-indigo-100 dark:bg-indigo-900/40 p-2 rounded-full mr-4 mt-1">
                    <span className="text-indigo-600 dark:text-indigo-400 font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-2">
                      Be Conservative with Return Expectations
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      Use realistic return expectations based on historical data. It&apos;s better to 
                      invest slightly more and achieve your goal early than to fall short due to 
                      overly optimistic return assumptions.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-green-100 dark:bg-green-900/40 p-2 rounded-full mr-4 mt-1">
                    <span className="text-green-600 dark:text-green-400 font-bold">4</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-2">
                      Review and Adjust Regularly
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      Review your progress annually and adjust your SIP amount if needed. 
                      Life changes, and your financial capacity may improve, allowing you to 
                      increase investments and reach goals faster.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ section */}
          <section className="mb-16">
            <div className="flex items-center mb-10">
              <div className="bg-gradient-to-r from-purple-500 to-blue-600 h-12 w-12 rounded-lg flex items-center justify-center shadow-lg mr-4 p-3">
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
                    How is goal-based SIP different from regular SIP calculation?
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Regular SIP calculators show you the future value for a given monthly investment. 
                    Goal-based SIP calculators work in reverse - you specify your target amount and timeframe, 
                    and it calculates the exact monthly SIP amount needed to achieve that goal. 
                    This approach is more practical for specific financial planning.
                  </p>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">
                    What if I can&apos;t afford the calculated monthly SIP amount?
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    If the required amount is beyond your budget, you have several options: extend your 
                    timeframe to reduce the monthly requirement, lower your goal amount, or look for 
                    higher-return investments. You can also start with what you can afford and increase 
                    the amount annually as your income grows.
                  </p>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">
                    Should I have separate SIPs for different goals?
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Yes, it&apos;s generally recommended to have separate SIPs for different goals, 
                    especially if they have different timeframes. Short-term goals (1-3 years) should 
                    be in conservative investments, while long-term goals (5+ years) can afford more 
                    equity exposure for potentially higher returns.
                  </p>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">
                    What return rate should I use for different time horizons?
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    For short-term goals (1-3 years), use 6-8% (debt funds/FDs). For medium-term goals 
                    (3-7 years), use 8-10% (balanced funds). For long-term goals (7+ years), you can 
                    use 10-12% (equity funds). Always be conservative in your estimates to avoid falling 
                    short of your targets.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Disclaimer */}
          <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-400 italic">
              Note: This goal-based SIP calculator provides estimates based on the information you provide. 
              Actual investment returns may vary based on market conditions, fund performance, and economic factors. 
              The calculations assume consistent monthly investments and do not account for expense ratios, taxes, 
              or market volatility. Always consult with a qualified financial advisor for personalized investment advice.
            </p>
          </div>

          <div className="mt-16">
            <Comments postId="tool_goal-based-sip-calculator" />
          </div>
        </div>
      </div>
    </div>
  );
}
