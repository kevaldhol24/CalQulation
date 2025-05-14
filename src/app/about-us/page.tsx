import { FaLightbulb, FaUsers, FaChartLine, FaCode } from "react-icons/fa";
import {
  MdPrecisionManufacturing,
  MdAccessibility,
  MdSecurity,
  MdEmail,
} from "react-icons/md";
import { HiOutlineMail } from "react-icons/hi";
import Image from "next/image";
import Link from "next/link";
import { WaveSeparator } from "@/components/layout/WaveSeparator";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Calqulation - Making Financial Decisions Simple",
  description:
    "Learn about Calqulation's mission to simplify financial decisions through interactive calculators and educational tools. Meet our team and discover our values.",
  keywords:
    "Calqulation, financial calculators, financial tools, financial decisions, financial planning, about us, company mission, finance team",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "About Us | Calqulation - Making Financial Decisions Simple",
    description:
      "Learn about Calqulation's mission to simplify financial decisions through interactive calculators and educational tools.",
    url: "https://calqulation.com/about-us",
    type: "website",
    images: [
      {
        url: "/Calqulation.png",
        width: 1200,
        height: 630,
        alt: "Calqulation Team",
      },
    ],
  },
};

export default function AboutUsPage() {
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
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
              <span className="inline-block bg-gradient-to-r from-white via-blue-200 to-white bg-clip-text text-transparent">
                About Calqulation
              </span>
            </h1>
            <p className="text-lg text-blue-100 max-w-2xl mx-auto leading-relaxed">
              Making complex financial decisions simple through interactive
              calculators and educational tools
            </p>
          </div>
        </div>

        <WaveSeparator />
      </div>

      {/* Main content section */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Our Story Section */}
        <section className="mb-20">
          <div className="mx-auto max-w-3xl text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Our Story
            </h2>
            <div className="mt-2 h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 opacity-20 blur-3xl"></div>
              <div className="relative overflow-hidden rounded-lg">
                <Image
                  src="/Financial-planning.svg"
                  alt="Financial planning illustration"
                  width={400}
                  height={320}
                  className="w-full h-auto rounded-lg transform transition-all duration-500 hover:scale-105"
                />
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Simplifying Financial Complexity
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Calqulation was born from a simple observation: financial
                decisions shouldn&apos;t be intimidating. In 2023, our founder
                was struggling to understand the implications of different
                mortgage options and couldn&apos;t find tools that were both
                comprehensive and easy to use.
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                That frustration sparked an idea: what if there were calculators
                that not only showed the numbers but explained what they meant?
                Tools that visualized the impact of financial decisions and
                empowered people to make confident choices?
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                Today, Calqulation offers a growing suite of interactive
                financial tools designed with clarity, accuracy, and education
                in mind. We&apos;re dedicated to demystifying financial concepts
                and helping people understand the numbers that shape their
                financial future.
              </p>
            </div>
          </div>
        </section>

        {/* Our Mission Section */}
        <section className="mb-20">
          <div className="mx-auto max-w-3xl text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Our Mission
            </h2>
            <div className="mt-2 h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="h-2 bg-gradient-to-r from-blue-500 to-purple-600"></div>
            <div className="p-8 md:p-12">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center p-3 bg-blue-100 dark:bg-blue-900/50 rounded-full mb-4">
                  <FaLightbulb className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Empowering Financial Literacy
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-center max-w-3xl mx-auto leading-relaxed">
                We believe that understanding your finances is a fundamental
                right, not a privilege. Our mission is to democratize financial
                literacy by providing free, accessible tools that help people
                visualize, understand, and optimize their financial decisions.
                We&apos;re committed to transparency, accuracy, and putting
                users first – creating a world where everyone can approach
                financial decisions with confidence and clarity.
              </p>
            </div>
          </div>
        </section>

        {/* Our Values Section */}
        <section className="mb-20">
          <div className="mx-auto max-w-3xl text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Our Values
            </h2>
            <div className="mt-2 h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Value 1 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="h-2 bg-gradient-to-r from-purple-500 to-blue-600"></div>
              <div className="p-6">
                <div className="flex items-center justify-center h-12 w-12 bg-purple-100 dark:bg-purple-900/50 rounded-full mx-auto mb-4">
                  <MdAccessibility className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white text-center mb-4">
                  Accessibility
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-center">
                  We design our tools to be intuitive and usable by everyone,
                  regardless of their financial background or expertise.
                </p>
              </div>
            </div>

            {/* Value 2 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="h-2 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
              <div className="p-6">
                <div className="flex items-center justify-center h-12 w-12 bg-blue-100 dark:bg-blue-900/50 rounded-full mx-auto mb-4">
                  <MdPrecisionManufacturing className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white text-center mb-4">
                  Precision
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-center">
                  We&apos;re committed to accuracy in our calculations and
                  transparency in our methodologies, so you can trust the
                  numbers.
                </p>
              </div>
            </div>

            {/* Value 3 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="h-2 bg-gradient-to-r from-emerald-500 to-green-600"></div>
              <div className="p-6">
                <div className="flex items-center justify-center h-12 w-12 bg-emerald-100 dark:bg-emerald-900/50 rounded-full mx-auto mb-4">
                  <FaUsers className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white text-center mb-4">
                  User-Centric
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-center">
                  Every feature we build starts with understanding user needs
                  and designing for real-world financial scenarios.
                </p>
              </div>
            </div>

            {/* Value 4 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="h-2 bg-gradient-to-r from-amber-500 to-orange-500"></div>
              <div className="p-6">
                <div className="flex items-center justify-center h-12 w-12 bg-amber-100 dark:bg-amber-900/50 rounded-full mx-auto mb-4">
                  <MdSecurity className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white text-center mb-4">
                  Privacy-First
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-center">
                  Your financial data stays in your browser—we design our
                  calculators to process information locally without storing
                  sensitive details.
                </p>
              </div>
            </div>

            {/* Value 5 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="h-2 bg-gradient-to-r from-pink-500 to-purple-600"></div>
              <div className="p-6">
                <div className="flex items-center justify-center h-12 w-12 bg-pink-100 dark:bg-pink-900/50 rounded-full mx-auto mb-4">
                  <FaChartLine className="h-6 w-6 text-pink-600 dark:text-pink-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white text-center mb-4">
                  Visualization
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-center">
                  We believe in the power of visual learning, turning abstract
                  numbers into meaningful charts and graphs.
                </p>
              </div>
            </div>

            {/* Value 6 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="h-2 bg-gradient-to-r from-indigo-500 to-blue-600"></div>
              <div className="p-6">
                <div className="flex items-center justify-center h-12 w-12 bg-indigo-100 dark:bg-indigo-900/50 rounded-full mx-auto mb-4">
                  <FaCode className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white text-center mb-4">
                  Innovation
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-center">
                  We continuously improve our tools with new features, better
                  visualizations, and more intuitive interfaces.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Tools Section */}
        <section className="mb-20">
          <div className="mx-auto max-w-3xl text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Our Tools
            </h2>
            <div className="mt-2 h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-300">
              Designed to simplify complex financial decisions through
              interactive visualizations and detailed breakdowns.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* EMI Calculator */}
            <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700 group">
              <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-90"></div>
                <div className="absolute inset-0 bg-[url('/globe.svg')] bg-no-repeat bg-center opacity-20"></div>
                <div className="relative h-full flex items-center justify-center p-6">
                  <h3 className="text-2xl font-bold text-white text-center">
                    EMI Calculator
                  </h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Our most comprehensive loan calculator helps you understand
                  your monthly payments, total interest, and how extra payments
                  or interest rate changes affect your loan over time.
                </p>
                <div className="flex justify-center">
                  <Link
                    href="/tool/emi-calculator"
                    className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
                  >
                    Try Calculator
                  </Link>
                </div>
              </div>
            </div>

            {/* Coming Soon */}
            <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700 group">
              <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-600 to-gray-800 opacity-90"></div>
                <div className="absolute inset-0 bg-[url('/file.svg')] bg-no-repeat bg-center opacity-20"></div>
                <div className="relative h-full flex flex-col items-center justify-center p-6">
                  <span className="text-xs font-semibold inline-block py-1 px-2 rounded-full bg-white/20 text-white uppercase tracking-wide mb-2">
                    Coming Soon
                  </span>
                  <h3 className="text-2xl font-bold text-white text-center">
                    More Financial Calculators
                  </h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  We&apos;re working on expanding our suite of calculators to
                  cover more financial scenarios, including retirement planning,
                  investment returns, and mortgage comparisons.
                </p>
                <div className="flex justify-center">
                  <button
                    disabled
                    className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-gradient-to-r from-gray-400 to-gray-500 opacity-70 cursor-not-allowed"
                  >
                    Stay Tuned
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* The Team Section */}
        <section className="mb-20">
          <div className="mx-auto max-w-3xl text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              The Team
            </h2>
            <div className="mt-2 h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-300">
              Meet the people behind Calqulation&apos;s mission to simplify
              financial decisions.
            </p>
          </div>

          <div className="flex justify-center flex-col md:flex-row gap-8">
            {/* Team Member 1 */}
            <div className="w-full md:w-1/3 bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-xl">
              <div className="h-2 bg-gradient-to-r from-blue-500 to-purple-600"></div>
              <div className="p-6 text-center">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 mx-auto mb-4 flex items-center justify-center text-white text-3xl font-bold">
                  <Image
                    src="/Images/keval_dhol.png"
                    alt="Keval Dhol"
                    width={96}
                    height={96}
                    className="rounded-full object-none object-top"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Keval Dhol
                </h3>
                <p className="text-sm text-blue-600 dark:text-blue-400 mb-4">
                  Founder & Developer
                </p>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Developer with a passion for making financial concepts
                  accessible to everyone.
                </p>
              </div>
            </div>

            {/* Team Member 2 */}
            {/* <div className="w-full md:w-1/3 bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-xl">
              <div className="h-2 bg-gradient-to-r from-purple-500 to-pink-600"></div>
              <div className="p-6 text-center">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 mx-auto mb-4 flex items-center justify-center text-white text-3xl font-bold">
                  MT
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Maya Thomas
                </h3>
                <p className="text-sm text-purple-600 dark:text-purple-400 mb-4">
                  UX Designer
                </p>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Specializes in creating intuitive and beautiful interfaces
                  that make complex financial tools feel approachable.
                </p>
              </div>
            </div> */}

            {/* Team Member 3 */}
            <div className="w-full md:w-1/3 bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-xl">
              <div className="h-2 bg-gradient-to-r from-emerald-500 to-green-600"></div>
              <div className="p-6 text-center">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 mx-auto mb-4 flex items-center justify-center text-white text-3xl font-bold">
                  BM
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Bhavya Mehta
                </h3>
                <p className="text-sm text-emerald-600 dark:text-emerald-400 mb-4">
                  Web Advisor
                </p>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Ensures our calculators are built on sound financial and web
                  principles and reflect real-world scenarios.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl overflow-hidden shadow-xl">
            <div className="md:flex">
              <div className="md:w-1/2 p-8 md:p-12">
                <div className="inline-flex items-center justify-center p-3 bg-white/10 backdrop-blur-md rounded-full mb-6">
                  <HiOutlineMail className="text-white text-2xl" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-4">
                  Get In Touch
                </h2>
                <p className="text-blue-100 mb-8">
                  Have questions, feedback, or suggestions for new calculators?
                  We&apos;d love to hear from you! Drop us a message at:
                </p>
                <div className="inline-block px-6 py-4 border border-white/20 bg-white/10 backdrop-blur-sm rounded-xl text-base font-medium shadow-sm text-white">
                  <MdEmail className="mr-2 h-5 w-5 inline-block align-sub" />
                  <a
                    href="mailto:hello@calqulation.com"
                    className="hover:underline"
                  >
                    hello@calqulation.com
                  </a>
                </div>
              </div>

              <div className="hidden md:block md:w-1/2 relative">
                <div className="absolute inset-0 bg-[url('/globe.svg')] bg-no-repeat bg-center opacity-10"></div>
              </div>
            </div>
          </div>
        </section>

        {/* SEO-friendly footer section with links */}
        <section className="mb-12">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Explore Our Tools
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <a
                href="/tool/emi-calculator"
                className="bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/30 p-4 rounded-xl transition-colors border border-blue-200 dark:border-blue-800"
              >
                <h3 className="font-bold text-blue-700 dark:text-blue-400 mb-2">
                  EMI Calculator
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Plan your loan journey with our comprehensive EMI calculator
                </p>
              </a>

              <a
                href="/disclaimer"
                className="bg-purple-50 hover:bg-purple-100 dark:bg-purple-900/20 dark:hover:bg-purple-900/30 p-4 rounded-xl transition-colors border border-purple-200 dark:border-purple-800"
              >
                <h3 className="font-bold text-purple-700 dark:text-purple-400 mb-2">
                  Important Information
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Read our disclaimer and terms of service
                </p>
              </a>
            </div>
          </div>
        </section>
      </div>

      {/* Structured data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Calqulation",
            url: "https://calqulation.com",
            logo: "https://calqulation.com/Calqulation.png",
            description:
              "Making complex financial decisions simple through interactive calculators and educational tools",
            sameAs: [
              "https://twitter.com/calqulation",
              "https://www.linkedin.com/company/calqulation",
              "https://www.facebook.com/calqulation",
            ],
            foundingDate: "2024-01-01",
            founders: [
              {
                "@type": "Person",
                name: "Calqulation Founder",
              },
            ],
            contactPoint: {
              "@type": "ContactPoint",
              contactType: "customer service",
              email: "contact@calqulation.com",
            },
          }),
        }}
      />
    </div>
  );
}
