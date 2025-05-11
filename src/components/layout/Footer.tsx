import { BsCalculator, BsGithub, BsLinkedin, BsTwitterX } from "react-icons/bs";
import { FaChartLine } from "react-icons/fa";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import Link from "next/link";
import { Logo } from "./Logo";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 mt-auto">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          {/* Brand column */}
          <div className="col-span-1 md:col-span-1">
            <Logo />
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400 max-w-xs">
              Smart financial calculation tools to help you make better
              decisions for your financial journey.
            </p>

            {/* Social Media Links */}
            <div className="flex gap-4 mt-6">
              <a
                href="#"
                className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
              >
                <BsTwitterX size={18} />
                <span className="sr-only">Twitter</span>
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
              >
                <BsLinkedin size={18} />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
              >
                <BsGithub size={18} />
                <span className="sr-only">GitHub</span>
              </a>
            </div>
          </div>

          {/* Calculators column */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
              Calculators
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link
                  href="/tool/emi-calculator"
                  className="text-base text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors flex items-center gap-2"
                >
                  <BsCalculator size={14} />
                  EMI Calculator
                </Link>
              </li>
              <li className="text-base text-gray-500 dark:text-gray-500 flex items-center gap-2">
                <FaChartLine size={14} />
                Compound Interest{" "}
                <span className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs px-2 py-0.5 rounded-full ml-1">
                  Soon
                </span>
              </li>
              <li className="text-base text-gray-500 dark:text-gray-500 flex items-center gap-2">
                <RiMoneyDollarCircleFill size={14} />
                Tax Calculator{" "}
                <span className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs px-2 py-0.5 rounded-full ml-1">
                  Soon
                </span>
              </li>
            </ul>
          </div>

          {/* Resources column */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
              Resources
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link
                  href="/about-us"
                  className="text-base text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/coming-soon"
                  className="text-base text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                >
                  Financial Guides
                </Link>
              </li>
              <li>
                <Link
                  href="/coming-soon"
                  className="text-base text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal column */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
              Legal
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-base text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="terms-of-service"
                  className="text-base text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/disclaimer"
                  className="text-base text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                >
                  Disclaimer
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
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 md:mt-0">
              Designed and built with <span className="text-red-500">❤</span>{" "}
              for better financial decisions
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
