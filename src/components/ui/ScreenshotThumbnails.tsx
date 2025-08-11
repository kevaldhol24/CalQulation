"use client";

import Image from "next/image";

interface ScreenshotThumbnailsProps {
  currentIndex: number;
  onThumbnailClick: (index: number) => void;
}

const screenshots = [
  {
    src: "/Images/Screenshots/app-home-screen.png",
    alt: "App Home Screen",
    title: "Home"
  },
  {
    src: "/Images/Screenshots/emi-calculator-screen.png",
    alt: "EMI Calculator",
    title: "EMI"
  },
  {
    src: "/Images/Screenshots/sip-calculator-screen.png",
    alt: "SIP Calculator",
    title: "SIP"
  },
  {
    src: "/Images/Screenshots/loan-comparison-screen.png",
    alt: "Loan Comparison",
    title: "Loans"
  },
  {
    src: "/Images/Screenshots/fd-calculator-screen.png",
    alt: "FD Calculator",
    title: "FD"
  },
  {
    src: "/Images/Screenshots/gst-calculator-screen.png",
    alt: "GST Calculator",
    title: "GST"
  },
  {
    src: "/Images/Screenshots/dark-mode-screen.png",
    alt: "Dark Mode",
    title: "Dark"
  },
];

export default function ScreenshotThumbnails({ currentIndex, onThumbnailClick }: ScreenshotThumbnailsProps) {
  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white text-center mb-4">
        Explore All Features
      </h3>
      <div className="flex justify-center">
        <div className="grid grid-cols-4 md:grid-cols-7 gap-3 max-w-2xl">
          {screenshots.map((screenshot, index) => (
            <button
              key={index}
              onClick={() => onThumbnailClick(index)}
              className={`relative group rounded-lg overflow-hidden transition-all duration-200 ${
                index === currentIndex
                  ? "ring-2 ring-blue-500 scale-105 shadow-lg"
                  : "hover:scale-105 hover:shadow-md"
              }`}
            >
              <div className="w-16 h-20 md:w-20 md:h-24 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                <Image
                  src={screenshot.src}
                  alt={screenshot.alt}
                  width={120}
                  height={240}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-200" />
              <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2">
                <span className="text-xs font-medium text-white bg-black/60 px-2 py-1 rounded text-center block">
                  {screenshot.title}
                </span>
              </div>
              {index === currentIndex && (
                <div className="absolute top-1 right-1">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
