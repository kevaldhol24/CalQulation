import { WaveSeparator } from "@/components/layout/WaveSeparator";
import Link from "next/link";
import { BsBank, BsCalculator, BsGraphUp } from "react-icons/bs";
import {
  FaArrowRight,
  FaChartBar,
  FaChartLine,
  FaLightbulb,
  FaRegClock,
} from "react-icons/fa";
import { MdCalculate } from "react-icons/md";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calqulation | Free Online Financial Calculators & Tools",
  description: "Comprehensive collection of free financial calculators for loans, investments, and retirement planning. Make informed financial decisions with our easy-to-use tools.",
  keywords: "financial calculator, loan calculator, EMI calculator, investment calculator, retirement planning, financial tools, financial planning",
  openGraph: {
    title: "Calqulation | Free Online Financial Calculators & Tools",
    description: "Comprehensive collection of free financial calculators for loans, investments, and retirement planning. Make informed financial decisions with our easy-to-use tools.",
    url: "https://calqulation.com",
    images: [
      {
        url: "/Logo.png",
        width: 1200,
        height: 630,
        alt: "Calqulation - Financial Calculator Tools",
      }
    ],
  }
};

export default function Home() {
  return (
    <div className="bg-white dark:bg-gray-950 min-h-screen">
      {/* Hero section with enhanced visuals */}
      <div className="relative overflow-hidden">
        {/* Enhanced background with modern gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-500 to-blue-800 opacity-90"></div>

        {/* Animated floating shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-blue-300 opacity-10 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute top-1/2 right-1/4 w-48 h-48 bg-purple-300 opacity-10 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>

        <div className="relative max-w-7xl mx-auto py-24 sm:py-32 px-4 sm:px-6 lg:px-8 z-10">
          <div className="text-center mb-12">
            {/* Icon with glow effect */}
            <div className="inline-flex items-center justify-center p-3 bg-white/10 backdrop-blur-md rounded-full mb-6 shadow-lg shadow-blue-500/20">
              <BsCalculator className="text-white text-4xl animate-pulse" />
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight mb-4">
              <span className="inline-block animate-shimmer bg-gradient-to-r from-white via-blue-200 to-white bg-clip-text text-transparent">
                Welcome to Calqulation
              </span>
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed mb-8">
              Smart financial calculation tools to help you make better
              decisions for your financial journey.
            </p>

            {/* Feature badges */}
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">
                <BsGraphUp className="mr-1" /> Easy to Use
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100">
                <FaChartBar className="mr-1" /> Detailed Reports
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                <FaRegClock className="mr-1" /> Instant Results
              </span>
            </div>
          </div>
        </div>
        <WaveSeparator />
      </div>

      {/* Main content section with calculators */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            <span className="block">Financial Calculators</span>
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-400">
            Powerful tools to help you plan your financial future with
            confidence
          </p>
        </div>

        {/* Calculator cards */}
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

          {/* Compound Interest Calculator Card - Coming Soon */}
          <div className="h-full relative">
            <div className="absolute inset-0 flex items-center justify-center z-10 backdrop-blur-sm rounded-2xl overflow-hidden bg-black/20 dark:bg-black/60">
              <span className="bg-white/80 dark:bg-gray-800/80 text-gray-800 dark:text-white px-4 py-2 rounded-full font-bold shadow-lg">
                Coming Soon
              </span>
            </div>
            <div className="h-full bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-md border border-gray-100 dark:border-gray-700 opacity-75">
              <div className="h-3 bg-gradient-to-r from-emerald-500 to-green-600"></div>
              <div className="p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <BsGraphUp className="text-white text-2xl" />
                </div>
                <h3 className="text-2xl font-semibold text-center text-gray-900 dark:text-white mb-4">
                  Compound Interest
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-center mb-6">
                  See how your investments can grow over time with our powerful
                  compound interest calculator.
                </p>

                <div className="flex flex-wrap gap-2 justify-center mb-6">
                  <span className="bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 text-xs px-3 py-1 rounded-full">
                    SIP
                  </span>
                  <span className="bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 text-xs px-3 py-1 rounded-full">
                    Lump Sum
                  </span>
                  <span className="bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 text-xs px-3 py-1 rounded-full">
                    Retirement
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Tax Calculator Card - Coming Soon */}
          <div className="h-full relative">
            <div className="absolute inset-0 flex items-center justify-center z-10 backdrop-blur-sm rounded-2xl overflow-hidden bg-black/20 dark:bg-black/60">
              <span className="bg-white/80 dark:bg-gray-800/80 text-gray-800 dark:text-white px-4 py-2 rounded-full font-bold shadow-lg">
                Coming Soon
              </span>
            </div>
            <div className="h-full bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-md border border-gray-100 dark:border-gray-700 opacity-75">
              <div className="h-3 bg-gradient-to-r from-amber-500 to-orange-500"></div>
              <div className="p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <RiMoneyDollarCircleFill className="text-white text-2xl" />
                </div>
                <h3 className="text-2xl font-semibold text-center text-gray-900 dark:text-white mb-4">
                  Tax Calculator
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-center mb-6">
                  Estimate your income tax liability and plan your taxes
                  efficiently with our tax calculator.
                </p>

                <div className="flex flex-wrap gap-2 justify-center mb-6">
                  <span className="bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 text-xs px-3 py-1 rounded-full">
                    Income Tax
                  </span>
                  <span className="bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 text-xs px-3 py-1 rounded-full">
                    Tax Saving
                  </span>
                  <span className="bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 text-xs px-3 py-1 rounded-full">
                    Tax Planning
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits section */}
        <div className="mt-32 mb-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
              Why Use Our Calculators?
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-400">
              Make smarter financial decisions with our powerful calculation
              tools
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-5 shadow-lg">
                <FaChartLine className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Accurate Forecasting
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Our calculators use precise mathematical formulas to give you
                the most accurate projections for your financial plans.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center mb-5 shadow-lg">
                <FaLightbulb className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Informed Decisions
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Get comprehensive insights with detailed breakdowns, charts, and
                reports to help you make better financial choices.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center mb-5 shadow-lg">
                <BsBank className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Financial Planning
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Whether it&apos;s loans, investments, or taxes, our tools help
                you plan your finances with confidence and clarity.
              </p>
            </div>
          </div>
        </div>

        {/* Call to action section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl overflow-hidden shadow-xl">
          <div className="px-6 py-12 md:p-12 md:flex md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                Ready to calculate your financial future?
              </h2>
              <p className="mt-3 text-lg text-blue-100 max-w-3xl">
                Our calculators are designed to help you make informed financial
                decisions. Start using them for free today!
              </p>
            </div>
            <div className="mt-8 md:mt-0 md:shrink-0">
              <Link
                href="/tool/emi-calculator"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-blue-600 bg-white hover:bg-blue-50 transition duration-300"
              >
                Try EMI Calculator
                <FaArrowRight className="ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
