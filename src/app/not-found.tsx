import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found | Calqulation",
  description: "Sorry, the page you're looking for cannot be found. Return to Calqulation's homepage.",
  robots: {
    index: false,
    follow: true,
  }
};

// This ensures the component is rendered as a Server Component without client-side interactivity
export default function NotFound() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 flex flex-col justify-center items-center px-4 py-16">
      <div className="text-center max-w-xl mx-auto">
        <h1 className="text-7xl font-extrabold text-blue-600 dark:text-blue-400 mb-4">404</h1>
        
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          Page Not Found
        </h2>
        
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          The page you are looking for might have been removed, had its name changed,
          or is temporarily unavailable.
        </p>
        
        <div className="space-y-4">
          <Link href="/" className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors">
            Return to Homepage
          </Link>
          
          <div className="pt-6 border-t border-gray-200 dark:border-gray-700 mt-6">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
              You might find these helpful:
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link href="/tool/emi-calculator" className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 text-center">
                <span className="font-medium text-blue-600 dark:text-blue-400">EMI Calculator</span>
              </Link>
              
              <Link href="/about-us" className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 text-center">
                <span className="font-medium text-blue-600 dark:text-blue-400">About Us</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
