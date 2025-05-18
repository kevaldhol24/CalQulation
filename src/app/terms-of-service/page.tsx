import {
  FaHandshake,
  FaUserShield,
  FaBalanceScale,
  FaFileContract,
  FaGavel,
} from "react-icons/fa";
import {
  MdSecurity,
  MdPeopleAlt,
  MdComputer,
  MdOutlineWarning,
  MdEmail,
} from "react-icons/md";
import { HiOutlineDocumentText } from "react-icons/hi";
import Link from "next/link";
import { WaveSeparator } from "@/components/layout/WaveSeparator";

export const metadata = {
  title: "Terms of Service | Calqulation - User Agreement",
  description:
    "Terms and conditions for using Calqulation's financial calculators and services. Learn about your rights and responsibilities when using our tools.",
  keywords:
    "terms of service, user agreement, financial calculator terms, legal terms, Calqulation terms, financial tools terms and conditions",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Terms of Service | Calqulation - User Agreement",
    description:
      "Terms and conditions for using Calqulation's financial calculators and services. Learn about your rights and responsibilities when using our tools.",
    url: "https://www.calqulation.com/terms-of-service",
    type: "website",
  },
  alternates: {
    canonical: "https://www.calqulation.com/terms-of-service",
  },
};

export default function TermsOfServicePage() {
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
              <FaHandshake className="text-white text-3xl" />
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
              <span className="inline-block bg-gradient-to-r from-white via-blue-200 to-white bg-clip-text text-transparent">
                Terms of Service
              </span>
            </h1>
            <p className="text-lg text-blue-100 max-w-2xl mx-auto leading-relaxed">
              Our agreement with you when using Calqulation&apos;s tools and
              services
            </p>
          </div>
        </div>

        <WaveSeparator />
      </div>

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
                    <HiOutlineDocumentText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    Welcome to Calqulation
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    These Terms of Service govern your relationship with
                    Calqulation and your use of our website, calculators, tools,
                    and services. We&apos;ve tried to make them as
                    straightforward as possible.
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    By using our website and tools, you&apos;re agreeing to
                    these terms. If you don&apos;t agree with them, please
                    don&apos;t use our services. These terms were last updated
                    on May 11, 2025.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Using Our Services Section */}
          <section className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="h-2 bg-gradient-to-r from-purple-500 to-blue-600"></div>
            <div className="p-8">
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4">
                  <div className="h-12 w-12 bg-purple-100 dark:bg-purple-900/50 rounded-full flex items-center justify-center">
                    <MdComputer className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    Using Our Services
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Calqulation provides financial calculators and tools
                    designed to help you understand various financial concepts
                    and make more informed decisions. We&apos;re here to provide
                    information, not financial advice.
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Our tools are designed to be used by individuals who are
                    looking to better understand their financial options. While
                    we strive for accuracy, our calculators provide estimates
                    based on the information you input, and real-world outcomes
                    may differ.
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    You agree to use our services for their intended purpose and
                    in a lawful manner that doesn&apos;t infringe on the rights
                    of others or restrict anyone else&apos;s ability to use and
                    enjoy our services.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Not Financial Advice Section */}
          <section className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="h-2 bg-gradient-to-r from-emerald-500 to-green-600"></div>
            <div className="p-8">
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4">
                  <div className="h-12 w-12 bg-emerald-100 dark:bg-emerald-900/50 rounded-full flex items-center justify-center">
                    <MdOutlineWarning className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                  </div>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    Not Financial Advice
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    The calculations, information, and resources provided
                    through our calculators and website are for educational and
                    informational purposes only. They&apos;re not intended to
                    be, and should not be considered as financial, investment,
                    legal, or tax advice.
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Before making any financial decisions, we strongly encourage
                    you to consult with qualified financial professionals who
                    can provide personalized advice based on your specific
                    circumstances and needs.
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    Financial decisions should be made after careful
                    consideration of your goals, risk tolerance, and personal
                    financial situation—not solely based on calculator results
                    or information found on our website.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Intellectual Property Section */}
          <section className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="h-2 bg-gradient-to-r from-amber-500 to-orange-500"></div>
            <div className="p-8">
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4">
                  <div className="h-12 w-12 bg-amber-100 dark:bg-amber-900/50 rounded-full flex items-center justify-center">
                    <FaFileContract className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                  </div>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    Intellectual Property
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    All content on our website—including our calculators,
                    designs, text, graphics, logos, and code—is owned by
                    Calqulation and is protected by intellectual property laws.
                    We&apos;ve put a lot of work into creating these tools, and
                    we&apos;re proud of them.
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    You are welcome to use our calculators for personal use, but
                    you may not modify, copy, reproduce, republish, upload,
                    post, transmit, translate, sell, license, or exploit any
                    content on our site for commercial purposes without our
                    explicit permission.
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    If you&apos;d like to use our content or tools in ways not
                    permitted by these terms, please reach out to us. We&apos;re
                    open to discussing potential collaborations or licensing
                    arrangements.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Your Privacy Section */}
          <section className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="h-2 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
            <div className="p-8">
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4">
                  <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center">
                    <FaUserShield className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    Your Privacy
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    We take your privacy seriously. The financial information
                    you enter into our calculators is processed locally in your
                    browser and is not stored on our servers. We believe your
                    financial information should remain private and secure.
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    We do collect some non-personal information about how you
                    use our website, such as your IP address and browser
                    information, which helps us improve our services.
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    For more details about what information we collect and how
                    we use it, please see our{" "}
                    <Link
                      href="/privacy-policy"
                      className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      Privacy Policy
                    </Link>
                    .
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Third-Party Links Section */}
          <section className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="h-2 bg-gradient-to-r from-pink-500 to-purple-600"></div>
            <div className="p-8">
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4">
                  <div className="h-12 w-12 bg-pink-100 dark:bg-pink-900/50 rounded-full flex items-center justify-center">
                    <MdPeopleAlt className="h-6 w-6 text-pink-600 dark:text-pink-400" />
                  </div>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    Third-Party Links & Services
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Our website may contain links to other websites and services
                    that we don&apos;t own or control. We&apos;re not
                    responsible for the content or practices of any third-party
                    websites or services linked to from our site.
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    These links are provided for your convenience and do not
                    signify our endorsement of these sites or their content. We
                    encourage you to review the terms and privacy policies of
                    any third-party sites you visit.
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    If you find a link on our website that you believe is
                    inappropriate or harmful, please let us know, and we&apos;ll
                    review it.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Limitation of Liability Section */}
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
                    Limitation of Liability
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    While we strive to provide accurate and useful tools, we
                    provide our services &quot;as is&quot; without any warranty
                    or guarantee. We cannot guarantee that our calculators will
                    always be error-free or that our website will always be
                    available.
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    To the maximum extent permitted by law, Calqulation and our
                    team will not be liable for any direct, indirect,
                    incidental, special, or consequential damages arising from
                    your use of our services or any errors in the calculations
                    provided.
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    This includes, but is not limited to, financial losses or
                    damages resulting from reliance on information obtained
                    through our website or calculators.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Changes to Terms Section */}
          <section className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="h-2 bg-gradient-to-r from-indigo-500 to-blue-600"></div>
            <div className="p-8">
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4">
                  <div className="h-12 w-12 bg-indigo-100 dark:bg-indigo-900/50 rounded-full flex items-center justify-center">
                    <MdSecurity className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                  </div>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    Changes to These Terms
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    We may update these Terms of Service from time to time to
                    reflect changes in our practices, services, or legal
                    requirements. When we make significant changes, we&apos;ll
                    notify you by posting the updated terms on our website with
                    a new effective date.
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Your continued use of our website after such changes
                    constitutes your acceptance of the new terms. We encourage
                    you to review these terms periodically to stay informed
                    about how we are protecting and managing our relationship
                    with you.
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    If you don&apos;t agree with the revised terms, please
                    discontinue using our services.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Governing Law Section */}
          <section className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="h-2 bg-gradient-to-r from-emerald-500 to-green-600"></div>
            <div className="p-8">
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4">
                  <div className="h-12 w-12 bg-emerald-100 dark:bg-emerald-900/50 rounded-full flex items-center justify-center">
                    <FaGavel className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                  </div>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    Governing Law
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300">
                    These Terms of Service shall be governed by and construed in
                    accordance with applicable laws, without regard to conflicts
                    of law principles. Any disputes arising under or in
                    connection with these Terms shall be subject to the
                    exclusive jurisdiction of the courts in the applicable
                    jurisdiction.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl overflow-hidden shadow-xl text-white p-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">
                Questions About Our Terms?
              </h2>
              <p className="mb-6">
                If you have any questions, concerns, or feedback about these
                Terms of Service, please contact us:
              </p>
              <div className="inline-flex items-center justify-center px-6 py-4 border border-white/20 bg-white/10 backdrop-blur-sm rounded-xl text-base font-medium shadow-sm text-white">
                <MdEmail className="mr-2 h-5 w-5" />
                <Link href="/contact" className="hover:underline">
                  Contact Us
                </Link>
              </div>
            </div>
          </section>

          {/* Last updated section */}
          <section className="mt-8 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              These Terms of Service were last updated on May 11, 2025
            </p>
          </section>

          {/* SEO-friendly footer links */}
          <section className="mt-8">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              <p className="mb-4">Related Information:</p>
              <div className="flex flex-wrap gap-4 justify-center">
                <a
                  href="/privacy-policy"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Privacy Policy
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
            name: "Terms of Service | Calqulation - User Agreement",
            description:
              "Terms and conditions for using Calqulation's financial calculators and services.",
            publisher: {
              "@type": "Organization",
              name: "Calqulation",
              logo: "https://www.calqulation.com/Calqulation.png",
            },
            datePublished: "2025-01-01",
            dateModified: "2025-05-11",
            inLanguage: "en-US",
          }),
        }}
      />
    </div>
  );
}
