import { PageHero } from "@/components/common/PageHero";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FaRegCompass } from "react-icons/fa";

export function NotFoundContent() {
  return (
    <>
      <PageHero
        Icon={FaRegCompass}
        title="Page Not Found"
        subtitle="The page you are looking for might have been removed, had its name changed, or is temporarily unavailable."
      >
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-4">
          <Button
            asChild
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3"
            size="lg"
          >
            <Link href="/">Return to Homepage</Link>
          </Button>

          <Button
            asChild
            variant="outline"
            className="bg-input/5 hover:bg-input/10 !border-[#ffffff26] text-white"
            size="lg"
          >
            <Link href="/contact">Contact Support</Link>
          </Button>
        </div>
      </PageHero>

      <div className="py-16 px-4 bg-white dark:bg-gray-950">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            You might be interested in
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700 p-6 transition-all hover:shadow-xl hover:-translate-y-1">
              <div className="text-blue-600 dark:text-blue-400 mb-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 mx-auto"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                EMI Calculator
              </h4>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Plan your loan repayments with our easy-to-use EMI calculator
              </p>
              <Link
                href="/tool/loan-calculator"
                className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
              >
                Calculate Now →
              </Link>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700 p-6 transition-all hover:shadow-xl hover:-translate-y-1">
              <div className="text-purple-600 dark:text-purple-400 mb-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 mx-auto"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Coming Soon
              </h4>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Check our upcoming financial calculation tools
              </p>
              <Link
                href="/coming-soon"
                className="text-purple-600 dark:text-purple-400 font-medium hover:underline"
              >
                Learn More →
              </Link>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700 p-6 transition-all hover:shadow-xl hover:-translate-y-1">
              <div className="text-green-600 dark:text-green-400 mb-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 mx-auto"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Contact Us
              </h4>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Have questions? Get in touch with our team
              </p>
              <Link
                href="/contact"
                className="text-green-600 dark:text-green-400 font-medium hover:underline"
              >
                Contact Now →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
