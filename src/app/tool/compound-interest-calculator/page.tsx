import { CompoundInterestProvider } from "@/contexts/CompoundInterestContext";
import { CompoundInterestCalculator } from "@/components/feature/CompoundInterestCalculator/CompoundInterestCalculator";
import { Metadata } from "next";
import { ToolPageHero } from "@/components/common/PageHero";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { HiHome } from "react-icons/hi";
import { Suspense } from "react";
import { CompoundInterestCalculatorSkeleton } from "@/components/feature/CompoundInterestCalculator/CompoundInterestCalculatorSkeleton";
import { cookies } from "next/headers";
import { Comments } from "@/components/feature/Comments";
import { TbMoneybag } from "react-icons/tb";
import {
  FaChartLine,
  FaLightbulb,
  FaRegCheckCircle,
  FaRegQuestionCircle,
} from "react-icons/fa";

export const metadata: Metadata = {
  title:
    "Compound Interest Calculator - Calculate Investment Growth with Compounding",
  description:
    "Calculate compound interest on your investments with our advanced calculator. See how your money grows with different compounding frequencies and additional contributions.",
  keywords: [
    "compound interest calculator",
    "investment calculator",
    "compound growth",
    "interest compounding",
    "investment growth",
    "financial calculator",
    "money growth calculator",
    "investment planning tool",
  ],
  openGraph: {
    title: "Compound Interest Calculator - Calculate Investment Growth",
    description:
      "Calculate how your investments grow with compound interest. Plan your financial future with different compounding frequencies.",
    type: "website",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Compound Interest Calculator",
  description:
    "Calculate compound interest on investments. See how money grows with different compounding frequencies and additional contributions.",
  url: "https://www.calqulation.com/tool/compound-interest-calculator",
  mainEntity: {
    "@type": "FinancialProduct",
    name: "Compound Interest Calculator",
    description:
      "A tool to calculate compound interest on investments with different compounding frequencies.",
    productID: "compound-interest-calculator-001",
  },
};

export default async function CompoundInterestCalculatorPage() {
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
          title="Compound Interest Calculator"
          subtitle="Calculate how your investments grow with compound interest."
        >
          <Breadcrumb
            items={[
              { label: "Home", href: "/", icon: <HiHome /> },
              { label: "Tools", href: "/tools" },
              {
                label: "Compound Interest Calculator",
                href: "/tool/compound-interest-calculator",
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
                  <CompoundInterestCalculatorSkeleton />
                </div>
              }
            >
              <CompoundInterestProvider>
                <CompoundInterestCalculator />
              </CompoundInterestProvider>
            </Suspense>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Key Features Section */}
          <section className="py-12 bg-white dark:bg-gray-900">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Why Use Our Compound Interest Calculator?
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                  Our advanced calculator helps you understand the true power of
                  compound interest and plan your investment strategy
                  effectively.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="text-center p-6">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaChartLine
                      className="text-green-600 dark:text-green-400"
                      size={24}
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Multiple Frequencies
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Choose from daily, monthly, quarterly, semi-annual, or
                    annual compounding frequencies.
                  </p>
                </div>

                <div className="text-center p-6">
                  <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaRegCheckCircle
                      className="text-blue-600 dark:text-blue-400"
                      size={24}
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Additional Contributions
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    See how regular additional contributions can significantly
                    boost your investment growth.
                  </p>
                </div>

                <div className="text-center p-6">
                  <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaLightbulb
                      className="text-purple-600 dark:text-purple-400"
                      size={24}
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Visual Growth Analysis
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Interactive charts and graphs show your investment growth
                    over time with detailed breakdowns.
                  </p>
                </div>

                <div className="text-center p-6">
                  <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <TbMoneybag
                      className="text-amber-600 dark:text-amber-400"
                      size={24}
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Detailed Reports
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Year-wise breakdown showing opening balance, contributions,
                    interest earned, and closing balance.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* How It Works Section */}
          <section className="py-12 bg-gray-50 dark:bg-gray-800">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  How Compound Interest Works
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                  Compound interest is the interest earned on both the initial
                  principal and the accumulated interest from previous periods.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg">
                  <div className="text-2xl font-bold text-green-600 mb-4">
                    1
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    Initial Investment
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Start with your principal amount. This is the foundation of
                    your investment that will grow over time.
                  </p>
                </div>

                <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg">
                  <div className="text-2xl font-bold text-green-600 mb-4">
                    2
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    Interest Compounding
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Interest is calculated on your principal plus any previously
                    earned interest, creating exponential growth.
                  </p>
                </div>

                <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg">
                  <div className="text-2xl font-bold text-green-600 mb-4">
                    3
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    Accelerated Growth
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    With time and regular contributions, your investment grows
                    exponentially, demonstrating the power of compounding.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="py-12 bg-white dark:bg-gray-900">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Frequently Asked Questions
                </h2>
              </div>

              <div className="max-w-4xl mx-auto space-y-6">
                {/* FAQ Item 1 */}
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden shadow-md">
                  <div className="border-l-4 border-green-500 p-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                      <FaRegQuestionCircle className="inline mr-2 text-green-500" />
                      What&apos;s the difference between simple and compound
                      interest?
                    </h3>
                    <div className="text-gray-700 dark:text-gray-300">
                      <p>
                        Simple interest is calculated only on the principal
                        amount, while compound interest is calculated on both
                        the principal and accumulated interest. Compound
                        interest results in exponential growth over time, making
                        it much more powerful for long-term investments.
                      </p>
                    </div>
                  </div>
                </div>

                {/* FAQ Item 2 */}
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden shadow-md">
                  <div className="border-l-4 border-blue-500 p-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                      How does compounding frequency affect returns?
                    </h3>
                    <div className="text-gray-700 dark:text-gray-300">
                      <p>
                        More frequent compounding generally leads to higher
                        returns. Daily compounding will yield slightly more than
                        monthly, which yields more than annually. However, the
                        difference becomes less significant with very high
                        frequencies.
                      </p>
                    </div>
                  </div>
                </div>

                {/* FAQ Item 3 */}
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden shadow-md">
                  <div className="border-l-4 border-purple-500 p-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                      What are additional contributions?
                    </h3>
                    <div className="text-gray-700 dark:text-gray-300">
                      <p>
                        Additional contributions are regular deposits you make
                        to your investment account. These contributions also
                        earn compound interest, significantly accelerating your
                        wealth building process over time.
                      </p>
                    </div>
                  </div>
                </div>

                {/* FAQ Item 4 */}
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden shadow-md">
                  <div className="border-l-4 border-amber-500 p-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                      How accurate are these calculations?
                    </h3>
                    <div className="text-gray-700 dark:text-gray-300">
                      <p>
                        Our calculator provides accurate mathematical
                        projections based on the inputs provided. However,
                        actual investment returns may vary due to market
                        fluctuations, fees, taxes, and other factors not
                        accounted for in this calculator.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* Disclaimer */}
          <section className="py-8 bg-gray-100 dark:bg-gray-800">
            <div className="container mx-auto px-4 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400 max-w-4xl mx-auto">
                <strong>Disclaimer:</strong> This compound interest calculator
                is for educational and planning purposes only. Actual investment
                returns may vary due to market conditions, fees, taxes, and
                other factors. Past performance does not guarantee future
                results. Please consult with a qualified financial advisor
                before making investment decisions.
              </p>
            </div>
          </section>

          {/* Comments Section */}
          <Comments postId="compound-interest-calculator" />
        </div>
      </div>
    </div>
  );
}
