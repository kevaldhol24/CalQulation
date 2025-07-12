import type { Metadata } from "next";
import { GSTProvider } from "@/contexts/GSTContext";
import { GSTCalculator } from "@/components/feature/GSTCalculator";
import { ToolPageHero } from "@/components/common/PageHero";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { HiHome } from "react-icons/hi";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "GST Calculator - Calculate Goods and Services Tax | Calqulation",
  description:
    "Free GST calculator to calculate tax inclusive and exclusive amounts. Calculate CGST, SGST, IGST with accurate GST rates for India. Simple and fast GST calculation tool.",
  keywords: [
    "GST calculator",
    "goods and services tax",
    "tax calculator",
    "CGST calculator",
    "SGST calculator",
    "IGST calculator",
    "tax inclusive calculator",
    "tax exclusive calculator",
    "GST rate calculator",
    "Indian tax calculator",
  ],
  openGraph: {
    title: "GST Calculator - Calculate Goods and Services Tax",
    description:
      "Free GST calculator to calculate tax inclusive and exclusive amounts. Calculate CGST, SGST, IGST with accurate GST rates for India.",
    type: "website",
    url: "https://calqulation.com/tool/gst-calculator",
  },
  twitter: {
    card: "summary_large_image",
    title: "GST Calculator - Calculate Goods and Services Tax",
    description:
      "Free GST calculator to calculate tax inclusive and exclusive amounts. Calculate CGST, SGST, IGST with accurate GST rates for India.",
  },
};

export default async function GSTCalculatorPage() {
  const cookieStore = await cookies();
  const isMobileAppCookie = cookieStore.get("is-mobile-app");
  const isMobileApp = isMobileAppCookie?.value === "true";
  return (
    <GSTProvider>
      <div className="bg-gray-200 dark:bg-gray-950 min-h-screen">
        {/* Header */}
        {!isMobileApp && (
          <ToolPageHero
            title="GST Calculator"
            subtitle="Calculate Goods and Services Tax (GST) with ease."
          >
            <Breadcrumb
              items={[
                { label: "Home", href: "/", icon: <HiHome /> },
                { label: "Tools", href: "/tools" },
                {
                  label: "GST Calculator",
                  href: "/tool/gst-calculator",
                },
              ]}
              className="text-gray-300"
            />
          </ToolPageHero>
        )}
        <div className="relative max-w-7xl mx-auto px-0 sm:px-6 lg:px-8 z-10 pt-0 pb-0 sm:pb-8">
          {/* Calculator */}
          <div className="max-w-7xl mx-auto sm:rounded-xl bg-white/20 dark:bg-black/60 backdrop-blur-lg sm:p-1.5">
            <GSTCalculator />
          </div>
        </div>

        {/* Information Section */}
        <div className="bg-white dark:bg-gray-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div >
              <h2 className="text-2xl font-bold text-gray-800 mb-6 dark:text-gray-100">
                About GST Calculator
              </h2>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-3 dark:text-gray-300">
                    What is GST?
                  </h3>
                  <p className="text-gray-600 mb-4 dark:text-gray-300">
                    Goods and Services Tax (GST) is a comprehensive indirect tax
                    levied on manufacture, sale, and consumption of goods and
                    services in India. It replaced multiple indirect taxes and
                    unified the tax structure across the country.
                  </p>

                  <h3 className="text-lg font-semibold text-gray-700 mb-3 dark:text-gray-300">
                    GST Rates in India
                  </h3>
                  <ul className="text-gray-600 space-y-1 dark:text-gray-300">
                    <li>
                      • <strong>0%:</strong> Essential items like books,
                      newspapers
                    </li>
                    <li>
                      • <strong>5%:</strong> Basic necessities like food grains,
                      milk
                    </li>
                    <li>
                      • <strong>12%:</strong> Standard items like mobile phones
                    </li>
                    <li>
                      • <strong>18%:</strong> Most services and products
                    </li>
                    <li>
                      • <strong>28%:</strong> Luxury items like cars, tobacco
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-3 dark:text-gray-300">
                    Types of GST
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-700 dark:text-gray-300">
                        CGST (Central GST)
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Collected by Central Government on intra-state
                        transactions
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-700 dark:text-gray-300">
                        SGST (State GST)
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Collected by State Government on intra-state
                        transactions
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-700 dark:text-gray-300">
                        IGST (Integrated GST)
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300    ">
                        Collected by Central Government on inter-state
                        transactions
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-blue-50 dark:bg-gray-800 rounded-lg">
                    <h4 className="font-medium text-blue-800 mb-2 dark:text-blue-300">
                      How to Use This Calculator
                    </h4>
                    <ol className="text-sm text-blue-700 space-y-1 dark:text-blue-300">
                      <li>1. Enter the amount</li>
                      <li>2. Select GST rate (or enter custom rate)</li>
                      <li>3. Choose calculation type (inclusive/exclusive)</li>
                      <li>4. View detailed GST breakdown</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </GSTProvider>
  );
}
