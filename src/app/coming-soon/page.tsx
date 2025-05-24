import { PageHero } from "@/components/common/PageHero";
import ComingSoonClient from "@/components/feature/ComingSoon/ComingSoonClient";
import { CheckCheckIcon, Clock10Icon } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { GrArticle, GrCurrency } from "react-icons/gr";
import { MdEmail } from "react-icons/md";

export const metadata: Metadata = {
  title: "Coming Soon | Calqulation - New Financial Tools",
  description:
    "Exciting new financial calculators and tools are coming soon to Calqulation. Subscribe to be notified when we launch these new features.",
  keywords:
    "coming soon, financial calculators, upcoming features, financial tools, launch notification, financial planning",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Coming Soon | Calqulation - New Financial Tools",
    description:
      "Exciting new financial calculators and tools are coming soon to Calqulation. Subscribe to be notified when we launch these new features.",
    url: "https://calqulation.com/coming-soon",
    type: "website",
    images: [
      {
        url: "/Logo.png",
        width: 1200,
        height: 630,
        alt: "Calqulation - Coming Soon",
      },
    ],
  },
};

export default function ComingSoonPage() {
  return (
    <div className="bg-white dark:bg-gray-950 min-h-screen">
      <PageHero
        Icon={Clock10Icon}
        title="Coming Soon"
        subtitle="Exciting new financial calculators and tools are on the way!"
      />

      {/* Main content section */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Client-side component with countdown */}
        <ComingSoonClient />

        {/* Features Preview */}
        <section className="mb-20">
          <div className="mx-auto max-w-3xl text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              What&apos;s Coming
            </h2>
            <div className="mt-2 h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="h-2 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
              <div className="p-6">
                <div className="flex items-center justify-center h-12 w-12 bg-blue-100 dark:bg-blue-900/50 rounded-full mx-auto mb-4">
                  <GrCurrency size={24} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white text-center mb-4">
                  Investment Return Calculator
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-center">
                  Compare different investment strategies and see how your money
                  grows over time with interactive charts.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="h-2 bg-gradient-to-r from-purple-500 to-pink-600"></div>
              <div className="p-6">
                <div className="flex items-center justify-center h-12 w-12 bg-purple-100 dark:bg-purple-900/50 rounded-full mx-auto mb-4">
                  <GrArticle size={24} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white text-center mb-4">
                  Blogs
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-center">
                  Read our latest articles on financial planning, investment
                  strategies, and personal finance tips to stay informed.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="h-2 bg-gradient-to-r from-emerald-500 to-green-600"></div>
              <div className="p-6">
                <div className="flex items-center justify-center h-12 w-12 bg-emerald-100 dark:bg-emerald-900/50 rounded-full mx-auto mb-4">
                  <CheckCheckIcon size={24} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white text-center mb-4">
                  Retirement Planner
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-center">
                  Plan for your future with our comprehensive retirement
                  calculator that helps you visualize your financial journey.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Social Media Section */}
        <section className="mb-12">
          <div className="mx-auto max-w-3xl text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Follow Our Progress
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Stay updated with our development journey on social media
            </p>
          </div>

          <div className="flex justify-center space-x-6">
            <a
              href="https://twitter.com/calqulation"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white dark:bg-gray-800 p-4 rounded-full shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700"
            >
              <FaTwitter className="text-blue-400 h-6 w-6" />
              <span className="sr-only">Twitter</span>
            </a>
            <a
              href="https://facebook.com/calqulation"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white dark:bg-gray-800 p-4 rounded-full shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700"
            >
              <FaFacebookF className="text-blue-600 h-6 w-6" />
              <span className="sr-only">Facebook</span>
            </a>
            <a
              href="https://linkedin.com/company/calqulation"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white dark:bg-gray-800 p-4 rounded-full shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700"
            >
              <FaLinkedinIn className="text-blue-700 h-6 w-6" />
              <span className="sr-only">LinkedIn</span>
            </a>
            <Link
              href="/contact"
              className="bg-white dark:bg-gray-800 p-4 rounded-full shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700"
            >
              <MdEmail className="text-red-500 h-6 w-6" />
              <span className="sr-only">Contact Us?</span>
            </Link>
          </div>
        </section>

        {/* Existing Products Section */}
        <section className="mb-20">
          <div className="mx-auto max-w-3xl text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Meanwhile, Check Out Our Existing Tools
            </h2>
            <div className="mt-2 h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <a
              href="/tool/emi-calculator"
              className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <div className="h-2 bg-gradient-to-r from-blue-500 to-purple-600"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 text-center">
                  EMI Calculator
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-center">
                  Calculate your loan EMI, total interest, and see your
                  amortization schedule with our easy-to-use calculator.
                </p>
              </div>
            </a>

            <a
              href="/about-us"
              className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <div className="h-2 bg-gradient-to-r from-purple-500 to-pink-600"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 text-center">
                  About Calqulation
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-center">
                  Learn about our mission to simplify financial decisions and
                  meet the team behind Calqulation.
                </p>
              </div>
            </a>
          </div>
        </section>
      </div>

      {/* Structured data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Coming Soon | Calqulation - New Financial Tools",
            description:
              "Exciting new financial calculators and tools are coming soon to Calqulation.",
            publisher: {
              "@type": "Organization",
              name: "Calqulation",
              logo: "https://calqulation.com/Logo.png",
            },
            datePublished: "2025-05-11",
            dateModified: "2025-05-11",
          }),
        }}
      />
    </div>
  );
}
