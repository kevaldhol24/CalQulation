import { ContactForm, ContactInfo } from "@/components/feature/Contact";
import { WaveSeparator } from "@/components/layout/WaveSeparator";
import { MailIcon } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Calqulation",
  description:
    "Get in touch with the Calqulation team. We're here to answer your questions and help you make the most of our financial calculation tools.",
};

export default function ContactPage() {
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

        <div className="relative max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 z-10 mb-5">
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
              <span className="inline-block bg-gradient-to-r from-white via-blue-200 to-white bg-clip-text text-transparent">
                Contact Us
              </span>
            </h1>
            <p className="text-lg text-blue-100 max-w-2xl mx-auto leading-relaxed">
              Have questions or need assistance? We&apos;re here to help you
              with any inquiries about our financial calculation tools.
            </p>
          </div>
        </div>

        <WaveSeparator />
      </div>

      <div className="container max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-5">
          {/* Contact Information */}
          <div className="bg-white/80 dark:bg-gray-800/80 p-6 md:p-8 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
            <ContactInfo />
          </div>

          {/* Contact Form */}
          <div className="bg-white/80 dark:bg-gray-800/80 p-6 md:p-8 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/50 px-3 py-1 rounded-full mb-4">
                <MailIcon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                  Send a Message
                </span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Let&apos;s Start a Conversation
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Fill out the form below and we&apos;ll get back to you as soon
                as possible.
              </p>
            </div>

            <ContactForm />
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-16 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700 shadow-sm">
          <div className="aspect-[16/9] w-full">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d118147.82106509342!2d70.73889454332055!3d22.27346616669257!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3959c98ac71cdf0f%3A0x76dd15cfbe93ad3b!2sRajkot%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1747383317858!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              title="Calqulation Office Location"
            ></iframe>
          </div>
        </div>

        {/* FAQ or Support Section */}
        {/* <div className="mt-16 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
          Need quick answers? Check out our <a href="/faq" className="text-blue-600 dark:text-blue-400 hover:underline">FAQ section</a> for answers to commonly asked questions.
        </p>
      </div> */}
      </div>
    </div>
  );
}
