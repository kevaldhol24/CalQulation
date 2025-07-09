import { Breadcrumb } from "@/components/common/Breadcrumb";
import { ToolPageHero } from "@/components/common/PageHero";
import { Comments } from "@/components/feature/Comments";
import { SIPCalculator } from "@/components/feature/SipCalculator/SipCalculator";
import { SipCalculatorSkeleton } from "@/components/feature/SipCalculator/SipCalculatorSkeleton";
import { SipProvider } from "@/contexts/SIPContext";
import { Suspense } from "react";
import { HiHome } from "react-icons/hi";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import {
  FaChartLine,
  FaLightbulb,
  FaRegCheckCircle,
  FaRegQuestionCircle,
} from "react-icons/fa";
import { Metadata } from "next";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title:
    "SIP Calculator | Calculate - SIP Returns, Wealth Gain & Yearly Breakdown",
  description:
    "Calculate your SIP returns, total wealth gain, and view detailed yearly breakdown. Plan mutual fund investments with advanced options like step-up SIP and inflation adjustment.",
  keywords:
    "SIP calculator, mutual fund calculator, systematic investment plan, SIP return calculator, step-up SIP, wealth gain calculator, inflation-adjusted SIP returns, investment calculator",
  openGraph: {
    title:
      "SIP Calculator | Calculate - SIP Returns, Wealth Gain & Yearly Breakdown",
    description:
      "Calculate your SIP returns, total wealth gain, and view detailed yearly breakdown. Plan mutual fund investments with advanced options for better financial planning.",
    url: "https://www.calqulation.com/tool/sip-calculator",
    images: [
      {
        url: "/Financial-planning.svg",
        width: 1200,
        height: 630,
        alt: "SIP Calculator",
      },
    ],
  },
};

const SipCalculator: React.FC = async () => {
  const cookieStore = await cookies();
  const isMobileAppCookie = cookieStore.get("is-mobile-app");
  const isMobileApp = isMobileAppCookie?.value === "true";
  // Schema.org structured data for the SIP calculator
  const calculatorSchemaJson = {
    "@context": "https://schema.org",
    "@type": "FinancialProduct",
    name: "SIP Calculator",
    description:
      "Calculate your SIP returns, total wealth gain, and generate a detailed yearly breakdown of your investments.",
    featureList: [
      "Instant SIP return calculation",
      "Yearly breakdown of investments and returns",
      "Step-up SIP options",
      "Inflation-adjusted return calculations",
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

      {!isMobileApp && (
        <ToolPageHero
          title="SIP Calculator"
          subtitle="Get accurate SIP calculations with our advanced financial tool."
        >
          <Breadcrumb
            items={[
              { label: "Home", href: "/", icon: <HiHome /> },
              { label: "Tools", href: "/tools" },
              { label: "SIP Calculator", href: "/tool/sip-calculator" },
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
                  <SipCalculatorSkeleton />
                </div>
              }
            >
              <SipProvider>
                <SIPCalculator />
              </SipProvider>
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
                What is a SIP Calculator?
              </h2>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800/50 dark:to-blue-900/30 p-6 rounded-xl shadow-sm">
              <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
                A SIP (Systematic Investment Plan) calculator is an essential
                financial tool that helps you estimate the returns on your
                regular mutual fund investments. By investing a fixed amount at
                regular intervals, SIPs offer a disciplined approach to wealth
                creation. Our advanced SIP calculator allows you to visualize
                how your small, regular investments can grow over time,
                accounting for factors like compounding, step-up investments,
                and even the impact of inflation on your long-term returns.
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
                How Our SIP Calculator Works
              </h2>
            </div>

            <p className="text-gray-700 dark:text-gray-200 leading-relaxed mb-10">
              Our comprehensive SIP calculator goes beyond basic calculations to
              offer an in-depth analysis of your investment journey. Here&apos;s
              how it works:
            </p>

            {/* Basic SIP calculation card */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden mb-10 transform transition-all hover:shadow-xl">
              <div className="bg-gradient-to-r from-blue-600 to-blue-400 h-2"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                  Core Investment Calculations
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Enter your monthly SIP amount, investment duration, and
                  expected rate of return to instantly calculate:
                </p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <li className="flex items-start">
                    <FaRegCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">
                      Total amount invested over the duration
                    </span>
                  </li>
                  <li className="flex items-start">
                    <FaRegCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">
                      Estimated returns on your investment
                    </span>
                  </li>
                  <li className="flex items-start">
                    <FaRegCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">
                      Final maturity value (wealth gained)
                    </span>
                  </li>
                  <li className="flex items-start">
                    <FaRegCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">
                      Year-by-year breakdown of your investments
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Advanced features section */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden mb-10">
              <div className="bg-gradient-to-r from-purple-600 to-pink-400 h-2"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                  Advanced Investment Features
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Our calculator includes specialized features to simulate
                  real-world investment scenarios:
                </p>
                <ul className="space-y-4 mb-4">
                  <li className="flex items-start">
                    <FaRegCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <div>
                      <span className="font-medium text-gray-800 dark:text-gray-200">
                        Step-Up SIP
                      </span>
                      <p className="text-gray-700 dark:text-gray-300">
                        Increase your investment amount annually by a fixed
                        percentage to match your growing income and accelerate
                        wealth creation.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <FaRegCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <div>
                      <span className="font-medium text-gray-800 dark:text-gray-200">
                        Inflation Impact Analysis
                      </span>
                      <p className="text-gray-700 dark:text-gray-300">
                        See how inflation affects your investment&apos;s real
                        value over time with our inflation-adjusted
                        calculations.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <FaRegCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <div>
                      <span className="font-medium text-gray-800 dark:text-gray-200">
                        Investment Frequency Options
                      </span>
                      <p className="text-gray-700 dark:text-gray-300">
                        Calculate returns based on different investment
                        frequencies - monthly, quarterly, or annually.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* Visual Insights section */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-amber-500 to-orange-400 h-2"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                  Visual Insights
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Our intuitive visualization tools help you understand your
                  SIP&apos;s growth pattern:
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <FaRegCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <div>
                      <span className="font-medium text-gray-800 dark:text-gray-200">
                        Investment Breakdown Charts
                      </span>
                      <p className="text-gray-700 dark:text-gray-300">
                        See the proportion of your own contribution versus the
                        returns earned through interactive donut charts.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <FaRegCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <div>
                      <span className="font-medium text-gray-800 dark:text-gray-200">
                        Yearly Growth Visualization
                      </span>
                      <p className="text-gray-700 dark:text-gray-300">
                        Track your investment&apos;s progression year by year
                        with detailed bar charts showing both standard and
                        inflation-adjusted returns.
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
              <div className="bg-gradient-to-r from-emerald-500 to-green-600 h-12 w-12 rounded-lg flex items-center justify-center shadow-lg mr-4">
                <FaLightbulb className="text-white text-2xl" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Why Use Our SIP Calculator?
              </h2>
            </div>

            {/* Benefits grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center">
                  <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-3">
                    <span className="text-blue-600 dark:text-blue-400 font-bold">
                      1
                    </span>
                  </div>
                  Accurate Projections
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Our calculator uses compound interest formulas that account
                  for periodic investments, giving you precise projections of
                  your future wealth based on your SIP contributions.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center">
                  <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mr-3">
                    <span className="text-green-600 dark:text-green-400 font-bold">
                      2
                    </span>
                  </div>
                  Real-world Scenarios
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Account for inflation, increasing your investment amount
                  annually, and different investment frequencies to simulate
                  real-world scenarios that match your financial planning needs.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center">
                  <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center mr-3">
                    <span className="text-purple-600 dark:text-purple-400 font-bold">
                      3
                    </span>
                  </div>
                  Interactive Visualizations
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Our visual charts and graphs help you understand complex
                  financial data at a glance, making it easier to comprehend the
                  power of compounding and long-term investing.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center">
                  <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900 flex items-center justify-center mr-3">
                    <span className="text-amber-600 dark:text-amber-400 font-bold">
                      4
                    </span>
                  </div>
                  Informed Decision Making
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Compare different investment scenarios by adjusting variables
                  like duration, amount, and expected returns to find the
                  optimal investment strategy that aligns with your financial
                  goals.
                </p>
              </div>
            </div>
          </section>

          {/* Formula section with styled design */}
          <section className="mb-16">
            <div className="flex items-center mb-10">
              <div className="bg-gradient-to-r from-indigo-500 to-blue-600 h-12 w-12 rounded-lg flex items-center justify-center shadow-lg mr-4">
                <span className="text-white font-bold text-lg">ƒx</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Understanding SIP Calculation Formula
              </h2>
            </div>

            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-indigo-100 dark:border-gray-700">
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                The calculation behind our tool uses the standard SIP formula:
              </p>

              <div className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/30 dark:to-blue-900/30 p-6 rounded-xl mb-6 flex justify-center">
                <p className="text-lg md:text-xl font-mono text-gray-800 dark:text-gray-100">
                  M = P × (((1 + r)<sup>n</sup> - 1) / r) × (1 + r)
                </p>
              </div>

              <p className="text-gray-700 dark:text-gray-300 mb-4 font-medium">
                Where:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                  <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
                    M
                  </span>
                  <p className="text-gray-700 dark:text-gray-300">
                    Final maturity value or the amount you receive at the end
                  </p>
                </div>

                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                  <span className="text-xl font-bold text-green-600 dark:text-green-400">
                    P
                  </span>
                  <p className="text-gray-700 dark:text-gray-300">
                    Amount you invest at regular intervals (monthly, quarterly,
                    etc.)
                  </p>
                </div>

                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                  <span className="text-xl font-bold text-purple-600 dark:text-purple-400">
                    r
                  </span>
                  <p className="text-gray-700 dark:text-gray-300">
                    Rate of return (annual) / Number of installments in a year
                  </p>
                </div>

                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                  <span className="text-xl font-bold text-amber-600 dark:text-amber-400">
                    n
                  </span>
                  <p className="text-gray-700 dark:text-gray-300">
                    Total number of installments (e.g., 60 for 5 years of
                    monthly SIPs)
                  </p>
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
                Tips for Maximizing Your SIP Investments
              </h2>
            </div>

            <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-gray-800 dark:to-gray-900 p-8 rounded-xl">
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                While our calculator provides the numbers, here are some
                practical tips to maximize the benefits of your SIP investments:
              </p>

              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-amber-100 dark:bg-amber-900/40 p-2 rounded-full mr-4 mt-1">
                    <span className="text-amber-600 dark:text-amber-400 font-bold">
                      1
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-2">
                      Start Early, Stay Consistent
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      The power of compounding works best over longer periods.
                      Starting early, even with smaller amounts, can lead to
                      significantly larger returns compared to starting later
                      with larger investments.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-amber-100 dark:bg-amber-900/40 p-2 rounded-full mr-4 mt-1">
                    <span className="text-amber-600 dark:text-amber-400 font-bold">
                      2
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-2">
                      Use Step-Up SIPs
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      As your income increases over time, consider increasing
                      your SIP amount annually. Even a small 5-10% annual
                      step-up can significantly boost your final returns without
                      straining your finances.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-amber-100 dark:bg-amber-900/40 p-2 rounded-full mr-4 mt-1">
                    <span className="text-amber-600 dark:text-amber-400 font-bold">
                      3
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-2">
                      Consider Inflation
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      Always factor in inflation when planning long-term
                      investments. Use our inflation-adjusted return view to
                      understand the real value of your future wealth and plan
                      accordingly.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-amber-100 dark:bg-amber-900/40 p-2 rounded-full mr-4 mt-1">
                    <span className="text-amber-600 dark:text-amber-400 font-bold">
                      4
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-2">
                      Stay Invested Through Market Cycles
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      SIPs work best when you remain invested through market ups
                      and downs. This approach helps in averaging your purchase
                      cost and potentially enhancing returns over the long term.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ section with accordion style */}
          <section className="mb-16">
            <div className="flex items-center mb-10">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 h-12 w-12 rounded-lg flex items-center justify-center shadow-lg mr-4">
                <FaRegQuestionCircle className="text-white text-2xl" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">
                    What is the difference between SIP and lump sum investment?
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    A SIP involves investing fixed amounts at regular intervals
                    over time, while a lump sum investment means investing the
                    entire amount at once. SIPs offer benefits like rupee cost
                    averaging (buying more units when prices are low), reduced
                    impact of market volatility, and financial discipline
                    through regular investing.
                  </p>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">
                    What is a step-up or top-up SIP?
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    A step-up or top-up SIP allows you to increase your
                    investment amount periodically, usually annually. This
                    feature helps you align your investments with your
                    increasing income, potentially accelerating your wealth
                    creation. Our calculator lets you specify an annual
                    percentage increase to see its impact on your final returns.
                  </p>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">
                    How does inflation affect my SIP returns?
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Inflation reduces the purchasing power of money over time.
                    While your SIP may show significant nominal returns, the
                    real returns (adjusted for inflation) will be lower. Our
                    calculator&apos;s inflation-adjusted view helps you
                    understand this impact, showing you the real value of your
                    investments in today&apos;s money terms.
                  </p>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">
                    What is a realistic expected return rate for SIPs?
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Expected returns depend on the investment type and market
                    conditions. Historically, equity mutual funds in India have
                    delivered around 12-15% annual returns over long periods
                    (10+ years), while debt funds typically return 6-8%. For
                    balanced funds, 9-10% might be reasonable. Consider your
                    investment timeline and risk tolerance when setting
                    expectations and always factor in inflation.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Disclaimer */}
          <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-400 italic">
              Note: This SIP calculator provides estimates based on the
              information you provide. Actual investment returns may vary based
              on market conditions, fund performance, expense ratios, and other
              factors. Past performance is not indicative of future results.
              Always consult with a financial advisor before making investment
              decisions.
            </p>
          </div>

          <div className="mt-16">
            <Comments postId="tool_sip-calculator" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SipCalculator;
