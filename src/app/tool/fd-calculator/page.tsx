import { FDProvider } from "@/contexts/FDContext";
import { FDCalculator } from "@/components/feature/FDCalculator/FDCalculator";
import { Metadata } from "next";
import { ToolPageHero } from "@/components/common/PageHero";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { HiHome } from "react-icons/hi";
import { Suspense } from "react";
import { FDCalculatorSkeleton } from "@/components/feature/FDCalculator/FDCalculatorSkeleton";
import { cookies } from "next/headers";
import { Comments } from "@/components/feature/Comments";
import { TbMoneybag } from "react-icons/tb";
import {
  FaChartLine,
  FaLightbulb,
  FaRegQuestionCircle,
  FaShieldAlt,
} from "react-icons/fa";

export const metadata: Metadata = {
  title:
    "Fixed Deposit Calculator - Calculate FD Returns & Maturity Amount",
  description:
    "Calculate your Fixed Deposit returns with our advanced FD calculator. See how your money grows with different FD tenures, interest rates, and compounding frequencies.",
  keywords: [
    "fixed deposit calculator",
    "fd calculator",
    "fd interest calculator",
    "bank fd calculator",
    "fixed deposit maturity calculator",
    "fd returns calculator",
    "financial calculator",
    "investment planning tool",
  ],
  openGraph: {
    title: "Fixed Deposit Calculator - Calculate FD Returns",
    description:
      "Calculate how your Fixed Deposits grow with compound interest. Plan your financial future with different FD tenures and interest rates.",
    type: "website",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Fixed Deposit Calculator",
  description:
    "Calculate Fixed Deposit returns. See how money grows with different FD tenures, interest rates, and compounding frequencies.",
  url: "https://www.calqulation.com/tool/fd-calculator",
  mainEntity: {
    "@type": "FinancialProduct",
    name: "Fixed Deposit Calculator",
    description:
      "A tool to calculate Fixed Deposit returns with different tenures and interest rates.",
    productID: "fd-calculator-001",
  },
};

export default async function FDCalculatorPage() {
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
          title="Fixed Deposit Calculator"
          subtitle="Calculate how your Fixed Deposits grow with guaranteed returns."
        >
          <Breadcrumb
            items={[
              { label: "Home", href: "/", icon: <HiHome /> },
              { label: "Tools", href: "/tools" },
              {
                label: "FD Calculator",
                href: "/tool/fd-calculator",
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
                  <FDCalculatorSkeleton />
                </div>
              }
            >
              <FDProvider>
                <FDCalculator />
              </FDProvider>
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
                  Why Use Our Fixed Deposit Calculator?
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                  Our advanced FD calculator helps you understand the growth of your Fixed Deposits
                  and plan your investment strategy with guaranteed returns.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="text-center p-6">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaShieldAlt
                      className="text-green-600 dark:text-green-400"
                      size={24}
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Guaranteed Returns
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Fixed Deposits offer guaranteed returns with capital protection,
                    making them ideal for conservative investors.
                  </p>
                </div>

                <div className="text-center p-6">
                  <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaChartLine
                      className="text-blue-600 dark:text-blue-400"
                      size={24}
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Multiple Tenures
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Choose from various FD tenures ranging from 7 days to 10 years
                    based on your financial goals.
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
                    Interactive charts and graphs show your FD growth
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
                    Year-wise breakdown showing opening balance, interest earned,
                    and maturity amount.
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
                  How Fixed Deposits Work
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                  Fixed Deposits are time deposits where you invest a lump sum for a fixed period
                  at a predetermined interest rate, providing guaranteed returns.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg">
                  <div className="text-2xl font-bold text-green-600 mb-4">
                    1
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    Make Deposit
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Deposit your money in a Fixed Deposit account for a specific tenure
                    at a predetermined interest rate.
                  </p>
                </div>

                <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg">
                  <div className="text-2xl font-bold text-green-600 mb-4">
                    2
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    Earn Interest
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Your money earns compound interest at the agreed rate,
                    typically compounded quarterly or annually.
                  </p>
                </div>

                <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg">
                  <div className="text-2xl font-bold text-green-600 mb-4">
                    3
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    Receive Maturity Amount
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    At maturity, you receive your principal plus all the accumulated
                    interest as guaranteed returns.
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
                      What are the benefits of Fixed Deposits?
                    </h3>
                    <div className="text-gray-700 dark:text-gray-300">
                      <p>
                        Fixed Deposits offer guaranteed returns, capital protection, and are
                        insured up to ₹5 lakhs by DICGC. They are ideal for conservative
                        investors seeking stable returns without market risks.
                      </p>
                    </div>
                  </div>
                </div>

                {/* FAQ Item 2 */}
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden shadow-md">
                  <div className="border-l-4 border-blue-500 p-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                      How is FD interest calculated?
                    </h3>
                    <div className="text-gray-700 dark:text-gray-300">
                      <p>
                        FD interest is calculated using compound interest formula. Most banks
                        compound interest quarterly or annually. The longer the tenure and
                        higher the rate, the more interest you earn.
                      </p>
                    </div>
                  </div>
                </div>

                {/* FAQ Item 3 */}
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden shadow-md">
                  <div className="border-l-4 border-purple-500 p-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                      Can I withdraw FD before maturity?
                    </h3>
                    <div className="text-gray-700 dark:text-gray-300">
                      <p>
                        Yes, but premature withdrawal usually attracts penalty charges
                        (typically 0.5-1% reduction in interest rate). Some banks allow
                        partial withdrawal facility for higher denomination FDs.
                      </p>
                    </div>
                  </div>
                </div>

                {/* FAQ Item 4 */}
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden shadow-md">
                  <div className="border-l-4 border-amber-500 p-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                      Are FD returns taxable?
                    </h3>
                    <div className="text-gray-700 dark:text-gray-300">
                      <p>
                        Yes, FD interest is taxable as per your income tax slab. TDS is
                        deducted if interest exceeds ₹40,000 per year (₹50,000 for senior
                        citizens). Tax-saving FDs under Section 80C have a 5-year lock-in period.
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
                <strong>Disclaimer:</strong> This Fixed Deposit calculator
                is for educational and planning purposes only. Actual FD
                returns may vary based on bank policies, interest rate changes,
                and other factors. Please consult with your bank or financial advisor
                before making investment decisions.
              </p>
            </div>
          </section>

          {/* Comments Section */}
          <Comments postId="fd-calculator" />
        </div>
      </div>
    </div>
  );
}
