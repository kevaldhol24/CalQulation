import { PageHero } from "@/components/common/PageHero";
import ModernDeviceShowcase from "@/components/ui/ScreenshotCarousel";
import { Metadata } from "next";
import { AiFillThunderbolt } from "react-icons/ai";
import { BsGraphUp } from "react-icons/bs";
import {
  FaAndroid,
  FaApple,
  FaCalculator,
  FaChartBar,
  FaChartLine,
  FaDesktop,
  FaGooglePlay,
  FaLightbulb,
  FaMobile,
  FaMobileAlt,
  FaRocket,
  FaShieldAlt,
  FaSync,
  FaTools,
} from "react-icons/fa";
import { IoShieldCheckmarkSharp } from "react-icons/io5";
import {
  MdAnalytics,
  MdCalculate,
  MdDarkMode,
  MdLanguage,
  MdNotifications,
  MdSecurity,
  MdSpeed,
} from "react-icons/md";

export const metadata: Metadata = {
  title: "Mobile App | Calqulation - Financial Calculators on the Go",
  description:
    "Download the Calqulation mobile app for Android and iOS. Access all financial calculators offline with seamless WebView integration, dark mode, and currency synchronization.",
  keywords:
    "Calqulation mobile app, financial calculator app, android app, iOS app, offline calculators, mobile finance tools, EMI calculator app, SIP calculator app, loan calculator mobile",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.calqulation.com/mobile-app",
  },
  openGraph: {
    title: "Mobile App | Calqulation - Financial Calculators on the Go",
    description:
      "Download the Calqulation mobile app for Android and iOS. Access all financial calculators offline with seamless WebView integration, dark mode, and currency synchronization.",
    url: "https://www.calqulation.com/mobile-app",
    type: "website",
    images: [
      {
        url: "/Calqulation1.png",
        width: 1200,
        height: 630,
        alt: "Calqulation Mobile App",
      },
    ],
  },
};

export default function MobileAppPage() {
  return (
    <div className="bg-white dark:bg-gray-950 min-h-screen">
      <PageHero
        title="Get Calqulation Mobile App"
        subtitle="Your favorite financial calculators now available on mobile with enhanced features and offline access"
        Icon={FaMobileAlt}
      >
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">
            <FaAndroid className="mr-2" /> Android
          </span>
          <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100">
            <AiFillThunderbolt className="mr-2" /> Fast results
          </span>
          <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
            <IoShieldCheckmarkSharp className="mr-2" /> Accurate
          </span>
        </div>
      </PageHero>

      {/* Main content section */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="space-y-20">
          {/* App Preview Section */}
          <section className="relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <ModernDeviceShowcase />
              </div>

              <div className="order-1 lg:order-2">
                <div className="space-y-6">
                  <div className="inline-flex items-center px-4 py-2 rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100 text-sm font-medium">
                    <FaMobile className="mr-2" />
                    Coming Soon
                  </div>

                  <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
                    All Your Financial Tools
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                      In Your Pocket
                    </span>
                  </h2>

                  <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                    Experience the power of Calqulation&apos;s financial
                    calculators on your mobile device. Our app brings all your
                    favorite tools with enhanced mobile features, beautiful
                    interfaces, and seamless performance. See different
                    calculators in action with our modern showcase.
                  </p>

                  {/* Download buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <div className="relative">
                      <div className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-gradient-to-r from-gray-400 to-gray-500 shadow-lg cursor-not-allowed opacity-75">
                        <FaGooglePlay className="mr-2" />
                        Google Play - Coming Soon
                      </div>
                      <div className="absolute -top-2 -right-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                        In Review
                      </div>
                    </div>
                    <div className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-base font-medium rounded-xl text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 cursor-not-allowed opacity-75">
                      <FaApple className="mr-2" />
                      App Store - Coming Soon
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Features Grid */}
          <section>
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Why Choose Our Mobile App?
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 dark:border-gray-700">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                  <FaCalculator className="text-white text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  All-in-One Calculator Suite
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Access all your favorite financial calculators in one
                  convenient mobile app with real-time calculations.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 dark:border-gray-700">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                  <FaSync className="text-white text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Seamless Sync
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Theme and currency preferences sync automatically between web
                  and mobile app for consistent experience.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 dark:border-gray-700">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                  <MdSpeed className="text-white text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Lightning Fast
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Optimized for mobile performance with instant calculations and
                  smooth user experience.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 dark:border-gray-700">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                  <MdNotifications className="text-white text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Smart Notifications
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Get notified about new features, updates, and financial tips
                  to stay informed.
                </p>
              </div>

              {/* Feature 5 */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 dark:border-gray-700">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                  <MdDarkMode className="text-white text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Dark Mode
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Eye-friendly dark mode that automatically adapts to your
                  system preferences.
                </p>
              </div>

              {/* Feature 6 */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 dark:border-gray-700">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                  <MdLanguage className="text-white text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Multi-Currency
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Support for multiple currencies with real-time conversion and
                  regional formatting.
                </p>
              </div>
            </div>
          </section>


          {/* How It Works Section */}
          <section className="bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900/20 rounded-3xl p-8 lg:p-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                How It Works
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Simple steps to get started with our mobile app
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Step 1 */}
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <span className="text-white text-2xl font-bold">1</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Download App
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Get the Calqulation app from Google Play Store (coming soon -
                  currently in review)
                </p>
              </div>

              {/* Step 2 */}
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <span className="text-white text-2xl font-bold">2</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Open & Explore
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Launch the app and explore all financial calculators with
                  enhanced mobile features
                </p>
              </div>

              {/* Step 3 */}
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <span className="text-white text-2xl font-bold">3</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Calculate & Plan
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Use any calculator offline and make informed financial
                  decisions on the go
                </p>
              </div>
            </div>
          </section>

          {/* Available Tools Section */}
          <section>
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                All Tools Available in App
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Access every financial calculator from our website, optimized
                for mobile
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Tool cards */}
              {[
                {
                  name: "EMI Calculator",
                  icon: FaCalculator,
                  color: "from-blue-500 to-purple-600",
                },
                {
                  name: "SIP Calculator",
                  icon: FaChartLine,
                  color: "from-green-500 to-emerald-600",
                },
                {
                  name: "Lumpsum Calculator",
                  icon: BsGraphUp,
                  color: "from-orange-500 to-red-600",
                },
                {
                  name: "Loan Comparison",
                  icon: FaChartBar,
                  color: "from-purple-500 to-pink-600",
                },
                {
                  name: "FD Calculator",
                  icon: MdCalculate,
                  color: "from-indigo-500 to-blue-600",
                },
                {
                  name: "RD Calculator",
                  icon: MdAnalytics,
                  color: "from-emerald-500 to-green-600",
                },
                {
                  name: "GST Calculator",
                  icon: FaTools,
                  color: "from-yellow-500 to-orange-600",
                },
                {
                  name: "Goal SIP",
                  icon: FaLightbulb,
                  color: "from-pink-500 to-purple-600",
                },
              ].map((tool, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 dark:border-gray-700"
                >
                  <div
                    className={`w-12 h-12 bg-gradient-to-br ${tool.color} rounded-xl flex items-center justify-center mb-4 shadow-md`}
                  >
                    <tool.icon className="text-white text-xl" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {tool.name}
                  </h3>
                </div>
              ))}
            </div>
          </section>

          {/* Tech Stack Section */}
          <section className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 lg:p-12 text-white">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                Built with Modern Technology
              </h2>
              <p className="text-lg text-blue-100">
                Our app uses cutting-edge technology for the best user
                experience
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Tech 1 */}
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <FaDesktop className="text-2xl" />
                </div>
                <h3 className="text-xl font-bold mb-4">Cross-Platform</h3>
                <p className="text-blue-100">
                  Seamless experience across mobile and web platforms with
                  synchronized preferences
                </p>
              </div>

              {/* Tech 2 */}
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <MdSecurity className="text-2xl" />
                </div>
                <h3 className="text-xl font-bold mb-4">Privacy First</h3>
                <p className="text-blue-100">
                  Your data stays on your device with enterprise-grade security
                </p>
              </div>

              {/* Tech 3 */}
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <FaRocket className="text-2xl" />
                </div>
                <h3 className="text-xl font-bold mb-4">
                  Optimized Performance
                </h3>
                <p className="text-blue-100">
                  Lightning-fast calculations with smooth animations and
                  interactions
                </p>
              </div>
            </div>
          </section>

          {/* User Reviews Section - Hidden until app is published */}
          {/* <section>
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                What Users Are Saying
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <!-- Review components will be shown after app launch -->
            </div>
          </section> */}

          {/* Final CTA Section */}
          <section className="text-center">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 lg:p-12 text-white">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold mb-4">
                  Ready to Take Your Financial Planning Mobile?
                </h2>
                <p className="text-lg text-blue-100 mb-8">
                  Get ready to experience Calqulation on your mobile device. Our
                  app is currently in review and will be available soon on
                  Google Play Store.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <div className="relative">
                    <div className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-lg font-medium rounded-xl text-white bg-transparent opacity-75 cursor-not-allowed">
                      <FaGooglePlay className="mr-3 text-xl" />
                      Google Play - Coming Soon
                    </div>
                    <div className="absolute -top-3 -right-3 bg-yellow-500 text-white text-xs px-3 py-1 rounded-full font-medium">
                      In Review
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex items-center justify-center gap-6 text-blue-100">
                  <div className="flex items-center gap-2">
                    <FaShieldAlt className="text-lg" />
                    <span className="text-sm">100% Secure</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaCalculator className="text-lg" />
                    <span className="text-sm">All Financial Tools</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaMobileAlt className="text-lg" />
                    <span className="text-sm">Mobile Optimized</span>
                  </div>
                </div>
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
            "@type": "MobileApplication",
            name: "Calqulation",
            description:
              "Financial calculator mobile app with real-time calculations, dark mode, and currency synchronization. Internet connection required.",
            applicationCategory: "FinanceApplication",
            operatingSystem: ["Android"],
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
              availability: "http://schema.org/PreOrder",
            },
            screenshot: "/Calqulation1.png",
            author: {
              "@type": "Organization",
              name: "Calqulation",
            },
            version: "1.0.0",
          }),
        }}
      />
    </div>
  );
}
