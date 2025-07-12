import { RDProvider } from "@/contexts/RDContext";
import { RDCalculator } from "@/components/feature/RDCalculator/RDCalculator";
import { Metadata } from "next";
import { ToolPageHero } from "@/components/common/PageHero";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { HiHome } from "react-icons/hi";
import { Suspense } from "react";
import { RDCalculatorSkeleton } from "@/components/feature/RDCalculator/RDCalculatorSkeleton";
import { cookies } from "next/headers";
import { Comments } from "@/components/feature/Comments";
import { TbMoneybag } from "react-icons/tb";
import {
  FaLightbulb,
  FaRegQuestionCircle,
  FaShieldAlt,
  FaClock,
} from "react-icons/fa";

export const metadata: Metadata = {
  title:
    "Recurring Deposit Calculator - Calculate RD Returns & Maturity Amount",
  description:
    "Calculate your Recurring Deposit returns with our advanced RD calculator. See how your monthly deposits grow with guaranteed returns and compound interest.",
  keywords: [
    "recurring deposit calculator",
    "rd calculator",
    "rd interest calculator",
    "bank rd calculator",
    "recurring deposit maturity calculator",
    "rd returns calculator",
    "financial calculator",
    "investment planning tool",
  ],
  openGraph: {
    title: "Recurring Deposit Calculator - Calculate RD Returns",
    description:
      "Calculate how your Recurring Deposits grow with compound interest. Plan your financial future with regular monthly deposits.",
    type: "website",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Recurring Deposit Calculator",
  description:
    "Calculate Recurring Deposit returns. See how regular monthly deposits grow with compound interest and guaranteed returns.",
  url: "https://www.calqulation.com/tool/rd-calculator",
  mainEntity: {
    "@type": "FinancialProduct",
    name: "Recurring Deposit Calculator",
    description:
      "A tool to calculate Recurring Deposit returns with different tenures and interest rates.",
    productID: "rd-calculator-001",
  },
};

export default async function RDCalculatorPage() {
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
          title="Recurring Deposit Calculator"
          subtitle="Calculate how your monthly RD deposits grow with guaranteed returns."
        >
          <Breadcrumb
            items={[
              { label: "Home", href: "/", icon: <HiHome /> },
              { label: "Tools", href: "/tools" },
              {
                label: "RD Calculator",
                href: "/tool/rd-calculator",
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
                  <RDCalculatorSkeleton />
                </div>
              }
            >
              <RDProvider>
                <RDCalculator />
              </RDProvider>
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
                  Why Use Our Recurring Deposit Calculator?
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                  Our advanced RD calculator helps you understand the growth of your monthly deposits
                  and plan your savings strategy with guaranteed returns.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="text-center p-6">
                  <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaShieldAlt
                      className="text-orange-600 dark:text-orange-400"
                      size={24}
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Guaranteed Returns
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Recurring Deposits offer guaranteed returns with capital protection,
                    perfect for disciplined monthly savings.
                  </p>
                </div>

                <div className="text-center p-6">
                  <div className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaClock
                      className="text-red-600 dark:text-red-400"
                      size={24}
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Monthly Discipline
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Build a saving habit with regular monthly deposits.
                    RDs encourage financial discipline and consistent saving.
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
                    Interactive charts and graphs show your RD growth
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
                    Year-wise breakdown showing deposits, interest earned,
                    and maturity amount progression.
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
                  How Recurring Deposits Work
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                  Recurring Deposits allow you to save a fixed amount every month for a predetermined period
                  at a guaranteed interest rate, building wealth through regular savings.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg">
                  <div className="text-2xl font-bold text-orange-600 mb-4">
                    1
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    Monthly Deposits
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Deposit a fixed amount every month in your RD account
                    for the chosen tenure at a predetermined interest rate.
                  </p>
                </div>

                <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg">
                  <div className="text-2xl font-bold text-orange-600 mb-4">
                    2
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    Compound Interest
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Your deposits earn compound interest, typically compounded
                    quarterly, helping your savings grow faster over time.
                  </p>
                </div>

                <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-lg">
                  <div className="text-2xl font-bold text-orange-600 mb-4">
                    3
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    Guaranteed Maturity
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    At maturity, receive your total deposits plus all accumulated
                    interest as guaranteed returns for your disciplined saving.
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
                  <div className="border-l-4 border-orange-500 p-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                      <FaRegQuestionCircle className="inline mr-2 text-orange-500" />
                      What happens if I miss an RD installment?
                    </h3>
                    <div className="text-gray-700 dark:text-gray-300">
                      <p>
                        Missing RD installments usually attracts penalty charges (typically ₹5-25 per default).
                        Most banks allow a grace period of 1-2 months. If defaults exceed the grace period,
                        the RD may be closed and converted to a term deposit.
                      </p>
                    </div>
                  </div>
                </div>

                {/* FAQ Item 2 */}
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden shadow-md">
                  <div className="border-l-4 border-red-500 p-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                      How is RD interest calculated?
                    </h3>
                    <div className="text-gray-700 dark:text-gray-300">
                      <p>
                        RD interest is calculated using compound interest formula on the average
                        balance. Since deposits are made monthly, each installment earns interest
                        for different periods, making the calculation more complex than FD.
                      </p>
                    </div>
                  </div>
                </div>

                {/* FAQ Item 3 */}
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden shadow-md">
                  <div className="border-l-4 border-purple-500 p-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                      Can I withdraw RD before maturity?
                    </h3>
                    <div className="text-gray-700 dark:text-gray-300">
                      <p>
                        Premature withdrawal is allowed after completing 6 months (varies by bank),
                        but it attracts penalty charges (usually 1% reduction in interest rate).
                        Some banks may not allow premature withdrawal at all.
                      </p>
                    </div>
                  </div>
                </div>

                {/* FAQ Item 4 */}
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden shadow-md">
                  <div className="border-l-4 border-amber-500 p-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                      Are RD returns taxable?
                    </h3>
                    <div className="text-gray-700 dark:text-gray-300">
                      <p>
                        Yes, RD interest is taxable as per your income tax slab. TDS is deducted
                        if interest exceeds ₹40,000 per year (₹50,000 for senior citizens).
                        Unlike FDs, there&apos;s no tax-saving variant of RD available.
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
                <strong>Disclaimer:</strong> This Recurring Deposit calculator
                is for educational and planning purposes only. Actual RD
                returns may vary based on bank policies, interest rate changes,
                penalty charges, and other factors. Please consult with your bank
                or financial advisor before making investment decisions.
              </p>
            </div>
          </section>

          {/* Comments Section */}
          <Comments postId="rd-calculator" />
        </div>
      </div>
    </div>
  );
}
