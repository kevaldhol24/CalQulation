import { BsCalculator, BsGithub, BsLinkedin, BsTwitterX } from "react-icons/bs";
import { FaChartLine, FaChevronRight } from "react-icons/fa";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import Link from "next/link";
import { Logo } from "./Logo";
import { FaToolbox } from "react-icons/fa6";
import { GoHeartFill } from "react-icons/go";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 mt-auto relative">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-36 h-36 bg-blue-500/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
      <div className="absolute top-24 right-12 w-24 h-24 bg-purple-500/5 rounded-full blur-2xl"></div>

      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Newsletter signup - new section */}
        {/* <div className="mb-12 p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 rounded-2xl shadow-sm">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0 md:mr-8 text-center md:text-left">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Stay up to date
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                Get notified about new financial tools and calculators
              </p>
            </div>
            <form className="w-full md:w-auto flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:border-blue-400"
                required
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                Subscribe
                <FaChevronRight className="h-3 w-3" />
              </button>
            </form>
          </div>
        </div> */}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          {/* Brand column */}
          <div className="col-span-1 md:col-span-1">
            <Logo />
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400 max-w-xs leading-relaxed">
              Smart financial calculation tools to help you make better
              decisions for your financial journey.
            </p>

            {/* Social Media Links */}
            <div className="flex gap-4 mt-6">
              <a
                href="#"
                className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors bg-gray-100 dark:bg-gray-800 p-2 rounded-full hover:scale-110"
              >
                <BsTwitterX size={18} />
                <span className="sr-only">Twitter</span>
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors bg-gray-100 dark:bg-gray-800 p-2 rounded-full hover:scale-110"
              >
                <BsLinkedin size={18} />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors bg-gray-100 dark:bg-gray-800 p-2 rounded-full hover:scale-110"
              >
                <BsGithub size={18} />
                <span className="sr-only">GitHub</span>
              </a>
            </div>
          </div>

          {/* Calculators column */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider relative">
              <span className="bg-blue-100 dark:bg-blue-900 h-6 w-1 absolute -left-3 top-0 rounded-r-full"></span>
              Calculators
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link
                  href="/tool/loan-calculator"
                  prefetch={true}
                  className="text-base text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors flex items-center gap-2 group"
                >
                  <span className="bg-blue-50 dark:bg-gray-800 text-blue-600 dark:text-blue-400 p-1 rounded-md group-hover:bg-blue-100 dark:group-hover:bg-gray-700 transition-colors">
                    <BsCalculator size={14} />
                  </span>
                  <span className="group-hover:translate-x-1 transition-transform">
                    EMI Calculator
                  </span>
                </Link>
              </li>
              <li className="text-base text-gray-500 dark:text-gray-500 flex items-center gap-2">
                <Link
                  href="/tool/sip-calculator"
                  prefetch={true}
                  className="text-base text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors flex items-center gap-2 group"
                >
                  <span className="bg-gray-50 dark:bg-gray-800 text-gray-400 p-1 rounded-md">
                    <FaChartLine size={14} />
                  </span>
                  <span>SIP Calculator</span>
                </Link>
              </li>
              <li className="text-base text-gray-500 dark:text-gray-500 flex items-center gap-2">
                <span className="bg-gray-50 dark:bg-gray-800 text-gray-400 p-1 rounded-md">
                  <RiMoneyDollarCircleFill size={14} />
                </span>
                <span>Tax Calculator</span>
                <span className="bg-gradient-to-r from-blue-500 to-purple-500 dark:from-blue-600 dark:to-purple-600 text-white text-xs px-2 py-0.5 rounded-full ml-1 whitespace-nowrap">
                  Soon
                </span>
              </li>
              <li className="text-base text-gray-500 dark:text-gray-500 flex items-center gap-2">
                <Link
                  href="/tools"
                  prefetch={true}
                  className="text-base text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors flex items-center gap-2 group"
                >
                  <span className="bg-gray-50 dark:bg-gray-800 text-gray-400 p-1 rounded-md">
                    <FaToolbox size={14} />
                  </span>
                  <span>All Tools</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources column */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider relative">
              <span className="bg-purple-100 dark:bg-purple-900 h-6 w-1 absolute -left-3 top-0 rounded-r-full"></span>
              Resources
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link
                  href="/about-us"
                  prefetch={true}
                  className="text-base text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors group flex items-center gap-2"
                >
                  <FaChevronRight className="h-3 w-3 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 hidden group-hover:block transition-all" />
                  <span className="group-hover:translate-x-1 transition-transform">
                    About
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  prefetch={true}
                  className="text-base text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors group flex items-center gap-2"
                >
                  <FaChevronRight className="h-3 w-3 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 hidden group-hover:block transition-all" />
                  <span className="group-hover:translate-x-1 transition-transform">
                    Contact Us
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  prefetch={true}
                  className="text-base text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors group flex items-center gap-2"
                >
                  <FaChevronRight className="h-3 w-3 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 hidden group-hover:block transition-all" />
                  <span className="group-hover:translate-x-1 transition-transform">
                    Blog
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal column */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider relative">
              <span className="bg-green-100 dark:bg-green-900 h-6 w-1 absolute -left-3 top-0 rounded-r-full"></span>
              Legal
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link
                  href="/privacy-policy"
                  prefetch={true}
                  className="text-base text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors group flex items-center gap-2"
                >
                  <FaChevronRight className="h-3 w-3 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 hidden group-hover:block transition-all" />
                  <span className="group-hover:translate-x-1 transition-transform">
                    Privacy Policy
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-of-service"
                  prefetch={true}
                  className="text-base text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors group flex items-center gap-2"
                >
                  <FaChevronRight className="h-3 w-3 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 hidden group-hover:block transition-all" />
                  <span className="group-hover:translate-x-1 transition-transform">
                    Terms of Service
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/disclaimer"
                  prefetch={true}
                  className="text-base text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors group flex items-center gap-2"
                >
                  <FaChevronRight className="h-3 w-3 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 hidden group-hover:block transition-all" />
                  <span className="group-hover:translate-x-1 transition-transform">
                    Disclaimer
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              &copy; {currentYear} Calqulation. All rights reserved.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 md:mt-0 flex gap-1 flex-wrap justify-center">
              Designed and built with
              <span className="text-red-500 animate-pulse"><GoHeartFill size={24}/></span> for better
              financial decisions
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
