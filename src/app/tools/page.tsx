import { PageHero } from "@/components/common/PageHero";
import { Metadata } from "next";
import Link from "next/link";
import { BiTransfer } from "react-icons/bi";
import { BsBank, BsCalculator, BsGraphUp, BsCreditCard } from "react-icons/bs";
import {
  FaCar,
  FaArrowRight,
  FaChartLine,
  FaLightbulb,
  FaRegClock,
  FaTools,
} from "react-icons/fa";
import { MdCalculate } from "react-icons/md";
import { RiMoneyDollarCircleFill } from "react-icons/ri";

export const metadata: Metadata = {
  title: "Financial Tools | Calqulation - Smart Financial Calculators",
  description:
    "Explore our comprehensive suite of financial calculators and tools. Calculate EMIs, SIPs, and more with our powerful and easy-to-use financial tools.",
  keywords:
    "financial tools, financial calculators, EMI calculator, SIP calculator, lumpsum calculator, loan calculator, investment calculator, financial planning tools",
  openGraph: {
    title: "Financial Tools | Calqulation - Smart Financial Calculators",
    description:
      "Explore our comprehensive suite of financial calculators and tools. Calculate EMIs, SIPs, and more with our powerful and easy-to-use financial tools.",
    url: "https://www.calqulation.com/tool",
    images: [
      {
        url: "/Financial-planning.svg",
        width: 1200,
        height: 630,
        alt: "Calqulation Financial Tools",
      },
    ],
  },
};

export default function ToolsPage() {
  // Schema.org structured data for the tools page
  const toolsPageSchemaJson = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Financial Tools & Calculators",
    description:
      "A comprehensive collection of financial tools and calculators for loans, investments, and financial planning.",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "EMI Calculator",
          url: "https://www.calqulation.com/tool/emi-calculator",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "SIP Calculator",
          url: "https://www.calqulation.com/tool/sip-calculator",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Car Loan Calculator",
          url: "https://www.calqulation.com/tool/car-loan-calculator",
        },
        {
          "@type": "ListItem",
          position: 4,
          name: "Personal Loan Calculator",
          url: "https://www.calqulation.com/tool/personal-loan-calculator",
        },
        {
          "@type": "ListItem",
          position: 5,
          name: "Lumpsum Calculator",
          url: "https://www.calqulation.com/tool/lumpsum-calculator",
        },
      ],
    },
  };

  return (
    <div className="bg-white dark:bg-gray-950 min-h-screen">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(toolsPageSchemaJson),
        }}
      />

      <PageHero
        title="Financial Tools"
        subtitle="Explore our suite of powerful financial calculators to help make informed financial decisions."
        Icon={FaTools}
      >
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">
            <BsGraphUp className="mr-1" /> Easy to Use
          </span>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100">
            <FaChartLine className="mr-1" /> Detailed Reports
          </span>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
            <FaRegClock className="mr-1" /> Instant Results
          </span>
        </div>
      </PageHero>

      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            <span className="block">Our Financial Calculators</span>
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-400">
            Powerful tools to help you plan your financial future with
            confidence
          </p>
        </div>

        {/* Tools grid with available and coming soon options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* EMI Calculator Card - Available */}
          <Link href="/tool/emi-calculator" className="group">
            <div className="h-full bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transform transition duration-300 hover:-translate-y-2 border border-gray-100 dark:border-gray-700">
              <div className="h-3 bg-gradient-to-r from-blue-500 to-purple-600"></div>
              <div className="p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <MdCalculate className="text-white text-2xl" />
                </div>
                <h3 className="text-2xl font-semibold text-center text-gray-900 dark:text-white mb-4">
                  EMI Calculator
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-center mb-6">
                  Calculate your loan EMI, total interest payable, and generate
                  a detailed amortization schedule.
                </p>

                <div className="flex flex-wrap gap-2 justify-center mb-6">
                  <span className="bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs px-3 py-1 rounded-full">
                    Home Loans
                  </span>
                  <span className="bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs px-3 py-1 rounded-full">
                    Car Loans
                  </span>
                  <span className="bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs px-3 py-1 rounded-full">
                    Personal Loans
                  </span>
                </div>

                <div className="text-center">
                  <span className="inline-flex items-center justify-center px-5 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-white font-medium group-hover:from-blue-600 group-hover:to-purple-700 transition-all duration-300">
                    Use Calculator <FaArrowRight className="ml-2" />
                  </span>
                </div>
              </div>
            </div>
          </Link>

          {/* Loan Comparison Card - Available */}
          <Link href="/tool/loan-comparison" className="group">
            <div className="h-full bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transform transition duration-300 hover:-translate-y-2 border border-gray-100 dark:border-gray-700">
              <div className="h-3 bg-gradient-to-r from-yellow-600 to-red-800"></div>
              <div className="p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-600 to-red-800 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <BiTransfer className="text-white text-2xl" />
                </div>
                <h3 className="text-2xl font-semibold text-center text-gray-900 dark:text-white mb-4">
                  Loan Comparison
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-center mb-6">
                  Compare different loan offers, interest rates, and EMIs to
                  find the best option for you .
                </p>

                <div className="flex flex-wrap gap-2 justify-center mb-6">
                  <span className="bg-blue-50 dark:bg-blue-900/30 text-yellow-700 dark:text-yellow-300 text-xs px-3 py-1 rounded-full">
                    Home Loans
                  </span>
                  <span className="bg-blue-50 dark:bg-blue-900/30 text-yellow-700 dark:text-yellow-300 text-xs px-3 py-1 rounded-full">
                    Car Loans
                  </span>
                  <span className="bg-blue-50 dark:bg-blue-900/30 text-yellow-700 dark:text-yellow-300 text-xs px-3 py-1 rounded-full">
                    Personal Loans
                  </span>
                </div>

                <div className="text-center">
                  <span className="inline-flex items-center justify-center px-5 py-2 bg-gradient-to-r from-yellow-600 to-red-800 rounded-full text-white font-medium group-hover:from-yellow-500 group-hover:to-red-700 transition-all duration-300">
                    Use Calculator <FaArrowRight className="ml-2" />
                  </span>
                </div>
              </div>
            </div>
          </Link>

          {/* SIP Calculator Card - Available */}
          <Link href="/tool/sip-calculator" className="group">
            <div className="h-full bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transform transition duration-300 hover:-translate-y-2 border border-gray-100 dark:border-gray-700">
              <div className="h-3 bg-gradient-to-r from-emerald-500 to-green-600"></div>
              <div className="p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <BsGraphUp className="text-white text-2xl" />
                </div>
                <h3 className="text-2xl font-semibold text-center text-gray-900 dark:text-white mb-4">
                  SIP Calculator
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-center mb-6">
                  Calculate SIP returns, total wealth gain, and view detailed
                  yearly breakdown of your investments.
                </p>

                <div className="flex flex-wrap gap-2 justify-center mb-6">
                  <span className="bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 text-xs px-3 py-1 rounded-full">
                    Mutual Funds
                  </span>
                  <span className="bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 text-xs px-3 py-1 rounded-full">
                    Wealth Creation
                  </span>
                  <span className="bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 text-xs px-3 py-1 rounded-full">
                    Retirement
                  </span>
                </div>

                <div className="text-center">
                  <span className="inline-flex items-center justify-center px-5 py-2 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full text-white font-medium group-hover:from-emerald-600 group-hover:to-green-700 transition-all duration-300">
                    Use Calculator <FaArrowRight className="ml-2" />
                  </span>
                </div>
              </div>
            </div>
          </Link>

          {/* Car Loan Calculator Card - Available */}
          <Link href="/tool/car-loan-calculator" className="group">
            <div className="h-full bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transform transition duration-300 hover:-translate-y-2 border border-gray-100 dark:border-gray-700">
              <div className="h-3 bg-gradient-to-r from-orange-500 to-red-500"></div>
              <div className="p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <FaCar className="text-white text-2xl" />
                </div>
                <h3 className="text-2xl font-semibold text-center text-gray-900 dark:text-white mb-4">
                  Car Loan Calculator
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-center mb-6">
                  Calculate your car loan EMI, total interest, and monthly
                  payments for vehicle financing.
                </p>

                <div className="flex flex-wrap gap-2 justify-center mb-6">
                  <span className="bg-orange-50 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 text-xs px-3 py-1 rounded-full">
                    Auto Loans
                  </span>
                  <span className="bg-orange-50 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 text-xs px-3 py-1 rounded-full">
                    Vehicle Financing
                  </span>
                  <span className="bg-orange-50 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 text-xs px-3 py-1 rounded-full">
                    Car EMI
                  </span>
                </div>

                <div className="text-center">
                  <span className="inline-flex items-center justify-center px-5 py-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full text-white font-medium group-hover:from-orange-600 group-hover:to-red-600 transition-all duration-300">
                    Use Calculator <FaArrowRight className="ml-2" />
                  </span>
                </div>
              </div>
            </div>
          </Link>

          {/* Personal Loan Calculator Card - Available */}
          <Link href="/tool/personal-loan-calculator" className="group">
            <div className="h-full bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transform transition duration-300 hover:-translate-y-2 border border-gray-100 dark:border-gray-700">
              <div className="h-3 bg-gradient-to-r from-pink-500 to-purple-500"></div>
              <div className="p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <BsCreditCard className="text-white text-2xl" />
                </div>
                <h3 className="text-2xl font-semibold text-center text-gray-900 dark:text-white mb-4">
                  Personal Loan Calculator
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-center mb-6">
                  Calculate your personal loan EMI, total interest, and monthly
                  payments for all your personal financing needs.
                </p>

                <div className="flex flex-wrap gap-2 justify-center mb-6">
                  <span className="bg-pink-50 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300 text-xs px-3 py-1 rounded-full">
                    Personal Loans
                  </span>
                  <span className="bg-pink-50 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300 text-xs px-3 py-1 rounded-full">
                    Quick Approval
                  </span>
                  <span className="bg-pink-50 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300 text-xs px-3 py-1 rounded-full">
                    Flexible EMI
                  </span>
                </div>

                <div className="text-center">
                  <span className="inline-flex items-center justify-center px-5 py-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full text-white font-medium group-hover:from-pink-600 group-hover:to-purple-600 transition-all duration-300">
                    Use Calculator <FaArrowRight className="ml-2" />
                  </span>
                </div>
              </div>
            </div>
          </Link>

          {/* Lumpsum Calculator Card - Available */}
          <Link href="/tool/lumpsum-calculator" className="group">
            <div className="h-full bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transform transition duration-300 hover:-translate-y-2 border border-gray-100 dark:border-gray-700">
              <div className="h-3 bg-gradient-to-r from-green-500 to-emerald-600"></div>
              <div className="p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <RiMoneyDollarCircleFill className="text-white text-2xl" />
                </div>
                <h3 className="text-2xl font-semibold text-center text-gray-900 dark:text-white mb-4">
                  Lumpsum Calculator
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-center mb-6">
                  Calculate returns on your one-time investment with compound
                  interest and yearly growth breakdown.
                </p>

                <div className="flex flex-wrap gap-2 justify-center mb-6">
                  <span className="bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs px-3 py-1 rounded-full">
                    Lumpsum Investment
                  </span>
                  <span className="bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs px-3 py-1 rounded-full">
                    Compound Interest
                  </span>
                  <span className="bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs px-3 py-1 rounded-full">
                    Wealth Growth
                  </span>
                </div>

                <div className="text-center">
                  <span className="inline-flex items-center justify-center px-5 py-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full text-white font-medium group-hover:from-green-600 group-hover:to-emerald-700 transition-all duration-300">
                    Use Calculator <FaArrowRight className="ml-2" />
                  </span>
                </div>
              </div>
            </div>
          </Link>

          {/* Goal-Based SIP Calculator Card - Available */}
          <Link href="/tool/goal-based-sip-calculator" className="group">
            <div className="h-full bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transform transition duration-300 hover:-translate-y-2 border border-gray-100 dark:border-gray-700">
              <div className="h-3 bg-gradient-to-r from-blue-500 to-purple-600"></div>
              <div className="p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <BsGraphUp className="text-white text-2xl" />
                </div>
                <h3 className="text-2xl font-semibold text-center text-gray-900 dark:text-white mb-4">
                  Goal-Based SIP Calculator
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-center mb-6">
                  Calculate the monthly SIP amount needed to achieve your
                  specific financial goals with precise planning.
                </p>

                <div className="flex flex-wrap gap-2 justify-center mb-6">
                  <span className="bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs px-3 py-1 rounded-full">
                    Goal Planning
                  </span>
                  <span className="bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs px-3 py-1 rounded-full">
                    Target-Based SIP
                  </span>
                  <span className="bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs px-3 py-1 rounded-full">
                    Financial Goals
                  </span>
                </div>

                <div className="text-center">
                  <span className="inline-flex items-center justify-center px-5 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-white font-medium group-hover:from-blue-600 group-hover:to-purple-700 transition-all duration-300">
                    Use Calculator <FaArrowRight className="ml-2" />
                  </span>
                </div>
              </div>
            </div>
          </Link>

          {/* SWP Calculator Card - Available */}
          <Link href="/tool/swp-calculator" className="group">
            <div className="h-full bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transform transition duration-300 hover:-translate-y-2 border border-gray-100 dark:border-gray-700">
              <div className="h-3 bg-gradient-to-r from-orange-500 to-red-600"></div>
              <div className="p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <RiMoneyDollarCircleFill className="text-white text-2xl" />
                </div>
                <h3 className="text-2xl font-semibold text-center text-gray-900 dark:text-white mb-4">
                  SWP Calculator
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-center mb-6">
                  Calculate systematic withdrawals from your investments.
                  Perfect for retirement and income planning.
                </p>

                <div className="flex flex-wrap gap-2 justify-center mb-6">
                  <span className="bg-orange-50 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 text-xs px-3 py-1 rounded-full">
                    Retirement Planning
                  </span>
                  <span className="bg-orange-50 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 text-xs px-3 py-1 rounded-full">
                    Income Planning
                  </span>
                  <span className="bg-orange-50 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 text-xs px-3 py-1 rounded-full">
                    Withdrawals
                  </span>
                </div>

                <div className="text-center">
                  <span className="inline-flex items-center justify-center px-5 py-2 bg-gradient-to-r from-orange-500 to-red-600 rounded-full text-white font-medium group-hover:from-orange-600 group-hover:to-red-700 transition-all duration-300">
                    Use Calculator <FaArrowRight className="ml-2" />
                  </span>
                </div>
              </div>
            </div>
          </Link>

          <Link href="/tool/compound-interest-calculator" className="group">
            <div className="h-full relative">
              <div className="h-full bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-md border border-gray-100 dark:border-gray-700">
                <div className="h-3 bg-gradient-to-r from-purple-500 to-indigo-600"></div>
                <div className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <FaChartLine className="text-white text-2xl" />
                  </div>
                  <h3 className="text-2xl font-semibold text-center text-gray-900 dark:text-white mb-4">
                    Compound Interest Calculator
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-center mb-6">
                    Calculate the future value of your investments with compound
                    interest, including detailed yearly growth analysis.
                  </p>

                  <div className="flex flex-wrap gap-2 justify-center mb-6">
                    <span className="bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs px-3 py-1 rounded-full">
                      Investment Growth
                    </span>
                    <span className="bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs px-3 py-1 rounded-full">
                      Wealth Accumulation
                    </span>
                    <span className="bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs px-3 py-1 rounded-full">
                      Future Value
                    </span>
                  </div>
                  <div className="text-center">
                    <span className="inline-flex items-center justify-center px-5 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full text-white font-medium group-hover:from-purple-600 group-hover:to-indigo-700 transition-all duration-300">
                      Use Calculator <FaArrowRight className="ml-2" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Link>

          <Link href="/tool/fd-calculator" className="group">
            <div className="h-full bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transform transition duration-300 hover:-translate-y-2 border border-gray-100 dark:border-gray-700">
              <div className="h-3 bg-gradient-to-r from-pink-500 to-purple-500"></div>
              <div className="p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <BsCreditCard className="text-white text-2xl" />
                </div>
                <h3 className="text-2xl font-semibold text-center text-gray-900 dark:text-white mb-4">
                  Fixed Deposit Calculator
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-center mb-6">
                  Calculate your fixed deposit returns, including interest
                  earned and maturity amount.
                </p>

                <div className="flex flex-wrap gap-2 justify-center mb-6">
                  <span className="bg-pink-50 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300 text-xs px-3 py-1 rounded-full">
                    Fixed Deposits
                  </span>
                  <span className="bg-pink-50 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300 text-xs px-3 py-1 rounded-full">
                    Interest Calculation
                  </span>
                  <span className="bg-pink-50 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300 text-xs px-3 py-1 rounded-full">
                    Maturity Amount
                  </span>
                </div>

                <div className="text-center">
                  <span className="inline-flex items-center justify-center px-5 py-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full text-white font-medium group-hover:from-pink-600 group-hover:to-purple-600 transition-all duration-300">
                    Use Calculator <FaArrowRight className="ml-2" />
                  </span>
                </div>
              </div>
            </div>
          </Link>

          <Link href="/tool/rd-calculator" className="group">
            <div className="h-full bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transform transition duration-300 hover:-translate-y-2 border border-gray-100 dark:border-gray-700">
              <div className="h-3 bg-gradient-to-r from-pink-500 to-purple-500"></div>
              <div className="p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <BsCreditCard className="text-white text-2xl" />
                </div>
                <h3 className="text-2xl font-semibold text-center text-gray-900 dark:text-white mb-4">
                  Recurring Deposit Calculator
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-center mb-6">
                  Calculate your recurring deposit maturity amount, total
                  interest, and monthly deposits.
                </p>

                <div className="flex flex-wrap gap-2 justify-center mb-6">
                  <span className="bg-pink-50 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300 text-xs px-3 py-1 rounded-full">
                    Recurring Deposits
                  </span>
                  <span className="bg-pink-50 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300 text-xs px-3 py-1 rounded-full">
                    Interest Calculation
                  </span>
                  <span className="bg-pink-50 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300 text-xs px-3 py-1 rounded-full">
                    Maturity Amount
                  </span>
                </div>

                <div className="text-center">
                  <span className="inline-flex items-center justify-center px-5 py-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full text-white font-medium group-hover:from-pink-600 group-hover:to-purple-600 transition-all duration-300">
                    Use Calculator <FaArrowRight className="ml-2" />
                  </span>
                </div>
              </div>
            </div>
          </Link>

          <Link href="tool/gst-calculator" className="group">
            <div className="h-full relative">
              <div className="h-full bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-md border border-gray-100 dark:border-gray-700">
                <div className="h-3 bg-gradient-to-r from-blue-400 to-cyan-500"></div>
                <div className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <BsBank className="text-white text-2xl" />
                  </div>
                  <h3 className="text-2xl font-semibold text-center text-gray-900 dark:text-white mb-4">
                    GST Calculator
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-center mb-6">
                    Calculate your GST liability and plan your taxes efficiently
                    with detailed tax breakdown.
                  </p>

                  <div className="flex flex-wrap gap-2 justify-center mb-6">
                    <span className="bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs px-3 py-1 rounded-full">
                      GST Calculation
                    </span>
                    <span className="bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs px-3 py-1 rounded-full">
                      GST Liability
                    </span>
                    <span className="bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs px-3 py-1 rounded-full">
                      GST Planning
                    </span>
                  </div>
                  <div className="text-center">
                    <span className="inline-flex items-center justify-center px-5 py-2 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full text-white font-medium group-hover:from-blue-600 group-hover:to-cyan-700 transition-all duration-300">
                      Use Calculator <FaArrowRight className="ml-2" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Features section */}
        <div className="mt-32 mb-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
              Why Use Our Financial Tools?
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-400">
              Smart features designed to enhance your financial planning
              experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-5 shadow-lg">
                <FaChartLine className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Accurate Calculations
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Our tools use precise financial algorithms to provide you with
                accurate results and forecasts for your financial decisions.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center mb-5 shadow-lg">
                <BsCalculator className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Interactive Visualizations
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Visual charts and graphs help you understand complex financial
                data at a glance and make informed decisions.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center mb-5 shadow-lg">
                <FaLightbulb className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Advanced Options
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Customize calculations with advanced features like step-up
                investments, prepayments, floating rates, and inflation
                adjustments.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-8 md:p-12 shadow-lg border border-blue-100 dark:border-blue-800/30">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Start Planning Your Financial Future Today
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Explore our powerful financial tools and get started on your
              journey towards financial freedom and security.
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <Link href="/tool/emi-calculator" className="group">
                <span className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white font-medium text-lg group-hover:from-blue-700 group-hover:to-purple-700 transition-all duration-300 shadow-md">
                  Try EMI Calculator <FaArrowRight className="ml-2" />
                </span>
              </Link>
              <Link href="/tool/sip-calculator" className="group">
                <span className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-emerald-600 to-green-600 rounded-full text-white font-medium text-lg group-hover:from-emerald-700 group-hover:to-green-700 transition-all duration-300 shadow-md">
                  Try SIP Calculator <FaArrowRight className="ml-2" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
