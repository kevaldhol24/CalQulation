import { PageHero } from "@/components/common/PageHero";
import { Metadata } from "next";
import Link from "next/link";
import {
  FaChild,
  FaCookieBite,
  FaDatabase,
  FaGlobeAmericas,
  FaLock,
  FaUserShield,
} from "react-icons/fa";
import { MdEmail, MdSecurity } from "react-icons/md";

export const metadata: Metadata = {
  title: "Privacy Policy | Calqulation - How We Protect Your Data",
  description:
    "Learn how Calqulation collects, uses, and protects your personal information when you use our financial calculators and tools.",
  keywords:
    "privacy policy, data protection, financial calculator privacy, personal information, cookie policy, GDPR compliance",
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
      "Learn how Calqulation collects, uses, and protects your personal information when you use our financial calculators and tools.",
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
        subtitle="How Calqulation handles and protects your personal information"
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
                    your information when you visit our website and use our
                    financial calculation tools.
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    Please read this privacy policy carefully. If you do not
                    agree with the terms of this privacy policy, please do not
                    access the site or use our calculators.
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
                      <p className="text-gray-600 dark:text-gray-300">
                        When using our financial calculators, you may input
                        information such as loan amounts, interest rates, or
                        other financial data. This information is used solely to
                        perform the calculations you request and is not stored
                        on our servers.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">
                        Automatically Collected Information
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        We may collect certain information automatically when
                        you visit our website, such as your IP address, device
                        type, browser information, and how you interact with our
                        website. This information helps us improve our website
                        and provide a better user experience.
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
                    We may use the information we collect from you in the
                    following ways:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300">
                    <li>To provide, operate, and maintain our website</li>
                    <li>To improve our website to better serve you</li>
                    <li>To understand and analyze how you use our website</li>
                    <li>To develop new features, products, and services</li>
                    <li>
                      To monitor and analyze usage and trends to improve your
                      experience with our website
                    </li>
                    <li>To send you technical notices and security updates</li>
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
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    You are advised to review this Privacy Policy periodically
                    for any changes. Changes to this Privacy Policy are
                    effective when they are posted on this page. This Privacy
                    Policy was last updated on May 11, {currentYear}.
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
              This Privacy Policy was last updated on May 11, {currentYear}
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
            name: "Privacy Policy | Calqulation - How We Protect Your Data",
            description:
              "Learn how Calqulation collects, uses, and protects your personal information when you use our financial calculators and tools.",
            publisher: {
              "@type": "Organization",
              name: "Calqulation",
              logo: "https://www.calqulation.com/Calqulation.png",
            },
            datePublished: "2025-01-01",
            dateModified: `2025-05-11`,
          }),
        }}
      />
    </div>
  );
}
