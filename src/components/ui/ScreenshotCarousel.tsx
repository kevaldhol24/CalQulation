"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

interface Screenshot {
  src: string;
  alt: string;
  title: string;
  description: string;
}

const screenshots: Screenshot[] = [
  {
    src: "/Images/Screenshots/app-home-screen.png",
    alt: "Calqulation App Home Screen",
    title: "Home Screen",
    description: "Access all financial calculators"
  },
  {
    src: "/Images/Screenshots/emi-calculator-screen.png",
    alt: "EMI Calculator Screen",
    title: "EMI Calculator",
    description: "Calculate loan EMIs with breakdowns"
  },
  {
    src: "/Images/Screenshots/sip-calculator-screen.png",
    alt: "SIP Calculator Screen",
    title: "SIP Calculator",
    description: "Plan systematic investments"
  },
  {
    src: "/Images/Screenshots/fd-calculator-screen.png",
    alt: "FD Calculator Screen",
    title: "FD Calculator",
    description: "Calculate fixed deposit returns"
  },
  {
    src: "/Images/Screenshots/gst-calculator-screen.png",
    alt: "GST Calculator Screen",
    title: "GST Calculator",
    description: "Quick GST calculations"
  },
  {
    src: "/Images/Screenshots/dark-mode-screen.png",
    alt: "Dark Mode Screen",
    title: "Dark Mode",
    description: "Eye-friendly dark theme"
  },
];

export default function ModernDeviceShowcase() {
  const [centerIndex, setCenterIndex] = useState(0);

  // Auto-rotate center device
  useEffect(() => {
    const interval = setInterval(() => {
      setCenterIndex((prevIndex) => 
        (prevIndex + 1) % screenshots.length
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Get side device screenshots (different from center)
  const leftDeviceIndex = (centerIndex + 1) % screenshots.length;
  const rightDeviceIndex = (centerIndex + 2) % screenshots.length;

  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-3xl p-8 shadow-2xl overflow-hidden">
      <div className="relative">
        {/* Three Device Layout */}
        <div className="flex items-center justify-center space-x-8 lg:space-x-12">
          
          {/* Left Device - Smaller, Rotated */}
          <div className="hidden md:block transform rotate-12 scale-75 opacity-70 hover:opacity-90 transition-all duration-500">
            <div className="w-44 h-80 bg-gradient-to-br from-gray-800 to-black rounded-[2rem] p-1.5 shadow-2xl">
              <div className="w-full h-full bg-white dark:bg-gray-900 rounded-[1.5rem] overflow-hidden relative">
                <Image
                  src={screenshots[leftDeviceIndex].src}
                  alt={screenshots[leftDeviceIndex].alt}
                  width={1180}
                  height={2271}
                  className="w-full h-full object-cover"
                />
                {/* Notch */}
                <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-black rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Center Device - Main, Larger */}
          <div className="transform scale-100 z-10 relative">
            <div className="w-64 h-[520px] bg-gradient-to-br from-gray-900 to-black rounded-[2.5rem] p-2 shadow-2xl">
              <div className="w-full h-full bg-white dark:bg-gray-900 rounded-[2rem] overflow-hidden relative">
                <Image
                  src={screenshots[centerIndex].src}
                  alt={screenshots[centerIndex].alt}
                  width={1180}
                  height={2271}
                  className="w-full h-full object-cover transition-all duration-700"
                  priority
                />
                {/* Notch */}
                <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-black rounded-full"></div>
                
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-[2rem] pointer-events-none"></div>
              </div>
            </div>
            
            {/* Floating Badge */}
            <div className="absolute -top-4 -right-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg animate-pulse">
              Featured
            </div>
          </div>

          {/* Right Device - Smaller, Rotated */}
          <div className="hidden md:block transform -rotate-12 scale-75 opacity-70 hover:opacity-90 transition-all duration-500">
            <div className="w-44 h-80 bg-gradient-to-br from-gray-800 to-black rounded-[2rem] p-1.5 shadow-2xl">
              <div className="w-full h-full bg-white dark:bg-gray-900 rounded-[1.5rem] overflow-hidden relative">
                <Image
                  src={screenshots[rightDeviceIndex].src}
                  alt={screenshots[rightDeviceIndex].alt}
                  width={1180}
                  height={2271}
                  className="w-full h-full object-cover"
                />
                {/* Notch */}
                <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-black rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Decorative Elements */}
        <div className="absolute -top-6 -left-6 w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg animate-bounce opacity-80">
          <span className="text-white text-2xl">📱</span>
        </div>
        <div className="absolute -bottom-6 -right-6 w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center shadow-lg animate-pulse opacity-80">
          <span className="text-white text-2xl">⚡</span>
        </div>

        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5 dark:opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 border-2 border-blue-500 rounded-full"></div>
          <div className="absolute bottom-10 right-10 w-24 h-24 border-2 border-purple-500 rounded-full"></div>
          <div className="absolute top-1/2 left-4 w-16 h-16 border-2 border-green-500 rounded-full"></div>
        </div>

        {/* Center Device Info */}
        <div className="text-center mt-8">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {screenshots[centerIndex].title}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4 max-w-md mx-auto">
            {screenshots[centerIndex].description}
          </p>
          
          {/* Progress Indicators */}
          <div className="flex justify-center space-x-2 mb-4">
            {screenshots.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === centerIndex
                    ? "bg-blue-600 w-8"
                    : "bg-gray-300 dark:bg-gray-600"
                }`}
              />
            ))}
          </div>

          {/* Feature Tags */}
          <div className="flex flex-wrap justify-center gap-2">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">
              Real-time
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
              Accurate
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100">
              Fast
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
