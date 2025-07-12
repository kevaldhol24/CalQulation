import { PageHero } from "@/components/common/PageHero";
import { LatestFromOurBlog } from "@/components/feature/Blog/LatestFromOurBlog";
import { Metadata } from "next";
import Link from "next/link";
import { BsBank, BsCalculator, BsGraphUp } from "react-icons/bs";
import {
  FaArrowRight,
  FaChartBar,
  FaChartLine,
  FaLightbulb,
  FaRegClock,
  FaBalanceScale
} from "react-icons/fa";
import { MdCalculate, MdExplore } from "react-icons/md";


export const metadata: Metadata = {
  title: "Calqulation | Free Online Financial Calculators & Tools",
  description:
    "Comprehensive collection of free financial calculators for loans, investments, and retirement planning. Make informed financial decisions with our easy-to-use tools.",
  keywords:
    "financial calculator, loan calculator, EMI calculator, investment calculator, retirement planning, financial tools, financial planning",
  openGraph: {
    title: "Calqulation | Free Online Financial Calculators & Tools",
    description:
      "Comprehensive collection of free financial calculators for loans, investments, and retirement planning. Make informed financial decisions with our easy-to-use tools.",
    url: "https://www.calqulation.com",
    images: [
      {
        url: "/Calqulation.png",
        width: 1200,
        height: 630,
        alt: "Calqulation - Financial Calculator Tools",
      },
    ],
  },
};

export default async function Home() {
  return (
    <div className="bg-white dark:bg-gray-950 min-h-screen">      
      <PageHero
        title="Welcome to Calqulation"
        subtitle="Smart financial calculation tools to help you make better
              decisions for your financial journey."
        Icon={BsCalculator}
      >
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
      </PageHero>

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

        {/* Featured Calculator cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* EMI Calculator Card */}
          <Link href="/tool/emi-calculator" className="group">
            <div className="h-full bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transform transition-all duration-500 hover:-translate-y-3 hover:scale-105 border border-gray-100 dark:border-gray-700 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/10 dark:to-purple-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="h-3 bg-gradient-to-r from-blue-500 via-blue-600 to-purple-600"></div>
              <div className="p-8 relative z-10">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:shadow-2xl transition-shadow duration-300">
                  <MdCalculate className="text-white text-3xl" />
                </div>
                <h3 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                  EMI Calculator
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-center mb-6 leading-relaxed">
                  Calculate your loan EMI, total interest payable, and generate
                  a detailed amortization schedule with smart insights.
                </p>

                <div className="flex flex-wrap gap-2 justify-center mb-6">
                  <span className="bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-700 dark:text-blue-300 text-xs px-3 py-2 rounded-full font-medium">
                    Home Loans
                  </span>
                  <span className="bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-700 dark:text-blue-300 text-xs px-3 py-2 rounded-full font-medium">
                    Car Loans
                  </span>
                  <span className="bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-700 dark:text-blue-300 text-xs px-3 py-2 rounded-full font-medium">
                    Personal Loans
                  </span>
                </div>

                <div className="text-center">
                  <span className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-white font-semibold group-hover:from-blue-600 group-hover:to-purple-700 transition-all duration-300 shadow-lg group-hover:shadow-xl">
                    Calculate Now <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </div>
              </div>
            </div>
          </Link>

          {/* SIP Calculator Card */}
          <Link href="/tool/sip-calculator" className="group">
            <div className="h-full bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transform transition-all duration-500 hover:-translate-y-3 hover:scale-105 border border-gray-100 dark:border-gray-700 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/10 dark:to-green-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="h-3 bg-gradient-to-r from-emerald-500 via-emerald-600 to-green-600"></div>
              <div className="p-8 relative z-10">
                <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:shadow-2xl transition-shadow duration-300">
                  <BsGraphUp className="text-white text-3xl" />
                </div>
                <h3 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-4 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300">
                  SIP Calculator
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-center mb-6 leading-relaxed">
                  Calculate SIP returns, total wealth gain, and view detailed
                  yearly breakdown of your investment journey.
                </p>

                <div className="flex flex-wrap gap-2 justify-center mb-6">
                  <span className="bg-gradient-to-r from-emerald-100 to-green-100 dark:from-emerald-900/30 dark:to-green-900/30 text-emerald-700 dark:text-emerald-300 text-xs px-3 py-2 rounded-full font-medium">
                    Mutual Funds
                  </span>
                  <span className="bg-gradient-to-r from-emerald-100 to-green-100 dark:from-emerald-900/30 dark:to-green-900/30 text-emerald-700 dark:text-emerald-300 text-xs px-3 py-2 rounded-full font-medium">
                    Wealth Creation
                  </span>
                  <span className="bg-gradient-to-r from-emerald-100 to-green-100 dark:from-emerald-900/30 dark:to-green-900/30 text-emerald-700 dark:text-emerald-300 text-xs px-3 py-2 rounded-full font-medium">
                    Retirement
                  </span>
                </div>

                <div className="text-center">
                  <span className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full text-white font-semibold group-hover:from-emerald-600 group-hover:to-green-700 transition-all duration-300 shadow-lg group-hover:shadow-xl">
                    Calculate Now <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </div>
              </div>
            </div>
          </Link>

          {/* Loan Comparison Calculator Card */}
          <Link href="/tool/loan-comparison" className="group">
            <div className="h-full bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transform transition-all duration-500 hover:-translate-y-3 hover:scale-105 border border-gray-100 dark:border-gray-700 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/10 dark:to-red-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="h-3 bg-gradient-to-r from-orange-500 via-orange-600 to-red-600"></div>
              <div className="p-8 relative z-10">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:shadow-2xl transition-shadow duration-300">
                  <FaBalanceScale className="text-white text-3xl" />
                </div>
                <h3 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-4 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors duration-300">
                  Loan Comparison
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-center mb-6 leading-relaxed">
                  Compare different loan options side-by-side to make the best
                  financial decision for your needs.
                </p>

                <div className="flex flex-wrap gap-2 justify-center mb-6">
                  <span className="bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 text-orange-700 dark:text-orange-300 text-xs px-3 py-2 rounded-full font-medium">
                    Interest Rates
                  </span>
                  <span className="bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 text-orange-700 dark:text-orange-300 text-xs px-3 py-2 rounded-full font-medium">
                    EMI Comparison
                  </span>
                  <span className="bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 text-orange-700 dark:text-orange-300 text-xs px-3 py-2 rounded-full font-medium">
                    Best Choice
                  </span>
                </div>

                <div className="text-center">
                  <span className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 rounded-full text-white font-semibold group-hover:from-orange-600 group-hover:to-red-700 transition-all duration-300 shadow-lg group-hover:shadow-xl">
                    Compare Now <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Explore More Tools Section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl p-8 shadow-xl">
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mr-4">
                <MdExplore className="text-white text-3xl" />
              </div>
              <div className="text-left">
                <h3 className="text-2xl font-bold text-white mb-2">
                  Discover More Tools
                </h3>
                <p className="text-indigo-100 text-lg">
                  Explore our complete collection of 12+ financial calculators
                </p>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-3 mb-6">
              <span className="bg-white/20 text-white text-sm px-4 py-2 rounded-full font-medium backdrop-blur-sm">
                GST Calculator
              </span>
              <span className="bg-white/20 text-white text-sm px-4 py-2 rounded-full font-medium backdrop-blur-sm">
                FD Calculator
              </span>
              <span className="bg-white/20 text-white text-sm px-4 py-2 rounded-full font-medium backdrop-blur-sm">
                Goal SIP
              </span>
              <span className="bg-white/20 text-white text-sm px-4 py-2 rounded-full font-medium backdrop-blur-sm">
                Lumpsum Calculator
              </span>
              <span className="bg-white/20 text-white text-sm px-4 py-2 rounded-full font-medium backdrop-blur-sm">
                And 8+ More
              </span>
            </div>
            <Link 
              href="/tools"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-purple-600 font-bold rounded-full hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              View All Calculators <FaArrowRight className="ml-3" />
            </Link>
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

        {/* Blog section */}
        <div className="mt-32 mb-20">
          <LatestFromOurBlog />
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
