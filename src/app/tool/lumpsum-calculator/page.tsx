import { LumpsumProvider } from "@/contexts/LumpsumContext";
import { LumpsumCalculator } from "@/components/feature/LumpsumCalculator/LumpsumCalculator";
import { Metadata } from "next";
import { ToolPageHero } from "@/components/common/PageHero";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { HiHome } from "react-icons/hi";
import { Suspense } from "react";
import { LumpsumCalculatorSkeleton } from "@/components/feature/LumpsumCalculator/LumpsumCalculatorSkeleton";
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
    "Lumpsum Investment Calculator - Calculate Returns on One-Time Investment",
  description:
    "Calculate the future value of your lumpsum investment with compound interest. Plan your one-time investments with accurate projections and yearly breakdowns.",
  keywords: [
    "lumpsum calculator",
    "investment calculator",
    "compound interest calculator",
    "one-time investment",
    "future value calculator",
    "investment planning",
    "wealth calculator",
    "financial planning",
  ],
  openGraph: {
    title: "Lumpsum Investment Calculator - Plan Your One-Time Investments",
    description:
      "Calculate compound returns on your lumpsum investments. Get detailed yearly breakdowns and investment growth projections.",
    type: "website",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Lumpsum Investment Calculator",
  description:
    "Calculate the future value of your lumpsum investment with compound interest. Plan your one-time investments with accurate projections and yearly breakdowns.",
  url: "https://www.calqulation.com/tool/lumpsum-calculator",
  mainEntity: {
    "@type": "FinancialProduct",
    name: "Lumpsum Investment Calculator",
    description:
      "A tool to calculate the future value of a lumpsum investment based on compound interest.",
    productID: "lumpsum-calculator-001",
  },
};

export default async function LumpsumCalculatorPage() {
  const cookieStore = await cookies();
  const isMobileAppCookie = cookieStore.get("is-mobile-app");
  const isMobileApp = isMobileAppCookie?.value === "true";

  return (
    <div className="bg-gray-200 dark:bg-gray-950 min-h-screen">
      {/* Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      {!isMobileApp && (
        <ToolPageHero
          title="Lumpsum Investment Calculator"
          subtitle="Calculate the future value of your lumpsum investment with compound interest. Plan your one-time investments with accurate projections and yearly breakdowns."
        >
          <Breadcrumb
            items={[
              { label: "Home", href: "/", icon: <HiHome /> },
              { label: "Tools", href: "/tools" },
              { label: "Lumpsum Calculator", href: "/tool/lumpsum-calculator" },
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
                  <LumpsumCalculatorSkeleton />
                </div>
              }
            >
              <LumpsumProvider>
                <LumpsumCalculator />
              </LumpsumProvider>
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
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 h-12 w-12 rounded-lg flex items-center justify-center shadow-lg mr-4 p-3">
                <RiMoneyDollarCircleFill className="text-white text-2xl" />
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                What is a Lumpsum Investment Calculator?
              </h2>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-gray-800/50 dark:to-green-900/30 p-6 rounded-xl shadow-sm">
              <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
                A Lumpsum Investment calculator is a powerful financial tool that helps you calculate the future value 
                of a one-time investment made today. Unlike SIPs where you invest regularly, lumpsum investing involves 
                putting a significant amount of money to work all at once. Our advanced calculator shows you how your 
                single investment can grow over time through the power of compound interest, helping you make informed 
                decisions about when and how much to invest as a lumpsum.
              </p>
            </div>
          </section>

          {/* How it works section with cards */}
          <section className="mb-16">
            <div className="flex items-center mb-10">
              <div className="bg-gradient-to-r from-emerald-500 to-green-600 h-12 w-12 rounded-lg flex items-center justify-center shadow-lg mr-4 p-3">
                <FaChartLine className="text-white text-2xl" />
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                How Our Lumpsum Calculator Works
              </h2>
            </div>

            <p className="text-gray-700 dark:text-gray-200 leading-relaxed mb-10">
              Our comprehensive lumpsum calculator provides detailed analysis of your one-time investment growth. 
              Here&apos;s how it helps you plan your financial future:
            </p>

            {/* Basic Lumpsum calculation card */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden mb-10 transform transition-all hover:shadow-xl">
              <div className="bg-gradient-to-r from-green-600 to-green-400 h-2"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                  Core Investment Calculations
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Enter your lumpsum amount, investment duration, and expected rate of return to instantly calculate:
                </p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <li className="flex items-start">
                    <FaRegCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">
                      Total maturity amount at the end of investment period
                    </span>
                  </li>
                  <li className="flex items-start">
                    <FaRegCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">
                      Total interest earned on your investment
                    </span>
                  </li>
                  <li className="flex items-start">
                    <FaRegCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">
                      Investment growth multiplier over time
                    </span>
                  </li>
                  <li className="flex items-start">
                    <FaRegCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">
                      Year-by-year breakdown of compound growth
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Advanced features section */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden mb-10">
              <div className="bg-gradient-to-r from-emerald-600 to-teal-400 h-2"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                  Advanced Investment Analysis
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Our calculator includes sophisticated features to help you understand your investment potential:
                </p>
                <ul className="space-y-4 mb-4">
                  <li className="flex items-start">
                    <FaRegCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <div>
                      <span className="font-medium text-gray-800 dark:text-gray-200">
                        Compound Interest Calculation
                      </span>
                      <p className="text-gray-700 dark:text-gray-300">
                        See how your money grows exponentially through compound interest, where you earn returns 
                        not just on your initial investment but also on previously earned returns.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <FaRegCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <div>
                      <span className="font-medium text-gray-800 dark:text-gray-200">
                        Multiple Time Horizons
                      </span>
                      <p className="text-gray-700 dark:text-gray-300">
                        Analyze your investment across different time periods to understand the impact 
                        of investment duration on your overall returns.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <FaRegCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <div>
                      <span className="font-medium text-gray-800 dark:text-gray-200">
                        Flexible Rate Scenarios
                      </span>
                      <p className="text-gray-700 dark:text-gray-300">
                        Test different return rate scenarios to understand how market performance 
                        could affect your investment outcomes.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* Visual Insights section */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-teal-500 to-cyan-400 h-2"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                  Visual Growth Analysis
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Our intuitive visualization tools help you understand your lumpsum investment&apos;s growth:
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <FaRegCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <div>
                      <span className="font-medium text-gray-800 dark:text-gray-200">
                        Investment Breakdown Charts
                      </span>
                      <p className="text-gray-700 dark:text-gray-300">
                        Visualize the proportion of your original investment versus the compound returns 
                        earned through interactive pie charts.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <FaRegCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <div>
                      <span className="font-medium text-gray-800 dark:text-gray-200">
                        Growth Trajectory Visualization
                      </span>
                      <p className="text-gray-700 dark:text-gray-300">
                        Track your investment&apos;s exponential growth year by year with detailed 
                        line and bar charts showing compound growth patterns.
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
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 h-12 w-12 rounded-lg flex items-center justify-center shadow-lg mr-4 p-3">
                <FaLightbulb className="text-white text-2xl" />
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                Why Use Our Lumpsum Calculator?
              </h2>
            </div>

            {/* Benefits grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center">
                  <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mr-3">
                    <span className="text-green-600 dark:text-green-400 font-bold">1</span>
                  </div>
                  Precise Calculations
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Our calculator uses exact compound interest formulas to provide accurate projections 
                  of how your lumpsum investment will grow over time, accounting for the full power of compounding.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center mr-3">
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">2</span>
                  </div>
                  Investment Timing Insights
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Compare different investment amounts and time horizons to understand when 
                  lumpsum investing might be more beneficial than systematic investment plans.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center">
                  <div className="w-8 h-8 rounded-full bg-teal-100 dark:bg-teal-900 flex items-center justify-center mr-3">
                    <span className="text-teal-600 dark:text-teal-400 font-bold">3</span>
                  </div>
                  Clear Visual Understanding
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Our interactive charts and graphs make it easy to understand how compound interest 
                  accelerates your wealth creation over different time periods.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-3 flex items-center">
                  <div className="w-8 h-8 rounded-full bg-cyan-100 dark:bg-cyan-900 flex items-center justify-center mr-3">
                    <span className="text-cyan-600 dark:text-cyan-400 font-bold">4</span>
                  </div>
                  Strategic Planning Tool
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Use different scenarios to plan major investments like using bonus money, 
                  maturity proceeds, or inheritance for optimal wealth creation.
                </p>
              </div>
            </div>
          </section>

          {/* Formula section with styled design */}
          <section className="mb-16">
            <div className="flex items-center mb-10">
              <div className="bg-gradient-to-r from-emerald-500 to-green-600 h-12 w-12 rounded-lg flex items-center justify-center shadow-lg mr-4 p-3">
                <span className="text-white font-bold text-lg">ƒx</span>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                Understanding Lumpsum Calculation Formula
              </h2>
            </div>

            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-green-100 dark:border-gray-700">
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                The calculation behind our lumpsum calculator uses the compound interest formula:
              </p>

              <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 p-6 rounded-xl mb-6 flex justify-center">
                <p className="text-lg md:text-xl font-mono text-gray-800 dark:text-gray-100">
                  A = P × (1 + r)<sup>t</sup>
                </p>
              </div>

              <p className="text-gray-700 dark:text-gray-300 mb-4 font-medium">Where:</p>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                  <span className="text-xl font-bold text-green-600 dark:text-green-400">A</span>
                  <p className="text-gray-700 dark:text-gray-300">
                    Final amount or maturity value of your investment
                  </p>
                </div>

                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                  <span className="text-xl font-bold text-emerald-600 dark:text-emerald-400">P</span>
                  <p className="text-gray-700 dark:text-gray-300">
                    Principal amount - your initial lumpsum investment
                  </p>
                </div>

                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                  <span className="text-xl font-bold text-teal-600 dark:text-teal-400">r</span>
                  <p className="text-gray-700 dark:text-gray-300">
                    Annual rate of return (expressed as a decimal)
                  </p>
                </div>

                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                  <span className="text-xl font-bold text-cyan-600 dark:text-cyan-400">t</span>
                  <p className="text-gray-700 dark:text-gray-300">
                    Time period of investment in years
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Tips section */}
          <section className="mb-16">
            <div className="flex items-center mb-10">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-12 w-12 rounded-lg flex items-center justify-center shadow-lg mr-4 p-3">
                <FaLightbulb className="text-white text-2xl" />
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                Tips for Successful Lumpsum Investing
              </h2>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-900 p-8 rounded-xl">
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                While our calculator provides the projections, here are practical tips to maximize 
                your lumpsum investment success:
              </p>

              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-green-100 dark:bg-green-900/40 p-2 rounded-full mr-4 mt-1">
                    <span className="text-green-600 dark:text-green-400 font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-2">
                      Market Timing Considerations
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      While timing the market perfectly is impossible, lumpsum investments can be 
                      particularly effective during market downturns when asset prices are lower. 
                      Consider dollar-cost averaging if you&apos;re unsure about market timing.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-green-100 dark:bg-green-900/40 p-2 rounded-full mr-4 mt-1">
                    <span className="text-green-600 dark:text-green-400 font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-2">
                      Long-term Investment Horizon
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      Lumpsum investments work best with longer time horizons (5+ years). The longer 
                      you stay invested, the more time compound interest has to work its magic and 
                      smooth out market volatility.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-green-100 dark:bg-green-900/40 p-2 rounded-full mr-4 mt-1">
                    <span className="text-green-600 dark:text-green-400 font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-2">
                      Diversification Strategy
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      Don&apos;t put all your lumpsum into a single investment. Consider diversifying 
                      across different asset classes, sectors, or even geographic regions to reduce 
                      risk while maintaining growth potential.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-green-100 dark:bg-green-900/40 p-2 rounded-full mr-4 mt-1">
                    <span className="text-green-600 dark:text-green-400 font-bold">4</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-2">
                      Emergency Fund First
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      Before making any lumpsum investment, ensure you have an adequate emergency fund. 
                      Lumpsum investments should be made with money you won&apos;t need for several years, 
                      allowing the investment to grow without forced early withdrawals.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ section */}
          <section className="mb-16">
            <div className="flex items-center mb-10">
              <div className="bg-gradient-to-r from-emerald-500 to-green-600 h-12 w-12 rounded-lg flex items-center justify-center shadow-lg mr-4 p-3">
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
                    When should I choose lumpsum investment over SIP?
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Lumpsum investment is ideal when you have a significant amount available (like bonus, 
                    inheritance, or maturity proceeds) and when markets are at relatively lower levels. 
                    If you have regular income to invest, SIPs might be better for rupee cost averaging. 
                    Many investors use a combination of both strategies.
                  </p>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">
                    How does compound interest work in lumpsum investments?
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    In lumpsum investments, your entire principal amount starts earning returns immediately. 
                    These returns are then reinvested to earn additional returns, creating a compounding effect. 
                    The longer your investment horizon, the more pronounced this compounding becomes, 
                    potentially leading to exponential growth over time.
                  </p>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">
                    What are the risks of lumpsum investing?
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    The main risk is market timing - if you invest when markets are at peaks, short-term 
                    returns might be negative. There&apos;s also no rupee cost averaging benefit like in SIPs. 
                    However, with a long-term horizon and proper asset allocation, lumpsum investments 
                    can potentially deliver superior returns compared to systematic investing.
                  </p>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-3">
                    What return rate should I expect from lumpsum investments?
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Expected returns depend on your investment choice and time horizon. Equity investments 
                    historically have provided 10-15% annual returns over long periods (10+ years) in India, 
                    while debt investments typically yield 6-8%. Fixed deposits offer 5-7% returns with capital 
                    protection. Always consider inflation and your risk tolerance when setting expectations.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Disclaimer */}
          <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-400 italic">
              Note: This lumpsum calculator provides estimates based on the information you provide. 
              Actual investment returns may vary based on market conditions, economic factors, fund performance, 
              and other variables. Past performance is not indicative of future results. Always consult 
              with a qualified financial advisor before making significant investment decisions.
            </p>
          </div>

          <div className="mt-16">
            <Comments postId="tool_lumpsum-calculator" />
          </div>
        </div>
      </div>
    </div>
  );
}
