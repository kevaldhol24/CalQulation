import { PageHero } from "@/components/common/PageHero";
import { Metadata } from "next";
import Link from "next/link";
import { BiTransfer } from "react-icons/bi";
import {
  BsCalculator,
  BsGraphUp,
  BsCreditCard,
  BsPiggyBank,
} from "react-icons/bs";
import {
  FaCar,
  FaArrowRight,
  FaChartLine,
  FaLightbulb,
  FaRegClock,
  FaTools,
  FaHome,
  FaWallet,
  FaUniversity,
  FaCalculator,
} from "react-icons/fa";
import {
  MdCalculate,
  MdTrendingUp,
  MdAccountBalance,
  MdAttachMoney,
} from "react-icons/md";
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
        {
          "@type": "ListItem",
          position: 6,
          name: "Loan Comparison Tool",
          url: "https://www.calqulation.com/tool/loan-comparison",
        },
        {
          "@type": "ListItem",
          position: 7,
          name: "Goal-Based SIP Calculator",
          url: "https://www.calqulation.com/tool/goal-based-sip-calculator",
        },
        {
          "@type": "ListItem",
          position: 8,
          name: "SWP Calculator",
          url: "https://www.calqulation.com/tool/swp-calculator",
        },
        {
          "@type": "ListItem",
          position: 9,
          name: "Compound Interest Calculator",
          url: "https://www.calqulation.com/tool/compound-interest-calculator",
        },
        {
          "@type": "ListItem",
          position: 10,
          name: "Fixed Deposit Calculator",
          url: "https://www.calqulation.com/tool/fd-calculator",
        },
        {
          "@type": "ListItem",
          position: 11,
          name: "Recurring Deposit Calculator",
          url: "https://www.calqulation.com/tool/rd-calculator",
        },
        {
          "@type": "ListItem",
          position: 12,
          name: "GST Calculator",
          url: "https://www.calqulation.com/tool/gst-calculator",
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

        {/* Loan & Credit Tools Category */}
        <div className="mb-20">
          <div className="flex items-center mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mr-4 shadow-lg">
              <FaHome className="text-white text-xl" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                Loan & Credit Tools
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Calculate EMIs, compare loans, and plan your borrowing
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* EMI Calculator */}
            <Link href="/tool/emi-calculator" className="group">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transform transition duration-300 hover:-translate-y-2 border border-gray-100 dark:border-gray-700 h-full">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 shadow-md">
                  <MdCalculate className="text-white text-xl" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  EMI Calculator
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  Calculate loan EMI and amortization schedule
                </p>
                <div className="flex items-center text-blue-600 dark:text-blue-400 text-sm font-medium group-hover:text-blue-700">
                  Calculate <FaArrowRight className="ml-1 text-xs" />
                </div>
              </div>
            </Link>

            {/* Loan Comparison */}
            <Link href="/tool/loan-comparison" className="group">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transform transition duration-300 hover:-translate-y-2 border border-gray-100 dark:border-gray-700 h-full">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center mb-4 shadow-md">
                  <BiTransfer className="text-white text-xl" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Loan Comparison
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  Compare different loan offers and rates
                </p>
                <div className="flex items-center text-orange-600 dark:text-orange-400 text-sm font-medium group-hover:text-orange-700">
                  Compare <FaArrowRight className="ml-1 text-xs" />
                </div>
              </div>
            </Link>

            {/* Car Loan Calculator */}
            <Link href="/tool/car-loan-calculator" className="group">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transform transition duration-300 hover:-translate-y-2 border border-gray-100 dark:border-gray-700 h-full">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mb-4 shadow-md">
                  <FaCar className="text-white text-xl" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Car Loan
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  Calculate vehicle financing EMI
                </p>
                <div className="flex items-center text-green-600 dark:text-green-400 text-sm font-medium group-hover:text-green-700">
                  Calculate <FaArrowRight className="ml-1 text-xs" />
                </div>
              </div>
            </Link>

            {/* Personal Loan Calculator */}
            <Link href="/tool/personal-loan-calculator" className="group">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transform transition duration-300 hover:-translate-y-2 border border-gray-100 dark:border-gray-700 h-full">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-500 rounded-xl flex items-center justify-center mb-4 shadow-md">
                  <BsCreditCard className="text-white text-xl" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Personal Loan
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  Calculate personal financing EMI
                </p>
                <div className="flex items-center text-pink-600 dark:text-pink-400 text-sm font-medium group-hover:text-pink-700">
                  Calculate <FaArrowRight className="ml-1 text-xs" />
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Investment Tools Category */}
        <div className="mb-20">
          <div className="flex items-center mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center mr-4 shadow-lg">
              <MdTrendingUp className="text-white text-xl" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                Investment Tools
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Plan your investments and track wealth growth
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* SIP Calculator */}
            <Link href="/tool/sip-calculator" className="group">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transform transition duration-300 hover:-translate-y-2 border border-gray-100 dark:border-gray-700 h-full">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center mb-4 shadow-md">
                  <BsGraphUp className="text-white text-xl" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  SIP Calculator
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  Calculate SIP returns and wealth gain
                </p>
                <div className="flex items-center text-emerald-600 dark:text-emerald-400 text-sm font-medium group-hover:text-emerald-700">
                  Calculate <FaArrowRight className="ml-1 text-xs" />
                </div>
              </div>
            </Link>

            {/* Lumpsum Calculator */}
            <Link href="/tool/lumpsum-calculator" className="group">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transform transition duration-300 hover:-translate-y-2 border border-gray-100 dark:border-gray-700 h-full">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mb-4 shadow-md">
                  <RiMoneyDollarCircleFill className="text-white text-xl" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Lumpsum
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  Calculate one-time investment returns
                </p>
                <div className="flex items-center text-green-600 dark:text-green-400 text-sm font-medium group-hover:text-green-700">
                  Calculate <FaArrowRight className="ml-1 text-xs" />
                </div>
              </div>
            </Link>

            {/* Goal-Based SIP */}
            <Link href="/tool/goal-based-sip-calculator" className="group">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transform transition duration-300 hover:-translate-y-2 border border-gray-100 dark:border-gray-700 h-full">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 shadow-md">
                  <FaWallet className="text-white text-xl" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Goal-Based SIP
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  Calculate SIP for specific goals
                </p>
                <div className="flex items-center text-blue-600 dark:text-blue-400 text-sm font-medium group-hover:text-blue-700">
                  Calculate <FaArrowRight className="ml-1 text-xs" />
                </div>
              </div>
            </Link>

            {/* SWP Calculator */}
            <Link href="/tool/swp-calculator" className="group">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transform transition duration-300 hover:-translate-y-2 border border-gray-100 dark:border-gray-700 h-full">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center mb-4 shadow-md">
                  <MdAttachMoney className="text-white text-xl" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  SWP Calculator
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  Calculate systematic withdrawals
                </p>
                <div className="flex items-center text-orange-600 dark:text-orange-400 text-sm font-medium group-hover:text-orange-700">
                  Calculate <FaArrowRight className="ml-1 text-xs" />
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Savings & Deposits Category */}
        <div className="mb-20">
          <div className="flex items-center mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center mr-4 shadow-lg">
              <MdAccountBalance className="text-white text-xl" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                Savings & Deposits
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Calculate returns on deposits and savings instruments
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Compound Interest Calculator */}
            <Link href="/tool/compound-interest-calculator" className="group">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transform transition duration-300 hover:-translate-y-2 border border-gray-100 dark:border-gray-700 h-full">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center mb-4 shadow-md">
                  <FaChartLine className="text-white text-xl" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Compound Interest
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  Calculate compound growth over time
                </p>
                <div className="flex items-center text-purple-600 dark:text-purple-400 text-sm font-medium group-hover:text-purple-700">
                  Calculate <FaArrowRight className="ml-1 text-xs" />
                </div>
              </div>
            </Link>

            {/* Fixed Deposit Calculator */}
            <Link href="/tool/fd-calculator" className="group">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transform transition duration-300 hover:-translate-y-2 border border-gray-100 dark:border-gray-700 h-full">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-500 rounded-xl flex items-center justify-center mb-4 shadow-md">
                  <FaUniversity className="text-white text-xl" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Fixed Deposit
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  Calculate FD returns and maturity
                </p>
                <div className="flex items-center text-pink-600 dark:text-pink-400 text-sm font-medium group-hover:text-pink-700">
                  Calculate <FaArrowRight className="ml-1 text-xs" />
                </div>
              </div>
            </Link>

            {/* Recurring Deposit Calculator */}
            <Link href="/tool/rd-calculator" className="group">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transform transition duration-300 hover:-translate-y-2 border border-gray-100 dark:border-gray-700 h-full">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center mb-4 shadow-md">
                  <BsPiggyBank className="text-white text-xl" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Recurring Deposit
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  Calculate RD maturity amount
                </p>
                <div className="flex items-center text-cyan-600 dark:text-cyan-400 text-sm font-medium group-hover:text-cyan-700">
                  Calculate <FaArrowRight className="ml-1 text-xs" />
                </div>
              </div>
            </Link>

            {/* GST Calculator */}
            <Link href="/tool/gst-calculator" className="group">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transform transition duration-300 hover:-translate-y-2 border border-gray-100 dark:border-gray-700 h-full">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-xl flex items-center justify-center mb-4 shadow-md">
                  <FaCalculator className="text-white text-xl" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  GST Calculator
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                  Calculate GST liability and planning
                </p>
                <div className="flex items-center text-blue-600 dark:text-blue-400 text-sm font-medium group-hover:text-blue-700">
                  Calculate <FaArrowRight className="ml-1 text-xs" />
                </div>
              </div>
            </Link>
          </div>
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
                <span className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-white font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg">
                  Try EMI Calculator <FaArrowRight className="ml-2" />
                </span>
              </Link>
              <Link href="/tool/sip-calculator" className="group">
                <span className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-emerald-600 to-green-600 rounded-full text-white font-medium hover:from-emerald-700 hover:to-green-700 transition-all duration-300 shadow-lg">
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
