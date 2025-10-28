import { PageHero } from "@/components/common/PageHero";
import { Metadata } from "next";
import Link from "next/link";
import {
  FaChild,
  FaCookieBite,
  FaDatabase,
  FaGlobeAmericas,
  FaLock,
  FaMobile,
  FaUserShield,
  FaBell,
} from "react-icons/fa";
import { MdEmail, MdSecurity, MdAnalytics, MdGavel } from "react-icons/md";

export const metadata: Metadata = {
  title: "Privacy Policy | Calqulation - How We Protect Your Data",
  description:
    "Learn how Calqulation collects, uses, and protects your personal information when you use our website and mobile app financial calculators and tools.",
  keywords:
    "privacy policy, data protection, financial calculator privacy, personal information, cookie policy, GDPR compliance, mobile app privacy, firebase analytics, notifications, push notifications",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.calqulation.com/privacy-policy",
  },
  openGraph: {
    title: "Privacy Policy | Calqulation - How We Protect Your Data",
    description:
      "Learn how Calqulation collects, uses, and protects your personal information when you use our website and mobile app financial calculators and tools.",
    url: "https://www.calqulation.com/privacy-policy",
    type: "website",
  },
};

export default function PrivacyPolicyPage() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="bg-white dark:bg-gray-950 min-h-screen">
      <PageHero
        title="Privacy Policy"
        subtitle="How Calqulation handles and protects your personal information on our website and mobile app"
        Icon={FaLock}
      />

      {/* Main content section */}
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="space-y-16">
          {/* Introduction Section */}
          <section className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="h-2 bg-gradient-to-r from-blue-500 to-purple-600"></div>
            <div className="p-8">
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4">
                  <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center">
                    <MdSecurity className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    Introduction
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    At Calqulation, we take your privacy seriously. This Privacy
                    Policy explains how we collect, use, disclose, and safeguard
                    your information when you visit our website, use our mobile
                    application, and access our financial calculation tools.
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    Please read this privacy policy carefully. If you do not
                    agree with the terms of this privacy policy, please do not
                    access our website or use our mobile app and calculators.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Information We Collect Section */}
          <section className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="h-2 bg-gradient-to-r from-purple-500 to-blue-600"></div>
            <div className="p-8">
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4">
                  <div className="h-12 w-12 bg-purple-100 dark:bg-purple-900/50 rounded-full flex items-center justify-center">
                    <FaDatabase className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    Information We Collect
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">
                        Information You Provide
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-3">
                        When using our financial calculators on our website or mobile app, you may input
                        information such as loan amounts, interest rates, or
                        other financial data. This information is used solely to
                        perform the calculations you request and is not stored
                        on our servers.
                      </p>
                      <p className="text-gray-600 dark:text-gray-300">
                        When you contact us through our website or app, we may collect your name, email address, and message content to respond to your inquiry.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">
                        Automatically Collected Information
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-3">
                        We may collect certain information automatically when
                        you visit our website or use our mobile app, such as your IP address, device
                        type, browser information, operating system, app version, and how you interact with our
                        services. This information helps us improve our website and app
                        and provide a better user experience.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">
                        Mobile App Information
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-3">
                        Our mobile app displays our website tools through a WebView component. The app may sync theme preferences and currency settings between the app and WebView to provide a consistent user experience.
                      </p>
                      <p className="text-gray-600 dark:text-gray-300 mb-3">
                        The app uses Firebase Analytics to collect usage statistics, crash reports, and performance data to help us improve app functionality and user experience.
                      </p>
                      <p className="text-gray-600 dark:text-gray-300">
                        The app may request notification permissions to send you relevant updates, alerts, and information about our services. You can control notification settings through your device settings at any time.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Cookies Section */}
          <section className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="h-2 bg-gradient-to-r from-emerald-500 to-green-600"></div>
            <div className="p-8">
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4">
                  <div className="h-12 w-12 bg-emerald-100 dark:bg-emerald-900/50 rounded-full flex items-center justify-center">
                    <FaCookieBite className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                  </div>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    Cookies & Technologies
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Our website may use cookies and similar tracking
                    technologies to enhance your user experience. Cookies are
                    small files that a site or its service provider transfers to
                    your computer&apos;s hard drive through your browser that
                    enables the site to recognize your browser and remember
                    certain information.
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    We use cookies to:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300 mb-4">
                    <li>
                      Understand and save user&apos;s preferences for future
                      visits
                    </li>
                    <li>
                      Compile aggregate data about site traffic and site
                      interactions
                    </li>
                    <li>Remember your preferences and settings</li>
                    <li>Provide a more personalized experience</li>
                  </ul>
                  <p className="text-gray-600 dark:text-gray-300">
                    You can choose to have your computer warn you each time a
                    cookie is being sent, or you can choose to turn off all
                    cookies through your browser settings. Since each browser is
                    a little different, look at your browser&apos;s Help Menu to
                    learn the correct way to modify your cookies.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Firebase Analytics Section */}
          <section className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="h-2 bg-gradient-to-r from-indigo-500 to-purple-600"></div>
            <div className="p-8">
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4">
                  <div className="h-12 w-12 bg-indigo-100 dark:bg-indigo-900/50 rounded-full flex items-center justify-center">
                    <MdAnalytics className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                  </div>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    Firebase Analytics
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Our mobile app uses Firebase Analytics, a service provided by Google, to collect anonymous usage data and analytics information. This helps us understand how users interact with our app and improve our services.
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Firebase Analytics may collect information such as:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300 mb-4">
                    <li>App usage patterns and feature interactions</li>
                    <li>Device information (model, OS version, screen size)</li>
                    <li>Crash reports and performance data</li>
                    <li>General location information (country/region level)</li>
                    <li>User engagement metrics</li>
                  </ul>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    This data is anonymized and aggregated. We do not collect personally identifiable information through Firebase Analytics.
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    For more information about Firebase Analytics and how Google processes data, please refer to Google&apos;s Privacy Policy at <a href="https://policies.google.com/privacy" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">https://policies.google.com/privacy</a>.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Notifications Section */}
          <section className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="h-2 bg-gradient-to-r from-green-500 to-blue-500"></div>
            <div className="p-8">
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4">
                  <div className="h-12 w-12 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center">
                    <FaBell className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    Notifications
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Our mobile app may request permission to send you notifications to provide you with relevant updates, alerts, and information about our services. These notifications may include:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300 mb-4">
                    <li>App updates and new feature announcements</li>
                    <li>Important service notifications</li>
                    <li>Educational content about financial planning</li>
                    <li>Technical updates and maintenance notices</li>
                  </ul>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    You have full control over notification settings and can:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300 mb-4">
                    <li>Enable or disable notifications entirely</li>
                    <li>Modify notification settings through your device&apos;s system settings</li>
                    <li>Revoke notification permissions at any time</li>
                  </ul>
                  <p className="text-gray-600 dark:text-gray-300">
                    We respect your preferences and will only send notifications that are relevant to your use of our services. We do not sell or share your notification preferences with third parties.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Advertising Section */}
          <section className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="h-2 bg-gradient-to-r from-orange-500 to-red-500"></div>
            <div className="p-8">
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4">
                  <div className="h-12 w-12 bg-orange-100 dark:bg-orange-900/50 rounded-full flex items-center justify-center">
                    <FaMobile className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                  </div>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    Advertising & Google AdSense
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Our website displays advertisements through Google AdSense to support the continued development and maintenance of our free services. These ads help us keep Calqulation accessible to everyone at no cost.
                  </p>
                  <div className="mb-4">
                    <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">
                      How Google AdSense Works
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-3">
                      Google AdSense is an advertising service provided by Google LLC. It uses cookies and web beacons to serve ads based on your prior visits to our website or other websites on the Internet. Google may collect information such as:
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300 mb-3">
                      <li>Your IP address and device information</li>
                      <li>Browser type and operating system</li>
                      <li>Pages you visit on our website</li>
                      <li>Time and date of your visit</li>
                      <li>Referring website addresses</li>
                    </ul>
                  </div>
                  <div className="mb-4">
                    <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">
                      Personalized Advertising
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-3">
                      Google uses this information to provide personalized advertisements that are more relevant to you. You can opt out of personalized advertising by visiting Google&apos;s <a href="https://www.google.com/settings/ads" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Ads Settings</a>.
                    </p>
                  </div>
                  <div className="mb-4">
                    <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">
                      Third-Party Vendors
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-3">
                      Third-party vendors, including Google, use cookies to serve ads based on your previous visits to our website and other websites. Google&apos;s use of advertising cookies enables it and its partners to serve ads to you based on your visit to our site and/or other sites on the Internet.
                    </p>
                  </div>
                  <div className="mb-4">
                    <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">
                      Your Choices
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-3">
                      You have several options to control advertising:
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300 mb-3">
                      <li>Opt out of personalized advertising through <a href="https://www.google.com/settings/ads" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Google Ads Settings</a></li>
                      <li>Use browser settings to block or delete cookies</li>
                      <li>Visit <a href="http://www.aboutads.info/choices/" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">aboutads.info</a> to opt out of interest-based advertising</li>
                      <li>Visit <a href="http://optout.networkadvertising.org/" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Network Advertising Initiative</a> for more opt-out options</li>
                    </ul>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    For more information about how Google uses data when you use our website, please visit <a href="https://policies.google.com/technologies/partner-sites" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">How Google uses information from sites or apps that use our services</a>.
                  </p>
                  <div className="mt-4">
                    <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">
                      Mobile App Advertising
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Currently, our mobile app does not display advertisements. However, we may introduce Google AdMob advertising in future updates. If we do, we will update this Privacy Policy and notify users through app updates.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* How We Use Your Information Section */}
          <section className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="h-2 bg-gradient-to-r from-amber-500 to-orange-500"></div>
            <div className="p-8">
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4">
                  <div className="h-12 w-12 bg-amber-100 dark:bg-amber-900/50 rounded-full flex items-center justify-center">
                    <FaUserShield className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                  </div>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    How We Use Your Information
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    We may use the information we collect from you when you use our website or mobile app in the
                    following ways:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300">
                    <li>To provide, operate, and maintain our website and mobile app</li>
                    <li>To improve our website and app to better serve you</li>
                    <li>To understand and analyze how you use our website and mobile app</li>
                    <li>To develop new features, products, and services</li>
                    <li>To synchronize preferences (such as theme and currency settings) between our website and mobile app</li>
                    <li>To send you notifications about app updates, new features, and relevant information (mobile app only)</li>
                    <li>
                      To monitor and analyze usage and trends to improve your
                      experience with our services
                    </li>
                    <li>To send you technical notices and security updates</li>
                    <li>To respond to your inquiries and provide customer support</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Third-Party Disclosure Section */}
          <section className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="h-2 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
            <div className="p-8">
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4">
                  <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center">
                    <FaGlobeAmericas className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    Third-Party Disclosure
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    We do not sell, trade, or otherwise transfer your personal
                    information to outside parties unless we provide users with
                    advance notice. This does not include website hosting
                    partners and other parties who assist us in operating our
                    website, conducting our business, or serving our users, so
                    long as those parties agree to keep this information
                    confidential.
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    We may also release information when its release is
                    appropriate to comply with the law, enforce our site
                    policies, or protect our or others&apos; rights, property,
                    or safety.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Children's Information Section */}
          <section className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="h-2 bg-gradient-to-r from-pink-500 to-purple-600"></div>
            <div className="p-8">
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4">
                  <div className="h-12 w-12 bg-pink-100 dark:bg-pink-900/50 rounded-full flex items-center justify-center">
                    <FaChild className="h-6 w-6 text-pink-600 dark:text-pink-400" />
                  </div>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    Children&apos;s Information
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Our website and services are not intended for children under
                    the age of 13. We do not knowingly collect personal
                    information from children under 13. If you are a parent or
                    guardian and you are aware that your child has provided us
                    with personal information, please contact us so that we can
                    take necessary actions.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* US Export Law Compliance Section */}
          <section className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="h-2 bg-gradient-to-r from-red-500 to-orange-500"></div>
            <div className="p-8">
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4">
                  <div className="h-12 w-12 bg-red-100 dark:bg-red-900/50 rounded-full flex items-center justify-center">
                    <MdGavel className="h-6 w-6 text-red-600 dark:text-red-400" />
                  </div>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    US Export Law Compliance
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Our mobile application and services comply with applicable US export control laws and regulations, including the Export Administration Regulations (EAR) and the International Traffic in Arms Regulations (ITAR).
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Our financial calculation tools are designed for general commercial use and do not contain encryption or technology that would require export licenses. The app provides standard financial calculations and does not involve sensitive technologies subject to export restrictions.
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    By using our services, you acknowledge that you will not use our application in violation of any applicable export control laws or regulations.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Changes To This Policy Section */}
          <section className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="h-2 bg-gradient-to-r from-blue-500 to-purple-600"></div>
            <div className="p-8">
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4">
                  <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center">
                    <MdSecurity className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    Changes To This Privacy Policy
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    We may update our Privacy Policy from time to time. We will
                    notify you of any changes by posting the new Privacy Policy
                    on this page and updating the &quot;Last Updated&quot; date.
                    For mobile app users, we may also notify you through app updates.
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    You are advised to review this Privacy Policy periodically
                    for any changes. Changes to this Privacy Policy are
                    effective when they are posted on this page. This Privacy
                    Policy was last updated on July 17, {currentYear}.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl overflow-hidden shadow-xl text-white p-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
              <p className="mb-6">
                If you have any questions about this Privacy Policy, please
                contact us:
              </p>
              <div className="inline-flex items-center justify-center px-6 py-4 border border-white/20 bg-white/10 backdrop-blur-sm rounded-xl text-base font-medium shadow-sm text-white">
                <MdEmail className="mr-2 h-5 w-5" />
                <Link href="/contact" className="hover:underline">
                  Contact Us
                </Link>
              </div>
            </div>
          </section>

          {/* Last updated timestamp */}
          <section className="mt-8 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              This Privacy Policy was last updated on July 17, {currentYear}
            </p>
          </section>

          {/* SEO-friendly footer links */}
          <section className="mt-8">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              <p className="mb-4">Related Information:</p>
              <div className="flex flex-wrap gap-4 justify-center">
                <a
                  href="/terms-of-service"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Terms of Service
                </a>
                <a
                  href="/disclaimer"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Disclaimer
                </a>
                <a
                  href="/about-us"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  About Us
                </a>
                <a
                  href="/tool/loan-calculator"
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
            name: "Privacy Policy | Calqulation - How We Protect Your Data",
            description:
              "Learn how Calqulation collects, uses, and protects your personal information when you use our website and mobile app financial calculators and tools.",
            publisher: {
              "@type": "Organization",
              name: "Calqulation",
              logo: "https://www.calqulation.com/Calqulation.png",
            },
            datePublished: "2025-01-01",
            dateModified: `2025-07-17`,
          }),
        }}
      />
    </div>
  );
}
