"use client";

import Link from "next/link";

export function NotFoundContent() {
  return (
    <div className="min-h-[calc(100vh-56px-352px)] dark:bg-gray-950 flex flex-col justify-center items-center px-4 py-16 relative">
      <div className="bg-blue-900 absolute inset-0 opacity-80 h-[56] top-[-56]"></div>
      <div className="text-center max-w-xl mx-auto">
        <h1 className="text-7xl font-extrabold text-blue-600 dark:text-blue-400 mb-4">
          404
        </h1>

        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          Page Not Found
        </h2>

        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>

        <div className="space-y-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
          >
            Return to Homepage
          </Link>

          
        </div>
      </div>
    </div>
  );
}
