import { WaveSeparator } from "@/components/layout/WaveSeparator";
import {
  FaShieldAlt,
  FaInfoCircle,
  FaBalanceScale,
  FaUserShield,
  FaExclamationTriangle,
} from "react-icons/fa";
import { MdCalculate, MdEmail } from "react-icons/md";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Disclaimer | Calqulation - Financial Tools",
  description:
    "Important information about the use, accuracy and limitations of Calqulation's financial calculators and tools.",
  keywords:
    "disclaimer, financial calculator disclaimer, loan calculator disclaimer, financial tool limitations, legal terms",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Disclaimer | Calqulation - Financial Tools",
    description:
      "Important information about the use, accuracy and limitations of Calqulation's financial calculators and tools.",
    url: "https://www.calqulation.com/disclaimer",
    type: "website",
  },
};

export default function DisclaimerPage() {
  return (
    <div className="bg-white dark:bg-gray-950 min-h-screen">
      {/* Hero section with gradient background */}
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
        </div>

        <div className="relative max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 z-10">
          <div className="text-center mb-8">
            {/* Icon with glow effect */}
            <div className="inline-flex items-center justify-center p-3 bg-white/10 backdrop-blur-md rounded-full mb-4 shadow-lg shadow-blue-500/20">
              <FaShieldAlt className="text-white text-3xl" />
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
              <span className="inline-block bg-gradient-to-r from-white via-blue-200 to-white bg-clip-text text-transparent">
                Disclaimer
              </span>
            </h1>
            <p className="text-lg text-blue-100 max-w-2xl mx-auto leading-relaxed">
              Important information about the use of our financial calculation
              tools
            </p>
          </div>
        </div>
        <WaveSeparator />
      </div>

      {/* Main content section */}
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="space-y-16">
          {/* Calculation Accuracy Section */}
          <section className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="h-2 bg-gradient-to-r from-blue-500 to-purple-600"></div>
            <div className="p-8">
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4">
                  <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center">
                    <MdCalculate className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    Calculation Accuracy
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    While we strive to ensure that all calculations performed by
                    our tools are accurate, we cannot guarantee 100% accuracy.
                    The results provided by our calculators are intended to be
                    estimates and approximations rather than precise figures.
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    Calculations may vary based on rounding methods, calculation
                    algorithms, and specific terms provided by financial
                    institutions. Users should verify all results with their
                    financial advisors or lenders before making any financial
                    decisions.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Not Financial Advice Section */}
          <section className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="h-2 bg-gradient-to-r from-purple-500 to-blue-600"></div>
            <div className="p-8">
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4">
                  <div className="h-12 w-12 bg-purple-100 dark:bg-purple-900/50 rounded-full flex items-center justify-center">
                    <FaInfoCircle className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    Not Financial Advice
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    The content and tools provided on FinCalc are for
                    informational and educational purposes only. We do not
                    provide financial, legal, or tax advice. The calculators and
                    information provided should not be considered as financial
                    advice.
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    Before making any financial decisions, including but not
                    limited to taking loans, making investments, or making
                    tax-related decisions, we strongly recommend consulting with
                    a qualified financial advisor, accountant, or legal
                    professional who can provide personalized advice based on
                    your individual circumstances.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* User Responsibility Section */}
          <section className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="h-2 bg-gradient-to-r from-emerald-500 to-green-600"></div>
            <div className="p-8">
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4">
                  <div className="h-12 w-12 bg-emerald-100 dark:bg-emerald-900/50 rounded-full flex items-center justify-center">
                    <FaUserShield className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                  </div>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    User Responsibility
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    By using our calculators and tools, you acknowledge that you
                    are responsible for your own financial decisions. You agree
                    that FinCalc is not liable for any decisions made based on
                    the information or calculations provided by our tools.
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    We encourage users to input accurate information into our
                    calculators to obtain the most relevant results. However, it
                    remains the user&apos;s responsibility to verify the
                    accuracy of all inputs and to understand how different
                    variables affect the calculations.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Third-Party Links Section */}
          <section className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="h-2 bg-gradient-to-r from-amber-500 to-orange-500"></div>
            <div className="p-8">
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4">
                  <div className="h-12 w-12 bg-amber-100 dark:bg-amber-900/50 rounded-full flex items-center justify-center">
                    <FaExclamationTriangle className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                  </div>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    Third-Party Links & Content
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Our website may contain links to third-party websites or
                    services that are not owned or controlled by FinCalc. We
                    have no control over, and assume no responsibility for, the
                    content, privacy policies, or practices of any third-party
                    websites or services.
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    You acknowledge and agree that FinCalc shall not be
                    responsible or liable, directly or indirectly, for any
                    damage or loss caused or alleged to be caused by or in
                    connection with the use of or reliance on any such content,
                    goods, or services available on or through any such websites
                    or services.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* General Terms Section */}
          <section className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="h-2 bg-gradient-to-r from-blue-500 to-purple-600"></div>
            <div className="p-8">
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4">
                  <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center">
                    <FaBalanceScale className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    General Terms
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    We reserve the right to modify or replace this disclaimer at
                    any time without prior notice. By using our website and
                    tools, you agree to be bound by the current version of this
                    disclaimer.
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    If any provision of this disclaimer is held to be invalid or
                    unenforceable, such provision shall be struck out and the
                    remaining provisions shall remain in full force and effect.
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    This disclaimer was last updated on May 11, 2025.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl overflow-hidden shadow-xl text-white p-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">
                Have Questions About This Disclaimer?
              </h2>
              <p className="mb-6">
                If you have any questions about this disclaimer, please contact
                us at:
              </p>
              <div className="inline-block px-6 py-4 border border-white/20 bg-white/10 backdrop-blur-sm rounded-xl text-base font-medium shadow-sm text-white">
                <MdEmail className="mr-2 h-5 w-5 inline-block align-sub" />
                <Link href="/contact" className="hover:underline">
                  Contact Us
                </Link>
              </div>
            </div>
          </section>

          {/* SEO-friendly footer links */}
          <section className="mt-12">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              <p className="mb-4">Related Information:</p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="/terms-of-service"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Terms of Service
                </a>
                <a
                  href="/privacy-policy"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Privacy Policy
                </a>
                <a
                  href="/about-us"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  About Us
                </a>
                <a
                  href="/tool/emi-calculator"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  EMI Calculator
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Structured data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Disclaimer | Calqulation Financial Tools",
            description:
              "Important information about the use, accuracy and limitations of Calqulation's financial calculators and tools.",
            publisher: {
              "@type": "Organization",
              name: "Calqulation",
              logo: "https://www.calqulation.com/Calqulation.png",
            },
            datePublished: "2025-05-11",
            dateModified: "2025-05-11",
          }),
        }}
      />
    </div>
  );
}
