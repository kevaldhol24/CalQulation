"use client";

import { FormEventHandler, useEffect, useState } from "react";
import { FaRegBell, FaRocket } from "react-icons/fa";

const CountdownTimer = ({ launchDate }: { launchDate: Date }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 30,
    hours: 12,
    minutes: 45,
    seconds: 20,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const difference = launchDate.getTime() - now.getTime();

      if (difference <= 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, [launchDate]);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-16">
      <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700 p-6 text-center">
        <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-1">
          {timeLeft.days}
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">Days</div>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700 p-6 text-center">
        <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-1">
          {timeLeft.hours}
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">Hours</div>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700 p-6 text-center">
        <div className="text-4xl font-bold text-indigo-600 dark:text-indigo-400 mb-1">
          {timeLeft.minutes}
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">Minutes</div>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700 p-6 text-center">
        <div className="text-4xl font-bold text-pink-600 dark:text-pink-400 mb-1">
          {timeLeft.seconds}
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">Seconds</div>
      </div>
    </div>
  );
};

export default function ComingSoonClient() {
  // Set launch date 30 days from now
  const launchDate = new Date();
  launchDate.setDate(launchDate.getDate() + 30);

  // Placeholder function for form submission
  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    // This would connect to your actual form submission logic
    alert("Thank you! We'll notify you when we launch.");
  };

  return (
    <>
      {/* Launch Countdown */}
      <section className="mb-20">
        <div className="mx-auto max-w-3xl text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-blue-100 dark:bg-blue-900/50 rounded-full mb-6">
            <FaRocket className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Launching Soon
          </h2>
          <div className="mt-2 h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">
            We&apos;re putting the finishing touches on our next generation of
            financial calculators.
          </p>
        </div>

        {/* Countdown Timer */}
        <CountdownTimer launchDate={launchDate} />
      </section>

      {/* Notification Form */}
      <section className="mb-20">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl overflow-hidden shadow-xl p-8">
          <div className="md:flex items-center">
            <div className="md:w-2/3 mb-8 md:mb-0 md:pr-8">
              <div className="inline-flex items-center justify-center p-3 bg-white/10 backdrop-blur-md rounded-full mb-6">
                <FaRegBell className="text-white text-xl" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">
                Get Notified When We Launch
              </h2>
              <p className="text-blue-100 mb-0">
                Subscribe to our newsletter and be the first to know when our
                new financial tools are available.
              </p>
            </div>
            <div className="md:w-1/3">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/40"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-white text-blue-600 font-medium py-3 px-4 rounded-lg transition-colors hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
                >
                  Notify Me
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
